import { SquarePen, Trash2 } from "lucide-react";
import React, { useState } from "react";
import EditModal from "./EditModal";
import Toaster from "./Toaster";
import { updateTaskListRefresh } from "../redux/taskSlice";
import { useDispatch } from "react-redux";
import { deleteTask } from "../fetch/fetch";
import { useEffect } from "react";

const Task = ({ task }) => {
  const { _id: taskId, name, completed } = task;

  const [openModal, setOpenModal] = useState(false);
   const [showToast, setShowToast] = useState(false);
   const dispatch = useDispatch()

  const toggleModal = () => {
    setOpenModal(!openModal);
  };

  const handleDelete = async () => {
    try {
      const data = await deleteTask(taskId)
      if(data.success) {
        setShowToast(true); // show toast
        setTimeout(() => {
          dispatch(updateTaskListRefresh(true))
        }, 1500)
      }
    } catch (error) {
      console.log('error')
    }
  };

  return (
    <>
      <div className=" bg-gray-700 w-96 shadow-sm flex justify-between p-4 rounded-lg">
        <p className={completed ? "line-through" : ""}>{name}</p>
        <div className="flex gap-2 cursor-pointer">
          <SquarePen onClick={toggleModal} />
          <Trash2 onClick={handleDelete} />
        </div>
      </div>
      <EditModal isOpen={openModal} onClose={toggleModal} task={task} />
      {showToast && <Toaster message="Task deleted successfully" />}
    </>
  );
};

export default Task;
