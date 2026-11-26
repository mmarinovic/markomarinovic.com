---
title: "Solidity interview questions"
date: "2025-07-01"
---

I've been reading and writing a lot of smart contracts, learning about different concepts and the inner workings of the EVM.

I came across 100+ interview questions on [RareSkills](https://www.rareskills.io/blog/solidity-interview-questions) and decided to answer them here as briefly as possible.

Here are the questions:

## Easy Questions

### 1. **What is the difference between private, internal, public, and external functions?**
   - **Private:** Only accessible within the contract that defines them. Cannot be inherited or called externally.
   - **Internal:** Accessible within the contract and its derived contracts.
   - **Public:** Can be called internally and externally.
   - **External:** Only callable from outside the contract, but can be called internally using `this.f()`.


### 2. **Approximately, how large can a smart contract be?**
24 KB

### 3. **What is the difference between `create` and `create2`?**
   - **Create:** Deploys a contract to an address determined by the sender's address and a nonce.
   - **Create2:** Deploys a contract to an address determined by the sender's address, a salt, and the contract's bytecode hash. Allows for address predictability.

### 4. **What major change with arithmetic happened with Solidity 0.8.0?**
Solidity 0.8.0 introduced automatic overflow and underflow checks for arithmetic operations, causing transactions to revert if they occur. You can opt out of this behavior by using the `unchecked` keyword.

### 5. **What special CALL is required for proxies to work?**
Proxies use the `delegatecall` opcode, which executes the called function in the context of the proxy's storage, preserving the state of the proxy.

### 6. **How do you calculate the dollar cost of an Ethereum transaction?**
Formula:
- Gas Cost = gasUsed * gasPrice
- Ether Cost = Gas Cost / 1e18 (to convert wei to Ether)
- Dollar Cost = Ether Cost * Ether-to-USD price

### 7. **What are the challenges of creating a random number on the blockchain?**
The blockchain is deterministic and transparent, so any approach based on predictable inputs (blockhash, timestamp) can be exploited. Miners or validators can manipulate these inputs to gain an advantage. If there is a function that generates a random number, its result can be manipulated.

### 8. **What is the difference between a Dutch Auction and an English Auction?**
   - **Dutch Auction:** Starts at a high price and decreases over time until someone accepts the price.
   - **English Auction:** Starts with a low price, and participants place increasing bids until no higher bids are made.


### 9. **What is the difference between `transfer` and `transferFrom` in ERC20?**
   - **Transfer:** Moves tokens from the sender's address to a recipient.
   - **TransferFrom:** Allows an approved spender to transfer tokens from another address on their behalf.

### 10. **Which is better to use for an address allowlist: a mapping or an array? Why?**
Mapping - more efficient because lookups are constant-time (O(1)). Arrays require linear-time (O(n)) lookups, which are costly and inefficient in Solidity.

### 11. **Why shouldn't `tx.origin` be used for authentication?**
`tx.origin` refers to the address initiating the transaction and not the caller of a specific function. It can be exploited through phishing attacks when contracts interact with each other. See example: https://solidity-by-example.org/hacks/phishing-with-tx-origin/

### 12. **What hash function does Ethereum primarily use?**
keccak256

### 13. **How much is 1 gwei of Ether?**
10⁹ wei or 0.000000001 Ether.

### 14. **How much is 1 wei of Ether?**
10⁻¹⁸ Ether.

### 15. **What is the difference between `assert` and `require`?**
   - **Assert:** Used for internal errors and invariants. Consumes all gas on failure.
   - **Require:** Used for input validation and external errors. Returns unused gas on failure.

### 16. **What is a flash loan?**
A flash loan allows borrowing funds without collateral, but the loan has to be repaid within the same transaction. It's good for arbitrage opportunities.

### 17. **What is the check-effects-interaction pattern?**
CEI pattern is a best practice in Solidity to avoid reentrancy attacks:
- Check conditions
- Update state
- Interact with external contracts

### 18. **What is the minimum amount of Ether required to run a solo staking node?**
32 ETH

### 19. **What is the difference between `fallback` and `receive`?**
   - **fallback:** A special function called when a contract receives Ether without a `receive` function or when a non-existent function is called.
   - **receive:** A function specifically designed to receive Ether and is triggered when Ether is sent without data.

### 20. **What is reentrancy?**
A vulnerability where an external contract can repeatedly call back into the calling contract before the first invocation is finished, potentially exploiting the state.

### 21. **What prevents infinite loops from running forever?**
The gas limit ensures that contracts cannot run indefinitely. When gas runs out, the transaction reverts.


### 22. **What is the difference between `tx.origin` and `msg.sender`?**
   - **tx.origin:** The original address that initiated the transaction.
   - **msg.sender:** The current caller of the function, which could be a contract or user.


### 23. **How do you send Ether to a contract that does not have payable functions, or a receive or fallback?**
You cannot send Ether directly. The only way to force Ether into a contract that doesn't accept it is through `selfdestruct`. By creating a contract with some Ether and calling `selfdestruct(target)`, the Ether will be sent to the target contract even if it has no payable functions or fallback/receive functions.


### 24. **What is the difference between `view` and `pure`?**
   - **view:** Reads from state but does not modify it.
   - **pure:** Does not read or modify state; only operates on input parameters.


### 25. **What is the difference between `transferFrom` and `safeTransferFrom` in ERC721?**
   - **transferFrom:** Transfers ownership of an NFT but doesn't verify the recipient's ability to handle NFTs.
   - **safeTransferFrom:** Ensures the recipient is a contract that can handle NFTs, reducing the risk of accidental token loss. The token contract checks to see that the receiver is an `IERC721Receiver`.


### 26. **How can an ERC1155 token be made into a non-fungible token?**
Assigning a unique token ID to each asset makes it non-fungible within the ERC1155 standard.


### 27. **What is access control and why is it important?**
Access control restricts who can call specific functions. It's used for security and contract management.


### 28. **What does a modifier do?**
A modifier is a reusable piece of code that adds preconditions or logic to a function. For example, restricting access to certain users or validating inputs.


### 29. **What is the largest value a `uint256` can store?**
2^256 - 1


### 30. **What is variable and fixed interest rate?**
   - **Variable Interest Rate:** Fluctuates based on market conditions.
   - **Fixed Interest Rate:** Remains constant throughout the loan period.


## Medium Questions

### 1. **What is the difference between `transfer` and `send`? Why should they not be used?**
   - **transfer:** Automatically sends Ether with a fixed gas limit of 2,300, reverting the transaction on failure.
   - **send:** Similar to `transfer` but returns a boolean indicating success or failure instead of reverting.
   - **Why not use them?** Both have a 2,300 gas limit, which can fail with complex recipient contracts. It is safer to use `call` with custom gas management and error handling.


### 2. **What is a storage collision in a proxy contract?**
A storage collision occurs when the proxy and implementation contracts unintentionally write to or read from the same storage slots. This happens because proxies store their state, like the implementation address, in slots that may conflict with the implementation contract's own variables.


### 3. **What is the difference between `abi.encode` and `abi.encodePacked`?**
   - **abi.encode:** Encodes data with padding.
   - **abi.encodePacked:** Encodes data without padding.


### 4. **Are there other `uint` sizes besides uint8, uint32, uint64, uint128, and uint256?**
Yes, any multiple of 8 up to 256 is valid (e.g., `uint16`, `uint24`, `uint40`, etc.).


### 5. **What changed with `block.timestamp` before and after Proof of Stake (PoS)?**
   - **before PoS:** `block.timestamp` was determined by miners and could be manipulated within certain bounds (I think +/-15 seconds).
   - **after PoS:** `block.timestamp` is based on slots. Every 12 seconds a new block can be created. Slot can also be missed, so new block can be created again after 12 seconds.


### 6. **What is frontrunning?**
Frontrunning is observing a pending transaction in the mempool and submitting a new transaction with a higher gas price to execute it first, gaining an advantage (e.g., in arbitrage or auctions).


### 7. **What is a commit-reveal scheme and when would you use it?**
It's a method where a user first "commits" to a value by submitting a hash and later "reveals" the value and its salt. This prevents cheating or manipulation in smart contracts for auctions, voting, quizes, etc.


### 8. **Under what circumstances could `abi.encodePacked` create a vulnerability?**
When concatenating dynamic types (like `strings` or `bytes`), `abi.encodePacked` can produce the same output for different inputs, leading to hash collisions in `keccak256`.

```
bytes memory encoded1 = abi.encodePacked("ab", "cd");
bytes memory encoded2 = abi.encodePacked("a", "bcd");

bytes32 hash1 = keccak256(encoded1);
bytes32 hash2 = keccak256(encoded2);
        
// This will return true because hashes are the same, indicating a collision.
return hash1 == hash2;
```


### 9. **How does Ethereum determine the BASEFEE in EIP-1559?**
BASEFEE adjusts dynamically based on the previous block's gas usage.
- Increases by up to 12.5% if the previous block's gas usage exceeds the target.
- Decreases by up to 12.5% if usage is below the target.


### 10. **What is the difference between a cold read and a warm read?**
   - **cold read:** Accessing a storage slot for the first time in a transaction (2100 gas cost).
   - **warm read:** Accessing a storage slot already accessed earlier in the same transaction (100 gas cost).


### 11. **How does an AMM price assets?**
AMMs (e.g., Uniswap) use formulas like the constant product formula (x * y = k) to determine prices based on the ratio of assets in the liquidity pool.


### 12. **What is a function selector clash in a proxy and how does it happen?**
A clash occurs when the proxy and implementation contracts have the function with same selector (same function names and parameters). This can lead to unintended behavior if the function is not intended to be called by the proxy.


### 13. **What is the effect on gas of making a function payable?**
Payable functions consume slightly less gas during deployment since the compiler does not insert checks to reject Ether transfers.


### 14. **What is a signature replay attack?**
A replay attack involves reusing a valid signature in a different context to execute unauthorized actions. For example, submitting the same signed transaction on multiple chains or reusing it after the intended operation.


### 15. **How would you design a game of rock-paper-scissors in a smart contract such that players cannot cheat?**
Using a commit-reveal scheme:
- Players commit to their moves by submitting a hash of their move.
- After both players commit, they reveal their moves along with the salt.
- The contract verifies the hash and determines the winner.


### 16. **What is the free memory pointer and where is it stored?**
The free memory pointer indicates the start of unused memory and is stored at memory location 0x40.


### 17. **What function modifiers are valid for interfaces?**
external and payable.


### 18. **What is the difference between memory and calldata in a function argument?**
   - **memory:** Stores a copy of the data that can be modified within the function.
   - **calldata:** Immutable, cheaper, and used for external function calls.


### 19. **Describe the three types of storage gas costs for writes.**
   - **set a zero to nonzero value:** High gas cost (~20,000 gas).
   - **change a nonzero value:** Moderate cost (~5,000 gas).
   - **reset a nonzero value to zero:** Refund (~4,800 gas).


### 20. **Why shouldn't upgradeable contracts use the constructor?**
Proxies bypass the constructor during deployment. Instead, initialization logic should be placed in an initializer function with the `initializer` modifier to ensure proper initialization.


### 21. **What is the difference between UUPS and the Transparent Upgradeable Proxy pattern?**
   - **UUPS:** The implementation contract contains the upgrade logic.
   - **Transparent Proxy:** Upgrade logic is in the proxy.


### 22. **What happens if a `delegatecall` is made to an empty address or self-destructed implementation?**
`delegatecall` will return true because the address exists, but the code is empty.


### 23. **What danger do ERC777 tokens pose?**
ERC777 tokens can trigger reentrancy attacks through hooks like `tokensReceived`, as these hooks are automatically executed during token transfers.


### 24. **How should functions and modifiers be ordered according to the Solidity style guide?**
   - **Functions:** Follow this order:
     1. Constructor.
     2. Fallback/receive.
     3. External functions.
     4. Public functions.
     5. Internal functions.
     6. Private functions.
   - **Modifiers:** Ordered by visibility and purpose, starting with external.


### 25. **What is a bonding curve?**
A mathematical formula that determines the price of an asset based on its supply, often used in token issuance mechanisms.


### 26. **How does `_safeMint` differ from `_mint` in OpenZeppelin ERC721?**
`_safeMint` ensures that the recipient is a contract capable of handling NFTs, calling `onERC721Received`. `_mint` does not perform this check.


### 27. **What keywords are provided in Solidity to measure time?**
`block.timestamp`, `block.number`


### 28. **What is a sandwich attack?**
A frontrunning attack where a malicious actor submits a transaction before and after a victim's transaction.


### 29. **If a `delegatecall` is made to a function that reverts, what does the `delegatecall` do?**
The `delegatecall` propagates the revert to the caller.


### 30. **What is a gas-efficient alternative to multiplying and dividing by a power of two?**
Use bitwise shifting (e.g., `x << 1` for multiplication and `x >> 1` for division by 2).

```
pragma solidity ^0.8.0;

contract BitwiseShiftExample {
    function multiplyByPowerOfTwo(uint256 x, uint256 n) public pure returns (uint256) {
        // Multiply x by 2^n using a left shift
        return x << n;
    }

    function divideByPowerOfTwo(uint256 x, uint256 n) public pure returns (uint256) {
        // Divide x by 2^n using a right shift
        return x >> n;
    }
}
```


### 31. **How large a uint can be packed with an address in one slot?**
Address is 160 bits. `uint96` (96 bits) can fit alongside an address (160 bits) in one 256-bit storage slot.


### 32. **Which operations give a partial refund of gas?**
Reducing storage (e.g., resetting nonzero values to zero) refunds gas. Also, `selfdestruct` refunds gas.


### 33. **What is ERC165 used for?**
ERC165 is used for contract interface detection, allowing contracts to declare and query supported interfaces.


### 34. **If a proxy makes a `delegatecall` to A, and A does `address(this).balance`, whose balance is returned?**
The proxy's balance is returned since `delegatecall` executes in the context of the proxy.


### 35. **What is a slippage parameter useful for?**
To define acceptable price deviation in trades, preventing significant losses due to frontrunning or price volatility.


### 36. **What does ERC721A do to reduce mint costs? What is the tradeoff?**
Reduces mint costs by storing ownership data compactly. The tradeoff is slightly increased complexity in ownership lookups.


### 37. **Why doesn't Solidity support floating-point arithmetic?**
Floating-point arithmetic is imprecise and prone to rounding errors, which can be problematic in financial applications.


### 38. **What is TWAP?**
Time-Weighted Average Price is an average asset price over a specific time period.


### 39. **How does Compound Finance calculate utilization?**
Utilization = Borrowed Assets / Supplied Assets


### 40. **If a `delegatecall` is made to a function that reads from an immutable variable, what will the value be?**
The immutable variable will return its value as stored in the original implementation contract, not the proxy. This is because immutable variables are not stored in the storage, but in the bytecode.


### 41. **What is a fee-on-transfer token?**
A token that charges a fee on each transfer, reducing the amount sent or received.


### 42. **What is a rebasing token?**
A token that adjusts its total supply dynamically based on a predefined mechanism, typically to achieve a specific goal such as price stability or alignment with an external value.


### 43. **In what year will a timestamp stored in a `uint32` overflow?**
In the year 2106 (specifically February 7, 2106).


### 44. **What is LTV in the context of DeFi?**
Loan-to-Value is the ratio of the loan amount to the value of the collateral provided.


### 45. **What are aTokens and cTokens in the context of Compound Finance and AAVE?**
   - **aTokens (AAVE):** Interest-bearing tokens received when supplying assets.
   - **cTokens (Compound):** Tokens received when supplying assets that accrue interest.


### 46. **Describe how to use a lending protocol to go leveraged long or leveraged short on an asset.**
   - **Leveraged Long:** Borrow more of the same asset you supply, then use the borrowed funds to buy more of it.
   - **Leveraged Short:** Borrow an asset, sell it for another, and supply the proceeds as collateral.


### 47. **What is a perpetual protocol?**
A derivatives protocol that allows users to trade perpetual contracts (futures with no expiration date), often using funding rates to align prices with the underlying asset.


## Hard Questions

### 1. **How does fixed point arithmetic represent numbers?**

Solidity does not have built-in fixed-point arithmetic, but it can be simulated using integer math. Typically, a number is represented as an integer with an implicit fixed decimal place. For example, 1.23 can be represented as 123 with an implicit divisor of 100. Libraries like ABDKMath64x64 or PRBMath are commonly used to handle fixed-point math.


### 2. **What is an ERC20 approval frontrunning attack?**

An ERC20 approval frontrunning attack happens when a user approves a spender for a certain token amount X, and after that the user updates the approval to a different amount Y. Approval transaction can be seen in the mempool, and if the spender is untrusted, the attacker can quickly front-run with a transaction that drains the approved amount X before the user updates to Y.


### 3. **What opcode accomplishes address(this).balance?**

`SELFBALANCE`


### 4. **How many arguments can a solidity event have?**

Solidity events can have a maximum of 17 arguments, with at most 3 indexed parameters

### 5. **What is an anonymous Solidity event?**

An anonymous event in Solidity does not have a signature stored in the logs, meaning it cannot be filtered by event type. This means that topic[0] (signature) is not present in the log. These events can have 4 indexed parameters.

### 6. **Under what circumstances can a function receive a mapping as an argument?**

Mappings cannot be passed as arguments to functions because they exist only in storage. However, mappings can be passed as a function argument if you create a library for it.

```
pragma solidity ^0.8.0;

library MappingLib {
    function setValue(
        mapping(address => uint256) storage map,
        address key,
        uint256 value
    ) internal {
        map[key] = value;
    }
}

contract MappingExample {
    mapping(address => uint256) public balances;
    using MappingLib for mapping(address => uint256);

    function setBalance(address user, uint256 amount) external {
        balances.setValue(user, amount);
    }
}
```

### 7. **What is an inflation attack in ERC4626?**

An inflation attack in ERC4626 happens when a user deposits assets into a vault, and the vault mints more shares than the amount of assets deposited. This means that the user is receiving more shares than they should for the amount of assets they deposited.

### 8. **How many storage slots does this use? uint64[] x = [1,2,3,4,5]? Does it differ from memory?**

- 1 slot for array length
- array values are packed into a single slot, so 1 slot for values (1,2,3,4)
- 1 slot for value 5

Total 3 slots are used.

### 9. **Why does the compiler insert the INVALID op code into Solidity contracts?**

The compiler inserts the INVALID op code into Solidity contracts to prevent invalid opcodes from being executed. INVALID opcode typically occurs due to compatibility issues between the Solidity version used and the EMV version of the target blockchain.

### 10. **What is the difference between how a custom error and a require with error string is encoded at the EVM level?**

Custom errors are encoded using the ABI encoding for function calls. Require error strings are encoded as part of the revert data. Require is less gas efficient that custom errors because it requires more space to store the error string.

### 11. **What is a common vulnerability with ecrecover?**
`ercrecover` can return address(0) if the signature is invalid. This can be used to bypass checks in the contract.


### 12. **What is the difference between an optimistic rollup and a zk-rollup?**
**Optimistic rollup**:
- assume transaction are valid unless proven otherwise during the challenge period of 7 days
- relies on the validators and financial incentives to prevent bad actors from submitting invalid transactions
- process transactions quickly but introduce latency due to the challenge period, affecting asset withdrawal times
- fully compatible with Ethereum smart contracts, requiring minimal modifications
- lower barrier of entry for developers to build on the network

**zk-rollup**:
- use zero-knowledge proofs to validate transactions before they are submitted to the main chain
- offer stronger security through cryptographic validation
- faster finality and immediate withdrawals
- often require specialized tools and may need smart contracts to be rewritten for compatibility

### 13. **How does EIP1967 pick the storage slots, how many are there, and what do they represent?**
Storage slots are determined by hashing specific strings and then subtracting 1 from the resulting hash. This ensures that the pre-image of the hash is not known, reducing the risk of collisions with other storage variables

EIP-1967 defines three main storage slots:
- Logic Contract Address Slot. Hash: bytes32(uint256(keccak256('eip1967.proxy.implementation')) - 1)
- Admin Address Slot. Hash: bytes32(uint256(keccak256('eip1967.proxy.admin')) - 1)
- Beacon Slot: Hash: follows the same pattern.

### 14. **How much is one Sazbo of ether?**
10⁻6 ETH

### 15. **What can delegatecall be used for besides use in a proxy?**
Delegatecall can be used to call a function in a different contract without changing the address of the current contract.

### 16. **Under what circumstances would a smart contract that works on Etheruem not work on Polygon or Optimism? (Assume no dependencies on external contracts)**
If the smart contract is dependent on the Ethereum blockchain's specific OPCODES. Smart contracts cannot work if the network doesn't support all required OPCODES.

### 17. **How can a smart contract change its bytecode without changing its address?**
By using a proxy pattern with a proxy contract that holds the logic contract address.

### 18. **What is the danger of putting msg.value inside of a loop?**
`msg.value` has a constant value through the execution. If it is inside of a loop and used for payment checks, an attacker can trick smart contract to sending more ETH than it should.

### 19. **Why is strict inequality comparisons more gas efficient than ≤ or ≥? What extra opcode(s) are added?**
There is no opcode for ≤ or ≥. EVM has to use LT and GT plus EQ to check for ≤ or ≥. Opcode that is extra added for this case is EQ.

### 20. **If a proxy calls an implementation, and the implementation self-destructs in the function that gets called, what happens?**
The implementation contract is destroyed, and `delegatecall` will return false because of failure. The proxy contract is not deployed, but any subsequent calls to the proxy will revert.

### 21. **What is the relationship between variable scope and stack depth?**
Stack too deep error happens when the stack depth exceeds the maximum allowed depth. This can happen if a function has a lot of declared local variables and computations. Avoid by refactoring the code into multiple internal functions.

### 22. **What is an access list transaction?**
An access list transaction enables saving gas on cross-contract calls by declaring in advance which contract and storage slots will be accessed.  Up to 100 gas can be saved per accessed storage slot.

### 23. **How can you halt an execution with the mload opcode?**
You can load a very large address offset. This will cause memory expansion which will exceed the gas limit of the transaction. Transaction will halt or revert as a result.

### 24. **What is a beacon in the context of proxies?**
Beacon is a contract that holds the address of the implementation contract. It is used to upgrade the implementation contract without changing the address in the proxy. Proxy holds the address of the beacon, not the implementation.

This is useful because multiple proxy contracts can be upgraded at once, making batch proxy upgrades very easy.

### 25. **Why is it necessary to take a snapshot of balances before conducting a governance vote?**
If a user votes on Proposal X and transfers tokens to another address afterward, the recipient cannot reuse those tokens to vote on the same proposal.

### 26. **How can a transaction be executed without a user paying for gas?**
Meta-transactions can be implemented where a third-party relayer covers gas fees. Users sign transaction details off-chain, and a relayer submits them to the blockchain, paying the gas fees.

### 27. **In solidity, without assembly, how do you get the function selector of the calldata?**
`msg.sig` return first 4 bytes of the calldata, which is the function selector.
By using `.selector` property, e.g. `this.transfer.selector`.

### 28. **How is an Ethereum address derived?**
Ethereum addresses are derived from the public key of the owner of the account using the keccak hash function. Address is last 20 bytes of the hash. 0x is appended to the beginning of an address.

### 29. **What is the metaproxy standard?**
Metaproxy standard introduces a minimal bytecode implementation for creating proxy contracts. This standard allows for the inclusion of immutable metadata directly attached to the bytecode of the proxy.

### 30. **If a try catch makes a call to a contract that does not revert, but a revert happens inside the try block, what happens?**
Transaction will revert because try catch only cathes errors that happen in external calls.

### 31. **If a user calls a proxy makes a delegatecall to A, and A makes a regular call to B, from A's perspective, who is msg.sender? from B's perspective, who is msg.sender? From the proxy's perspective, who is msg.sender?**
- In A: user is msg.sender.
- In B: proxy is msg.sender.
- In proxy: user is msg.sender.

### 32. **Under what circumstances do vanity addresses (leading zero addresses) save gas?**
If the address is used as an argument for a function call, it is cheaper to use a vanity address than a normal address because calldata has more zeroes.

### 33. **Why do a significant number of contract bytecodes begin with 6080604052? What does that bytecode sequence do?**
The byte sequence represents the initialization of the memory pointer to address 0x80. EVM stores 0x80 in the 0x40 address in memory.

### 34. **How does Uniswap V3 determine the boundaries of liquidity intervals?**
When a position is created, the liquidity provider must choose the lower and upper tick that will represent their position's borders.

### 35. **What is the risk-free rate?**
The interest rate an investor can expect to earn on an investment that carries zero risk.

### 36. **When a contract calls another call via call, delegatecall, or staticcall, how is information passed between them?**
- With call, the runtime environment if of the called contract. 
- With staticcall, the runtime environment is of the caller, but the called contract cannot modify the state.
- With delegatecall, the runtime environment is of the caller.

### 37. **What is the difference between bytes and bytes1[]?**
bytes is a dynamically-sized array of bytes. The length of a bytes array can change at runtime, which is useful for handling variable-length data.

bytes1[] is an array of fixed-size byte elements, where each element is exactly one byte long.

### 38. **What is the smallest uint that will store 1 million? 1 billion? 1 trillion? 1 quadrillion?**
- 1 million - uint24
- 1 billion - uint32
- 1 trillion - uint40
- 1 quadrillion - uint48

### 39. **What danger to uninitialized UUPS logic contracts pose?**
The implementation contract should be initialized after deployment because the initialize function is public and can be called by anyone. If left uninitialized, anyone could call it and claim ownership of the implementation logic contract, which could potentially lead to unexpected behavior depending on the contract implementation.

### 40. **What is the difference (if any) between what a contract returns if a divide-by-zero happens in Soliidty or if a dividye-by-zero happens in Yul?**
Divide by zero in Yul produces an invalid opcode, which haults the execution and transaction reverts without any friendly revert message or gas refund. 

In Solidity, divide by zero will revert with an error and do partial gas refund.

### 41. **Why can't .push() be used to append to an array in memory?**
Arrays declared in memory are fixed in size after their creation.
