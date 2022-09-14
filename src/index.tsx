import React from 'react'
import ReactDOM from 'react-dom/client'
import 'antd/dist/antd.css'
import './index.scss'

import App from './components/App/App'
import { initializeAPI } from './api'

initializeAPI()

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(<App />)
