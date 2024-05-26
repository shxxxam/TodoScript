import "./App.css";
import Header from "./myComponents/Header";
import {Todos} from "./myComponents/Todos";
import {Footer} from "./myComponents/Footer";
import {AddTodo} from "./myComponents/AddTodo";
import {About} from "./myComponents/About";
import React, { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

function App() {
  let initTodo;
  if(localStorage.getItem("todos")===null){
    initTodo = [];
  }else{
    initTodo = JSON.parse(localStorage.getItem("todos"));
  }

  const onDelete = (todo)=>{
    console.log("I'm destroying todo", todo);
    setTodos(todos.filter((e)=>{
      return e!==todo;
    }))
    localStorage.setItem("todos",JSON.stringify(todos));
  }

  const addTodo = (title,desc)=>{
    if(title && desc){
      console.log("I'm adding this todo",title,desc);
      let sno;
      if(todos.length===0) sno=1;
      else sno = todos[todos.length-1].sno+1;
      const myTodo={
        sno:sno,
        title:title,
        desc:desc,
      }
      setTodos([...todos,myTodo]);
      console.log(myTodo);

      
    }
  }
  
  const [todos, setTodos] = useState(initTodo);
  
  useEffect(() => {
    localStorage.setItem("todos",JSON.stringify(todos));
  }, [todos])

  return (
    <>
      <Router>
        <Header title="TodoScript" searchBar={false} />

        <Routes>
          <Route exact path="/" element={
            <>
              <AddTodo addTodo={addTodo} />
              <Todos todos={todos} onDelete={onDelete} />
            </>
          } />
          <Route exact path="/about" element={<About />} />
        </Routes>

        <Footer />
      </Router>
    </>
  );
}

export default App;
