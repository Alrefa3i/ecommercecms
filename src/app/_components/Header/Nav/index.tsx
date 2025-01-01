'use client'

import React from 'react'
import { ShoppingBag } from '@mui/icons-material'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import LoginIcon from '@mui/icons-material/Login'
import MenuIcon from '@mui/icons-material/Menu'
import Link from 'next/link'

import { Header as HeaderType, User } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { CMSLink } from '../../Link'
import { Media } from '../../Media'

import './nav.css'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []
  const logo = header?.logo
  const { user } = useAuth()

  return (
    <div className="">
      <div className="navbar w-full">
        <div className="navbar-start">
          <Link href="/" className="navbar-item">
            <Media resource={logo} className="w-1/2 lg:w-1/3 mx-auto" />
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          {navItems.map((item, index) => (
            <CMSLink
              key={index}
              url={`/${item.link.reference.value['slug']}`}
              className="navbar-item text-logo-800"
              label={item.link.label}
            ></CMSLink>
          ))}
        </div>
        <div className="navbar-end lg:hidden justify-center gap-10" style={{ direction: 'ltr' }}>
          <div className="dropdown">
            <label className="my-2" tabIndex={0}>
              <MenuIcon className="text-logo-700 cursor-pointer size-8 "></MenuIcon>
            </label>
            <div className="dropdown-menu dropdown-menu-bottom-right">
              {navItems.map((item, index) => (
                <div key={index}>
                  {' '}
                  <CMSLink
                    url={`/${item.link.reference.value['slug']}`}
                    className="dropdown-item text-sm"
                    label={item.link.label}
                  ></CMSLink>
                  {index == 0 && <div className="dropdown-divider"></div>}
                </div>
              ))}
            </div>
          </div>

          {user ? (
            <Link href={'/account'}>
              <AccountCircleIcon className="text-logo-600 size-9"></AccountCircleIcon>
            </Link>
          ) : (
            <Link href={'/login'}>
              <LoginIcon className="text-logo-600 size-9"></LoginIcon>
            </Link>
          )}

          <Link href="/cart">
            <ShoppingBag className="text-logo-600 size-8"></ShoppingBag>
          </Link>
        </div>
        <div className="navbar-end  hidden lg:flex ">
          <div className="container flex justify-end">
            <div className="navbar-item flex justify-center items-center">
              <Link href="/cart">
                <ShoppingBag className="text-logo-600 size-8"></ShoppingBag>
              </Link>
            </div>
            <div className="navbar-item">
              {user ? (
                <Link href={'/account'}>
                  <AccountCircleIcon className="text-logo-600 size-8"></AccountCircleIcon>
                </Link>
              ) : (
                <Link href={'/login'}>
                  <LoginIcon className="text-logo-600 size-9"></LoginIcon>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
