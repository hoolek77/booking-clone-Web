import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './core/bootstrap'

import reportWebVitals from './reportWebVitals';
import generalRoutes from './routes/general';
import adminRoutes from './routes/admin'
import hotelOwnerRoutes from './routes/hotelOwner';
import userRoutes from './routes/user';

/* *********************** INFO *********************** */
/*
 * use API_BASE_URL variable to declare basic ul
 * example: fetchData(`${API_BASE_URL}api/.....`, body)
 * 
 * run "npm start" to work on local DB (recommended)
 * run "npm run serve:prod" to work on prudction DB
 * 
 * general routes file has an example of how should 
 * route array look like
 * 
 * *********************** INFO *********************** */

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>

      {/* GENERAL ROUTES */}
      { generalRoutes }

      {/* ADMIN ROUTES */}
      { adminRoutes }

      {/* USER ROUTES */}
      {/* { userRoutes } */}

      {/* HOTEL OWNER ROUTES */}
      {/* { hotelOwnerRoutes } */}

    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
