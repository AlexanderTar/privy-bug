"use client";

import React, { useState } from "react";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useSmartWallets } from "@privy-io/react-auth/smart-wallets";
import { createPublicClient, createWalletClient, custom, http } from "viem";
import { mainnet } from "viem/chains";
import Button from "./Button";

type WalletType = "smart" | "embedded";

const Dashboard: React.FC = () => {
  const { user } = usePrivy();
  const { getClientForChain } = useSmartWallets();
  const { wallets } = useWallets();
  const [walletType, setWalletType] = useState<WalletType>("smart");
  const [payload, setPayload] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const smartWalletAddress = user?.smartWallet?.address;
  const embeddedWallet = wallets.find((w) => w.walletClientType === "privy");
  const embeddedWalletAddress = embeddedWallet?.address;

  const walletAddress =
    walletType === "smart" ? smartWalletAddress : embeddedWalletAddress;

  const generateRandomPayload = () => {
    const randomBytes = new Uint8Array(32);
    crypto.getRandomValues(randomBytes);
    const hex = Array.from(randomBytes)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    const message = `Random payload: 0x${hex}`;
    setPayload(message);
    setSignature("");
    setVerificationResult(null);
  };

  const signAndVerify = async () => {
    if (!walletAddress || !payload) {
      setVerificationResult({
        success: false,
        message: "Missing wallet address or payload",
      });
      return;
    }

    setIsLoading(true);
    setVerificationResult(null);

    try {
      let walletClient;

      if (walletType === "smart") {
        // Get smart wallet client for the chain
        walletClient = await getClientForChain(mainnet);

        if (!walletClient) {
          setVerificationResult({
            success: false,
            message: "Failed to get smart wallet client",
          });
          return;
        }
      } else {
        // Get embedded wallet client
        if (!embeddedWallet) {
          setVerificationResult({
            success: false,
            message: "Embedded wallet not found",
          });
          return;
        }

        // Get the embedded wallet's provider and convert to viem wallet client
        const provider = await embeddedWallet.getEthereumProvider();
        if (!provider) {
          setVerificationResult({
            success: false,
            message: "Failed to get embedded wallet provider",
          });
          return;
        }

        walletClient = createWalletClient({
          account: embeddedWalletAddress as `0x${string}`,
          chain: mainnet,
          transport: custom(provider),
        });
      }

      // Sign the message
      const sig = await walletClient.signMessage({
        message: payload,
      });
      setSignature(sig);

      // Create public client for verification
      const publicClient = createPublicClient({
        chain: mainnet,
        transport: http(),
      });

      // Verify the signature
      const isValid = await publicClient.verifyMessage({
        address: walletAddress as `0x${string}`,
        message: payload,
        signature: sig,
      });

      setVerificationResult({
        success: isValid,
        message: isValid
          ? "Signature verification successful!"
          : "Signature verification failed!",
      });
    } catch (error: any) {
      setVerificationResult({
        success: false,
        message: `Error: ${error?.message || "Unknown error"}`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!smartWalletAddress && !embeddedWalletAddress) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex h-64 items-center justify-center">
          <div className="text-lg text-gray-600">No wallet connected</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Sign & Verify Message</h1>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wallet Type
              </label>
              <div className="flex gap-2">
                <Button
                  variant={walletType === "smart" ? "black" : "grey"}
                  size="medium"
                  onClick={() => {
                    setWalletType("smart");
                    setSignature("");
                    setVerificationResult(null);
                  }}
                  disabled={!smartWalletAddress}
                >
                  Smart Wallet
                </Button>
                <Button
                  variant={walletType === "embedded" ? "black" : "grey"}
                  size="medium"
                  onClick={() => {
                    setWalletType("embedded");
                    setSignature("");
                    setVerificationResult(null);
                  }}
                  disabled={!embeddedWalletAddress}
                >
                  Embedded Wallet
                </Button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Wallet Address
              </label>
              <div className="text-sm text-gray-600 font-mono bg-gray-50 p-2 rounded">
                {walletAddress || "N/A"}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message to Sign
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={payload}
                  onChange={(e) => setPayload(e.target.value)}
                  placeholder="Enter message to sign..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm"
                />
                <Button
                  variant="blue"
                  size="medium"
                  onClick={generateRandomPayload}
                >
                  Generate Random
                </Button>
              </div>
            </div>

            <div>
              <Button
                variant="black"
                size="normal"
                onClick={signAndVerify}
                disabled={!payload || isLoading}
                isLoading={isLoading}
                className="w-full"
              >
                {isLoading ? "Signing & Verifying..." : "Sign & Verify Message"}
              </Button>
            </div>

            {signature && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Signature
                </label>
                <div className="text-xs text-gray-600 font-mono bg-gray-50 p-2 rounded break-all">
                  {signature}
                </div>
              </div>
            )}

            {verificationResult && (
              <div
                className={`p-4 rounded-md ${
                  verificationResult.success
                    ? "bg-green-50 text-green-800"
                    : "bg-red-50 text-red-800"
                }`}
              >
                <div className="font-medium">
                  {verificationResult.success ? "✓ Success" : "✗ Failed"}
                </div>
                <div className="text-sm mt-1">{verificationResult.message}</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
