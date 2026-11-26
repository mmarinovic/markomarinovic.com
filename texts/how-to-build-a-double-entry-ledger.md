---
title: "How to Build a Double-Entry Ledger for a Payments Product"
date: "2026-07-27"
description: "A balance column fails four questions every payments product eventually gets asked - here's the ledger model that answers them: journal entries, one sign convention, three balances, and what to do when a wallet goes negative."
---

Most payments products start with a `balance` column and a `transactions` table. It holds up until the first recall, the first audit, or the first time finance asks about a date in the past. Then the money and your record of the money disagree, and nothing in the schema can prove which one is right.

Here are four questions every payments product gets asked sooner or later, by a customer, an auditor or your own finance team:

1. What did this customer hold, in this currency, at the end of the 3rd?
2. How much of that was reserved rather than spendable?
3. What actually left the bank, as opposed to what you told the bank to send?
4. Across every customer, how much money do you owe in total?

A balance column fails all four. The first is fatal on its own: update a row in place and you can't say what it was on the 3rd, which is exactly the day somebody will ask about. The fourth is the one that gets reported wrong. When one customer's balance goes negative they owe you money, and that debt doesn't reduce what you owe everyone else. `select sum(balance) from wallets` nets the two anyway and hands you a total that's short by the size of the debt. That's the number you'd report as customer money owed.

This is the model I'd build, and the reasoning behind each piece, so you can tell which parts you can bend.

## The rule everything else follows from

Your ledger is the record of what you owe each customer. The bank statement is evidence about where cash physically sits. Those are two different facts, and most ledger bugs come from treating one as the other.

A bank account can't model the states a payments product lives in: a hold, a fee charged but not yet swept, money that is no longer the customer's but hasn't left your bank yet. That last one is the sharpest. A card payment clears against the customer's wallet today and settles out of your bank account days later. In between, the customer no longer has it and it isn't your cash, so it needs its own home in the ledger.

Which gives the rule:

**Cash moves in your ledger when the provider says it moved, not when your code decides to move it.**

Effects you own are different. A fee you've just charged is yours to post the moment you charge it. Half of good ledger design is being precise about which event owns which posting.

## Journal entries, postings, and a sign convention

A few words first, so we mean the same thing. A **journal** is the book. A **journal entry** is one economic event. Its **postings** are the lines that make it up. Different tools use different names for these, and that's fine. Pick yours, write them down, and use them everywhere, including in conversations with finance.

The rule is that **total debits equal total credits**, per entry. How you store that is a choice. You can store signed amounts, so every entry sums to zero, or positive amounts with a debit or credit direction on each line. Both work. What doesn't work is having both, which is what happens when two teams make the call separately a few years apart.

I store signed integer minor units, debit positive, and write that decision down on day one.

Balance within each currency, never across them. A cross-currency sum is meaningless and it hides real errors: 100 too much GBP and 100 too little EUR sum to a perfect zero.

Three properties carry the rest of the design.

**Enforce balance in the database, not the service.** In Postgres that's a constraint trigger, deferred to commit, that groups an entry's postings by entity and currency and rejects anything that doesn't sum to zero or has fewer than two lines. Group by currency alone and one legal entity's debit can balance another's credit. Trigger only on postings and an entry with no postings slips through, so validate the entry too. A service-layer check only protects the code paths that go through the service. The trigger protects the one somebody adds next year in a hurry.

**Balances are derived, never edited.** Sum the postings. If you cache balances for read speed, treat the cache as a cache: rebuildable, and rebuilt on a schedule to prove it.

**Append-only.** A correction is a new reversing entry pointing at the original, and both stay visible. The mistake happened, so it stays on the record. "We edited the row" isn't an answer finance or compliance will accept.

## Booked, held, available

One number can't describe the gap between a customer committing to a payment and the bank moving the money. You need three.

- **Booked** is what the wallet's postings add up to, credits minus debits. A wallet is a liability, so under debit-positive storage that's the negative of the raw sum. Getting that backwards is the first way a sign convention bites. Booked changes only when a journal entry posts.
- **Held** is the sum of the wallet's open holds. A hold reserves money without moving it, so it has **no posting**. It exists so the same pound can't be committed twice while a payment is in flight.
- **Available** is booked minus held. It's the only number a payment may spend, and the only one a customer should see as spendable.

A customer sends 900 out of 1,000, with a 20p fee:

| Moment | Booked | Held | Available |
|---|---|---|---|
| Before the payment | 1,000.00 | 0.00 | 1,000.00 |
| Approved: fee posts, hold placed | 999.80 | 900.00 | 99.80 |
| Bank confirms, debit posts, hold settles | 99.80 | 0.00 | 99.80 |

The fee posts at approval because it's owed the moment the customer asks. The 900 doesn't post until the bank confirms it left, so the hold is the only thing keeping it unspendable in between. Available drops by the amount and the fee exactly once.

Try writing those three rows with one `balance` column. You'll either show the customer money they can't spend, or debit money the bank hasn't moved.

## The invariant is not "available never goes negative"

Held can't go negative, because every hold is positive. Booked can. Available can go further.

A wallet has booked 949.80 and an open 900 hold, so available is 49.80. Then an inbound payment of 900 from last week is recalled by the sending bank. Booked drops to 49.80, the hold is still open, and available is **minus 850.20**.

Nobody did anything wrong. The recall is money actually leaving, and refusing to post it would put your ledger out of step with the bank, which is the one thing a ledger exists to prevent.

So the invariant is: **no customer action may take available below zero.** A hold is placed only if the amount plus its fee fits within available at that instant, checked under a lock on the wallet row. Check the amount alone and a payment of exactly the available balance passes, then the fee takes it negative. Recalls and returns aren't customer actions, so no check in your code could have stopped them, and the invariant still holds.

Now push it one step further, to booked. A customer holds £100. A £12,000 payment arrives by mistake, and nobody queries it. The customer spends £12,050, which is within available, so every check passes. Then the sender's bank recalls the £12,000.

Booked is now **minus £11,950.20**, counting the 20p fee. The customer's safeguarding account at the bank held £50, the customer's £49.80 plus the fee you hadn't swept yet, and a bank account can't go below zero. So £11,950 of the recall comes out of your own operating account the same day. The unswept fee goes with it, which is a good argument for sweeping fees promptly.

A negative wallet is a debt to collect, not an error to reject. Reclassify it out of customer liability into a receivable, because a debt owed to you isn't customer money. That keeps it out of the total you owe, which fixes question four from the top. It doesn't collect the debt, though, so the receivable has to stay in the spending decision. Otherwise the customer's next incoming payment looks spendable when you should be recovering from it.

## Holds stay off the journal

A card authorisation reserves money without moving it, and the authorised amount often isn't the final one. A fuel pump authorises an estimate and settles for what you actually pumped. Plenty of authorisations simply expire. Post a journal entry for each one and most of your write volume becomes reversals of things that never happened.

So holds live in their own table, and the posting happens at clearing.

There's a latency constraint hiding in that. The authorisation decision is synchronous, inside a timeout the card processor sets. It reads available and places a hold in one database transaction, with no queue and no outbound call in the path. Miss the deadline and the processor falls back to its own stand-in rules, which can approve. At that point someone else is making your approval decisions and you don't know how often. Put a counter on it.

## Go read your balance column

Pick one customer and one day last month. From your own records, without asking a provider, answer three things: what they held, what was reserved, and what had actually left the bank.

If you can't answer all three, you don't have a ledger. You have a number.
