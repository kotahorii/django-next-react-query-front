import { GetStaticProps } from 'next'
import React, { VFC } from 'react'
import { useQuery } from 'react-query'
import { Layout } from '../components/Layout'
import { Task } from '../components/Task'
import { useEditedTask } from '../hooks/useEditedTask'
import { getTasks } from '../lib/fetch'
import { ReadTask } from '../types/types'
import Link from 'next/link'
import axios from 'axios'

export const getFrontTasks = async () => {
  const res = await axios.get<ReadTask[]>(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}tasks/`
  )
  return res.data
}

const TaskPage: VFC<{ tasks: ReadTask[] }> = ({ tasks }) => {
  const { data } = useQuery<ReadTask[], Error>({
    queryKey: 'tasks',
    queryFn: getFrontTasks,
    staleTime: Infinity,
    initialData: tasks,
  })
  const { editedTask, setEditedTask } = useEditedTask()
  return (
    <Layout title="Task Page">
      <ul>
        {data.map((task) => (
          <Task key={task.id} task={task} />
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

export default TaskPage

export const getStaticProps: GetStaticProps = async () => {
  const tasks = await getTasks()
  return {
    props: {
      tasks,
    },
    revalidate: 3,
  }
}
