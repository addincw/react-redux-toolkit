import React from 'react'
import { useDispatch } from 'react-redux'
import { reactionAdded } from './postsSlice'

const reactionEmoji = {
  thumbsUp: '👍',
  hooray: '🎉',
  heart: '❤️',
  rocket: '🚀',
  eyes: '👀',
}

const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch()

  const onReactionClicked = (reaction) => {
    console.log(reaction)
    dispatch(
      reactionAdded({
        postId: post.id,
        reaction,
      })
    )
  }
  return Object.entries(reactionEmoji).map(([name, emoji]) => (
    <button
      type="button"
      className="muted-button reaction-button"
      onClick={() => onReactionClicked(name)}
    >
      {`${emoji} ${post.reactions[name] || 0}`}
    </button>
  ))
}

export default ReactionButtons
