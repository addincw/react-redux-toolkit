import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'

import { Navbar } from './app/Navbar'
import NotificationsList from './features/notifications/NotificationsList'
import AddPostForm from './features/posts/AddPostForm'
import EditPostForm from './features/posts/EditPostForm'
import PostsList from './features/posts/PostsList'
import SinglePostPage from './features/posts/SinglePostPage'
import SingleUserPage from './features/users/SingleUserPage'
import UsersList from './features/users/UsersList'
import { fetchUsers } from './features/users/usersSlice'

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <Router>
      <Navbar />
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <>
                <AddPostForm />
                <PostsList />
              </>
            )}
          />
          <Route exact path="/posts/:postId" component={SinglePostPage} />
          <Route exact path="/posts/:postId/edit" component={EditPostForm} />
          <Route exact path="/users" component={UsersList} />
          <Route exact path="/users/:userId" component={SingleUserPage} />
          <Route exact path="/notifications" component={NotificationsList} />
          <Route exact path="/users/:userId" component={SingleUserPage} />
          <Redirect to="/" />
        </Switch>
      </div>
    </Router>
  )
}

export default App
