import React,{useState} from "react";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

function AddNote ({addNoteHandler}) {
  const navigate = useNavigate();
    const[title, setTitle]=useState('');
    const[content, setContent]=useState('');
  

  const add = (e) => {
    e.preventDefault();
    if (title === "" || content === "") {
      alert("All the fields are mandatory!");
      return;
    }
    addNoteHandler({id:uuidv4(),title,content});
    // Perform your addNoteHandler logic here using the 'state' object
    //console.log("Note added:", state);
    setTitle('');
    setContent('');
    navigate("/"); // Navigate to the specified route
  };

  return (
    <div className="ui main">
      <br />
      <h2>Add Note</h2>
      <form className="ui form" onSubmit={add}>
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
        <button className="ui button blue" style={{display:"flex"}}>Add</button>
      </form>
    </div>
  );
};

export default AddNote;
