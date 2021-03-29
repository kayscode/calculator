import {admin} from '../rest_api/AdminApi';
import {user} from '../rest_api/UserApi';
import { checker } from './checkers';

class Authentication{

    constructor(){

    }

    userAuthentication = async (matricule,password,useraccount) =>{

        let errors = [];
        let userData = {};
        // const userCheckedData = checker.checkFormData(matricule,password,useraccount);
        const userCheckedData = checker.checkFormData(matricule,password,useraccount);

        

        if(userCheckedData.error){

            errors = userCheckedData.message;

        }else{
            
            try{

                console.log(userCheckedData.data.userAccount)
                const {matricule,userAccount,password} = userCheckedData.data;

                const userdata = await user.getUserDataByMatricule(matricule,userAccount);
                const data = userdata.data[0];

                if(data.password !== password){

                    errors.push("password doesn't match")

                }else{
                    userData = data;
                }

            }catch(e){

                errors.push("matricule not found, created first account")

            }

        }

        if(errors.length > 0){

            return {error:true,data:null,message:errors}

        }else{
            return {error:false,data:userData};

        }


    }

    adminAuthentication = async (matricule,password,adminaccount="adminAccount") => {

        let errors = [];
        let adminData = {};

        const adminCheckedData = checker.checkFormData(matricule,password,adminaccount);

        if(adminCheckedData.error){

            errors = adminCheckedData.message;

        }else{
            
            try{
                let getAdminData = await admin.getAdminDataByMatricule(adminCheckedData.data.matricule)
                let data = getAdminData.data[0];

                if(data.password !== adminCheckedData.data.password){
                    
                    errors.push("password doesn't match")

                }else{

                    adminData = data;

                }

            }catch(e){

                errors.push("matricule not found admin, created first account")

            }

        }

        if(errors.length > 0){

            return {error:true,data:null,message:errors}

        }else{

            return {error:false,data:adminData};

        }



    }

    checkPasswordForUpdate = async(newPassword,oldPassword,matricule,userAccount) => {

        let error = checker.checkerNewPassword(oldPassword,newPassword);
        if(error.error){

            return error;
            
        }else{
            console.log(matricule,userAccount)
            const response =await user.getUserDataByMatricule(matricule,userAccount);
            const userData = response.data[0];

            if(oldPassword === userData.password){
                user.updatePassword(matricule,newPassword,userAccount);
            }else{
                error.error = true;
                error.message.push("old password doesn't matched");
            }

        }

        return error;

    }

}

const authentication = new Authentication();

export {authentication};