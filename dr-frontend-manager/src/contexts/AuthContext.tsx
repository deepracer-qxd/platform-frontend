'use client'

import User from '@/model/User';
import { api } from '@/services/axios';
import React, { createContext, useEffect, useState } from 'react';
import { setCookie, parseCookies } from 'nookies';
import { useRouter } from 'next/navigation'
import { recoverUserInfo } from '@/api/user';


type AuthContextType = {
  isAuthenticated: boolean;
  user: User | null;
  signIn: (data: SignInData) => Promise<void>;
}

type UserData = {
  token: string,
  user: User
}

type SignInData = {
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({children}: Readonly<{children: React.ReactNode}>){
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'deep.auth.token': token } = parseCookies()
    if(token) recoverUserInfo(token).then(user => setUser(user))
  })

  async function signIn({ email, password }: SignInData){
    const response = await api.post<UserData>('login', {
      email: email,
      password: password
    })
    
    setCookie(undefined, 'deep.auth.token', response.data.token, {
      maxAge: 60 * 60 * 8 // 8 hours
    })

    api.defaults.headers['Authorization'] = `Bearer ${response.data.token}`

    setUser(response.data.user)

    router.push('/home')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}