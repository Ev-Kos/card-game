import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { store } from './shared/store/store'
import { Provider } from 'react-redux'
import './index.css'

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
    ,
  </React.StrictMode>,
)
