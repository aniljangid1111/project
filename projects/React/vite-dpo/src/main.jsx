import  React,{ StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@fontsource-variable/inter';
import '@fontsource/merriweather';
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
