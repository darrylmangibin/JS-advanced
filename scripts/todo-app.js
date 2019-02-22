var searchText = document.querySelector('#search-text'),
    hideCompleted = document.querySelector('#hide-completed'),
    todoContainer = document.querySelector('#todos'),
    newTodo = document.querySelector('#new-todo');

var todos = getTodos();
var filters = {
    searchText: '',
    completed: false
}

render(todos, filters);

newTodo.addEventListener('submit', function(e) {
    e.preventDefault();
    var id = uuidv4();
    todos.push({
        id: id,
        text: this.elements.text.value,
        completed: false
    });
    saveTodos();
    this.elements.text.value = '';
    render(todos, filters)
});

searchText.addEventListener('input', function(e) {
    filters.searchText = this.value;
    render(todos, filters)
});

hideCompleted.addEventListener('change', function(e) {
    filters.completed = this.checked;
    render(todos, filters)
})