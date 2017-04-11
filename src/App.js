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

let CSSsticky = 'mdl-cell--4-col-desktop mdl-card__supporting-text mdl-cell--12-col mdl-shadow--2dp mdl-cell--4-col-tablet mdl-card mdl-cell sticky-note';

class StickyNote extends Component{


    componentDidMount (){
      this.messageElement = this.refs.message;
      this.dateElement = this.refs.date;
      this.deleteButton = this.refs.delete;
      this.deleteButton.addEventListener('click', () => this.deleteNote() );
    }


    // Deletes the note by removing the element from the DOM and the data from localStorage.
    deleteNote() {
        localStorage.removeItem(this.id);
        this.parentNode.removeChild(this);
    }
    render(){
      return(
        <div className={CSSsticky}>
          <div className="message" ref="message">{this.props.message}</div>
          <div className="date" ref="date">{this.props.date}</div>
          <button className="delete mdl-button mdl-js-button mdl-js-ripple-effect" ref="delete">
              Delete
          </button>
        </div>
      )
    }
}

class App extends Component {
 
    
    componentDidMount(){

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
        console.log("Gay Reset");
        element.value = '';
        element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
        element.blur(); 
    }
    // Fires when an attribute of the element is added/deleted/modified.
    parseDateNote(key) {
        // We display/update the created date message if the id changes.
        let date;
        if (key) {
            date = new Date( parseInt(key,10) );
        } else {
            date = new Date();
        }
        let dateFormatOptions = {day:'numeric',month:'short'};
        let shortDate= new Intl.DateTimeFormat('en-US',dateFormatOptions).format(date);
        return `Created on  ${shortDate}`;
    }
 

    // Creates/updates/deletes a note in the UI.
    displayNote (key, message) {
        let note = document.getElementById(key); 
        let date = this.parseDateNote(key); 
        message = message.replace(/\n/g, '<br>'); 
        // If no element with the given key exists we create a new note.
        if (!note) {
            note = <StickyNote id={key} key={key} message={message} date={date}/>; 
        }
        // If the message is null we delete the note.
        if (!message) {
            return note.deleteNote();
        } 
        return note;
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
      // Loads all the notes.
      let notes = [];
      for (let key in localStorage) {
          notes.push( this.displayNote(key, localStorage[key]) );
      }
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
                  {notes}
                </div>
              </div>
            </main>

        </div>

      );
    }
}

export default App;
