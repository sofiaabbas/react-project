import { useState } from "react";
import FilmsList from "./components/filmsList.jsx";
import './App.css';

function App(props) {

      const [list, setList] = useState(["ready", "set", "GO"]);
      const [text, setText] =  useState("");
  
 function onSubmit(event) {
    event.preventDefault();
    
    setList([...list, text]);
 }
  

    return (
      <div>
      <h1>Hello World</h1>
      <form onSubmit={onSubmit}> 
        <input
          type="text" 
          name="text" 
          id="text" 
          value={text} 
          onChange={(event) => setText(event.target.value)}
          />
        <button type="submit">Add</button>
      </form>
      <ul>
        {list.map((item, idx) => {
          return <li key ={idx}>{item}</li>;
        })}
      </ul>
      <FilmsList />
      </div>
      );
  }
export default App;