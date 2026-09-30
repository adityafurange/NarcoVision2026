import { useState, useRef } from 'react';

export default function ImageCapture({ onImageSelected, currentImage }) {
  const [preview, setPreview] = useState(currentImage || '');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setPreview(result);
        onImageSelected?.(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setPreview('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    onImageSelected?.('');
  };

  return (
    <div style={{ padding: '1rem', background: 'var(--bg-elevated)', borderRadius: 12, marginBottom: '1rem' }}>
      <div className="section-title" style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}>
        📷 Photo Evidence / Test Strip Capture
      </div>
      
      {preview ? (
        <div style={{ textAlign: 'center' }}>
          <img
            src={preview}
            alt="Evidence preview"
            style={{ maxHeight: '180px', maxWidth: '100%', borderRadius: 8, border: '1px solid var(--border)', objectFit: 'contain' }}
          />
          <div style={{ marginTop: '0.5rem' }}>
            <button type="button" className="btn btn-ghost" style={{ fontSize: '0.75rem', padding: '0.25rem 0.6rem' }} onClick={handleClear}>
              Remove Photo
            </button>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '1rem', border: '1px dashed var(--border)', borderRadius: 8 }}>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            ref={fileInputRef}
            onChange={handleFileChange}
            style={{ display: 'none' }}
            id="evidence-upload"
          />
          <label htmlFor="evidence-upload" className="btn btn-ghost" style={{ cursor: 'pointer', display: 'inline-flex' }}>
            📸 Capture or Upload Image
          </label>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
            Attach photo of color reaction or test cassette
          </div>
        </div>
      )}
    </div>
  );
}
