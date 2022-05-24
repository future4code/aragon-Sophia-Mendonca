import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { goToAdminPage } from '../Routes/coordinator';

function HomePage() {
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("token")) {
            goToAdminPage(navigate);
        };
    }, []);

    return (
        <>
            <Header />
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