import React, { useState, useEffect } from "react";

const BroadcastChannelExample: React.FC = () => {
  const [message, setMessage] = useState("");
  const channel = new BroadcastChannel("screen-controller");

  useEffect(() => {
    // Listen for messages from other screens
    channel.onmessage = (event) => {
      const command = event.data;
      console.log("Received command:", command);
      handleControlCommand(command);
    };

    return () => channel.close();
  }, [channel]);

  const handleControlCommand = (command: string) => {
    // Handle the control logic here
    console.log(`Handling control: ${command}`);
  };

  const sendMessage = () => {
    channel.postMessage(message);
    handleControlCommand(message);
    setMessage("");
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter command"
        className="border p-2 mr-2"
      />
      <button
        onClick={sendMessage}
        className="bg-blue-500 text-white px-4 py-2"
      >
        Send Command
      </button>
    </div>
  );
};

export default BroadcastChannelExample;
