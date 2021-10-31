import axios from 'axios'
import React from 'react'
import { QueryClient, useMutation, useQueryClient } from 'react-query'
import { ReadTask } from '../types/types'
import Cookie from 'universal-cookie'
const cookie = new Cookie()

export const useAppMutate = () => {
  const queryClient = useQueryClient()
  const deleteTaskMutation = useMutation(
    (id: string) =>
      axios.delete(`${process.env.NEXT_PUBLIC_RESTAPI_URL}tasks/${id}`, {
        headers: {
          Authorization: `JWT ${cookie.get('access_token')}`,
        },
      }),
    {
      onSuccess: (res, variables) => {
        const previousTask = queryClient.getQueryData<ReadTask[]>('tasks')
        if (previousTask) {
          queryClient.setQueryData<ReadTask[]>(
            'tasks',
            previousTask.filter((task) => task.id !== variables)
          )
        }
      },
    }
  )
  return { deleteTaskMutation }
}
