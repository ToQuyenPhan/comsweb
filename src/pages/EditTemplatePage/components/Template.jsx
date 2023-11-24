import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { filesDb } from '../../../components/Firebase';
import { getDownloadURL, listAll, ref, uploadBytes, getStorage } from 'firebase/storage';
import { Icon } from '@iconify/react';
import '../css/_template.css';
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import '../css/_top-bar.css';
import { DocumentEditorContainerComponent, Toolbar, Inject } from '@syncfusion/ej2-react-documenteditor';
import {
    PdfBitmap,
    PdfDocument,
    PdfPageOrientation,
    PdfPageSettings,
    PdfSection,
    SizeF
} from '@syncfusion/ej2-pdf-export';
import { registerLicense } from '@syncfusion/ej2-base';
registerLicense("Ngo9BigBOggjHTQxAR8/V1NHaF5cXmVCf1FpRGVGfV5yd0VCal9YTnRdUiweQnxTdEZiWH5YcHBRQGJZUkB1WQ==");

function Template() {
    const [templateName, setTemplateName] = useState('');
    const [templateDescription, setTemplateDescription] = useState('');
    const [url, setUrl] = useState('');
    const [saveMenuClass, setSaveMenuClass] = useState('dropdown-menu');
    const [templateUrl, setTemplateUrl] = useState([]);
    const [contractCategories, setContractCategories] = useState([]);
    const [templateTypes, setTemplateTypes] = useState([]);
    const [previewPdf, setPreviewPdf] = useState(null);
    const [selectedContractCategory, setSelectedContractCategory] = useState(null);
    const [selectedTemplateType, setSelectedTemplateType] = useState(null);
    const saveMenuRef = useRef(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("Token");
    const storage = getStorage();
    let editorObj = DocumentEditorContainerComponent | null;

    let items = [
        "New",
        "Open",
        "Separator",
        "Undo",
        "Redo",
        "Separator",
        "Image",
        "Table",
        "Hyperlink",
        "Bookmark",
        "TableOfContents",
        "Separator",
        "Header",
        "Footer",
        "PageSetup",
        "PageNumber",
        "Break",
        'InsertFootnote',
        'InsertEndnote',
        "Separator",
        "Find",
        'Separator',
        'FormFields',
    ];

    const contractCategoryList = contractCategories.map(category => {
        return { label: category.categoryName, value: category.id }
    })

    const templateTypeList = templateTypes.map(templateType => {
        return { label: templateType.name, value: templateType.id }
    })

    const fetchContractCategoryData = async () => {
        const res = await fetch("https://localhost:7073/ContractCategories/active", {
            mode: "cors",
            method: "GET",
            headers: new Headers({
                Authorization: `Bearer ${token}`
            }),
        });
        if (res.status === 200) {
            // const data = await res.json();
            // setContractCategories(data);
        } else {
            // const data = await res.json();
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Oops...',
            //     text: data.title
            // })
        }
    };

    const fetchTemplateTypeData = async () => {
        const res = await fetch("https://localhost:7073/TemplateTypes", {
            mode: "cors",
            method: "GET",
            headers: new Headers({
                Authorization: `Bearer ${token}`
            }),
        });
        if (res.status === 200) {
            // const data = await res.json();
            // setTemplateTypes(data);
        } else {
            // const data = await res.json();
            // Swal.fire({
            //     icon: 'error',
            //     title: 'Oops...',
            //     text: data.title
            // })
        }
    };

    const fetchCreateTemplate = async () => {
        const res = await fetch("https://localhost:7073/Templates/add", {
            mode: "cors",
            method: "POST",
            headers: new Headers({
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            }),
            body: JSON.stringify({
                "templateName": templateName, "description": templateDescription, "status": 2, "templateLink": url,
                "contractCategoryId": selectedContractCategory.value,
                "templateTypeId": selectedTemplateType.value
            })
        });
        if (res.status === 200) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Create Template Successfully!',
                showConfirmButton: false,
                timer: 1500
            })
            navigate("/template");
        } else {
            const data = await res.json();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.title
            })
        }
    }

    const fetchCreateDraft = async () => {
        const res = await fetch("https://localhost:7073/Templates/add", {
            mode: "cors",
            method: "POST",
            headers: new Headers({
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            }),
            body: JSON.stringify({
                "templateName": templateName, "description": templateDescription, "status": 1, "templateLink": url,
                "contractCategoryId": selectedContractCategory.value,
                "templateTypeId": selectedTemplateType.value
            })
        });
        if (res.status === 200) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Create Template Successfully!',
                showConfirmButton: false,
                timer: 1500
            })
            navigate("/template");
        } else {
            const data = await res.json();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.title
            })
        }
    }

    const openSaveMenu = () => {
        if (saveMenuClass === 'dropdown-menu show') {
            setSaveMenuClass('dropdown-menu');
        } else {
            setSaveMenuClass('dropdown-menu show');
        }
    }

    const closeSaveMenu = (e) => {
        if (!saveMenuRef?.current?.contains(e.target)) {
            setSaveMenuClass('dropdown-menu');
        }
    }

    document.addEventListener('mousedown', closeSaveMenu);

    const handleSaveDocClick = () => {
        if (templateName === '') {
            editorObj.documentEditor.save("untitled", "Docx");
        } else {
            editorObj.documentEditor.save(templateName, "Docx");
        }
    }

    const handleSavePdfClick = () => {
        let pdfdocument = new PdfDocument();
        let count = editorObj.documentEditor.pageCount;
        editorObj.documentEditor.documentEditorSettings.printDevicePixelRatio = 2;
        let loadedPage = 0;
        for (let i = 1; i <= count; i++) {
            setTimeout(() => {
                let format = 'image/jpeg';
                // Getting pages as image
                let image = editorObj.documentEditor.exportAsImage(i, format);
                image.onload = function () {
                    let imageHeight = parseInt(
                        image.style.height.toString().replace('px', '')
                    );
                    let imageWidth = parseInt(
                        image.style.width.toString().replace('px', '')
                    );
                    let section = pdfdocument.sections.add();
                    let settings = new PdfPageSettings(0);
                    if (imageWidth > imageHeight) {
                        settings.orientation = PdfPageOrientation.Landscape;
                    }
                    settings.size = new SizeF(imageWidth, imageHeight);
                    (section).setPageSettings(settings);
                    let page = section.pages.add();
                    let graphics = page.graphics;
                    let imageStr = image.src.replace('data:image/jpeg;base64,', '');
                    let pdfImage = new PdfBitmap(imageStr);
                    graphics.drawImage(pdfImage, 0, 0, imageWidth, imageHeight);
                    loadedPage++;
                    if (loadedPage == count) {
                        // Exporting the document as pdf
                        pdfdocument.save(
                            (templateName === ''
                                ? 'untitled'
                                : templateName) + '.pdf'
                        );
                    }
                };
            }, 500);
        }
    }

    const handleTemplateNameChange = e => {
        setTemplateName(e.target.value);
    }

    const handleTemplateDescriptionChange = e => {
        setTemplateDescription(e.target.value);
    }

    const handleSelectContractCategory = (data) => {
        setSelectedContractCategory(data);
    }

    const handleSelectTemplateType = (data) => {
        setSelectedTemplateType(data);
    }

    const handleCreateClick = (e) => {
        e.preventDefault();
        let filePath = `files/${templateName}.docx`;
        editorObj.documentEditor.saveAsBlob('Docx').then(function (exportedDocument) {
            // var formData = new FormData();
            // formData.append('fileName', 'sample.docx');
            // formData.append('data', exportedDocument);
            const fileRef = ref(filesDb, filePath);
            uploadBytes(fileRef, exportedDocument);
            // setPreviewUrl(URL.createObjectURL(exportedDocument));
        });
        let url = `https://firebasestorage.googleapis.com/v0/b/coms-64e4a.appspot.com/o/files%2F${templateName}.docx?alt=media&token=86218259-40cd-4c00-b12b-cd0342fffff4`;
        setUrl(url);
        fetchCreateTemplate();
    }

    const handleSaveAsDraftClick = (e) => {
        if (selectedContractCategory === null) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You need to choose a contract category!",
            });
            return;
        }
        if (selectedTemplateType === null) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "You need to choose a template type!",
            });
            return;
        }
        e.preventDefault();
        let filePath = `files/${templateName}.docx`;
        editorObj.documentEditor.saveAsBlob('Docx').then(function (exportedDocument) {
            // var formData = new FormData();
            // formData.append('fileName', 'sample.docx');
            // formData.append('data', exportedDocument);
            const fileRef = ref(filesDb, filePath);
            uploadBytes(fileRef, exportedDocument);
            // setPreviewUrl(URL.createObjectURL(exportedDocument));
        });
        let url = `https://firebasestorage.googleapis.com/v0/b/coms-64e4a.appspot.com/o/files%2F${templateName}.docx?alt=media&token=86218259-40cd-4c00-b12b-cd0342fffff4`;
        setUrl(url);
        fetchCreateDraft();
    }

    const handlePreview = () => {
        let pdfdocument = new PdfDocument();
        let count = editorObj.documentEditor.pageCount;
        editorObj.documentEditor.documentEditorSettings.printDevicePixelRatio = 2;
        let loadedPage = 0;
        for (let i = 1; i <= count; i++) {
            setTimeout(() => {
                let format = 'image/jpeg';
                // Getting pages as image
                let image = editorObj.documentEditor.exportAsImage(i, format);
                image.onload = function () {
                    let imageHeight = parseInt(
                        image.style.height.toString().replace('px', '')
                    );
                    let imageWidth = parseInt(
                        image.style.width.toString().replace('px', '')
                    );
                    let section = pdfdocument.sections.add();
                    let settings = new PdfPageSettings(0);
                    if (imageWidth > imageHeight) {
                        settings.orientation = PdfPageOrientation.Landscape;
                    }
                    settings.size = new SizeF(imageWidth, imageHeight);
                    (section).setPageSettings(settings);
                    let page = section.pages.add();
                    let graphics = page.graphics;
                    let imageStr = image.src.replace('data:image/jpeg;base64,', '');
                    let pdfImage = new PdfBitmap(imageStr);
                    graphics.drawImage(pdfImage, 0, 0, imageWidth, imageHeight);
                    loadedPage++;
                    if (loadedPage === count) {
                        // Exporting the document as pdf
                        setPreviewPdf(pdfdocument);
                    }
                };
            }, 500);
        }
    }

    const fetchTemplateData = async () =>{
        const res = await fetch("https://localhost:7073/Templates?id=7", {
            mode: "cors",
            method: "PUT",
            headers: new Headers({
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            }),
        });
        if (res.status === 200) {
            const data = await res.json();
            editorObj.documentEditor.open(data.sfdt);
        } else {
            const data = await res.json();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.title
            })
        }
    }

    useEffect(() => {
        fetchTemplateData();
        fetchContractCategoryData();
        fetchTemplateTypeData();
        listAll(ref(filesDb, "files")).then(files => {
            console.log(files);
            files.items.forEach(val => {
                getDownloadURL(val).then(url => {
                    setTemplateUrl(data => [...data, url]);
                })
            })
        });
        getDownloadURL(ref(storage, 'files/sample.docx'))
            .then((url) => {
                // `url` is the download URL for 'images/stars.jpg'

                // This can be downloaded directly:
                const xhr = new XMLHttpRequest();
                xhr.responseType = 'blob';
                xhr.onload = (event) => {
                    const blob = xhr.response;
                    console.log(blob);
                };
                xhr.open('GET', url);
                xhr.send();

                // Or inserted into an <img> element
                // const img = document.getElementById('myimg');
                // img.setAttribute('src', url);
            })
            .catch((error) => {
                // Handle any errors
            });
    }, []);

    return (
        <div>
            <form onSubmit={handleCreateClick}>
                <div className="topbar intro-y">
                    <h2>
                        Add New Template
                    </h2>
                    <div>
                        {/* <button type="button" className="btn box">
                            <Icon icon="lucide:eye" className='icon' /> Preview </button> */}
                        <div className="dropdown" ref={saveMenuRef}>
                            <button className="dropdown-toggle btn btn-primary" aria-expanded="false" data-tw-toggle="dropdown" type='button' onClick={openSaveMenu}> Save
                                <Icon icon="lucide:chevron-down" className='icon' /></button>
                            <div className={saveMenuClass}>
                                <ul className="dropdown-content">
                                    <li>
                                        <button className="dropdown-item" type='submit'> <Icon icon="lucide:file-text" className='icon' /> As New Template </button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item" type='button' onClick={handleSaveAsDraftClick}> <Icon icon="lucide:file-text" className='icon' /> As Draft </button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item" type='button' onClick={handleSavePdfClick}> <Icon icon="lucide:file-text" className='icon' /> Export to PDF </button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item" type='button' onClick={handleSaveDocClick}> <Icon icon="lucide:file-text" className='icon' /> Export to Word </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="main">
                    <div className="main-body">
                        <div className="main-content">
                            <div className="pos intro-y template">
                                <div className="intro-y">
                                    <div className="post intro-y box">
                                        <div className="post__content tab-content">
                                            <div className="tab-pane active" role="tabpanel" aria-labelledby="content-tab">
                                                <div className="dark:border-darkmode-400">
                                                    <div className="dark:border-darkmode-400">
                                                        <Icon icon="lucide:chevron-down" className='icon' /> Template Information </div>
                                                    <div class="mt-5">
                                                        <div>
                                                            <div>Template name <span>*</span></div>
                                                            <input type="text" className="intro-y form-control py-3 px-4 box pr-10"
                                                                value={templateName} onChange={handleTemplateNameChange}
                                                                placeholder="Template Name" required />
                                                        </div>
                                                        <div>
                                                            <div>Description <span>*</span></div>
                                                            <textarea className="form-control" name='fieldContent' placeholder='Description about the template' value={templateDescription}
                                                                rows={10} onChange={handleTemplateDescriptionChange} required />
                                                        </div>
                                                        <div>
                                                            <div>Contract Category <span>*</span></div>
                                                            <Select id="select-category" options={contractCategoryList} className="form-select"
                                                                value={selectedContractCategory} onChange={handleSelectContractCategory}
                                                                required />
                                                        </div>
                                                        <div>
                                                            <div>Template Type <span>*</span></div>
                                                            <Select id="select-type" options={templateTypeList} className="form-select"
                                                                value={selectedTemplateType} onChange={handleSelectTemplateType} required />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane active" role="tabpanel" aria-labelledby="content-tab">
                                                <div className="dark:border-darkmode-400">
                                                    <div className="dark:border-darkmode-400">
                                                        <Icon icon="lucide:chevron-down" className='icon' /> Template Content </div>
                                                    <div class="mt-5">
                                                        <div>
                                                            <div>
                                                                <div className='parent'>
                                                                    <div>
                                                                        <div className="form-group col-md-12 editor">
                                                                            <DocumentEditorContainerComponent ref={(ins => editorObj = ins)}
                                                                                height='900' enableToolbar={true} toolbarItems={items} readOnly={true} showPropertiesPane={true}
                                                                                serviceUrl='https://ej2services.syncfusion.com/production/web-services/api/documenteditor/'>
                                                                                <Inject services={[Toolbar]}></Inject>
                                                                            </DocumentEditorContainerComponent>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default Template;