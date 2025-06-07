import axios from "axios";

export const fetchTasks = async () => {
  const data = await axios.get("http://localhost:5000/api/tasks", {
    withCredentials: true,
  });
  return data.data;
};

export const createTask = async (payload) => {
  const data = await axios.post("http://localhost:5000/api/tasks", payload, {
    withCredentials: true,
  });
  return data.data;
};

export const deleteTask = async (taskId) => {
  const response = await axios.delete(
    `http://localhost:5000/api/tasks/${taskId}`,
    { withCredentials: true }
  );
  return response.data;
};

export const updateTask = async (taskId, payload) => {
  const response = await axios.patch(
    `http://localhost:5000/api/tasks/${taskId}`,
    payload,
    { withCredentials: true }
  );
  return response.data;
};

export const loginUser = async (payload) => {
  const res = await axios.post("http://localhost:5000/api/users/login", payload, {
    withCredentials: true, // to allow cookie storage
  });
  return res.data;
};
