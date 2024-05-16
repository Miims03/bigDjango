import React from 'react'

function Note({ note , onDelete }) {

    const formatedDate = new Date(note.created_at).toLocaleDateString("fr-FR")

  return (
    <div className='flex flex-col justify-center items-start gap '>
        <h1 className='pl-1 capitalize'>{note.title}</h1>
        <p className='pl-1 capitalize'>{note.content}</p>
        <p className='pl-1'>{formatedDate}</p>
        <button onClick={() => onDelete(note.id)} className='btn bg-red-600 text-white hover:bg-red-700 active:bg-red-800 h-10 '>Delete</button>
    </div>
  )
}

export default Note