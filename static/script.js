document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todo-form');
    const taskInput = document.getElementById('task-input');
    const todoList = document.getElementById('todo-list');
    
    // Load todos when page loads
    fetchTodos();
    
    // Add event listener for form submission
    todoForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const task = taskInput.value.trim();
        if (!task) {
            alert('Please enter a task!');
            return;
        }
        
        addTodo(task);
        taskInput.value = '';
    });
    
    // Fetch all todos from the server
    function fetchTodos() {
        fetch('/api/todos')
            .then(response => response.json())
            .then(todos => {
                todoList.innerHTML = '';
                todos.forEach(todo => {
                    appendTodoToDOM(todo);
                });
            })
            .catch(error => console.error('Error fetching todos:', error));
    }
    
    // Add a new todo
    function addTodo(task) {
        fetch('/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ task })
        })
        .then(response => response.json())
        .then(todo => {
            if (todo.detail) {
                alert(todo.detail);
            } else {
                appendTodoToDOM(todo);
            }
        })
        .catch(error => console.error('Error adding todo:', error));
    }
    
    // Delete a todo
    function deleteTodo(id) {
        fetch(`/api/todos/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (response.ok) {
                const todoElement = document.getElementById(`todo-${id}`);
                if (todoElement) {
                    todoElement.remove();
                }
            }
        })
        .catch(error => console.error('Error deleting todo:', error));
    }
    
    // Toggle todo status
    function toggleTodoStatus(id, currentStatus) {
        const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
        
        fetch(`/api/todos/${id}/status`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: newStatus })
        })
        .then(response => {
            if (response.ok) {
                const todoElement = document.getElementById(`todo-${id}`);
                const todoText = todoElement.querySelector('.todo-text');
                const toggleBtn = todoElement.querySelector('.toggle-btn');
                
                if (newStatus === 'completed') {
                    todoText.classList.add('completed');
                    toggleBtn.textContent = 'Undo';
                } else {
                    todoText.classList.remove('completed');
                    toggleBtn.textContent = 'Complete';
                }
                
                todoElement.dataset.status = newStatus;
            }
        })
        .catch(error => console.error('Error updating todo status:', error));
    }
    
    // Append a todo to the DOM
    function appendTodoToDOM(todo) {
        const li = document.createElement('li');
        li.id = `todo-${todo.id}`;
        li.dataset.status = todo.status;
        
        const todoItem = document.createElement('div');
        todoItem.className = 'todo-item';
        
        const todoText = document.createElement('span');
        todoText.className = 'todo-text';
        todoText.textContent = todo.task;
        if (todo.status === 'completed') {
            todoText.classList.add('completed');
        }
        
        const todoActions = document.createElement('div');
        todoActions.className = 'todo-actions';
        
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'toggle-btn';
        toggleBtn.textContent = todo.status === 'completed' ? 'Undo' : 'Complete';
        
        toggleBtn.addEventListener('click', () => {
            const currentStatus = li.dataset.status;
            toggleTodoStatus(todo.id, currentStatus);
        });
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
        
        todoItem.appendChild(todoText);
        todoActions.appendChild(toggleBtn);
        todoActions.appendChild(deleteBtn);
        
        li.appendChild(todoItem);
        li.appendChild(todoActions);
        
        todoList.appendChild(li);
    }
}); 