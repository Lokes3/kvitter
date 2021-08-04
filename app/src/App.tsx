import "./App.css";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import React, { useEffect, useState } from "react";

import { fetchKvitter, Kvitter, postKvitt } from "./api";
import logo from "./images/kvitter-logo.png";
import { classNames, pick } from "./utils";
import { useInterval } from "./hooks";

dayjs.extend(relativeTime);

export default function App() {
  const [isFetching, setIsFetching] = useState(false);
  const [data, setData] = useState<Kvitter[] | null>(null);
  const [error, setError] = useState(false);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  useInterval(() => {
    if (!isFetching) {
      fetchData();
    }
  }, 15000);

  function fetchData() {
    setIsFetching(true);
    fetchKvitter().then((data: any) => {
      setIsFetching(false);
      setData(data);
    });
  }

  async function submit() {
    try {
      await postKvitt({
        user: name,
        message: message,
      });
      window.location.reload();
    } catch (e) {
      setError(true);
    }
  }

  const onInputSet = (func: any) => (evt: any) => func(evt.currentTarget.value);
  const onEnterSubmit = (evt: any) => {
    if (evt.key === "Enter" && (evt.ctrlKey || evt.metaKey)) {
      submit();
    }
  };

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
            <MaxLengthTextarea
              required
              className="w-full rounded p-2"
              name="kvitt"
              placeholder="Vad händer?"
              maxLength={140}
              onKeyDown={onEnterSubmit}
              onInput={onInputSet(setMessage)}
            />
            <input
              required
              type="text"
              name="name"
              className="mb-1 rounded p-2"
              placeholder="Namn"
              onKeyDown={onEnterSubmit}
              onInput={onInputSet(setName)}
            />
            <div className="flex ml-auto items-center mt-2 space-x-2">
              <button
                className="rounded-md p-2 px-4 mt-1 text-white"
                style={{ backgroundColor: "#409dd8" }}
                type="submit"
              >
                Kvittra
              </button>
            </div>
            {error && <div>Något gick fel!</div>}
          </div>
        </form>

        <div>
          <ListView data={data} />
        </div>
      </div>
      <footer></footer>
    </div>
  );
}

function MaxLengthTextarea(props: any) {
  const maxLength = props.maxLength;
  const [counter, setCounter] = useState(maxLength);
  return (
    <div className="relative">
      <textarea
        {...props}
        maxLength={maxLength}
        onInput={(evt) => {
          props.onInput?.(evt);
          setCounter(maxLength - evt.currentTarget.value.length);
        }}
      />
      <div
        className={classNames(
          "absolute right-2 bottom-3 text-sm font-light text-gray-500",
          counter <= 10 && "text-red-500 font-bold",
          10 < counter && counter <= 20 && "text-yellow-500",
        )}
      >
        {counter}
      </div>
    </div>
  );
}

const getGradientString = (user: string) => {
  const n = user.split("").reduce((sum, c) => sum + c.charCodeAt(0), 0);
  const colors = ["blue", "red", "yellow", "purple", "pink"];
  const intensity = ["500", "700"];
  const direction = ["tr", "tl", "bl", "br"];

  const gradient = `bg-gradient-to-${pick(direction, n)}`;
  const cFrom = `from-${pick(colors, n)}-${pick(intensity, n)}`;
  const cTo = `to-${pick(colors, n % 7)}-${pick(intensity, n % 7)}`;
  return `${gradient} ${cFrom} ${cTo}`;
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
                className={classNames(
                  "rounded-full w-10 h-10 flex items-center justify-center text-white",
                  getGradientString(item.user),
                )}
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
