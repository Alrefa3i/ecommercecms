'use client'
import React, { useEffect } from 'react'

import classes from './index.module.scss'

export const Message: React.FC<{
  message?: React.ReactNode
  error?: React.ReactNode
  success?: React.ReactNode
  warning?: React.ReactNode
  className?: string
}> = ({ message, error, success, warning, className }) => {
  const messageToRender = message || error || success || warning
  const ref = React.useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => {
      if (ref.current) {
        ref.current.classList.add(classes.hide)
      }
    }, 700)
  }, [messageToRender])
  return messageToRender ? (
    <div
      ref={ref}
      className={[
        classes.message,
        className,
        error && classes.error,
        success && classes.success,
        warning && classes.warning,
        !error && !success && !warning && classes.default,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {messageToRender}
    </div>
  ) : null
}
