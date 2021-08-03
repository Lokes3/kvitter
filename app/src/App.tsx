import React, { useState, useEffect } from "react";
import { postKvitt, fetchKvitter, Kvitter } from "./api";
import "./App.css";
import logo from "./images/kvitter-logo.png";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

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
  const [characterCounter, setCharacterCounter] = useState(140);

  async function submit() {
    try {
      await postKvitt({
        user: name,
        message: content,
      });
      window.location.reload();
    } catch (e) {
      setError(true);
    }
  }

  return (
    <div className="App">
      <header className="px-2">
        <div className="logo py-1 ml-2">
          <img src={logo} alt="Definitely not like Twitter" />
        </div>
      </header>
      <div className="body">
        <form
          action="/"
          method="POST"
          onSubmit={(evt) => {
            evt.preventDefault();
            submit();
          }}
        >
          <div className="bg-blue-100 p-4 flex flex-col space-y-2">
            <div className="relative">
              <textarea
                required
                className="w-full rounded p-2"
                name="kvitt"
                placeholder="Vad händer?"
                maxLength={140}
                onKeyDown={(evt) => {
                  if (evt.key === "Enter" && (evt.ctrlKey || evt.metaKey)) {
                    submit();
                  }
                }}
                onInput={(evt) => {
                  const value = evt.currentTarget.value;
                  setContent(value);
                  setCharacterCounter(140 - value.length);
                }}
              />
              <div className="absolute right-2 bottom-3 text-sm font-light text-gray-500">
                {characterCounter}
              </div>
            </div>
            <input
              required
              type="text"
              name="name"
              className="mb-1 rounded p-2"
              placeholder="Namn"
              onInput={(evt) => {
                setName(evt.currentTarget.value);
              }}
              onKeyDown={(evt) => {
                if (evt.key === "Enter" && (evt.ctrlKey || evt.metaKey)) {
                  submit();
                }
              }}
            />
            <div className="flex ml-auto items-center mt-2 space-x-2">
              <button
                className="rounded p-2 mt-1 text-white"
                style={{ backgroundColor: "#409dd8" }}
                type="submit"
              >
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
  const userNumber = user
    .split("")
    .reduce((sum, c) => sum + c.charCodeAt(0), 0);
  const colors = ["blue", "red", "yellow", "purple", "pink"];
  const intensity = ["500"];
  const direction = ["tr", "tl", "bl", "br"];

  return `bg-gradient-to-${direction[userNumber % direction.length]} from-${
    colors[userNumber % colors.length]
  }-${intensity[userNumber % intensity.length]} to-${
    colors[(userNumber % 7) % colors.length]
  }-${intensity[(userNumber % 7) % intensity.length]}`;
};

function ListView(props: { data: Kvitter[] | null }) {
  const { data } = props;
  if (!data) {
    return null;
  }

  return (
    <div className="text-left mx-2 mt-2">
      {data.map((item, i) => {
        return (
          <div className="p-2 mb-2 border-b-2 border-opacity-75 flex" key={i}>
            <div className="w-12 flex-shrink-0">
              <div
                className={
                  "rounded-full w-10 h-10 flex items-center justify-center text-white " +
                  getGradientString(item.user)
                }
              >
                {item.user[0]}
              </div>
            </div>
            <div className="flex-grow">
              <div className="flex text-sm">
                <div className="font-bold">{item.user}</div>
                <div className="font-thin ml-auto">
                  {dayjs(item.created_at).fromNow()}
                </div>
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
