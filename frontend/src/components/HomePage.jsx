import AddTaskForm from "./AddTaskForm";
import TaskList from "./TaskList";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/logout",
        {},
        {
          withCredentials: true,
        }
      );
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className=" w-1/2 h-screen flex flex-col gap-4 items-center m-auto pt-24">
      <div className="w-screen flex justify-end px-24">
        <button className="btn btn-soft btn-accent" onClick={handleLogout}>Log out</button>
      </div>
      <h1 className="text-3xl font-bold">Task Manager</h1>
      <AddTaskForm />
      <TaskList />
    </div>
  );
};

export default HomePage;
