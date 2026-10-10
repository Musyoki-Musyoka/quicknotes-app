const form = document.querySelector("#note-form");
const input = document.querySelector("#note-input");
const categoryInput = document.querySelector("#note-category");
const searchInput = document.querySelector("#search-input");
const list = document.querySelector("#notes-list");
const count = document.querySelector("#note-count");
const errorMessage = document.querySelector("#error-message");
const storageMessage = document.querySelector("#storage-message");

const STORAGE_KEY = "quicknotes-app-notes";
const categoryLabels = {
  personal: "Personal",
  work: "Work",
  study: "Study",
};

let notes = loadNotes();

function isSavedNote(note) {
  return (
    note !== null &&
    typeof note === "object" &&
    typeof note.id === "string" &&
    typeof note.text === "string" &&
    note.text.trim().length > 0 &&
    note.text.length <= 200 &&
    ["personal", "work", "study"].includes(note.category) &&
    typeof note.createdAt === "string"
  );
}

function loadNotes() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === null) return [];

    const loaded = JSON.parse(saved);
    if (!Array.isArray(loaded) || !loaded.every(isSavedNote)) {
      throw new Error("Saved notes have an unexpected format.");
    }
    return loaded;
  } catch (error) {
    storageMessage.textContent =
      "Saved notes could not be loaded. You can still add notes for this visit.";
    console.warn("Could not load notes:", error);
    return [];
  }
}

function saveNotes() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
    storageMessage.textContent = "";
  } catch (error) {
    storageMessage.textContent =
      "Your browser could not save these notes. They may not survive a refresh.";
    console.warn("Could not save notes:", error);
  }
}

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
  const search = searchInput.value.trim().toLowerCase();
  const visibleNotes = notes.filter((note) =>
    note.text.toLowerCase().includes(search)
  );

  visibleNotes.forEach((note) => {
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

  if (visibleNotes.length === 0) {
    const message = document.createElement("li");
    message.classList.add("empty-message");
    message.textContent = search
      ? "No notes match your search."
      : "Your notes will appear here.";
    list.appendChild(message);
  }

  // This is the total saved-note count, not just the search results.
  updateCount();
}

function addNote(text, category) {
  notes.push({
    id: crypto.randomUUID(),
    text: text,
    category: category,
    createdAt: new Date().toLocaleString(),
  });
  saveNotes();
  render();
}

function deleteNote(id) {
  notes = notes.filter((note) => note.id !== id);
  saveNotes();
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

searchInput.addEventListener("input", render);

render();
