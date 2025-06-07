import Task from "./Task";
import { useState } from "react";
import { useEffect } from "react";
import { fetchTasks } from "../fetch/fetch";
import { useDispatch, useSelector } from "react-redux";
import { updateTaskListRefresh } from "../redux/taskSlice";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const taskListRefresh = useSelector((state) => state.task.taskListRefresh);
  const dispatch = useDispatch();

  const getData = async () => {
    const data = await fetchTasks();
    if (data.success) {
      setTasks(data.data);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (taskListRefresh) {
      getData();
    }

    dispatch(updateTaskListRefresh(false));
  }, [taskListRefresh]);

  if (tasks.length === 0) return <p className="text-gray-100 text-sm italic">No Tasks Added.</p>

  return (
    <div className="flex flex-col gap-4 mt-8">
      {tasks.map((task) => (
        <Task key={task.id} task={task} />
      ))}
    </div>
  );
};

export default TaskList;
