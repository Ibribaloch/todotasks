// Get DOM elements
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const totalTasks = document.getElementById('total-tasks');
const completedTasks = document.getElementById('completed-tasks');

// Initialize tasks array
let tasks = [];

// Load tasks from local storage
if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  renderTasks();
}

// Event listener for adding a new task
addTaskBtn.addEventListener('click', () => {
  const taskText = taskInput.value.trim();
  if (taskText !== '') {
    const task = {
      id: Date.now(),
      text: taskText,
      completed: false
    };
    tasks.push(task);
    saveTasks();
    renderTasks();
    taskInput.value = '';
  }
});

// Event listener for marking a task as complete
taskList.addEventListener('click', (event) => {
  if (event.target.tagName === 'LI') {
    const taskId = parseInt(event.target.dataset.id);
    const taskIndex = tasks.findIndex(task => task.id === taskId);
    if (taskIndex !== -1) {
      tasks[taskIndex].completed = !tasks[taskIndex].completed;
      saveTasks();
      renderTasks();
    }
  }
});

// Event listener for deleting a task
taskList.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-btn')) {
    const taskId = parseInt(event.target.parentElement.dataset.id);
    tasks = tasks.filter(task => task.id !== taskId);
    saveTasks();
    renderTasks();
  }
});

// Function to save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to render tasks
function renderTasks() {
  taskList.innerHTML = '';
  let completedCount = 0;
  tasks.forEach(task => {
    const li = document.createElement('li');
    li.dataset.id = task.id;
    li.textContent = task.text;
    if (task.completed) {
      li.classList.add('completed');
      completedCount++;
    }
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Delete';
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
  totalTasks.textContent = tasks.length;
  completedTasks.textContent = completedCount;
}
