'use client'

import { fetchWrapper } from '@/api/fetch';
import User from '@/model/User';
import Router from 'next/router';
import React, { createContext, useState } from 'react';

type AuthContextType = {
  isAuthenticated: boolean;
  user: User;
  signIn: (data: SignInData) => Promise<void>;
}

type SignInData = {
  email: string;
  password: string;
}

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({children}: Readonly<{children: React.ReactNode}>){
  const [user, setUser] = useState<User>({} as User)
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInData){
    console.log("Calling the signin function")
    console.log(`The email is ${email} and the password is ${password}`)

    const data = await fetchWrapper('login', 
      JSON.stringify({
        email : email,
        password: password
      })
    )
    

    console.log(data)

    // Router.push('/home')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, signIn }}>
      {children}
    </AuthContext.Provider>
  )
}