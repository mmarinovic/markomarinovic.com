---
title: "Bored Ape Yacht Club: smart contract breakdown"
date: "2025-02-12"
---

Bored Ape Yacht Club (BAYC) is a popular NFT collection created by Yuga Labs. In this post, we'll go over BAYC smart contract code. The source code is available on [EtherScan](https://etherscan.io/address/0xbc4ca0eda7647a8ab7c2061c2e118a18a936f13d#code).

## ERC721

BAYC is implemented as an ERC721 token, a standard that defines a set of functions that a smart contract must implement in order to be considered a compliant ERC721 token.

These functions include the ability to transfer tokens, approve other addresses to manage your tokens, and check token ownership.

## Ownable Contract

The contract inherits the **Ownable** contract which provides basic authorization control functions. It also provides **_onlyOwner** modifier which restricts certain functions or methods within a smart contract to be executed only by the contract owner.

The owner of a contract is set during the contract deployment and can only be changed by the current owner.

## SafeMath Library

The contract also uses the **SafeMath** library. When writing smart contracts, it's important to handle mathematical operations carefully. A single overflow or underflow can result in the loss of funds, data corruption, or other severe issues. For example, an overflow can occur when the result of a mathematical operation exceeds the maximum possible value that can be stored in a variable. In such a case, the result "wraps around" to a negative number and the smart contract will continue to execute with incorrect results.

The SafeMath library provides a simple solution to this problem by checking the result of each mathematical operation and ensuring that it is within the acceptable range. If an overflow or underflow occurs, the library will revert the transaction, preventing the smart contract from executing with incorrect results.

Since Solidity 0.8, the overflow/underflow check is implemented on the language level. Validation is added to the bytecode during compilation. **You don't need the SafeMath library for Solidity 0.8+.**

## Variables

BAYC smart contract has several important variables:

* **BAYC_PROVENANCE**: a string variable that stores the provenance hash of the token. The NFT Provenance Hash ensures the fairness of a project's NFT distribution during and post-mint.
* **MAX_APES**: a variable that stores the maximum number of Bored Ape tokens that can be minted
* **REVEAL_TIMESTAMP**: a variable that stores the reveal timestamp for the token sale
* **startingIndexBlock**: a variable that stores the block number of the starting index for the collection
* **startingIndex**: a variable that stores the starting index of the collection
* **apePrice**: a constant that stores the price of each Bored Ape token in wei
* **maxApePurchase**: a constant that stores the maximum number of tokens that can be purchased at one time
* **saleIsActive**: a boolean variable that indicates whether the sale of Bored Ape tokens is active

## Functions

### withdraw
This function allows the owner to transfer the balance of the smart contract to their own wallet. This function can only be called by the owner.

### reserveApes
This function allows the owner to reserve a set number of Bored Apes. The number of Apes that can be reserved is defined as 30. This function can only be called by the owner.

### setRevealTimestamp
This function allows the owner to set the reveal timestamp for the Bored Ape Yacht Club smart contract. The reveal timestamp is used to determine when the sales of Apes will start. This function can only be called by the owner.

### setProvenanceHash
This function allows the owner to set the provenance hash for the Bored Ape Yacht Club smart contract. This function can only be called by the owner.

### setBaseURI
This function allows the owner to set the base URI for the Bored Ape Yacht Club smart contract. The base URI is used to provide a unique identifier for the Bored Apes. This function can only be called by the owner.

### flipSaleState
This function allows the owner to pause or activate the sale of Bored Apes. When the sale is active, Bored Apes can be minted. When the sale is paused, Bored Apes cannot be minted. This function can only be called by the owner.

### mintApe
This function allows a user to mint Bored Apes. To mint Apes, the sale must be active and the user must send the correct amount of ether. The maximum number of Apes that can be minted in a single transaction is defined as 20. This function is payable, which means it requires a payment to be made in ether.

### setStartingIndex
This function sets the starting index for the collection of Bored Apes. The starting index is used to determine the order in which the Bored Apes will be collected. This function can only be called once and the starting index block must be set before this function can be called.

### emergencySetStartingIndexBlock
This function allows the owner to set the starting index block for the collection of Bored Apes in an emergency situation. It can only be called by the owner and is used in the event that the starting index block has not been set.

