import React from 'react'
import { useSelector } from 'react-redux'

import { selectPostByUser } from '../posts/postsSlice'
import { selectUserById } from './usersSlice'

import { PostExcerpt } from '../posts/PostsList'

const SingleUserPage = ({ match }) => {
  const { userId } = match.params

  const user = useSelector((state) => selectUserById(state, userId))
  const userPosts = useSelector((state) => selectPostByUser(state, userId))

  return (
    <section className="posts-list">
      <article style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ marginBottom: 0 }}>{user.name}</h2>
        <p className="post-content" style={{ marginTop: 0 }}>
          {`@${user.username}`}
        </p>
      </article>
      <h3>Posts</h3>
      {userPosts.map((post) => (
        <PostExcerpt key={post.id} post={post} />
      ))}
    </section>
  )
}

export default SingleUserPage
