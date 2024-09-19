import { FC, useEffect, useState } from "react";
import { MdAddBox, MdClose } from "react-icons/md";
import { v4 as uuid } from "uuid";
import useSocket from "./hooks";
const App = () => {
  const [toggle, setToggle] = useState<boolean>(false);
  const [text, setText] = useState<string>("");

  let [db, setDB] = useState({
    task: {
      id: uuid(),
      data: [
        { id: uuid(), title: "task1" },
        { id: uuid(), title: "task2" },
        { id: uuid(), title: "task3" },
        { id: uuid(), title: "task4" },
      ],
    },
    started: {
      id: uuid(),
      data: [{ id: uuid(), title: "task5" }],
    },
    done: {
      id: uuid(),
      data: [
        { id: uuid(), title: "task6" },
        { id: uuid(), title: "task7" },
      ],
    },
  });

  const addTask = (str: string) => {
    db.task.data.push({ id: uuid(), title: str });
    setDB({ ...db });

    setToggle(false);
    setText("");
  };

  const socket = useSocket();

  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");

  useEffect(() => {
    if (!socket) return;

    // Listen for messages from the server
    socket.on("message", (message: string) => {
      setMessages((prev) => [...prev, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  const sendMessage = () => {
    if (socket && input) {
      socket.emit("message", input);
      setInput("");
    }
  };

  return (
    <div className="">
      <div className="border rounded-md m-4 p-4">
        <h1 className="my-4 text-[20px]">Socket.io with React & TypeScript</h1>
        <div>
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
        <input
          className="border rounded-md p-2 m-2"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message"
        />
        <button
          className="text-white bg-red-500 px-8 py-2 rounded-md"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
      <h1 className="text-center mt-20 text-[30px] uppercase font-semibold mb-10">
        Simple Task Management
      </h1>

      <div className="flex justify-center w-full">
        <main className="w-[1200px] border rounded-md min-h-[400px] m-4 bg-slate-50 shadow-inner">
          {/* Task Title */}

          <div className="bg-slate-100 py-8 px-4 flex items-center gap-5">
            {Object.keys(db)?.map((el: string, i: number) => (
              <p
                key={i}
                className="uppercase font-semibold flex-1 border-r flex items-center justify-between mr-5 "
              >
                {el}
                {el === "task" && (
                  <div
                    className="w-16 h-16 rounded-full hover:bg-red-300 flex items-center justify-center mr-3 text-[30px] duration-300 transition-all cursor-pointer"
                    onClick={() => setToggle(true)}
                  >
                    <MdAddBox />
                  </div>
                )}
              </p>
            ))}
          </div>
          <br />

          {/* main data */}
          <div className="bg-slate-200 h-full px-4  gap-5 shadow-inner flex pt-4">
            {Object.values(db)?.map((el: any, idx: number) => {
              return (
                <div key={idx} className="w-full">
                  {el.data?.map((el: any, i: number) => (
                    <Card key={i} el={el} idx={idx} db={db} setDB={setDB} />
                  ))}
                </div>
              );
            })}
          </div>
        </main>
      </div>

      {toggle && (
        <div className="absolute w-full h-screen top-0 backdrop-blur-md flex justify-center items-center">
          <div className="border rounded-md bg-white p-4 h-[300px] w-[800px]">
            <MdClose
              size={30}
              className="cursor-pointer "
              onClick={() => setToggle(false)}
            />

            <div>
              <br />
              <input
                className="w-[90%] m-4 p-2 border rounded-md outline-none h-[45px] "
                placeholder="Enter yout Tasked"
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                }}
              />

              <br />

              <button
                className="bg-blue-950 text-white px-8 py-2 rounded-md ml-4"
                onClick={() => addTask(text)}
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

interface iCard {
  id: string;
  title: string;
}

interface iProps {
  el: iCard;
  idx: number;
  db: {
    task: {
      id: string;
      data: {
        id: string;
        title: string;
      }[];
    };
    started: {
      id: string;
      data: {
        id: string;
        title: string;
      }[];
    };
    done: {
      id: string;
      data: {
        id: string;
        title: string;
      }[];
    };
  };
  setDB: React.Dispatch<
    React.SetStateAction<{
      task: {
        id: string;
        data: {
          id: string;
          title: string;
        }[];
      };
      started: {
        id: string;
        data: {
          id: string;
          title: string;
        }[];
      };
      done: {
        id: string;
        data: {
          id: string;
          title: string;
        }[];
      };
    }>
  >;
}

const Card: FC<iProps> = ({ el, idx, db, setDB }) => {
  const addToStarted = (data: iCard) => {
    db.task.data = db.task.data.filter((el: iCard) => el.id !== data.id);
    db.started.data.push(data);

    setDB({ ...db });
  };
  const addToDone = (data: iCard) => {
    db.started.data = db.started.data.filter((el: iCard) => el.id !== data.id);
    db.done.data.push(data);

    setDB({ ...db });
  };
  const removeFromQueeu = (data: iCard) => {
    db.done.data = db.done.data.filter((el: iCard) => el.id !== data.id);

    setDB({ ...db });
  };

  return (
    <div className="my-2 rounded-md bg-white flex-1 mr-2 h-[140px] flex justify-center items-center flex-col w-full p-2 pt-5">
      {el.title}

      <div className="flex-1" />
      <div className="w-full flex justify-end ">
        {idx === 0 ? (
          <div
            className="cursor-pointer text-white bg-blue-950 px-8 py-3 rounded-md text-[12px] uppercase"
            onClick={() => {
              addToStarted(el);
            }}
          >
            Move to Started
          </div>
        ) : idx === 1 ? (
          <div
            className="cursor-pointer text-white bg-neutral-900 px-8 py-3 rounded-md text-[12px] uppercase"
            onClick={() => {
              addToDone(el);
            }}
          >
            Move to Done
          </div>
        ) : idx === 2 ? (
          <div
            className="cursor-pointer text-white bg-red-500 px-8 py-3 rounded-md text-[12px] uppercase"
            onClick={() => {
              removeFromQueeu(el);
            }}
          >
            Remove from Queeu
          </div>
        ) : null}
      </div>
    </div>
  );
};
