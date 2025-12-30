'use client'

import React, { useState, useRef, useEffect } from 'react'
import { usePrivy } from '@privy-io/react-auth'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import CheckIcon from '@mui/icons-material/Check'
import Button from './Button'

const UserMenu = () => {
  const { user, logout } = usePrivy()
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const walletAddress = user?.smartWallet?.address
  const email = user?.email?.address

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  const copyAddress = async () => {
    if (walletAddress) {
      await navigator.clipboard.writeText(walletAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  if (!walletAddress) return null

  return (
    <div className="relative" ref={menuRef}>
      <Button
        variant="grey"
        size="medium"
        onClick={() => setIsOpen(!isOpen)}
        className="min-w-[120px]"
      >
        {email || 'Connected'}
      </Button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 rounded-lg border border-gray-200 bg-white shadow-lg">
          <div className="p-4">
            <div className="mb-3">
              <div className="mb-1 text-xs font-medium text-gray-500">
                Wallet Address
              </div>
              <div className="flex items-center justify-start gap-2">
                <code className="font-mono text-sm text-gray-800">
                  {formatAddress(walletAddress)}
                </code>
                <button
                  onClick={copyAddress}
                  className="flex items-center text-blue-600 hover:text-blue-800"
                  title="Copy address"
                >
                  {copied ? (
                    <CheckIcon sx={{ fontSize: 12 }} />
                  ) : (
                    <ContentCopyIcon sx={{ fontSize: 12 }} />
                  )}
                </button>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-3">
              <Button
                variant="black"
                size="small"
                onClick={() => {
                  logout()
                  setIsOpen(false)
                }}
                className="w-full"
              >
                Log out
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserMenu

