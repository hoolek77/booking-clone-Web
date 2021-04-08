import { useContext } from 'react'
import { NotificationsContext } from '../context/notifications'

const useNotification = () => {
  const [notifications, setNotifications] = useContext(NotificationsContext)

  const openNotification = (message, severity) => {
    setNotifications({
      open: true,
      message,
      severity,
    })
  }

  const closeNotification = () => {
    setNotifications((prevState) => ({
      ...prevState,
      open: false,
    }))
  }

  return {
    openNotification,
    closeNotification,
    message: notifications.message,
    severity: notifications.severity,
    open: notifications.open,
  }
}

export default useNotification
