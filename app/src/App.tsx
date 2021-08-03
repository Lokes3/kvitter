import React, { useState, useEffect } from "react";
import { postKvitt, fetchKvitter, Kvitter } from "./api";
import "./App.css";
import logo from "./images/kvitter-logo.png";
import dayjs from "dayjs"
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

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
  const [characterCounter, setCharacterCounter] = useState(140)

  return (
    <div className="App">
      <header>
        <div className="logo ml-2">
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
              maxLength={140}
              onInput={(evt) => {
                setContent(evt.currentTarget.value);
                setCharacterCounter(140 - evt.currentTarget.value.length)
              }}
            />
            <div className="flex items-center mt-2">
              <div className="ml-auto text-sm font-light text-gray-500 mr-2">{characterCounter}</div>
              <button className="rounded p-2 text-white" style={{backgroundColor: '#409dd8'}} type="submit">
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

const getGradientString = (user: string) => {
  const userNumber = user.split("").reduce((sum, c) => sum + c.charCodeAt(0), 0)
  const colors = ["blue", "red", "yellow", "purple", "pink"]
  const intensity = ["500"]
  const direction = ["tr", "tl", "bl", "br"]

  return `bg-gradient-to-${direction[userNumber % direction.length]} from-${colors[userNumber % colors.length]}-${intensity[userNumber % intensity.length]} to-${colors[userNumber % 7 % colors.length]}-${intensity[userNumber % 7 % intensity.length]}`
}

function ListView(props: { data: Kvitter[] | null }) {
  const { data } = props;
  if (!data) {
    return null;
  }

  return (
    <div className="text-left mt-4">
      {data.map((item, i) => {
        return (
          <div className="p-2 mb-2 border-b-2 border-opacity-75 flex" key={i}>
            <div className="w-12 flex-shrink-0">
              <div className={"rounded-full w-10 h-10 flex items-center justify-center text-white " + getGradientString(item.user)}>{item.user[0]}</div>
            </div>
            <div className="flex-grow">
            <div className="flex text-sm">
              <div className="font-bold">{item.user}</div>
            <div className="font-thin ml-auto">{dayjs(item.created_at).fromNow()}</div>
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
