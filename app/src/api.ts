export type Kvitter = {
  id: string;
  user: string;
  timestamp: string;
  message: string;
};

const BASE_URL: string =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

const user1 = { id: "123", name: "Sparv", avatar: "" };
const user2 = { id: "234", name: "Mes", avatar: "" };
const user3 = { id: "456", name: "Sparven89", avatar: "" };
const fakeData = {
  kvitter: [
    {
      id: "678",
      user: user1.name,
      timestamp: "2021-08-03T10:32:06Z",
      message: "Kvitt kvitt, kvitt-kvitt kvitt-kvitt.",
    },
    {
      id: "567",
      user: user2.name,
      timestamp: "2021-08-03T10:32:06Z",
      message: "Kvitt kvitt!",
    },
    {
      id: "456",
      user: user1.name,
      timestamp: "2021-08-03T10:32:06Z",
      message: "Kvitt kvitt!",
    },
    {
      id: "123",
      user: user3.name,
      timestamp: "2021-08-03T10:32:06Z",
      message: "Kvitt kvitt, kvidevitt. Kvitt-kvitt kvitt?",
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
      return fakeData;
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
