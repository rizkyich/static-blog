import {useState, useEffect} from 'react'
import {MainLayout} from '../../components/MainLayout'
import { useRouter } from "next/router";
import {RecentArticles} from '../../components/RecentArticles'

export default function Search() {
  const router = useRouter()
  const {slug} = router.query 
  const [response, setResponse] = useState(null)

  useEffect(async () => {
    if (slug) setResponse(await fetchData())
  }, [slug])

  const fetchData = async () => {
    const res = await fetch('https://apiw.higo.id/blog-search', 
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({article_id: '', keyword: slug})
    })
    const json = await res.json()
    return json
  }

  return (
    <MainLayout>
     <main className="w-full h-auto py-8 md:py-12">
        <div className="container mx-auto relative md:px-8 lg:px-40 xl:px-96 2xl:px-96">
          
          {
            response && 
              <RecentArticles idArr={response.article_id} keyword={slug[0]} articles={response.arr_article}/>
          }
        </div>          
      </main>
    </MainLayout>
  )
}
