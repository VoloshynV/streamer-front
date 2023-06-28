'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

import { cn } from '@/lib/utils'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from './ui'

const nav = [
  {
    link: '/',
    name: 'Streamers',
  },
  {
    link: '/new-streamer',
    name: 'Add Streamer',
  },
]

interface NavigationItemProps {
  link: string
  name: string
}

const NavigationItem = ({ link, name }: NavigationItemProps) => {
  return (
    <NavigationMenuItem>
      <Link href={link} legacyBehavior passHref>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>{name}</NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  )
}

const Navigation = () => {
  return (
    <NavigationMenu className='p-2'>
      <NavigationMenuList>
        {nav.map((item, index) => (
          <NavigationItem key={index} link={item.link} name={item.name} />
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export { Navigation }
