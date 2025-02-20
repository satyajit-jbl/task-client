import { useEffect, useState } from "react";
import axios from "axios";

const categories = ["To-Do", "In Progress", "Done"];

const TaskBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "To-Do",
    time: "",
  });
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    axios
      .get("https://scic-jobtask-satyajit-server.vercel.app/tasks")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData("taskId", taskId);
  };

  const handleDrop = async (e, newCategory) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData("taskId");
    
    setTasks(tasks.map(task => task._id === taskId ? { ...task, category: newCategory } : task));

    try {
      await axios.put(`https://scic-jobtask-satyajit-server.vercel.app/tasks/${taskId}`, { category: newCategory });
    } catch (error) {
      console.error("Error updating task category:", error);
    }
  };

  const handleDelete = async (taskId) => {
    setTasks(tasks.filter(task => task._id !== taskId));
    await axios.delete(`https://scic-jobtask-satyajit-server.vercel.app/tasks/${taskId}`);
  };

  return (
    <div className="p-5 max-w-6xl mx-auto">
      {/* Task Form */}
      <form className="bg-gray-200 p-4 rounded-lg mb-5 flex flex-wrap gap-3" onSubmit={(e) => {
        e.preventDefault();
        if (!newTask.title.trim()) return alert("Task title is required!");
        axios.post("https://scic-jobtask-satyajit-server.vercel.app/tasks", newTask).then((res) => {
          setTasks([...tasks, { ...newTask, _id: res.data.insertedId }]);
          setNewTask({ title: "", description: "", category: "To-Do", time: "" });
        });
      }}>
        <input type="text" name="title" placeholder="Task title" className="p-2 rounded border w-full md:w-1/4" value={newTask.title} onChange={(e) => setNewTask({ ...newTask, [e.target.name]: e.target.value })} required maxLength={50} />
        <input type="text" name="description" placeholder="Description (optional)" className="p-2 rounded border w-full md:w-1/4" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, [e.target.name]: e.target.value })} maxLength={200} />
        <input type="time" name="time" className="p-2 rounded border w-full md:w-1/6" value={newTask.time} onChange={(e) => setNewTask({ ...newTask, [e.target.name]: e.target.value })} required />
        <select name="category" className="p-2 rounded border w-full md:w-auto" value={newTask.category} onChange={(e) => setNewTask({ ...newTask, [e.target.name]: e.target.value })}>
          {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full md:w-auto">Add Task</button>
      </form>

      {/* Task Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div key={category} className="bg-gray-100 p-4 rounded-lg min-h-[300px]" onDragOver={(e) => e.preventDefault()} onDrop={(e) => handleDrop(e, category)}>
            <h2 className="text-xl font-bold mb-4">{category}</h2>
            {tasks.filter((task) => task.category === category).map((task) => (
              <div key={task._id} className="bg-white p-3 rounded shadow mb-2 cursor-pointer" draggable onDragStart={(e) => handleDragStart(e, task._id)}>
                {editTask && editTask._id === task._id ? (
                  <div>
                    <input type="text" name="title" value={editTask.title} onChange={(e) => setEditTask({ ...editTask, [e.target.name]: e.target.value })} className="border rounded p-1 w-full" />
                    <button className="bg-green-500 text-white px-2 py-1 mt-2 w-full" onClick={() => {
                      axios.put(`https://scic-jobtask-satyajit-server.vercel.app/tasks/${editTask._id}`, editTask).then(() => {
                        setTasks(tasks.map(task => task._id === editTask._id ? editTask : task));
                        setEditTask(null);
                      });
                    }}>Save</button>
                  </div>
                ) : (
                  <div>
                    <h3 className="font-semibold">{task.title}</h3>
                    <p className="text-sm">{task.description}</p>
                    <p className="text-sm font-semibold">Time: {task.time}</p>
                    <div className="flex gap-2 mt-2 border-t pt-2">
                      <button className="text-blue-500 font-semibold border-b-2 rounded-lg border-blue-500 px-2" onClick={() => setEditTask(task)}>Edit</button>
                      <button className="text-red-500 font-semibold border-b-2 rounded-lg border-red-500 px-2" onClick={() => handleDelete(task._id)}>Delete</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskBoard;
