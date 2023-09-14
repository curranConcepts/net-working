import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    createBrowserRouter,
    RouterProvider,
} from 'react-router-dom'
import './index.css'
import Root, { 
  loader as rootLoader,
  action as rootAction,
} from './routes/root'
import ErrorPage from './error-page'
import Contact, {
  loader as contactLoader,
  action as contactAction,
} from './routes/contact'
import EditContact, {
  action as editAction,
}from './routes/edit'
import { action as destroyAction } from './routes/destroy'
import Index from "./routes/index"


/* The `createBrowserRouter` function is creating a router configuration for the React application. It
takes an array of route objects as its argument. Each route object represents a specific route in
the application. */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    loader: rootLoader,
    action: rootAction,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <Index /> },
          {
            path: 'contacts/:contactId',
            element: <Contact />,
            loader: contactLoader,
            action: contactAction,
          },
          {
            path: "contacts/:contactId/edit",
            element: <EditContact />,
            loader: contactLoader,
            action: editAction,
          },
          {
            path: "contacts/:contactId/destroy",
            action: destroyAction,
            errorElement: <div>Oh no! It looks like something went wrong.</div>,
          },
        ]
      },
    ]
  },    
]);



ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
