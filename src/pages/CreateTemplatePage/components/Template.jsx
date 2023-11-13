import { useEffect, useState } from 'react';
// import { Draggable } from '@syncfusion/ej2-base';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Draggable from 'react-draggable';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';
import { Editor } from "primereact/editor";
import '../css/style.css';

function Template() {
    const [x, setX] = useState(100)
    const [y, setY] = useState(100)
    const [positions, setPositions] = useState({})
    const [hasLoaded, setHasLoaded] = useState(false);
    const [inputArrs, setInputArrs] = useState([]);
    const [counter, setCounter] = useState(0);

    const handleStop = (event, data) => {
        let parent = document.querySelector('.parent');
        let parentRect = parent.getBoundingClientRect();
        let draggable = document.getElementById(event.target.id);
        let draggableRect = draggable.getBoundingClientRect();
        if ((event.clientX >= parentRect.left && (event.clientX + draggableRect.width <= parentRect.right)) &&
            (event.clientY >= parentRect.top && (event.clientY + draggableRect.height <= parentRect.bottom))
        ) {
            let dummyPositions = { ...positions }
            const itemId = event.target.id;
            dummyPositions[itemId] = {}
            dummyPositions[itemId]["x"] = data.x;
            dummyPositions[itemId]["y"] = data.y;
            setPositions(dummyPositions);
        }
        else {
            //if mouse went out of bounds in Horizontal dir.
            if (event.clientX + draggableRect.width >= parentRect.right) {
                // draggable.style.left = `${parentRect.right - draggableRect.width}px`;
                return;
            }
            //if mouse went out of bounds in Vertical dir.
            if (event.clientY + draggableRect.height >= parentRect.bottom) {
                draggable.style.top = `${parentRect.bottom - draggableRect.height}px`;
            }
        }
    };

    const handleClick = () => {
        inputArrs.push({
            type: "text",
            id: counter + 1,
            value: ""
        });
        setCounter(counter + 1);
        localStorage.setItem("inputs", JSON.stringify(inputArrs));
    }

    const handleChange = (event, id) => {
        const currentTodoIndex = inputArrs.findIndex((todo) => todo.id === id);
        const updatedTodo = Object.assign({}, inputArrs[currentTodoIndex]);
        updatedTodo.value = event.target.value;
        const newArr = inputArrs.slice();
        newArr[currentTodoIndex] = updatedTodo;
        setInputArrs(newArr);
        localStorage.setItem("inputs", JSON.stringify(newArr));
    }

    const handleMouseMove = (e) => {
        // if (!this.state.dragging) return;
        // let x = e.pageX - this.state.rel.x;
        // let y = e.pageY - this.state.rel.y;
        // if (x < 0 || x > window.innerWidth - this.state.dialogWidth) {
        //     x = x < 0 ? 0 : window.innerWidth - this.state.dialogWidth;
        // }

        // if (y < 0 || y > window.innerHeight - this.state.dialogHeight) {
        //     y = y < 0 ? 0 : window.innerHeight - this.state.dialogHeight;
        // }
        // this.setState({
        //     x: x,
        //     y: y
        // });
        // e.stopPropagation();
        // e.preventDefault();
        // let parent = document.querySelector('.parent');
        // let parentRect = parent.getBoundingClientRect();
    }

    useEffect(() => {
        const existingDivPositions = JSON.parse(localStorage.getItem("positions_div"));
        const existingInputs = JSON.parse(localStorage.getItem("inputs"));
        if (existingDivPositions !== null) {
            setPositions(existingDivPositions);
        }
        if (existingInputs !== null) {
            setInputArrs(existingInputs);
            setCounter(existingInputs.length);
        }
        setHasLoaded(true);
    }, []);

    useEffect(() => {
        localStorage.setItem("positions_div", JSON.stringify(positions));
    }, [positions]);

    return hasLoaded ? (
        <div className="main">
            <div className="main-body">
                <div className="main-content">
                    <div>
                        <div className='parent' style={{ border: "1px solid black", height: "100vh", width: "100%", display: "inline-block" }}>
                            <div>
                                {inputArrs.map((item) => {
                                    return <Draggable className='draggable' id={item.id} onStop={handleStop} onMouseDown={handleMouseMove}
                                        defaultPosition={positions === null ? { x: 0, y: 0 } : !positions[item.id] ?
                                            { x: 0, y: 0 } : { x: positions[item.id].x, y: positions[item.id].y }}><input id={item.id} key={item.id}
                                                type="text" onChange={event => handleChange(event, item.id)} value={item.value}></input></Draggable>;
                                })}
                            </div>
                        </div>
                        <div style={{ width: "50%", display: "inline-block" }}>
                            <button onClick={handleClick}>Text</button>

                            {/* <Draggable onStop={handleStop}
                    defaultPosition={{ x: x, y: y }}>
                    <div className="box">
                        <div>Here's my position...</div>
                         <div>
                            x: {position.x.toFixed(0)}, y: {position.y.toFixed(0)}
                        </div> 
                    </div>
                </Draggable>
                 <Editor /> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}
export default Template;