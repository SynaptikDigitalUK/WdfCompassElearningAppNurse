import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { HashRouter } from 'react-router-dom';

// eslint-disable-next-line no-unused-vars
import * as bootstrap from 'bootstrap'

import './index.scss'

import { registerSW } from 'virtual:pwa-register';

// eslint-disable-next-line no-unused-vars
const updateSW = registerSW({
  onNeedRefresh() {
    // notify user about the update
    console.log('App has been updated. Please refresh the page.');
  },
  onOfflineReady() {
    // notify user that app is ready to work offline
    console.log('App is offline ready');
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <HashRouter>{/*  ADD ROUTER WRAPPER */}
    <App />
    </HashRouter>
  </React.StrictMode>,
)
