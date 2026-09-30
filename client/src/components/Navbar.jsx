import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../store/authSlice';

const NAV = [
  { to: '/', label: '⬡ Dashboard' },
  { to: '/scan', label: '◈ Scan Kit' },
  { to: '/history', label: '◉ History' },
];

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((s) => s.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(10,15,30,0.92)', backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      height: 70, display: 'flex', alignItems: 'center',
      padding: '0 2rem', gap: '2rem',
    }}>
      <Link to="/" style={{ display:'flex', alignItems:'center', gap:'0.5rem', textDecoration:'none' }}>
        <span style={{ fontSize: '1.4rem' }}>🔬</span>
        <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
          Visha<span style={{ color: 'var(--accent)' }}>Trace</span>
        </span>
      </Link>

      <div style={{ display: 'flex', gap: '0.25rem', flex: 1 }}>
        {NAV.map(({ to, label }) => (
          <NavLink key={to} to={to} end={to === '/'}
            style={({ isActive }) => ({
              padding: '0.4rem 0.9rem',
              borderRadius: 8,
              fontSize: '0.88rem',
              fontWeight: 500,
              color: isActive ? 'var(--accent)' : 'var(--text-secondary)',
              background: isActive ? 'var(--accent-glow)' : 'transparent',
              textDecoration: 'none',
              transition: 'all 0.15s',
            })}
          >{label}</NavLink>
        ))}
      </div>

      {user && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>{user.name}</div>
            <div style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{user.badge}</div>
          </div>
          <button onClick={handleLogout} className="btn btn-ghost" style={{ padding: '0.4rem 0.9rem', fontSize:'0.82rem' }}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
