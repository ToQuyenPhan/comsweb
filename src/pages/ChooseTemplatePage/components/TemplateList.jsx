import React, { useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Select from 'react-select';
import Swal from 'sweetalert2';
import '../css/_top-bar.css';
import '../css/_service.css';

function TemplateList() {
    const [contractCategories, setContractCategories] = useState([]);
    const [partners, setPartners] = useState([])
    const [services, setServices] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedPartner, setSelectedPartner] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("Token");

    const contractCategoryList = contractCategories.map(category => {
        return { label: category.categoryName, value: category.id }
    })

    const partnerList = partners.map(partner => {
        return {label: partner.companyName, value: partner.id}
    })

    const servicesList = services.map((service) => {
        return { value: service.id, label: service.serviceName };
    });

    const fetchContractCategoryData = async () => {
        const res = await fetch("https://localhost:7073/ContractCategories/active", {
            mode: "cors",
            method: "GET",
            headers: new Headers({
                Authorization: `Bearer ${token}`
            }),
        });
        if (res.status === 200) {
            const data = await res.json();
            setContractCategories(data);
        } else {
            const data = await res.json();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.title
            })
        }
    };

    const fetchPartnerData = async () => {
        const res = await fetch("https://localhost:7073/Partners/active", {
            mode: "cors",
            method: "GET",
            headers: new Headers({
                Authorization: `Bearer ${token}`
            }),
        });
        if (res.status === 200) {
            const data = await res.json();
            setPartners(data);
        } else {
            const data = await res.json();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.title
            })
        }
    };

    const fetchServicesData = async (value) => {
        const res = await fetch(
            `https://localhost:7073/Services/active`,
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

    const Back = (id) => {
        navigate("/contract");
    };

    const Continue = () => {
        if (selectedCategory === null) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You need to choose a contract category!'
            })
            return;
        }
        if (selectedPartner === null) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You need to choose a partner!'
            })
            return;
        }
        if (selectedService === null) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'You need to choose a service!'
            })
            return;
        }
        navigate("/create-contract", {
            state: {
                contractCategoryId: selectedCategory.value, partnerId: selectedPartner.value, serviceId: selectedService.value
            }
        });
    };

    const handleSelectCategory = async (data) => {
        setSelectedCategory(data);
        const res = await fetch(
            `https://localhost:7073/Services/active?contractCategoryId=${data.value}`,
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
            if(res.status === 404){
                setServices([]);
            }
        }
    }

    const handleSelectPartner = (data) => {
        setSelectedPartner(data);
    }

    const handleSelectService = (data) => {
        setSelectedService(data);
    }

    useEffect(() => {
        fetchServicesData();
        fetchContractCategoryData();
        fetchPartnerData();
    }, []);

    return (
        <div>
            <form>
                <div className="topbar-choose-template intro-y">
                    <h2>Add New Contract</h2>
                    <div>
                        <div className="dropdown">
                            <button
                                className="dropdown-toggle btn btn-secondary"
                                aria-expanded="false"
                                data-tw-toggle="dropdown"
                                type="button" onClick={Back}
                            >
                                {" "}
                                Cancel
                            </button>
                            <button
                                className="dropdown-toggle btn btn-primary"
                                aria-expanded="false"
                                data-tw-toggle="dropdown"
                                type="button" onClick={Continue}
                            >
                                {" "}
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
                <div className="main-choose-template">
                    <div className="main-body">
                        <div className="main-content">
                            <div className="pos intro-y choose-template">
                                <div className="intro-y">
                                    <div className="post intro-y box">
                                        <div className="post__content tab-content">
                                            <div
                                                className="tab-pane active"
                                                role="tabpanel"
                                                aria-labelledby="content-tab"
                                            >
                                                <div className="dark:border-darkmode-400">
                                                    <div className="dark:border-darkmode-400">
                                                        <Icon icon="lucide:chevron-down" className="icon" />{" "}
                                                        Contract Information{" "}
                                                    </div>
                                                    <div className="mt-5">
                                                        <div>Choose contract category<span>*</span></div>
                                                        <div>
                                                            <Select id="select-category" options={contractCategoryList} className="form-select"
                                                                value={selectedCategory} onChange={handleSelectCategory}
                                                                required />
                                                        </div>
                                                    </div>
                                                    <div className="mt-5">
                                                        <div>Choose partner<span>*</span></div>
                                                        <div>
                                                            <Select id="select-category" options={partnerList} className="form-select"
                                                                value={selectedPartner} onChange={handleSelectPartner}
                                                                required />
                                                        </div>
                                                    </div>
                                                    <div className="mt-5">
                                                        <div>Choose service<span>*</span></div>
                                                        <div>
                                                            <Select id="select-category" options={servicesList} className="form-select"
                                                                value={selectedService} onChange={handleSelectService}
                                                                required />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default TemplateList;