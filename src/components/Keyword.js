import React, { Component } from 'react';
import { Form, FormGroup, Input, Label, Button } from 'reactstrap'; 

class Keyword extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            word: "word",
            code: this.displayCode("word")
        };
    }

    displayCode(codeArray) {
        var result = "";
        for (var i = 0; i < codeArray.length; i++) {
            var code = codeArray.toUpperCase().charCodeAt(i)
            if (code > 64 && code < 91) {
                result += (code - 65) + " ";
            } 
        }
        return result;
    }
    
    handleSubmit(event) {
        event.preventDefault();
        let input = event.target.elements.keyword.value
        this.setState({
            word: input,
            code: this.getAlphabetPosition(input)
        });
    }

    getAlphabetPosition(text) {
        var result = [];
        for (var i = 0; i < text.length; i++) {
            var code = text.toUpperCase().charCodeAt(i)
            if (code > 64 && code < 91) {
                result.push(code - 65);
            } 
        }
        return result;
    }
    
    offsetLetters(text) {
        var result = [];
        for (var i = 0; i < text.length; i++) {
            var code = text.toUpperCase().charCodeAt(i)
            if (code > 64 && code < 91) {
                result.push(code - 65);
            } 
        }
        console.log(result)
        return result;
    }

    render() {
        return (
            <div>
                <h1 style={{textDecoration: "underline"}}>Configuration</h1>
                <Form onSubmit={this.handleSubmit} >
                    <FormGroup>
                        <Label for="keyword">Keyword</Label>
                        <Input type="text" name="keyword" placeholder="Type keyword here" style={{width:'50%'}} />
                    </FormGroup>
                    <Button className="btn btn-primary btn-large centerButton" type="submit" style={{display: "inline-block"}}>Submit</Button>
                </Form>        
                <br></br>
                Word: {this.state.word}
                <br></br>
                Code: {this.state.code}
            </div>
        );
    }  
};

export default Keyword;
