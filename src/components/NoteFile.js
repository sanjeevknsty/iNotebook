import React, { useContext, useRef } from 'react'
import NoteContext from '../context/notes/NoteContext'


const NoteFile = (props) => {
  const context = useContext(NoteContext)
  const { deleteNote } = context

  const { note ,updateNotes} = props
 


  return (

    <>
     
      <div className='col-md-3 '>
        <div className="card my-3">
          <div className="card-body">
            <h5 className="card-title">{note.tittle}</h5>
            <p className="card-text">{note.description}</p>
            <i className="far fa-trash-alt mx-2" onClick={() => { deleteNote(note._id) }}></i>
            <i className="far fa-edit mx-2" onClick={() => {updateNotes(note) }}></i>
          </div>
        </div>
      </div>
    </>



  )
}

export default NoteFile
