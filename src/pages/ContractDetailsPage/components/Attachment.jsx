import React, { useState, useEffect } from "react";
import { Document, Page } from "react-pdf";
import { useLocation, useNavigate } from "react-router-dom";
import { Icon } from '@iconify/react';
import Swal from "sweetalert2";
import "../css/attachment.css";
import { formatDistanceToNow } from "date-fns";

function Attachment() {
  const [attachments, setAttachments] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isAuthor, setIsAuthor] = useState(false);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
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

  const fetchAuthorData = async () => {
    try {
      const response = await fetch(
        `https://localhost:7073/Contracts/author?contractId=${contractId}`,
        {
          mode: "cors",
          method: "GET",
          headers: new Headers({
            Authorization: `Bearer ${token}`,
          }),
        }
      );
      const data = await response.json();
      setIsAuthor(data.isAuthor);
    } catch (error) {
      console.error("Error fetching author data:", error);
    }
  }

  const fetchAttachmentData = async () => {
    try {
      const response = await fetch(
        `https://localhost:7073/Attachments/all?ContractId=${contractId}&CurrentPage=1&pageSize=3`,
        {
          mode: "cors",
          method: "GET",
          headers: new Headers({
            Authorization: `Bearer ${token}`,
          }),
        }
      );
      const data = await response.json();
      setAttachments(data.items);
      setHasNext(data.has_next);
      setHasPrevious(data.has_previous);
      setCurrentPage(data.current_page);
    } catch (error) {
      console.error("Error fetching attachment:", error);
    }
  };

  const fetchNext = async () => {
    if (!hasNext) {
      return;
    }
    const res = await fetch(`https://localhost:7073/Attachments/all?ContractId=${contractId}&CurrentPage=${currentPage + 1}&pageSize=3`, {
      mode: 'cors',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      setAttachments(data.items);
      setHasNext(data.has_next);
      setHasPrevious(data.has_previous);
      setCurrentPage(data.current_page);
    } else {
      const data = await res.json();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: data.title
      })
    }
  }

  const fetchPrevious = async () => {
    if (!hasPrevious) {
      return;
    }
    const res = await fetch(`https://localhost:7073/Attachments/all?ContractId=${contractId}&CurrentPage=${currentPage - 1}&pageSize=3`, {
      mode: 'cors',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      setAttachments(data.items);
      setHasNext(data.has_next);
      setHasPrevious(data.has_previous);
      setCurrentPage(data.current_page);
    } else {
      const data = await res.json();
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: data.title
      })
    }
  }

  const handleDeleteClick = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await fetch(`https://localhost:7073/Contracts?id=${id}`, {
          mode: 'cors',
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        if (res.status === 200) {
          Swal.fire({
            title: "Deleted!",
            text: "Contract has been deleted.",
            icon: "success"
          });
          navigate("/contract");
        } else {
          const data = await res.json();
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data.title
          })
        }
      }
    });
  }

  const handleEditClick = (data) => {
    // navigate("/edit-template", {
    //   state: {
    //     id: data
    //   }
    // });
  }

  useEffect(() => {
    fetchAuthorData();
    fetchAttachmentData();
  }, []);

  return (
    <div className="attachment">
      <div className="author-access">
        {isAuthor ? (
          <>
            <button className="btn btn-secondary" onClick={() => handleEditClick(contractId)}>
              <Icon icon="lucide:edit" className="icon" />
            </button>
            <button className="btn btn-danger" onClick={() => handleDeleteClick(contractId)}>
              <Icon icon="lucide:trash" className="icon" />
            </button>
          </>
        ) : (
          <>
          </>
        )}
      </div>
      <h2 class="text-lg font-medium truncate mr-5 mt-4 mb-2">Attachments</h2>
      {attachments.length > 0 ? (
        <div>
          {attachments.map((item) => (
            <div>
              <div><a href=""><Icon icon="mdi:file" className="icon" /></a></div>
              <div>
                <a href={item.fileLink}>{item.fileName}</a>
                <div>{formatDistanceToNow(new Date(item.uploadDate))} ago</div>
              </div>
              {isAuthor ? (
                <div>
                  <a href="javascript:;"><Icon icon="lucide:more-horizontal" className="icon" /></a>
                </div>
              ) : (
                <div>
                </div>
              )}
            </div>
          ))}
          <div className="intro-y paging">
            <nav>
              <ul className="pagination">
                {/* <li className="page-item">
                                <a class="page-link" href="#"> <i class="w-4 h-4" data-lucide="chevrons-left"></i> </a>
                            </li> */}
                <li className={"page-item " + (hasPrevious ? "active" : "disabled")} onClick={fetchPrevious}>
                  <a className="page-link" href="javascript:;">
                    <Icon icon="lucide:chevron-left" className='icon' />
                  </a>
                </li>
                {/* <li className="page-item"> <a class="page-link" href="#">...</a> </li>
                            <li class="page-item"> <a class="page-link" href="#">1</a> </li>
                            <li class="page-item active"> <a class="page-link" href="#">2</a> </li>
                            <li class="page-item"> <a class="page-link" href="#">3</a> </li>
                            <li class="page-item"> <a class="page-link" href="#">...</a> </li> */}
                <li className={"page-item " + (hasNext ? "active" : "disabled")} onClick={fetchNext}>
                  <a className="page-link" href="javascript:;">
                    <Icon icon="lucide:chevron-right" className='icon' />
                  </a>
                </li>
                {/* <li class="page-item">
                                <a class="page-link" href="#"> <i class="w-4 h-4" data-lucide="chevrons-right"></i> </a>
                            </li> */}
              </ul>
            </nav>
            {/* <select class="w-20 form-select box mt-3 sm:mt-0">
                        <option>10</option>
                        <option>25</option>
                        <option>35</option>
                        <option>50</option>
                    </select> */}
          </div>
        </div>
      ) : (
        <div>
          <div class="leading-relaxed text-slate-500 text-xs">
            No file attachment
          </div>
        </div>
      )}
    </div>
  );
}

export default Attachment;
