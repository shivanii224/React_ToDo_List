import React from "react";
import { Link } from 'react-router-dom';
import { useParams } from "react-router-dom";
import icon from "./Images/icon.png";
//import noteList from "./noteList";

const noteDetail = ({notes}) => {
        // Use useParams to get the id from the URL
        const { id } = useParams();
      
        // Find the contact with the specified id in the contacts array
        const selectedNote = notes.find(note => note.id === id);
      
        // If the contact is not found, display an error message
        if (!selectedNote) {
          return <div>Contact not found.</div>;
        }
      
        // Otherwise, display the contact details
        const { title,content } = selectedNote;
      
    return(
        <div className="main">
            <br/>
            <br />
            <br />
            <div className="ui card centered">
                <div className="image">
                    <img src={icon} alt="note" />
                </div>
                <div className="content">
                    <div className="header">{title}</div>
                    <div className="description">{content}</div>
                </div>
            </div>
            <div className="center-div">
                <Link to="/">
                    <button className="ui button blue center">
                        Back to notes list
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default noteDetail;