import { useEffect, useState } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'
import AddForm from './components/AddForm'
import AppTable from './components/AppTable'

export default function App() {
  const [apps, setApps]             = useState([])
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState('')
  const [search, setSearch]         = useState('')
  const [connected, setConnected]   = useState(false)

  const fetchApps = async () => {
    setLoading(true)
    setError('')
    try {
      const { data } = await axios.get('/DisplayAll')
      setApps(Array.isArray(data) ? data : [])
      setConnected(true)
    } catch (err) {
      setConnected(false)
      const detail = err.message || 'Network error'
      setError(`⚠️ Cannot connect to backend (${detail}). Make sure CrudService is running on port 8083 connected to PostgreSQL.`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchApps()
  }, [])

  const filtered = apps.filter(a =>
    a.appName?.toLowerCase().includes(search.toLowerCase()) ||
    a.category?.toLowerCase().includes(search.toLowerCase())
  )

  const totalDownloads = apps.reduce((s, a) => s + (Number(a.downloads) || 0), 0)
  const categories     = [...new Set(apps.map(a => a.category).filter(Boolean))].length

  const stats = [
    {
      label: 'Total Apps',
      value: apps.length,
      icon: '📱',
      color: 'var(--primary)'
    },
    {
      label: 'Categories',
      value: categories,
      icon: '🏷️',
      color: 'var(--accent)'
    },
    {
      label: 'Total Downloads',
      value: totalDownloads >= 1_000_000
        ? (totalDownloads / 1_000_000).toFixed(1) + 'M'
        : totalDownloads >= 1_000
        ? (totalDownloads / 1_000).toFixed(1) + 'K'
        : totalDownloads,
      icon: '⬇️',
      color: 'var(--success)'
    },
  ]

  return (
    <>
      <Navbar />
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

        {/* Database Status Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--surface)',
          padding: '0.6rem 1.2rem',
          borderRadius: 'var(--radius)',
          border: '1px solid var(--border)',
          fontSize: '0.82rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              display: 'inline-block',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: connected ? 'var(--success)' : 'var(--danger)'
            }} />
            <span>
              <strong>Backend Status:</strong> {connected ? 'Connected to Spring Boot (PostgreSQL)' : 'Disconnected'}
            </span>
          </div>
          <button
            className="btn-ghost"
            style={{ padding: '3px 10px', fontSize: '0.78rem' }}
            onClick={fetchApps}
            disabled={loading}
          >
            {loading ? 'Refreshing...' : '🔄 Refresh Data'}
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          {stats.map(s => (
            <div key={s.label} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{ fontSize: '1.8rem', background: s.color + '22', borderRadius: '8px', padding: '0.5rem 0.7rem' }}>
                {s.icon}
              </div>
              <div>
                <div style={{ fontSize: '1.5rem', fontWeight: 700, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Form */}
        <AddForm onAdded={fetchApps} />

        {/* Search + Error */}
        {error && <p className="msg-error">{error}</p>}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <input
            placeholder="🔍 Search by app name or category..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ maxWidth: '380px' }}
          />
        </div>

        {/* Table */}
        <AppTable
          apps={filtered}
          loading={loading}
          onDeleted={fetchApps}
          onUpdated={fetchApps}
        />
      </div>
    </>
  )
}
