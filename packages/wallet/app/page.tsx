"use client";

import React from "react";
import { usePrivy } from "@privy-io/react-auth";
import Header from "@/components/Header";
import Dashboard from "@/components/Dashboard";
import Button from "@/components/Button";

export default function Home() {
  const { authenticated, ready, login } = usePrivy();

  return (
    <div className="bg-background flex h-full flex-col">
      <Header />
      <main className="flex h-full w-full items-center justify-center">
        {ready && (
          <>
            {authenticated && ready ? (
              <Dashboard />
            ) : (
              <div className="flex flex-1  flex-col items-center justify-center gap-6 text-center">
                <div className="text-lg text-gray-600">
                  Connect your wallet to get started
                </div>
                <Button variant="black" size="medium" onClick={() => login()}>
                  Log in
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
