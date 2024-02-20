document.addEventListener("DOMContentLoaded", () => {
  const todoList = document.querySelector("#todoList tbody");
  const userFilter = document.getElementById("userFilter");
  const completedFilter = document.getElementById("completedFilter");
  const resetButton = document.getElementById("reset");

  let allTodos = []; // Store all todos fetched from the API

  // Fetch todos from the API
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then((response) => response.json())
    .then((data) => {
      allTodos = data; // Store all todos in the allTodos array

      // Populate user filter options
      const users = [...new Set(data.map((todo) => todo.userId))];
      users.forEach((userId) => {
        const option = document.createElement("option");
        option.value = userId;
        option.textContent = `User ${userId}`;
        userFilter.appendChild(option);
      });

      // Initial call to filterTodos
        defaulttodos();

      // Add event listener to user filter
      userFilter.addEventListener("change", defaulttodos);
    })
    .catch((error) => console.error("Error fetching todos:", error));

  // Function to filter todos based on user and completed status
  const defaulttodos = () => {
    let defaultTodo = allTodos;

    // Clear existing list
    todoList.innerHTML = "";

    // Populate todo list
    defaultTodo.forEach((todo) => {
      const tr = document.createElement("tr");
      const tdId = document.createElement("td");
      const tdTitle = document.createElement("td");
      const tdCompleted = document.createElement("td");
      const checkboxContainer = document.createElement("div");

      tdId.textContent = todo.id;
      tdTitle.textContent = `User ID ${todo.userId} : ${todo.title}`;

      // Apply styling to center content horizontally for tdId and tdTitle
      [tdId].forEach((td) => {
        td.style.textAlign = "center";
      });

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.completed;
      checkbox.disabled = true; // disable checkbox to prevent user interaction
      checkboxContainer.style.textAlign = "center"; // Center content horizontally
      checkboxContainer.appendChild(checkbox); // Append checkbox to container
      tdCompleted.appendChild(checkboxContainer); // Append container to tdCompleted

      tr.appendChild(tdId);
      tr.appendChild(tdTitle);
      tr.appendChild(tdCompleted);
      todoList.appendChild(tr);
    });
  };

  // Function to filter todos after completion filter is selected
  const filterTodos2 = () => {
    const selectedUser = userFilter.value;
    const completedValue = completedFilter.value;

    // Filter todos based on selected user
    let filteredTodos = allTodos.filter((todo) => {
      if (selectedUser && todo.userId != selectedUser) return false;
      return true;
    });

    // Filter todos based on completion status
    if (completedValue !== "") {
      const isCompleted = completedValue === "true";
      filteredTodos = filteredTodos.filter((todo) => todo.completed === isCompleted);
    }

    // Clear existing list
    todoList.innerHTML = "";

    // Populate todo list
    filteredTodos.forEach((todo) => {
      const tr = document.createElement("tr");
      const tdId = document.createElement("td");
      const tdTitle = document.createElement("td");
      const tdCompleted = document.createElement("td");
      const checkboxContainer = document.createElement("div");

      tdId.textContent = todo.id;
      tdTitle.textContent = todo.title;

      // Apply styling to center content horizontally for tdId and tdTitle
      [tdId].forEach((td) => {
        td.style.textAlign = "center";
      });

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.completed;
      checkbox.disabled = true; // disable checkbox to prevent user interaction
      checkboxContainer.style.textAlign = "center"; // Center content horizontally
      checkboxContainer.appendChild(checkbox); // Append checkbox to container
      tdCompleted.appendChild(checkboxContainer); // Append container to tdCompleted

      tr.appendChild(tdId);
      tr.appendChild(tdTitle);
      tr.appendChild(tdCompleted);
      todoList.appendChild(tr);
    });

    resetButton.classList.remove('visually-hidden');
  };

  // Add event listener to completed filter
  completedFilter.addEventListener("change", filterTodos2);

  // Reset button functionality
  const resetButtonFunction = () => {
    userFilter.value = "Filter by User";
    completedFilter.value = "Filter by Completion";
    todoList.innerHTML = "";
    defaulttodos();
    resetButton.classList.add('visually-hidden');
  };

  resetButton.addEventListener("click", resetButtonFunction);
});


















