import { useRef } from 'react';

import classes from './TaskForm.module.css';

const TaskForm = (props) => {
  const taskInputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const enteredValue = taskInputRef.current.value;

    if (enteredValue.trim().length > 0) {
      props.onEnterTask(enteredValue);
    }
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <input type="text" ref={taskInputRef} />
      <button>{props.loading ? 'Sending...' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
