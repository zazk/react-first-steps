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

class App extends Component {
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
                      <textarea className={CSSnotesBoxInput} rows="3" id="message"></textarea>
                      <label className={CSSnotesBoxLabel} for="message">Message text...</label>
                    </div>
                    <button id="save" disabled className={CSSnotesButton}>
                      Add
                    </button>
                </div>
              </div>

              <div id="notes-section-title" className={CSSnotesBoxTitle}>
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
