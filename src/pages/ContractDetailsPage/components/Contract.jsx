import { formatDistanceToNow } from "date-fns";
import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";

//test with contractId = 5
function Contract({ contractId = "5" }) {
  const [contract, setContract] = useState(null);
  
  const token = localStorage.getItem("Token");

  useEffect(() => {
    const fetchContract = async () => {
        try {
            const response = await fetch(`https://localhost:7073/Contracts/${contractId}`, {
                mode: "cors",
                method: "GET",
                headers: new Headers({
                    Authorization: `Bearer ${token}`
                }),
            });
            const data = await response.json();
            setContract(data);
        } catch (error) {
            console.error("Error fetching contract:", error);
        }
    };

    fetchContract();
  }, [contractId]);

  return (
    <div>
      {contract ? (
        <div>
          <h2>{contract.contractName}</h2>
          <p>Update Date: {formatDistanceToNow(new Date(contract.updatedDate))} ago</p>
          <div>
            <object
              data={contract.link}
              type="application/pdf"
            width="100%"
            height="900px"
            >
              <p>
                Alternative text - include a link{" "}
                <a href={contract.link}>
                  to the PDF!
                </a>
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
