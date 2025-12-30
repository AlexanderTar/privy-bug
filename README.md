# Privy Wallet Bug Demo

This repository demonstrates an issue with Privy wallets when using `smartWalletMode: true` with signMessage/verifyMessage functionality.

## Repository Structure

This is a pnpm workspace containing two Next.js projects:

- **packages/wallet** - A wallet app using Privy SDK with `smartWalletMode: true` to create and manage Privy smart wallets
- **packages/test-app** - A test app using RainbowKit with `@privy-io/cross-app-connect` to connect to Privy wallets created in the wallet app

## Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up environment variables:
   
   Copy `.env.example` to `.env.local` in both packages and fill in your values:
   ```bash
   cp packages/wallet/.env.example packages/wallet/.env.local
   cp packages/test-app/.env.example packages/test-app/.env.local
   ```
   
   Then edit the `.env.local` files with your actual values:
   - `packages/wallet/.env.local`: Add your Privy App ID and Client ID
   - `packages/test-app/.env.local`: Add your Privy App ID, Wallet ID, and WalletConnect Project ID
   
   Note: `NEXT_PUBLIC_PRIVY_APP_ID` must be the same in both projects.

3. Run the projects:
   ```bash
   # Run both projects
   pnpm dev

   # Or run individually
   pnpm dev:wallet      # Runs on port 3003
   pnpm dev:test-app    # Runs on port 3004
   ```

## The Issue

The test-app uses RainbowKit with `@privy-io/cross-app-connect` to connect to Privy smart wallets created in the wallet app. When attempting to sign and verify messages using `walletClient.signMessage()` and `publicClient.verifyMessage()`, there may be issues with the signature verification when `smartWalletMode: true` is enabled.

## Testing the Issue

1. Open the wallet app (port 3003) and create/login to a Privy wallet
2. Open the test-app (port 3004) and connect using the Privy wallet option
3. Click "Sign & Verify Message" to test the signMessage/verifyMessage flow
4. Observe any issues with signature verification

