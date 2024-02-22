// date and time
const timeStamp = Date.now();
const currentDate = new Date(timeStamp);
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const day = currentDate.getDate().toString().padStart(2, '0');
const customFormattedDate = `${month}-${day}-${year}`;

const titleInput = document.getElementById('note-title');
const noteInput = document.getElementById('note-input');

let existingNotes = [];

// Function to export the notes to the JSON
function exportNotes() {
    localStorage.setItem('notes', JSON.stringify(existingNotes));
}

// Function to create an object when you click the "save" button
function saveNote() {
    newNote = {
        id: customFormattedDate,
        title: titleInput.value,
        note: noteInput.value,
        //tag input checkboxes for future update
        // tags:
    };

    // Pushes new note to the existing notes in the JSON
    existingNotes.push(newNote);

    exportNotes();

    titleInput.value = '';
    noteInput.value = '';

    createListFromObject();
}

// Function to delete the selected note from the array of objects then saves to the JSON
function deleteNote(event, indexToRemove) {

    // Remove the parent li element of the clicked button
    // const listItem = event.target.parentNode;
    // listItem.remove();
    // remove item from existingNotes
    // indexToRemove = existingNotes.findIndex(object => object.id === `${ object.id }`);
    existingNotes.splice(indexToRemove, 1);

    exportNotes();
    createListFromObject();
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
        noteList.appendChild(liAElement);

        // Create a new <span> for the note title
        const titleElement = document.createElement('span');
        titleElement.textContent = `${object.title} `;
        titleElement.className = 'title-el';
        liAElement.appendChild(titleElement);

        // Create a new <span> for the note date
        const dateElement = document.createElement('span');
        dateElement.textContent = `${object.id} `;
        dateElement.className = 'date-el';
        liAElement.appendChild(dateElement);

        // Create a new <button> element
        const buttonElement = document.createElement('img');
        buttonElement.src = "assets/img/trash-solid-white.png";
        buttonElement.height = 20;
        buttonElement.className = 'delete-btn';
        liAElement.appendChild(buttonElement);

        const liBElement = document.createElement('li');
        liBElement.className = 'list-el';
        noteList.appendChild(liBElement);

        // Create a new <span> for the note text
        const noteElement = document.createElement('span');
        noteElement.textContent = `${object.note} `;
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
console.log(existingNotes);