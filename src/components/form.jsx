import React,{Component} from 'react';


export class Form extends Component{

    constructor(props){
        super(props);
        this.state = null
    }


    updatePassword = (event) =>{
        this.setState((state)=>{state.password=event.target.value});
    }

    chooseAccount = (event) => {
        // this.setState({userAccount: event.target.options[event.target.options.selectedIndex].value})
        this.setState((state) => {state.userAccount=event.target.options[event.target.options.selectedIndex].value},()=>{
            console.log(this.state.userAccount)
        })
    }

    isLoading = () => {

        if(this.state === null || this.state === undefined ){

            return <div> Loading </div>

        }else{
            console.log(this.state.user,"in form")
            return(
                <div className={"max-w-xl m-auto bg-white rounded-lg p-5"}>
                    <form action="" onSubmit={this.connection} className={"px-10 space-y-5 text-left py-5 text-lg text-gray-700"}>
                                <div className={"space-x-3 grid grid-cols-3 items-center"}>
                                    <label htmlFor="">matricule : </label>
                                    <input type="text" value={this.state.matricule} onChange={(event)=>this.updateMatricule(event)} className={"col-span-2 p-2 border border-gray-200 rounded-lg"} disabled/>
                                </div>
                                <div className={"space-x-3 grid grid-cols-3 items-center"}>
                                    <label htmlFor="">password : </label>
                                    <input type="password" onChange={(event)=>this.updatePassword(event)} className={"col-span-2 p-2 border border-gray-200 rounded-lg"}/>
                                </div>
                                <div className={"space-x-3 grid grid-cols-3 items-center"}>
                                    <label htmlFor="">account : </label>
                                    <select name="" id="" v onChange={(event)=> this.chooseAccount(event)} className={"col-span-2 p-2 border border-gray-200 rounded-lg"}>
                                        <option value="">choose account</option>
                                        <option value="student">student</option>
                                        <option value="professor">professor</option>
                                    </select>
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

export default Form;