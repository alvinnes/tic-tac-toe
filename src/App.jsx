import { Notebook, Plus, Trash } from "@phosphor-icons/react";
import { useEffect, useState } from "react";

const App = () => {
  const [valueTask, setValueTask] = useState("");
  const [datasTasks, setDataTasks] = useState([]);
  const handleValueTask = (e) => {
    if (e.key == "Enter" && valueTask.trim !== "") {
      insertDatas(valueTask);
    }
  };
  const handleTask = () => {
    if (valueTask.trim !== "") insertDatas(valueTask);
  };

  const insertDatas = (datas) => {
    if (datasTasks.some((task) => task.datas == datas)) {
      alert("name can't same!");
      return false;
    }
    const newDatas = [...datasTasks, { datas, isDone: false }];
    setDataTasks(newDatas);

    localStorage.setItem("tasks", JSON.stringify(newDatas));
    setValueTask("");
  };

  useEffect(() => {
    const storeDatas = JSON.parse(localStorage.getItem("tasks")) || [];
    setDataTasks(storeDatas);
  }, []);

  const handleDeleteAllDatas = () => {
    const message = confirm("Are you rure want to delete all tasks?");
    if (message) {
      setDataTasks([]);
      localStorage.removeItem("tasks");
    }
  };
  return (
    <main className="w-full min-h-screen bg-indigo-100 flex justify-center items-center flex-col">
      <div className="w-11/12 sm:w-auto bg-white p-4 rounded-md shadow-md">
        <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-700">
          <Notebook size={25} />
          To-Do-List-App
        </h2>
        <hr className="w-full text-black mt-6" />
        <div className="w-full sm:w-lg  mt-8 flex items-center gap-2 ">
          <input
            type="text"
            id="task"
            placeholder="save your task here."
            className="w-11/12 p-3.5 text-sm rounded-xl transition-all duration-500 focus:ring-3 focus:ring-indigo-300/30 outline-0 bg-slate-100"
            onKeyDown={handleValueTask}
            value={valueTask}
            onChange={(e) => setValueTask(e.target.value)}
          />
          <button
            className="p-3.5 bg-indigo-500 shadow-md cursor-pointer rounded-xl text-white"
            onClick={handleTask}
          >
            <Plus size={18} weight="bold" />
          </button>
        </div>
        <button
          className={`${
            datasTasks.length > 1 && "inline-flex"
          } p-2.5 bg-indigo-400 shadow-md rounded-md mt-4 text-white hidden font-semibold text-sm cursor-pointer`}
          onClick={handleDeleteAllDatas}
        >
          Delete Task All
        </button>
        <Task datasTasks={datasTasks} setDataTasks={setDataTasks} />
      </div>
    </main>
  );
};

const Task = ({ datasTasks, setDataTasks }) => {
  const handleIsDone = (data) => {
    const doneTask = datasTasks.map((item) =>
      item.datas === data ? { ...item, isDone: !item.isDone } : item
    );
    setDataTasks(doneTask);
    localStorage.setItem("tasks", JSON.stringify(doneTask));
  };

  const handleDeleteTask = (task) => {
    const deletedTask = datasTasks.filter((data) => data.datas !== task);
    const message = confirm("are you sure want to delete this task?");
    if (message) {
      setDataTasks(deletedTask);
      localStorage.setItem("tasks", JSON.stringify(deletedTask));
    }
  };
  return (
    <div className="w-full sm:w-lg  mt-8">
      <ul>
        {datasTasks.map((data, id) => (
          <li
            className="w-full px-4 py-2 rounded-md  bg-slate-100 text-sm flex justify-between items-center mt-4"
            key={id}
          >
            <div
              className={`${
                data.isDone ? "bg-blue-500" : "bg-slate-200"
              } relative size-5 cursor-pointer transition-all duration-300 rounded-full border-solid`}
              onClick={() => handleIsDone(data.datas)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`${
                  data.isDone && "w-4  h-4"
                } w-0 h-0 text-white absolute z-2 left-0.5 top-0.5`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p
              className={`${
                data.isDone && "line-through"
              } cursor-default text-nowrap ml-10 overflow-hidden text-ellipsis w-[20ch] sm:w-[30ch]`}
              onClick={() => handleIsDone(data.datas)}
            >
              {id + 1}. {""} {data.datas}
            </p>
            </div>

            <span
              className="size-8 bg-white flex justify-center items-center rounded-md shadow-sm cursor-pointer"
              onClick={() => handleDeleteTask(data.datas)}
            >
              <Trash size={20} />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
