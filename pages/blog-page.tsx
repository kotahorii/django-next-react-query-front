import React, { VFC } from 'react'
import { dehydrate, QueryClient, useQueryClient } from 'react-query'
import { Layout } from '../components/Layout'
import { getNews } from '../lib/fetch'
import Link from 'next/link'
import { ReadNews } from '../types/types'
import { Post } from '../components/Post'
import { GetStaticProps } from 'next'
import axios from 'axios'

export const getFrontNews = async () => {
  const res = await axios.get<ReadNews[]>(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}tasks/`
  )
  return res.data
}

const BlogPage: VFC<{ news: ReadNews[] }> = ({ news }) => {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<ReadNews[]>('news')
  return (
    <Layout title="Blog page">
      <ul>
        {data?.map((post) => (
          <Post post={post} key={post.id} />
        ))}
      </ul>
      <Link href="/main-page" passHref>
        <div className="flex cursor-pointer mt-12">
          <svg
            className="w-6 h-6 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
            />
          </svg>
          <span>Back to main page</span>
        </div>
      </Link>
    </Layout>
  )
}

export default BlogPage

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('news', getNews)
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 3,
  }
}
