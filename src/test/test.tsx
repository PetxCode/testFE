import { FC, useState } from "react";
import { MdFavorite, MdFavoriteBorder, MdPlayCircle } from "react-icons/md";

interface iProps {
  id: number;
  title: string;
  description: string;
  state: boolean;
}

const App: FC = () => {
  const [name, setName] = useState<string>("");
  const [toggle, setToggle] = useState<boolean>(false);
  // let x: Array<number> = [0];

  let [data, setData] = useState<Array<iProps>>([
    {
      id: 1,
      title: "First Video",
      description: "First video description",
      state: true,
    },
    {
      id: 2,
      title: "Second Video",
      description: "Second video description",
      state: false,
    },
    {
      id: 3,
      title: "Third Video",
      description: "Third video description",
      state: false,
    },
  ]);

  const changeState = (id: number) => {
    let stateData: any = data?.find((el: iProps) => {
      return el.id === id;
    });
    stateData.state = !stateData.state;
    setData([...data]);
  };

  return (
    <div className="w-full h-screen bg-neutral-800 text-white flex justify-center items-center ">
      <div className="border rounded-md w-[800px] min-h-[400px] p-[20px]">
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setName(e.target.value)
          }
          className="border rounded-md w-[300px] h-[45px] bg-transparent p-2"
        />
        <button
          className="ml-3 p-2 bg-red-500 px-8 rounded-md"
          onClick={() => {
            setToggle(true);
            let timer = setTimeout(() => {
              setToggle(false);
              clearTimeout(timer);
            }, 10000);
          }}
        >
          Submit
        </button>
        <br />
        <br />
        <br />
        Welcome {toggle && name}
        <br />
        <br />
        <br />
        {data.map((el: iProps) => (
          <main
            onClick={() => {
              // console.log(el?.id);
            }}
            key={el.id}
            className="w-full flex justify-between items-center mb-2"
          >
            <div className="flex items-center gap-5">
              <div className="w-[220px] h-[130px] border rounded-md bg-green-500 items-center flex justify-center ">
                <MdPlayCircle size={60} />
              </div>
              <div>
                <p>{el.title}</p>
                <p>{el.description}</p>
              </div>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => {
                changeState(el.id);
                console.log("data clicked: ", el);
              }}
            >
              {el.state ? (
                <MdFavorite size={30} className="text-red-500" />
              ) : (
                <MdFavoriteBorder size={30} />
              )}
            </div>
          </main>
        ))}
      </div>
    </div>
  );
};

export default App;
