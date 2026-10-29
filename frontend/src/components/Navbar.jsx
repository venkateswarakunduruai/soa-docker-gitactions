export default function Navbar() {
  return (
    <nav style={{
      display: 'flex', alignItems: 'center', gap: '1rem',
      padding: '0 2rem', height: '58px',
      background: 'var(--surface)', borderBottom: '1px solid var(--border)',
      position: 'sticky', top: 0, zIndex: 100,
    }}>
      <span style={{ fontSize: '1.4rem' }}>📱</span>
      <span style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--accent)' }}>
        MobileApp Manager
      </span>
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <a
          href="http://localhost:8083/swagger-ui.html"
          target="_blank"
          rel="noreferrer"
          style={{
            fontSize: '0.78rem',
            color: 'var(--accent)',
            textDecoration: 'none',
            background: 'var(--surface2)',
            padding: '4px 10px',
            borderRadius: '6px',
            border: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}
        >
          📖 Swagger UI
        </a>
        <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
          Student ID: 2400031389
        </span>
      </div>
    </nav>
  )
}
