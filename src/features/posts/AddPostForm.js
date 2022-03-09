import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Spinner } from '../../components/Spinner'
import { selectAllUsers } from '../users/usersSlice'
import { addNewPost } from './postsSlice'

const AddPostForm = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectAllUsers)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [isSubmittingPost, setIsSubmittingPost] = useState(false)

  const canSave =
    Boolean(title) && Boolean(content) && Boolean(author) && !isSubmittingPost

  const onTitleChanged = (e) => setTitle(e.target.value)
  const onContentChanged = (e) => setContent(e.target.value)
  const onAuthorChanged = (e) => setAuthor(e.target.value)
  const onSavePostClicked = async () => {
    setIsSubmittingPost(true)

    try {
      await dispatch(
        addNewPost({
          title,
          content,
          user: author,
        })
      ).unwrap()

      setTitle('')
      setContent('')
      setAuthor('')
    } catch (error) {
      console.log(error)
    } finally {
      setIsSubmittingPost(false)
    }
  }

  return (
    <section style={{ position: 'relative' }}>
      <h2>Add a New Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          value={title}
          onChange={onTitleChanged}
          placeholder="What's on yout mind?"
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={onContentChanged}
        />
        <label htmlFor="postAuthor">Author:</label>
        <select id="postAuthor" value={author} onChange={onAuthorChanged}>
          <option value=""></option>
          {users &&
            users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
        </select>
        <button type="button" onClick={onSavePostClicked} disabled={!canSave}>
          Save Post
        </button>
      </form>
      {isSubmittingPost && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, 0)',
          }}
        >
          <Spinner text="loading..." />
        </div>
      )}
    </section>
  )
}

export default AddPostForm
