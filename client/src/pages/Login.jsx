import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError } from '../store/authSlice';

export default function Login() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((s) => s.auth);
  const [form, setForm] = useState({ email: '', password: '' });

  const set = (k) => (e) => {
    dispatch(clearError());
    setForm((f) => ({ ...f, [k]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(form));
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'radial-gradient(ellipse at 50% 0%, rgba(0,212,255,0.06) 0%, var(--bg-base) 60%)',
      padding: '2rem',
    }}>
      <div style={{ width: '100%', maxWidth: 420 }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🔬</div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 700, letterSpacing: '-0.03em' }}>
            Visha<span style={{ color: 'var(--accent)' }}>Trace</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.3rem', fontSize: '0.9rem' }}>Forensic Kit Evidence System</p>
        </div>

        <div className="card">
          <h2 style={{ fontWeight: 600, marginBottom: '1.5rem', fontSize: '1.1rem' }}>Officer Sign In</h2>

          {error && <div className="alert alert-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" value={form.email} onChange={set('email')}
                placeholder="officer@vishtrace.io" required autoFocus />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input type="password" value={form.password} onChange={set('password')}
                placeholder="••••••••" required />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', marginTop: '0.5rem' }} disabled={loading}>
              {loading ? <><span className="spinner" /> Signing in…</> : 'Sign In'}
            </button>
          </form>

          <div className="divider" />
          <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            New officer?{' '}<Link to="/signup">Create account</Link>
          </p>

          <div style={{ marginTop: '1.2rem', padding: '0.8rem', background: 'var(--bg-elevated)', borderRadius: 8, fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            <div>Demo: aditya@vishtrace.io</div>
            <div>Password: password123</div>
          </div>
        </div>
      </div>
    </div>
  );
}
