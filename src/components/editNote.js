import React,{useState, useEffect} from "react";
//import { v4 as uuidv4 } from 'uuid';
import {  useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const EditNote = (props) => {
  // const {location}=useLocation();
  // // const{id,title,content}=location.state.note;
   const {id} = useParams();
   const navigate = useNavigate();
   const selectedNote = props.notes.find((note) => note.id === id)||null;
  //const initialTitle = note ? note.title : '';
 // const initialContent = note ? note.content : '';
    
  
    useEffect(() => {
      if(!selectedNote){
        console.log('Note not found');
        return;
      }

      setTitle(selectedNote.title);
      setContent(selectedNote.content);
    }, [selectedNote]);

    const[title, setTitle]=useState('');
    const[content, setContent]=useState('');

  const update = (e) => {
    e.preventDefault();
    if (title === '' || content === '') {
      alert("All the fields are mandatory!");
      return;
    }
  //   console.log("Updating note:", note);
  // console.log("New title:", title);
  // console.log("New content:", content);

  
    props.updateNoteHandler({id, title, content});

    // Perform your addNoteHandler logic here using the 'state' object
    //console.log("Note to be updated:", note);
    setTitle('');
    setContent('');
    navigate("/"); // Navigate to the specified route
  };
  if (!selectedNote) {
    return <div>Error: Contact data not found.</div>; // Handle the case when contact data is not available
  }



  return (
    <div className="ui main">
      <br />
      <h2>Edit Note</h2>
      <form className="ui form" onSubmit={update}>
        <div className="field">
          <label>Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Content</label>
          <input
            type="text"
            name="content"
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button className="ui button blue" style={{display:"flex"}}>Update</button>
      </form>
    </div>
  );
};

export default EditNote;
