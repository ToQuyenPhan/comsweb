import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";

//test with contractId = 5
function Attachment({ contractId = 5 }) {
  const [attachment, setAttachment] = useState(null);

  const token = localStorage.getItem("Token");
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
  }, [contractId]);

  return (
    <div>
      {attachment ? (
        <div>
          <h2 class="text-lg font-medium truncate mr-5">Attachments</h2>
          {attachment.map((item) => (
            <div key={item.id}>
              <div class="intro-y box col-span-12 lg:col-span-6">
        <div class="p-5">
          <div class="flex items-center">
            <div class="file">
              {" "}
              <a href="" class="w-12 file__icon file__icon--directory"></a>{" "}
            </div>
            <div class="ml-4">
              <a class="font-medium" href={item.fileLink}>
                {item.fileName}
              </a>
              <div class="text-slate-500 text-xs mt-0.5">{item.uploadDate}</div>
            </div>
            {/* <div class="dropdown ml-auto">
              <a
                class="dropdown-toggle w-5 h-5 block"
                href="javascript:;"
                aria-expanded="false"
                data-tw-toggle="dropdown"
              >
                {" "}
                <i
                  data-lucide="more-horizontal"
                  class="w-5 h-5 text-slate-500"
                ></i>{" "}
              </a>
              <div class="dropdown-menu w-40">
                <ul class="dropdown-content">
                  <li>
                    <a href="" class="dropdown-item">
                      {" "}
                      <i data-lucide="users" class="w-4 h-4 mr-2"></i> Share
                      File{" "}
                    </a>
                  </li>
                  <li>
                    <a href="" class="dropdown-item">
                      {" "}
                      <i
                        data-lucide="trash"
                        class="w-4 h-4 mr-2"
                      ></i> Delete{" "}
                    </a>
                  </li>
                </ul>
              </div>
            </div> */}
          </div>
        </div>
      </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Loading Attachments...</p>
      )}
      
    </div>
  );
}

export default Attachment;
