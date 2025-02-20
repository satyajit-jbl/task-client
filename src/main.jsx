import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {

  RouterProvider,
} from "react-router-dom";
import { router } from './Routes/Routes';
import AuthProvider from './provider/AuthProvider';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      {/* <div className='max-w-screen-xl mx-auto'> */}
      <div>
        <RouterProvider router={router} />
      </div>
    </AuthProvider>

  </StrictMode>,
)
