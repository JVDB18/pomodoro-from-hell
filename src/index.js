import React from "react";
import ReactDOM from "react-dom";
import Header from './components/Header.js';
import './scss/style.css';

class Pomodoro extends React.Component {
    constructor(props) {
        super(props);
        this.state= {
            timer: 1500,
            start: false,
            title: "Challenge accepted?",
            btnState: "Start",
            break: false,
        }
        this.play= this.play.bind(this);
        this.restartInterval = this.restartInterval.bind(this);
        this.increment = this.increment.bind(this);
        this.decrement = this.decrement.bind(this);
        this.reset = this.reset.bind(this);
    }

    play(){
        let newState = this.state.timer - 1;
        this.setState({
            timer: newState,
            start: true,
            btnState: "Restart"
        });
    }  

    restartInterval(){
        if(this.state.start === false){
        clearInterval(this.interval);
        this.interval = setInterval(this.play, 1000);    
    }
        if (this.state.start === true){
            clearInterval(this.interval);
            this.setState({
                start: false,
            })}
        if (this.state.timer === 0){
            clearInterval(window.interval);
            this.setState({
                title: 'Take a break you Sunshine <3',
                timer: 300,
                break: true,
            })
        }
        if(this.state.timer ===0 && this.state.break === true){
            clearInterval(window.interval);
            this.setState({
                title:"Good Job mate, let's go for an another one?",
                timer: 1500,
                break: false,
                start: false,
            })
        }
}
    formatingTimer(sec){
        let minutes = Math.floor(sec % 3660 / 60);
        let secondes = Math.floor(sec % 3600 % 60);
        let newTimer = minutes + ":" + (secondes < 10 ? "0" : "") + secondes;
        return newTimer;
    
    }
    increment(){
        if(this.state.timer < 3660){
       let increment=  this.state.timer + 60;
       this.setState({timer: increment,});
    }}
    decrement(){
        if (this.state.timer > 0){
       let decrement= this.state.timer - 60;
        this.setState({timer: decrement,});
    }}
    reset(){
        this.setState({timer: 1500});
        clearInterval(window.interval);
    }
    
    render() {
        return <div>
            <Header
            title= {this.state.title}/>
            <div className="main_container">
        <div className="pomodoro_container">
            <div className="timer_container">
            <div className="clock">
            {this.formatingTimer(this.state.timer)}</div>
        </div>
            <div className="increment">
            <button className="increment-btn" onClick={this.increment}>+</button>
            <button className="decrement-btn" onClick= {this.decrement}>-</button>
            </div>
        <div className="btn_container">
        <button id="start" className="control-btn" onClick={this.restartInterval}>{this.state.btnState}</button>
            <button className="control-btn" onClick= {this.restartInterval}>Stop</button>
            <button className="control-btn" onClick={this.reset}>Reset</button>
        </div>    
        </div>
    </div>
        </div>
    }
}


let App = document.getElementById("app");

ReactDOM.render(<Pomodoro/>, App);