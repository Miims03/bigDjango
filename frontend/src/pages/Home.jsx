import { React, useEffect, useState } from 'react'
import api from '../api'
import Note from '../components/Note'
import Flash from '../components/Flash'

function Home() {

  const [notes, setNotes] = useState([])
  const [content, setContent] = useState("")
  const [title, setTitle] = useState("")
  const [flashMessage, setFlashMessage] = useState("")
  const [flashColor, setFlashColor] = useState("")

  useEffect(() => {
    getNotes()
  }, [])

  const getNotes = () => {
    api.get('/api/note/')
      .then((res) => res.data)
      .then((data) => {
        setNotes(data)
      })
      .catch((err) => alert(err))
  }

  const deleteNote = (id) => {
    api.delete(`/api/note/delete/${id}/`)
      .then((res) => {
        if(res.status == 204){
          setFlashMessage('Deleted Successfully')
          setFlashColor('red')
          getNotes()
        } else {
          alert('Failed to delete note.')
        }
      })
    .catch((err) => alert(err))
    getNotes()
  }

  const createNote = (e) => {
    e.preventDefault()
    api.post('/api/note/', { title , content  })
    .then((res) => {
      if(res.status == 201){
        setFlashMessage('Created Successfully')
        setFlashColor('purple')
        getNotes()
      } else {
        alert('Failed to create note.')
      }
    })
      .catch((err) => alert(err))
    getNotes()
  }

  return (
    <div className=' h-screen w-full flex flex-col justify-center items-center gap-2'>
      <div className="border-2 w-96 sm:w-2/3 md:w-3/5 lg:w-2/5 px-10 py-8 flex flex-col justify-start items-center gap-4 rounded-xl shadow-md mt-20">
        <h1 className='font-semibold text-4xl'>Notes  </h1>
        {flashMessage && <Flash message={flashMessage} color={flashColor} />}

        <div className='w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5'>
        {notes.map((note) => (
          <Note note={note} onDelete={deleteNote} key={note.id} /> 
        ))}
        </div>
        <h2 className='font-semibold text-2xl'>Create Note</h2>
        <form onSubmit={createNote} className='flex flex-col justify-center items-center gap-2 w-1/2'>
          <input type="text" value={title} id='title' name='title' required className='inputform capitalize' placeholder='Title' onChange={(e) => setTitle(e.target.value)} />
          <textarea type="text" value={content} id='content' name='content' className='inputform pt-1.5 capitalize' placeholder='Content' required onChange={(e) => setContent(e.target.value)} />
          <button type="submit" className='btn'>Create</button>
        </form>
      </div>
    </div>
  )
}

export default Home