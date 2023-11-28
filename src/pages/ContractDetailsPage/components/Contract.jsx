import { formatDistanceToNow } from "date-fns";
import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

function Contract() {
  const [contract, setContract] = useState(null);
  const location = useLocation();
  const [categorieName, setCategorieName] = useState(null);
  const token = localStorage.getItem("Token");
  // const contractId = location.state.contractId;
  const contractId = "1";

  const fetchContractTempplate = async () => {
    try {
      console.log("Fetching Contract Tempplate...");
      const res = await fetch(`https://localhost:7073/Templates/${contractId}`, {
        mode: "cors",
        method: "GET",
        headers: new Headers({
            Authorization: `Bearer ${token}`
        }),
    });
    if (res.status === 200) {
        const data = await res.json();
        console.log(data);
        setCategorieName(data.contractCategoryName);
    } else {
        const data = await res.json();
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.title
        })
    }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.title
    })
    }
    
};
  
const fetchContract = async () => {
  try {
    console.log("Fetching contract...");
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
    setContract(data);
  ;
  } catch (error) {
    console.error("Error fetching contract:", error);
  }
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetchContract();
        await fetchContractTempplate();
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div>
      {contract ? (
        <div class="content" >
          <h2 class="text-lg font-medium truncate mr-5">
            {contract.contractName}
          </h2>
          
          <div class="flex items-center mb-2">
            <div class="inline-block px-2 py-0.5 bg-slate-200 text-slate-600 dark:bg-darkmode-300 dark:text-slate-400 text-xs rounded-md mr-1">
              {categorieName}
            </div>
            <div class="leading-relaxed text-slate-500 text-xs">
              {formatDistanceToNow(new Date(contract.updatedDate))} ago
            </div>
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
