import axios from 'axios'
import { goToAdminPage } from '../Routes/coordinator'
import { BASE_URL, API_CLIENT } from "../components/constants/urls"

export const requestLogin = (email, password, navigate) => {

    const body = {
        email: email,
        password: password
    };

    axios.post(`${BASE_URL}/${API_CLIENT}/login`, body)
        .then((response) => {
            localStorage.setItem("token", response.data.token);
            alert("Login realizado com sucesso!");
            goToAdminPage(navigate);
        })
        .catch((error) => {
            alert(error.message);
        });
};

export const sendApplication = (body, tripId, clear) => {
    axios.post(`${BASE_URL}/${API_CLIENT}/trips/${tripId}/apply`, body)
        .then(() => {
            alert("Aplicação enviada com sucesso!");

            clear();
        })
        .catch((error) => alert(error.response.message))
}

export const createTrip = (body, clear, getTripsData) => {
    const header = {
        headers: {
            auth: localStorage.getItem("token")
        }
    };

    axios.post(`${BASE_URL}/${API_CLIENT}/trips`, body, header)
        .then(() => {
            alert("Viagem criada com sucesso!")
            clear();
            getTripsData();
        })
        .catch((error) => {
            alert(error.message);
        });
};

export const decideCandidate = (tripId, candidateId, decision, getTripsDetail) => {
    const header = {
        headers: {
            auth: localStorage.getItem("token")
        }
    };

    const body = {
        approve: decision
    };

    axios.put(`${BASE_URL}/${API_CLIENT}/trips/${tripId}/candidates/${candidateId}/decide`,
        body,
        header
    )
        .then(() => {
            decision ?
            alert("Candidato aceito na viagem!")
            : alert("Candidatura reprovada com sucesso!");

            getTripsDetail();
        })
        .catch((error) => {
            alert(error.message);
        });
};

export const deleteTrip = (tripId, getTripsData) => {
    const header = {
        headers: {
            auth: localStorage.getItem("token")
        }
    };

    axios.delete(`${BASE_URL}/${API_CLIENT}/trips/${tripId}`, header)
        .then(() => {
            alert("Viagem removida com sucesso!");
            getTripsData();
        })
        .catch((error) => {
            alert(error.message);
        });
};