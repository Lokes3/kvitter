import React, { useState, useEffect } from "react";
import { fetchKvitter, Kvitter } from "./api";
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
    <div className="App">
      <form action="/">
        <label>Kvitt: </label>
        <input type="text" id="kvitt" name="kvitt" />
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
          <div>
            <div>{item.user.name}</div>
            <div>{item.content}</div>
          </div>
        );
      })}
    </div>
  );
}

export default App;
