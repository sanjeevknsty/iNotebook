import React, { useState } from 'react'
import NoteContext from './NoteContext'
const NoteState = (props) => {
  
  const users = [
    {
      "_id": "65f879944c0dfd417c19d39a",
      "user": "65f570de79a8b1b257d668b2",
      "tittle": "Jersey",
      "description": "A cricketing Story",
      "tags": "A father to his Son",
      "__v": 0
    },
    {
      "_id": "65f879954c0dfd417c19d39c",
      "user": "65f570de79a8b1b257d668b2",
      "tittle": "Jersey",
      "description": "A cricketing Story",
      "tags": "A father to his Son",
      "__v": 0
    },
    {
      "_id": "65f91bf1fda1f2e2077869b7",
      "user": "65f570de79a8b1b257d668b2",
      "tittle": "A failed Captain",
      "description": "From the streets of delhi",
      "tags": "A SON to his FATHER",
      "__v": 0
    }
  ]
  const [notes,setNotes] = useState(users)


  const addNote = (tittle,description,tags)=>{
    const note =    {
      "_id": "65f91bf1fda1f2e2077869b7",
      "user": "65f570de79a8b1b257d668b4",
      "tittle": tittle,
      "description": description,
      "tags": tags,
      "__v": 0
    }
    setNotes(notes.concat(note))
  }
  const deleteNote = (id)=>{
    console.log("delte",id)
    const remainingNotes = notes.filter((note)=>{
      return note._id !== id
    })
    setNotes(remainingNotes)
  }

  const editNote = (id,title,description,tags)=>{


    
    // console.log("editng",title,description)
    for (let index = 0; index < notes.length; index++) {
      if (notes[index]._id == id){
        notes[index].tittle = title
        notes[index].description = description
        notes[index].tags = tags
      }
      
    }
    
  }

  

  return (
    <div>
      <NoteContext.Provider value={{notes,addNote,deleteNote,editNote}}>
          {props.children}
      </NoteContext.Provider>
    </div>
  )
}

export default NoteState
