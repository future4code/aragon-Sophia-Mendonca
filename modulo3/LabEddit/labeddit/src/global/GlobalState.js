import { useState } from "react";
import axios from "axios";
import GlobalStateContext from "./GlobalStateContext";
import { BASE_URL } from "../constants/urls";

const GlobalState = (props) => {
  const [posts, setPosts] = useState([]);

  const getPosts = () => {
    const header = {
      headers: {
        authorization: localStorage.getItem("token")
      }
    };

    axios
      .get(`${BASE_URL}/posts?page=1&size=10`, header)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const states = { posts };
  const setters = { setPosts };
  const getters = { getPosts };

  return (
    <GlobalStateContext.Provider value={{ states, setters, getters }}>
      {props.children}
    </GlobalStateContext.Provider>
  );
};

export default GlobalState;