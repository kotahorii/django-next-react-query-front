import { GetStaticProps } from 'next'
import React from 'react'
import { dehydrate, QueryClient, useQueryClient } from 'react-query'
import { getTasks } from '../lib/fetch'
import { ReadTask } from '../types/types'

const TaskPage = () => {
  const queryClient = useQueryClient()
  const data = queryClient.getQueryData<ReadTask[]>('tasks')
  return <div>
    
  </div>
}

export default TaskPage

export const getStaticProps: GetStaticProps = async () => {
  const queryClient = new QueryClient()
  await queryClient.prefetchQuery('tasks', getTasks)
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
    revalidate: 3,
  }
}
