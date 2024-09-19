import React, { FC } from "react";
import { v4 as uuid } from "uuid";

const App = () => {
  let myData = {
    tasked: {
      id: uuid(),
      data: [
        { id: uuid(), title: "Task 1" },
        { id: uuid(), title: "Task 2" },
        { id: uuid(), title: "Task 3" },
      ],
    },
    started: {
      id: uuid(),
      data: [{ id: uuid(), title: "Task 4" }],
    },
    done: {
      id: uuid(),
      data: [{ id: uuid(), title: "Task 5" }],
    },
  };

  return (
    <div>
      <h1 className="text-center mt-10 text-[28px] font-semibold">
        Set 10 NEXTGen Conference
      </h1>

      <div className="flex w-full justify-center bg-red-50">
        <div className="w-full flex-col item-center ">
          <main className="border rounded-md mt-5 min-h-[70px] m-2 flex w-[90%] p-2 gap-2 bg-slate-300">
            {Object.keys(myData).map((el: string, i: number) => (
              <div key={i} className="flex-1">
                {el}
              </div>
            ))}
          </main>
          <main className="flex border rounded-md mt-5 min-h-[70px] bg-green-100 p-2 gap-2 w-[90%]">
            {Object.values(myData).map((el: any, i: number) => {
              return (
                <div key={i} className="flex-1 flex-col ">
                  {el.data?.map((el: any) => (
                    <Card key={el.id} el={el} />
                  ))}
                </div>
              );
            })}
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;

interface iCard {
  id: string;
  title: string;
}

interface iEL {
  el: iCard;
}
const Card: FC<iEL> = ({ el }) => {
  return (
    <div className=" border rounded-md my-2 bg-white h-[160px] flex justify-center items-center">
      {el.title}
    </div>
  );
};
