import React,{Component} from 'react';
import { Redirect } from 'react-router';
import Footer from './Footer';
import Header from './Header';
import {reactLocalStorage} from 'reactjs-localstorage';
import { authentication } from '../api/authentication';


export class Connexion extends Component{

    constructor(props){
        super(props);
        this.state = {

            matricule:"",
            password:"",
            userAccount:"",
            errors:[],
            connected:null
        }
    }

    updateMatricule =(event) =>{
        this.setState((state)=>{state.matricule=event.target.value})
    }

    updatePassword = (event) =>{
        this.setState((state)=>{state.password=event.target.value})
    }

    chooseAccount = (event) => {
        // this.setState({userAccount: event.target.options[event.target.options.selectedIndex].value})
        this.setState((state) => {state.userAccount=event.target.options[event.target.options.selectedIndex].value},()=>{
            console.log(this.state.userAccount)
        })
    }


    connection = async(event) => {
        event.preventDefault();
        const {matricule,password,userAccount} = this.state;
        const response = await authentication.userAuthentication(matricule,password,userAccount);
        if(response.error){
            console.log("des serrues")
            this.setState({errors:response.message})
        }else{
            
            reactLocalStorage.setObject("auth-calculator",{matricule,userAccount})
            this.setState({connected:reactLocalStorage.getObject("auth-calculator")})
            
        }

    }

    RedirectOrLogin = () => {
        // const isRegistered = reactLocalStorage.getObject("auth-calculator")
        if(this.state.connected !== undefined && this.state.connected !== null){
            return <Redirect to="/dashboard"/>
        }else{
            return(
                <>
                    <Header/>
                    <div className={"py-10 mt-5 bg-gray-300"}>
    
                    <div className={"bg-white max-w-2xl m-auto p-4 shadow-lg rounded-sm space-y-5 px-5"}>
                       
                        <div className={"space-y-3"}>
                            {
                                (this.state.errors.length > 0) && this.state.errors.map((error,key)=>{
                                    return <p key={key} className={"p-2 text-center text-bold text-xl text-red-500 bg-red-200 rounded-sm"}>{error}</p>
                                })
                            }
                        </div>
                        <div className={"py-5 text-center text-green-500 font-bold text-2xl"}>
                            LOGIN IN
                        </div>
                        <form action="" onSubmit={this.connection} className={"text-xl space-y-5 text-left py-5  text-gray-700"}>
                            <div className={"space-x-3 grid grid-cols-3 items-center"}>
                                <label htmlFor="">matricule : </label>
                                <input type="text" onChange={(event)=>this.updateMatricule(event)} className={"col-span-2 p-2 border border-gray-200 rounded-lg"}/>
                            </div>
                            <div className={"space-x-3 grid grid-cols-3 items-center"}>
                                <label htmlFor="">password : </label>
                                <input type="password" onChange={(event)=>this.updatePassword(event)} className={"col-span-2 p-2 border border-gray-200 rounded-lg"}/>
                            </div>
                            <div className={"space-x-3 grid grid-cols-3 items-center"}>
                                <label htmlFor="">account : </label>
                                <select name="" id="" onChange={(event)=> this.chooseAccount(event)} className={"col-span-2 p-2 border border-gray-200 rounded-lg"}>
                                    <option value="">choose account</option>
                                    <option value="student">student</option>
                                    <option value="professor">professor</option>
                                </select>
                            </div>
                            <div className={"flex justify-center py-5"}>
                                <button type={'submit'} className={"py-3 px-5 font-bold rounded-lg bg-green-500 text-white"}>
                                    connect
                                </button>
                            </div>
                        </form>
                    </div>
    
                </div>
                <Footer/>
                </>
            ) 
        }

    }

    render(){
        return(
            <>
            {
                this.RedirectOrLogin()
            }
            </>
        )
    }

}

export default Connexion;