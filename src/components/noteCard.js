import React from "react";
import { Link } from 'react-router-dom';
import icon from "./Images/icon.jpg";

const noteCard = (props) => {
    const{id,title,content}=props.note;
    return(
        <div className="item" style={{display:'flex', alignItems:'center'}}>
            <img className="ui avatar image" src={icon} alt="icon" />
                <div className="content" style={{flex:'1'}}>
                    <Link to={{pathname:`/note/${id}`, state:{note: props.note}}}>
                    <div className="header">{title}</div>
                    <div>{content}</div>
                    </Link>
                </div>
                <i 
                className="trash alternate outline icon"
                style={{color:"red", marginLeft:"10px", marginTop:"7px "}}
                onClick={() => props.clickHandler(id)}
                ></i>
                <Link to={{pathname:`/edit/${id}`,state:{note:props.note}}}>
                <i 
                className="edit alternate outline icon"
                style={{color:"blue", marginLeft:"auto", marginTop:"7px "}}
                ></i>
                </Link>
            </div>
    );
};

export default noteCard;