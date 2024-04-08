'use client'

import { AuthContext } from "@/contexts/AuthContext";
import { useContext } from "react";
import { parseCookies } from 'nookies';
import { getApiClient } from "@/services/api";
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'
import { useRouter } from "next/navigation";


export default function Home() {
  const { user } = useContext(AuthContext);

  return (
    <div>Hello {user?.name ?? 'unkown'}, wellcome to home!</div>
  )
}