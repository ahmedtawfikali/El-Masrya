# Security Specification: Al Masreya Real Estate (المصرية للعقارات)

## 1. Data Invariants

1. **Property Invariant**:
   - Every property listing must contain valid title, purpose (`sale` or `rent`), positive price, valid area name, and space in square meters.
   - Any property created by a user must record `creatorUid` matching the authenticated caller's UID.
   - Deletion and administrative updates can only be executed by verified administrators (`isAdmin()`) or original property owners.
   - Read operations for active properties are publicly accessible for marketplace discovery.

2. **Inquiry Invariant**:
   - Inquiries (leads, contact forms) can be created by visitors or logged-in users with valid phone and name.
   - Inquiries contain private PII (lead name, phone number, budget). Therefore, read and update access is strictly limited to authorized administrators (`isAdmin()`).

3. **Setting Invariant**:
   - Master platform settings (`/settings/site_config`) are publicly readable so all visitors see the official contact info and brand headline.
   - Modifying settings is restricted strictly to verified administrators (`isAdmin()`).

4. **User & Admin Invariant**:
   - User profile in `/users/{userId}` can only be read/written by the user themselves or administrators.
   - Self-assignment of administrative privileges or modifying `role` to `'admin'` directly is blocked.
   - Super admin is bootstrapped with email `ahmed123mhme22@gmail.com`.

## 2. The "Dirty Dozen" Malicious Payloads

1. **Privilege Escalation via Profile**: Non-admin user attempts to create/update `/users/{uid}` with `{ "role": "admin" }`. (Denied)
2. **Setting Hijacking**: Unauthenticated or normal user attempts to overwrite `/settings/site_config` with phishing contact numbers. (Denied)
3. **Property Creator Impersonation**: Attacker attempts to create a property with `creatorUid` set to a victim's UID. (Denied)
4. **Lead PII Scraping**: Attacker sends a query to list all client inquiries in `/inquiries` to steal phone numbers and names. (Denied)
5. **Denial-of-Wallet via Oversized String**: Attacker sends a 2MB payload into property description or inquiry notes. (Denied via size limits)
6. **Path Variable Poisoning**: Attacker requests `/properties/....//evil` with invalid characters. (Denied via `isValidId()`)
7. **Ghost Field Injection (Shadow Update)**: User updates a property and injects arbitrary unapproved fields like `{"isSponsoredBySystem": true}`. (Denied)
8. **Unverified Email Admin Spoofing**: Attacker signs up with `ahmed123mhme22@gmail.com` on an unverified provider with `email_verified == false`. (Denied)
9. **Lead Tampering**: Unauthorized user attempts to change an inquiry status to `closed` or delete client records. (Denied)
10. **Orphaned Listing Write**: Writing a property with non-conforming or missing required fields. (Denied)
11. **Client Delegation Bypass**: Attempting to read all inquiries without being an admin. (Denied)
12. **Blanket Delete Attack**: Attacker attempts to delete all records under `/properties` or `/settings`. (Denied)

## 3. Test Runner Specification

Test suites simulate authenticated and unauthenticated contexts using Firebase Emulator or Firestore rules unit runner, asserting PERMISSION_DENIED on all 12 vectors above.
