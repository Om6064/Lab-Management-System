
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContentProvider from './context/AuthContentProvider.jsx'
import LabContentProvider from './context/LabContentProvider.jsx'

createRoot(document.getElementById('root')).render(
  <AuthContentProvider>
    <LabContentProvider>
      <App />
    </LabContentProvider>
  </AuthContentProvider>



)
