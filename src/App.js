import React, { Component } from 'react';
import { Form, FormGroup, Input, Button, Label, Table } from 'reactstrap'; 
import Letter from './components/Letter';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        
        this.displayCode = this.displayCode.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getOffset = this.getOffset.bind(this);
        this.appendToString = this.appendToString.bind(this);
        this.createList = this.createList.bind(this);
        this.clearText = this.clearText.bind(this);

        this.state = {
            word: "default",
            offsets: this.getOffset("default"),
            code: this.displayCode("default"),
            stringText: "",
            cypherText: "",
            keyIndex: 0,
            wordLength: 7
        };
    }

    displayCode = (text) => {
        let result = "";
        for (let i = 0; i < text.length; i++) {
            let code = text.toUpperCase().charCodeAt(i);
            if (code > 64 && code < 91) {
                result += (code - 65) + " ";
            } 
        }
        return result;
    }

    getOffset = (text) => {
        let result = [];
        for (let i = 0; i < text.length; i++) {
            let code = text.toUpperCase().charCodeAt(i)
            if (code > 64 && code < 91) {
                let value = parseInt(code - 65)
                result.push(value);
            } 
        }
        return result;
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let input = event.target.elements.keyword.value.toString().toUpperCase()
        this.setState({
            word: input,
            code: this.displayCode(input),
            offsets: this.getOffset(input),
            keyIndex: 0,
            stringText: "",
            cypherText: "",
            wordLength: input.length
        });
    }

    appendToString = (letter, cypher) => {
        this.setState((prevState) => {
            let newCount = prevState.keyIndex + 1;
            let len = prevState.word.length;
            if (newCount === (len)) {
                newCount = 0;
            }
            return {
                stringText: prevState.stringText + letter,
                cypherText: prevState.cypherText + cypher,
                keyIndex: newCount,
                count: newCount,
                wordLength: len
            }
        });
    }

    createList = (listOfLetters, offset, hasControl) => {
        let letterList = [];

        for (let i = 0; i < listOfLetters.length; i++) {
            let currentLetter = listOfLetters[i].toUpperCase()
            let code = currentLetter.charCodeAt(0) + offset;
            if (code > 90) {
                code = code - 26;
            }
            let cypher = String.fromCharCode(code);
            if (hasControl === true) {
                letterList.push(<Letter key={i} letter={currentLetter} onClick={() => this.appendToString(currentLetter, cypher)} />)
            }
            else{
                letterList.push(<Letter key={i} letter={cypher} disabled />)
            }
            
        }
        
        return letterList;
    };

    clearText = (event) => {
        event.preventDefault();
        this.setState({
            stringText: "",
            cypherText: "",
            keyIndex: 0
        });
    }

    render() {
        let lettersArray = "abcdefghijklmnopqrstuvwxyz".split("");
        let offsetArray = this.state.offsets;
        let currentOffset = offsetArray[this.state.keyIndex];
        let letters = this.createList(lettersArray, currentOffset, true);
        let offsetLetters = this.createList(lettersArray, currentOffset, false);

        return (
        <div className="App">
            <h1 style={{textDecoration: "underline"}}>Configuration</h1>
                <Form onSubmit={this.handleSubmit} >
                    <FormGroup>
                        <Label for="keyword">Keyword</Label>
                        <Input type="text" name="keyword" placeholder="Type keyword here" minLength="3" maxLength="8" style={{width:'50%', textTransform: "uppercase"}} />
                    </FormGroup>
                    <Button className="btn btn-success btn-large" type="submit" style={{position: "relative", paddingLeft:"10px"}}>Submit</Button>
                </Form>        
                <br></br>
                Keyword: {this.state.word.toUpperCase()}
                <br></br>
                Offsets: {this.state.code}
                <br></br>
                Next Offset: <div><p style={{backgroundColor: "lightBlue"}}><b>{currentOffset}</b></p></div>
            <br></br>
            
            <h1 style={{textDecoration: "underline"}}>Encoding</h1>
                {letters}
                <br></br>
                <br></br>
                {offsetLetters}
                <br></br>
                <br></br>
                <Form>
                    <FormGroup>
                        <Label for="keyword"style={{position: "relative", float: "left", marginRight:"10px"}}>SourceText: </Label>
                        <Input type="text" name="keyword" style={{width:'50%'}} placeholder={this.state.stringText} disabled />
                        <Button className="btn btn-primary btn-large" type="submit" onClick={(event) => this.clearText(event)} style={{position: "relative", left:"60%"}}>Clear</Button>
                    </FormGroup>
                    <FormGroup>
                        <Label for="cypher"style={{position: "relative", float: "left", marginRight:"10px"}}>CypherText: </Label>
                        <Input type="text" name="cypher" style={{width:'50%'}} placeholder={this.state.cypherText} disabled/>
                    </FormGroup>
                </Form>
        </div>
        );
    }
}

export default App;
