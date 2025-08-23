
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import AuthContentProvider from './context/AuthContentProvider.jsx'
import Counter from './components/Counter.jsx'

createRoot(document.getElementById('root')).render(
  <AuthContentProvider>
    <App />
  </AuthContentProvider>



)
