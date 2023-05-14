import React, { useState, useEffect } from "react";
import "./style.css";
import pic from './list1.png'
export default function TodoApp() {
  const getLocalData = () => {
    const list = localStorage.getItem("mytodolist");
    if (list) {
      return JSON.parse(list);
    } else {
      return [];
    }
  };

  const [input, setinput] = useState("");
  const [addInput, setaddInput] = useState(getLocalData());
  const [editList, seteditList] = useState("");
  const [togleBtn, settogleBtn] = useState(false);

  const todoItem = (e) => {
    setinput(e.target.value);
  };
  const addItems = () => {
    if (!input) {
      alert("plz fill the data");
    } else if (input && togleBtn) {
      setaddInput(
        addInput.map((item) => {
          if (item.id === editList) {
            return { ...item, name: input };
          }
          return item;
        })
      );
      setinput("");
      seteditList(null);
      settogleBtn(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: input,
      };
      setaddInput([...addInput, myNewInputData]);

      setinput("");
    }
  };

  let deleteItems = (index) => {
    let updatedValue = addInput.filter((value) => {
      return value.id !== index;
    });
    setaddInput(updatedValue);
  };

  const removeAll = () => {
    setaddInput([]);
  };

  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(addInput));
  }, [addInput]);

  const editItems = (index) => {
    const editTodoList = addInput.find((value) => {
      return value.id === index;
    });
    setinput(editTodoList.name);
    seteditList(index);
    settogleBtn(true);
  };

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={pic} alt="" />
            <figcaption>Add Your List Here 😀</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍️ Add Items"
              className="form-control"
              value={input}
              onChange={todoItem}
            />
            {togleBtn ? (
              <i className="fa-solid fa-edit add-btn" onClick={addItems}></i>
            ) : (
              <i className="fa solid fa-plus add-btn" onClick={addItems}></i>
            )}
          </div>

          <div className="showItems">
            {addInput.map((item) => {
              return (
                <div className="eachItem" key={item.id}>
                  <h3>{item.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="fa-solid fa-edit add-btn"
                      onClick={() => editItems(item.id)}
                    ></i>
                    <i
                      className="fa-solid fa-trash-can add-btn"
                      onClick={() => deleteItems(item.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
