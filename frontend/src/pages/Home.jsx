import { React, useEffect, useState } from 'react'
import api from '../api'

function Home() {

  const [notes, setNotes] = useState([])
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")

  useEffect(() => {
    getNotes()
  }, [])

  const getNotes = () => {
    api.get('/api/note/')
      .then((res) => res.data)
      .then((data) => {
        setNotes(data)
        console.log(data)
      })
      .catch((err) => alert(err))
  }

  const deleteNote = (id) => {
    api.delete(`/api/notes/delet/${id}/`)
      .then((res) => res.statusCode == 204 ? alert("Note Deleted!") : alert('Failed to delete note.'))
      .catch((err) => alert(err))
    getNotes()
  }

  const createNote = (e) => {
    e.preventDefault()
    api.post('/api/note/', { title, content })
      .then((res) => res.statusCode == 200 ? alert("Note Created!") : alert('Failed to create note.'))
      .catch((err) => alert(err))
    getNotes()
  }

  return (
    <div className=' h-screen w-full flex flex-col justify-center items-center gap-2'>
      <div className="border-2 w-96 sm:w-2/3 md:w-3/5 lg:w-2/5 px-10 py-8 flex flex-col justify-start items-center gap-4 rounded-xl shadow-md mt-20">
        <h1 className='font-semibold text-4xl'>Notes  </h1>
        <h2 className='font-semibold text-2xl'>Create Note</h2>
        <form onSubmit={createNote} className='flex flex-col justify-center items-center gap-2 '>
          <input type="text" value={title} id='title' name='title' required className='inputform' onChange={(e) => setTitle(e.target.value)} />
          <textarea type="text" value={content} id='content' name='content' className='inputform' required onChange={(e) => setContent(e.target.value)} />
          <button type="submit" className='btn'>Create</button>
        </form>
      </div>
    </div>
  )
}

export default Home