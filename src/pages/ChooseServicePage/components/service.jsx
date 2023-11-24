import React, { useEffect, useState, useRef } from "react";
import { Icon } from "@iconify/react";
import Swal from "sweetalert2";
import "../css/_service.css";
import { useNavigate } from "react-router-dom";
import Select from "react-select";

function ChooseService() {
  const [services, setServices] = useState([]);
  const [serviceList, setServiceList] = useState([""]);
  const [selectedService, setSelectedService] = useState([]);

  const navigate = useNavigate();
  const token = localStorage.getItem("Token");

  const fetchServicesData = async (value) => {
    const res = await fetch(
      `https://localhost:7073/Services/gets?serviceName`,
      {
        mode: "cors",
        method: "GET",
        headers: new Headers({
          Authorization: `Bearer ${token}`,
        }),
      }
    );
    if (res.status === 200) {
      const data = await res.json();
      setServices(data);
    } else {
      const data = await res.json();
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: data.title,
      });
    }
  };

  const servicesdata = services.map((service) => {
    return { value: service.id, label: service.serviceName };
  });
  const handleAddService = () => {
    setServiceList([...serviceList, { name: "", quantity: "" }]);
  };

  const handleServiceChange = (index, event) => {
    const updatedServiceList = [...serviceList];
    updatedServiceList[index] = event.target.value;
    setServiceList(updatedServiceList);
    setSelectedService(event);
  };

  const handleRemoveService = (index) => {
    const updatedServiceList = [...serviceList];
    updatedServiceList.splice(index, 1);
    setServiceList(updatedServiceList);
  };

  const Back = (id) => {
    navigate("/", { state: {} });
  };
  const Continue = (id) => {
    navigate("/", { state: {} });
  };

  useEffect(() => {
    fetchServicesData();
  }, []);

  return (
    <div className="templates">
      <div className="intro-y">
        <h2> CREATE CONTRACT</h2>
      </div>
      <div className="div2">
        <div className="search">
          <h4>Choose Service</h4>
        </div>

        <div className="button-group">
          <button className="btn primary-btn" onClick={() => Back()}>
            <i data-lucide="file-text" className="w-4 h-4 mr-2"></i> Back
          </button>
          <button className="btn secondary-btn">
            <i
              data-lucide="file-text"
              className="w-4 h-4 mr-2"
              onClick={() => Continue()}
            ></i>{" "}
            Continue
          </button>
        </div>
      </div>
      <div className="intro-y">
        <h4>Service:</h4>
        {serviceList.map((service, index) => (
          <div key={index} className="service-container">
            <div className="select-container">
              <Select
                options={servicesdata}
                className="w-full"
                placeholder="Choose Service!"
                value={selectedService[index]}
                onChange={(event) => handleServiceChange(index, event)}
                isSearchable
              />
            </div>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => handleRemoveService(index)}
            >
              <Icon icon="streamline:delete-1-solid" />
            </button>
          </div>
        ))}
        <button
          className="dropdown-toggle btn box"
          aria-expanded="false"
          data-tw-toggle="dropdown"
          onClick={handleAddService}
        >
          <span>
            {" "}
            <Icon icon="lucide:plus" className="icon" />{" "}
          </span>
        </button>
      </div>
    </div>
  );
}

export default ChooseService;
