import React, { useContext } from 'react'
import NoteContext from '../context/notes/NoteContext'


const NoteFile = (props) => {
  const context = useContext(NoteContext)
  const {deleteNote,editNote} = context

  const {tittle,description,id} = props
  return (
    <div className='col-md-3 '>
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{tittle}</h5>
          <p className="card-text">{description}</p>
          <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(id)}}></i>
          <i className="far fa-edit mx-2" onClick={()=>{editNote(tittle,description)}}></i>
      </div>
      </div>
      


    </div>
  )
}

export default NoteFile
