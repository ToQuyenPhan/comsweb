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
  const [saveMenuClass, setSaveMenuClass] = useState("dropdown-menu");
  const [loading, setLoading] = useState(false);
  const saveMenuRef = useRef(null);
  const token = localStorage.getItem("Token");
  const navigate = useNavigate();

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
        contractCategoryId: contractCategoryId
      }),
    });
    if(res.status === 200){
      const data = await res.blob();
      navigate("/preview-contract", {state: {file: data, contractCategoryId: contractCategoryId, serviceId: serviceId, 
          partnerId: partnerId, names: names, values: values, effectiveDate: effectiveDate, sendDate: sendDate, reviewDate: reviewDate}});
    }else {
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
    const day = String(now.getDate()).padStart(2, "0");
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}`;
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
                <Icon icon="line-md:loading-alt-loop" style={{display: loading ? "block" : "none"}} className='icon' />Create
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
                                    {item?.name === 'Company Signature' | item?.name === 'Partner Signature' ? (
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
