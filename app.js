function Navbar() {
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

function Notes() {
    return (
        <div className="container-right">
            <section>
                <form className="note-form">
                    <div className="top-section-form">
                        <label for="Textarea1">
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
                    <textarea className="note-input form" id="Textarea1" rows="3" placeholder="Write Notes Here"></textarea>
                    <button className="btn-save" onclick="saveNote()">Save</button>
                </form>
            </section>
            <section>
                <ul className="note-list">
                    {/* Add a copy to clipboard feature for each note... small copy button in the top right corner of text box */}
                </ul>
            </section>
        </div>
    )
}

function App() {
    return (
        <div className="container-all">
            <Navbar />
            <Notes />
        </div>
    )
}

ReactDOM.render(
    <App />,
    document.getElementById("root")
)
