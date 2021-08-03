type User = {
  id: string;
  name: string;
  avatar: string;
};

type Kvitter = {
  id: string;
  user: User;
  timestamp: string;
  content: string;
};

export function fetchKvitter(): { kvitter: Kvitter[] } {
  fetch("http://localhost:3000/kvitter/").then((r) => {
    console.log(r);
  });
  console.log("Hämtar kvitter 🎶");

  const user1 = { id: "123", name: "Sparv", avatar: "" };
  const user2 = { id: "234", name: "Mes", avatar: "" };
  const user3 = { id: "456", name: "Sparven89", avatar: "" };
  return {
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
  };
}
