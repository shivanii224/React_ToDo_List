import React,{useRef} from "react";
import { Link } from 'react-router-dom';
import NoteCard from "./noteCard";

const noteList = (props) => {
    console.log(props.notes);
    const inputEl=useRef("");
    const deleteNoteHandler = (id) => {
        props.getNoteId(id);
    };
    const renderNoteList=props.notes.map((note)=>{
        return <NoteCard note={note} clickHandler={deleteNoteHandler} key={note.id}/>
    });

    const getSearchTerm = () => {
        props.searchKeyword(inputEl.current.value);
    };
    return (
        <div className="main">
            <br />
            <h2 style={{display:"flex",justifyContent:"space-between", alignItems:"center"}}>Notes List
                <Link to="/add">
                <button className="ui button blue right" >Add Notes</button>
                </Link>
            </h2>
            <div className="ui search">
                <div className="ui icon input">
                    <input ref={inputEl} type="text" placeholder="Search Notes" className="prompt" value={props.term} onChange={getSearchTerm}/>
                    <i className="search icon"></i>
                </div>
            </div>
        <div className="ui  celled list">
            {renderNoteList.length > 0? renderNoteList : "No notes available"}
        </div>
        </div>
    );
};

export default noteList;