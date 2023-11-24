import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Select from 'react-select';
import Swal from 'sweetalert2';
import '../css/_template-list.css';
import '../css/_service.css';

function TemplateList() {
    const [templates, setTemplates] = useState([]);
    const [contractCategories, setContractCategories] = useState([]);
    const [templateTypes, setTemplateTypes] = useState([]);
    const [services, setServices] = useState([]);
    const [dropdownMenuClass, setDropdownMenuClass] = useState('inbox-filter__dropdown-menu dropdown-menu');
    const [templateName, setTemplateName] = useState('');
    const [searchByName, setSearchByName] = useState('');
    const [creatorEmail, setCreatorEmail] = useState('');
    const [templateStatus, setTemplateStatus] = useState(2);
    const [selectedTemplate, setSelectedTemplate] = useState(0);
    const [selectedContractCategory, setSelectedContractCategory] = useState(null);
    const [selectedTemplateType, setSelectedTemplateType] = useState(null);
    const [selectedServices, setSelectedServices] = useState(null);
    const navigate = useNavigate();
    const filterRef = useRef(null);
    const optionMenuRef = useRef(null);
    const token = localStorage.getItem("Token");

    const contractCategoryList = contractCategories.map(category => {
        return { label: category.categoryName, value: category.id }
    })

    const templateTypeList = templateTypes.map(templateType => {
        return { label: templateType.name, value: templateType.id }
    })

    const openFilter = () => {
        if (dropdownMenuClass === 'inbox-filter__dropdown-menu dropdown-menu show') {
            setDropdownMenuClass('inbox-filter__dropdown-menu dropdown-menu');
        } else {
            setDropdownMenuClass('inbox-filter__dropdown-menu dropdown-menu show');
        }
    }

    const openOptionMenu = (id) => {
        if (document.getElementById('option-menu-' + id).classList.contains('show')) {
            document.getElementById('option-menu-' + id).classList.remove('show');
        } else {
            document.getElementById('option-menu-' + id).classList.add('show');
        }
    }

    const closeFilterMenu = (e) => {
        if (!filterRef?.current?.contains(e.target)) {
            setDropdownMenuClass('inbox-filter__dropdown-menu dropdown-menu');
        }
    }

    document.addEventListener('mousedown', closeFilterMenu);

    const fetchTemplateData = async () => {
        setTemplateStatus(2);
        let url = `https://localhost:7073/Templates?Status=2`;
        const res = await fetch(url, {
            mode: 'cors',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (res.status === 200) {
            const data = await res.json();
            setTemplates(data.items);
        } else {
            const data = await res.json();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.title
            })
        }
    }

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

    const fetchTemplateTypeData = async () => {
        const res = await fetch("https://localhost:7073/TemplateTypes", {
            mode: "cors",
            method: "GET",
            headers: new Headers({
                Authorization: `Bearer ${token}`
            }),
        });
        if (res.status === 200) {
            const data = await res.json();
            setTemplateTypes(data);
        } else {
            const data = await res.json();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.title
            })
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let url = `https://localhost:7073/Templates?CurrentPage=1&PageSize=10&Status=${templateStatus}&TemplateName=${templateName}
        &Creator=${creatorEmail}`;
        if (selectedContractCategory !== null) {
            url = url + `&ContractCategoryId=${selectedContractCategory.value}`;
        }
        if (selectedTemplateType !== null) {
            url = url + `&TemplateTypeId=${selectedTemplateType.value}`;
        }
        const res = await fetch(url, {
            mode: 'cors',
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        if (res.status === 200) {
            const data = await res.json();
            setTemplates(data.items);
        } else {
            const data = await res.json();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.title
            })
        }
    }

    const handleKeyDown = async (e) => {
        if (e.key === 'Enter') {
            let url = `https://localhost:7073/Templates?CurrentPage=1&PageSize=10&Status=${templateStatus}&TemplateName=${searchByName}`;
            const res = await fetch(url, {
                mode: 'cors',
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            if (res.status === 200) {
                const data = await res.json();
                setTemplates(data.items);
            } else {
                const data = await res.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.title
                })
            }
        }
    }

    const handleSelectContractCategory = (data) => {
        setSelectedContractCategory(data);
    }

    const handleSelectTemplateType = (data) => {
        setSelectedTemplateType(data);
    }

    const handleTemplateNameChange = e => {
        setTemplateName(e.target.value);
    }

    const handleSearchByNameChange = e => {
        setSearchByName(e.target.value);
    }

    const handleCreatorEmailChange = e => {
        setCreatorEmail(e.target.value);
    }

    const handleCloseClick = (id) => {
        document.getElementById('popup-' + id).style.display = 'none';
    }

    const handlePreviewClick = (id) => {
        document.getElementById('popup-' + id).style.display = 'flex';
    }

    const handleChooseTemplate = (id) => {
        setSelectedTemplate(id);
    }

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
    const Continue = (id) => {
        navigate("/create-contract", { state: {templateId: selectedTemplate, services: selectedServices.map((service) => {
            return service.value;
        })} });
    };

    const handleSelect = (data) => {
        setSelectedServices(data);
    }

    useEffect(() => {
        fetchTemplateData();
        fetchServicesData();
        fetchContractCategoryData();
        fetchTemplateTypeData();
    }, []);

    return (
        <div>
            <div className="choose-service">
                <div className="intro-y">
                    <h2> CREATE CONTRACT</h2>
                </div>
                <div className="div2">
                    <div className="search">
                        <h4>Choose service</h4>
                    </div>

                    <div className="button-group">
                        <button className="btn primary-btn" onClick={() => Back()}>
                            <i data-lucide="file-text" className="w-4 h-4 mr-2"></i> Cancel
                        </button>
                        <button className="btn secondary-btn" onClick={() => Continue()}>
                            {/* <i
                                data-lucide="file-text"
                                className="w-4 h-4 mr-2"
                            ></i>{" "} */}
                            Continue
                        </button>
                    </div>
                </div>
                <div className="intro-y">
                    <h4>Service:</h4>
                    <div className="service-container">
                        <div className="select-container">
                            <Select
                                options={servicesdata}
                                className="select"
                                placeholder="Choose Service!"
                                isSearchable
                                isMulti
                                name="services"
                                value={selectedServices}
                                onChange={handleSelect}
                            />
                        </div>
                    </div>
                </div>
            </div >
            <div className="choose-template">
                <div>
                    <h4 className="intro-y">
                        Choose A Template
                    </h4>
                </div>
                <div>
                    <div className="intro-y">
                        <div>
                            <Icon icon="lucide:search" className='icon' />
                            <input type="text" className="form-control box" placeholder="Search templates" value={searchByName}
                                onChange={handleSearchByNameChange} onKeyDown={handleKeyDown} />
                            <form onSubmit={handleSubmit}>
                                <div className="inbox-filter dropdown" data-tw-placement="bottom-start" ref={filterRef}>
                                    <Icon icon="lucide:chevron-down" className='icon dropdown-toggle' onClick={openFilter} />
                                    <div className={dropdownMenuClass}>
                                        <div className="dropdown-content">
                                            <div>
                                                <div>
                                                    <label for="input-filter-1" className="form-label">Template Name</label>
                                                    <input id="input-filter-1" type="text" className="form-control"
                                                        placeholder="Type the template name" value={templateName}
                                                        onChange={handleTemplateNameChange} />
                                                </div>
                                                <div>
                                                    <label for="input-filter-2" className="form-label">Creator</label>
                                                    <input id="input-filter-2" type="text" className="form-control"
                                                        placeholder="example@gmail.com" value={creatorEmail}
                                                        onChange={handleCreatorEmailChange} />
                                                </div>
                                                <div>
                                                    <label for="input-filter-3" className="form-label">Category</label>
                                                    <Select id="input-filter-3" options={contractCategoryList} className="form-select flex-1"
                                                        value={selectedContractCategory} onChange={handleSelectContractCategory} />
                                                </div>
                                                <div>
                                                    <label for="input-filter-4" className="form-label">Type</label>
                                                    <Select id="input-filter-4" options={templateTypeList} className="form-select flex-1"
                                                        value={selectedTemplateType} onChange={handleSelectTemplateType} />
                                                </div>
                                                <div>
                                                    {/* <button className="btn btn-secondary w-32 ml-auto">Create Filter</button> */}
                                                    <button className="btn btn-primary ml-2" type="submit">Search</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="intro-y">
                        {templates.map(template => (
                            <div id={template.id} className="intro-y" style={{ border: (selectedTemplate === template.id) ? 'solid 1px black' : "none" }}
                                onClick={() => handleChooseTemplate(template.id)}>
                                <div className="file box zoom-in">
                                    <div>
                                        {/* <input className="form-check-input" type="checkbox" /> */}
                                    </div>
                                    <a href="javascript:;" className="file__icon file__icon--file">
                                        <div className="file__icon__file-name"></div>
                                    </a>
                                    {template.templateName === '' ? (
                                        <a href="javascript:;">Untitled</a>
                                    ) : (
                                        <a href="javascript:;">{template.templateName}</a>
                                    )}
                                    <div>
                                        {/* Creator: {template.email} */}
                                    </div>
                                    <div>Category: {template.contractCategoryName}</div>
                                    <div>Type: {template.templateTypeName}</div>
                                    <div className="dropdown">
                                        <a className="dropdown-toggle" href="javascript:;" aria-expanded="false"
                                            data-tw-toggle="dropdown">
                                            <Icon icon="lucide:eye" className='icon' onClick={() => handlePreviewClick(template.id)} /></a>
                                    </div>
                                </div>
                                <div id={"popup-" + template.id}>
                                    <div>
                                        <embed src={template.templateLink} height="450px" width="700px"></embed>
                                        <div>
                                            <button onClick={() => handleCloseClick(template.id)}>Close</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TemplateList;