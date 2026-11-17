# Security Specification & Payload-First TDD

## 1. Data Invariants
1. **Strict Ownership**: A user document (`/users/{userId}`) and all its subcollections (`/backups/{backupId}`, `/progressSummaries/{summaryId}`) can ONLY be read or written by the authenticated user whose `request.auth.uid == userId` and `data.ownerId == request.auth.uid`.
2. **Zero-PII Isolation**: No personal email, phone number, or real-name fields exist in any Firestore schema. Collection `list` queries on `/users` are strictly denied (`allow list: if false`).
3. **Master Gate Sync**: Every write or single-doc read in `/users/{userId}/backups/{backupId}` and `/users/{userId}/progressSummaries/{summaryId}` verifies the existence and ownership of the parent `/users/{userId}` document via `get()`.
4. **Immutable Ownership & Timestamps**: `ownerId` and `createdAt` are immutable after creation. `createdAt == request.time` on create; `updatedAt == request.time` on create and update.
5. **Strict Key Allowlisting & Volumetric Bounds**: No extra shadow fields (`keys().hasOnly(...)`) are permitted on create or update (`affectedKeys().hasOnly(...)`). All strings have strict `.size()` bounds and numeric metrics are clamped (`0 <= score <= 100`, `0 <= wpm <= 400`).

## 2. The "Dirty Dozen" Adversarial Payloads
1. **Cross-User Profile Read**: User B attempts `get(/users/userA)` -> `PERMISSION_DENIED`.
2. **User Directory Scraping**: Signed-in user attempts `list(/users)` -> `PERMISSION_DENIED`.
3. **Owner Spoofing on Create**: User A creates `/users/userA` with `ownerId: "userB"` -> `PERMISSION_DENIED`.
4. **Shadow Field Injection on Profile**: User A creates `/users/userA` with `{ ..., isAdmin: true }` -> `PERMISSION_DENIED`.
5. **Backdated Timestamp on Create**: User A creates `/users/userA/progressSummaries/s1` with `createdAt: "2020-01-01T00:00:00Z"` -> `PERMISSION_DENIED`.
6. **Immutable `createdAt` Tampering on Update**: User A updates `/users/userA` changing `createdAt` -> `PERMISSION_DENIED`.
7. **Immutable `ownerId` Hijack on Update**: User A updates `/users/userA` changing `ownerId` -> `PERMISSION_DENIED`.
8. **ID Poisoning**: User A writes to `/users/userA/backups/bad$id!with*chars` -> `PERMISSION_DENIED`.
9. **Denial of Wallet Payload Oversize**: User A writes `ciphertext` > 700,000 chars or `alias` > 32 chars -> `PERMISSION_DENIED`.
10. **Score Out-of-Range Poisoning**: User A writes `fluencyScore: 999` or `wpm: -50` -> `PERMISSION_DENIED`.
11. **Unauthenticated Backup List**: Unauthenticated client lists `/users/userA/backups` -> `PERMISSION_DENIED`.
12. **Orphaned Subcollection Write**: User A writes `/users/userA/backups/b1` before `/users/userA` parent document exists -> `PERMISSION_DENIED`.
