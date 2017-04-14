import React, { Component } from 'react';
import './App.css';
import * as Klass from './App.constants.js';

class StickyNote extends Component{
    constructor(props) {
        super(props);  
    }
    deleteNote (){
      this.props.clickHandler(this.props.index);
    }
    render(){
      return(
        <div className={Klass.CSSsticky}>
          <div className="message" ref="message">{this.props.message}</div>
          <div className="date" ref="date">{this.props.date}</div>
          <button className={Klass.CSSstickyDelete} ref="delete" 
            onClick={this.deleteNote.bind(this)} >
              Delete
          </button>
        </div>
      )
    }
}

class App extends Component {
    constructor(){ 
      super();
      this.state = {
        notes: [] 
      };
      let index = 0;
      for (let key in localStorage) {
          this.state.notes.push( this.displayNote(key, localStorage[key], index++ )  );
      }
        // Listen for updates to notes from other windows.
      window.addEventListener('storage', e=> this.displayNote(e.key, e.newValue) );
    }
    
    // Resets the given MaterialTextField.
    resetMaterialTextfield(element) {
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
    displayNote (key, message, index) {
        let note = document.getElementById(key); 
        let date = this.parseDateNote(key); 
        message = message.replace(/\n/g, '<br>'); 
        // If no element with the given key exists we create a new note.
        if (!note) {
            note = <StickyNote id={key} key={key} index={index} message={message} date={date} clickHandler={this.deleteNote} />; 
        }
        // If the message is null we delete the note.
        if (!message) {
            return note.deleteNote();
        } 
        return note;
    }

    // Deletes the note by removing the element from the DOM and the data from localStorage.
    deleteNote (index){ 
      console.log("Delete Note:" , index,this.state );

      this.setState({ notes: this.state.notes.splice(index,1) });
    }
 
    // Saves a new sticky note on localStorage.
    saveNote() {                        
        console.log("Save Note ");
        let input = document.getElementById('message');

        if (input.value) {
            let key = Date.now().toString();
            localStorage.setItem(key, input.value );

            let notes = this.state.notes;
            notes.push( this.displayNote(key, input.value , notes.length - 1 )  );

            this.setState({ notes: notes });
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

      return (
        <div className={Klass.CSSlayout}>
            <header className={Klass.CSSheader}>
              <div className={Klass.CSSheaderBox}>
                <div className={Klass.CSSheaderTitle}>
                  <h3><i className="material-icons">chrome_reader_mode</i> Simple Sticky Notes</h3>
                </div>
              </div>
            </header> 
            <main className={Klass.CSSmainBox}>
              <div id="notes-container" className={Klass.CSSnotesBox}>
                
                <div className={Klass.CSSnotesCell}>
                  <div className={Klass.CSSnotesTitle}>
                    <h2 className={Klass.CSSnotesCard}>Add new note</h2>
                  </div>
                  <div className={Klass.CSSnotesBoxIcon}>
                      <div className={Klass.CSSnotesBoxMessage}>
                        <textarea className={Klass.CSSnotesBoxInput} rows="3" id="message"  onKeyUp={this.toggleButton}></textarea>
                        <label className={Klass.CSSnotesBoxLabel} htmlFor="message">Message text...</label>
                      </div>
                      <a id="save" onClick={this.saveNote.bind(this)} disabled className={Klass.CSSnotesButton} > 
                        Add
                      </a>
                  </div>
                </div>  

                <div id="notes-section-title" className={Klass.CSSnotesBoxTitle} >
                  <div className={Klass.CSSnotesTitle}>
                    <h2 className={Klass.CSSnotesCard}>Your sticky notes</h2>
                  </div>
                </div>
                  {this.state.notes}
              </div>
            </main>

        </div>

      );
    }
}

export default App;