import {
  connectorsForWallets,
  WalletDetailsParams,
} from "@rainbow-me/rainbowkit";
import { mainnet, sepolia, base, baseSepolia } from "wagmi/chains";
import { createConfig, http } from "wagmi";
import {
  toPrivyWallet,
  toPrivyWalletConnector,
} from "@privy-io/cross-app-connect/rainbow-kit";

export const EMBEDDED_WALLET_ID = process.env.NEXT_PUBLIC_PRIVY_APP_ID!;

const embeddedWalletBase = toPrivyWallet({
  id: EMBEDDED_WALLET_ID,
  name: "Privy Wallet",
  iconUrl: "https://privy.io/favicon.ico",
});

const embeddedWallet = () => {
  return {
    ...embeddedWalletBase(),
    id: "privy-embedded-wallet",
    createConnector: (walletDetails: WalletDetailsParams) =>
      toPrivyWalletConnector(
        {
          id: EMBEDDED_WALLET_ID,
          name: "Privy Wallet",
          iconUrl: "https://privy.io/favicon.ico",
          smartWalletMode: false,
        },
        walletDetails
      ),
  };
};

const smartWallet = () => {
  return {
    ...embeddedWalletBase(),
    id: "privy-smart-wallet",
    createConnector: (walletDetails: WalletDetailsParams) =>
      toPrivyWalletConnector(
        {
          id: EMBEDDED_WALLET_ID,
          name: "Privy Wallet",
          iconUrl: "https://privy.io/favicon.ico",
          smartWalletMode: true,
        },
        walletDetails
      ),
  };
};

const connectors = connectorsForWallets(
  [
    {
      groupName: "Privy Embedded Wallet",
      wallets: [embeddedWallet],
    },
    {
      groupName: "Privy Smart Wallet",
      wallets: [smartWallet],
    },
  ],
  {
    appName: "Privy Wallet Test App",
    projectId: process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!,
  }
);

export const config = createConfig({
  connectors,
  chains: [mainnet, sepolia, base, baseSepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [base.id]: http(),
    [baseSepolia.id]: http(),
  },
  ssr: true,
});
