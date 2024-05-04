import * as React from "react";

import { IUser, IUsersResponse } from "./types";

const getUsers = async (name: string): Promise<IUsersResponse | null> => {
  try {
    const res = await fetch(
      `https://dummyjson.com/users/search?q=${encodeURIComponent(name)}`
    );

    if (!res.ok) throw Error(res.statusText, { cause: res.status });
    return (await res.json()) as IUsersResponse;
  } catch (error) {
    console.error({ error });
    return null;
  }
};

const App = () => {
  const [name, setName] = React.useState<string | null>(null);
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [isTodosLoading, setIsTodosLoading] = React.useState(false);
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  React.useEffect(() => {
    if (name) {
      timeoutRef.current = setTimeout(() => {
        setIsTodosLoading(true);

        getUsers(name)
          .then((value) => {
            const users = value?.users;

            if (users) {
              setUsers(users);
            } else {
              setUsers([]);
            }
          })
          .finally(() => setIsTodosLoading(false));
      }, 1000);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [name]);

  const handleChangeText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = event;

    setName(value);
  };

  return (
    <div className="app">
      <h1>Hello from react with typescript</h1>
      <input
        type="text"
        placeholder="Search name"
        value={name || ""}
        onChange={handleChangeText}
      />
      <pre>
        {!isTodosLoading ? (
          JSON.stringify(users, undefined, 4)
        ) : (
          <div>Loading</div>
        )}
      </pre>
    </div>
  );
};

export default App;
