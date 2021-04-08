export const SETTINGS = {
  API_BASE_URL: '',
}

switch (process.env.REACT_APP_ENV) {
  case 'development':
    SETTINGS.API_BASE_URL = 'http://localhost:27017/'
    break
  case 'production':
  default:
    SETTINGS.API_BASE_URL = 'https://booking-clone-api.herokuapp.com/'
    break
}
