import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import 'react-toastify/dist/ReactToastify.css'
import {ToastContainer} from "react-toastify"
import Home from './pages/Home';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastContainer/>
    <Home/>
  </StrictMode>,
)
