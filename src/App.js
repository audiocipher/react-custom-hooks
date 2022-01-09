import React, { useEffect, useState } from 'react';

import useHttp from './hooks/use-https';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';

function App() {
  // this component implicitly uses the isLoading and error state defined in use-https.js
  const [tasks, setTasks] = useState([]);

  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  useEffect(() => {
    const transformTasks = (tasksObj) => {
      const loadedTasks = [];

      for (const taskKey in tasksObj) {
        loadedTasks.push({ id: taskKey, text: tasksObj[taskKey].text });
      }

      setTasks(loadedTasks);
    };

    fetchTasks(
      {
        url: 'https://react-http-991ba-default-rtdb.firebaseio.com/tasks.json',
      },
      transformTasks
    );
  }, [fetchTasks]);

  const handleAddTask = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={handleAddTask} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
