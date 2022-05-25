function TripCard(props) {
    const {id, name, description, planet, durationInDays, date} = props.trip;
    
    const token = localStorage.getItem('token');

    return(
        <>
            <p><b>Nome:</b> {name}</p>
            <p><b>Descrição:</b> {description}</p>
            <p><b>Planeta:</b> {planet}</p>
            <p><b>Duração:</b> {durationInDays}</p>
            <p><b>Data:</b> {date}</p>

            {token && (
                <>
                    <button>Exibir detalhes</button>
                    <button onClick={() => props.removeTrip(id)}>Excluir viagem</button>
                </>
            )}
            <hr />
        </>
    );
};

export default TripCard;