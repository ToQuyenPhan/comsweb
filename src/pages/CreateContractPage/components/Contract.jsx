import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Select from "react-select";
import { filesDb } from "../../../components/Firebase";
import {
  getDownloadURL,
  listAll,
  ref,
  uploadBytes,
  getStorage,
} from "firebase/storage";
import { Icon } from "@iconify/react";
import "react-datepicker/dist/react-datepicker.css";
import "../css/_contract.css";
import "../css/_top-bar.css";
import { useRef, useState } from "react";
import Swal from "sweetalert2";
import {
  DocumentEditorContainerComponent,
  Toolbar,
  Inject,
} from "@syncfusion/ej2-react-documenteditor";
import {
  PdfBitmap,
  PdfDocument,
  PdfPageOrientation,
  PdfPageSettings,
  PdfSection,
  SizeF,
} from "@syncfusion/ej2-pdf-export";
import { registerLicense } from "@syncfusion/ej2-base";
registerLicense(
  "Ngo9BigBOggjHTQxAR8/V1NHaF5cXmVCf1FpRGVGfV5yd0VCal9YTnRdUiweQnxTdEZiWH5YcHBRQGJZUkB1WQ=="
);

function Contract() {
  const [fields, setFields] = useState([]);
  const [effectiveDate, setEffectiveDate] = useState("");
  const [sendDate, setSendDate] = useState("");
  const [reviewDate, setReviewDate] = useState("");
  const [partner, setPartner] = useState(null);
  const location = useLocation();
  const contractCategoryId = location.state.contractCategoryId;
  const partnerId = location.state.partnerId;
  const serviceId = location.state.serviceId;
  // const [services, setServices] = useState([]);
  // const [templateId, setTemplateId] = useState(0);
  const services = location.state.services;
  const templateId = location.state.templateId;
  const [contractName, setContractName] = useState("");
  const [code, setCode] = useState("");
  const [selectedPartner, setSelectedPartner] = useState([]);
  const [selectedApprovers, setSelectedApprovers] = useState([]);
  const [selectedViewers, setSelectedViewers] = useState([]);
  // const [viewers, setViewers] = useState(null);
  // const [approvers, setApprovers] = useState(null);
  const [selectedSigner, setSelectedSigner] = useState(null);
  const [url, setUrl] = useState("");
  const [saveMenuClass, setSaveMenuClass] = useState("dropdown-menu");
  const [partners, setPartners] = useState([]);
  const [users, setUsers] = useState([]);
  const [managers, setManagers] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [previewPdf, setPreviewPdf] = useState(null);
  const saveMenuRef = useRef(null);
  const [sfdt, setSfdt] = useState({});
  const token = localStorage.getItem("Token");
  const navigate = useNavigate();
  let editorObj = DocumentEditorContainerComponent;

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
    "InsertFootnote",
    "InsertEndnote",
    "Separator",
    "Find",
    "Separator",
    "FormFields",
  ];

  const partnerList = partners.map((partner) => {
    return { label: partner.companyName, value: partner.id };
  });
  const userList = users.map((user) => {
    return { label: user.fullName, value: user.id };
  });
  const mangerList = managers.map((manager) => {
    return { label: manager.fullName, value: manager.id };
  });

  const fetchTemplateFields = async () => {
    try {
      const res = await fetch(`https://localhost:7073/api/TemplateFields?contractCategoryId=${contractCategoryId}
        &partnerId=${partnerId}&serviceId=${serviceId}`, {
        mode: "cors",
        method: "GET",
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      });
      if (res.status === 200) {
        const data = await res.json();
        setFields(data);
      } else {
        const data = await res.json();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.title,
        });
        navigate("/choose-template");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleCreateClick = async (e) => {
    e.preventDefault();
    var inputs = document.getElementsByName("fields");
    var values = [].map.call(inputs, function (input) {
      return input.value;
    });
    var names = [].map.call(fields, function (field) {
      return field.name;
    });
    const res = await fetch("https://localhost:7073/Contracts", {
      mode: "cors",
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        name: names,
        value: values,
        contractCategoryId: contractCategoryId,
        effectiveDate: effectiveDate,
        sendDate: sendDate,
        reviewDate: reviewDate,
        serviceId: serviceId,
        partnerId: partnerId,
        status: 0
      }),
    });
    if (res.status === 200) {
      const data = await res.json();
      navigate("/contract");
    } else {
      const data = await res.json();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: data.title,
      });
    }
  };

  const handleEffectiveDateChange = (e) => {
    setEffectiveDate(e.target.value);
  };

  const handleSendDateChange = (e) => {
    setSendDate(e.target.value);
  };

  const handleReviewDateChange = (e) => {
    setReviewDate(e.target.value);
  };

  const handleCreateClick2 = async (e) => {
    if (selectedPartner === null) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to choose a partner!",
      });
      return;
    }
    if (selectedSigner === null) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to choose a signer!",
      });
      return;
    }
    if (selectedApprovers === null) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to choose a approver!",
      });
      return;
    }
    e.preventDefault();
    var formData = new FormData();
    editorObj.documentEditor
      .saveAsBlob("Docx")
      .then(function (exportedDocument) {
        formData.append("File", exportedDocument);
      });
    let editorContent = { content: editorObj.documentEditor.serialize() };
    const res = await fetch("https://localhost:7073/Contracts/add", {
      mode: "cors",
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        contractName: contractName,
        code: code,
        effectiveDate: effectiveDate,
        templateId: templateId,
        partnerId: selectedPartner.value,
        services: services,
      }),
    });
    const data = await res.json();
    if (data.id) {
      const SignerRes = await fetch(`https://localhost:7073/UserAccesses/add?contractId=${data.id}&userId=${selectedSigner.value}&accessRoleId=3`, {
        mode: "cors",
        method: "POST",
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        })
      });

      const approvers = selectedApprovers.map((approver) => approver.value);
      const ApproverRes = await fetch(`https://localhost:7073/Accesses/addApprovers`, {
        mode: "cors",
        method: "POST",
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
        body: JSON.stringify({
          "users": approvers,
          "contractId": data.id
        }),
      });
      if (selectedApprovers !== null) {
        const viewers = selectedViewers.map((viewer) => viewer.value);

        const ViewerRes = await fetch(`https://localhost:7073/Accesses/addViewers`, {
          mode: "cors",
          method: "POST",
          headers: new Headers({
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/json",
          }),
          body: JSON.stringify({
            users: viewers,
            contractId: data.id
          }),
        })
        console.log("viewer " + ViewerRes.status);
      };
      console.log(services);
      console.log("signer " + SignerRes.status);
      console.log("approver " + ApproverRes.status);


      console.log(res.status);
      if (res.status === 200 && SignerRes.status === 200 && ApproverRes.status === 200) {
        // const data = await res.json();
        const addContractRes = await fetch(
          `https://localhost:7073/ContractFiles?contractId=${data.id}&contractName=${data.contractName}`,
          {
            mode: "cors",
            method: "POST",
            headers: new Headers({
              Authorization: `Bearer ${token}`,
            }),
            body: formData,
          }
        );
        if (addContractRes.status === 200) {
          console.log(addContractRes);
          const exportPdfRes = await fetch(
            `https://localhost:7073/ContractFiles/pdf?id=${data.id}`,
            {
              mode: "cors",
              method: "POST",
              headers: new Headers({
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              }),
              body: JSON.stringify(editorContent),
            }
          );
          if (exportPdfRes.status === 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Create Contract Successfully!",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/contract");
          } else {
            const exportData = await exportPdfRes.json();
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: exportData.title,
            });
          }
        } else {
          const contractFileData = await addContractRes.json();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: contractFileData.title,
          });
        }
      } else {
        // const data = await res.json();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.title,
        });
      }
    }
  };

  const fetchCreateDraft = async () => {
    const res = await fetch("https://localhost:7073/Contracts/add", {
      mode: "cors",
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      }),
      body: JSON.stringify({
        contractName: contractName,
        code: code,
        effectiveDate: effectiveDate,
        templateId: templateId,
        partnerId: selectedPartner.value,
        services: services,
      }),
    });
    if (res.status === 200) {
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Create Contract Successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/contract");
    } else {
      const data = await res.json();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: data.title,
      });
    }
  };

  const closeSaveMenu = (e) => {
    if (!saveMenuRef?.current?.contains(e.target)) {
      setSaveMenuClass("dropdown-menu");
    }
  };

  document.addEventListener("mousedown", closeSaveMenu);

  const handleSaveDocClick = () => {
    if (contractName === "") {
      editorObj.documentEditor.save("untitled", "Docx");
    } else {
      editorObj.documentEditor.save(contractName, "Docx");
    }
  };

  const handleSavePdfClick = () => {
    let pdfdocument = new PdfDocument();
    let count = editorObj.documentEditor.pageCount;
    editorObj.documentEditor.documentEditorSettings.printDevicePixelRatio = 2;
    let loadedPage = 0;
    for (let i = 1; i <= count; i++) {
      setTimeout(() => {
        let format = "image/jpeg";
        // Getting pages as image
        let image = editorObj.documentEditor.exportAsImage(i, format);
        image.onload = function () {
          let imageHeight = parseInt(
            image.style.height.toString().replace("px", "")
          );
          let imageWidth = parseInt(
            image.style.width.toString().replace("px", "")
          );
          let section = pdfdocument.sections.add();
          let settings = new PdfPageSettings(0);
          if (imageWidth > imageHeight) {
            settings.orientation = PdfPageOrientation.Landscape;
          }
          settings.size = new SizeF(imageWidth, imageHeight);
          section.setPageSettings(settings);
          let page = section.pages.add();
          let graphics = page.graphics;
          let imageStr = image.src.replace("data:image/jpeg;base64,", "");
          let pdfImage = new PdfBitmap(imageStr);
          graphics.drawImage(pdfImage, 0, 0, imageWidth, imageHeight);
          loadedPage++;
          if (loadedPage == count) {
            // Exporting the document as pdf
            pdfdocument.save(
              (contractName === "" ? "untitled" : contractName) + ".pdf"
            );
          }
        };
      }, 500);
    }
  };

  const handleContractNameChange = (e) => {
    setContractName(e.target.value);
  };

  const handleCodeChange = (e) => {
    setCode(e.target.value);
  };

  const handleSelectPartner = (data) => {
    setSelectedPartner(data);
  };
  const handleSelectApprover = (data) => {
    setSelectedApprovers(data);
  };
  const handleSelectViewer = (data) => {
    setSelectedViewers(data);
  };
  const handleSelectSigner = (data) => {
    setSelectedSigner(data);
  };

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
  };

  // const handleCreateClick = (e) => {
  //   e.preventDefault();
  //   let filePath = `files/${contractName}.docx`;
  //   editorObj.documentEditor
  //     .saveAsBlob("Docx")
  //     .then(function (exportedDocument) {
  //       // var formData = new FormData();
  //       // formData.append('fileName', 'sample.docx');
  //       // formData.append('data', exportedDocument);
  //       const fileRef = ref(filesDb, filePath);
  //       uploadBytes(fileRef, exportedDocument);
  //       // setPreviewUrl(URL.createObjectURL(exportedDocument));
  //     });
  //   let url = `https://firebasestorage.googleapis.com/v0/b/coms-64e4a.appspot.com/o/files%2F${contractName}.docx?alt=media&token=86218259-40cd-4c00-b12b-cd0342fffff4`;
  //   setUrl(url);
  //   // fetchCreateContract();
  // };

  const handleSaveAsDraftClick = (e) => {
    if (selectedPartner === null) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to choose a partner!",
      });
      return;
    }
    if (selectedApprovers === null) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to choose a approver!",
      });
      return;
    }
    if (selectedSigner === null) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You need to choose a signer!",
      });
      return;
    }
    e.preventDefault();
    let filePath = `files/${contractName}.docx`;
    editorObj.documentEditor
      .saveAsBlob("Docx")
      .then(function (exportedDocument) {
        // var formData = new FormData();
        // formData.append('fileName', 'sample.docx');
        // formData.append('data', exportedDocument);
        const fileRef = ref(filesDb, filePath);
        uploadBytes(fileRef, exportedDocument);
        // setPreviewUrl(URL.createObjectURL(exportedDocument));
      });
    let url = `https://firebasestorage.googleapis.com/v0/b/coms-64e4a.appspot.com/o/files%2F${contractName}.docx?alt=media&token=86218259-40cd-4c00-b12b-cd0342fffff4`;
    setUrl(url);
    fetchCreateDraft();
  };

  const fetchTemplateData = async () => {
    if (isFetched) {
      return;
    }
    const res = await fetch(
      `https://localhost:7073/Templates/get-template?id=${templateId}`,
      {
        mode: "cors",
        method: "GET",
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      }
    );
    if (res.status === 200) {
      const data = await res.json();
      setSfdt(data);
      console.log(data);
      if (data.sfdt) {
        try {
          editorObj.documentEditor.open(data.sfdt);
          console.log(data.sfdt);
        } catch (e) {
          console.error(e);
        }
      } else {
        console.error("The value of data.sfdt is null or undefined.");
      }
    } else {
      const data = await res.json();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: data.title,
      });
    }
  };

  const handleEditorClick = () => {
    setIsFetched(true);
  };

  useEffect(() => {
    fetchTemplateFields();
  }, []);

  return (
    <div>
      <form onSubmit={handleCreateClick}>
        <div className="topbar intro-y">
          <h2>Add New Contract</h2>
          <div>
            <div className="dropdown" ref={saveMenuRef}>
              <button
                className="dropdown-toggle btn btn-primary"
                aria-expanded="false"
                data-tw-toggle="dropdown"
                type="submit"
              >
                {" "}
                Create
                {/* <Icon icon="lucide:chevron-down" className="icon" /> */}
              </button>
              {/* <div className={saveMenuClass}>
                <ul className="dropdown-content">
                  <li>
                    <button className="dropdown-item" type="submit">
                      {" "}
                      <Icon icon="lucide:file-text" className="icon" /> As New
                      Contract{" "}
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={handleSaveAsDraftClick}
                    >
                      {" "}
                      <Icon icon="lucide:file-text" className="icon" /> As Draft{" "}
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={handleSavePdfClick}
                    >
                      {" "}
                      <Icon icon="lucide:file-text" className="icon" /> Export
                      to PDF{" "}
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={handleSaveDocClick}
                    >
                      {" "}
                      <Icon icon="lucide:file-text" className="icon" /> Export
                      to Word{" "}
                    </button>
                  </li>
                </ul>
              </div> */}
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
                      <div
                        className="tab-pane active"
                        role="tabpanel"
                        aria-labelledby="content-tab"
                      >
                        <div className="dark:border-darkmode-400">
                          <div className="dark:border-darkmode-400">
                            <Icon icon="lucide:chevron-down" className="icon" />{" "}
                            Contract Information{" "}
                          </div>
                          <div className="mt-5">
                            {fields.length > 0 ? (
                              <>
                                {fields.map((item) => (
                                  <>
                                    {item?.name === 'Company Signature' | item?.name === 'Partner Signature' ? (
                                      <input
                                        id={item?.name}
                                        name="fields"
                                        type="text"
                                        className={"intro-y form-control py-3 px-4 box pr-10 " + (item?.isReadOnly ? "isReadonly" : "")}
                                        placeholder={"Type " + item?.name + "..."}
                                        value={item?.content}
                                        required readOnly={item?.isReadOnly}
                                        style={{display: "none"}}
                                      />
                                    ) : (
                                      <div>
                                        <div>
                                          {item?.name} <span>*</span>
                                        </div>
                                        {item?.type === "text" ? (
                                          <input
                                            id={item?.name}
                                            name="fields"
                                            type="text"
                                            className={"intro-y form-control py-3 px-4 box pr-10 " + (item?.isReadOnly ? "isReadonly" : "")}
                                            placeholder={"Type " + item?.name + "..."}
                                            value={item?.content}
                                            required readOnly={item?.isReadOnly}
                                          />
                                        ) : (
                                          <input
                                            id={item?.name}
                                            name="fields"
                                            type="number"
                                            className={"intro-y form-control py-3 px-4 box pr-10 " + (item?.isReadOnly ? "isReadonly" : "")}
                                            placeholder={"Type " + item?.name + "..."}
                                            value={item?.content}
                                            required readOnly={item?.isReadOnly}
                                            min={item?.minValue}
                                          />
                                        )}
                                      </div>
                                    )}
                                  </>
                                ))}
                              </>
                            ) : (
                              <div></div>
                            )}
                            <div>
                              <div>
                                Effective Date <span>*</span>
                              </div>
                              <input
                                className="form-control"
                                type="datetime-local"
                                name="effectiveDate"
                                value={effectiveDate}
                                onChange={handleEffectiveDateChange}
                                min={getCurrentDateTime()} // Thêm thuộc tính min
                                required
                              />
                            </div>
                            <div>
                              <div>
                                Send Date <span>*</span>
                              </div>
                              <input
                                className="form-control"
                                type="datetime-local"
                                name="sendDate"
                                value={sendDate}
                                onChange={handleSendDateChange}
                                min={getCurrentDateTime()} // Thêm thuộc tính min
                                required
                              />
                            </div>
                            <div>
                              <div>
                                Review Date <span>*</span>
                              </div>
                              <input
                                className="form-control"
                                type="datetime-local"
                                name="reviewDate"
                                value={reviewDate}
                                onChange={handleReviewDateChange}
                                min={getCurrentDateTime()} // Thêm thuộc tính min
                                required
                              />
                            </div>
                            {/* <div>
                              <div>
                                Code <span>*</span>
                              </div>
                              <input
                                type="text"
                                className="intro-y form-control py-3 px-4 box pr-10"
                                value={code}
                                onChange={handleCodeChange}
                                placeholder="Contract Code"
                                required
                              />
                            </div> */}
                            {/* <div>
                              <div>
                                Effective Date <span>*</span>
                              </div>
                              <input
                                className="form-control"
                                type="datetime-local"
                                name="fieldContent"
                                value={effectiveDate}
                                onChange={handleEffectiveDateChange}
                                min={getCurrentDateTime()} // Thêm thuộc tính min
                                required
                              />
                            </div> */}
                            {/* <div>
                              <div>
                                Partner <span>*</span>
                              </div>
                              <Select
                                id="select-partner"
                                options={partnerList}
                                className="form-select"
                                value={selectedPartner}
                                onChange={handleSelectPartner}
                                required
                              />
                            </div> */}
                            {/* <div>
                              <div>
                                Signer <span>*</span>
                              </div>
                              <Select
                                id="select-signer"
                                options={mangerList}
                                placeholder="Choose Signer!"
                                className="form-select"
                                value={selectedSigner}
                                onChange={handleSelectSigner}
                                required
                              />
                            </div> */}
                            {/* <div>
                              <div>
                                Approver <span>*</span>
                              </div>
                              <Select
                                options={mangerList}
                                className="select"
                                placeholder="Choose Approver!"
                                isSearchable
                                isMulti
                                name="services"
                                value={selectedApprovers}
                                onChange={handleSelectApprover}
                              />
                            </div> */}


                            {/* <div>
                              <div>
                                Viewer <span></span>
                              </div>
                              <Select
                                options={userList}
                                className="select"
                                placeholder="Choose Viewer!"
                                isSearchable
                                isMulti
                                name="viewer"
                                value={selectedViewers}
                                onChange={handleSelectViewer}
                              />
                            </div> */}
                          </div>
                        </div>
                      </div>
                      {/* <div
                        className="tab-pane active"
                        role="tabpanel"
                        aria-labelledby="content-tab"
                      >
                        <div className="dark:border-darkmode-400">
                          <div className="dark:border-darkmode-400">
                            <Icon icon="lucide:chevron-down" className="icon" />{" "}
                            Contract Content{" "}
                          </div>
                          <div className="mt-5">
                            <div>
                              <div>
                                <div className="parent">
                                  <div>
                                    <div
                                      className="form-group col-md-12 editor"
                                      onClick={handleEditorClick}
                                    >
                                      <DocumentEditorContainerComponent
                                        id="content"
                                        ref={(ins) => (editorObj = ins)}
                                        height="900"
                                        enableToolbar={true}
                                        toolbarItems={items}
                                        readOnly={true}
                                        showPropertiesPane={true}
                                        serviceUrl="https://ej2services.syncfusion.com/production/web-services/api/documenteditor/"
                                      >
                                        <Inject services={[Toolbar]}></Inject>
                                      </DocumentEditorContainerComponent>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Contract;
