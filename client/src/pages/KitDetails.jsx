import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import api from '../services/api';

export default function KitDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useSelector((s) => s.auth.user);
  const [kit, setKit] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ caseNumber: '', location: '', notes: '' });
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    api.get(`/kits/${id}`)
      .then((r) => setKit(r.data.kit))
      .catch(() => setError('Kit not found'))
      .finally(() => setLoading(false));
  }, [id]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleStartTest = async (e) => {
    e.preventDefault();
    if (!form.caseNumber.trim()) return setFormError('Case number is required');
    setSubmitting(true); setFormError('');
    try {
      const { data } = await api.post('/records', { kitId: id, ...form });
      navigate(`/result/${data.record.id}`);
    } catch (err) {
      setFormError(err.response?.data?.message || 'Failed to create record');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="page" style={{ display:'flex', justifyContent:'center', padding:'3rem' }}><div className="spinner" style={{ width:32,height:32 }} /></div>;
  if (error) return <div className="page"><div className="alert alert-error">{error}</div><button className="btn btn-ghost" onClick={() => navigate(-1)}>← Back</button></div>;

  return (
    <div className="page fade-in">
      <button onClick={() => navigate(-1)} style={{ background:'none', border:'none', color:'var(--text-muted)', cursor:'pointer', marginBottom:'1.5rem', fontSize:'0.85rem' }}>← Back</button>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        {/* Kit Info */}
        <div className="card">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:'1.2rem' }}>
            <div style={{ fontSize:'2.5rem' }}>{kit.type === 'DNA' ? '🧬' : kit.type === 'Blood' ? '🩸' : kit.type === 'Narcotics' ? '💊' : kit.type === 'Fingerprint' ? '🖐️' : '🔍'}</div>
            <span className={`badge badge-${kit.status === 'active' ? 'success' : 'danger'}`}>{kit.status}</span>
          </div>
          <h2 style={{ fontSize:'1.2rem', fontWeight:700, marginBottom:'0.4rem' }}>{kit.name}</h2>
          <p style={{ color:'var(--text-muted)', fontSize:'0.88rem', marginBottom:'1.2rem' }}>{kit.description}</p>

          <div style={{ display:'flex', flexDirection:'column', gap:'0.6rem', fontSize:'0.85rem' }}>
            {[['Kit ID', kit.kitId, true], ['Type', kit.type, false], ['Manufacturer', kit.manufacturer, false], ['Batch #', kit.batchNumber, true], ['Expiry', kit.expiryDate, false]].map(([l,v,mono]) => (
              <div key={l} style={{ display:'flex', justifyContent:'space-between', padding:'0.5rem 0', borderBottom:'1px solid var(--border)' }}>
                <span style={{ color:'var(--text-muted)' }}>{l}</span>
                <span className={mono ? 'mono' : ''} style={{ fontWeight:500 }}>{v}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop:'1.2rem' }}>
            <div className="section-title" style={{ marginBottom:'0.6rem' }}>Components</div>
            <ul style={{ listStyle:'none', display:'flex', flexDirection:'column', gap:'0.35rem' }}>
              {kit.components.map((c) => (
                <li key={c} style={{ fontSize:'0.85rem', color:'var(--text-secondary)', display:'flex', gap:'0.5rem' }}>
                  <span style={{ color:'var(--accent)' }}>✓</span> {c}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Start Test Form */}
        <div className="card">
          <h3 style={{ fontWeight:600, marginBottom:'1.2rem' }}>Start Test Record</h3>
          {kit.status === 'expired' && (
            <div className="alert alert-error" style={{ marginBottom:'1rem' }}>⚠️ This kit is expired. Recording is disabled.</div>
          )}
          {formError && <div className="alert alert-error">{formError}</div>}

          <form onSubmit={handleStartTest}>
            <div className="form-group">
              <label className="form-label">Case Number *</label>
              <input value={form.caseNumber} onChange={set('caseNumber')} placeholder="e.g. CAS-2024-0981" required disabled={kit.status === 'expired'} style={{ fontFamily:'var(--font-mono)' }} />
            </div>
            <div className="form-group">
              <label className="form-label">Location / Scene</label>
              <input value={form.location} onChange={set('location')} placeholder="e.g. 42 Main St, Room 3B" disabled={kit.status === 'expired'} />
            </div>
            <div className="form-group">
              <label className="form-label">Initial Notes</label>
              <textarea value={form.notes} onChange={set('notes')} placeholder="Observations, conditions, relevant details…" rows={3} disabled={kit.status === 'expired'} style={{ resize:'vertical' }} />
            </div>
            <div style={{ padding:'0.8rem', background:'var(--bg-elevated)', borderRadius:8, marginBottom:'1rem', fontSize:'0.8rem', color:'var(--text-muted)' }}>
              <strong>Officer:</strong> {user?.name} ({user?.badge})
            </div>
            <button type="submit" className="btn btn-primary" style={{ width:'100%', padding:'0.75rem' }} disabled={submitting || kit.status === 'expired'}>
              {submitting ? <><span className="spinner" /> Creating record…</> : '▶ Start Test'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
