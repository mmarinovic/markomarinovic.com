---
title: "Cool things about NEAR"
date: "2025-01-15"
---

NEAR is a Proof-of-Stake blockchain that uses sharding technology to achieve scalability. NEAR uses an election mechanism called Thresholded PoS (TPoS).

The general idea is to have a deterministic way to have a large number of participants that are maintaining the network.

NEAR's mission is to remove all barriers to Web3 with the goal of onboarding 1 billion users in the first five years.

## Accounts

NEAR accounts have human-readable names (eg. marko.near). Top-level accounts are created by the registrar (.near). near can create bob.near, and bob.near can create app.bob.near. All accounts can be smart contracts.

The NEAR wallet is the quickest way to set up a new account. It supports 2FA and a Ledger hardware wallet. Staking is built right into the wallet, making it simple to stake NEAR and receive rewards. You can also browse your NFTs there very easily.

NEAR Accounts have the unique feature of holding multiple public/private key pairs, called Access Keys, each with its own set of permissions. Access Keys enable you to grant limited access over your account to third parties. Access Keys can be Full Access or Function Keys.

## Access Keys

Access Keys provide several advantages.

You may securely pass the key to an app, allowing it to sign app-related transactions without interrupting you on the UI for each transaction (for example web3 games).

Access keys can be simply replaced if they are compromised. You may also set up a key-recovery contract in your account and allow a trusted third party to retrieve keys.

Full Access keys have full control of an account and they can perform:

- CreateAccount
- DeployContract
- FunctionCall
- Transfer
- Stake
- AddKey
- DeleteKey
- DeleteAccount

If you hand a FullAccess to someone, they will have total control over the account.

FunctionCall keys can only be used to call non-payable methods on contracts, i.e. methods that do not require you to attach NEAR Ⓝ.

The main purpose is to be handed to apps, so they can make contact calls in your name.

## Gas

Gas is an interesting topic in NEAR. Transaction fees are measured in gas units but paid in $NEAR. Validators receive their reward independent from the gas fees.

30% of the fee goes to the contract as a development incentive, while the remaining 70% gets burned.

Contract developers can prepay gas for their users, allowing them to use the contract without paying any transaction fees.

Gas price variates smoothly from block to block. There are no gas wars and the extra attached gas will be refunded.

## Smart contracts

NEAR smart contracts are pieces of executable code stored in the account's state that have their own storage, and perform transactions in the account's name.

When you deploy a smart contract to NEAR, you pay for the storage that this contract requires (1 Ⓝ ~ 100kb).

You can write NEAR smart contracts in Javascript or Rust. I would suggest Rust since SDK is more mature and there are a lot of good examples online.

Contracts are compiled by NEAR SDK into WASM, a binary instruction format for a stack-based virtual machine.

## Aurora

One more interesting thing about the NEAR ecosystem is Aurora. It's an EVM running on top of the NEAR protocol. It's implemented as a NEAR smart contract. Aurora has its ecosystem of apps and it aims to be fully compatible with Ethereum.

## Conclusion

NEAR is not going anywhere. Technology is fantastic, as is the community that surrounds it. Create a wallet and join the community!
