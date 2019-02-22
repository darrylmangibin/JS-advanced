function getTodos() {
    var json = localStorage.getItem('todos');
    if(json !== null) {
        return JSON.parse(json);
    } else {
        return [];
    }
}

function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}

function generateListTitle(incomplete) {
    var s = incomplete.length > 1 ? 's' : '';
    var h2 = document.createElement('h2');
    h2.classList.add('list-title');
    h2.textContent = `You have ${incomplete.length} todo${s} left`;
    return h2;
}

function genEmptyMessage() {
    var p = document.createElement('p');
    p.classList.add('empty-message');
    p.textContent = 'There are no to-dos to show';
    return p;
}

function removeTodo(id) {
    var x = -1
    for(i = 0; i < todos.length; i++) {
        if(id === todos[i].id){
            x = i;
        }
    }
    if(x > -1) {
        todos.splice(x, 1);
    }
}

function checkTodo(id) {
    var todo;
    for(i = 0; i < todos.length; i++) {
        if(id === todos[i].id) [
            todo = todos[i]
        ]
    }
    todo.completed = !todo.completed;
}

function genTodos(todo) {
    var label = document.createElement('label');
    label.classList.add('list-item');

    var div = document.createElement('div');
    div.classList.add('list-item__container');
    label.appendChild(div);

    var input = document.createElement('input');
    input.setAttribute('type', 'checkbox');
    input.checked = todo.completed;
    input.addEventListener('change', function(e) {
        checkTodo(todo.id);
        saveTodos();
        render(todos, filters)
    })
    div.appendChild(input);

    var span = document.createElement('span');
    span.textContent = todo.text;
    div.appendChild(span)

    var btn = document.createElement('button');
    btn.textContent = 'remove';
    btn.classList.add('button', 'button--text');
    btn.addEventListener('click', function(e) {
        removeTodo(todo.id);
        saveTodos();
        render(todos, filters)
    })
    label.appendChild(btn);

    todoContainer.appendChild(label);
}

function render(todos, filters) {
    var filterTodos = [];
    var incomplete = [];
    for(i = 0; i < todos.length; i++) {
        var filterText = todos[i].text.toLowerCase().indexOf(filters.searchText.toLowerCase()) > -1;
        var filterHide = !filters.completed || !todos[i].completed;
        if (filterText && filterHide) {
            filterTodos.push(todos[i]);
        }
        
    }

    for(i = 0; i < filterTodos.length; i++) {
        if(filterTodos[i].completed === false) {
            incomplete.push(filterTodos[i])
        }
    }

    todoContainer.innerHTML = '';

    todoContainer.appendChild(generateListTitle(incomplete));

    if(filterTodos.length <= 0) {
        todoContainer.appendChild(genEmptyMessage());
    } else {
        for(i = 0; i < filterTodos.length; i++) {
            genTodos(filterTodos[i])
        }
    }
}