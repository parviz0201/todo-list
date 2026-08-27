const form = document.querySelector(".todo-form");
const input = document.querySelector(".todo-input");
const todoList = document.querySelector(".todo-list");

const filters = document.querySelectorAll(".filter");

const totalCount = document.querySelector(".stats p:nth-child(1) span");
const completedCount = document.querySelector(".stats p:nth-child(2) span");
const activeCount = document.querySelector(".stats p:nth-child(3) span");




let todos = JSON.parse(localStorage.getItem("todos")) || [];




function updateStats() {

    const total = todos.length;

    const completed = todos.filter(function(todo) {
        return todo.completed === true;
    }).length;

    const active = total - completed;


    totalCount.textContent = total;
    completedCount.textContent = completed;
    activeCount.textContent = active;
}



function saveTodos() {

    localStorage.setItem("todos", JSON.stringify(todos));

}



function renderTodos() {

    todoList.innerHTML = "";


    todos.forEach(function(todo, index) {

        const li = document.createElement("li");

        li.classList.add("todo-item");


        if (todo.completed) {
            li.classList.add("completed");
        }


        li.innerHTML = `
            <span>${todo.text}</span>
            <button class="delete-btn">Delete</button>
        `;


    
        li.addEventListener("click", function() {

            todo.completed = !todo.completed;

            saveTodos();

            renderTodos();

        });


        // Delete
        const deleteBtn = li.querySelector(".delete-btn");

        deleteBtn.addEventListener("click", function(event) {

            event.stopPropagation();

            todos.splice(index, 1);

            saveTodos();

            renderTodos();

        });


        todoList.appendChild(li);

    });


    updateStats();

}




form.addEventListener("submit", function(event) {

    event.preventDefault();


    const taskText = input.value.trim();


    if (taskText === "") {

        alert("Please enter a task!");

        return;

    }


    const newTodo = {

        text: taskText,

        completed: false

    };


    todos.push(newTodo);


    saveTodos();

    renderTodos();


    input.value = "";

});




filters.forEach(function(filter) {

    filter.addEventListener("click", function() {

        const filterName = filter.textContent;


        

        filters.forEach(function(button) {

            button.classList.remove("active");

        });


        filter.classList.add("active");


        const todoItems = document.querySelectorAll(".todo-item");


        todoItems.forEach(function(item, index) {

            const todo = todos[index];


            if (filterName === "All") {

                item.style.display = "flex";

            }

            else if (filterName === "Active") {

                if (todo.completed) {

                    item.style.display = "none";

                }

                else {

                    item.style.display = "flex";

                }

            }

            else if (filterName === "Completed") {

                if (todo.completed) {

                    item.style.display = "flex";

                }

                else {

                    item.style.display = "none";

                }

            }

        });

    });

});



renderTodos();