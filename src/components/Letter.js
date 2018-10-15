import React from 'react';
import { Button } from 'reactstrap'; 

const Letter = (props) => {
    return (
        <div style={{border: "2px solid black", width: "5vh", float: "left", textAlign: "center"}}>
            <Button 
                onClick={props.onClick}
            >{props.letter}</Button>
        </div>
    )
}

export default Letter;