import React,{Component} from 'react';
import AdminDashBoard from './adminDashBoard';
import UserDashBoard from './userDashboard';
import {reactLocalStorage} from 'reactjs-localstorage';
import {user} from '../rest_api/UserApi';
import {Redirect} from 'react-router-dom';


export class DashBoard extends Component{

    constructor(props){
        super(props);
        this.state ={
            user:null,
            connected:null
        }
    }

    getUserData = async() => {

        let {matricule,userAccount} = reactLocalStorage.getObject("auth-calculator");
        if(userAccount === "student"){
            userAccount = "studentListAccount";
        }else if(userAccount === "professor"){
            userAccount ="professorListAccount";
        }else if(userAccount === "admin"){
            userAccount = "adminAccount"
        }
        try{
            const data = await user.getUserDataByMatricule(matricule,userAccount)
            this.setState({user:data.data[0]})
        }catch(e){

        }


    }

    isAdminRegistered = () => {

        if(this.state.user !== null && this.state.user !== undefined && this.state.user.level > 2){
            return true
        }else{
            return false
        }
    }

    isUserDataGetted = () => {
        if(this.state.user === null || this.state.user === undefined){
            console.log(reactLocalStorage.getObject("auth-calculator")===undefined)
            return (reactLocalStorage.getObject("auth-calculator").matricule === undefined) ?  (<Redirect to="/"/>): (<div>Loading</div>)
        }else{
            return this.UserOrAdminDashBoard();
        }
    }

    UserOrAdminDashBoard = () => {
        console.log("choose dash ",this.state.user)
        if(this.state.user.level > 2){
            console.log("admin choosed")
            return <AdminDashBoard user={this.state.user}/>
        }else{
            return <UserDashBoard user={this.state.user}/>
        }

    }

    render(){
        return (
            <>
                {
                    this.isUserDataGetted()
                }
            </>
        )
    }

    componentDidMount = () => {
        const isRegistered = reactLocalStorage.getObject("auth-calculator");
        if(isRegistered.matricule !== undefined){
            console.log(isRegistered)
            this.getUserData()
        }
    }

}

export default DashBoard;