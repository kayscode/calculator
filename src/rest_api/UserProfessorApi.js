import axios from 'axios';


class Professor{

    professorConnection;

    constructor(){
        this.professorConnection = axios.create({
            baseURL:"http://localhost:4000/professorListAccount"
        });
    }


    getProfessorData = () => {

        return this.professorConnection.get();

    }

    getUserDataByMatricule = (matricule) => {

        return this.professorConnection.get(`?matricule=${matricule}`);

    }

    changePassword = (matricule,newPassword) =>{

        this.professorConnection.patch(`?matricule=${matricule}`,{"password":newPassword})

    }

}

const professor = new Professor();

export {professor};