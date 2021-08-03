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
        Kvitt kvitt kvitt kvivitt kvitt kvitt! D: - Sparv
        <br />
        Kvitt kvikvitt kvivivitt, kvitt kvitt ^^ - Blåmes
        <br />
        Kvitt 🐥- Höna
        <br />
        KRAAAAAAA! - Skata
      </div>
    </div>
  );
}

export default App;
