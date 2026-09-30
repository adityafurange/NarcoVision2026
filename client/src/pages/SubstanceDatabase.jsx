import { useState, useEffect } from 'react';
import api from '../services/api';

export default function SubstanceDatabase() {
  const [substances, setSubstances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedSource, setSelectedSource] = useState('all');
  const [selectedSubstance, setSelectedSubstance] = useState(null);

  useEffect(() => {
    fetchSubstances();
  }, [selectedSource]);

  const fetchSubstances = async () => {
    setLoading(true);
    try {
      const params = {};
      if (selectedSource !== 'all') params.source = selectedSource;
      const res = await api.get('/substances', { params });
      setSubstances(res.data.substances);
      if (res.data.substances.length > 0 && !selectedSubstance) {
        setSelectedSubstance(res.data.substances[0]);
      }
    } catch (err) {
      console.error('Failed to load toxicology data', err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = substances.filter((s) => {
    const q = search.toLowerCase();
    return (
      s.name.toLowerCase().includes(q) ||
      s.commonName.toLowerCase().includes(q) ||
      s.chemicalFormula.toLowerCase().includes(q) ||
      s.class.toLowerCase().includes(q) ||
      s.sources.drugbank.id.toLowerCase().includes(q) ||
      s.sources.pubchem.cid.toString().includes(q)
    );
  });

  return (
    <div className="page fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
            🧪 Toxicological & Chemical Reference Database
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginTop: '0.2rem' }}>
            Integrated with real data from <strong style={{ color: 'var(--accent)' }}>PubChem (NIH)</strong>, <strong style={{ color: '#10b981' }}>DrugBank</strong>, and <strong style={{ color: '#f59e0b' }}>Tox21 High-Throughput Screening</strong>
          </p>
        </div>

        {/* Source Badges */}
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All Databases' },
            { id: 'pubchem', label: 'PubChem' },
            { id: 'drugbank', label: 'DrugBank' },
            { id: 'tox21', label: 'Tox21' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedSource(item.id)}
              className={`btn ${selectedSource === item.id ? 'btn-primary' : 'btn-ghost'}`}
              style={{ padding: '0.35rem 0.85rem', fontSize: '0.8rem' }}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Search Bar */}
      <div style={{ marginBottom: '1.5rem' }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 Search substance by name, formula (e.g. C17H21NO4), DrugBank ID (DB00907), or PubChem CID..."
          style={{ width: '100%', padding: '0.8rem 1.1rem', fontSize: '0.95rem' }}
        />
      </div>

      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem' }}>
          <div className="spinner" style={{ width: 36, height: 36 }} />
        </div>
      ) : (
        <div className="grid-2" style={{ alignItems: 'start' }}>
          {/* Left Column: List of Substances */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
            <div className="section-title">
              Indexed Compounds ({filtered.length})
            </div>
            {filtered.map((s) => {
              const isSelected = selectedSubstance?.id === s.id;
              return (
                <div
                  key={s.id}
                  onClick={() => setSelectedSubstance(s)}
                  className="card"
                  style={{
                    padding: '1rem',
                    cursor: 'pointer',
                    borderColor: isSelected ? 'var(--accent)' : 'var(--border)',
                    background: isSelected ? 'rgba(0, 212, 255, 0.04)' : 'var(--bg-card)',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: '0.95rem', color: isSelected ? 'var(--accent)' : 'var(--text-primary)' }}>
                        {s.commonName}
                      </div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                        {s.name}
                      </div>
                    </div>
                    <span className="mono badge badge-info">{s.chemicalFormula}</span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.6rem', flexWrap: 'wrap' }}>
                    <span className="badge badge-success" style={{ fontSize: '0.7rem' }}>
                      {s.sources.drugbank.id}
                    </span>
                    <span className="badge badge-info" style={{ fontSize: '0.7rem' }}>
                      CID: {s.sources.pubchem.cid}
                    </span>
                    <span className="badge badge-warning" style={{ fontSize: '0.7rem' }}>
                      {s.sources.tox21.assayId}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Scientific Profile */}
          {selectedSubstance && (
            <div className="card fade-in" style={{ position: 'sticky', top: '90px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div>
                  <h2 style={{ fontSize: '1.3rem', fontWeight: 700 }}>{selectedSubstance.commonName}</h2>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{selectedSubstance.name}</div>
                </div>
                <span className="badge badge-danger">{selectedSubstance.schedule}</span>
              </div>

              {/* Chemical Specs */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.5rem', marginBottom: '1.2rem', padding: '0.8rem', background: 'var(--bg-elevated)', borderRadius: 8, fontSize: '0.82rem' }}>
                <div><strong>Formula:</strong> <span className="mono text-accent">{selectedSubstance.chemicalFormula}</span></div>
                <div><strong>Mol. Weight:</strong> {selectedSubstance.molecularWeight}</div>
                <div><strong>CAS Number:</strong> <span className="mono">{selectedSubstance.casNumber}</span></div>
                <div><strong>Classification:</strong> {selectedSubstance.class}</div>
              </div>

              {/* SMILES Structure */}
              <div style={{ marginBottom: '1.2rem' }}>
                <div className="form-label" style={{ fontSize: '0.78rem' }}>Canonical SMILES String:</div>
                <div style={{ background: '#070b14', padding: '0.6rem 0.8rem', borderRadius: 6, fontSize: '0.75rem', fontFamily: 'var(--font-mono)', wordBreak: 'break-all', border: '1px solid var(--border)' }}>
                  {selectedSubstance.smiles}
                </div>
              </div>

              {/* Presumptive Field Kit Reagents */}
              <div style={{ marginBottom: '1.2rem', padding: '0.9rem', border: '1px solid rgba(0, 212, 255, 0.2)', borderRadius: 8, background: 'var(--accent-glow)' }}>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--accent)', marginBottom: '0.4rem' }}>
                  🧪 Presumptive Colorimetric Test Guide
                </div>
                <div style={{ fontSize: '0.82rem', marginBottom: '0.3rem' }}>
                  <strong>Recommended Reagent:</strong> {selectedSubstance.presumptiveTesting.reagent}
                </div>
                <div style={{ fontSize: '0.82rem', marginBottom: '0.3rem' }}>
                  <strong>Expected Reaction Color:</strong> <span style={{ color: '#6ee7b7' }}>{selectedSubstance.presumptiveTesting.expectedColor}</span>
                </div>
                <div style={{ fontSize: '0.82rem' }}>
                  <strong>Assay Latency:</strong> ~{selectedSubstance.presumptiveTesting.typicalReactionTimeSec}s (Compatible Kit: <span className="mono text-accent">{selectedSubstance.presumptiveTesting.compatibleKitId}</span>)
                </div>
              </div>

              {/* Scientific Database Cross-References */}
              <div className="section-title" style={{ fontSize: '0.82rem', marginBottom: '0.6rem' }}>
                Verified Database Cross-References
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.82rem' }}>
                {/* PubChem */}
                <div style={{ padding: '0.7rem', background: 'var(--bg-elevated)', borderRadius: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: 'var(--accent)' }}>NIH PubChem</strong>
                    <a href={selectedSubstance.sources.pubchem.url} target="_blank" rel="noreferrer" style={{ fontSize: '0.78rem' }}>
                      CID {selectedSubstance.sources.pubchem.cid} ↗
                    </a>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    GHS Safety: {selectedSubstance.sources.pubchem.safetySummary}
                  </div>
                </div>

                {/* DrugBank */}
                <div style={{ padding: '0.7rem', background: 'var(--bg-elevated)', borderRadius: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: '#10b981' }}>DrugBank</strong>
                    <a href={selectedSubstance.sources.drugbank.url} target="_blank" rel="noreferrer" style={{ fontSize: '0.78rem' }}>
                      {selectedSubstance.sources.drugbank.id} ↗
                    </a>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    Mechanism: {selectedSubstance.sources.drugbank.category}
                  </div>
                </div>

                {/* Tox21 */}
                <div style={{ padding: '0.7rem', background: 'var(--bg-elevated)', borderRadius: 6 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <strong style={{ color: '#f59e0b' }}>Tox21 Federal Assay</strong>
                    <span className="mono text-accent" style={{ fontSize: '0.78rem' }}>
                      {selectedSubstance.sources.tox21.assayId}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    Bio-Target: {selectedSubstance.sources.tox21.target}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: '#fcd34d', marginTop: '0.15rem' }}>
                    Assay Finding: {selectedSubstance.sources.tox21.activity}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
