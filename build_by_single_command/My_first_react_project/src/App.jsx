import { useState } from 'react'
import './App.css'

const storageKey = 'notes-app-notes'
const noteTypes = ['General', 'Work', 'Study', 'Personal', 'Ideas']

function loadNotes() {
  const savedNotes = window.localStorage.getItem(storageKey)
  if (!savedNotes) return []

  const parsedNotes = JSON.parse(savedNotes)
  if (
    !Array.isArray(parsedNotes) ||
    parsedNotes.some(
      (note) =>
        typeof note?.id !== 'string' ||
        typeof note?.text !== 'string' ||
        (note?.name !== undefined && typeof note.name !== 'string') ||
        (note?.type !== undefined && !noteTypes.includes(note.type)),
    )
  ) {
    throw new Error('Saved notes have an invalid format')
  }

  const usedNames = new Set()
  return parsedNotes.map((note, index) => {
    let name = note.name?.trim() || `Note ${index + 1}`
    const baseName = name
    let suffix = 2
    while (usedNames.has(name.toLocaleLowerCase())) {
      name = `${baseName} (${suffix})`
      suffix += 1
    }
    usedNames.add(name.toLocaleLowerCase())

    return {
      ...note,
      name,
      type: note.type ?? 'General',
    }
  })
}

function App() {
  const [noteName, setNoteName] = useState('')
  const [text, setText] = useState('')
  const [noteType, setNoteType] = useState('General')
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [formError, setFormError] = useState('')
  const [state, setState] = useState(() => {
    try {
      return { notes: loadNotes(), error: '' }
    } catch (error) {
      console.error('Could not load saved notes:', error)
      return { notes: [], error: 'Saved notes could not be loaded.' }
    }
  })

  function saveNotes(notes) {
    try {
      window.localStorage.setItem(storageKey, JSON.stringify(notes))
      setState({ notes, error: '' })
    } catch (error) {
      console.error('Could not save notes:', error)
      setState({
        notes,
        error: 'Your change is shown but could not be saved in this browser.',
      })
    }
  }

  function addNote(event) {
    event.preventDefault()
    const trimmedName = noteName.trim()
    const trimmedText = text.trim()
    if (!trimmedName || !trimmedText) return

    const nameAlreadyUsed = state.notes.some(
      (note) => note.name.toLocaleLowerCase() === trimmedName.toLocaleLowerCase(),
    )
    if (nameAlreadyUsed) {
      setFormError('A note with that name already exists. Choose a different name.')
      return
    }

    saveNotes([
      ...state.notes,
      {
        id: crypto.randomUUID(),
        name: trimmedName,
        text: trimmedText,
        type: noteType,
      },
    ])
    setNoteName('')
    setText('')
    setNoteType('General')
    setFormError('')
  }

  function deleteNote(id) {
    saveNotes(state.notes.filter((note) => note.id !== id))
  }

  const filteredNotes = state.notes.filter((note) => {
    const query = search.trim().toLocaleLowerCase()
    const matchesSearch =
      note.name.toLocaleLowerCase().includes(query) ||
      note.text.toLocaleLowerCase().includes(query)
    const matchesType = typeFilter === 'All' || note.type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <main className="notes-app">
      <header className="page-header">
        <p className="eyebrow">A little space for your thoughts</p>
        <h1>My Notes</h1>
        <p className="subtitle">Write it down. Pick it up whenever you need.</p>
      </header>

      <form className="note-form" onSubmit={addNote}>
        <label htmlFor="note-name">Note name</label>
        <input
          id="note-name"
          type="text"
          value={noteName}
          onChange={(event) => {
            setNoteName(event.target.value)
            setFormError('')
          }}
          placeholder="Give this note a unique name"
          maxLength={80}
          required
        />
        <label htmlFor="note-text">Note</label>
        <textarea
          id="note-text"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="What's on your mind?"
          rows="4"
        />
        {formError && (
          <p className="storage-error" role="alert">
            {formError}
          </p>
        )}
        <label htmlFor="note-type">Note type</label>
        <select
          id="note-type"
          value={noteType}
          onChange={(event) => setNoteType(event.target.value)}
        >
          {noteTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <div className="form-footer">
          <span>Your notes are saved in this browser.</span>
          <button type="submit" disabled={!noteName.trim() || !text.trim()}>
            Add note
          </button>
        </div>
      </form>

      {state.error && (
        <p className="storage-error" role="alert">
          {state.error}
        </p>
      )}

      <section className="notes-section" aria-labelledby="notes-heading">
        <div className="section-heading">
          <h2 id="notes-heading">Your notes</h2>
          <span>{filteredNotes.length}</span>
        </div>

        {state.notes.length === 0 ? (
          <p className="empty-state">No notes yet. Add your first one above.</p>
        ) : (
          <>
            <div className="note-filters">
              <label className="visually-hidden" htmlFor="note-search">
                Search notes
              </label>
              <input
                id="note-search"
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name or note text..."
              />
              <label className="visually-hidden" htmlFor="type-filter">
                Filter by note type
              </label>
              <select
                id="type-filter"
                value={typeFilter}
                onChange={(event) => setTypeFilter(event.target.value)}
              >
                <option value="All">All types</option>
                {noteTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {filteredNotes.length === 0 ? (
              <p className="empty-state">No notes match your search or type filter.</p>
            ) : (
              <ul className="notes-list">
                {filteredNotes.map((note) => (
                  <li className="note-card" key={note.id}>
                    <span className="note-type">{note.type}</span>
                    <h3>{note.name}</h3>
                    <p>{note.text}</p>
                    <button
                      className="delete-button"
                      type="button"
                      aria-label={`Delete note: ${note.name}`}
                      onClick={() => deleteNote(note.id)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </section>
    </main>
  )
}

export default App
