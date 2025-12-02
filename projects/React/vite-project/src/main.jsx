import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Accordin from './assets/components/Accordin'
import FormHandling from './assets/components/FormHandling'

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <section className='Accordin'> <Accordin/></section>

   <section className='formHandling'> <FormHandling/></section>
  </StrictMode>,
)
