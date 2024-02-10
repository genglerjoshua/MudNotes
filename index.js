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
    const menuList = document.getElementById('menu-list');
    // replacing all the menu items with nothing
    menuList.replaceChildren();
    // Loop through the array and create <li> elements
    existingNotes.forEach((object, index) => {
        // Create a new <li> element
        const liElement = document.createElement('li');
        liElement.className = 'd-inline-flex flex-row justify-content-between';
        liElement.id = `${object.id}`;
        menuList.appendChild(liElement);

        // Create a new <span> for the text
        const spanElement = document.createElement('span');
        spanElement.textContent = `${object.title}`;
        spanElement.className = 'span-elem d-inline-flex';
        liElement.appendChild(spanElement);

        // Create a new <button> element
        const buttonElement = document.createElement('img');
        buttonElement.src = "/assets/img/trash-solid-white.png";
        buttonElement.height = 20;
        // buttonElement.textContent = 'Delete';
        buttonElement.className = 'delete-btn d-inline-flex';
        liElement.appendChild(buttonElement);

        // Add an event listener to the button to delete the list itemusing a callback
        buttonElement.addEventListener('click', function (event) {
            deleteNote(event, index);
        })
    });
};

// Call the function to show saved notes
createListFromObject();
