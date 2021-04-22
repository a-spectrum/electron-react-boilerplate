import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

const App = () => {

  const [dbInfo, setDbInfo] = useState(null);

  const handler = async(e) => {
    const data = await window.api.getSetInfo({});
    data !== undefined && setDbInfo(data);
  }

  console.log(dbInfo);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={() => {handler()}}>Test test</button>

        {dbInfo !== null && <h1 style={{color:'#FFF'}}>{dbInfo[0].name}</h1>}

        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
