// Get the data from the localstorage
const getSaveTodos = () => {
	const todosJSON = localStorage.getItem('todos');
	if(todosJSON !== null) {
		return JSON.parse(todosJSON);
	} else {
		return [];
	}
}

const todos = getSaveTodos();

// Store todos to localstorage
const saveTodos = () => {
	localStorage.setItem('todos', JSON.stringify(todos));
}

// placeholders
const filters = {
	searchText: '',
	hideCompleted: false
}

// render the todos element
const renderTodos = (todos, filters) => {
	let filterTodos = todos.filter((todo) => {
		const hideText = !todo.completed || !filters.hideCompleted;
		const filterText = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
		return hideText && filterText
	})
	
	// ALTERNATIVE TO HIDE COMPLETED TODOS
	// filterTodos = filterTodos.filter((todo) => {
	// 	if(!filters.hideCompleted) {
	// 		return todo
	// 	} else {
	// 		return !todo.completed
	// 	}
	// })

	document.querySelector('#todos').innerHTML = ''
	
	const incompleteTodos = filterTodos.filter((todo) => {
		if(!todo.completed) {
			return todo
		}
	})

	const todosLeft = document.createElement('h2');
	todosLeft.className = 'list-title';
	todosLeft.textContent = `You have ${incompleteTodos.length} todos left`;

	document.querySelector('#todos').appendChild(todosLeft)

	if(filterTodos.length === 0) {
		const emptyMessage = document.createElement('p');
		emptyMessage.className = 'empty-message';
		emptyMessage.textContent = `There are no to-dos to show`

		document.querySelector('#todos').appendChild(emptyMessage);

	}
	filterTodos.forEach((todo) => {
		const label = document.createElement('label');
		const div = document.createElement('div');
		const input = document.createElement('input');
		const span = document.createElement('span');
		const button = document.createElement('button');

		// <label>
		label.className = 'list-item';

		// <div>
		div.className = 'list-item__container';
		label.appendChild(div);

		// <div> childrend
		input.setAttribute('type', 'checkbox');
		input.checked = todo.completed;
		div.appendChild(input);
		// <div> children
		span.textContent = todo.text;
		div.appendChild(span);

		// <button>
		button.className = 'button button--text';
		button.textContent = 'remove';
		label.appendChild(button);

		// remove todo by id
		const removeTodo = (id) => {
			const todoIndex = todos.findIndex((todo) => {
				if(todo.id === id) {
					return todo
				}
			});
			if(todoIndex > -1) {
				todos.splice(todoIndex, 1)
			}
		}

		// toggle completed todo by id
		const toggleCompleted = (id) => {
			const toggleTodo = todos.find((todo) => {
				if(todo.id === id) {
					return todo
				}
			})
			toggleTodo.completed = !toggleTodo.completed;
			console.log(toggleTodo)
		}

		// event to remove todo
		button.addEventListener('click', (e) => {
			removeTodo(todo.id);
			saveTodos();
			renderTodos(todos, filters);
		});

		// event to toggle competed todos
		input.addEventListener('change', (e) => {
			toggleCompleted(todo.id);
			saveTodos();
			renderTodos(todos, filters)
		})

		document.querySelector('#todos').appendChild(label)

	})
}
renderTodos(todos, filters)

// Add Event to add todos
document.querySelector('#new-todo').addEventListener('submit', (e) => {
	const id = uuidv4();
	e.preventDefault();
	if(e.target.elements.text.value.length <= 0) {
		alert('Add todos');
		return undefined
	} else {
		todos.push({
			id: id,
			text: e.target.elements.text.value,
			completed: false
		});
		saveTodos();
		renderTodos(todos, filters)
		e.target.elements.text.value = '';
	}
})

document.querySelector('#search-text').addEventListener('input', (e) => {
	filters.searchText = e.target.value;
	renderTodos(todos, filters)
})

document.querySelector('#hide-completed').addEventListener('change', (e) => {
	filters.hideCompleted = e.target.checked
	renderTodos(todos, filters)
})