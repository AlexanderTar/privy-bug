"use client";

import React, { useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount, useWalletClient, usePublicClient } from "wagmi";
import Button from "@/components/Button";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { data: walletClient } = useWalletClient();
  const publicClient = usePublicClient();
  const [payload, setPayload] = useState<string>("");
  const [signature, setSignature] = useState<string>("");
  const [verificationResult, setVerificationResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

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
    if (!walletClient || !publicClient || !address || !payload) {
      setVerificationResult({
        success: false,
        message: "Missing wallet client, public client, address, or payload",
      });
      return;
    }

    setIsLoading(true);
    setVerificationResult(null);

    try {
      // Sign the message
      const sig = await walletClient.signMessage({
        message: payload,
      });
      setSignature(sig);

      // Verify the signature
      const isValid = await publicClient.verifyMessage({
        address: address as `0x${string}`,
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

  return (
    <div className="bg-background flex h-full flex-col">
      <main className="flex h-full w-full items-center justify-center">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white shadow rounded-lg p-6">
              <h1 className="text-2xl font-bold mb-6">Privy Wallet Test</h1>

              <div className="mb-6">
                <ConnectButton />
              </div>

              {isConnected && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Wallet Address
                    </label>
                    <div className="text-sm text-gray-600 font-mono bg-gray-50 p-2 rounded">
                      {address}
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
                      disabled={!payload || isLoading || !walletClient}
                      isLoading={isLoading}
                      className="w-full"
                    >
                      {isLoading
                        ? "Signing & Verifying..."
                        : "Sign & Verify Message"}
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
                      <div className="text-sm mt-1">
                        {verificationResult.message}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {!isConnected && (
                <div className="text-center text-gray-500 py-8">
                  Connect your wallet to get started
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
