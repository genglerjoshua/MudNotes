// function for date and time
function dateFormat() {
    const timestamp = Date.now();
    const currentDate = new Date(timestamp);

    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    const hours = currentDate.getHours().toString().padStart(2, '0');
    const minutes = currentDate.getMinutes().toString().padStart(2, '0');
    const seconds = currentDate.getSeconds().toString().padStart(2, '0');

    const customFormattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

const titleInput = document.getElementById('note-title');
const noteInput = document.getElementById('note-input');
let existingNotes = [];

function exportNote() {
    localStorage.setItem('notes', JSON.stringify(existingNotes));
}

function saveNote() {
    newNote = {
        id: Date.now(),
        title: titleInput.value,
        note: noteInput.value,
        //tag input checkboxes
        // tags:
    };

    existingNotes.push(newNote);

    //save to local storaged json
    exportNote();

    titleInput.value = '';
    noteInput.value = '';

    createListFromObject();
}

function deleteNote(event, indexToRemove) {

    // Remove the parent li element of the clicked button
    // const listItem = event.target.parentNode;
    // listItem.remove();
    // remove item from existingNotes
    // indexToRemove = existingNotes.findIndex(object => object.id === `${object.id}`);
    existingNotes.splice(indexToRemove, 1);

    exportNote();
    createListFromObject();
    console.log(existingNotes);
}

// Function to create an HTML list from an object
function createListFromObject() {
    existingNotes = JSON.parse(localStorage.getItem('notes')) || [];
    const noteList = document.getElementById('note-list');

    // replacing all the menu items with nothing
    noteList.replaceChildren();

    // Loop through the array and create <li> elements
    existingNotes.forEach((object, index) => {
        // Create a new <li> element
        const liAElement = document.createElement('li');
        liAElement.className = 'list-el';
        liAElement.id = `${object.id}`;
        noteList.appendChild(liAElement);

        // Create a new <span> for the note title
        const titleElement = document.createElement('span');
        titleElement.textContent = `${object.title}`;
        titleElement.className = 'title-el';
        liAElement.appendChild(titleElement);

        // Create a new <span> for the note date which is converted from the object.id
        // Converte id to a familiar date format... see above
        const dateElement = document.createElement('span');
        dateElement.textContent = `${object.id}`;
        dateElement.className = 'date-el';
        liAElement.appendChild(dateElement);

        // Create a new <button> element
        const buttonElement = document.createElement('img');
        buttonElement.src = "/assets/img/trash-solid-white.png";
        buttonElement.height = 20;
        // buttonElement.textContent = 'Delete';
        buttonElement.className = 'delete-btn';
        liAElement.appendChild(buttonElement);

        const liBElement = document.createElement('li');
        liBElement.className = 'list-el';
        liBElement.id = `${object.id}`;
        noteList.appendChild(liBElement);

        // Create a new <span> for the note text
        const noteElement = document.createElement('span');
        noteElement.textContent = `${object.note}`;
        noteElement.className = 'note-el';
        liBElement.appendChild(noteElement);

        // Add an event listener to the button to delete the list item using a callback
        buttonElement.addEventListener('click', function (event) {
            deleteNote(event, index);
        })
    });
};

// Call the function to show saved notes
createListFromObject();
