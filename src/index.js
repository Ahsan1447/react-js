import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { RouterProvider, Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Logout from './components/Logout/Logout';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Index from './components/Merchant/Index';
import Create from './components/Merchant/Create';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/logout',
    element: <Logout />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/login/merchant',
    element: <Index />
  },
  {
    path: '/login/merchant/create',
    element: <Create />
  }
])

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />}>
//       {/* <Route path="" element={<Logout />} /> */}
//     </Route>
//   )
// )

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
