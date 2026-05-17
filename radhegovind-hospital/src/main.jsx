import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import HospitalDashboard from './HospitalDashboard.jsx'

function MainApp() {
  const [view, setView] = useState('website');

  return (
    <>
      {view === 'website' && (
        <>
          <App />
          <button
            onClick={() => setView('dashboard')}
            className="fixed bottom-24 right-6 bg-slate-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-slate-800 transition z-40 shadow-lg"
          >
            👨‍⚕️ Hospital Dashboard
          </button>
        </>
      )}
      {view === 'dashboard' && (
        <>
          <HospitalDashboard />
          <button
            onClick={() => setView('website')}
            className="fixed top-6 right-6 bg-teal-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-teal-700 transition z-40 shadow-lg"
          >
            ← Back to Website
          </button>
        </>
      )}
    </>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MainApp />
  </StrictMode>,
)
