"use client";

import React from "react";
import { PrivyProvider as PrivyProviderBase } from "@privy-io/react-auth";
import { SmartWalletsProvider } from "@privy-io/react-auth/smart-wallets";
import {
  baseSepolia,
  base,
  mainnet,
  polygon,
  polygonAmoy,
  sepolia,
} from "viem/chains";

export const PrivyProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <PrivyProviderBase
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      clientId={process.env.NEXT_PUBLIC_PRIVY_CLIENT_ID}
      config={{
        loginMethods: ["email"],
        appearance: {
          theme: "light",
          accentColor: "#000000",
          landingHeader: "",
          logo: <img src="/images/verisart-logo-black.png" alt="Logo" />,
        },
        embeddedWallets: {
          ethereum: {
            createOnLogin: "users-without-wallets",
          },
        },
        defaultChain: mainnet,
        supportedChains: [
          mainnet,
          sepolia,
          polygon,
          polygonAmoy,
          base,
          baseSepolia,
        ],
      }}
    >
      <SmartWalletsProvider>{children}</SmartWalletsProvider>
    </PrivyProviderBase>
  );
};
