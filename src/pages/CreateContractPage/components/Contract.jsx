import { useEffect } from 'react';
import Select from 'react-select';
import { filesDb } from '../../../components/Firebase';
import { getDownloadURL, listAll, ref, uploadBytes } from 'firebase/storage';
import { Icon } from '@iconify/react';
import '../css/_contract.css';
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';
import '../css/_top-bar.css';
import { DocumentEditorContainerComponent, Toolbar, Inject } from '@syncfusion/ej2-react-documenteditor';
import { DocumentEditorComponent, Print, SfdtExport, WordExport, TextExport, Selection, Search, Editor, ImageResizer, EditorHistory, ContextMenu, OptionsPane, HyperlinkDialog, TableDialog, BookmarkDialog, TableOfContentsDialog, PageSetupDialog, StyleDialog, ListDialog, ParagraphDialog, BulletsAndNumberingDialog, FontDialog, TablePropertiesDialog, BordersAndShadingDialog, TableOptionsDialog, CellOptionsDialog, StylesDialog } from '@syncfusion/ej2-react-documenteditor';
import {
    PdfBitmap,
    PdfDocument,
    PdfPageOrientation,
    PdfPageSettings,
    PdfSection,
    SizeF
} from '@syncfusion/ej2-pdf-export';
import { registerLicense } from '@syncfusion/ej2-base';
import { getTreeItemUtilityClass } from '@mui/lab';
registerLicense("Ngo9BigBOggjHTQxAR8/V1NHaF5cXmVCf1FpRGVGfV5yd0VCal9YTnRdUiweQnxTdEZiWH5YcHBRQGJZUkB1WQ==");

function Contract() {
    const [contractName, setContractName] = useState('');
    const [contractCode, setContractCode] = useState('');
    const [saveMenuClass, setSaveMenuClass] = useState('dropdown-menu');
    const [templateUrl, setTemplateUrl] = useState([]);
    const [contractCategories, setContractCategories] = useState([]);
    const [previewPdf, setPreviewPdf] = useState(null);
    const saveMenuRef = useRef(null);
    const token = localStorage.getItem("Token");
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
        if (contractName === '') {
            editorObj.documentEditor.save("untitled", "Docx");
        } else {
            editorObj.documentEditor.save(contractName, "Docx");
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
                            (contractName === ''
                                ? 'untitled'
                                : contractName) + '.pdf'
                        );
                    }
                };
            }, 500);
        }
    }

    const handleContractNameChange = e => {
        setContractName(e.target.value);
    }
    const handleContractCodeChange = e => {
        setContractCode(e.target.value);
    }
    

    const handleCreateClick = () => {
        editorObj.documentEditor.selection.selectAll()
        alert(editorObj.documentEditor.selection.text);
        let filePath = `files/${contractName}.docx`;
        editorObj.documentEditor.saveAsBlob('Docx').then(function (exportedDocument) {
            // var formData = new FormData();
            // formData.append('fileName', 'sample.docx');
            // formData.append('data', exportedDocument);
            // const fileRef = ref(filesDb, filePath);
            // uploadBytes(fileRef, exportedDocument);
            // setPreviewUrl(URL.createObjectURL(exportedDocument));
        });
        let url = `https://firebasestorage.googleapis.com/v0/b/coms-64e4a.appspot.com/o/${filePath}?alt=media&token=86218259-40cd-4c00-b12b-cd0342fffff4`;
        // setPreviewUrl(url);
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
                    if (loadedPage == count) {
                        // Exporting the document as pdf
                        setPreviewPdf(pdfdocument);
                    }
                };
            }, 500);
        }
    }

    useEffect(() => {
        listAll(ref(filesDb, "files")).then(files => {
            console.log(files);
            files.items.forEach(val => {
                getDownloadURL(val).then(url => {
                    setTemplateUrl(data => [...data, url]);
                })
            })
        })
    }, []);

    return (
        <div>
            <form onSubmit={handleCreateClick}>
                <div className="topbar intro-y">
                    <h2>
                        Create New Contract
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
                                        <button className="dropdown-item" type='submit'> <Icon icon="lucide:file-text" className='icon' /> As New Contract </button>
                                    </li>
                                    <li>
                                        <button className="dropdown-item" type='submit'> <Icon icon="lucide:file-text" className='icon' /> As Draft </button>
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
                                                        <Icon icon="lucide:chevron-down" className='icon' /> Contract Information </div>
                                                    <div class="mt-5">
                                                        <div>
                                                            <div>Contract Name <span>*</span></div>
                                                            <input type="text" className="intro-y form-control py-3 px-4 box pr-10"
                                                                value={contractName} onChange={handleContractNameChange}
                                                                placeholder="Contract Name" required />
                                                        </div>
                                                        <div>
                                                            <div>Contract Code <span>*</span></div>
                                                            <input type="text" className="intro-y form-control py-3 px-4 box pr-10"
                                                                value={contractCode} onChange={handleContractCodeChange}
                                                                placeholder="Contract Code" required />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="tab-pane active" role="tabpanel" aria-labelledby="content-tab">
                                                <div className="dark:border-darkmode-400">
                                                    <div className="dark:border-darkmode-400">
                                                        <Icon icon="lucide:chevron-down" className='icon' /> Contract Content </div>
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
export default Contract;