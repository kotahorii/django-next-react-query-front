import { GetStaticPaths, GetStaticProps } from 'next'
import React, { VFC } from 'react'
import { Layout } from '../../components/Layout'
import { getAllPostIds, getPostData } from '../../lib/fetch'
import { ReadNews } from '../../types/types'
import Link from 'next/link'

const Blogs: VFC<{ post: ReadNews }> = ({ post }) => {
  return (
    <Layout title={post.id}>
      <p className="m-4">
        {'ID : '}
        {post.id}
      </p>
      <p className="mb-4 text-xl font-bold">{post.content}</p>
      <p className="mb-12">{post.created_at}</p>
      <p className="px-10">{post.content}</p>
      <Link href="/blog-page" passHref>
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
          <span>Back to blog-page</span>
        </div>
      </Link>
    </Layout>
  )
}

export default Blogs

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await getAllPostIds()

  return {
    paths,
    fallback: true,
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = await getPostData(params.id)
  return {
    props: {
      post,
    },
  }
}
