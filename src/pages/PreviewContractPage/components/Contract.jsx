import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import "react-datepicker/dist/react-datepicker.css";
import "../css/_contract.css";
import "../css/_top-bar.css";
import { useState } from "react";
import Swal from "sweetalert2";

function Contract() {
  const [loading, setLoading] = useState(true);
  const [isFetched, setIsFetched] = useState(false);
  const [file, setFile] = useState();
  const token = localStorage.getItem("Token");;
  const navigate = useNavigate();
  const location = useLocation();
  let contractCategoryId = null;
  let partnerId = null;
  let serviceId = null;
  let names = null;
  let values = null;
  let effectiveDate = null;
  let sendDate = null;
  let reviewDate = null;

  const getData = () => {
    try {
      contractCategoryId = location.state.contractCategoryId;
      partnerId = location.state.partnerId;
      serviceId = location.state.serviceId;
      names = location.state.names;
      values = location.state.values;
      effectiveDate = location.state.effectiveDate;
      sendDate = location.state.sendDate;
      reviewDate = location.state.reviewDate;
      setFile(location.state.file);
      setLoading(false);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Cannot access this page!",
      });
      navigate("/");
    }
  }

  const handleConfirmClick = async () => {
    setIsFetched(true);
    contractCategoryId = location.state.contractCategoryId;
    partnerId = location.state.partnerId;
    serviceId = location.state.serviceId;
    names = location.state.names;
    values = location.state.values;
    effectiveDate = location.state.effectiveDate;
    sendDate = location.state.sendDate;
    reviewDate = location.state.reviewDate;
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
        status: 8
      }),
    });
    if (res.status === 200) {
      const data = await res.json();
      const res2 = await fetch(`https://localhost:7073/Contracts/upload?id=${data}`, {
        mode: "cors",
        method: "POST",
        headers: new Headers({
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        }),
      });
      if (res2.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Create Contract Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/contract-details", {
          state: {
            contractId: data
          }
        });
      } else {
        const data2 = await res2.json();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data2.title,
        });
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

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="topbar intro-y">
        <h2>Add New Contract</h2>
        <div>
          <div className="dropdown">
            <button
              className="dropdown-toggle btn btn-primary"
              aria-expanded="false"
              data-tw-toggle="dropdown"
              type="button"
              onClick={handleConfirmClick}
            >
              {" "}
              <Icon icon="line-md:loading-alt-loop" style={{ display: isFetched ? "block" : "none" }} className='icon' />Confirm
            </button>
          </div>
        </div>
      </div>
      <div className="main">
        <div className="main-body">
          <div className="main-content">
            <div className="pos intro-y preview-contract">
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
                          Preview Contract{" "}
                        </div>
                        <div className="mt-5" >
                          {loading ? (
                            <div style={{ textAlign: "center" }}>
                              <Icon icon="line-md:loading-alt-loop" className='icon' />
                            </div>
                          ) : (
                            <div>
                              <iframe width="100%" height="1000px" src={URL.createObjectURL(file)} />
                            </div>
                          )}
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
    </div>
  );
}

export default Contract;