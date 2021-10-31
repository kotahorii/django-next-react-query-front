import Cookie from 'universal-cookie'
import fetch from 'node-fetch'
import { ReadNews, ReadTask } from '../types/types'

export const getNews = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}news/`)
  const news = (await res.json()) as ReadNews[]
  return news
}

export const getTasks = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}tasks/`)
  const tasks = (await res.json()) as ReadTask[]
  return tasks
}
