const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categoryInput = document.querySelector("#note-category");
const list = document.querySelector("#notes-list");
const count = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");

const categoryLabels = {
  personal: "Personal",
  work: "Work",
  study: "Study",
};

let notes = [];

function updateCount() {
  if (notes.length === 0) {
    count.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    count.textContent = "You have 1 note.";
  } else {
    count.textContent = `You have ${notes.length} notes.`;
  }
}

function render() {
  list.replaceChildren();
  notes.forEach((note) => {
    const li = document.createElement("li");
    li.classList.add("note", `category-${note.category}`);

    const body = document.createElement("div");
    body.classList.add("note-body");

    const text = document.createElement("p");
    text.classList.add("note-text");
    text.textContent = note.text;

    const meta = document.createElement("div");
    meta.classList.add("note-meta");

    const category = document.createElement("span");
    category.classList.add("note-category");
    category.textContent = categoryLabels[note.category];

    const date = document.createElement("span");
    date.classList.add("note-date");
    date.textContent = note.createdAt;

    const del = document.createElement("button");
    del.type = "button";
    del.textContent = "Delete";
    del.classList.add("delete-btn");
    del.setAttribute("aria-label", `Delete note: ${note.text}`);
    del.addEventListener("click", () => deleteNote(note.id));

    meta.appendChild(category);
    meta.appendChild(date);
    body.appendChild(text);
    body.appendChild(meta);
    li.appendChild(body);
    li.appendChild(del);
    list.appendChild(li);
  });

  if (notes.length === 0) {
    const message = document.createElement("li");
    message.classList.add("empty-message");
    message.textContent = "Your notes will appear here.";
    list.appendChild(message);
  }

  updateCount();
}

function addNote(text, category) {
  notes.push({
    id: crypto.randomUUID(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  });
  render();
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  render();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    input.setAttribute("aria-invalid", "true");
    input.focus();
    return;
  }

  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    input.setAttribute("aria-invalid", "true");
    input.focus();
    return;
  }

  errorMessage.textContent = "";
  input.removeAttribute("aria-invalid");
  addNote(text, categoryInput.value);
  input.value = "";
  input.focus();
});

render();
