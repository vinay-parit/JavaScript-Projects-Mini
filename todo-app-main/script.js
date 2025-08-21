let body = document.querySelector("body");
let dark = document.querySelector(".dark");
let light = document.querySelector(".light");
let sun = document.querySelector(".sun");
let moon = document.querySelector(".moon");
let input = document.querySelector("#input");
let todolist = document.querySelector(".todo-list");
let counter = document.querySelector(".counter");
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
  // todoItem.style.backgroundColor = "var(--Gray-300)"

  let todoItems = document.querySelectorAll(".todoItem");
  todoItems.forEach((item) => {
    item.style.backgroundColor = "var(--Gray-50)";
    item.style.color = "black";
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
  input.style.color = "white";
  // todoItem.style.backgroundColor = "var(--Navy-900)";

  let todoItems = document.querySelectorAll(".todoItem");
  todoItems.forEach((item) => {
    item.style.backgroundColor = "var(--Navy-900)";
    item.style.color = "white";
  });
});

function updateCounter() {
  let itemsLeft = totalTodo - completTodo;
  let text = itemsLeft + "item";
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
    todoItem.className = "todoItem";

    let todoText = document.createElement("span");
    todoText.textContent = input.value;

    if (isDarkMode) {
      todoItem.style.backgroundColor = "var(--Navy-900)";
      todoItem.style.color = "white";
    } else {
      todoItem.style.backgroundColor = "var(--Gray-50)";
      todoItem.style.color = "black";
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
        todoText.style.opacity = "0.2";

        completTodo++;
      } else {
        let checkIcon = circle.querySelector(".check-icon");
        checkIcon.remove();
        todoText.style.textDecoration = "none";
        todoText.style.opacity = "1";
        circle.style.backgroundColor = "transparent";

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

    todoItem.appendChild(circle);
    todoItem.appendChild(todoText);
    todoItem.appendChild(crossImg);
    todolist.appendChild(todoItem);

    input.value = "";
  }
});
