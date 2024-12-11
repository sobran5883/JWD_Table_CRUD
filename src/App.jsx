import { useState, useEffect } from 'react';
import axios from 'axios';
import TaskTable from './components/TaskTable';
import AddTaskForm from './components/AddTaskFom';
import TaskFilter from './components/Taskfilter';
import toast, { Toaster } from 'react-hot-toast';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const notify = (message) => toast.success(message);

  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/todos?_limit=20')
      .then((response) => {
        const formattedTasks = response.data.map((task) => ({
          id: task.id,
          title: task.title,
          description: `${task.id}`,
          status: task.completed ? 'Done' : 'To Do',
        }));
        setTasks(formattedTasks);
      })
      .catch((error) => console.error('Error fetching tasks:', error));
  }, []);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
    notify('Task added successfully!');
  };

  const updateTask = (updatedTask) => {
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    notify('Task updated successfully!');
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
    notify('Task deleted successfully!');
  };

  const handleFilterChange = (status) => {
    setFilteredStatus(status);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesStatus = filteredStatus ? task.status === filteredStatus : true;
    const matchesSearch =
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="w-full flex flex-col items-center px-4 my-4">
      <h1 className="text-2xl font-bold w-full sm:w-10/12 lg:w-8/12 text-center underline mb-4">
        Task Manager
      </h1>
      <div className="w-full flex flex-col justify-around lg:flex-row-reverse gap-6 my-6">
        <div className="w-full">
          <h1 className='text-lg font-semibold text-red-800'>Add table data</h1>
          <AddTaskForm addTask={addTask} />
        </div>

        <div className="w-full">
          <h1 className='text-lg font-semibold text-red-800'>Table</h1>
          <div className="w-full flex flex-col md:flex-row items-center md:justify-between gap-2 lg:gap-4 mb-2">
            <div className='w-full'>
              <TaskFilter tasks={tasks} onFilterChange={handleFilterChange} />
            </div>
            <input
              type="text"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-6/12 border p-2 border-black/80 "
            />
          </div>
          <div className="overflow-x-auto">
            <TaskTable tasks={filteredTasks} updateTask={updateTask} deleteTask={deleteTask} />
          </div>
        </div>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </div>
  );
}

export default App;
