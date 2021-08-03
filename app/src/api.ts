export type User = {
  id: string;
  name: string;
  avatar: string;
};

export type Kvitter = {
  id: string;
  user: User;
  timestamp: string;
  content: string;
};

const BASE_URL: string =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:3000";

export async function fetchKvitter(): Promise<{ kvitter: Kvitter[] }> {
  const url = BASE_URL + "/kvitter/";
  console.log(url);
  fetch(url).then((r) => {
    console.log(r);
  });
  console.log("Hämtar kvitter 🎶");

  const user1 = { id: "123", name: "Sparv", avatar: "" };
  const user2 = { id: "234", name: "Mes", avatar: "" };
  const user3 = { id: "456", name: "Sparven89", avatar: "" };
  return Promise.resolve({
    kvitter: [
      {
        id: "678",
        user: user1,
        timestamp: "2021-08-03T10:32:06Z",
        content: "Kvitt kvitt, kvitt-kvitt kvitt-kvitt.",
      },
      {
        id: "567",
        user: user2,
        timestamp: "2021-08-03T10:32:06Z",
        content: "Kvitt kvitt!",
      },
      {
        id: "456",
        user: user1,
        timestamp: "2021-08-03T10:32:06Z",
        content: "Kvitt kvitt!",
      },
      {
        id: "123",
        user: user3,
        timestamp: "2021-08-03T10:32:06Z",
        content: "Kvitt kvitt, kvidevitt. Kvitt-kvitt kvitt?",
      },
    ],
  });
}

export async function postKvitt(data: any) {
  const url = BASE_URL + "/kvitter/";
  console.log(data);
  return fetch(url, { method: "POST", body: data }).then((r) => {
    console.log(r);
  });
}
