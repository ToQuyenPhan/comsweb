import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../css/attachment.css";
import { Icon } from '@iconify/react';

function Attachment() {
  const [attachment, setAttachment] = useState(null);
  const location = useLocation();
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

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await fetch(
          `https://localhost:7073/Attachments/${contractId}`,
          {
            mode: "cors",
            method: "GET",
            headers: new Headers({
              Authorization: `Bearer ${token}`,
            }),
          }
        );
        const data = await response.json();
        setAttachment(data);
      } catch (error) {
        console.error("Error fetching contract:", error);
      }
    };

    fetchComment();
  }, []);

  return (
    <div className="attachment">
      <h2 class="text-lg font-medium truncate mr-5 mt-4 mb-2">Attachments</h2>
      <script src="https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js"></script>
      {attachment ? (
        <div>
          {attachment.map((item) => (
            <div key={item.id} className="item">
              <div >
                <div >
                  <div >
                    <div >
                      {" "}
                      <a>
                      <Icon icon="carbon:task-approved" className="report-box__icon" color="#000000" />
                        </a>{" "}
                    </div>
                    <div class="ml-4">
                      <a class="font-medium" href={item.fileLink}>
                        {item.fileName}
                      </a>
                      <div class="text-slate-500 text-xs mt-0.5">
                        {new Date(item.uploadDate).toLocaleDateString()}
                      </div>
                      {/* <div class="absolute top-0 right-0 mr-2 mt-3 dropdown ml-auto">
                        <a
                          class="dropdown-toggle w-5 h-5 block"
                          href="javascript:;"
                          aria-expanded="false"
                          data-bs-toggle="dropdown"
                        >
                          {" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            icon-name="more-vertical"
                            data-lucide="more-vertical"
                            class="lucide lucide-more-vertical w-5 h-5 text-slate-500"
                          >
                            <circle cx="12" cy="12" r="1"></circle>
                            <circle cx="12" cy="5" r="1"></circle>
                            <circle cx="12" cy="19" r="1"></circle>
                          </svg>{" "}
                        </a>
                        <div class="dropdown-menu w-40">
                          <ul class="dropdown-content">
                            <li>
                              <a href="" class="dropdown-item">
                                {" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  icon-name="users"
                                  data-lucide="users"
                                  class="lucide lucide-users w-4 h-4 mr-2"
                                >
                                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"></path>
                                  <circle cx="9" cy="7" r="4"></circle>
                                  <path d="M23 21v-2a4 4 0 00-3-3.87"></path>
                                  <path d="M16 3.13a4 4 0 010 7.75"></path>
                                </svg>{" "}
                                Share File{" "}
                              </a>
                            </li>
                            <li>
                              <a href="" class="dropdown-item">
                                {" "}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  icon-name="trash"
                                  data-lucide="trash"
                                  class="lucide lucide-trash w-4 h-4 mr-2"
                                >
                                  <polyline points="3 6 5 6 21 6"></polyline>
                                  <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path>
                                </svg>{" "}
                                Delete{" "}
                              </a>
                            </li>
                          </ul>
                        </div>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div class="leading-relaxed text-slate-500 text-xs">
          No file attachment
        </div>
      )}
    </div>
  );
}

export default Attachment;
