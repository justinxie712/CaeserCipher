import React, { Component } from 'react';
import Letter from './Letter';
import { Form, FormGroup, Input, Button } from 'reactstrap'; 

class SourceText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stringText: "",
            count: 0 
        };
    }

    setOffset() {
        // Set offset
    }

    incrementCount(count) {
        this.setState((prevState) => {
            return {
                count: prevState.count + 1
            }
        });
    }

    onClickHandler = (letter) => {
        this.incrementCount(this.state.count)
        this.setState((prevState) => {
            return {
                stringText: prevState.stringText + letter
            }
        });
    }

    createList = (listOfLetters, offset) => {
        let letterList = [];

        for (let i = 0; i < listOfLetters.length; i++) {
            letterList.push(<Letter key={i} letter={listOfLetters[i]} onClick={() => this.onClickHandler(listOfLetters[i])} />)
        }
        
        return letterList;
    };

    clearText(event) {
        event.preventDefault();
        this.setState({
            stringText: "",
            count: 0
        });
    }

    lettersArray = "abcdefghijklmnopqrstuvwxyz".split("");
    letters = this.createList(this.lettersArray, 0);

    render() {
        return (
            <div>
                <h1 style={{textDecoration: "underline"}}>Encoding</h1>
                {this.letters}
                <br></br>
                <br></br>
                {this.letters}
                <br></br>
                <br></br>
                Count: <p>{this.state.count}</p>
                <Form>
                    <FormGroup>
                        <Input type="text" name="keyword" style={{width:'50%'}} placeholder={this.state.stringText} />
                        <Button className="btn btn-primary btn-large" type="submit" onClick={(event) => this.clearText(event)} style={{float: "right"}}>Clear</Button>
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="keyword" placeholder="Type keyword here" style={{width:'50%'}} />
                    </FormGroup>
                </Form>
            </div>
            
        )
    }

}



export default SourceText