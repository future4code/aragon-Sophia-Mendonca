import { useNavigate } from "react-router-dom"

import { goToAdminPage, goToHomePage } from '../Routes/coordinator'

function Header(props) {
    const navigate = useNavigate();

    const renderHeader = () => {
        switch (props.actualPage) {
            case "home-page":
                return (
                    <button onClick={() => goToAdminPage(navigate)}>Entrar</button>
                );
            case "admin-page":
                return (
                    <button onClick={() => goToHomePage(navigate)}>Logout</button>
                );
            default:
                return;
        };
    };

    return (
        <header>
            <h1>LabeX</h1>
            {renderHeader()}
        </header>
    );
};

export default Header;
