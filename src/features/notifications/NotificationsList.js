import classnames from 'classnames'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  selectAllNotifications,
  updateAllNoticationsReaded,
} from './notificationsSlice'

import { Spinner } from '../../components/Spinner'

import TimeAgo from '../posts/TimeAgo'
import PostAuthor from '../posts/PostAuthor'

export const Notification = ({ notification }) => {
  const rootClasses = classnames('notification', {
    new: notification.isNew,
  })

  return (
    <div className={rootClasses}>
      <div>
        <b>
          <PostAuthor userId={notification.user} />
        </b>
        &nbsp;
        {notification.message}
      </div>
      <div>
        <TimeAgo timestamp={notification.date} />
      </div>
    </div>
  )
}

const NotificationsList = () => {
  const dispatch = useDispatch()

  const status = useSelector((state) => state.notifications.status)
  const notifications = useSelector(selectAllNotifications)

  let content = 'No notifications.'

  useEffect(() => {
    dispatch(updateAllNoticationsReaded())
  })

  if (status === 'loading') {
    content = <Spinner text="loading..." />
  } else if (status === 'succeeded') {
    content = notifications.map((notification) => (
      <Notification notification={notification} key={notification.id} />
    ))
  }

  return (
    <section className="notificationsList">
      <h2>Notifications</h2>
      {content}
    </section>
  )
}

export default NotificationsList
