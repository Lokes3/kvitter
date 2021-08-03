export type Kvitter = {
  user: string;
  created_at: string;
  message: string;
};

const BASE_URL: string =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

const user1 = { name: "Sparv", avatar: "" };
const user2 = { name: "Mes", avatar: "" };
const user3 = { name: "Sparven89", avatar: "" };
const fakeData = {
  kvitter: [
    {
      user: user1.name,
      created_at: "2021-08-03T10:32:06Z",
      message: "Kvitt kvitt, kvitt-kvitt kvitt-kvitt.",
    },
    {
      user: user2.name,
      created_at: "2021-08-03T10:32:06Z",
      message: "Kvitt kvitt!",
    },
    {
      user: user1.name,
      created_at: "2021-08-03T10:32:06Z",
      message: "Kvitt kvitt!",
    },
    {
      user: user3.name,
      created_at: "2021-08-03T10:32:06Z",
      message: "Kvitt kvitt, kvidevitt. Kvitt-kvitt kvitt?",
    },
    {
      user: user3.name,
      created_at: "2021-08-03T10:32:06Z",
      message: "Kvitt kvitt, kvidevitt. Kvitt-kvitt kvitt? Kvitter kvitt tweet piip krax krax tweet!",
    },
  ],
};

export async function fetchKvitter(): Promise<Kvitter[]> {
  const url = BASE_URL + "/kvitter/";
  console.log("Hämtar kvitter 🎶");
  console.log(url);
  return fetch(url)
    .then((r) => {
      console.log(r);
      return r.json();
    })
    .then((d) => {
      console.log("Decodade");
      console.log(d);
      return d.kvitter;
    })
    .catch((e) => {
      console.log(e);
      console.log("Returnerar fejkdata");
      return fakeData.kvitter;
    });
}

export async function postKvitt(data: any) {
  const url = BASE_URL + "/kvitter/";
  console.log(data);
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  }).then((r) => {
    console.log(r);
  });
}
