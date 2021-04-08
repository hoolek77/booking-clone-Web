import React, { useState, createContext } from 'react'

const NotificationsContext = createContext([{}, () => {}])

const NotificationsContextProvider = ({ children }) => {
  const [notifications, setNotifications] = useState({
    message: '',
    severity: '',
    open: false,
  })

  return (
    <NotificationsContext.Provider value={[notifications, setNotifications]}>
      {children}
    </NotificationsContext.Provider>
  )
}

export { NotificationsContext, NotificationsContextProvider }
