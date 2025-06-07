import { useState } from "react";
import Toaster from "./Toaster";
import { updateTask } from "../fetch/fetch";
import { useDispatch } from "react-redux";
import { updateTaskListRefresh } from "../redux/taskSlice";

const EditModal = ({ isOpen, onClose, task }) => {
  if (!isOpen) return;

  const { name, completed, _id: taskId } = task;

  const [taskData, setTaskData] = useState({
    name: name,
    completed: completed,
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

  const editTask = async () => {
    const data = await updateTask(taskId, taskData);
    if (data.success) {
      dispatch(updateTaskListRefresh(true));
      setShowToast(true); // show toast
      setTimeout(() => setShowToast(false), 3000);
    }

    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <>
      <div
        className={`modal modal-bottom sm:modal-middle ${
          isOpen ? "modal-open" : ""
        }`}
      >
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-8">Update Task</h3>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4">
              <input
                type="text"
                name="name"
                placeholder="Type here"
                className="input w-full"
                value={taskData?.name}
                onChange={onChangeTaskData}
              />
            </div>
            <label className="label px-4 w-fit">
              <input
                type="checkbox"
                name="completed"
                checked={taskData?.completed}
                onChange={onChangeTaskData}
                className="checkbox border-base-400 bg-base-100 checked:border-indigo-500 checked:bg-indigo-400 checked:text-white"
              />
              Completed
            </label>
          </div>
          <div className="modal-action">
            <button className="btn btn-outline" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-success" onClick={editTask}>
              Save
            </button>
          </div>
        </div>
      </div>
      {showToast && <Toaster message="Task updated successfully" />}
    </>
  );
};

export default EditModal;
