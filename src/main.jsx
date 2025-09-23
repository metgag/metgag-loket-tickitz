import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './Router'
import './assets/css/styles.css'
import store, { persistedStore as persistor } from './redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from "redux-persist/integration/react";
import RegProvider from './context/users/RegProvider'
import OrderProvider from './context/order/OrderProvider'
import HistoryProvider from './context/history/HistoryProvider'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RegProvider>
          <OrderProvider>
            <HistoryProvider>
              <Router />
            </HistoryProvider>
          </OrderProvider>
        </RegProvider>
      </PersistGate>
    </Provider>
  </StrictMode>
)
