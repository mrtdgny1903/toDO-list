// Görevler tarayıcının localStorage'ında saklanır; sayfa yenilense de kaybolmaz.
const STORAGE_KEY = "todos";

let todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
let filter = "all";

const form = document.getElementById("todo-form");
const input = document.getElementById("todo-input");
const dateInput = document.getElementById("todo-date");
const list = document.getElementById("todo-list");
const counter = document.getElementById("counter");
const clearDone = document.getElementById("clear-done");
const filterButtons = document.querySelectorAll(".filters button");

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// Bugünün tarihini yerel saatle "YYYY-MM-DD" biçiminde döndürür.
function todayStr() {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// "2026-11-12" -> "12 Kas"
function formatDate(str) {
  const [y, m, d] = str.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "short",
  });
}

// Tarih etiketini yerinde bir tarih seçiciye çevirir.
// Seçim yapılınca veya alandan çıkılınca kaydeder, Esc ile vazgeçer.
// Tarih alanı temizlenirse görevin tarihi kaldırılır.
function editDue(todo, label) {
  const picker = document.createElement("input");
  picker.type = "date";
  picker.className = "due-picker";
  picker.value = todo.due || "";
  label.replaceWith(picker);
  picker.focus();
  try {
    picker.showPicker();
  } catch {
    // showPicker desteklenmiyorsa kullanıcı alana tıklayarak seçebilir.
  }

  let finished = false;
  const finish = (commit) => {
    if (finished) return;
    finished = true;
    if (commit) {
      todo.due = picker.value || null;
      save();
    }
    render();
  };

  picker.addEventListener("change", () => finish(true));
  picker.addEventListener("blur", () => finish(true));
  picker.addEventListener("keydown", (e) => {
    if (e.key === "Enter") finish(true);
    if (e.key === "Escape") finish(false);
  });
}

function render() {
  list.innerHTML = "";

  const visible = todos.filter((t) =>
    filter === "active" ? !t.done : filter === "done" ? t.done : true
  );

  for (const todo of visible) {
    const li = document.createElement("li");
    if (todo.done) li.classList.add("done");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.addEventListener("change", () => {
      todo.done = checkbox.checked;
      save();
      render();
    });

    const text = document.createElement("span");
    text.textContent = todo.text;

    li.append(checkbox, text);

    const due = document.createElement("span");
    due.className = "due";
    due.title = "Tarihi değiştirmek için tıkla";
    if (todo.due) {
      const today = todayStr();
      if (todo.due < today) {
        due.classList.add("overdue");
        due.textContent = `${formatDate(todo.due)} · gecikti`;
      } else if (todo.due === today) {
        due.classList.add("today");
        due.textContent = "Bugün";
      } else {
        due.textContent = formatDate(todo.due);
      }
    } else {
      due.classList.add("empty");
      due.textContent = "+ Tarih";
    }
    due.addEventListener("click", () => editDue(todo, due));
    li.appendChild(due);

    const del = document.createElement("button");
    del.className = "delete";
    del.textContent = "✕";
    del.title = "Sil";
    del.addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== todo.id);
      save();
      render();
    });

    li.appendChild(del);
    list.appendChild(li);
  }

  const remaining = todos.filter((t) => !t.done).length;
  counter.textContent = `${remaining} görev kaldı`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  todos.push({ id: Date.now(), text, done: false, due: dateInput.value || null });
  input.value = "";
  dateInput.value = "";
  save();
  render();
});

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filter = btn.dataset.filter;
    filterButtons.forEach((b) => b.classList.toggle("active", b === btn));
    render();
  });
});

clearDone.addEventListener("click", () => {
  todos = todos.filter((t) => !t.done);
  save();
  render();
});

render();
