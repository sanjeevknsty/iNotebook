import React,{useContext,useState} from 'react'
import Note from './Note'
import NoteContext from '../context/notes/NoteContext'


const AddNote = ()=> {
 
  const context = useContext(NoteContext)
  const {addNote} = context
  const [note,setNote] = useState({tittle:"",description:"",tags:"default"})

  const handleChange =(event)=>{
    setNote({...note,[event.target.name]: event.target.value})
  }
  // const handleChange1 =(event)=>{
  //   // setNote({...note,[event.target.name]: event.target.value})
  //   event.target.value = name
  // }
  const handleAddClick = ()=>{
    addNote(note.tittle,note.description,note.tags)
    document.getElementById("tittle").value = ""
    document.getElementById("description").value = ""
  }  

  return (
    <div className='container my-5'>
       <h2>Add Note</h2>
      <form className='my-3'>
        <div className="mb-3">
          <label htmlFor="tittle" className="form-label">tittle</label>
          <input type="text" className="form-control" id="tittle" name="tittle"  placeholder="Enter Tittle" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">description</label>
          <input type="text" className="form-control" id="description" name="description" placeholder="Enter Description" onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">tags</label>
          <input type="text" className="form-control" id="tags" name="tags" placeholder="Enter tags" onChange={handleChange}/>
        </div>
       
          <button type="button" className="btn btn-primary" onClick={handleAddClick}>Add</button>
      </form>
      <Note/>
    </div>
  )
}
export default AddNote

