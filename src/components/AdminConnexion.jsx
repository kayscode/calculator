import React,{Component} from 'react';
import { Redirect } from 'react-router-dom';
import { authentication } from '../api/authentication';
import {reactLocalStorage} from 'reactjs-localstorage'



export class AdminConnexion extends Component{

    constructor(props){
        super(props);
        this.state = {

            matricule:"",
            password:"",
            userAccount:"admin",
            connected:false,
            errors:[]
        }
    }

    updateMatricule =(event) =>{
        this.setState((state)=>{state.matricule=event.target.value})
    }

    updatePassword = (event) =>{
        this.setState((state)=>{state.password=event.target.value})
    }

    chooseAccount = (event) => {
        this.setState((state) => {state.userAccount=event.target.options[event.target.options.selectedIndex].value},()=>{
            console.log(this.state.userAccount)
        })
    }

    connection = async(event) => {
        event.preventDefault();
        const {matricule,password,userAccount} = this.state;
        // const response = await authentication.admin(,userAccount);
        const response = await authentication.adminAuthentication(matricule,password,userAccount)
        console.log(response)
        if(response.error){
            this.setState({errors:response.message})
        }else{
            
            reactLocalStorage.setObject("auth-calculator",{matricule,userAccount})
            this.setState({connected:true})
            
        }

    }

    RenderLoginOrDashboard = () => {

        if(this.state.connected){
            
            return <Redirect to={"/dashboard"}/>

        }else{
            return(
                <div className={"py-10 mt-5 bg-gray-300"}>
    
                    <div className={"bg-white max-w-2xl m-auto p-4 shadow-lg rounded-sm space-y-5"}>
                       
                        <div className={"space-y-3"}>
                            {
                                (this.state.errors.length > 0) && this.state.errors.map((error,key)=>{
                                    return <p key={key} className={"p-2 text-center text-bold text-xl text-red-500 bg-red-200 rounded-sm"}>{error}</p>
                                })
                            }
                        </div>
                        <div className={"py-5 text-center text-green-500 font-bold text-2xl"}>
                            LOGIN IN AS ADMIN
                        </div>
                        <form action="" onSubmit={this.connection} className={"space-y-5 text-left py-5 text-lg text-gray-700"}>
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
                                <select name="" id="" defaultValue={"admin"} onChange={(event)=> this.chooseAccount(event)} className={"col-span-2 p-2 border border-gray-200 rounded-lg"}>
                                    <option value="admin">admin</option>
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
            )
        }

    }

    render(){
        return(
            <>
                {
                this.RenderLoginOrDashboard()
            }
            </>
        )
    }

}

export default AdminConnexion;