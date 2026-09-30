import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import ReactionTimer from '../components/ReactionTimer';
import ImageCapture from '../components/ImageCapture';

export default function TestResult() {
  const { recordId } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [notes, setNotes] = useState('');
  const [result, setResult] = useState('');
  const [reactionMs, setReactionMs] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    api.get(`/records/${recordId}`)
      .then((r) => {
        const rec = r.data.record;
        setRecord(rec);
        setNotes(rec.notes || '');
        setResult(rec.result || '');
        setReactionMs(rec.reactionTimeMs || null);
        setImageUrl(rec.resultImageUrl || '');
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [recordId]);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data } = await api.patch(`/records/${recordId}`, {
        notes,
        result,
        reactionTimeMs: reactionMs,
        resultImageUrl: imageUrl,
        status: 'complete',
      });
      setRecord(data.record);
      setSaved(true);
    } catch (err) {
      alert(err.response?.data?.message || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="page" style={{ display: 'flex', justifyContent: 'center', padding: '3rem' }}>
        <div className="spinner" style={{ width: 32, height: 32 }} />
      </div>
    );
  }
  if (!record) {
    return (
      <div className="page">
        <div className="alert alert-error">Record not found</div>
      </div>
    );
  }

  return (
    <div className="page fade-in">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.85rem' }}
        >
          ← Back
        </button>
        <span style={{ color: 'var(--border)' }}>|</span>
        <span className="mono text-accent">{record.id}</span>
        <span className={`badge badge-${record.status === 'complete' ? 'success' : 'warning'}`}>{record.status}</span>
      </div>

      <div className="grid-2" style={{ alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Record Info */}
          <div className="card">
            <div className="section-title">Test Record</div>
            {[
              ['Case #', record.caseNumber, true],
              ['Kit ID', record.kitId, true],
              ['Officer', record.officerName, false],
              ['Badge', record.officerBadge, true],
              ['Location', record.location || '—', false],
              ['Created', new Date(record.createdAt).toLocaleString(), false],
            ].map(([l, v, m]) => (
              <div
                key={l}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0.45rem 0',
                  borderBottom: '1px solid var(--border)',
                  fontSize: '0.85rem',
                }}
              >
                <span style={{ color: 'var(--text-muted)' }}>{l}</span>
                <span className={m ? 'mono' : ''} style={{ fontWeight: 500 }}>
                  {v}
                </span>
              </div>
            ))}
          </div>

          {/* Reaction Timer Component */}
          <div className="card">
            <ReactionTimer onStop={setReactionMs} />
            {reactionMs && (
              <div style={{ marginTop: '0.75rem', textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Recorded reaction time: <span className="mono text-accent">{reactionMs}ms</span>
              </div>
            )}
          </div>
        </div>

        {/* Notes, Image Capture & Result */}
        <div className="card">
          <div className="section-title">Record Findings</div>
          {saved && <div className="alert alert-success">✓ Record saved successfully!</div>}

          {/* Image Capture Component */}
          <ImageCapture onImageSelected={setImageUrl} currentImage={imageUrl} />

          <div className="form-group">
            <label className="form-label">Test Result</label>
            <select value={result} onChange={(e) => setResult(e.target.value)}>
              <option value="">Select result…</option>
              <option value="positive">Positive ✓</option>
              <option value="negative">Negative ✗</option>
              <option value="inconclusive">Inconclusive ?</option>
              <option value="invalid">Invalid / Retest</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Notes & Observations</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={4}
              placeholder="Document test conditions, observations, chain of custody notes…"
              style={{ resize: 'vertical' }}
            />
          </div>

          <button
            type="button"
            className="btn btn-primary"
            style={{ width: '100%', padding: '0.75rem' }}
            onClick={handleSave}
            disabled={saving}
          >
            {saving ? <><span className="spinner" /> Saving…</> : saved ? '✓ Updated Record' : '💾 Save Record'}
          </button>

          {saved && (
            <button
              type="button"
              className="btn btn-ghost"
              style={{ width: '100%', marginTop: '0.5rem' }}
              onClick={() => navigate('/history')}
            >
              View All Records →
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
