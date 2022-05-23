import Header from '../components/Header';

function AdminPage() {
    return (
        <>

            <Header
                actualPage={"admin-page"}
            />
            <hr />
            <main>
                <section>
                    <h2>Crie uma nova viagem</h2>
                </section>
                <hr />
                <section>
                    <h2>Lista de Viagens</h2>
                </section>
            </main>
        </>
    );
};

export default AdminPage;