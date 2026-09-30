import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMe } from './store/authSlice';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import ScanKit from './pages/ScanKit';
import KitDetails from './pages/KitDetails';
import TestResult from './pages/TestResult';
import History from './pages/History';
import SubstanceDatabase from './pages/SubstanceDatabase';

function Layout() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '70px' }}>
        <Outlet />
      </main>
    </>
  );
}

export default function App() {
  const dispatch = useDispatch();
  const { token, initialized } = useSelector((s) => s.auth);

  useEffect(() => {
    if (token) dispatch(fetchMe());
    else dispatch({ type: 'auth/fetchMe/rejected' });
  }, []);

  if (!initialized) {
    return (
      <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100vh', flexDirection:'column', gap:'1rem' }}>
        <div className="spinner" style={{ width:36, height:36, borderWidth:3 }} />
        <span style={{ color:'var(--text-secondary)', fontFamily:'var(--font-mono)', fontSize:'0.9rem' }}>Initializing VishaTrace…</span>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={token ? <Navigate to="/" replace /> : <Login />} />
        <Route path="/signup" element={token ? <Navigate to="/" replace /> : <Signup />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/scan" element={<ScanKit />} />
            <Route path="/kits/:id" element={<KitDetails />} />
            <Route path="/result/:recordId" element={<TestResult />} />
            <Route path="/history" element={<History />} />
            <Route path="/substances" element={<SubstanceDatabase />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
