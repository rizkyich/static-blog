import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {MainLayout} from '../components/MainLayout'
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter()
  const param = router

  console.log(param.query.q, 'search')

  return (
    <MainLayout>
      <main>
        <h1>Hasil Search = {param.query.q}</h1>
      </main>
    </MainLayout>
  )
}
