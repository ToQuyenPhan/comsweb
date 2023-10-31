import * as React from 'react';
import { useEffect, useState } from 'react';
import * as ReactDom from 'react-dom';
// import { Draggable } from '@syncfusion/ej2-base';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Draggable from 'react-draggable';
import { Editor } from "primereact/editor"

// const finalSpaceCharacters = [
//     {
//       id: 'gary',
//       name: 'Gary Goodspeed',
//       thumb: '/images/gary.png'
//     },
//     {
//       id: 'cato',
//       name: 'Little Cato',
//       thumb: '/images/cato.png'
//     },
//     {
//       id: 'kvn',
//       name: 'KVN',
//       thumb: '/images/kvn.png'
//     },
//     {
//       id: 'mooncake',
//       name: 'Mooncake',
//       thumb: '/images/mooncake.png'
//     },
//     {
//       id: 'quinn',
//       name: 'Quinn Ergon',
//       thumb: '/images/quinn.png'
//     }
//   ]

function CreateTemplate() {
    // const [characters, updateCharacters] = useState(finalSpaceCharacters);

    // function handleOnDragEnd(result) {
    //     if (!result.destination) return;

    //     const items = Array.from(characters);
    //     const [reorderedItem] = items.splice(result.source.index, 1);
    //     items.splice(result.destination.index, 0, reorderedItem);

    //     updateCharacters(items);
    // }
    const [x, setX] = useState(100)
    const [y, setY] = useState(100)
    // const [position, setPosition] = useState({ x: 0, y: 0 });
    // const trackPos = (data) => {
    //     setPosition({ x: data.x, y: data.y });
    // };

    const inputArr = [
        {
            type: "text",
            id: 1,
            value: ""
        }
    ];

    const [counter, setCounter] = useState(0);

    const handleStop = (event, dragElement) => {
        setX(dragElement.x)
        setY(dragElement.y)
    };

    const handleDrag = () => {
        console.log("Dragging...");
    }

    const handleClick = () => {
        setCounter(counter + 1);
    }

    // const handleChange = e => {
    //     e.preventDefault();

    //     const index = e.target.id;
    //     setArr(s => {
    //         const newArr = s.slice();
    //         newArr[index].value = e.target.value;

    //         return newArr;
    //     });
    // };

    useEffect(() => {
        // let draggable = new Draggable(document.getElementById('draggable'), { clone: false, dragArea: "#droppable" });
    }, []);
    return (
        <div>
            <div style={{ border: "1px solid black", height: "100vh", width: "50%", display: "inline-block" }}>
                {Array.from(Array(counter)).map((c, index) => {
                    return <Draggable onStop={handleStop}
                    defaultPosition={{ x: x, y: y }}><input key={c} type="text"></input></Draggable>;
                })}
            </div>
            <div style={{ width: "50%", display: "inline-block" }}>
                <button onClick={handleClick}>Text Field</button>

                <Draggable onStop={handleStop}
                    defaultPosition={{ x: x, y: y }}>
                    <div className="box">
                        <div>Here's my position...</div>
                        {/* <div>
                            x: {position.x.toFixed(0)}, y: {position.y.toFixed(0)}
                        </div> */}
                    </div>
                </Draggable>
                {/* <Editor /> */}
            </div>
        </div>
    );
}
export default CreateTemplate;