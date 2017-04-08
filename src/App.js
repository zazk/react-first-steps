import React, { Component } from 'react';
import './App.css';

let CSSlayout = "demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header";
let CSSheader = "mdl-layout__header mdl-color-text--white mdl-color--primary";
let CSSheaderBox = "mdl-layout__header mdl-color-text--white mdl-color--primary";
let CSSheaderTitle = "mdl-layout__header-row mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop";
let CSSmainBox = "mdl-layout__content mdl-color--grey-100";
let CSSnotesBox = "mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid";

let CSSnotesCell = "mdl-card mdl-shadow--2dp mdl-cell"; 
let CSSnotesTitle= "mdl-card__title mdl-color--blue-grey-200"; 
let CSSnotesCard = "mdl-card__title-text"; 
let CSSnotesBoxIcon = "mdl-card__supporting-text mdl-color-text--grey-600"; 
let CSSnotesBoxMessage = "mdl-textfield mdl-js-textfield mdl-textfield--floating-label"; 
let CSSnotesBoxInput = "mdl-textfield__input"; 
let CSSnotesBoxLabel = "mdl-textfield__label" ; 
let CSSnotesButton = "mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--color"; 
let CSSnotesBoxTitle = "mdl-card mdl-shadow--2dp mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop"; 




// A Sticky Note custom element that extends HTMLElement.
class StickyNote extends HTMLElement{

    // Fires when an instance of the element is created.
    createdCallback() {
        this.classList.add( ...StickyNote.CLASSES);
        this.innerHTML = StickyNote.TEMPLATE; 
        this.messageElement = this.querySelector('.message');
        this.dateElement = this.querySelector('.date');
        this.deleteButton = this.querySelector('.delete');
        this.deleteButton.addEventListener('click', () => this.deleteNote() );
    }

    // Fires when an attribute of the element is added/deleted/modified.
    attributeChangedCallback(attributeName) {
        // We display/update the created date message if the id changes.
        if (attributeName === 'id') {
            let date;
            if (this.id) {
                date = new Date( parseInt(this.id,10) );
            } else {
                date = new Date();
            }
            let dateFormatOptions = {day:'numeric',month:'short'};
            let shortDate= new Intl.DateTimeFormat('en-US',dateFormatOptions).format(date);
            this.dateElement.textContent = `Created on  ${shortDate}`;
        }
    }

    // Sets the message of the note.
    setMessage(message) {
        this.messageElement.textContent = message;
        // Replace all line breaks by <br>.
        this.messageElement.innerHTML = this.messageElement.innerHTML.replace(/\n/g, '<br>');
    }

    // Deletes the note by removing the element from the DOM and the data from localStorage.
    deleteNote() {
        localStorage.removeItem(this.id);
        this.parentNode.removeChild(this);
    }
}


// Initial content of the element.
StickyNote.TEMPLATE =`
<div class="message"></div>
<div class="date"></div>
<button class="delete mdl-button mdl-js-button mdl-js-ripple-effect">
    Delete
</button>`;

// StickyNote elements top level style classes.
StickyNote.CLASSES = ['mdl-cell--4-col-desktop', 'mdl-card__supporting-text', 'mdl-cell--12-col',
'mdl-shadow--2dp', 'mdl-cell--4-col-tablet', 'mdl-card', 'mdl-cell', 'sticky-note'];


class App extends Component {

    constructor(){
        super();
        // Shortcuts to DOM Elements.
        this.notesContainer = document.getElementById('notes-container');
        this.noteMessageInput = document.getElementById('message');
        this.addNoteButton = document.getElementById('save');
        this.notesSectionTitle = document.getElementById('notes-section-title');

        // Loads all the notes.
        for (let key in localStorage) {
            this.displayNote(key, localStorage[key]);
        }

        // Listen for updates to notes from other windows.
        window.addEventListener('storage', e=> this.displayNote(e.key, e.newValue) );

    }

    // Resets the given MaterialTextField.
    resetMaterialTextfield(element) {
      console.log("Gey Reset");
        element.value = '';
        element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
        element.blur(); 
    }

    // Creates/updates/deletes a note in the UI.
    displayNote (key, message) {
        let note = document.getElementById(key); 
        // If no element with the given key exists we create a new note.
        if (!note) {
            note = document.createElement('sticky-note');
            let title = document.getElementById('notes-section-title'); 
            let cont = document.getElementById('notes-container')

            note.id = key;
            //cont.insertBefore(note, title.nextSibling);
        }
        // If the message is null we delete the note.
        if (!message) {
            return note.deleteNote();
        }
        note.setMessage(message);
    }

    // Saves a new sticky note on localStorage.
    saveNote() {                        
        console.log("Save Note ");
        let input = document.getElementById('message');

        if (input.value) {

            let key = Date.now().toString();
            localStorage.setItem(key, input.value );
                
            console.log("Save on Local Storage ",localStorage);
            this.displayNote(key, input.value );
            this.resetMaterialTextfield( input );
            this.toggleButton(); 
        }
    }  

    // Enables or disables the submit button depending on the values of the input field.
    toggleButton() {
            
        let input = document.getElementById('message');
        let button = document.getElementById('save');
        if (input.value) {
            button.removeAttribute('disabled');
        } else {
            button.setAttribute('disabled', 'true');
        }
    }  

    render() {
      return (
        <div className={CSSlayout}>
            <header className={CSSheader}>
              <div className={CSSheaderBox}>
                <div className={CSSheaderTitle}>
                  <h3><i className="material-icons">chrome_reader_mode</i> Simple Sticky Notes</h3>
                </div>
              </div>
            </header> 
            <main className={CSSmainBox}>
              <div id="notes-container" className={CSSnotesBox}>
                <div className={CSSnotesCell}>
                  <div className={CSSnotesTitle}>
                    <h2 className={CSSnotesCard}>Add new note</h2>
                  </div>
                  <div className={CSSnotesBoxIcon}>
                      <div className={CSSnotesBoxMessage}>
                        <textarea className={CSSnotesBoxInput} rows="3" id="message"  onKeyUp={this.toggleButton}></textarea>
                        <label className={CSSnotesBoxLabel} htmlFor="message">Message text...</label>
                      </div>
                      <a id="save" onClick={this.saveNote.bind(this)} disabled className={CSSnotesButton} > 
                        Add
                      </a>
                  </div>
                </div>  

                <div id="notes-section-title" className={CSSnotesBoxTitle} >
                  <div className={CSSnotesTitle}>
                    <h2 className={CSSnotesCard}>Your sticky notes</h2>
                  </div>
                </div>
              </div>
            </main>

        </div>

      );
    }
}

export default App;
