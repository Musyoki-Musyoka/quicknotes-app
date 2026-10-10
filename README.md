# QuickNotes

QuickNotes is a small note-taking app built with HTML, CSS and JavaScript for Web Foundations Project 1. It lets you keep short ideas, reminders and study notes in one place, organise them as Personal, Work or Study, and find them with a text search. Notes are saved in the current browser using localStorage, so they are still there after a refresh.

## Features

- Add notes of up to 200 characters with a category and a readable creation date and time.
- Display Personal, Work and Study notes with different category labels and border colours.
- Delete individual notes.
- Show clear messages for empty notes and notes longer than 200 characters.
- Search note text as you type, without worrying about capital letters.
- Show the correct total count for zero, one or several notes.
- Save and load notes using localStorage and JSON.
- Stack the form controls on screens 600px wide or smaller.
- Use linked labels, visible keyboard focus and plain-text rendering of note content.

## Run locally

1. Download this repository, or clone it and open its folder in VS Code.
2. Right-click `index.html` and choose **Open with Live Server** if you have that extension installed.
3. Use the page opened by Live Server. No build step or npm packages are needed.

Alternatively, if Python is installed, open a terminal in the project folder and run:

```bash
python -m http.server 8000
```

Open `http://localhost:8000` in your browser. On systems where the command is `python3`, use `python3 -m http.server 8000` instead. Stop the server with Ctrl+C.

Use the same browser and local address when testing persistence: browser storage belongs to an origin, which includes the port. Moving from Live Server to a different server address does not move the saved notes.

## Using the app

Type a note, choose a category and click **Add Note**, or press Enter in the note input. Search by entering a word or phrase in **Search notes**; clearing the search shows all notes again. The count always shows the total number of saved notes, even while the list is filtered. Click **Delete** on a card to remove that note.

The app stores only your notes, under the key `quicknotes-app-notes`. It starts with an empty list. Saved notes belong to this browser on this device; they do not sync to another device and will be lost if browser storage is cleared. If storage is unavailable or saved data cannot be read, the app displays a warning instead of failing silently. Do not use it for passwords or other secrets.

## What I learned

- How to select HTML elements with `querySelector` and handle form submissions with `addEventListener` and `preventDefault`.
- How to keep the notes array as the source of truth and rebuild the displayed list in one `render()` function.
- How to use `createElement` and `textContent` to display user input without treating it as HTML.
- How `JSON.stringify` and `JSON.parse` make it possible to store an array of objects in localStorage.
- How Flexbox, category classes and a media query can make the same form work on desktop and small screens.

## Files

- `index.html` — page structure, form, search box and notes list.
- `style.css` — layout, note cards, category styles and responsive rules.
- `script.js` — validation, rendering, add/delete, search and browser storage.
- `README.md` — project overview and local run instructions.
