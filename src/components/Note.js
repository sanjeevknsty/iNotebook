import React,{useContext,useEffect,useRef,useState} from 'react'
import NoteFile from './NoteFile'
import NoteContext from '../context/notes/NoteContext'
import { useNavigate } from 'react-router-dom'

const Note = () => {
  const navigate = useNavigate()
  const context = useContext(NoteContext)
  const {notes,fetchAllNotes,editNote} = context
  const [note,setNote] = useState({id : "",editedTittle:"",editedDescription:"",editedTags:""})
 

  useEffect( ()=>{
    if(localStorage.getItem('token')){

      fetchAllNotes()
    }
    else{
      navigate('/login')
    }
  },[])

  const ref = useRef(null)
  const Closeref = useRef(null)
  const updateNotes = (note)=>{
    ref.current.click()
    setNote({id :note._id,editedTittle:note.tittle,editedDescription:note.description,editedTags:note.tags})
  }


  const handleChange =(event)=>{
    setNote({...note,[event.target.name]: event.target.value})
  }
  const handleAddClick = ()=>{
    editNote(note.id,note.editedTittle,note.editedDescription,note.editedTags)
    Closeref.current.click()
    // document.getElementById("editedTittle").value = ""
    // document.getElementById("editedDescription").value = ""
    // document.getElementById("editedTags").value = ""
  }



  return (
    <>
     {/* <!-- Button trigger modal --> */}
<button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form className='my-3'>
        <div className="mb-3">
          <label htmlFor="editedTittle" className="form-label">Tittle</label>
          <input type="text" className="form-control" id="editedTittle" name="editedTittle" value={note.editedTittle} placeholder="Enter Tittle" onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="editedDescription" className="form-label">Description</label>
          <input type="text" className="form-control" id="editedDescription" name="editedDescription" value={note.editedDescription} placeholder="Enter Description" onChange={handleChange}/>
        </div>
        <div className="mb-3">
          <label htmlFor="editedTags" className="form-label">Tags</label>
          <input type="text" className="form-control" id="editedTags" name="editedTags" value={note.editedTags} placeholder="Enter tags" onChange={handleChange}/>
        </div>
       
      </form>
      </div>
      <div className="modal-footer">
        <button ref={Closeref} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button  onClick= {handleAddClick}type="button" className="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>
      <div className='row my-3'>
      { notes.map((ele)=>{
        return <NoteFile  key={ele._id} note={ele} updateNotes={updateNotes}/>
      })}
      </div>
    </>
  )
}

export default Note
