
import { AiOutlinePlus } from 'react-icons/ai'
import styles from "./App.module.scss";
import { ToDoList } from './components/ToDoList/ToDoList';
import { useState } from 'react';
import { addToDo } from "./store/todoSlice"
import { useAppDispatch } from './hooks/useAppDispatch';


function App() {
  const [text, setText] = useState("");
  const [active, setActive] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const addTask = () => dispatch(addToDo({text, active}))

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    if(text.trim().length > 0) {
      addTask();
      setText('');
      setActive(false);
    }
  }

  return (
    <div className={styles.app}>
      <h3 className={styles.title}>TODO App</h3>
      <form onSubmit={submitHandler}>
        <div className={styles.inputContainer}>
          <input type="checkbox" checked={active} onChange={e => {setActive(e.target.checked)}} />
          <input type="text" className={styles.input} placeholder="Add todo" 
           value={text} onChange={(e) => {setText(e.target.value)}}/>
          <button><AiOutlinePlus /></button>
        </div>
      </form>
      <ToDoList />
    </div>
  );
}

export default App;
