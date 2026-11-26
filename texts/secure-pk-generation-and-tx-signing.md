---
title: "Secure private key generation and transaction signing"
date: "2025-08-26"
---

The security of private keys is the most important thing in the world of cryptocurrency. If a private key is compromised, it can lead to unauthorized access to funds, loss of assets, and severe reputational damage to a company. Therefore, any system designed to generate and sign transactions with private keys must implement robust security measures. 

This essay explores two key solutions for achieving secure private key handling: AWS Nitro Enclave and Shamir's Secret Sharing.

## Utilizing AWS Nitro Enclave for Secure Private Key Processing
AWS Nitro Enclaves enables customers to create isolated compute environments to further protect and securely process highly sensitive data. Using the Enclave, we can isolate private key operations, keeping them safe even if the backend is compromised.

### Private Key Generation Flow
1. The backend server sends a request via vsock (a secure communication channel) to AWS Nitro Enclave.
2. The private key is generated inside AWS Nitro Enclave.
3. The Enclave derives the corresponding public key and wallet address.
4. The private key is encrypted using AWS Key Management Service (KMS) within the Enclave.
5. The Enclave sends the encrypted private key and wallet address to the backend server.
6. The encrypted private key is stored securely in a database, while the wallet address (public data) is stored in plain text.

### Transaction Signing Flow
1. The backend retrieves the encrypted private key from the database.
2. The encrypted private key and raw transaction are sent to AWS Nitro Enclave.
3. The Enclave decrypts the private key securely within its environment.
4. The transaction is signed using the decrypted private key.
5. The signed transaction is returned to the backend.
6. The backend submits the signed transaction to the blockchain mempool.

**Security Enhancements:**
- AWS KMS is configured to allow decryption calls only from AWS Nitro Enclave.
- Attestation ensures only trusted code runs within the Enclave, preventing tampering or unauthorized execution.

## Bonus Security: Shamir's Secret Sharing for Private Key Protection
Shamir's Secret Sharing is a cryptographic algorithm that splits a secret (in this case, a private key) into n distinct parts, where any k parts (k ≤ n) can reconstruct the original secret, but k-1 parts reveal no information. For example, if n=5 and k=3, you need any 3 out of 5 parts to reconstruct the key. 

The algorithm uses polynomial interpolation - it creates a random polynomial of degree k-1 where the secret is encoded as the constant term, and each share is a point on that polynomial. 

To further enhance security, we can split private keys into multiple shares using this technique, ensuring the key is never fully exposed outside a secure environment.

Let's split the private key into 3 shards:
1. **Enclave Shard:**
   - Stored securely in the database (linked to the user's account).
2. **Auth Shard:**
   - Stored on the user’s device (web or mobile)
   - Alternatively, stored in AWS Secrets Manager in a separate region.
3. **Backup Shard:**
   - Stored in AWS S3 Glacier with additional security measures:
     - MFA Delete enabled.
     - Write Once, Read Many (WORM) policy enforced.
     - Stored in a separate AWS region and account if possible.

### Shard Handling and Reconstruction for Transaction Signing
- Each shard is encrypted independently using AWS KMS before storage.
- At least two shards are required to reconstruct the private key.
- The reconstruction process occurs temporarily inside AWS Nitro Enclave to prevent exposure.
- If the user needs to recover access to their private key, the Enclave securely reconstructs it using at least two shards.
- Once the transaction is signed, the private key is immediately discarded from memory to prevent leaks.
- User authentication is required before retrieving the Auth Shard, adding an extra security layer.

### Advantages of Shamir's Secret Sharing in Private Key Security
1. **Prevents Single Point of Failure:** Since the key is never stored in a single location, an attacker must compromise multiple sources to gain full access.
2. **Enhances Redundancy:** Even if one shard is lost (e.g., device failure), the key can still be reconstructed with the remaining shards.
3. **Supports Secure Recovery:** A user can securely retrieve their funds if they have access to at least two shards, ensuring usability without sacrificing security.

By integrating Shamir's Secret Sharing, private key security is improved further, preventing a single point of failure. While these methods introduce additional complexity and setup time, they provide a strong foundation for any cryptocurrency application who wants to generate and hold private keys.
