import React from "react";
import { useState } from "react";
import { createTask } from "../fetch/fetch";
import Toaster from "./Toaster";
import { useDispatch } from "react-redux";
import { updateTaskListRefresh } from "../redux/taskSlice";

const AddTaskForm = () => {
  const [taskData, setTaskData] = useState({
    name: "",
    completed: false,
  });
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch()

  const onChangeTaskData = (e) => {
    const { name, value, type, checked } = e.target;

    setTaskData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addTask = async () => {
    const data = await createTask(taskData);
    if (data.success) {
      dispatch(updateTaskListRefresh(true))
      setShowToast(true); // show toast
      setTimeout(() => setShowToast(false), 3000);
    }

    setTaskData({
      name: "",
      completed: false,
    });
  };

  return (
    <>
      <div className="flex flex-col gap-4 mt-4">
        <div className="flex gap-4">
          <input
            type="text"
            name="name"
            placeholder="Type here"
            className="input w-96"
            value={taskData?.name}
            onChange={onChangeTaskData}
            required
          />
          <button className="btn btn-primary" onClick={addTask}>
            Add Task
          </button>
        </div>
        <label className="label px-4 w-fit">
          <input
            type="checkbox"
            name="completed"
            checked={taskData.completed}
            onChange={onChangeTaskData}
            className="checkbox border-base-400 bg-base-100 checked:border-indigo-500 checked:bg-indigo-400 checked:text-white"
          />
          Completed
        </label>
      </div>
      {showToast && <Toaster message="New Task Added" />}
    </>
  );
};

export default AddTaskForm;
