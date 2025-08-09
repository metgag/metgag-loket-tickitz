import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './Router'
import './assets/css/styles.css'
import store, { persistedStore as persistor } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  </StrictMode>
)
