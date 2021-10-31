import React, { VFC } from 'react'
import { ReadNews } from '../types/types'
import Link from 'next/link'

type Props = {
  post: ReadNews
}

export const Post: VFC<Props> = ({ post }) => {
  return (
    <div>
      <Link href={`/posts/${post.id}`} passHref>
        <span className="cursor-pointer text-white border-b border-gray-500 hover:bg-gray-600">
          {post.id}
        </span>
      </Link>
    </div>
  )
}
