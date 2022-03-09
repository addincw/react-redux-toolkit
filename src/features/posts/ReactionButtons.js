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
    dispatch(
      reactionAdded({
        postId: post.id,
        reaction,
      })
    )
  }
  return (
    <div style={{ marginLeft: '-6px' }}>
      {Object.entries(reactionEmoji).map(([name, emoji]) => (
        <button
          type="button"
          className="muted-button reaction-button"
          onClick={() => onReactionClicked(name)}
          key={name}
        >
          {`${emoji} ${post.reactions[name] || 0}`}
        </button>
      ))}
    </div>
  )
}

export default ReactionButtons
