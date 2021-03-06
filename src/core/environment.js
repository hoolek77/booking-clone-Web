const SETTINGS = {
    API_BASE_URL: null,
};

switch (process.env.NODE_ENV) {
    case 'development':
        SETTINGS.API_BASE_URL = 'http://localhost:3000/';
        break;
    case 'prod':
    case 'production':
        SETTINGS.API_BASE_URL = 'https://booking-clone-api.herokuapp.com/';
        break;
}

exports.SETTINGS = SETTINGS