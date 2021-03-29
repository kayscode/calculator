import axios from 'axios';
import {professor} from './UserProfessorApi';
import {student} from './UserStudentApi';


class User{

    userInstance;

    constructor(){

        this.userInstance = axios.create({
            baseURL:"http://localhost:4000"
        })

    }

    changePassword = (userAccount,matricule,password) => {

        this.userInstance.patch(`/${userAccount}?matricule=${matricule}`,{"password":password})

    }

    getStudentUserByMatricule = () => {

        return student.getUserData();

    }

    getProfessorUserByMatricule = () => {

        return professor.getProfessorData();

    }

    getUserDataByMatricule = (matricule,userAccount) => {

        return this.userInstance.get(`/${userAccount}?matricule=${matricule}`);

    }

    deleteUser = (id,userAccount) =>{
        this.userInstance.delete(`/${userAccount}/${id}`)
    }

    updatePassword = async (matricule_,password_,userAccount_) => {

        const response = await this.getUserDataByMatricule(matricule_,userAccount_);
        const {matricule,password,firstname,lastname,level,description,id} = response.data[0];
        const userData = {matricule,password:password_,firstname,lastname,level,description};
        // this.deleteUser(id,userAccount_);
        // this.userInstance.post(`/${userAccount_}/`,userData);

        Promise.all([
            this.deleteUser(id,userAccount_),
            this.userInstance.post(`/${userAccount_}/`,userData)
        ]).then((result)=>{
            console.log(result)
        })

    }

}

const user = new User();

export {user};