import { ReactTabulator } from 'react-tabulator';
import 'react-tabulator/lib/styles.css';
import 'react-tabulator/lib/css/tabulator.min.css';

function TaskTable({ tasks, updateTask, deleteTask }) {
  const columns = [
    { title: 'Task ID', field: 'id', width: 100 },
    { title: 'Title', field: 'title', editor: 'input' },
    { title: 'Description', field: 'description', editor: 'input' },
    {
      title: 'Status',
      field: 'status',
      editor: 'select',
      width:100,
      editorParams: {
        values: ['To Do', 'In Progress', 'Done'],
      },
      formatter: (cell) => {
        const value = cell.getValue();
        let color;
        if (value === 'To Do') color = 'blue';
        else if (value === 'In Progress') color = 'yellow';
        else if (value === 'Done') color = 'green';

        return `<div style="color: ${color}; padding: 5px; text-align: center; border-radius: 4px;">
                  ${value}
                </div>`;
      },
    },
    {
      title: 'Actions',
      formatter: () => '<button style="color:red">Delete</button>',
      width: 100,
      cellClick: (e, cell) => deleteTask(cell.getRow().getData().id),
    },
  ];

  const onTableChange = (changedData) => {
    updateTask(changedData);
  };

  return (
    <ReactTabulator
      data={tasks}
      columns={columns}
      cellEdited={(cell) => onTableChange(cell.getRow().getData())}
      layout="fitData"
    />
  );
}

export default TaskTable;
