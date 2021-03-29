import axios from 'axios';
import {user} from "./UserApi";

// 

class Admin{

    adminInstance;

    constructor(){

        this.adminInstance = axios.create({
            baseURL:"http://localhost:4000/adminAccount"
        })

    }

    getAdminData = () => {

        return this.adminInstance.get();

    }

    getAdminDataByMatricule = (matricule) => {

        return this.adminInstance.get(`?matricule=${matricule}`)

    }

    resetUsePassword = (userAccount,matricule) => {
        
        user.changePassword(userAccount,matricule,"");

    }

    changePassword = (matricule,newPassword) => {

        this.adminInstance.patch(`?matriucle=${matricule}`,{'password':newPassword});

    }

    createUserAccount = (name,lastname,matricule,password,userAccount,bio) => {

        user.userInstance.post(`/${userAccount}`,{name,lastname,matricule,password,description:bio});

    }

}

const admin = new Admin();

export {admin}