import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  fetchNotifications,
  selectUnreadNotifications,
} from '../features/notifications/notificationsSlice'

export const Navbar = () => {
  const dispatch = useDispatch()

  const unreadNotifications = useSelector(selectUnreadNotifications).length
  const fetchNewNotificationsStatus = useSelector(
    (state) => state.notifications.status
  )
  const canRefreshNotifications = fetchNewNotificationsStatus !== 'loading'

  const fetchNewNotifications = () => {
    dispatch(fetchNotifications())
  }

  return (
    <nav>
      <section>
        <h1>Redux Essentials Example</h1>

        <div className="navContent">
          <div className="navLinks">
            <Link to="/">Posts</Link>
            <Link to="/users">Users</Link>
            <Link to="/notifications">
              Notifications{' '}
              {unreadNotifications > 0 && (
                <span className="badge">{unreadNotifications}</span>
              )}
            </Link>
          </div>
          <button
            className="button"
            onClick={fetchNewNotifications}
            disabled={!canRefreshNotifications}
          >
            Refresh Notifications
          </button>
        </div>
      </section>
    </nav>
  )
}
