import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import api from '../services/api';

function StatCard({ label, value, accent = false }) {
  return (
    <div className="card" style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-mono)', color: accent ? 'var(--accent)' : 'var(--text-primary)' }}>{value}</div>
      <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{label}</div>
    </div>
  );
}

export default function Dashboard() {
  const user = useSelector((s) => s.auth.user);
  const [kits, setKits] = useState([]);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([api.get('/kits'), api.get('/records')])
      .then(([k, r]) => { setKits(k.data.kits); setRecords(r.data.records); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const activeKits = kits.filter((k) => k.status === 'active').length;
  const expiredKits = kits.filter((k) => k.status === 'expired').length;

  return (
    <div className="page fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            Welcome back, <span style={{ color: 'var(--accent)' }}>{user?.name?.split(' ')[0]}</span>
          </h1>
          <p style={{ color: 'var(--text-muted)', marginTop: '0.2rem', fontSize: '0.9rem' }}>
            <span className="mono">{user?.badge}</span> · {user?.department}
          </p>
        </div>
        <Link to="/scan" className="btn btn-primary">+ Scan New Kit</Link>
      </div>

      {loading ? (
        <div style={{ display:'flex', justifyContent:'center', padding:'3rem' }}><div className="spinner" style={{ width:32,height:32 }} /></div>
      ) : (
        <>
          <div className="grid-3" style={{ marginBottom: '2rem' }}>
            <StatCard label="Total Kits" value={kits.length} />
            <StatCard label="Active Kits" value={activeKits} accent />
            <StatCard label="My Records" value={records.length} />
          </div>

          {expiredKits > 0 && (
            <div className="alert alert-error" style={{ marginBottom: '1.5rem' }}>
              ⚠️ {expiredKits} kit{expiredKits > 1 ? 's are' : ' is'} expired — do not use in field operations.
            </div>
          )}

          <div className="section-title">Available Kits</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            {kits.map((kit) => (
              <Link key={kit.id} to={`/kits/${kit.kitId}`} style={{ textDecoration: 'none' }}>
                <div className="card" style={{ display:'flex', alignItems:'center', gap:'1rem', cursor:'pointer', transition:'border-color 0.2s', border: '1px solid var(--border)' }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--accent)'}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'var(--border)'}
                >
                  <div style={{ fontSize: '1.8rem' }}>{kit.type === 'DNA' ? '🧬' : kit.type === 'Blood' ? '🩸' : kit.type === 'Narcotics' ? '💊' : kit.type === 'Fingerprint' ? '🖐️' : '🔍'}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{kit.name}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.15rem' }}>
                      <span className="mono">{kit.kitId}</span> · Batch: {kit.batchNumber}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <span className={`badge badge-${kit.status === 'active' ? 'success' : 'danger'}`}>{kit.status}</span>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>Exp: {kit.expiryDate}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {records.length > 0 && (
            <>
              <div className="section-title">Recent Records</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {records.slice(-5).reverse().map((r) => (
                  <Link key={r.id} to={`/result/${r.id}`} style={{ textDecoration: 'none' }}>
                    <div className="card" style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0.9rem 1.2rem' }}>
                      <div>
                        <span className="mono" style={{ fontSize:'0.85rem', color:'var(--accent)' }}>{r.caseNumber}</span>
                        <span style={{ margin:'0 0.5rem', color:'var(--text-muted)' }}>·</span>
                        <span style={{ fontSize:'0.85rem' }}>{r.kitId}</span>
                      </div>
                      <div style={{ display:'flex', gap:'0.75rem', alignItems:'center' }}>
                        <span className={`badge badge-${r.status === 'complete' ? 'success' : 'warning'}`}>{r.status}</span>
                        <span style={{ fontSize:'0.78rem', color:'var(--text-muted)' }}>{new Date(r.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
