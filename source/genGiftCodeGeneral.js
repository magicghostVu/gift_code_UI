/**
 * Created by Fresher on 04/08/2017.
 */
import React from 'react';
import DatePicker from "react-bootstrap-date-picker";
import {FormGroup} from "react-bootstrap"
import {FormControl} from 'react-bootstrap'
import {Button} from 'react-bootstrap'
import Notifications, {notify} from 'react-notify-toast';

import ReactDOM from "react-dom"
import {GameItemType} from "./constant";

import {GiftCodeTye} from "./constant";

import {ToggleButtonGroup} from "react-bootstrap";
import {ToggleButton} from "react-bootstrap";
import ResApiUtils from './RestApiUtils'

function showToastNotify(notify, text) {
    let myColor = {background: '#197acc', text: "#FFFFFF"};
    notify.show(text, "custom", 2000, myColor);

}

class GameItem {
    constructor(type, quantity) {
        this.type = type;
        this.quantity = quantity;
    }
}


class GameItemDisplay extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            type: GameItemType.NO_TYPE,
            quantity: 0
        }
    }

    render() {
        return (
            <div>
                <h4>{this.state.type}</h4>
                <h4>{this.state.quantity}</h4>
            </div>
        );
    }
}


class GenGiftCodeGeneral extends React.Component {
    constructor(props) {
        super(props);
        this.onDateChange = this.onDateChange.bind(this);
        this.addGameItem = this.addGameItem.bind(this);
        this.deleteGameItem = this.deleteGameItem.bind(this);
        this.genGiftCodeGeneral = this.genGiftCodeGeneral.bind(this);
        this.onTypeGiftCodeChange = this.onTypeGiftCodeChange.bind(this);
        this.state = {
            expDate: new Date().toISOString(),
            gameItemsList: [],
            isAddingGameItem: false,
            typeGiftCode: GiftCodeTye.GENERAL,
            timeStampExp: new Date().getTime(),

        };
    }

    onDateChange(value, formattedValue) {
        //console.log("ondatechanged ");
        let state = this.state;
        state.expDate = value;
        state.formattedValue = formattedValue;
        let strDate = state.formattedValue.split("/");
        let dateFromUser = new Date(strDate[1] + "/" + strDate[0] + "/" + strDate[2]);

        state.timeStampExp = dateFromUser.getTime();
        this.setState(state);
    }


    addGameItem() {
        let state = this.state;
        state.isAddingGameItem = true;
        this.setState(state);
        //console.log(ReactDOM.findDOMNode(this.refs.select_type).value)
        let typeItem = ReactDOM.findDOMNode(this.refs.select_type).value;
        let quantity = ReactDOM.findDOMNode(this.refs.quantity).value;
        if (quantity == '' || quantity == 0) {
            //console.log("quantity is not valid");
            //todo : implement toast notification
            showToastNotify(notify, "quantity is not valid");
        } else {
            let newGameItem = new GameItem(typeItem, quantity);
            state.gameItemsList.push(newGameItem);
            this.setState(state);
        }
    }

    deleteGameItem(index) {
        let that = this;
        return function () {
            let crState = that.state;
            let gameItemList = crState.gameItemsList;
            gameItemList.splice(index, 1);
            that.setState(crState);
        };
    }


    async genGiftCodeGeneral() {
        switch (this.state.typeGiftCode) {
            case GiftCodeTye.FOR_USER: {


                break;
            }
            case GiftCodeTye.GENERAL: {
                let data = {
                    expTime: this.state.timeStampExp,
                    quantity: ReactDOM.findDOMNode(this.refs.quantity_of_gitfCodes).value,
                    nameOfCollection: ReactDOM.findDOMNode(this.refs.event_name).value,
                    gameItems: this.state.gameItemsList,
                    timeCanUse: ReactDOM.findDOMNode(this.refs.time_can_use).value,
                    //timeCanUse:
                };
                let response = await ResApiUtils.genGiftCodeGeneral(data);

                //console.log(response);
                if (response.errCode !== 0) {
                    showToastNotify(notify, "ERR" + response.err);
                } else {
                    showToastNotify(notify, "gen giftCodes success");
                }


                break;
            }
        }

    }


    onTypeGiftCodeChange(val) {
        /*console.log("radio change", val);*/
        let state = this.state;
        state.typeGiftCode = val;
        this.setState(state);
    }


    render() {
        let itemList = [];
        let deleteGamaItem = this.deleteGameItem;
        this.state.gameItemsList.forEach(function (e, i) {
            itemList.push(
                <div key={i + "gameItem"}>
                    <h5 >{e.type + " : " + e.quantity} </h5> <Button onClick={deleteGamaItem(i)}>Delete This
                    Item</Button>
                </div>
            );
        });
        return (
            <div className="col-md-4">
                <Notifications/>
                <FormGroup>
                    <h2>Gen GiftCode General</h2>
                    <h4>Exp date:</h4>
                    <DatePicker value={this.state.expDate} onChange={this.onDateChange}/>
                    <h4>List game items</h4>
                    {itemList}
                    <br/>
                    <FormControl componentClass="select" ref="select_type">
                        <option value={GameItemType.GOLD}>{GameItemType.GOLD}</option>
                        <option value={GameItemType.COIN}>{GameItemType.COIN}</option>
                        <option value={GameItemType.CHEST_1}>{GameItemType.CHEST_1}</option>
                        <option value={GameItemType.CHEST_2}>{GameItemType.CHEST_2}</option>
                        <option value={GameItemType.CHEST_3}>{GameItemType.CHEST_3}</option>
                        <option value={GameItemType.DICE_1}>{GameItemType.DICE_1}</option>
                        <option value={GameItemType.DICE_2}>{GameItemType.DICE_3}</option>
                        <option value={GameItemType.DICE_3}>{GameItemType.DICE_3}</option>
                    </FormControl>
                    <br/>
                    <FormControl type="text" placeholder="Quantity" ref="quantity"/>
                    <br/>
                    <Button onSubmit={false} onClick={this.addGameItem}>Add GameItem</Button> <br/> <br/>
                    <FormControl disabled={this.state.typeGiftCode === GiftCodeTye.FOR_USER} ref="quantity_of_gitfCodes"
                                 type="text"
                                 placeholder="Quantity of GiftCode will be generated"/> <br/>
                    <FormControl disabled={this.state.typeGiftCode === GiftCodeTye.FOR_USER} ref="event_name"
                                 type="text" placeholder="Name of Event need GiftCodes"/> <br/>

                    <FormControl disabled={this.state.typeGiftCode === GiftCodeTye.FOR_USER} ref="time_can_use"
                                 type="text" placeholder="Number of time can use for each code"/> <br/>

                    <ToggleButtonGroup type="radio" name="radio_choose_type" defaultValue={1} ref="type_giftCode"
                                       onChange={this.onTypeGiftCodeChange}>
                        <ToggleButton value={GiftCodeTye.GENERAL}>GiftCode General</ToggleButton>
                        <ToggleButton value={GiftCodeTye.FOR_USER}>GiftCode for user</ToggleButton>
                    </ToggleButtonGroup>

                    <br/>
                    <br/>

                    <Button bsStyle="primary" onClick={this.genGiftCodeGeneral}>Gen GiftCodes</Button>


                </FormGroup>
            </div>
        );
    }


}

export {GenGiftCodeGeneral}