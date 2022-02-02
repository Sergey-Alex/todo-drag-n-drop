import React, {useState, useEffect} from 'react'
import './App.css';
import  {v4} from "uuid";
import {randomColor} from 'randomcolor'
import Draggable from "react-draggable";

export default function App() {
    const [item, setItem] = useState('')
     const [items, setItems] = useState(
         JSON.parse(localStorage.getItem('items')) || []
     )

    useEffect(() =>{
        localStorage.setItem('items', JSON.stringify(items))
    }, [items])

    const newItem = () => {
        if (!item.trim() !== ''){
            const newItem = {
                id: v4(),
                item: item,
                color: randomColor({
                    luminosity: 'light'
                }),
                defaultPos: {
                    x: -100,
                    y: -100
                }
            }

            setItems(items => [...items, newItem])
            setItem('')
        } else {
            alert('Enter something')
        }
    }

  return (
    <div className='App'>
      <div className="wrapper">
        <input
            type="text"
            placeholder='Enter something'
            onChange={e =>setItem(e.target.value)}
        />
        <button className='enter' onClick={newItem}>ENTER</button>
          {items.map((item, index => {
              return (
                  <Draggable key = {index} defaultPosition = {item.defaultPos}>
                      <div className='todo__item'>
                          {`${item.item}`}
                          <button className='delete'>X</button>
                      </div>
                  </Draggable>
              )
          }))}
      </div>
      </div>

)}

