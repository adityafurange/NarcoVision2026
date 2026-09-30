import { useState, useEffect, useRef } from 'react';

export default function ReactionTimer({ onStop }) {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const start = () => {
    if (running) return;
    setRunning(true);
    const t0 = Date.now() - elapsed;
    intervalRef.current = setInterval(() => setElapsed(Date.now() - t0), 100);
  };

  const stop = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    onStop?.(elapsed);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setElapsed(0);
    onStop?.(null);
  };

  useEffect(() => () => clearInterval(intervalRef.current), []);

  const fmt = (ms) =>
    `${Math.floor(ms / 60000).toString().padStart(2, '0')}:${Math.floor((ms % 60000) / 1000).toString().padStart(2, '0')}.${Math.floor((ms % 1000) / 100)}`;

  return (
    <div style={{ textAlign: 'center', padding: '1.5rem', background: 'var(--bg-elevated)', borderRadius: 12 }}>
      <div className="section-title" style={{ marginBottom: '0.75rem' }}>Reaction Timer</div>
      <div style={{
        fontSize: '2.5rem',
        fontFamily: 'var(--font-mono)',
        fontWeight: 700,
        color: running ? 'var(--accent)' : 'var(--text-primary)',
        letterSpacing: '0.05em',
        marginBottom: '1rem'
      }}>
        {fmt(elapsed)}
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        {!running ? (
          <button type="button" className="btn btn-primary" onClick={start}>▶ Start</button>
        ) : (
          <button type="button" className="btn btn-danger" onClick={stop}>⏹ Stop & Record</button>
        )}
        <button type="button" className="btn btn-ghost" onClick={reset}>↺ Reset</button>
      </div>
    </div>
  );
}
