---
title: "Rounding is a product decision"
date: "2026-06-29"
description: "Integer minor units make adding money exact, not dividing it - a 1.5% fee on £9.99 is 14.985p, and somebody has to decide who gets the half penny. Floats, splits, fees, accruals and currency exponents, in C#."
---

A 1.5% fee on £9.99 is 14.985p. You can't charge half a penny, so somebody has to decide whether the customer pays 14p or 15p. If nobody decides, the code does, and it usually decides by losing the fraction somewhere nobody looks.

Every payments ledger has to make this call, for fees, splits, conversions and accruals. Here's how I make it, and the code that carries it out.

## Why floats are out

Most engineers know not to store money as floats. It's worth seeing exactly why, and then what integers still don't fix.

Floats get simple sums wrong. 0.1 can't be stored exactly in binary, the same way 1/3 can't be written exactly in decimal, so the computer keeps the nearest value it can and every operation rounds again. Worse, the order you add in changes the answer. Here it is in C#, and you'd get the same numbers in JavaScript, Python, Java or Go, because they all use the same float format:

```csharp
Console.WriteLine(0.1 + 0.2);           // 0.30000000000000004
Console.WriteLine((0.1 + 0.2) + 0.3);   // 0.6000000000000001
Console.WriteLine(0.1 + (0.2 + 0.3));   // 0.6

long pennies = 10 + 20 + 30;
Console.WriteLine(pennies);             // 60, exactly, in any order
```

Sum the same day's postings in a report and in a database query, in a different order, and the two totals can disagree by a hair that nobody can explain. Store whole pennies and every sum is exact, in any order, as long as the numbers fit the type you chose. C#'s `decimal` also gets `0.1m + 0.2m` right, but integer minor units work the same in every language and every database you'll touch.

## What integers don't fix

Adding pennies is always exact. Dividing them often isn't, and payments products divide constantly. Split £100 three ways and watch what happens:

```csharp
long total = 10000;          // £100.00 in pennies
long each = total / 3;       // 3333, the remainder is dropped
Console.WriteLine(each * 3); // 9999, one penny has vanished
```

More decimal places won't save you. 100 ÷ 3 never ends, so there's always a remainder, just a smaller one. Somebody has to decide where the leftover penny goes.

Ethereum shows this well. One ether is 10^18 wei, Solidity has no floating point at all, and rounding is still one of its most reliable sources of exploits. The donation attack on tokenised vaults works by inflating the assets behind each share until a victim's deposit rounds down to zero shares. Eighteen decimals didn't prevent it. They just moved the problem to a precision the attacker controls.

So integers don't decide what happens to the leftover fraction. **Your product has to, for each operation that divides money.** That's a product decision, not an engineering detail, because it decides who ends up with the penny: the customer, a counterparty, or you. The code's job is to carry out that decision the same way every time.

| Operation | What the product has to decide | Possible answers |
|---|---|---|
| Fee | Round up, down, or to nearest? | Down, so nobody pays more than the advertised rate |
| Split between people | Who gets the leftover penny? | The first recipient, the largest share, or the payer |
| Currency conversion | Where does the fraction go? | Into the FX margin, or a rounding account |
| Interest | Round daily or carry the fraction? | Carry it, and pay whole pennies when due |

Once the product has answered those, the implementation is simple.

## Splits: hand out the leftover pennies explicitly

Divide, then give the remainder away one penny at a time, following whatever rule the product chose, so the shares always add back up to the total:

```csharp
// total must be >= 0; split a refund as a positive amount, then negate
static long[] Split(long total, int parts)
{
    long each = total / parts;          // 3333
    long leftover = total % parts;      // 1 penny nobody has yet
    var shares = new long[parts];
    for (int i = 0; i < parts; i++)
        shares[i] = each + (i < leftover ? 1 : 0);  // rule: first recipients get it
    return shares;
}

Split(10000, 3);  // [3334, 3333, 3333], adds up to exactly 10000
```

Uneven splits, like 50/30/20, work the same way: round every share down, then hand out the leftover pennies by the product's rule. Whatever the rule is, it must be deterministic, so the same split always gives the same answer.

## Fees: round once, at the end, with the mode written down

Do the maths in `decimal`, then convert to pennies exactly once:

```csharp
decimal raw = 999m * 0.015m;    // 14.985p, 1.5% of £9.99
long fee = (long)Math.Round(raw, MidpointRounding.ToZero);  // 14p, if the product rounds fees down
```

Always pass the rounding mode, even when it looks obvious. C#'s `Math.Round` defaults to banker's rounding, where 2.5 rounds to 2 and 3.5 to 4, which surprises anyone who expected 3. Keep the mode in one place per operation, not scattered across call sites, so changing the policy is a one-line change.

## Accruals: carry the fraction forward

If your product accrues anything daily, like interest or a subscription billed by the day, the amount might be 13.529p a day. Round it every day and you lose or invent half a penny daily, across every account. Keep the running accrual at full precision, post whole pennies when they're due, and carry the fraction into tomorrow.

## Every fraction lands somewhere visible

Whatever the product decides, the fraction must land somewhere you can see: a customer's balance, the margin, or a named rounding account. Then it shows up in the trial balance and every penny is accounted for. The test is simple: after any split, fee or conversion, the postings must still add up to exactly what came in. Make it a property test and run it on thousands of random amounts.

The settlement system also sets a floor. You can't send half a penny over Faster Payments, so however much precision you carry internally, there has to be one boundary where amounts become whole pennies, and the product's rules above decide what happens at it.

## Check your exponents

Not every currency has two decimal places. ISO 4217 gives each currency its minor unit: USD is 2, **JPY is 0**, and KWD, BHD, JOD, OMR and TND are **3**. Any code with a hardcoded `* 100` is a bug waiting for your first Kuwaiti customer. SIX, the maintenance agency, publishes the list free in machine-readable form. Load it, don't type it.

## Find every division

Search your money code for every `/`, every `Math.Round` and every `* 100`. Next to each one there should be a rule somebody chose. Where there isn't, the code is choosing for you.
