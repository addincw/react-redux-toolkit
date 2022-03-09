import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await client.get('/fakeApi/users')
  return response.data
})

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    data: [],
    status: 'idle',
  },
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchUsers.pending, (state, action) => {
      state.status = 'loading'
    })
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = 'succeeded'
      state.data = action.payload
    })
  },
})

export const selectAllUsers = (state) => state.users.data

export const selectUserById = (state, userId) => {
  return state.users.data.find((user) => user.id === userId)
}

export { fetchUsers }

export default usersSlice.reducer
