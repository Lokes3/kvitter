import React, { useState, useEffect } from "react";
import { postKvitt, fetchKvitter, Kvitter } from "./api";
import "./App.css";
import logo from "./images/kvitter-logo.png";

function App() {
  const [data, setData] = useState<Kvitter[] | null>(null);
  useEffect(() => {
    fetchKvitter().then((data: any) => {
      console.log("Fick data");
      console.log(data);
      setData(data);
    });
  }, []);

  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [content, setContent] = useState("");

  return (
    <div className="App">
      <header>
        <div className="logo">
          <img src={logo} alt="Definitely not like Twitter" />
        </div>
      </header>
      <div className="body">
        <form
          action="/"
          method="POST"
          onSubmit={async (evt) => {
            evt.preventDefault();
            try {
              await postKvitt({
                user: name,
                message: content,
              });
              window.location.reload();
            } catch (e) {
              setError(true);
            }
          }}
        >
          <textarea
            className="w-full"
            name="kvitt"
            onInput={(evt) => {
              setContent(evt.currentTarget.value);
            }}
          />
          <input
            type="text"
            name="name"
            onInput={(evt) => {
              setName(evt.currentTarget.value);
            }}
          />
          <div>
            <button className="w-full" type="submit">
              Skicka
            </button>
          </div>
        </form>
        {error && <div>Något gick fel!</div>}

        <div className="feed">
          <ListView data={data} />
        </div>
      </div>
      <footer></footer>
    </div>
  );
}

function ListView(props: { data: Kvitter[] | null }) {
  const { data } = props;
  if (!data) {
    return null;
  }
  console.log(data);
  return (
    <ul>
      {data.map((item, i) => {
        return (
          <li key={i}>
            <div>{item.user}</div>
            <div>{item.message}</div>
          </li>
        );
      })}
    </ul>
  );
}

export default App;
