import { useState } from 'react'
import axios from 'axios'

const CATEGORY_COLORS = {
  'Social':        'badge-blue',
  'Social Media':  'badge-blue',
  'Communication': 'badge-cyan',
  'Games':         'badge-red',
  'Productivity':  'badge-green',
  'Education':     'badge-cyan',
  'Finance':       'badge-yellow',
  'Health':        'badge-green',
  'Entertainment': 'badge-red',
  'Utilities':     'badge-cyan',
  'Other':         'badge-blue',
}

const CATEGORIES = [
  'Social',
  'Social Media',
  'Communication',
  'Games',
  'Productivity',
  'Education',
  'Finance',
  'Health',
  'Entertainment',
  'Utilities',
  'Other'
]

function fmtDownloads(n) {
  if (n === null || n === undefined || isNaN(n)) return '-'
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + 'M'
  if (n >= 1_000)     return (n / 1_000).toFixed(1) + 'K'
  return n.toString()
}

export default function AppTable({ apps, loading, onDeleted, onUpdated }) {
  const [editingId, setEditingId]   = useState(null)
  const [editForm, setEditForm]     = useState({})
  const [actionError, setActionError] = useState('')
  const [updating, setUpdating]     = useState(false)

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return
    setActionError('')
    try {
      await axios.delete(`/Delete/${id}`)
      if (onDeleted) onDeleted()
    } catch (err) {
      const msg = typeof err.response?.data === 'string'
        ? err.response.data
        : err.response?.data?.message || err.message || 'Failed to delete.'
      setActionError(`❌ Delete failed: ${msg}`)
    }
  }

  const startEdit = (app) => {
    setEditingId(app.id)
    setEditForm({
      appName: app.appName || '',
      category: app.category || '',
      version: app.version || '',
      downloads: app.downloads ?? 0
    })
    setActionError('')
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditForm({})
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setUpdating(true)
    setActionError('')
    try {
      await axios.put(`/Update/${editingId}`, {
        id: editingId,
        appName: editForm.appName.trim(),
        category: editForm.category,
        version: editForm.version.trim(),
        downloads: Number(editForm.downloads) || 0
      })
      setEditingId(null)
      if (onUpdated) onUpdated()
    } catch (err) {
      const msg = typeof err.response?.data === 'string'
        ? err.response.data
        : err.response?.data?.message || err.message || 'Failed to update app.'
      setActionError(`❌ Update failed: ${msg}`)
    } finally {
      setUpdating(false)
    }
  }

  return (
    <div className="card" style={{ borderTop: '3px solid var(--accent)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h3 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>📱</span> All Mobile Apps
        </h3>
        <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>
          {apps.length} record(s)
        </span>
      </div>

      {actionError && (
        <p className="msg-error" style={{ marginBottom: '1rem' }}>{actionError}</p>
      )}

      {loading ? (
        <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '2.5rem' }}>
          Loading apps...
        </p>
      ) : apps.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2.5rem', color: 'var(--muted)' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📦</div>
          <p>No apps found in PostgreSQL database. Add one above!</p>
        </div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table>
            <thead>
              <tr>
                <th>#</th>
                <th>App Name</th>
                <th>Category</th>
                <th>Version</th>
                <th>Downloads</th>
                <th style={{ textAlign: 'center' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {apps.map((app, i) => {
                const isEditing = editingId === app.id
                if (isEditing) {
                  return (
                    <tr key={app.id} style={{ background: 'var(--surface2)' }}>
                      <td style={{ color: 'var(--muted)' }}>{i + 1}</td>
                      <td>
                        <input
                          value={editForm.appName}
                          onChange={e => setEditForm({ ...editForm, appName: e.target.value })}
                          required
                          style={{ padding: '4px 8px', fontSize: '0.85rem' }}
                        />
                      </td>
                      <td>
                        <select
                          value={editForm.category}
                          onChange={e => setEditForm({ ...editForm, category: e.target.value })}
                          style={{ padding: '4px 8px', fontSize: '0.85rem' }}
                        >
                          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </td>
                      <td>
                        <input
                          value={editForm.version}
                          onChange={e => setEditForm({ ...editForm, version: e.target.value })}
                          style={{ padding: '4px 8px', fontSize: '0.85rem', width: '90px' }}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={editForm.downloads}
                          onChange={e => setEditForm({ ...editForm, downloads: e.target.value })}
                          style={{ padding: '4px 8px', fontSize: '0.85rem', width: '100px' }}
                        />
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', gap: '6px' }}>
                          <button
                            className="btn-accent"
                            style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                            onClick={handleUpdate}
                            disabled={updating}
                          >
                            {updating ? 'Saving...' : 'Save'}
                          </button>
                          <button
                            className="btn-ghost"
                            style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                            onClick={cancelEdit}
                          >
                            Cancel
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                }

                return (
                  <tr key={app.id}>
                    <td style={{ color: 'var(--muted)' }}>{i + 1}</td>
                    <td style={{ fontWeight: 600 }}>
                      <span style={{ marginRight: '6px' }}>📱</span>
                      {app.appName}
                    </td>
                    <td>
                      <span className={`badge ${CATEGORY_COLORS[app.category] || 'badge-blue'}`}>
                        {app.category}
                      </span>
                    </td>
                    <td style={{ color: 'var(--muted)', fontFamily: 'monospace' }}>
                      v{app.version}
                    </td>
                    <td style={{ color: 'var(--success)', fontWeight: 600 }}>
                      {fmtDownloads(app.downloads)}
                    </td>
                    <td style={{ textAlign: 'center' }}>
                      <div style={{ display: 'inline-flex', gap: '6px' }}>
                        <button
                          className="btn-ghost"
                          style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                          onClick={() => startEdit(app)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn-danger"
                          style={{ padding: '4px 10px', fontSize: '0.78rem' }}
                          onClick={() => handleDelete(app.id, app.appName)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
