


//? change to getElementById ?
// const filterForm = document.getElementById('tag-form')
// const checkboxFilter = filterForm.querySelectorAll('input[type="checkbox"]')

let tags = []

// Does this need to be in a seperate Component?
// function filterNotes() {
//     //get info from the type of input from the form = checkbox
//     const selectedTags = Array.from(checkboxFilter).filter(checkbox => checkbox.checked).map(checkbox => checkbox.name)
//     const filteredNotes = existingNotes.filter(note => {
//         return selectedTags.some(tag => note.tags.includes(tag))
//     });

//     //How to connect this to the App or note component?
//     if (selectedTags.length == 0) {
//         createListFromObject(existingNotes)
//     } else {
//         createListFromObject(filteredNotes)
//     }
// }

// Add event listener to reset event of the form
// filterForm.addEventListener('reset', resetFilters);

// // Function to reset the filter



function Navbar() {
    // function resetFilters() {
    //     // Uncheck all checkboxes
    //     checkboxFilter.forEach(checkbox => {
    //         checkbox.checked = false;
    //     });
    // }

    return (
        <div className="container-left">
            <a href="#top"><h1 className="logo">MudNotes</h1></a>
            <h2>Filter Tag(s)</h2>
            <form className="tag-form">
                <label className="list-group-item">
                    <input className="form-check-input" type="checkbox" name=" Claybody Recipe" onchange="filterNotes()" value="" />
                    Claybody Recipe
                </label>
                <label className="list-group-item">
                    <input className="form-check-input" type="checkbox" name=" Glaze Recipe" onchange="filterNotes()" value="" />
                    Glaze Recipe
                </label>
                <label className="list-group-item">
                    <input className="form-check-input" type="checkbox" name=" Piece Technique" onchange="filterNotes()" value="" />
                    Piece Technique
                </label>
                <label className="list-group-item">
                    <input className="form-check-input" type="checkbox" name=" Firing Schedule" onchange="filterNotes()" value="" />
                    Firing Schedule
                </label>
                <label className="list-group-item">
                    <input className="form-check-input" type="checkbox" name=" Test Tile" onchange="filterNotes()" value="" />
                    Test Tile
                </label>
                <input className="reset-btn" type="reset" value="Reset" />
            </form>

            {/* light/dark mode switch */}

            {/* <div className="btn-container">
                    <label className="switch btn-color-mode-switch">
                        <input value="1" id="color_mode" name="color_mode" type="checkbox"/>
                        <label className="btn-color-mode-switch-inner" data-off="Light" data-on="Dark" for="color_mode"></label>
                    </label> 
                </div> */}
        </div>
    )
}

function NoteInput() {
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

    // Does this need to be in a seperate Component?
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
    }

    return (
        <section className="note-form">
            <form>
                <div className="top-section-form">
                    <label for="Textarea">
                        <input className="note-title-input form" type="text" placeholder="Title" />
                    </label>
                    <div className="note-categories">
                        <p className="tag">Note Tag(s):</p>
                        <label className="tag-input">
                            <input type="checkbox" name=" Claybody Recipe" /> Claybody Recipe
                        </label>
                        <label className="tag-input">
                            <input type="checkbox" name=" Glaze Recipe" /> Glaze Recipe
                        </label>
                        <label className="tag-input">
                            <input type="checkbox" name=" Piece Technique" /> Piece Technique
                        </label>
                        <label className="tag-input">
                            <input type="checkbox" name=" Firing Schedule" /> Firing Schedule
                        </label>
                        <label className="tag-input">
                            <input type="checkbox" name=" Test Tile" /> Test Tile
                        </label>
                    </div>
                </div>
                <textarea className="note-input form" id="Textarea" rows="3" placeholder="Write Notes Here"></textarea>

                {/* change onclick to addeventlistener to run function saveNote when save button clicked*/}
                <button className="btn-save" onClick={saveNote}>Save</button>
            </form>
        </section>
    )
}

//needs to be organized and correctly styled with css classes
function Note({ item: { id, title, note, tags } }) {

    //add an eventlistener for the delete button
    // Does this need to be in a seperate Component?
    function deleteNote(event, indexToRemove) {
        existingNotes.splice(indexToRemove, 1);

        exportNotes();
    }

    return (
        <section>
            <div className="note-el-a">
                <span className="title-el">{title}</span>
                <span className="date-el">{id}</span>
                <img className="delete-btn" src={`assets/img/trash-solid-white.png`} />
            </div>
            <div className="note-el-b">
                {/* add copy to clipboard icon and functionality */}
                <span className="note-el">{note}</span>
                <span className="tags-el">{"Tags:" + `${tags}`}</span>
            </div>
        </section>
    )
}

function App() {
    let existingNotes = JSON.parse(localStorage.getItem('notes')) || []

    const notes = existingNotes.map(item => {
        return (
            <Note
                key={item.id}
                item={item}
            />
        )
    }
    )
    return (
        <div className="container-all">
            <Navbar />
            <div className="container-right">
                <NoteInput />
                <div className="note-list">
                    {notes}
                </div>
            </div>
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
)
