import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Html5Qrcode } from 'html5-qrcode';
import api from '../services/api';

export default function ScanKit() {
  const navigate = useNavigate();
  const scannerRef = useRef(null);
  const [manualId, setManualId] = useState('');
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const lookupKit = async (id) => {
    setLoading(true);
    setError('');
    try {
      await api.get(`/kits/${id}`);
      navigate(`/kits/${id}`);
    } catch {
      setError(`Kit "${id}" not found. Check the ID and try again.`);
    } finally {
      setLoading(false);
    }
  };

  const startScanner = () => {
    if (scannerRef.current) return;
    setScanning(true);
    const qr = new Html5Qrcode('qr-reader');
    scannerRef.current = qr;
    qr.start(
      { facingMode: 'environment' },
      { fps: 10, qrbox: { width: 240, height: 240 } },
      (decodedText) => {
        qr.stop().then(() => { scannerRef.current = null; setScanning(false); lookupKit(decodedText.trim()); });
      },
      () => {}
    ).catch((err) => { setError('Camera access denied: ' + err); setScanning(false); scannerRef.current = null; });
  };

  const stopScanner = () => {
    if (scannerRef.current) {
      scannerRef.current.stop().then(() => { scannerRef.current = null; setScanning(false); }).catch(() => {});
    }
  };

  useEffect(() => () => stopScanner(), []);

  const handleManual = (e) => {
    e.preventDefault();
    if (manualId.trim()) lookupKit(manualId.trim().toUpperCase());
  };

  return (
    <div className="page fade-in">
      <h1 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '0.5rem' }}>Scan Evidence Kit</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem' }}>Scan QR code on kit or enter Kit ID manually</p>

      <div className="grid-2">
        {/* QR Scanner */}
        <div className="card">
          <div className="section-title">QR Code Scanner</div>
          <div id="qr-reader" style={{ width: '100%', borderRadius: 8, overflow: 'hidden', background: '#000', minHeight: scanning ? 280 : 0 }} />
          {!scanning ? (
            <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }} onClick={startScanner}>
              📷 Start Camera Scan
            </button>
          ) : (
            <button className="btn btn-ghost" style={{ width: '100%', marginTop: '1rem' }} onClick={stopScanner}>
              ✕ Stop Scanner
            </button>
          )}
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.75rem', textAlign: 'center' }}>
            Point camera at kit QR label
          </p>
        </div>

        {/* Manual Entry */}
        <div className="card">
          <div className="section-title">Manual Kit ID</div>
          {error && <div className="alert alert-error">{error}</div>}
          <form onSubmit={handleManual}>
            <div className="form-group">
              <label className="form-label">Kit ID</label>
              <input
                value={manualId}
                onChange={(e) => { setError(''); setManualId(e.target.value); }}
                placeholder="e.g. KIT-001"
                style={{ fontFamily: 'var(--font-mono)', fontSize: '1rem', letterSpacing: '0.05em' }}
                autoFocus
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading || !manualId.trim()}>
              {loading ? <><span className="spinner" /> Looking up…</> : '→ Lookup Kit'}
            </button>
          </form>

          <div className="divider" />
          <div className="section-title" style={{ marginBottom: '0.75rem' }}>Quick Select</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {['KIT-001','KIT-002','KIT-003','KIT-004','KIT-005'].map((id) => (
              <button key={id} className="btn btn-ghost" style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}
                onClick={() => lookupKit(id)}>{id}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
