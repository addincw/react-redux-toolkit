import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectPostById } from './postsSlice'

const SinglePostPage = ({ match }) => {
  const { postId } = match.params

  const post = useSelector((state) => selectPostById(state, postId))

  return (
    <section>
      <article style={{ marginBottom: '1.25rem' }}>
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <Link to={`/posts/${post.id}/edit`}>Edit Post</Link>
      </article>
    </section>
  )
}

export default SinglePostPage
