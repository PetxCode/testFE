import { useNavigate, useParams } from "react-router-dom";
import useSocket from "./hooks";
import { useEffect, useState } from "react";
import data from "./data.json";

const Start = () => {
  const { id } = useParams();

  const socket = useSocket();

  const [messages, setMessages] = useState<string>();
  const [input, setInput] = useState<string>("");

  const [page, setPage] = useState<number>(1); // Assuming "Next" moves between pages

  const move = Math.round(Math.random() * data.length);
  const navigate = useNavigate();

  //   useEffect(() => {
  //     if (!socket) return;

  //     // Listen for messages from the server
  //     socket.on("message", (message: string) => {
  //       setMessages(message);
  //       // setMessages((prev) => [...prev, message]);
  //     });

  //     socket.on("next", () => {
  //       setPage((prevPage) => prevPage + 1);
  //     });

  //     return () => {
  //       socket.off("next");
  //       socket.off("message");
  //     };
  //   }, [socket]);

  const sendMessage = () => {
    if (socket) {
      socket.emit("message", move);
      setInput("");
    }
  };

  useEffect(() => {
    if (!socket) return;

    socket.on("moveNext", () => {
      console.log("Moving to next page (triggered by another user)");
      setPage((prev) => prev + 1);
    });

    return () => {
      socket.off("moveNext");
    };
  }, [socket]);

  const handleNext = () => {
    if (socket) {
      // Emit "next" event to the server
      setPage((prev) => prev + 1);
      socket.emit("next", `This is Page:${page}`);
      // Move current user's page
    }
  };

  return (
    <div className="justify-center flex flex-col items-center h-screen">
      <div>
        <h1>Page {page}</h1>
        <button onClick={handleNext}>Next</button>
      </div>

      <div className="border rounded-md m-4 p-4">
        <h1 className="my-4 text-[20px]">Socket.io with React & TypeScript</h1>
        <div>
          {/* {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))} */}

          {messages}
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
      <main className="border rounded-md flex flex-col h-[300px] w-[800px]">
        <p className="text-[20px] my-5 text-center uppercase ">
          Question {page}
        </p>

        <div className="text-center text-[18px] mt-8 capitalize">
          {data[page - 1].title}
        </div>

        <div className="flex-1" />

        <div className="flex justify-center">
          <button
            className="bg-red-500 rounded-md text-white mb-5 px-8 py-2"
            onClick={handleNext}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default Start;
