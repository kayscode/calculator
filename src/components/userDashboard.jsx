import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';
import { reactLocalStorage } from 'reactjs-localstorage';
import Calculator from './Calculator';
import Form from './form';
import {UpdateForm} from './updateForm'


export class UserDashBoard extends Component{

    constructor(props){
        super(props);
        this.state = {
            user:null,
            connected:false
        }
    }

    logout = () => {
        reactLocalStorage.clear("auth-calculator");
        this.setState({connected:false})
    }

    isUserDataGetter = () => {
        if(this.state.user === null){
            return <div>Loading</div>
        }else{
            return this.connexionOrDashBoard();
        }
    }

    connexionOrDashBoard = () => {
        console.log(reactLocalStorage.getObject("auth-calculator"))
        if(reactLocalStorage.getObject("auth-calculator").matricule !== undefined && reactLocalStorage.getObject("auth-calculator").matricule !== null){
            return(
                <div className={"grid grid-cols-4 text-white"}>
                    <div className={"h-screen bg-indigo-800 p-4 space-y-8"}>
                        <div className={"text-center font-black text-2xl text-white"}>
                            USER DASHBOARD
                        </div>
                        <div className={"flex justify-center"}>
                            <div className={" bg-white text-indigo-500 flex items-start justify-center rounded-full h-32 w-32"}>
                                <p className={"items-self-center"}>
                                </p>
                            </div>
                        </div>
                        <div className={"text-center text-xl text-semibold"}>
                            name : {this.state.user.firstname +"  "+ this.state.user.lastname}
                        </div>
                        <div className={"list-none space-y-2 font-thin text-xl"}>
                            <a href="#cal" className={"block p-2 bg-white bg-opacity-40 rounded-md"}>CACULATRICE</a>
                            <a href="#setting" className={"block p-2 bg-white bg-opacity-40 rounded-md"}>SETTING</a>
                            <button onClick={this.logout} className={"block w-full p-2 bg-white bg-opacity-40 rounded-md"}>LOGOUT</button>
                        </div>
                    </div>
    
                    <div className={"col-span-3 h-screen overflow-y-scroll text-gray-900 bg-indigo-200"}>
                        <div className={"h-screen bg-white p-2 flex items-center"} id="cal">
                            <Calculator user={this.state.user}/>
                        </div>
                        <p className={"text-2xl font-bold flex justify-center items-center h-screen"} id="setting">
                            <div>
                                <div className={"text-center font-black text-2xl text-indigo-500 py-4"}>
                                    CHANGE PASSWORD
                                </div>
                                <UpdateForm user={this.state.user}/>
                            </div>
                        </p>
                    </div>
    
                </div>
            )
        }else{
            console.log("une redirection au niveau du dashboard")
            return <Redirect to="/"/>
        }

    }

    render(){
        console.log(this.state.user)
        return(
            <>
                {
                    this.isUserDataGetter()
                }
            </>
        )
    }

    componentDidMount = () => {
        console.log(this.props.user)
        this.setState({user:this.props.user});
    }

}

export default UserDashBoard;