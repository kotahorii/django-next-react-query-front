import { useEffect, VFC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { getTaskData } from '../../lib/fetch'
import { GetStaticPaths, GetStaticProps } from 'next'
import { Layout } from '../../components/Layout'
import { ReadTask } from '../../types/types'

const fetcher = (url) => fetch(url).then((res) => res.json())

const Task: VFC<{ task: ReadTask }> = ({ task }) => {
  const router = useRouter()
  if (router.isFallback || !task) return <div>Loading...</div>
  return (
    <Layout title={task.title}>
      <span className="mb-4">
        {'ID : '}
        {task.id}
      </span>
      <p className="mb-4 text-xl font-bold">{task.title}</p>
      <p className="mb-12">{task.created_at}</p>
      <Link href="/task-page" passHref>
        <div className="flex cursor-pointer mt-8">
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
          <span>Back to task-page</span>
        </div>
      </Link>
    </Layout>
  )
}
export default Task

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}tasks/`)
  const tasks = (await res.json()) as ReadTask[]
  const paths = await tasks.map((task) => ({
    params: {
      id: task.id,
    },
  }))
  return {
    paths,
    fallback: true,
  }
}
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const task = await getTaskData(params.id)
  return {
    props: {
      task,
    },
    revalidate: 3,
  }
}
