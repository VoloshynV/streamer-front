'use client'

import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '../ui'

const nav = [
  {
    link: '/',
    name: 'Streamers',
  },
]

interface NavigationItemProps {
  link?: string
  name: string
  className?: string
  onClick?: () => void
}

const NavigationItem = ({ link = '', name, className, onClick }: NavigationItemProps) => {
  return (
    <NavigationMenuItem className={className} onClick={onClick}>
      <Link href={link} legacyBehavior passHref>
        <NavigationMenuLink className={navigationMenuTriggerStyle()}>{name}</NavigationMenuLink>
      </Link>
    </NavigationMenuItem>
  )
}

const Navigation = () => {
  const { status } = useSession()
  const isSignedIn = status === 'authenticated'

  return (
    <NavigationMenu className='p-2'>
      <NavigationMenuList>
        {nav.map((item, index) => (
          <NavigationItem key={index} link={item.link} name={item.name} />
        ))}
        {isSignedIn ? (
          <NavigationItem link='' name='LogOut' onClick={() => signOut()} />
        ) : (
          <NavigationItem link='api/auth/signin' name='SignIn' />
        )}
      </NavigationMenuList>
    </NavigationMenu>
  )
}

export { Navigation }
