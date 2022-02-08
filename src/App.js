import React from "react";
import "./App.css";
import List from "./List";
import axios from "axios";
import fetch from "isomorphic-fetch";

import { useEffect, useState } from "react";
import useServerEffect from "./useServerEffect";

function App(props) {
  // Use effect won't work since already mounted
  useEffect(() => {
    console.log("Use effect");
    fetch("http://localhost:5000/list")
      .then((res) => res.ok && res.json())
      .then((data) => console.log(data))
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // const [items, setItems] = useState([]);
  const [items] = useServerEffect(
    [],
    "items",
    () => {
      return fetch("http://localhost:5000/list").then((res) => res.json());

      return axios.get("http://localhost:5000/list").then(({ data }) => {
        console.log(data.list);
        return data.list;
        // return data.list;
      });
    },
    []
  );

  return (
    <div className="App">
      <List items={props.items || ["NONE"]} redirect={"/"} />
      <List items={items.list || ["NONE"]} redirect={"/app"} />
    </div>
  );
}

export default App;
