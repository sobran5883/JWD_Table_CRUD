function TaskFilter({ tasks, onFilterChange }) {
    const statusCounts = tasks.reduce(
      (acc, task) => {
        acc[task.status] = (acc[task.status] || 0) + 1;
        return acc;
      },
      { 'To Do': 0, 'In Progress': 0, 'Done': 0 }
    );
  
    return (
      <div className="border p-1 border-black w-fit">
        <label htmlFor="task-filter">Filter Tasks by Status: </label>
        <select
          className="border border-black p-1"
          id="task-filter"
          onChange={(e) => onFilterChange(e.target.value)}
          style={{ padding: '5px', marginLeft: '10px' }}
        >
          <option value="">All ({tasks.length})</option>
          <option value="To Do">To Do ({statusCounts['To Do']})</option>
          <option value="In Progress">In Progress ({statusCounts['In Progress']})</option>
          <option value="Done">Done ({statusCounts['Done']})</option>
        </select>
      </div>
    );
  }
  
  export default TaskFilter;
  