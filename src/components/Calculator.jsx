import React, { Component } from 'react';
import {evaluate} from 'mathjs';

const butons = [[7,8,9],[4,5,6],[1,2,3],[0,".","="]];
const operations = ["+","-","/","*"];

export class Calculator extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            expression:"",
            user:{
                level:null
            }
        }
    }

    onClickOperation = () => {
        this.setState({expression:""})
    }

    onChangeepression = (event) => {
        this.setState({expression:event.target.value})
    }

    getResult = () => {
        this.setState({expression:evaluate(this.state.expression)})
    }

    getButtonValue = (event) => {
        const value = event.target.childNodes[0];

        this.setState({expression:this.state.expression+event.target.childNodes[0].data})

        if(value.data === "="){
            this.getResult();
        }
    }

    getOperationValue = (event) => {

        const value = event.target.childNodes[0];

        if(this.state.user.level ===2){

            if(value.data === "+" || value.data === "-"){
                this.setState({expression:this.state.expression+event.target.childNodes[0].data})
            }

        }else if(this.state.user.level === 1){

            if(value.data === "+"){
                this.setState({expression:this.state.expression+event.target.childNodes[0].data})
            }
        }else if(this.state.user.level === 4){
            this.setState({expression:this.state.expression+event.target.childNodes[0].data})
        }

    }

    inputResult = () => {
        if(this.state.expression){
            return this.state.expression;
        }else{
            return ""
        }
    }

    clear = () => {
        this.setState({expression:""})
    }



    render() { 
        return (<div id={"calculatrice"} className={" p-10 rounded-lg bg-gray-200 m-auto space-y-5"}>
            <div className={"text-center text-2xl font-black text-indigo-800"}>
                CALCULATOR
            </div>
            <div className={"grid grid-cols-4"}>
                <input type="text" value={this.inputResult()} onChange={(event)=>this.onChangeepression(event)} className={"p-4 col-span-3 bg-white rounded-l-lg w-full border border-gray-200"}/>
                <button onClick={this.clear} className={"text-white rounded-r-lg font-bold bg-red-500 p-4"}>
                    Clear
                </button>
            </div>
            <div className={"grid grid-cols-4 space-x-2"}>
                <div className={"col-span-3 grid gap-2 grid-cols-3"}>
                    {
                        butons.map(value =>{
                            return value.map(value=>{
                                return <button key={value} onClick={(event)=>this.getButtonValue(event)} className={"text-white p-4 rounded-lg font-bold bg-gray-800"}>
                                            {value}
                                        </button>
                            })
                        })
                    }
                </div>
                <div className={"grid grid-rows-4 gap-2 rounded-lg"}>
                    {
                        operations.map((value)=>{
                            return <button key={value} onClick={(event)=>this.getOperationValue(event)}  className={"text-white p-4 font-bold bg-indigo-500"}>
                                {
                                    value
                                }
                            </button>
                        })
                    }
                </div>
            </div>
        </div>);
    }

    componentDidMount=()=>{
        this.setState((state)=>{
            state.user = this.props.user
        })
    }
}
 
export default Calculator ;