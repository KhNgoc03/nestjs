const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todosList = document.getElementById('todos');
let currentEditId = null;

// Lấy danh sách todos từ server
const fetchTodos = async () => {
    try {
        const response = await fetch('http://localhost:3000/todo'); // Đúng endpoint /todo
        const todos = await response.json();
        todosList.innerHTML = ''; // Xóa danh sách cũ
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            li.innerHTML = `
                <span>${todo.content}</span>
                <div>
                    <button class="btn btn-warning btn-sm" onclick="editTodo('${todo.id}', '${todo.content}')">Sửa</button>
                    <button class="btn btn-danger btn-sm" onclick="deleteTodo('${todo.id}')">Xóa</button>
                </div>
            `;
            todosList.appendChild(li);
        });
    } catch (error) {
        console.error('Lỗi khi lấy danh sách todos:', error);
    }
};

// Thêm hoặc cập nhật todo
todoForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const todoContent = todoInput.value.trim();
    if (!todoContent) {
        console.error('Todo content is empty');
        return;
    }

    console.log('Sending data:', { content: todoContent });

    try {
        if (currentEditId) {
            const response = await fetch(`http://localhost:3000/todo/${currentEditId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: todoContent }),
            });
            const result = await response.json();
            console.log('Response:', result);
        } else {
            const response = await fetch('http://localhost:3000/todo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: todoContent }),
            });
            const result = await response.json();
            console.log('Response:', result);
        }
        todoInput.value = '';
        fetchTodos();
    } catch (error) {
        console.error('Error while sending data:', error);
    }
});


// Xóa todo
const deleteTodo = async (id) => {
    try {
        await fetch(`http://localhost:3000/todo/${id}`, {
            method: 'DELETE'
        });
        fetchTodos();
    } catch (error) {
        console.error('Lỗi khi xóa todo:', error);
    }
};

// Chỉnh sửa todo
const editTodo = (id, content) => {
    todoInput.value = content;
    currentEditId = id; // Lưu lại id của todo đang chỉnh sửa
};

// Khởi động và lấy todos ban đầu
fetchTodos();