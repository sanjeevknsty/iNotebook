import React,{useContext} from 'react'
import NoteFile from './NoteFile'
import NoteContext from '../context/notes/NoteContext'

const Note = () => {
  const context = useContext(NoteContext)
  const {notes} = context
 
  console.log(notes)

  return (
  
      <div className='row my-3'>
      { notes.map((ele)=>{
        return <NoteFile tittle ={ele.tittle} description={ele.description} key={ele._id} id={ele._id}/>
      })}
      </div>
    
  )
}

export default Note
