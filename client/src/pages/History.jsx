import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../services/api';
import EvidenceRecord from '../components/EvidenceRecord';

export default function History() {
  const user = useSelector((s) => s.auth.user);
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    api.get('/records')
      .then((r) => setRecords(r.data.records))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all' ? records : records.filter((r) => r.status === filter);
  const sorted = [...filtered].reverse();

  return (
    <div className="page fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Test Records</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.2rem' }}>
            {user?.role === 'analyst' ? 'All department records' : 'Your personal records'}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '0.4rem' }}>
          {['all', 'pending', 'complete'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`btn ${filter === f ? 'btn-primary' : 'btn-ghost'}`}
              style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem', textTransform: 'capitalize' }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
          <div className="spinner" style={{ width: 32, height: 32 }} />
        </div>
      ) : sorted.length === 0 ? (
        <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📋</div>
          <p style={{ color: 'var(--text-muted)' }}>No {filter !== 'all' ? filter : ''} records found.</p>
          <Link to="/scan" className="btn btn-primary" style={{ marginTop: '1.2rem' }}>
            Start a New Test
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {sorted.map((r) => (
            <EvidenceRecord key={r.id} record={r} />
          ))}
        </div>
      )}

      <div style={{ marginTop: '1.5rem', padding: '0.6rem 1rem', borderRadius: 8, background: 'var(--bg-elevated)', fontSize: '0.78rem', color: 'var(--text-muted)', display: 'inline-flex', gap: '0.5rem' }}>
        <span className="mono">{sorted.length}</span> record{sorted.length !== 1 ? 's' : ''} shown
      </div>
    </div>
  );
}
