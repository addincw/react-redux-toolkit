import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { fetchPosts, selectAllPosts } from './postsSlice'

import { Spinner } from '../../components/Spinner'

import PostAuthor from './PostAuthor'
import ReactionButtons from './ReactionButtons'
import TimeAgo from './TimeAgo'

export const PostExcerpt = ({ post }) => (
  <article className="post-excerpt" key={post.id}>
    <h3>{post.title}</h3>
    <div>
      <PostAuthor userId={post.user} />
      &nbsp;
      <TimeAgo timestamp={post.date} />
    </div>
    <p className="post-content">{post.content.substring(0, 100)}</p>
    <ReactionButtons post={post} />
    <div>
      <Link className="button muted-button" to={`/posts/${post.id}`}>
        View Post
      </Link>
    </div>
  </article>
)

const PostsList = () => {
  const dispatch = useDispatch()

  const status = useSelector((state) => state.posts.status)
  const error = useSelector((state) => state.posts.error)
  const posts = useSelector(selectAllPosts)

  let content = <Spinner text="loading..." />

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts())
    }
  }, [dispatch, status])

  if (status === 'loading') {
    content = <Spinner text="loading..." />
  } else if (status === 'succeeded') {
    const orderedPosts = posts
      .slice()
      .sort((a, b) => b.date.localeCompare(a.date))

    content = orderedPosts.map((post) => (
      <PostExcerpt post={post} key={post.id} />
    ))
  } else if (status === 'failed') {
    content = <div>{error}</div>
  }

  return (
    <section className="posts-list">
      <h2>Posts</h2>
      {content}
    </section>
  )
}

export default PostsList
