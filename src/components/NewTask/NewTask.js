import useHttp from '../../hooks/use-https';

import Section from '../UI/Section';
import TaskForm from './TaskForm';

const NewTask = (props) => {
  const { isLoading, error, sendRequest: sendTaskRequest } = useHttp();

  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask);
  };

  const handleEnterTask = async (taskText) => {
    sendTaskRequest(
      {
        url: 'https://react-http-991ba-default-rtdb.firebaseio.com/tasks.json',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: { text: taskText },
      },
      createTask.bind(null, taskText)
    );
  };

  return (
    <Section>
      <TaskForm onEnterTask={handleEnterTask} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
