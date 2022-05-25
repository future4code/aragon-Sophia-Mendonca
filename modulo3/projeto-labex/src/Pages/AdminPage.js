import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useRequestData from '../hooks/useRequestData'
import Header from '../components/Header'
import TripCard from '../components/TripCard'
import { goToHomePage } from '../Routes/coordinator'
import { deleteTrip } from '../services/request'

function AdminPage() {
    const navigate = useNavigate();

    const [tripsData, getTripsData] = useRequestData("trips", {});

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            goToHomePage(navigate);
        };
    }, []);

    const removeTrip = (tripId) => {
        if (window.confirm("Tem certeza que deseja remover esta viagem?")) {
            deleteTrip(tripId, getTripsData); 
        };
    };

    const tripsList = tripsData.trips ? tripsData.trips.map((trip) => {
        return (
            <TripCard
                key={trip.id}
                trip={trip}
                removeTrip={removeTrip}
            />
        );
    }) : (<p>Carregando...</p>)

    return (
        <>
            {}
        
            <Header />
            <hr />
            <main>
                <section>
                    <h2>Crie uma nova viagem</h2>
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

export default AdminPage;