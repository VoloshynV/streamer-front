import axios from 'axios'
import { AuthOptions, User } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import { API } from './api'

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'jsmith', required: true },
        password: { label: 'Password', type: 'password', required: true },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) return null

        const user = await axios
          .post<User>(`${API.BASE_URL}/auth/login`, credentials)
          .then((res) => res.data)

        if (user) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token as any
      return session
    },
  },
  session: {
    maxAge: 60 * 60 * 24 * 2, // 2 days
  },
  secret: process.env.NEXTAUTH_SECRET,
}
