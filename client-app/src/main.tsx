import 'semantic-ui-css/semantic.min.css'
import './app/layout/styles.css'

import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './app/layout/App'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
