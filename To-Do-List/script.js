document.addEventListener("DOMContentLoaded", function() {
    let form = document.querySelector("form");
    let main = document.querySelector(".container2");

    form.addEventListener("submit", (event) => {
        let task = event.target.task.value;
        let dis = event.target.dis.value;

        let userData = JSON.parse(localStorage.getItem("ToDo")) ?? [];
        userData.push({
            'task': task,
            'dis': dis
        });

        localStorage.setItem("ToDo", JSON.stringify(userData));
        displayData();
        event.preventDefault();
    });

    let displayData = () => {
        let userData = JSON.parse(localStorage.getItem("ToDo")) ?? [];
        let finalData = '';
        userData.forEach((element, i) => {
            finalData += `<div class="card mt-4">
                <span class="close-btn" data-index="${i}">&times;</span>
                <h5>Task</h5>
                <div>${element.task}</div>
                <h5>Description</h5>
                <div>${element.dis}</div>
            </div>`;
        });
        main.innerHTML = finalData;
        attachCloseEvents();
    };

    let attachCloseEvents = () => {
        document.querySelectorAll('.close-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                let index = event.target.getAttribute('data-index');
                let userData = JSON.parse(localStorage.getItem("ToDo"));
                userData.splice(index, 1);
                localStorage.setItem("ToDo", JSON.stringify(userData));
                displayData();
            });
        });
    };

    displayData();
});
