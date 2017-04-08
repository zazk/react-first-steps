import React, { Component } from 'react';
import './App.css';

let CSSlayout = "demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header";
let CSSheader = "mdl-layout__header mdl-color-text--white mdl-color--primary";
let CSSheaderBox = "mdl-layout__header mdl-color-text--white mdl-color--primary";
let CSSheaderTitle = "mdl-layout__header-row mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--12-col-desktop";

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

      </div>

    );
  }
}

export default App;
