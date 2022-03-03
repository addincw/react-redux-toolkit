import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const SinglePostPage = ({ match }) => {
  const { postId } = match.params

  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  )

  return (
    <section>
      <article>
        <h2>{post.title}</h2>
        <p className="post-content">{post.content}</p>
        <Link to={`/posts/${post.id}/edit`}>Edit Post</Link>
      </article>
    </section>
  )
}

export default SinglePostPage
