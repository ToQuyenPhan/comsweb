import React, { useState, useEffect } from "react";
import { useLocation} from "react-router-dom";
import { Icon } from '@iconify/react';
import Swal from "sweetalert2";
import "../css/_flow-details.css";

function FlowDetails() {
  const [flowDetails, setFlowDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
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

  const fetchFlowDetailData = async () => {
    try {
      const response = await fetch(
        `https://localhost:7073/UserFlowDetails?ContractId=${contractId}&CurrentPage=1&PageSize=4`,
        {
          mode: "cors",
          method: "GET",
          headers: new Headers({
            Authorization: `Bearer ${token}`,
          }),
        }
      );
      const data = await response.json();
      setFlowDetails(data.items);
      setHasNext(data.has_next);
      setHasPrevious(data.has_previous);
      setCurrentPage(data.current_page);
    } catch (error) {
      setFlowDetails([]);
      console.error("Error fetching flow detais:", error);
    }
  };

  const fetchNext = async () => {
    if (!hasNext) {
      return;
    }
    const res = await fetch(`https://localhost:7073/UserFlowDetails?ContractId=${contractId}&CurrentPage=${currentPage + 1}&pageSize=4`, {
      mode: 'cors',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      setFlowDetails(data.items);
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
    const res = await fetch(`https://localhost:7073/UserFlowDetails?ContractId=${contractId}&CurrentPage=${currentPage - 1}&pageSize=4`, {
      mode: 'cors',
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (res.status === 200) {
      const data = await res.json();
      setFlowDetails(data.items);
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

  useEffect(() => {
    fetchFlowDetailData();
  }, []);

  return (flowDetails !== undefined) ? (
    <div className="flow-details">
      <div className="intro-y">
        <h2>
          Flow Status
        </h2>
      </div>
      <div>
        {flowDetails?.length > 0 ? (
          <>
            {flowDetails.map((item) => (
              <div id={item?.id} className="intro-y">
                <div className="box zoom-in">
                  <div className="image-fit">
                    <img alt="Avatar" src={item?.userImage} />
                  </div>
                  <div>
                    <div>{item?.fullName}</div>
                    <div>{item?.flowRole}</div>
                  </div>
                  <div>{item?.statusString}</div>
                </div>
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
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  ) : null;
}

export default FlowDetails;
