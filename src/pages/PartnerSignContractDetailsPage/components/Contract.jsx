import { formatDistanceToNow } from "date-fns";
import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../css/contract-details.css";
import $ from "jquery";
import "../js/jquery.signalR-2.4.1";
import "../css/_sign.css";

function Contract() {
  const [state, setState] = useState({
    contract: null,
    contractFile: null,
    responseFields: {
      isSuccess: false,
      code: null,
      responseSuccess: null,
      responseFailed: null,
    },
  });

  const txtLogRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const { contract, contractFile, responseFields } = state;
  const token = localStorage.getItem("Token");
  let contractId = location.state?.contractId;

  const fetchContract = async () => {
    try {
      const response = await fetch(
        `https://localhost:7073/Contracts/id?id=${contractId}`,
        {
          mode: "cors",
          method: "GET",
          headers: new Headers({
            Authorization: `Bearer ${token}`,
          }),
        }
      );
      const data = await response.json();
      setState((prevState) => ({ ...prevState, contract: data }));
    } catch (error) {
      console.error("Error fetching contract:", error);
    }
  };

  const fetchContractFile = async () => {
    try {
      const response = await fetch(
        `https://localhost:7073/ContractFiles/contractId?contractId=${contractId}`,
        {
          mode: "cors",
          method: "GET",
          headers: new Headers({
            Authorization: `Bearer ${token}`,
          }),
        }
      );
      const data = await response.json();
      setState((prevState) => ({ ...prevState, contractFile: data }));
    } catch (error) {
      console.error("Error fetching contract file:", error);
    }
  };

  const writeToLog = (log) => {
    $(txtLogRef.current).append(log + "\n");
  };

  const handleConnect = async () => {
    const connection = $.hubConnection("http://localhost:8080/signalr/hubs");
    const simpleHubProxy = connection.createHubProxy("simpleHub");

    simpleHubProxy.on("addMessage", (name, message) => {
      try {
        setState((prevState) => ({
          ...prevState,
          responseFields: JSON.parse(message),
        }));
      } catch (error) {
        console.error("Error parsing JSON:", error.message);
      }
    });

    connection.start().done(() => {
      writeToLog("Connected.");
      simpleHubProxy.invoke("setUserName", "user");
      simpleHubProxy.invoke(
        "send",
        JSON.stringify({
          llx: 0,
          lly: 0,
          urx: 100,
          ury: 250,
          searchText: "",
          FileType: "PDF",
          Token: `${token}`,
          FileID: `${contractFile?.uuid}`,
        })
      );
    });
  };

  useEffect(() => {
    if (responseFields.code !== null) {
      console.log(responseFields);

      if (!responseFields.isSuccess) {
        console.log(
          `Code: ${responseFields.code}, Response Failed: ${responseFields.responseFailed}`
        );

        Swal.fire({
          title: "Loading...",
          onBeforeOpen: () => Swal.showLoading(),
        });

        setTimeout(() => {
          Swal.update({
            icon: "error",
            title: "",
            text: responseFields.responseFailed,
          });
        }, 10000);
      } else {
        console.log(
          `Code: ${responseFields.code}, Response Success: ${responseFields.responseSuccess}`
        );

        Swal.fire({
          position: "center",
          icon: "success",
          title: "Sign Successfully",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/waiting-sign-contract");
      }
    }
  }, [responseFields]);

  useEffect(() => {
    if (contractId) {
      fetchContractFile();
      fetchContract();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No contractId provided",
      });
    }
  }, [contractId]);

  return (
    <div className="contract-details">
      {contract ? (
        <div className="contract-detail-conten">
          <div>
            <h2 className="contract-name">{contract.contractName}</h2>
            <div className="categoryName">{contract.contractCategory}</div>
          </div>
          <div>
            <div className="leading-relaxed text-slate-500 text-xs">
              {contract.updatedDate !== null
                ? `Updated ${formatDistanceToNow(
                    new Date(contract.updatedDate)
                  )} ago`
                : `Created ${formatDistanceToNow(
                    new Date(contract.createdDate)
                  )} ago`}
            </div>
          </div>
          <div className="sign">
            <button className="btn" onClick={handleConnect}>
              Sign
            </button>
          </div>
          <div>
            <object
              data={contract.link}
              type="application/pdf"
              width="100%"
              height="900px"
            >
              <p>
                Alternative text - include a link{" "}
                <a href={contract.link}>to the PDF!</a>
              </p>
            </object>
          </div>
        </div>
      ) : (
        <p>Loading contract...</p>
      )}
    </div>
  );
}

export default Contract;
