import axios from 'axios'
import { goToAdminPage } from '../Routes/coordinator'
import { API_CLIENT, BASE_URL } from '../components/constants/urls'

export const requestLogin = (email, password, navigate) => {

    const body = {
        email: email,
        password: password
    }

axios.post(`${BASE_URL}/${API_CLIENT}/login`, body)

.then((response) => {
    localStorage.setItem("token", response.data.token);
    alert ("Login realizado com sucesso")
    goToAdminPage(navigate);
})

.catch((error) => {
    alert ("Um erro ocorreu! Tente novamente");
    console.log(error.message);

});
}

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