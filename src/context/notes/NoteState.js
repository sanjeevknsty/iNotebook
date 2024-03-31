import React, { useState } from 'react'
import NoteContext from './NoteContext'
import {useNavigate} from 'react-router-dom';
const NoteState = (props) => {

  const navigate = useNavigate()
  const host = "http://localhost:8000"

  const users = []
  const [notes, setNotes] = useState(users)


  const fetchAllNotes = async () => {

    const response = await fetch(`${host}/api/note/fetchAllNotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-header": localStorage.getItem('token')

      },
      // body: JSON.stringify({tittle,description,tags}), 
    });
    const json = await response.json()

    setNotes(json)
  }


  const addNote = async (tittle, description, tags) => {

    const response = await fetch(`${host}/api/note/addNotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-header": localStorage.getItem('token')

      },
      body: JSON.stringify({ tittle, description, tags }),
    });
    const json = await response.json()


    const note = {
      "_id": "65f91bf1fda1f2e2077869b7",
      "user": "65f570de79a8b1b257d668b4",
      "tittle": tittle,
      "description": description,
      "tags": tags,
      "__v": 0
    }
    setNotes(notes.concat(json))
  }

  // DELETE Notes in DataBase

  const deleteNote = async (id) => {

    const response = await fetch(`${host}/api/note/deleteNotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-header": localStorage.getItem('token')
      },
    });
    const json = response.json()


    // console.log("delte", id)
    const remainingNotes = notes.filter((note) => {
      return note._id !== id
    })
    setNotes(remainingNotes)
  }


  // Edit Notes in DataBase

  const editNote = async (id, tittle, description, tags) => {
    const response = await fetch(`${host}/api/note/updateNotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-header": localStorage.getItem('token')

      },
      body: JSON.stringify({ tittle, description, tags }),
    });
    const json = await response.json()
    // console.log(json)

    let newNote = JSON.parse(JSON.stringify(notes))

    // console.log("editng",title,description)
    for (let index = 0; index < newNote.length; index++) {
      const element = newNote[index]
      if (element._id === id) {
        newNote[index].tittle = tittle
        newNote[index].description = description
        newNote[index].tags = tags
        break
      }
      setNotes(newNote)

    }
  }

// Login to account
    const login = async (email,password)=>{
      const response = await fetch(`${host}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // "auth-header": localStorage.getItem('token')
  
        },
        body: JSON.stringify({email:email,password:password}),
      });
      const json = await response.json()
      console.log(json) 
      if (json.success){
        localStorage.setItem('token',json.jwtToken)
        navigate('/')
      }
      else{
        alert('Error occured')
      }

    }

    //signup to an account
    //check sigup File

  return (
    <div>
      <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, fetchAllNotes,login}}>
        {props.children}
      </NoteContext.Provider>
    </div>
  )
}

export default NoteState
