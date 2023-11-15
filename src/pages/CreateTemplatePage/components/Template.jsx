import { useEffect, useState, useRef } from 'react';
import Select from 'react-select';
import { CirclePicker, SwatchesPicker } from 'react-color';
// import { Draggable } from '@syncfusion/ej2-base';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Draggable from 'react-draggable';
import { Icon } from '@iconify/react';
import InlineEditor from "@ckeditor/ckeditor5-build-inline";
import { $ } from 'react-jquery-plugin';
import { Droppable, DragDropContext } from 'react-beautiful-dnd';
import { Editor } from "primereact/editor";
import WebViewer from '@pdftron/webviewer';
import '../css/_template.css';

function Template() {
    const [x, setX] = useState(100)
    const [y, setY] = useState(100)
    const [positions, setPositions] = useState({})
    const [hasLoaded, setHasLoaded] = useState(false);
    const [inputArrs, setInputArrs] = useState([]);
    const [fieldContent, setFieldContent] = useState('');
    const [counter, setCounter] = useState(0);
    const [selectField, setSelectField] = useState(1);
    const [contentStyle, setContentStyle] = useState(0);
    const viewer = useRef(null);
    // const [currenttyle, setUserStyle] = useState({
    //     bold: false,
    //     italic: false,
    //     underline: false
    // });

    const sizeOptions = [
        { value: '5', label: '5' },
        { value: '10', label: '10' },
        { value: '15', label: '15' },
        { value: '20', label: '20' },
        { value: '100', label: '100' }
    ]

    const jsonData = {
        COMPANYNAME: 'PDFTron',
        CUSTOMERNAME: 'Andrey Safonov',
        CompanyAddressLine1: '838 W Hastings St 5th floor',
        CompanyAddressLine2: 'Vancouver, BC V6C 0A6',
        CustomerAddressLine1: '123 Main Street',
        CustomerAddressLine2: 'Vancouver, BC V6A 2S5',
        Date: 'Nov 5th, 2021',
        ExpiryDate: 'Dec 5th, 2021',
        QuoteNumber: '134',
        WEBSITE: 'www.pdftron.com',
        billed_items: {
            insert_rows: [
                ['Apples', '3', '$5.00', '$15.00'],
                ['Oranges', '2', '$5.00', '$10.00'],
            ],
        },
        days: '30',
        total: '$25.00',
    };

    // const createEditor = () => {
    //     $(".editor").each(function () {
    //         const el = this;
    //         InlineEditor.create(el).catch((error) => {
    //             console.error(error);
    //         });
    //     });
    // }

    const handleStop = (event, data) => {
        // let parent = document.querySelector('.parent');
        // let parentRect = parent.getBoundingClientRect();
        // let draggable = document.getElementById(event.target.id);
        // let draggableRect = draggable.getBoundingClientRect();
        // if ((event.clientX >= parentRect.left && (event.clientX + draggableRect.width <= parentRect.right)) &&
        //     (event.clientY >= parentRect.top && (event.clientY + draggableRect.height <= parentRect.bottom))
        // ) {

        // }
        // else {
        //     //if mouse went out of bounds in Horizontal dir.
        //     if (event.clientX + draggableRect.width >= parentRect.right) {
        //         // draggable.style.left = `${parentRect.right - draggableRect.width}px`;
        //         return;
        //     }
        //     //if mouse went out of bounds in Vertical dir.
        //     if (event.clientY + draggableRect.height >= parentRect.bottom) {
        //         draggable.style.top = `${parentRect.bottom - draggableRect.height}px`;
        //     }
        // }
        let dummyPositions = { ...positions }
        const itemId = event.target.id;
        dummyPositions[itemId] = {}
        dummyPositions[itemId]["x"] = data.x;
        dummyPositions[itemId]["y"] = data.y;
        setPositions(dummyPositions);
    };

    const handleClick = () => {
        inputArrs.push({
            type: "text",
            id: counter + 1,
            value: "",
            bold: false,
            italic: false,
            underline: false,
            fontSize: 10,
            color: '#000000'
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
        if (document.getElementById("content-wrapper").classList.contains("hidden")) {
            document.getElementById("content-wrapper").classList.remove("hidden");
        }

        if (document.getElementById("styling-title").classList.contains("hidden")) {
            document.getElementById("styling-title").classList.remove("hidden");
        }

        for (let i = 1; i <= inputArrs.length; i++) {
            if (document.getElementById("content" + i).classList.contains("show")) {
                document.getElementById("content" + i).classList.remove("show");
            }
            if (document.getElementById("style" + i).classList.contains("show")) {
                document.getElementById("style" + i).classList.remove("show");
            }
            if (document.getElementById("font-size-" + i).classList.contains("show")) {
                document.getElementById("font-size-" + i).classList.remove("show");
            }
            if (document.getElementById("font-color-" + i).classList.contains("show")) {
                document.getElementById("font-color-" + i).classList.remove("show");
            }
            if (document.getElementById(i).classList.contains("selected")) {
                document.getElementById(i).classList.remove("selected");
            }
        }
        if (!document.getElementById("content" + e.target.id).classList.contains("show")) {
            document.getElementById("content" + e.target.id).classList.add("show");
        }
        if (!document.getElementById("style" + e.target.id).classList.contains("show")) {
            document.getElementById("style" + e.target.id).classList.add("show");
        }
        if (!document.getElementById("font-size-" + e.target.id).classList.contains("show")) {
            document.getElementById("font-size-" + e.target.id).classList.add("show");
        }
        if (!document.getElementById("font-color-" + e.target.id).classList.contains("show")) {
            document.getElementById("font-color-" + e.target.id).classList.add("show");
        }
        if (!document.getElementById(e.target.id).classList.contains("selected")) {
            document.getElementById(e.target.id).classList.add("selected");
        }
        setSelectField(e.target.id);
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

    const handleFieldChange = (e) => {
        setFieldContent(e.target.value);
    }

    const handleStyleChange = (event, id, style) => {
        const currentTodoIndex = inputArrs.findIndex((todo) => todo.id === id);
        const updatedTodo = Object.assign({}, inputArrs[currentTodoIndex]);
        if (style === 'bold') {
            updatedTodo.bold = !updatedTodo.bold;
        }
        if (style === 'italic') {
            updatedTodo.italic = !updatedTodo.italic;
        }
        if (style === 'underline') {
            updatedTodo.underline = !updatedTodo.underline;
        }
        const newArr = inputArrs.slice();
        newArr[currentTodoIndex] = updatedTodo;
        setInputArrs(newArr);
        localStorage.setItem("inputs", JSON.stringify(newArr));
    }

    const handleFontSizeChange = (event, id, size) => {
        const currentTodoIndex = inputArrs.findIndex((todo) => todo.id === id);
        const updatedTodo = Object.assign({}, inputArrs[currentTodoIndex]);
        updatedTodo.fontSize = size;
        const newArr = inputArrs.slice();
        newArr[currentTodoIndex] = updatedTodo;
        setInputArrs(newArr);
        localStorage.setItem("inputs", JSON.stringify(newArr));
    }

    const handleColorChange = (event, id, color) => {
        const currentTodoIndex = inputArrs.findIndex((todo) => todo.id === id);
        const updatedTodo = Object.assign({}, inputArrs[currentTodoIndex]);
        updatedTodo.color = color;
        const newArr = inputArrs.slice();
        newArr[currentTodoIndex] = updatedTodo;
        setInputArrs(newArr);
        localStorage.setItem("inputs", JSON.stringify(newArr));
    }

    const exportToWord = () => {
        var inputs = document.querySelectorAll('input');
        // for (var i = 0; i < inputs.length; i++) {
        //     let ps = document.createElement('p');
        //     document.getElementById("content").appendChild(ps)
        //     ps.textContent = inputs[i].value;
        // }

        var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
        var postHtml = "</body></html>";

        var content = document.getElementById("content").innerHTML;

        var html = preHtml + content + postHtml;

        var blob = new Blob(['\ufeff', html], {
            type: 'application/msword'
        });

        // Specify link url
        var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);

        // Specify file name
        // filename = filename ? filename + '.docx' : 'document.docx';
        var filename = "test.doc";

        // Create download link element
        var downloadLink = document.createElement("a");

        document.body.appendChild(downloadLink);

        if (navigator.msSaveOrOpenBlob) {
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            // Create a link to the file
            downloadLink.href = url;

            // Setting the file name
            downloadLink.download = filename;

            //triggering the function
            downloadLink.click();
        }

        document.body.removeChild(downloadLink);
    }

    useEffect(() => {
        // createEditor();
        // document.getElementById("content1").classList.add("show");
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
                    {/* <div className="border border-slate-200/60 dark:border-darkmode-400 rounded-md p-5">
                        <div class="font-medium flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5"> <i data-lucide="chevron-down" class="w-4 h-4 mr-2"></i> Text Content </div>
                        <div class="mt-5">
                            <div class="editor">
                                <p>Content of the editor.</p>
                            </div>
                        </div>
                    </div> */}
                    <div className="pos intro-y template">
                        <div className="intro-y">
                            <input type="text" className="intro-y form-control py-3 px-4 box pr-10" placeholder="Template Name" />

                            <div className="post intro-y box">
                                {/* <ul class="post__tabs nav nav-tabs flex-col sm:flex-row bg-slate-200 dark:bg-darkmode-800" role="tablist">
                                    <li class="nav-item">
                                        <button title="Fill in the article content" data-tw-toggle="tab" data-tw-target="#content" class="nav-link tooltip w-full sm:w-40 py-4 active" id="content-tab" role="tab" aria-controls="content" aria-selected="true"> <i data-lucide="file-text" class="w-4 h-4 mr-2"></i> Content </button>
                                    </li>
                                    <li class="nav-item">
                                        <button title="Adjust the meta title" data-tw-toggle="tab" data-tw-target="#meta-title" class="nav-link tooltip w-full sm:w-40 py-4" id="meta-title-tab" role="tab" aria-selected="false"> <i data-lucide="code" class="w-4 h-4 mr-2"></i> Meta Title </button>
                                    </li>
                                    <li class="nav-item">
                                        <button title="Use search keywords" data-tw-toggle="tab" data-tw-target="#keywords" class="nav-link tooltip w-full sm:w-40 py-4" id="keywords-tab" role="tab" aria-selected="false"> <i data-lucide="align-left" class="w-4 h-4 mr-2"></i> Keywords </button>
                                    </li>
                                </ul> */}
                                <div className="post__content tab-content">
                                    <div className="tab-pane active" role="tabpanel" aria-labelledby="content-tab">
                                        <div className="dark:border-darkmode-400">
                                            <div className="dark:border-darkmode-400">
                                                <Icon icon="lucide:chevron-down" className='icon' /> Template Content </div>
                                            <div class="mt-5">
                                                <div>
                                                    {/* <p>Content of the editor.</p> <input id={item.id} key={item.id}
                                                                                type="text" onChange={event => handleChange(event, item.id)} value={item.value} style={{ width: "90%" }}></input>*/}
                                                    <div>
                                                        <div className='parent' style={{ border: "1px solid black", height: "100vh", width: "100%" }}>
                                                            <div id='content'>
                                                                {inputArrs.map((item) => {
                                                                    return <Draggable className='draggable' id={item.id} onStop={handleStop}
                                                                        defaultPosition={positions === null ? { x: 0, y: 0 } : !positions[item.id] ?
                                                                            { x: 0, y: 0 } : {
                                                                                x: positions[item.id].x, y:
                                                                                    positions[item.id].y
                                                                            }}><div id={item.id} key={item.id}
                                                                                style={{
                                                                                    width: "50%", height: "10vh",
                                                                                    fontWeight: item.bold ? "bold" : "",
                                                                                    fontStyle: item.italic ? "italic" : "",
                                                                                    textDecoration: item.underline ? "underline" : "",
                                                                                    fontSize: parseInt(item.fontSize),
                                                                                    color: item.color
                                                                                }}
                                                                                onClick={handleMouseMove}>{item.value}</div></Draggable>;
                                                                })}
                                                                {/* <input type='text' value="hahaaa"></input> */}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className="dark:border-darkmode-400">
                                            <div class="font-medium flex items-center border-b border-slate-200/60 dark:border-darkmode-400 pb-5"> <i data-lucide="chevron-down" class="w-4 h-4 mr-2"></i> Caption & Images </div>
                                            <div class="mt-5">
                                                <div>
                                                    <label for="post-form-7" class="form-label">Caption</label>
                                                    <input id="post-form-7" type="text" class="form-control" placeholder="Write caption" />
                                                </div>
                                                <div class="mt-3">
                                                    <label class="form-label">Upload Image</label>
                                                    <div class="border-2 border-dashed dark:border-darkmode-400 rounded-md pt-4">
                                                        <div class="flex flex-wrap px-4">
                                                            <div class="w-24 h-24 relative image-fit mb-5 mr-5 cursor-pointer zoom-in">
                                                                <img class="rounded-md" alt="Midone - HTML Admin Template" src="dist/images/preview-7.jpg" />
                                                                <div title="Remove this image?" class="tooltip w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2"> <i data-lucide="x" class="w-4 h-4"></i> </div>
                                                            </div>
                                                            <div class="w-24 h-24 relative image-fit mb-5 mr-5 cursor-pointer zoom-in">
                                                                <img class="rounded-md" alt="Midone - HTML Admin Template" src="dist/images/preview-15.jpg" />
                                                                <div title="Remove this image?" class="tooltip w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2"> <i data-lucide="x" class="w-4 h-4"></i> </div>
                                                            </div>
                                                            <div class="w-24 h-24 relative image-fit mb-5 mr-5 cursor-pointer zoom-in">
                                                                <img class="rounded-md" alt="Midone - HTML Admin Template" src="dist/images/preview-9.jpg" />
                                                                <div title="Remove this image?" class="tooltip w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2"> <i data-lucide="x" class="w-4 h-4"></i> </div>
                                                            </div>
                                                            <div class="w-24 h-24 relative image-fit mb-5 mr-5 cursor-pointer zoom-in">
                                                                <img class="rounded-md" alt="Midone - HTML Admin Template" src="dist/images/preview-1.jpg" />
                                                                <div title="Remove this image?" class="tooltip w-5 h-5 flex items-center justify-center absolute rounded-full text-white bg-danger right-0 top-0 -mr-2 -mt-2"> <i data-lucide="x" class="w-4 h-4"></i> </div>
                                                            </div>
                                                        </div>
                                                        <div class="px-4 pb-4 flex items-center cursor-pointer relative">
                                                            <i data-lucide="image" class="w-4 h-4 mr-2"></i> <span class="text-primary mr-1">Upload a file</span> or drag and drop
                                                            <input type="file" class="w-full h-full top-0 left-0 absolute opacity-0" />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="intro-y box">
                                <div>
                                    <div className="dark:border-darkmode-400">
                                        <Icon icon="lucide:chevron-down" className='icon' /> Content </div>
                                    <div>
                                        Blocks
                                    </div>
                                    <div>
                                        <button onClick={handleClick}>Text <Icon icon="lucide:text" className='icon' /></button>
                                        <button onClick={handleClick}>Table <Icon icon="lucide:table" className='icon' /></button>
                                    </div>
                                    <div>
                                        Fillable Fields
                                    </div>
                                    <div>
                                        <div>
                                            <button>Code <Icon icon="lucide:barcode" className='icon' /></button>
                                            <button>Term <Icon icon="lucide:list-ordered" className='icon' /></button>
                                            <button>Partner <Icon icon="carbon:partnership" className='icon' /></button>
                                            <button>Company <Icon icon="mdi:company" className='icon' /></button>
                                        </div>
                                        <div>
                                            <button>Signature <Icon icon="fluent:signature-16-regular" className='icon' /></button>
                                            <button>Text Field <Icon icon="solar:text-field-focus-broken" className='icon' /></button>
                                            <button onClick={exportToWord}>Download <Icon icon="lucide:list-ordered" className='icon' /></button>
                                        </div>
                                    </div>
                                    <div className='hidden' id='content-wrapper'>
                                        <label>
                                            Enter value:
                                            <div>
                                                {inputArrs.map((item) => {
                                                    return <textarea id={`content${item.id}`} className="form-control hidden editor"
                                                        name='fieldContent' value={item.value} placeholder='Enter field value' cols={15}
                                                        rows={10} required onChange={event => handleChange(event, item.id)}
                                                        style={{
                                                            fontWeight: item.bold ? "bold" : "",
                                                            fontStyle: item.italic ? "italic" : "",
                                                            textDecoration: item.underline ? "underline" : ""
                                                        }} />
                                                })}
                                            </div>
                                        </label>
                                    </div>
                                    <div id='styling-title' className='hidden'>
                                        Styling Content
                                    </div>
                                    <div>
                                        {/* <label>Horizontal Radio Button</label> */}
                                        {inputArrs.map((item) => {
                                            return <div id={`style${item.id}`} className='hidden'>
                                                <div className='form-check'>
                                                    <input id="checkbox-switch-4" className="form-check-input"
                                                        type="checkbox"
                                                        checked={item.bold}
                                                        onChange={event => handleStyleChange(event, item.id, 'bold')}
                                                    />
                                                    <label class="form-check-label" for="radio-switch-4"><b>Bold</b></label>
                                                </div>
                                                <div className="form-check">
                                                    <input id="checkbox-switch-5" className="form-check-input"
                                                        type="checkbox"
                                                        checked={item.italic}
                                                        onChange={event => handleStyleChange(event, item.id, 'italic')}
                                                    />
                                                    <label class="form-check-label" for="radio-switch-5"><i>Italics</i></label>
                                                </div>
                                                <div className="form-check">
                                                    {/* <input id="radio-switch-6" className="form-check-input" type="radio" name="horizontal_radio_button" value="3" onChange={handleStyleChange} /> */}
                                                    <input id="checkbox-switch-6" className="form-check-input"
                                                        type="checkbox"
                                                        checked={item.underline}
                                                        onChange={event => handleStyleChange(event, item.id, 'underline')}
                                                    />
                                                    <label className="form-check-label" for="radio-switch-6"><u>Underline</u></label>
                                                    {/* onChange={() =>
                                                            setUserStyle({ ...userStyle, underline: !userStyle.underline })
                                                        } */}
                                                </div>
                                            </div>
                                        })}
                                    </div>
                                    <div>
                                        {inputArrs.map((item) => {
                                            return <div id={`font-size-${item.id}`} className='hidden'>
                                                <label for="input-filter-4" className="form-label">Font Size:</label>
                                                <Select id="input-filter-4" options={sizeOptions} defaultValue={{ label: item.fontSize, value: item.fontSize }}
                                                    className="form-select" onChange={event => handleFontSizeChange(event, item.id, event.value)} />
                                            </div>
                                        })}
                                    </div>
                                    <div>
                                        {inputArrs.map((item) => {
                                            return <div id={`font-color-${item.id}`} className='hidden'>
                                                <label for="input-filter-4" className="form-label">Font Color:</label>
                                                {/* <CirclePicker className='color-picker' width='100%' onChange={e => handleColorChange(e, item.id, e.hex)} color={item.color}
                                                /> */}
                                                <SwatchesPicker className='color-picker' width='100%' onChange={e => handleColorChange(e, item.id, e.hex)} color={item.color}/>
                                            </div>
                                        })}
                                    </div>
                                    {/* <div class="dropdown">
                                        <div class="dropdown-toggle btn w-full btn-outline-secondary dark:bg-darkmode-800 dark:border-darkmode-800 flex items-center justify-start" role="button" aria-expanded="false" data-tw-toggle="dropdown">
                                            <div class="w-6 h-6 image-fit mr q-3">
                                                <img class="rounded" alt="Midone - HTML Admin Template" src="dist/images/profile-7.jpg" />
                                            </div>
                                            <div class="truncate">John Travolta</div>
                                            <i class="w-4 h-4 ml-auto" data-lucide="chevron-down"></i>
                                        </div>
                                        <div class="dropdown-menu w-full">
                                            <ul class="dropdown-content">
                                                <li>
                                                    <a href="javascript:;" class="dropdown-item">
                                                        <div class="w-6 h-6 absolute image-fit mr-3">
                                                            <img class="rounded" alt="Midone - HTML Admin Template" src="dist/images/profile-7.jpg" />
                                                        </div>
                                                        <div class="ml-8 pl-1">John Travolta</div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:;" class="dropdown-item">
                                                        <div class="w-6 h-6 absolute image-fit mr-3">
                                                            <img class="rounded" alt="Midone - HTML Admin Template" src="dist/images/profile-4.jpg" />
                                                        </div>
                                                        <div class="ml-8 pl-1">Johnny Depp</div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:;" class="dropdown-item">
                                                        <div class="w-6 h-6 absolute image-fit mr-3">
                                                            <img class="rounded" alt="Midone - HTML Admin Template" src="dist/images/profile-2.jpg" />
                                                        </div>
                                                        <div class="ml-8 pl-1">Brad Pitt</div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:;" class="dropdown-item">
                                                        <div class="w-6 h-6 absolute image-fit mr-3">
                                                            <img class="rounded" alt="Midone - HTML Admin Template" src="dist/images/profile-4.jpg" />
                                                        </div>
                                                        <div class="ml-8 pl-1">John Travolta</div>
                                                    </a>
                                                </li>
                                                <li>
                                                    <a href="javascript:;" class="dropdown-item">
                                                        <div class="w-6 h-6 absolute image-fit mr-3">
                                                            <img class="rounded" alt="Midone - HTML Admin Template" src="dist/images/profile-12.jpg" />
                                                        </div>
                                                        <div class="ml-8 pl-1">Tom Cruise</div>
                                                    </a>
                                                </li>
                                            </ul>
                                        </div>
                                    </div> */}
                                </div>
                                {/* <div class="mt-3">
                                    <label for="post-form-2" class="form-label">Post Date</label>
                                    <input type="text" class="datepicker form-control" id="post-form-2" data-single-mode="true" />
                                </div>
                                <div class="mt-3">
                                    <label for="post-form-3" class="form-label">Categories</label>
                                    <select data-placeholder="Select categories" class="tom-select w-full" id="post-form-3" multiple>
                                        <option value="1" selected>Horror</option>
                                        <option value="2">Sci-fi</option>
                                        <option value="3" selected>Action</option>
                                        <option value="4">Drama</option>
                                        <option value="5">Comedy</option>
                                    </select>
                                </div>
                                <div class="mt-3">
                                    <label for="post-form-4" class="form-label">Tags</label>
                                    <select data-placeholder="Select your favorite actors" class="tom-select w-full" id="post-form-4" multiple>
                                        <option value="1" selected>Leonardo DiCaprio</option>
                                        <option value="2">Johnny Deep</option>
                                        <option value="3" selected>Robert Downey, Jr</option>
                                        <option value="4">Samuel L. Jackson</option>
                                        <option value="5">Morgan Freeman</option>
                                    </select>
                                </div>
                                <div class="form-check form-switch flex flex-col items-start mt-3">
                                    <label for="post-form-5" class="form-check-label ml-0 mb-2">Published</label>
                                    <input id="post-form-5" class="form-check-input" type="checkbox" />
                                </div>
                                <div class="form-check form-switch flex flex-col items-start mt-3">
                                    <label for="post-form-6" class="form-check-label ml-0 mb-2">Show Author Name</label>
                                    <input id="post-form-6" class="form-check-input" type="checkbox" />
                                </div> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : null;
}
export default Template;