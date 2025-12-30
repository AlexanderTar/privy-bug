'use client'

import React from 'react'
import Link from 'next/link'
import { usePrivy } from '@privy-io/react-auth'
import Logo from '@/styles/icons/new-logo.svg'
import Button from './Button'
import UserMenu from './UserMenu'

const Header = () => {
  const { authenticated, login, ready } = usePrivy()

  return (
    <header className="bg-background border-border border-b">
      <div className="flex h-[64px] items-center px-4 py-2">
        <div className="flex-1">
          <div className="flex h-full items-center">
            <Link href="/">
              <Logo className="w-[130px] min-w-[130px] max-w-[130px]" />
            </Link>
          </div>
        </div>
        {ready && (
          <div className="flex flex-1 items-center justify-end">
            {authenticated ? (
              <UserMenu />
            ) : (
              <Button variant="black" size="medium" onClick={() => login()}>
                Log in
              </Button>
            )}
          </div>
        )}
      </div>
    </header>
  )
}

export default Header

