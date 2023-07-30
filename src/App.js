import React,{useState, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Header from "./components/header";
import AddNote from "./components/addNote";
import NoteList from "./components/noteList";
// import addNote from "./components/addNote";
// import noteList from "./components/noteList";
import  NoteDetail from "./components/noteDetail";
import api from './api/notes';
import EditNote from "./components/editNote";

function App() {
  const LOCAL_STORAGE_KEY = "notes";
  const[notes,setNotes]=useState([]);
  const[searchTerm,setSearchTerm]=useState(" ");
  const[searchResults,setSearchResults]=useState([]);
    // const retrieveNotes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // //console.log("Initial Notes from Local Storage:", retrieveNotes);
    // return retrieveNotes || [];
 // });
  //RetrieveNotes
  const retrieveNotes = async () => {
    const response = await api.get("/notes");
    return response.data;
  }
  
  useEffect(() => {
  //   const retrieveNotes = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   console.log("Initial Notes from Local Storage:", retrieveNotes);
  //   setNotes (retrieveNotes || []);
  const getAllNotes = async () => {
    const allNotes=await retrieveNotes();
    if (allNotes) setNotes(allNotes);
  };

  getAllNotes();
 }, []);

  useEffect(() => {
    //localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(notes));
    //console.log("Updated Notes:", notes);
  }, [notes,LOCAL_STORAGE_KEY]);

  const addNoteHandler = async (note) =>{
    console.log(note);
    const request = {
      id:uuidv4(),
      ...note,
    };

    const response = await api.post("/notes",request);
    console.log(response);
   // console.log("New Note:",newNote);
   //console.log("Generated UUID:", uuidv4());
    setNotes([...notes,response.data]);
    //console.log("Updated notes",notes);
  }

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if(searchTerm !== ""){
      const newNoteList=notes.filter((note) => {
        return Object.values(note)
        .join(" ")
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newNoteList);
    } else {
      setSearchResults(notes);
    }
  };

  // useEffect(() => {
  //   searchHandler(); // Call the searchHandler function whenever searchTerm changes
  // }, [searchTerm]);

  const updateNoteHandler = async (note) => {
    const response = await api.put(`/notes/${note.id}`,note)
    const{id}=response.data;
    setNotes(
      notes.map((note) =>{
        return note.id === id? {...response.data} : note;
      })  
    );
};

  const removeNoteHandler = async (id) => {
    await api.delete(`/notes/${id}`);
    const newNoteList = notes.filter((note) => {
      return note.id !==id;
    });

    setNotes(newNoteList);
  };

  
  return (
    <div className="ui container">
      <Router>
      <Header/>
        <Routes>
        <Route path="/add" element={<AddNote addNoteHandler={addNoteHandler}/>}/>
        <Route exact path="/" element={<NoteList notes={searchTerm.length < 1 ? notes:searchResults} getNoteId={removeNoteHandler} term={searchTerm} searchKeyword={searchHandler}/>}/>
        <Route path="/note/:id" element={<NoteDetail notes={notes}/>}/>
        <Route path="/edit/:id" element={<EditNote notes={notes} updateNoteHandler={updateNoteHandler}/>}/>
        </Routes>
      {/* <AddNote addNoteHandler={addNoteHandler}/>
      <NoteList notes={notes} getNoteId={removeNoteHandler}/> */}
      </Router>
    </div>
  );
}

export default App;
