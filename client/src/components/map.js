import React, { Component } from "react";
import ReactDOM from "react-dom"
import { withRouter } from "react-router";
import Draggable, { DraggableCore } from 'react-draggable'; // Both at the same time
import ImageMapper from "react-image-mapper";
import mapJSON from "../json/map.json";
import Help from "../components/Help";
import Modal from "react-modal";
import characters from "../json/characters.json"
import "../styles/map.css";

var MAP = {
    name: "my-map",
    areas: mapJSON,
    currentArea: []
}

class Map extends Component {


    constructor() {
        super();

        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    openModal(area) {
        this.setState({ modalIsOpen: true, currentArea: area });
    }

    afterOpenModal() {
        this.subtitle.style.color = "black";
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    //function for moving map:
    moveMap(event) {
        console.log(`Pressed ${event.keyCode}`)
        switch (event.keyCode) {
            //UP
            case 38:
                var element = document.getElementById("text-box");
                element.style.top = parseInt(element.style.top) + 20 + "px"
                break;
            //DOWN
            case 40:
                var element = document.getElementById("text-box");
                element.style.top = parseInt(element.style.top) - 20 + "px"
                break;
            //LEFT
            case 37:
                var element = document.getElementById("text-box");
                element.style.left = parseInt(element.style.left) + 20 + "px"
                break;
            //RIGHT
            case 39:
                var element = document.getElementById("text-box");
                element.style.left = parseInt(element.style.left) - 20 + "px"
        }
    }


    getMapInfoHandler = (area) => {
        console.log(area);
        this.openModal(area);
    }


    renderMonsters = (monsters) => {
        console.log(monsters)
        var monsterInfo = monsters.map(monster => (characters.filter(character => character.id == monster))[0]);
        // return monsterInfo;
        return <div>
            {monsterInfo.map(item => (
                <div className="monsters-rendered">
                    <img key={item.id} src={`${process.env.PUBLIC_URL}/img/cards/${item.image}`} alt={item.name}></img>
                    <p>{item.name}</p>
                </div>
            ))}
        </div>

    }

    handleAttackClick = (name) => {
        this.props.handleLocationClick(this.state.currentArea.name)
        // this.props.history.push("/combat/"+name+"/"+this.props.match.params.id)
    }

    render() {
        return (
            <>
                {/* //move map with arrow keys */}
                <div onKeyDown={this.moveMap}
                    tabIndex="0"
                >
                    <Draggable >
                        <div id="text-box" style={{ top: "0px", left: "0px" }}>
                            <ImageMapper
                                src="../img/map/map.png"
                                map={MAP}
                                width={1844}
                                onClick={area => this.getMapInfoHandler(area)}
                            ></ImageMapper>
                        </div>
                    </Draggable>

                    {this.state.currentArea ?
                        (

                            <Modal
                                isOpen={this.state.modalIsOpen}
                                onAfterOpen={this.afterOpenModal}
                                onRequestClose={this.closeModal}
                                // style={customStyles}
                                contentLabel="Example Modal"
                            >

                                <div className="modal-title col-md-12">
                                    <h1 ref={subtitle => this.subtitle = subtitle}>{this.state.currentArea.name}</h1>
                                    <h2 ref={subtitle => this.subtitle = subtitle}>Tier: {this.state.currentArea.tier}</h2>
                                </div>

                                <div className="modal-monster col-md-6">
                                    <h2 ref={subtitle => this.subtitle = subtitle}>Resides in this area:</h2>
                                    {this.renderMonsters(this.state.currentArea.monsters)}
                                </div>

                                <div className="modal-reward col-md-6">
                                    <h2 ref={subtitle => this.subtitle = subtitle}>Possible Rewards:</h2>
                                    <h2>Joins your team</h2>
                                    <h2>You Gain: {this.state.currentArea.experience}XP!</h2>
                                    {this.renderMonsters(this.state.currentArea.monsters)}
                                </div>

                                <div className="modal-leave col-md-12">
                                    <button id="attack-region" className="btn btn-dark btn-lg" onClick={this.handleAttackClick}>Attack Region</button>
                                    <button id="modal-close" className="btn btn-dark btn-lg" onClick={this.closeModal}>Close</button>
                                </div>

                            </Modal>

                        ) : (

                            <Modal
                                isOpen={this.state.modalIsOpen}
                                onAfterOpen={this.afterOpenModal}
                                onRequestClose={this.closeModal}
                                // style={customStyles}
                                contentLabel="Example Modal"
                            >
                                <h2 ref={subtitle => this.subtitle = subtitle}>None</h2>
                                <button id="modal-close" className="btn btn-dark btn-lg" onClick={this.closeModal}>Close</button>

                            </Modal>
                        )
                    }
                </div>


            </>
        )
    }

}

export default Map;
