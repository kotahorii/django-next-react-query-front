import Cookie from 'universal-cookie'
import fetch from 'node-fetch'
import { ReadNews, ReadTask } from '../types/types'
import axios from 'axios'

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

export const getAllPostIds = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}news/`)
  const posts = (await res.json()) as ReadNews[]
  return posts.map((post) => {
    return {
      params: {
        id: String(post.id),
      },
    }
  })
}
export const getPostData = async (id: string | string[]) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}news/${id}/`)
  const post = (await res.json()) as ReadNews
  return post
}
