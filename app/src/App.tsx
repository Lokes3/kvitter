import React, { useState, useEffect } from "react";
import { postKvitt, fetchKvitter, Kvitter } from "./api";
import "./App.css";

function App() {
  const [data, setData] = useState<Kvitter[] | null>(null);
  useEffect(() => {
    fetchKvitter().then((data) => {
      setData(data.kvitter);
    });
  }, []);
  console.log(data);

  return (
    <div className="App container">
      <form
        action="/"
        method="POST"
        onSubmit={(evt) => {
          evt.preventDefault()
          console.log(evt);
          const data = new FormData(evt.currentTarget)
          console.log(data)
          postKvitt(data)
        }}
      >
        <textarea className="w-full" name="kvitt" />
        <input type="text" name="name" />
        <div>
          <button className="w-full" type="submit">Skicka</button>
        </div>
      </form>

      <div className="feed">
        <ListView data={data} />
      </div>
    </div>
  );
}

function ListView(props: { data: Kvitter[] | null }) {
  const { data } = props;
  if (!data) {
    return null;
  }
  return (
    <div>
      {data.map((item) => {
        return (
          <div key={item.id}>
            <div>{item.user.name}</div>
            <div>{item.content}</div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
