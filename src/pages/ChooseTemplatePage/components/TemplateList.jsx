import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Select from 'react-select';
import Swal from 'sweetalert2';
import '../css/_service.css';

function TemplateList() {
    const [contractCategories, setContractCategories] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const navigate = useNavigate();
    const token = localStorage.getItem("Token");

    const contractCategoryList = contractCategories.map(category => {
        return { label: category.categoryName, value: category.id }
    })

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

    const fetchServicesData = async (value) => {
        const res = await fetch(
            `https://localhost:7073/Services/gets`,
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
        navigate("/create-contract", {
            state: {
                contractCategoryId: selectedCategory.value
            }
        });
    };

    const handleSelectCategory = (data) => {
        setSelectedCategory(data);
    }

    useEffect(() => {
        fetchServicesData();
        fetchContractCategoryData();
    }, []);

    return (
        <div>
            <div className="choose-service">
                <div className="intro-y">
                    <h2> CREATE CONTRACT</h2>
                </div>
                <div className="div2">
                    <div className="search">
                        <h4>Choose contract category</h4>
                        <span>*</span>
                    </div>
                    <div className="button-group">
                        <button className="btn primary-btn" onClick={() => Back()}>
                            <i data-lucide="file-text" className="w-4 h-4 mr-2"></i> Cancel
                        </button>
                        <button className="btn secondary-btn" style={{backgroundColor: "black"}} onClick={() => Continue()}>
                            {/* <i
                                data-lucide="file-text"
                                className="w-4 h-4 mr-2"
                            ></i>{" "} */}
                            Continue
                        </button>
                    </div>
                </div>
                <div className="intro-y">
                    <div className="service-container">
                        <div className="select-container">
                            <Select
                                options={contractCategoryList}
                                className="select"
                                placeholder="Choose contract category!"
                                isSearchable
                                name="categories"
                                value={selectedCategory}
                                onChange={handleSelectCategory}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TemplateList;