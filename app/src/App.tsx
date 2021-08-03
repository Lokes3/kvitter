import React, { useState, useEffect } from "react";
import { postKvitt, fetchKvitter, Kvitter } from "./api";
import "./App.css";
import logo from "./images/kvitter-logo.png";

function App() {
  const [data, setData] = useState<Kvitter[] | null>(null);
  useEffect(() => {
    fetchKvitter().then((data: any) => {
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
          <div className="bg-blue-100 p-2 flex flex-col">
            <input
              type="text"
              name="name"
              className="mr-auto mb-1 rounded p-1"
              placeholder="Namn"
              onInput={(evt) => {
                setName(evt.currentTarget.value);
              }}
            />
            <textarea
              className="w-full rounded p-1"
              name="kvitt"
              placeholder="Vad händer?"
              onInput={(evt) => {
                setContent(evt.currentTarget.value);
              }}
            />
            <div className="flex items-center mt-2">
              <div className="ml-auto text-sm font-light text-gray-500 mr-2">140</div>
              <button className="bg-blue-400 rounded p-2 text-white" type="submit">
                Kvittra
              </button>
            </div>
          </div>
        </form>
        {error && <div>Något gick fel!</div>}

        <div>
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

  return (
    <div className="text-left">
      {data.map((item, i) => {
        return (
          <div className="p-2 mb-2 border-b-2 border-opacity-75 flex" key={i}>
            <div className="w-12">img</div>
            <div className="flex-grow">
            <div className="flex text-sm">
              <div className="font-bold">{item.user}</div>
            <div className="font-thin ml-auto">3d</div>
            </div>
            <div>{item.message}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
