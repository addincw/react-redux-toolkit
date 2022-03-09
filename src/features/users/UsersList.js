import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import { selectAllUsers } from './usersSlice'

import { Spinner } from '../../components/Spinner'

const UsersList = () => {
  const status = useSelector((state) => state.users.status)
  const users = useSelector(selectAllUsers)

  let content

  if (['idle', 'loading'].includes(status)) {
    content = <Spinner text="loading..." />
  } else if (status === 'succeeded') {
    content = (
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
          </li>
        ))}
      </ul>
    )
  }

  return (
    <section>
      <h2>Users</h2>
      {content}
    </section>
  )
}

export default UsersList
