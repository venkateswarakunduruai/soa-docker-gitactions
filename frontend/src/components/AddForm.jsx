import { useState } from 'react'
import axios from 'axios'

const EMPTY = { appName: '', category: '', version: '', downloads: '' }

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

export default function AddForm({ onAdded }) {
  const [form, setForm]       = useState(EMPTY)
  const [msg, setMsg]         = useState({ text: '', ok: true })
  const [loading, setLoading] = useState(false)

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMsg({ text: '', ok: true })
    try {
      await axios.post('/Add', {
        appName: form.appName.trim(),
        category: form.category,
        version: form.version.trim(),
        downloads: Number(form.downloads) || 0
      })
      setMsg({ text: '✅ App added successfully!', ok: true })
      setForm(EMPTY)
      if (onAdded) onAdded()
    } catch (err) {
      const errDetail = typeof err.response?.data === 'string'
        ? err.response.data
        : err.response?.data?.message || err.message || 'Failed to add app.'
      setMsg({ text: `❌ ${errDetail}`, ok: false })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card" style={{ borderTop: '3px solid var(--primary)' }}>
      <h3 style={{ marginBottom: '1.2rem', fontSize: '1rem', fontWeight: 700 }}>
        ✨ Add New Mobile App
      </h3>
      <form onSubmit={handleSubmit}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
        <div>
          <label>App Name</label>
          <input
            value={form.appName}
            onChange={e => set('appName', e.target.value)}
            placeholder="e.g. Instagram"
            required
          />
        </div>
        <div>
          <label>Category</label>
          <select
            value={form.category}
            onChange={e => set('category', e.target.value)}
            required
          >
            <option value="">Select category</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label>Version</label>
          <input
            value={form.version}
            onChange={e => set('version', e.target.value)}
            placeholder="e.g. 1.0.0"
            required
          />
        </div>
        <div>
          <label>Downloads</label>
          <input
            type="number"
            min="0"
            value={form.downloads}
            onChange={e => set('downloads', e.target.value)}
            placeholder="e.g. 50000"
            required
          />
        </div>
        <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn-primary" type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add App'}
          </button>
          <button className="btn-ghost" type="button" onClick={() => setForm(EMPTY)}>
            Reset
          </button>
          {msg.text && (
            <span className={msg.ok ? 'msg-success' : 'msg-error'}>
              {msg.text}
            </span>
          )}
        </div>
      </form>
    </div>
  )
}
