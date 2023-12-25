import React from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import '../css/_export.css';

const Export = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("Token");
  let contractId = null;

  try {
    if (!location.state || !location.state.contractId) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: 'No contractId provided',
      });
    } else {
      contractId = location.state.contractId;
    }
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: 'No contractId provided',
    });
  }

  const handleApproveClick = async () => {
    try {
      console.log("Fetching Approve Contract By Manager...");
      const res = await fetch(
        `https://localhost:7073/PartnerReviews/approveOrReject?contractId=${contractId}&isApproved=true`,
        {
          mode: "cors",
          method: "PUT",
          headers: new Headers({
            Authorization: `Bearer ${token}`,
          }),
        }
      );
      if (res.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Approve Contract Successfully!",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/partner-waiting-contract");
      } else {
        const data = await res.json();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: data.title,
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleRejectClick = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          console.log("Fetching Approve Contract By Manager...");
          const res = await fetch(
            `https://localhost:7073/PartnerReviews/approveOrReject?contractId=${contractId}&isApproved=false`,
            {
              mode: "cors",
              method: "PUT",
              headers: new Headers({
                Authorization: `Bearer ${token}`,
              }),
            }
          );
          if (res.status === 200) {
            Swal.fire({
              position: "center",
              icon: "success",
              title: "Rejected Contract.",
              showConfirmButton: false,
              timer: 1500,
            });
            navigate("/partner-waiting-contract");
          } else {
            const data = await res.json();
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: data.title,
            });
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  return (
    <div className="export">
      <button className="btn" onClick={handleApproveClick}>Approve</button>
      <button className="btn" onClick={handleRejectClick}>Reject</button>
    </div>
  );
};

export default Export;
