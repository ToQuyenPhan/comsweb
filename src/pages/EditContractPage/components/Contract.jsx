import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import "react-datepicker/dist/react-datepicker.css";
import "../css/_contract.css";
import "../css/_top-bar.css";
import { useRef, useState } from "react";
import Swal from "sweetalert2";

function Contract() {
  const [fields, setFields] = useState([]);
  const [effectiveDate, setEffectiveDate] = useState("");
  const [sendDate, setSendDate] = useState("");
  const [reviewDate, setReviewDate] = useState("");
  const location = useLocation();
  const contractCategoryId = location.state.contractCategoryId;
  const partnerId = location.state.partnerId;
  const serviceId = location.state.serviceId;
  const contractId = location.state.contractId;
  const [saveMenuClass, setSaveMenuClass] = useState("dropdown-menu");
  const [loading, setLoading] = useState(false);
  const [isReviewDateInvalid, setIsReviewDateInvalid] = useState(true);
  const [isSendDateInvalid, setIsSendDateInvalid] = useState(true);
  const [isEffectiveDateInvalid, setIsEffectiveDateInvalid] = useState(true);
  const saveMenuRef = useRef(null);
  const token = localStorage.getItem("Token");
  const navigate = useNavigate();

  const fetchContractFields = async () => {
    try {
      const res = await fetch(`https://localhost:7073/ContractFields?contractId=${contractId}&partnerId=${partnerId}&serviceId=${serviceId}`, {
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
    setLoading(true);
    var inputs = document.getElementsByName("fields");
    var values = [].map.call(inputs, function (input) {
      return input.value;
    });
    var names = [].map.call(fields, function (field) {
      return field.name;
    });
    const res = await fetch("https://localhost:7073/Contracts/preview", {
      mode: "cors",
      method: "POST",
      headers: new Headers({
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json"
      }),
      body: JSON.stringify({
        name: names,
        value: values,
        contractCategoryId: contractCategoryId,
        templateType: 0
      }),
    });
    if (res.status === 200) {
      const data = await res.blob();
      navigate("/preview-contract", {
        state: {
          file: data, contractCategoryId: contractCategoryId, serviceId: serviceId,
          partnerId: partnerId, names: names, values: values, effectiveDate: effectiveDate, sendDate: sendDate, reviewDate: reviewDate,
          fields: fields, action: "edit", contractId: contractId
        }
      });
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
    if (sendDate !== "" && e.target.value < sendDate) {
      setIsEffectiveDateInvalid(false);
      return;
    } else {
      if (reviewDate !== "" && e.target.value < reviewDate) {
        setIsEffectiveDateInvalid(false);
        return;
      } else {
        setIsEffectiveDateInvalid(true);
      }
    }
    setEffectiveDate(e.target.value);
  };

  const handleSendDateChange = (e) => {
    if (reviewDate !== "" && e.target.value >= reviewDate) {
      setIsSendDateInvalid(false);
      return;
    } else {
      if (effectiveDate !== "" && e.target.value >= effectiveDate) {
        setIsSendDateInvalid(false);
        return;
      } else {
        setIsSendDateInvalid(true);
      }
    }
    setSendDate(e.target.value);
  };

  const handleReviewDateChange = (e) => {
    if (sendDate !== "" && e.target.value < sendDate) {
      setIsReviewDateInvalid(false);
      return;
    } else {
      if (effectiveDate !== "" && e.target.value >= effectiveDate) {
        setIsReviewDateInvalid(false);
        return;
      } else {
        setIsReviewDateInvalid(true);
      }
    }
    setReviewDate(e.target.value);
  };

  const handleContentChange = (id, data) => {
    const index = fields.findIndex(field => field.id === id);
    var newFields = [...fields];
    newFields[index]["content"] = data.target.value;
    setFields(newFields);
  }

  const closeSaveMenu = (e) => {
    if (!saveMenuRef?.current?.contains(e.target)) {
      setSaveMenuClass("dropdown-menu");
    }
  };

  document.addEventListener("mousedown", closeSaveMenu);

  const getCurrentDateTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate() + 1).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    console.log(location.state.oldFields);
    if (location.state.oldFields !== undefined || location.state.oldFields) {
      setFields(location.state.oldFields);
    } else {
      fetchContractFields();
    }
    if (location.state.sendDate !== undefined || location.state.sendDate) {
      setSendDate(location.state.sendDate);
    }
    if (location.state.reviewDate !== undefined || location.state.reviewDate) {
      setReviewDate(location.state.reviewDate);
    }
    if (location.state.effectiveDate !== undefined || location.state.effectiveDate) {
      setEffectiveDate(location.state.effectiveDate);
    }
  }, []);

  return (
    <div>
      <form onSubmit={handleCreateClick}>
        <div className="create-contract-topbar intro-y">
          <h2>Edit Contract</h2>
          <div>
            <div className="dropdown" ref={saveMenuRef}>
              <button
                className="dropdown-toggle btn btn-primary"
                aria-expanded="false"
                data-tw-toggle="dropdown"
                type="submit"
              >
                {" "}
                <Icon icon="line-md:loading-alt-loop" style={{ display: loading ? "block" : "none" }} className='icon' />Edit
              </button>
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
                                    {item?.name === 'Company Signature' | item?.name === 'Partner Signature' | item?.name === "Created Date" ? (
                                      <input
                                        id={item?.name}
                                        name="fields"
                                        type="text"
                                        className={"intro-y form-control py-3 px-4 box pr-10 " + (item?.isReadOnly ? "isReadonly" : "")}
                                        placeholder={"Type " + item?.name + "..."}
                                        value={item?.content}
                                        required readOnly={item?.isReadOnly}
                                        style={{ display: "none" }}
                                      />
                                    ) : (
                                      <div>
                                        {item?.name.includes('Duration') ? (
                                          <div>
                                            {item?.name + " (month)" } <span>*</span>
                                          </div>
                                        ) : (
                                          <div>
                                            {item?.name} <span>*</span>
                                          </div>
                                        )}
                                        {item?.type === "text" ? (
                                          <input
                                            id={item?.name}
                                            name="fields"
                                            type="text"
                                            className={"intro-y form-control py-3 px-4 box pr-10 " + (item?.isReadOnly ? "isReadonly" : "")}
                                            placeholder={"Type " + item?.name + "..."}
                                            value={item?.content} onChange={(e) => handleContentChange(item?.id, e)}
                                            required readOnly={item?.isReadOnly}
                                          />
                                        ) : (
                                          <input
                                            id={item?.name}
                                            name="fields"
                                            type="number"
                                            className={"intro-y form-control py-3 px-4 box pr-10 " + (item?.isReadOnly ? "isReadonly" : "")}
                                            placeholder={"Type " + item?.name + "..."}
                                            value={item?.content} onChange={(e) => handleContentChange(item?.id, e)}
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
                                Send Date <span>*</span>
                              </div>
                              <input
                                className="form-control"
                                type="date"
                                name="sendDate"
                                value={sendDate}
                                onChange={handleSendDateChange}
                                min={getCurrentDateTime()} // Thêm thuộc tính min
                                required
                              />
                              <div><span style={{ display: (isSendDateInvalid ? "none" : "block") }}>Send Date should be before Review Date and Efffective Date!</span></div>
                            </div>
                            <div>
                              <div>
                                Review Date <span>*</span>
                              </div>
                              <input
                                className="form-control"
                                type="date"
                                name="reviewDate"
                                value={reviewDate}
                                onChange={handleReviewDateChange}
                                min={getCurrentDateTime()} // Thêm thuộc tính min
                                required
                              />
                              <div><span style={{ display: (isReviewDateInvalid ? "none" : "block") }}>Review Date should be after Send Date and before Effective Date!</span></div>
                            </div>
                            <div>
                              <div>
                                Effective Date <span>*</span>
                              </div>
                              <input
                                className="form-control"
                                type="date"
                                name="effectiveDate"
                                value={effectiveDate}
                                onChange={handleEffectiveDateChange}
                                min={getCurrentDateTime()} // Thêm thuộc tính min
                                required
                              />
                              <div><span style={{ display: (isEffectiveDateInvalid ? "none" : "block") }}>Effective Date should be after Send Date and Review Date!</span></div>
                            </div>
                          </div>
                        </div>
                      </div>
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
