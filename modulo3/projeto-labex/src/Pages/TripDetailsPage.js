import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useRequestData from '../hooks/useRequestData';
import { goToAdminPage, goToHomePage } from "../routes/coordinator";

function TripDetailsPage() {
    const navigate = useNavigate();

    const params = useParams();

    const [detailsData] = useRequestData(`trip/${params.tripId}`, {});

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            goToHomePage(navigate);
        };
    }, []);

    const candidatesList = detailsData.trip && detailsData.trip.candidates.map((candidate) => {
        return (
            <div key={candidate.id}>
                <span><b>Nome:</b> {candidate.name} - </span>
                <span><b>Profissão:</b> {candidate.profession} - </span>
                <span><b>Idade:</b> {candidate.age} - </span>
                <span><b>País:</b> {candidate.country} - </span>
                <span><b>Texto de Candidatura:</b> {candidate.applicationText} </span>
                <button>Aprovar</button>
                <button>Reprovar</button>
            </div>
        )
    });

    return (
        <>
            <button onClick={() => goToAdminPage(navigate)}>Sair de detalhes</button>
            <h1>Viagem: {detailsData.trip && detailsData.trip.name}</h1>
            <hr />
            <h3>Lista de Candidatos</h3>
            {candidatesList}
            <hr />
            <h3>Lista de Aprovados</h3>
        </>
    );
};

export default TripDetailsPage;