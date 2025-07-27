document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('input');
    const button = document.getElementById('button');
    const todo = document.getElementById('todo');
    const inputBox = document.querySelector('.inputContainer')

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    //on refresh
    tasks.forEach(task => {
        renderTask(task)
    });

    button.addEventListener('click', () => {
        let inputText = input.value.trim();
        if (!inputText) {
            inputBox.classList.add('error')
            setTimeout(() => {
                inputBox.classList.remove('error')
            }, 1000);
        }
        else {
            const newTask = {
                _id: Date.now(),
                text: inputText,
                isCompleted: false
            }

            // console.log(newTask)
            tasks.push(newTask)
            // console.log(tasks)

            saveTask();
            //save new tasks array to local storage

            renderTask(newTask);
            //render new task on screen
            input.value = " ";    //clear input box
        }
    })

    function renderTask(task) {
        const li = document.createElement('li')
        li.setAttribute("data-id", task._id);
        li.innerHTML = `
        <span>${task.text}</span>
        <button>delete</button>
        `
        if (task.isCompleted) {
            li.classList.add('completed');
        }

        //strike logic attached to task 
        //event delegation concept used
        li.addEventListener('click', (e) => {
            if (e.target.tagName === 'BUTTON') return;
            task.isCompleted = !task.isCompleted;
            li.classList.toggle('completed');
            saveTask();
        })

        //delete logic attached to task of every button
        //event bubbling concept used
        li.querySelector('button').addEventListener('click', (e) => {
            e.stopPropagation();
            tasks = tasks.filter((t) => t._id !== task._id);
            li.remove();
            saveTask();
        })

        todo.appendChild(li);

    }

    function saveTask() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

})