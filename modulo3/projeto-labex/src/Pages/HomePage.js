import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useRequestData from '../hooks/useRequestData'
import useForm from '../hooks/useForm'
import Header from '../components/Header'
import TripCard from '../components/TripCard'
import { goToAdminPage } from '../Routes/coordinator'
import { sendApplication } from '../services/request'
import { countries } from '../components/constants/countries'
import styled from 'styled-components'

function HomePage() {
    const [tripId, setTripId] = useState("");
    const navigate = useNavigate();
    const [tripsData] = useRequestData("trips", {});
    const { form, onChange, clear } = useForm({ name: "", age: "", applicationText: "", profession: "", country: "" })

    useEffect(() => {
        if (localStorage.getItem("token")) {
            goToAdminPage(navigate);
        };
    }, []);

    const onChangeTrip = (event) => {
        setTripId(event.target.value);
    };

    const onClickSend = (event) => {
        event.preventDefault();
        sendApplication(form, tripId, clear);
    };

    const tripsOptions = tripsData.trips && tripsData.trips.map((trip) => {
        return <option key={trip.id} value={trip.id}>{trip.name}</option>;
    });

    const tripsList = tripsData.trips ? tripsData.trips.map((trip) => {
        return (
            <TripCard
                key={trip.id}
                trip={trip}
            />
        );
    }) : (<p>Carregando...</p>)

    return (
        <>
            <Header />
            <hr />
            <main>
                <section>
                    <h2>Inscreva-se numa nova viagem!</h2>
                    <form onSubmit={onClickSend}>
                        <label htmlFor="trip">Viagem: </label>
                        <select 
                            id={"trip"}
                            defaultValue={""}
                            onChange={onChangeTrip}
                        >
                            <option 
                                value={""} 
                                disabled
                            >Escolha uma Viagem...</option>
                            {tripsOptions}
                        </select>
                        <label htmlFor={"name"}> Nome: </label>
                        <input
                            id={"name"}
                            name={"name"}
                            value={form.name}
                            onChange={onChange}
                        />
                        <label htmlFor={"age"}> Idade: </label>
                        <input
                            id={"age"}
                            name={"age"}
                            type={"number"}
                            value={form.age}
                            onChange={onChange}
                            min={18}
                        />
                        <label htmlFor={"application-text"}> Texto de Candidatura: </label>
                        <input
                            id={"application-text"}
                            name={"applicationText"}
                            value={form.applicationText}
                            onChange={onChange}
                        />
                        <br />
                        <label htmlFor={"profession"}> Profissão: </label>
                        <input
                            id={"profession"}
                            name={"profession"}
                            value={form.profession}
                            onChange={onChange}
                        />
                        <label htmlFor={"country"}> País de origem: </label>
                        <select
                            id={"country"}
                            name={"country"}
                            value={form.country}
                            onChange={onChange}
                        >
                            <option 
                                value={""} 
                                disabled
                            >Escolha um País...</option>
                            */}
                            {countries.map((country) => {
                                return <option value={country} key={country}>{country}</option>
                            })}
                        </select>
                        <button type={"submit"}>Enviar Candidatura</button>
                    </form>
                </section>
                <hr />
                <section>
                    <h2>Lista de Viagens</h2>
                    {tripsList}
                </section>
            </main>
        </>
    );
};

export default HomePage;