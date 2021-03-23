export const saveCookie = (options) => {
  const { cname, cvalue, expiredDays, expiredHours, path = '/' } = options

  const date = new Date()

  if (expiredDays) {
    date.setDate(date.getDate() + expiredDays)
  }
  if (expiredHours) {
    date.setHours(date.getHours() + expiredHours)
  }

  const expires = date.toUTCString()

  document.cookie = `${cname}=${cvalue};expires=${expires};path=${path}`
}

export const getCookieValue = (name) => {
  var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'))
  if (match) return match[2]
}

export const removeCookie = (name) => {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'
}
