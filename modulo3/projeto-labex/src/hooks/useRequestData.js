import { useState, useEffect } from "react"
import { BASE_URL, API_CLIENT } from '../components/constants/urls'
import axios from "axios"

const useRequestData = (path, initialState) => {
    const [data, setData] = useState(initialState);

    const getData = () => {
        const header = {
            headers: {
                auth: localStorage.getItem("token")
            }
        };

        axios.get(`${BASE_URL}/${API_CLIENT}/${path}`, header)
            .then((response) => {
                setData(response.data);
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    useEffect(() => {
        getData();
    }, [path]);

    return [data, getData];
};

export default useRequestData;