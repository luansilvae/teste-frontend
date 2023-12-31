import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.sass'
import { CartProvider } from './contexts/CartContext/index.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </React.StrictMode>,
)
