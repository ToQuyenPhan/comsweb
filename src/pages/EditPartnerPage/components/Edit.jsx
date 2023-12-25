import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import { jwtDecode } from "jwt-decode";
import "../css/_edit.css";
import { filesDb } from "../../../components/Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

function Edit() {
  const [partner, setPartner] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("Token");
  let partnerId = location.state?.partnerId;
  const [error, setError] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [formInputs, setFormInputs] = useState({
    image: "",
    representative: "",
    representativePosition: "",
    email: "",
    code: "",
    phone: "",
    address: "",
    companyName: "",
    taxCode: "",
  });

  const fetchPartnerData = async (async) => {
    const res = await fetch(`https://localhost:7073/Partners/${partnerId}`, {
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

  const handleUploadClick = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*"; // only accept image files
    fileInput.hidden = true;
    fileInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (file) {
        let filename = file.name;
        let storageRef = ref(filesDb, `images/${filename}`);
        handleUpload(file, filename);
        console.log("filename1: " + filename);
      }
    });
    fileInput.click();
  };

  const handleUpload = async (file, filename) => {
    setIsUploading(true);
    let storageRef = ref(filesDb, `attachments/${filename}`);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const uploadTask = uploadBytesResumable(storageRef, file);
      let url;

      uploadTask.on(
        "state_changed",
        async (snapshot) => {
          var progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
        },
        (error) => {
          // Handle the error here
          console.log(error);
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Upload fails.",
          });
        },
        async () => {
          // Upload completed successfully, now we can get the download URL
          await getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            url = downloadURL;
            setFormInputs((prevState) => ({ ...prevState, image: url })); // Update the image URL in the state
          });
          console.log("url: " + url);
          setIsUploading(false);
        }
      );
    };
    reader.readAsDataURL(file);
    //fetchAttachmentData();
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

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const errors = {};
    for (const key in formInputs) {
      if (formInputs[key] === null || formInputs[key] === "") {
        errors[key] = `${key} is required.`;
      }
    }

    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }

    const res = await fetch(
      `https://localhost:7073/Partners/update?id=${partnerId}`,
      {
        mode: "cors",
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formInputs),
      }
    );

    if (res.status === 200) {
      Swal.fire({
        title: "Updated!",
        text: "Partner information has been updated.",
        icon: "success",
      });
      navigate("/partner-details", {
        state: {
          partnerId: partnerId,
        },
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
  const handleInputChange = (event) => {
    setFormInputs({
      ...formInputs,
      [event.target.name]: event.target.value,
    });
  };

  const handlePartner = (id) => {
    navigate("/partner-details", {
      state: {
        partnerId: id,
      },
    });
  };

  useEffect(() => {
    if (partner) {
      setFormInputs({
        image: partner.image || "",
        representative: partner.representative || "",
        representativePosition: partner.representativePosition || "",
        email: partner.email || "",
        code: partner.code || "",
        phone: partner.phone || "",
        address: partner.address || "",
        companyName: partner.companyName || "",
        taxCode: partner.taxCode || "",
      });
    }
  }, [partner]);

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
      <h2>Edit Partner Information</h2>
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
            <img alt="avatar" src={formInputs.image} />
            <div title="Remove this profile photo?">
              {" "}
              <i data-lucide="x"></i>{" "}
            </div>
          </div>
          <div>
            
          <button
  onClick={handleUploadClick}
  disabled={isUploading}
  className="btn btn-primary"
  type="button"
  style={isUploading ? { backgroundColor: 'gray', borderColor: 'gray' } : {}}
>
  Change Photo
</button>
          </div>
        </div>
        <div>
          <div>
            <div>
              <div>
                <label htmlFor="update-profile-form-1">Representative</label>
                <input
                  type="text"
                  name="representative"
                  placeholder="Input Representative"
                  value={formInputs.representative}
                  onChange={handleInputChange}
                  style={error.representative ? { borderColor: "red" } : {}}
                />
                {error.representative && (
                  <p style={{ color: "red" }}>{error.representative}</p>
                )}
              </div>
              <div>
                <label htmlFor="update-profile-form-1">
                  Representative Position
                </label>
                <input
                  id="update-profile-form-1"
                  type="text"
                  name="representativePosition"
                  placeholder="Input Representative Position"
                  value={formInputs.representativePosition}
                  onChange={handleInputChange}
                  style={
                    error.representativePosition ? { borderColor: "red" } : {}
                  }
                />
                {error.representativePosition && (
                  <p style={{ color: "red" }}>{error.representativePosition}</p>
                )}
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="update-profile-form-1">Email</label>
                <input
                  id="update-profile-form-1"
                  type="text"
                  name="email"
                  placeholder="Input Email"
                  value={formInputs.email}
                  onChange={handleInputChange}
                  style={error.email ? { borderColor: "red" } : {}}
                />
                {error.email && <p style={{ color: "red" }}>{error.email}</p>}
              </div>
              <div>
                <label htmlFor="update-profile-form-1">Code</label>
                <input
                  id="update-profile-form-1"
                  type="text"
                  name="code"
                  placeholder="Input Code"
                  value={formInputs.code}
                  onChange={handleInputChange}
                  style={error.code ? { borderColor: "red" } : {}}
                />
                {error.code && <p style={{ color: "red" }}>{error.code}</p>}
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
                  name="phone"
                  placeholder="Input Phone"
                  value={formInputs.phone}
                  onChange={handleInputChange}
                  style={error.phone ? { borderColor: "red" } : {}}
                />
                {error.phone && <p style={{ color: "red" }}>{error.phone}</p>}
              </div>
              <div>
                <label htmlFor="update-profile-form-1">Address</label>
                <input
                  id="update-profile-form-1"
                  type="text"
                  name="address"
                  placeholder="Input Address"
                  value={formInputs.address}
                  onChange={handleInputChange}
                  style={error.address ? { borderColor: "red" } : {}}
                />
                {error.address && (
                  <p style={{ color: "red" }}>{error.address}</p>
                )}
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="update-profile-form-1">Company Name</label>
                <input
                  id="update-profile-form-1"
                  name="companyName"
                  type="text"
                  placeholder="Input Company Name"
                  value={formInputs.companyName}
                  onChange={handleInputChange}
                  style={error.companyName ? { borderColor: "red" } : {}}
                />
                {error.companyName && (
                  <p style={{ color: "red" }}>{error.companyName}</p>
                )}
              </div>
              <div>
                <label htmlFor="update-profile-form-1">Tax Code</label>
                <input
                  id="update-profile-form-1"
                  name="taxCode"
                  type="text"
                  placeholder="Input Tax Code"
                  value={formInputs.taxCode}
                  onChange={handleInputChange}
                  style={error.taxCode ? { borderColor: "red" } : {}}
                />
                {error.taxCode && (
                  <p style={{ color: "red" }}>{error.taxCode}</p>
                )}
              </div>
            </div>
            <div>
              {/* <button
                className="btn btn-primary"
                type="button"
                style={{
                  backgroundColor: partner?.status === 0 ? "green" : "red",
                  color: "white",
                }}
                onClick={() => handleUpdateStatusClick(partner?.id)}
              >
                {partner?.status === 0 ? "Active" : "Inactive"}
              </button> */}
              <button
                className="btn btn-primary"
                type="button"
                style={{
                  backgroundColor: "blue",
                  color: "white",
                }}
                onClick={handleFormSubmit}
              >
                Save
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

export default Edit;
