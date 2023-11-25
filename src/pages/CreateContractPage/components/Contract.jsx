import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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

// function Contract() {
//     const location = useLocation();
//     const [services, setServices] = useState([]);
//     const [templateName, setTemplateName] = useState('');
//     const [templateDescription, setTemplateDescription] = useState('');
//     const [url, setUrl] = useState('');
//     const [saveMenuClass, setSaveMenuClass] = useState('dropdown-menu');
//     const [templateUrl, setTemplateUrl] = useState([]);
//     const [contractCategories, setContractCategories] = useState([]);
//     const [templateTypes, setTemplateTypes] = useState([]);
//     const [previewPdf, setPreviewPdf] = useState(null);
//     const [selectedContractCategory, setSelectedContractCategory] = useState(null);
//     const [selectedTemplateType, setSelectedTemplateType] = useState(null);
//     const saveMenuRef = useRef(null);
//     const [templateId, setTemplateId] = useState(0);
//     const token = localStorage.getItem("Token");
//     const storage = getStorage();
//     let editorObj = DocumentEditorContainerComponent | null;

//     let items = [
//         "New",
//         "Open",
//         "Separator",
//         "Undo",
//         "Redo",
//         "Separator",
//         "Image",
//         "Table",
//         "Hyperlink",
//         "Bookmark",
//         "TableOfContents",
//         "Separator",
//         "Header",
//         "Footer",
//         "PageSetup",
//         "PageNumber",
//         "Break",
//         'InsertFootnote',
//         'InsertEndnote',
//         "Separator",
//         "Find",
//         'Separator',
//         'FormFields',
//     ];

//     useEffect(() => {
//         setTemplateId(location.state.templateId);
//         setServices(location.state.services);
//     }, []);


//     return (
//         <div>
//             <form onSubmit={handleCreateClick}>
//                 <div className="topbar intro-y">
//                     <h2>
//                         Add New Template
//                     </h2>
//                     <div>
//                         {/* <button type="button" className="btn box">
//                             <Icon icon="lucide:eye" className='icon' /> Preview </button> */}
//                         <div className="dropdown" ref={saveMenuRef}>
//                             <button className="dropdown-toggle btn btn-primary" aria-expanded="false" data-tw-toggle="dropdown" type='button' onClick={openSaveMenu}> Save
//                                 <Icon icon="lucide:chevron-down" className='icon' /></button>
//                             <div className={saveMenuClass}>
//                                 <ul className="dropdown-content">
//                                     <li>
//                                         <button className="dropdown-item" type='submit'> <Icon icon="lucide:file-text" className='icon' /> As New Template </button>
//                                     </li>
//                                     <li>
//                                         <button className="dropdown-item" type='button' onClick={handleSaveAsDraftClick}> <Icon icon="lucide:file-text" className='icon' /> As Draft </button>
//                                     </li>
//                                     <li>
//                                         <button className="dropdown-item" type='button' onClick={handleSavePdfClick}> <Icon icon="lucide:file-text" className='icon' /> Export to PDF </button>
//                                     </li>
//                                     <li>
//                                         <button className="dropdown-item" type='button' onClick={handleSaveDocClick}> <Icon icon="lucide:file-text" className='icon' /> Export to Word </button>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="main">
//                     <div className="main-body">
//                         <div className="main-content">
//                             <div className="pos intro-y template">
//                                 <div className="intro-y">
//                                     <div className="post intro-y box">
//                                         <div className="post__content tab-content">
//                                             <div className="tab-pane active" role="tabpanel" aria-labelledby="content-tab">
//                                                 <div className="dark:border-darkmode-400">
//                                                     <div className="dark:border-darkmode-400">
//                                                         <Icon icon="lucide:chevron-down" className='icon' /> Template Information </div>
//                                                     <div class="mt-5">
//                                                         <div>
//                                                             <div>Template name <span>*</span></div>
//                                                             <input type="text" className="intro-y form-control py-3 px-4 box pr-10"
//                                                                 value={templateName} onChange={handleTemplateNameChange}
//                                                                 placeholder="Template Name" required />
//                                                         </div>
//                                                         <div>
//                                                             <div>Description <span>*</span></div>
//                                                             <textarea className="form-control" name='fieldContent' placeholder='Description about the template' value={templateDescription}
//                                                                 rows={10} onChange={handleTemplateDescriptionChange} required />
//                                                         </div>
//                                                         <div>
//                                                             <div>Contract Category <span>*</span></div>
//                                                             <Select id="select-category" options={contractCategoryList} className="form-select"
//                                                                 value={selectedContractCategory} onChange={handleSelectContractCategory}
//                                                                 required />
//                                                         </div>
//                                                         <div>
//                                                             <div>Template Type <span>*</span></div>
//                                                             <Select id="select-type" options={templateTypeList} className="form-select"
//                                                                 value={selectedTemplateType} onChange={handleSelectTemplateType} required />
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="tab-pane active" role="tabpanel" aria-labelledby="content-tab">
//                                                 <div className="dark:border-darkmode-400">
//                                                     <div className="dark:border-darkmode-400">
//                                                         <Icon icon="lucide:chevron-down" className='icon' /> Template Content </div>
//                                                     <div class="mt-5">
//                                                         <div>
//                                                             <div>
//                                                                 <div className='parent'>
//                                                                     <div>
//                                                                         <div className="form-group col-md-12 editor">
//                                                                             <DocumentEditorContainerComponent ref={(ins => editorObj = ins)}
//                                                                                 height='900' enableToolbar={true} toolbarItems={items} readOnly={true} showPropertiesPane={true}
//                                                                                 serviceUrl='https://ej2services.syncfusion.com/production/web-services/api/documenteditor/'>
//                                                                                 <Inject services={[Toolbar]}></Inject>
//                                                                             </DocumentEditorContainerComponent>
//                                                                         </div>
//                                                                     </div>
//                                                                 </div>
//                                                             </div>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     )
// }

// export default Contract;