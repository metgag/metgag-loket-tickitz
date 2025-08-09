import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './Router'
import './assets/css/styles.css'
import { store } from './redux/store'
import { Provider } from 'react-redux'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </StrictMode>
)
