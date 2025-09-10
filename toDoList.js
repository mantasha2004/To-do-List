const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const toggleBtn = document.getElementById("toggle-theme");

// Add Task
function addTask() {
  if (inputBox.value === '') {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "×"; // styled delete button
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

// Toggle Check/Delete
listContainer.addEventListener("click", function(e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
}, false);

// Save to LocalStorage
function saveData() {
  localStorage.setItem("tasks", listContainer.innerHTML);
}

// Show Tasks on Load
function showTask() {
  listContainer.innerHTML = localStorage.getItem("tasks") || "";
}
showTask();

// Dark Mode Toggle
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  document.querySelector(".todo-app").classList.toggle("dark");

  // Update button text
  if (document.body.classList.contains("dark")) {
    toggleBtn.textContent = "☀ Light Mode";
    toggleBtn.classList.add("dark");
  } else {
    toggleBtn.textContent = "🌙 Dark Mode";
    toggleBtn.classList.remove("dark");
  }

  // Save theme preference
  localStorage.setItem("theme",
    document.body.classList.contains("dark") ? "dark" : "light"
  );
});

// Apply Saved Theme
if (localStorage.getItem("theme") === "dark") {
  document.body.classList.add("dark");
  document.querySelector(".todo-app").classList.add("dark");
  toggleBtn.textContent = "☀ Light Mode";
  toggleBtn.classList.add("dark");
} else {
  toggleBtn.textContent = "🌙 Dark Mode";
}
