'use client'

import React, { useEffect, useRef } from 'react'
import classNames from 'classnames'

export type ButtonProps = {
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
  variant?: 'black' | 'grey' | 'white' | 'red' | 'blue'
  size?: 'small' | 'normal' | 'medium' | 'custom'
  disabled?: boolean
  isLoading?: boolean
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  children?: React.ReactNode
}

const Button: React.FC<ButtonProps> = ({
  variant = 'black',
  type = 'button',
  size = 'normal',
  disabled = false,
  isLoading = false,
  className,
  onClick,
  children,
}) => {
  const isBlackVariant = variant === 'black'
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  const mouseMoveEvent = (e: MouseEvent) => {
    if (buttonRef.current) {
      const { x, y } = buttonRef.current.getBoundingClientRect()
      buttonRef.current.style.setProperty('--x', `${e.clientX - x}`)
      buttonRef.current.style.setProperty('--y', `${e.clientY - y}`)
    }
  }

  useEffect(() => {
    if (!isBlackVariant || !buttonRef?.current) return

    const button = buttonRef.current
    button.addEventListener('mousemove', mouseMoveEvent)

    return () => {
      if (button) {
        button.removeEventListener('mousemove', mouseMoveEvent)
      }
    }
  }, [isBlackVariant, buttonRef])

  const baseClasses = 'flex items-center justify-center gap-2.5 rounded-full'

  const variantClasses = (() => {
    switch (variant) {
      case 'white':
        return 'bg-button border border-border-secondary text-black'
      case 'grey':
        return 'bg-button-secondary text-gray-800'
      case 'red':
        return 'bg-button-red text-white'
      case 'blue':
        return 'bg-button-blue text-white'
      case 'black':
      default:
        return 'bg-button-black text-white'
    }
  })()

  const sizeClasses = (() => {
    switch (size) {
      case 'small':
        return 'min-h-[38px] px-2.5 text-[15px]'
      case 'medium':
        return 'min-h-[42px] px-4 font-medium'
      case 'custom':
        return ''
      case 'normal':
      default:
        return 'min-h-[48px] px-6 font-medium'
    }
  })()

  const loadingClasses = isLoading
    ? '!bg-button-secondary !text-gray-900 !cursor-not-allowed'
    : ''

  const disabledClasses = disabled ? '!cursor-not-allowed !opacity-70' : ''

  const blackVariantClasses = isBlackVariant
    ? 'relative overflow-hidden group leading-none'
    : ''

  const whiteVariantClasses =
    variant === 'white' ? 'hover:bg-button-secondary' : ''

  return (
    <button
      ref={buttonRef}
      type={type}
      disabled={disabled || isLoading}
      className={classNames(
        baseClasses,
        variantClasses,
        sizeClasses,
        loadingClasses,
        disabledClasses,
        blackVariantClasses,
        whiteVariantClasses,
        className
      )}
      onClick={onClick}
      style={
        isBlackVariant
          ? ({
              '--x': 0,
              '--y': 0,
            } as React.CSSProperties)
          : {}
      }
    >
      {isLoading && (
        <svg
          className="h-4 w-4 animate-spin"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      )}
      {children}
      {isBlackVariant && (
        <span
          className="pointer-events-none absolute h-[120px] w-[120px] rounded-full opacity-0 transition-opacity duration-200 group-hover:opacity-30"
          style={{
            top: 'calc(var(--y, 0) * 1px - 60px)',
            left: 'calc(var(--x, 0) * 1px - 60px)',
            background: 'radial-gradient(white, transparent 50%)',
          }}
        />
      )}
    </button>
  )
}

export default Button

