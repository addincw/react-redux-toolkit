import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from '../users/usersSlice'

const PostAuthor = ({ userId }) => {
  const author = useSelector((state) => selectUserById(state, userId))
  return <span>By {author ? author.name : 'Unknown Author'}</span>
}

export default PostAuthor
