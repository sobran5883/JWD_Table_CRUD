import { useState } from 'react';
import { Input } from 'antd';
function AddTaskForm({ addTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('To Do');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(), // Unique ID
      title,
      description,
      status,
    };
    addTask(newTask);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full md:w-6/12 lg:w-10/12 xl:w-8/12 flex flex-col gap-4 border p-2 border-black rounded-md">
      <Input
        type="text"
        placeholder="Task Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <Input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        className="border p-2 rounded"
      />
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
      </select>
      <button type="submit" className='border-2 border-green-700 text-green-600 font-semibold rounded-md p-2'>
        Add Task
      </button>
    </form>
  );
}

export default AddTaskForm;
