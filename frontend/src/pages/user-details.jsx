import { useEffect } from 'react'
import { useParams } from 'react-router-dom'

import { userService } from '../services/user.service.js'
import { loadUser } from '../store/user.actions'
import { store } from '../store/store'
import { showSuccessMsg } from '../services/event-bus.service'
import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from '../services/socket.service'

export function UserDetails() {
  const loggedInUser = userService.getLoggedinUser()
  const params = useParams()

  useEffect(() => {
    loadUser(params.id)

    socketService.emit(SOCKET_EMIT_USER_WATCH, params.id)
    socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate)

    return () => {
      socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate)
    }

  }, [])

  function onUserUpdate(user) {
    showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`)
    store.dispatch({ type: 'SET_WATCHED_USER', user })
  }

  return (
    <section className="user-details">
      <h1>User Details</h1>
      {loggedInUser && <div>
        <h3>
          {loggedInUser.fullname}
        </h3>
        <h2>email: {loggedInUser.email}</h2>
        <img src={`${loggedInUser.imgUrl}`} style={{ width: '50vw', objectFit:'contain'}} alt="" />
        <pre>
          {JSON.stringify(loggedInUser, null, 2)}
        </pre>
      </div>}
    </section>
  )
}