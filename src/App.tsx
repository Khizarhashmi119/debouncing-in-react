import { ChangeEvent, useEffect, useRef, useState } from "react";

const getTodoList = async () => {
  const res = await fetch(
    "https://jsonplaceholder.typicode.com/todos?_limit=10"
  );
  const data = await res.json();
  console.log(data);
};

const App = () => {
  const [text, setText] = useState<string | null>(null);
  const shouldUseEffectRun = useRef(false);

  useEffect(() => {
    if (shouldUseEffectRun.current) {
      let timer: NodeJS.Timeout | null = null;

      shouldUseEffectRun.current = false;
      timer = setTimeout(() => getTodoList(), 1000);

      return () => {
        if (timer) clearTimeout(timer);
      };
    }
  }, [text]);

  const handleChangeText = (e: ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;

    shouldUseEffectRun.current = true;
    setText(value);
  };

  return (
    <div className="app">
      <h1>Hello from react with typescript</h1>
      <input type="text" value={text ?? ""} onChange={handleChangeText} />
    </div>
  );
};

export default App;
