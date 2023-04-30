import React from 'react';
import logo from './logo.svg';
import { AiOutlinePlus } from 'react-icons/ai'
import './App.css';

function App() {
  return (
    <div className="App">
      <h3>TODO App</h3>
      <form>
        <input type="text" className="" placeholder="Add todo"/>
        <button><AiOutlinePlus/></button>
      </form>
    </div>
  );
}

export default App;
