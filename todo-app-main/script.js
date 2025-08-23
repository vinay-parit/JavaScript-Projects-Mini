let body = document.querySelector("body");
let dark = document.querySelector(".dark");
let light = document.querySelector(".light");
let sun = document.querySelector(".sun");
let moon = document.querySelector(".moon");
let input = document.querySelector("#input");
let todolist = document.querySelector(".todo-list");
let counter = document.querySelector(".counter");
let content = document.querySelector(".content");
let filter = document.querySelector(".filter");
let ClearCompletedBtn = document.querySelector(".Clear-completed");
let activeBtn = document.querySelector(".active")
let allBtn = document.querySelector(".all")
let completedBtn = document.querySelector(".completed");

let totalTodo = 0;
let completTodo = 0;
let isDarkMode = true;

// chatGpt code
// sun.addEventListener("click", () => {
//   body.classList.remove("dark-theme");
//   body.classList.add("light-theme");

//   sun.style.display = "none";
//   moon.style.display = "block";
//   light.style.display = "block";
//   dark.style.display = "none";
// });

// moon.addEventListener("click", () => {
//   body.classList.remove("light-theme");
//   body.classList.add("dark-theme");

//   moon.style.display = "none";
//   sun.style.display = "block";
//   light.style.display = "none";
//   dark.style.display = "block";
// });

sun.addEventListener("click", () => {
  isDarkMode = false;
  body.style.backgroundColor = "var(--Gray-50)";
  moon.style.display = "block";
  sun.style.display = "none";
  light.style.display = "block";
  dark.style.display = "none";
  input.style.backgroundColor = "var(--Gray-50)";
  input.style.color = "var(--Navy-850)";
  todolist.style.boxShadow = "10px 20px 50px var(--Gray-300)";
  content.style.boxShadow = "10px 20px 50px var(--Gray-300)";
  content.style.backgroundColor = "var(--Gray-50)";
  counter.style.color = "var(--Navy-850)"
  allBtn.style.color = "var(--Navy-850)";
  activeBtn.style.color = "var(--Navy-850)";
  completedBtn.style.color = "var(--Navy-850)";
  ClearCompletedBtn.style.color = "var(--Navy-850)";



  // todoItem.style.backgroundColor = "var(--Gray-300)"

  let todoItems = document.querySelectorAll(".todoItem");
  todoItems.forEach((item) => {
    item.style.backgroundColor = "var(--Gray-50)";
    item.style.color = "var(--Navy-850)";
  });
});

moon.addEventListener("click", () => {
  isDarkMode = true;
  body.style.backgroundColor = "var(--Navy-950)";
  sun.style.display = "block";
  moon.style.display = "none";
  light.style.display = "none";
  dark.style.display = "block";
  input.style.backgroundColor = "var(--Navy-900)";
  input.style.color = "var(--Purple-100)";
    todolist.style.boxShadow = "none";
    content.style.boxShadow = "none";
  content.style.backgroundColor = "var(--Navy-900)";
  counter.style.color = "var(--Purple-300)";
  allBtn.style.color = "var(--Purple-300)";
  activeBtn.style.color = "var(--Purple-300)";
  completedBtn.style.color = "var(--Purple-300)";
  ClearCompletedBtn.style.color = "var(--Purple-300)";



  // todoItem.style.backgroundColor = "var(--Navy-900)";

  let todoItems = document.querySelectorAll(".todoItem");
  todoItems.forEach((item) => {
    item.style.backgroundColor = "var(--Navy-900)";
    item.style.color = "var(--Purple-300)";
  });
});

function updateCounter() {
  let itemsLeft = totalTodo - completTodo;
  let text = itemsLeft + " item";
  if (itemsLeft !== 1) {
    text += "s";
  }
  text += " left";

  counter.textContent = text;
}

input.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    if (input.value.trim() === "") return;

    let circle = document.createElement("div");
    circle.style.cursor = "pointer";
    circle.className = "circle";

    let todoItem = document.createElement("div");
    todoItem.setAttribute("data-completed", "false");
    todoItem.className = "todoItem";
    content.style.display = "block"
    content.style.display = "flex"

    let todoText = document.createElement("span");
    todoText.textContent = input.value;

    if (isDarkMode) {
      todoItem.style.backgroundColor = "var(--Navy-900)";
      todoItem.style.color = "white";
    } else {
      todoItem.style.backgroundColor = "var(--Gray-50)";
      todoItem.style.color = "var(--Navy-850)";

      
    }

    totalTodo++;
    updateCounter();

    circle.addEventListener("click", () => {
      if (!circle.querySelector(".check-icon")) {

        let checkImg = document.createElement("img");
        checkImg.src = "/images/icon-check.svg";
        checkImg.alt = "check-icon";
        checkImg.className = "check-icon";
        circle.style.backgroundColor = "pink";
        circle.appendChild(checkImg);
        todoText.style.textDecoration = "line-through";
        todoText.style.opacity = "0.4";
        todoItem.setAttribute("data-completed", "true");

        completTodo++;
      } else {
        let checkIcon = circle.querySelector(".check-icon");
        checkIcon.remove();
        todoText.style.textDecoration = "none";
        todoText.style.opacity = "1";
        circle.style.backgroundColor = "transparent";
        todoItem.setAttribute("data-completed", "false");

        completTodo--;
      }
      
      updateCounter();
    });

    let crossImg = document.createElement("img");
    crossImg.src = "/images/icon-cross.svg";
    crossImg.alt = "cross-icon";
    crossImg.className = "cross-icon";
    crossImg.style.display = "none";

    crossImg.addEventListener("click", (e) => {
      e.stopPropagation();
      totalTodo--;
      if (circle.querySelector(".check-icon")) {
        completTodo--;
      }
      todoItem.remove();
      updateCounter();
    });

    todoItem.addEventListener("mouseenter", () => {
      crossImg.style.display = "block";
    });

    todoItem.addEventListener("mouseleave", () => {
      crossImg.style.display = "none";
    });

    ClearCompletedBtn.addEventListener("click", ()=>{
      if(circle.querySelector(".check-icon")){
        todoItem.remove()
      }
    })

    activeBtn.addEventListener("click", ()=>{
       todoItem.filter((todo, index)=>{
        if (circle.querySelector(".check-icon")) {
          console.log(todoItem);
        }
       })

    })


    todoItem.appendChild(circle);
    todoItem.appendChild(todoText);
    todoItem.appendChild(crossImg);
    todolist.appendChild(todoItem);

    input.value = "";
  }
});


allBtn.addEventListener("click", () => {
  let allTodos = document.querySelectorAll(".todoItem");
  allTodos.forEach((todo) => {
    todo.style.display = "flex";
  });
});


activeBtn.addEventListener("click", () => {
  let allTodos = document.querySelectorAll(".todoItem");
  allTodos.forEach((todo) => {
    if (todo.getAttribute("data-completed") === "true") {
      todo.style.display = "none";
    } else {
      todo.style.display = "flex";
    }
  });
});


completedBtn.addEventListener("click", () => {
  let allTodos = document.querySelectorAll(".todoItem");
  allTodos.forEach((todo) => {
    if (todo.getAttribute("data-completed") === "true") {
      todo.style.display = "flex";
    } else {
      todo.style.display = "none";
    }
  });
});
