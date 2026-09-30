import { Link } from 'react-router-dom';

export default function EvidenceRecord({ record }) {
  if (!record) return null;

  return (
    <Link to={`/result/${record.id}`} style={{ textDecoration: 'none' }}>
      <div
        className="card"
        style={{
          cursor: 'pointer',
          transition: 'all 0.2s',
          border: '1px solid var(--border)',
          padding: '1rem 1.25rem'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--accent)';
          e.currentTarget.style.transform = 'translateY(-2px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.borderColor = 'var(--border)';
          e.currentTarget.style.transform = 'none';
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <div style={{ display: 'flex', gap: '0.6rem', alignItems: 'center', marginBottom: '0.3rem' }}>
              <span className="mono text-accent" style={{ fontSize: '0.95rem', fontWeight: 600 }}>
                {record.caseNumber}
              </span>
              <span className={`badge badge-${record.status === 'complete' ? 'success' : 'warning'}`}>
                {record.status}
              </span>
              {record.result && (
                <span className={`badge badge-${record.result === 'positive' ? 'danger' : record.result === 'negative' ? 'success' : 'warning'}`}>
                  {record.result}
                </span>
              )}
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
              Kit: <span className="mono">{record.kitId}</span>
              {record.location && <> · {record.location}</>}
            </div>
          </div>
          <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            <div>{record.officerName}</div>
            <div className="mono" style={{ fontSize: '0.75rem' }}>
              {new Date(record.createdAt).toLocaleString()}
            </div>
            {record.reactionTimeMs && (
              <div style={{ color: 'var(--accent)', fontWeight: 500 }}>
                ⏱ {record.reactionTimeMs}ms
              </div>
            )}
          </div>
        </div>
        {record.resultImageUrl && (
          <div style={{ marginTop: '0.6rem' }}>
            <img
              src={record.resultImageUrl}
              alt="Test evidence"
              style={{ height: 48, borderRadius: 4, objectFit: 'cover', border: '1px solid var(--border)' }}
            />
          </div>
        )}
        {record.notes && (
          <div style={{
            marginTop: '0.6rem',
            fontSize: '0.82rem',
            color: 'var(--text-secondary)',
            borderTop: '1px solid var(--border)',
            paddingTop: '0.5rem',
            whiteSpace: 'pre-wrap'
          }}>
            {record.notes.slice(0, 160)}{record.notes.length > 160 ? '…' : ''}
          </div>
        )}
      </div>
    </Link>
  );
}
