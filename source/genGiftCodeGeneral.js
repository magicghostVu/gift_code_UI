/**
 * Created by Fresher on 04/08/2017.
 */
import React from 'react';
import DatePicker from "react-bootstrap-date-picker";
import {FormGroup} from "react-bootstrap"
import {FormControl} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import GameItemType from "./constant";

class GameItemBuilder extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            id: GameItemType.NO_TYPE,
            quantity: 0
        }
    }

    render() {
        return (
            <FormGroup>
                <FormControl type="text" disabled={this.state.id!==GameItemType.NO_TYPE}/>
            </FormGroup>
        );


    }
}

class GenGiftCodeGeneral extends React.Component {
    constructor(props) {
        super(props);
        this.onDateChange = this.onDateChange.bind(this);
        this.addGameItem = this.addGameItem.bind(this);
        this.state = {
            value: new Date().toISOString(),
            gameItemsList: [],
            isAddingGameItem: false
        };
    }

    onDateChange(value, formattedValue) {
        //console.log("ondatechanged ");
        let state = this.state;
        state.value = value;
        state.formattedValue = formattedValue;
        this.setState(state);
    }


    addGameItem() {
        let state = this.state;
        state.isAddingGameItem = true;
        this.setState(state);

    }

    render() {


        return (
            <div className="col-md-4">
                <FormGroup>
                    <h2>Gen GiftCode General</h2>
                    <h4>Exp date:</h4>
                    <DatePicker value={this.state.value} onChange={this.onDateChange}/>
                    <h4>Quantity</h4>
                    <FormControl type="text" />
                    <br/>
                    <Button onSubmit={false} onClick={this.addGameItem}>Add GameItem</Button>

                </FormGroup>
            </div>
        );
    }
}

export {GenGiftCodeGeneral}