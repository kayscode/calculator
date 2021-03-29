class Checker{

    constructor(){

    }

    sayHello = () =>{
        console.log("chekers helloworld")
    }

    checkFormData = (matricule,password,userAccount) => {

        const errors = [];

        if(matricule.length !== 8){

            errors.push("matricule is Invalid empty matricule or lenght must be equal to 8");
        }
        if(password.length <=6){

            errors.push("password lenght must have plus of 6 charachters");
        }

        if(userAccount !== "admin" && userAccount !== "student" && userAccount !== "professor"){

            errors.push("accountType is empty or doesn't exist");

        }else{

            if(userAccount === "admin"){

                userAccount = "adminAccount";

            }else if (userAccount === "student"){

                userAccount = "studentListAccount";

            }else if(userAccount === "professor"){

                userAccount = "professorListAccount";

            }

        }

        if(errors.length > 0) {

            return {error:true,data:null,message:errors}

        } else{

            return {error : false,data : {matricule,password,userAccount}}

        }

    }


    checkerNewPassword = (oldpassword,newpassword) =>{

        let errors = [];

        if(oldpassword.length <6 || newpassword.length < 6){
            errors.push("password must be superior to 6")
        }

        if(errors.length > 0){
            return {error:true,message:errors,data:null}
        }else{
            return {error:false,message:[],data:null}
        }

    }

}

const checker = new Checker()

export {checker};