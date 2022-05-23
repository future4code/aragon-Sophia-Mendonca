import { BrowserRouter, Routes, Route } from "react-router-dom"
import HomePage from '../Pages/HomePage'
import AdminPage from '../Pages/AdminPage'
import ErrorPage from "../Pages/ErrorPage"

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<HomePage />} />
                <Route path={"/admin"} element={<AdminPage />} />
                <Route path={"*"} element={<ErrorPage />} />   
            </Routes>
        </BrowserRouter>
    )
}

export default Router;

