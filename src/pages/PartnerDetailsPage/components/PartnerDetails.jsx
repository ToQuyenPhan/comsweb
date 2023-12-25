import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import "../css/_details.css";

function Details() {
  const [partner, setPartner] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("Token");
  let partnerId = location.state?.partnerId;

  const fetchPartnerData = async async => {
    const res = await fetch(`https://localhost:7073/Partners?id=${partnerId}`, {
      mode: "cors",
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${token}`,
      }),
    });
    if (res.status === 200) {
      const data = await res.json();
      setPartner(data);
    } else {
      const data = await res.json();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: data.title,
      });
    }
  };

  const handleUpdateStatusClick = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "That partner's status will change!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(
          `https://localhost:7073/Partners/update-status?id=${id}`,
          {
            mode: "cors",
            method: "PUT",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (res.status === 200) {
          Swal.fire({
            title: "Change!",
            text: "Status has been changed.",
            icon: "success",
          });
          fetchPartnerData();
        } else {
          const data = await res.json();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: data.title,
          });
        }
      }
    });
  };

  const handlePartner = (id) => {
    navigate("/edit-partner", {
      state: {
        partnerId: id,
      },
    });
  };

  useEffect(() => {
    if (!location.state || !location.state.partnerId) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "You accessed this page in wrong way!",
      });
      navigate("/partner-list");
    } else {
      fetchPartnerData(location.state.partnerId);
    }
  }, []);

  return (
    <div className="partner-details">
      <h2>Partner Information</h2>
      <div>
        <div>
          <span
            style={{
              color: partner?.status === 0 ? "red" : "green",
            }}
          >
            {partner?.statusString}
          </span>
          <div>
            <img alt="avatar" src={partner?.image} />
            <div title="Remove this profile photo?">
              {" "}
              <i data-lucide="x"></i>{" "}
            </div>
          </div>
          <div>
            {/* <button className="btn btn-primary" type="button">
              Change Photo
            </button> */}
          </div>
        </div>
        <div>
          <div>
            <div>
              <div>
                <label htmlFor="update-profile-form-1">Representative</label>
                <input
                  id="update-profile-form-1"
                  type="text"
                  placeholder="Input text"
                  value={partner?.representative}
                  disabled
                />
              </div>
              <div>
                <label htmlFor="update-profile-form-1">
                  Representative Position
                </label>
                <input
                  id="update-profile-form-1"
                  type="text"
                  placeholder="Input text"
                  value={partner?.representativePosition}
                  disabled
                />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="update-profile-form-1">Email</label>
                <input
                  id="update-profile-form-1"
                  type="text"
                  placeholder="Input text"
                  value={partner?.email}
                  disabled
                />
              </div>
              <div>
                <label htmlFor="update-profile-form-1">Code</label>
                <input
                  id="update-profile-form-1"
                  type="text"
                  placeholder="Input text"
                  value={partner?.code}
                  disabled
                />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <div>
                <label htmlFor="update-profile-form-1">Phone</label>
                <input
                  id="update-profile-form-1"
                  type="text"
                  placeholder="Input text"
                  value={partner?.phone}
                  disabled
                />
              </div>
              <div>
                <label htmlFor="update-profile-form-1">Address</label>
                <input
                  id="update-profile-form-1"
                  type="text"
                  placeholder="Input text"
                  value={partner?.address}
                  disabled
                />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="update-profile-form-1">Company Name</label>
                <input
                  id="update-profile-form-1"
                  type="text"
                  placeholder="Input text"
                  value={partner?.companyName}
                  disabled
                />
              </div>
              <div>
                <label htmlFor="update-profile-form-1">Tax Code</label>
                <input
                  id="update-profile-form-1"
                  type="text"
                  placeholder="Input text"
                  value={partner?.taxCode}
                  disabled
                />
              </div>
            </div>
            <div>
              <button
                className="btn btn-primary"
                type="button"
                style={{
                  backgroundColor: partner?.status === 0 ? "green" : "red",
                  color: "white",
                }}
                onClick={() =>
                  handleUpdateStatusClick(partner?.id)
                }
              >
                {partner?.status === 0 ? "Active" : "Inactive"}
              </button>
              <button
                className="btn btn-primary"
                type="button"
                style={{
                  backgroundColor:  "blue",
                  color: "white",
                }}
                onClick={() => handlePartner(partner?.id)}
              >
                Edit
              </button>
              <button
                className="btn btn-primary"
                type="button"
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
