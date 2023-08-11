// Global variables
let allTodos = [];
let isLoading = false; // to track the loading state

async function loadTodoData() {
  const apiEndpoint = 'https://jsonplaceholder.typicode.com/todos';
  const dataContainer = document.getElementById('todoDataDisplay');

  // Set loading to true and render the state
  isLoading = true;
  renderTodos([]);

  try {
    const response = await fetch(apiEndpoint);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    allTodos = await response.json();
    renderTodos(allTodos);
  } catch (error) {
    console.error(
      'There was a problem with the fetch operation:',
      error.message
    );
    dataContainer.innerHTML =
      '<p>Error fetching data. Please try again later.</p>';
  } finally {
    isLoading = false;
    renderTodos(allTodos);
  }
}

function renderTodos(todos) {
  const dataContainer = document.getElementById('todoDataDisplay');

  if (isLoading) {
    dataContainer.innerHTML = '<p>Loading data...</p>';
    return;
  }

  if (!todos.length) {
    dataContainer.innerHTML = '<p>No todos found or no data available.</p>';
    return;
  }

  // Map through the todos to display them
  const todoCards = isLoading
    ? '<p>Loading data...</p>'
    : !todos.length
    ? '<p>No users found or no data available.</p>'
    : todos
        .map((todo) => {
          const status = todo.completed ? '✅ Completed' : '❌ Not Completed';
          return `
        <div class="todo-card">
            <h2>${todo.title}</h2>
            <p>Status: ${status}</p>
        </div>
    `;
        })
        .join('');

  dataContainer.innerHTML = todoCards;
}

function filterTodos() {
  // Get the search term and filter the todos based on the title
  const searchTerm = document.getElementById('searchField').value.toLowerCase();
  const filteredTodos = allTodos.filter((todo) =>
    todo.title.toLowerCase().includes(searchTerm)
  );
  renderTodos(filteredTodos);
}

// You may want to call the loadTodoData function on page load or based on some user action.
