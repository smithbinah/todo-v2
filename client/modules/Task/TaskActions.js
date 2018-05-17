import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_TASK = 'ADD_TASK';
export const ADD_TASKS = 'ADD_TASKS';
export const DELETE_TASK = 'DELETE_TASK';

// Export Actions
export function addTask(task) {
  return {
    type: ADD_TASK,
    task,
  };
}

export function addTaskRequest(task) {
  return (dispatch) => {
    return callApi('tasks', 'task', {
      task: {
        checked: task.checked,
        content: task.content,
      },
    }).then(res => dispatch(addTask(res.task)));
  };
}

export function addTasks(tasks) {
  return {
    type: ADD_TASKS,
    tasks,
  };
}

export function fetchTasks() {
  return (dispatch) => {
    return callApi('tasks').then(res => {
      dispatch(addTasks(res.tasks));
    });
  };
}

export function fetchTask(cuid) {
  return (dispatch) => {
    return callApi(`tasks/${cuid}`).then(res => dispatch(addTask(res.task)));
  };
}

export function deleteTask(cuid) {
  return {
    type: DELETE_TASK,
    cuid,
  };
}

export function deleteTaskRequest(cuid) {
  return (dispatch) => {
    return callApi(`tasks/${cuid}`, 'delete').then(() => dispatch(deleteTask(cuid)));
  };
}
