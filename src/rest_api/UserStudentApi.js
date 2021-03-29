import axios from 'axios';


class Student{

    studentConnection;

    constructor(){
        this.studentConnection = axios.create({
            baseURL:"http://localhost:4000/studentListAccount"
        });
    }

    getUserData = () => {

        return this.studentConnection.get();

    }

    getUserDataByMatricule = (matricule) => {

        return this.studentConnection.get(`?matricule=${matricule}`);

    }

    changePassword = (matricule,newPassword) =>{

        this.studentConnection.patch(`?matricule=${matricule}`,{"password":newPassword})

    }

}

const student = new Student();

export {student};