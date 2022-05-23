import Header from '../components/Header';


function HomePage() {
    return (
        <>
            <Header
                actualPage={"home-page"}
            />
            <hr />
            <main>
                <section>
                    <h2>Inscreva-se numa nova viagem!</h2>
                </section>
                <hr />
                <section>
                    <h2>Lista de Viagens</h2>
                </section>
            </main>
        </>
    );
};

export default HomePage;