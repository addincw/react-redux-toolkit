import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { useSelector } from 'react-redux'
import { client } from '../../api/client'

const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async (_, { getState }) => {
    const notifications = selectAllNotifications(getState())
    const [latestNotification] = notifications
    const latestTimestamp = latestNotification ? latestNotification.date : ''
    const response = await client.get(
      `/fakeApi/notifications?since=${latestTimestamp}`
    )
    return response.data
  }
)

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState: {
    status: 'idle',
    data: [],
  },
  reducers: {
    updateAllNoticationsReaded(state, action) {
      state.data.forEach((n) => {
        n.read = true
      })
    },
  },
  extraReducers: {
    [fetchNotifications.pending]: (state, action) => {
      state.status = 'loading'
    },
    [fetchNotifications.fulfilled]: (state, action) => {
      state.status = 'succeeded'

      const newNotifications = action.payload.map((n) => ({
        ...n,
        read: false,
        isNew: true,
      }))
      state.data.push(...newNotifications)
      state.data.sort((a, b) => b.date.localeCompare(a.date))
      state.data.forEach((n) => {
        n.isNew = !n.read
      })
    },
  },
})

export const selectAllNotifications = (state) => state.notifications.data

export { fetchNotifications }

export const { updateAllNoticationsReaded } = notificationsSlice.actions

export default notificationsSlice.reducer
