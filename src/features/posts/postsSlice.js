import { createSlice, nanoid } from '@reduxjs/toolkit'
import { sub } from 'date-fns'

const initialState = [
  {
    id: '1',
    title: 'First Post!',
    content: 'Hello!',
    date: sub(new Date(), { minutes: 10 }).toISOString(),
    reactions: {},
  },
  {
    id: '2',
    title: 'Second Post',
    content: 'More text',
    date: sub(new Date(), { minutes: 5 }).toISOString(),
    reactions: {},
  },
]

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postAdded: {
      reducer(state, action) {
        state.push(action.payload)
      },
      prepare(submittedPost) {
        return {
          payload: {
            ...submittedPost,
            id: nanoid(),
            date: new Date().toISOString(),
          },
        }
      },
    },
    postUpdated(state, action) {
      const submittedPost = action.payload
      const currentPost = state.find((post) => post.id === submittedPost.id)

      if (currentPost) {
        currentPost.title = submittedPost.title
        currentPost.content = submittedPost.content
      }
    },
    reactionAdded(state, action) {
      const { postId, reaction } = action.payload
      const currentPost = state.find((post) => post.id === postId)

      if (currentPost && currentPost.reactions[reaction]) {
        currentPost.reactions[reaction] += 1
        return
      }

      currentPost.reactions[reaction] = 1
    },
  },
})

export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions

export default postsSlice.reducer
