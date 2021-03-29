import React,{Component} from 'react';
import {authentication} from '../api/authentication';
import {reactLocalStorage} from 'reactjs-localstorage';


export class UpdateForm extends Component{

    constructor(props){
        super(props);
        this.state = {
            oldpassword:"",
            errors:[]
        }
    }


    readPassword = (event) =>{
        this.setState((state)=>{state.password=event.target.value},()=>console.log(this.state.password));
    }

    readOldPassword = (event) => {
        this.setState((state)=>{state.oldpassword=event.target.value},()=>console.log(this.state.oldpassword));
    }

    updatePassword = async(event) => {

        event.preventDefault();
        let userAccount = reactLocalStorage.getObject("auth-calculator").userAccount;
        const {password,oldpassword,matricule} = this.state;

        if(userAccount === "admin"){

            userAccount = "adminAccount";

        }else if (userAccount === "student"){

            userAccount = "studentListAccount";

        }else if(userAccount === "professor"){

            userAccount = "professorListAccount";

        }
        const response = await authentication.checkPasswordForUpdate(password,oldpassword,matricule,userAccount);

        if(response.error){
            this.setState({errors:response.message})
        }else{
            this.setState((state)=>{
                state.oldpassword ="";
                state.password =""
            },()=>console.log(this.state.oldpassword,this.state.password))
        }
    }

    isLoading = () => {

        if(this.state === null || this.state === undefined ){

            return <div> Loading </div>

        }else{
            console.log(this.state,"in form")
            return(
                <div className={"max-w-xl m-auto bg-white rounded-lg p-5"}>
                    {
                        this.state.errors.length > 0 && (
                            <div className={"space-y-3"}>
                                {
                                    this.state.errors.map((error,key)=>{
                                        return <p key={key} className={"text-red-400 bg-red-200 p-2"}>
                                            {
                                                error
                                            }
                                        </p>
                                    })
                                }
                            </div>
                        )
                    }
                    <form action="" onSubmit={(event)=> this.updatePassword(event)} className={"px-10 space-y-5 text-left py-5 text-lg text-gray-700"}>
                                <div className={"space-x-3 grid grid-cols-3 items-center"}>
                                    <label htmlFor="">matricule : </label>
                                    <input type="text" value={this.state.matricule} onChange={(event)=>this.updateMatricule(event)} className={"col-span-2 p-2 border border-gray-200 rounded-lg"} disabled/>
                                </div>
                                <div className={"space-x-3 grid grid-cols-3 items-center"}>
                                    <label htmlFor="">old password : </label>
                                    <input type="password" onChange={(event)=>this.readOldPassword(event)} className={"col-span-2 p-2 border border-gray-200 rounded-lg"}/>
                                </div>
                                <div className={"space-x-3 grid grid-cols-3 items-center"}>
                                    <label htmlFor="">new password : </label>
                                    <input type="password" onChange={(event)=>this.readPassword(event)} className={"col-span-2 p-2 border border-gray-200 rounded-lg"}/>
                                </div>
                                <div className={"flex justify-center py-5"}>
                                    <button type={'submit'} className={"py-3 px-5 font-bold rounded-lg bg-indigo-500 text-white"}>
                                        update
                                    </button>
                                </div>
                            </form>
                </div>
            )

        }

    }

    render(){
        return(
            <>
                {
                    this.isLoading()
                }
            </>
        )
    }

    componentDidMount = () => {
        this.setState({...this.props.user})

    }

}

export default UpdateForm;