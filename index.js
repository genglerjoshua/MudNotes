// date and time
const timeStamp = Date.now();
const currentDate = new Date(timeStamp);
const year = currentDate.getFullYear();
const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
const day = currentDate.getDate().toString().padStart(2, '0');
const customFormattedDate = `${month}-${day}-${year}`;

const titleInput = document.getElementById('note-title-input');
const noteInput = document.getElementById('note-input');
const checkboxInput = document.querySelectorAll('#note-categories input[type="checkbox"]');

let tags = [];

existingNotes = JSON.parse(localStorage.getItem('notes')) || [];

// Function to export the notes to the JSON
function exportNotes() {
    localStorage.setItem('notes', JSON.stringify(existingNotes));
}


// Function to create an object when you click the "save" button
function saveNote() {

    checkboxInput.forEach(function (checkbox) {
        if (checkbox.checked) {
            tags.push(checkbox.name);
        }
    });

    newNote = {
        id: customFormattedDate,
        title: titleInput.value,
        note: noteInput.value,
        tags: tags
    };


    // Pushes new note to the existing notes in the JSON
    existingNotes.push(newNote);

    exportNotes();

    // resets input note form
    titleInput.value = '';
    noteInput.value = '';

    checkboxInput.forEach(checkbox => {
        checkbox.checked = false;
    });

    createListFromObject(existingNotes);
}


// Function to delete the selected note from the array of objects then saves to the JSON
function deleteNote(event, indexToRemove) {
    existingNotes.splice(indexToRemove, 1);

    exportNotes();
    createListFromObject(existingNotes);
}


// Function to display notes with certain tags as filtered by left container tags checkbox form
const filterForm = document.getElementById('tag-form');
const checkboxFilter = filterForm.querySelectorAll('input[type="checkbox"]');

function filterNotes() {
    //get info from the type of input from the form = checkbox
    const selectedTags = Array.from(checkboxFilter).filter(checkbox => checkbox.checked).map(checkbox => checkbox.name);
    console.log(selectedTags);
    const filteredNotes = existingNotes.filter(note => {
        return selectedTags.some(tag => note.tags.includes(tag));
    });

    if (selectedTags.length == 0) {
        createListFromObject(existingNotes);
    } else {
        createListFromObject(filteredNotes);
    }
}


// Add event listener to reset event of the form
filterForm.addEventListener('reset', resetFilters);

// Function to reset the filter
function resetFilters() {
    // Uncheck all checkboxes
    checkboxFilter.forEach(checkbox => {
        checkbox.checked = false;
    });

    createListFromObject(existingNotes);
}


// Function to create an HTML list from an object
function createListFromObject(existingNotes) {

    const noteList = document.getElementById('note-list');

    // replacing all the menu items with nothing
    noteList.replaceChildren();

    // Loop through the array and create <li> elements
    existingNotes.forEach((object, index) => {

        // Create a new div to attach group (liAElement and liBElement) to noteList
        const divElements = document.createElement('div');
        divElements.className = 'li-group';
        noteList.appendChild(divElements);

        // Create a new <li> elements
        const liAElement = document.createElement('li');
        liAElement.className = 'list-el-a';
        divElements.appendChild(liAElement);

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
        buttonElement.className = 'delete-btn';
        liAElement.appendChild(buttonElement);

        const liBElement = document.createElement('li');
        liBElement.className = 'list-el-b';
        divElements.appendChild(liBElement);

        // Create a new <span> for the note text
        const noteElement = document.createElement('span');
        noteElement.textContent = `${object.note} `;
        noteElement.className = 'note-el';
        liBElement.appendChild(noteElement);

        // Create a new <span> for the tags text
        const tagsElement = document.createElement('span');
        tagsElement.textContent = "Tags:" + `${object.tags}`;
        tagsElement.className = 'tags-el';
        liBElement.appendChild(tagsElement);

        // Add an event listener to the button to delete the list item using a callback
        buttonElement.addEventListener('click', function (event) {
            deleteNote(event, index);
        })
    });
};

createListFromObject(existingNotes);