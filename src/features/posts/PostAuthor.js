import React from 'react'
import { useSelector } from 'react-redux'

const PostAuthor = ({ userId }) => {
  const author = useSelector((state) =>
    state.users.find((user) => user.id === userId)
  )
  return <span>By {author ? author.name : 'Unknown Author'}</span>
}

export default PostAuthor
