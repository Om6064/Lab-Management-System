
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContentProvider from './context/AuthContentProvider.jsx'
import LabContentProvider from './context/LabContentProvider.jsx'
import SystemContentProvider from './context/SystemContentProvider.jsx'
import StudentContentProvider from './context/StudentContentProvider.jsx'

createRoot(document.getElementById('root')).render(
  <AuthContentProvider>
    <LabContentProvider>
      <SystemContentProvider>
        <StudentContentProvider>
          <App />
        </StudentContentProvider>
      </SystemContentProvider>
    </LabContentProvider>
  </AuthContentProvider>



)
