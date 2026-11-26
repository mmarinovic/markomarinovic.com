---
title: "Code is law, until it's not"
date: "2025-06-03"
---

In 2016, the DAO hack shattered Ethereum’s idealistic mantra of code is law - the belief that smart contracts should operate immutably and autonomously. 

The incident forced the Ethereum community to confront a very important question: **What happens when immutable code produces catastrophic outcomes?**  

### The Promise

The original vision of blockchain systems was based on a promise of decentralization and censorship resistance. 

Smart contracts were meant to act as unbreakable agreements, code that is immutable once deployed. Code that operates without intermediaries. Code that is predictable. Code that is law.

These features have enabled innovations like DeFi and NFTs. For example, Uniswap allows users to trade cryptocurrencies directly through smart contracts, without a central authority, completely permissionless.

### When Immutability Fails

We were promised immutable code, but it turns out that we can't really have it completely immutable. 

Here are three cases where immutability failed:

#### The DAO Hack (2016)  
The DAO, a venture capital fund governed by smart contracts, held $150M in ETH. A reentrancy vulnerability allowed an attacker to drain 3.6M ETH.  

- **The Dilemma**: Immutable smart contracts now hosted stolen funds.  
- **The Fix**: A controversial hard fork rolled back the chain to reverse the hack, splitting Ethereum into ETH (forked) and ETC (original chain).  
- **The Lesson**: Immutability is a social construct. When losses grow too large, humans will intervene.  

#### The Parity Wallet Freeze (2017)  
A user accidentally triggered a bug in Parity’s multi-sig wallet library, permanently freezing $300M in ETH.  

- **The Outcome**: Funds remain frozen today, as the community rejected proposals to hard-fork Ethereum again.  
- **The Irony**: A single line of code (missing access control) overrode the intent of thousands of users.  

#### Tornado Cash Sanctions (2022)  
The U.S. Treasury sanctioned Tornado Cash, a privacy tool used to launder funds. Despite having no “owner”, its smart contracts were effectively blacklisted by centralized infrastructure (e.g., RPC providers).  

- **The Reality**: Code may be law on-chain, but off-chain systems (governments, node providers) can still censor access.  

### The Pragmatic Response: Balancing Immutability and Adaptability

Today, we deploy different patterns to mitigate risks while trying to preserve decentralization:  

#### Upgradeable Proxies  

Proxies delegate logic to an implementation contract that can be replaced. This allows us to upgrade the code and preserve the state. If there is a bug in the application logic, we can deploy a new version of the code and point proxy to it. 

This is very useful, but introduces a new layer of complexity.

The question here is, who controls the proxy? Can you trust the owner to not do something like deploy a code that withdraws all funds to himself before he leaves for Bahamas?

#### Decentralized Governance (DAOs)  

Projects can use token-based voting to approve changes (e.g., adjusting collateral ratios, update fees, change proxy implementation). You can vote for changes with your tokens. The more tokens you have, the more voting power you have.

The problem here is that the more tokens you have, the more voting power you have. This means that the whales will have more power than the small investors.

#### Emergency Circuit Breakers

Contracts can include pause mechanisms guarded by multi-sigs or time locks. Owner of the contract can pause the contract if there is a bug in the code.

This creates a risk of overuse of pauses, as the owner can pause the contract to prevent any changes to the contract state. 

Depending on the implementation, the owner can pause the contract for a long time, or even indefinitely.

### The Path Forward

The future of `code is law` lies in balancing ideals with reality:  

- **Better Tools**: Formal verification and safer languages can reduce bug risks.  
- **Hybrid Models**: Smart contracts with immutable core and upgradeable modules.
- **Transparency**: Clear communication about upgradeability and admin powers.  

### Code as a Living Law

Immutability remains a noble aspiration, but its absolutism is unsustainable. 

Smart contracts exist in a messy human context, where bugs, hackers, and regulators inevitably collide. 

Developers must design systems that evolve with accountability, transparency, and respect for its users.  

The challenge lies in building a framework where "code is law" coexists with "code is fixable", without sacrificing decentralization.  

