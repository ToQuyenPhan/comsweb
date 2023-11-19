import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Select from 'react-select';
import Swal from 'sweetalert2';
import '../css/style.css';

function List() {
    const [templates, setTemplates] = useState([]);
    const [contractCategories, setContractCategories] = useState([]);
    const [templateTypes, setTemplateTypes] = useState([]);
    const [dropdownMenuClass, setDropdownMenuClass] = useState('inbox-filter__dropdown-menu dropdown-menu');
    const [templateName, setTemplateName] = useState('');
    const [searchByName, setSearchByName] = useState('');
    const [templateStatus, setTemplateStatus] = useState(2);
    const [selectedContractCategory, setSelectedContractCategory] = useState(null);
    const [selectedTemplateType, setSelectedTemplateType] = useState(null);
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
            setDropdownMenuClass('');
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
        let url = `https://localhost:7073/Templates?currentPage=1&pageSize=10&status=2`;
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

    const handleTrashClick = async () => {
        setTemplateStatus(0);
        let url = `https://localhost:7073/Templates?currentPage=1&pageSize=10&status=0`;
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

    const handleDraftClick = async () => {
        setTemplateStatus(1);
        let url = `https://localhost:7073/Templates?currentPage=1&pageSize=10&status=1`;
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        let url = `https://localhost:7073/Templates?CurrentPage=1&PageSize=10&Status=${templateStatus}&TemplateName=${templateName}
            &ContractCategoryId=${selectedContractCategory.value}&TemplateTypeId=${selectedTemplateType.value}`;
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

    // const handleTemplateDescriptionChange = e => {
    //     setTemplateDescription(e.target.value);
    // }

    useEffect(() => {
        fetchTemplateData();
        fetchContractCategoryData();
        fetchTemplateTypeData();
    }, []);

    return (
        <div className="template-list">
            <div>
                <h2 className="intro-y">
                    Template List
                </h2>
                <div className="intro-y box">
                    <div>
                        <a href="javascript:;" className={"" + (templateStatus === 2 ? "active" : "")}
                            onClick={fetchTemplateData}><Icon icon="ant-design:file-done-outlined" className='icon' />
                            Templates  </a>
                        <a href='javascript:;' className={"" + (templateStatus === 1 ? "active" : "")}
                            onClick={handleDraftClick}><Icon icon="lucide:file" className='icon' /> Draft </a>
                        {/* <a href="" class="flex items-center px-3 py-2 mt-2 rounded-md"> <i class="w-4 h-4 mr-2" data-lucide="video"></i> Videos </a>
                        <a href="" class="flex items-center px-3 py-2 mt-2 rounded-md"> <i class="w-4 h-4 mr-2" data-lucide="file"></i> Documents </a>
                        <a href="" class="flex items-center px-3 py-2 mt-2 rounded-md"> <i class="w-4 h-4 mr-2" data-lucide="users"></i> Shared </a> */}
                        <a href="javascript:;" className={"" + (templateStatus === 0 ? "active" : "")}
                            onClick={handleTrashClick}> <Icon icon="lucide:trash" className='icon' /> Trash </a>
                    </div>
                    {/* <div class="border-t border-slate-200 dark:border-darkmode-400 mt-4 pt-4">
                        <a href="" class="flex items-center px-3 py-2 rounded-md">
                            <div class="w-2 h-2 bg-pending rounded-full mr-3"></div>
                            Custom Work
                        </a>
                        <a href="" class="flex items-center px-3 py-2 mt-2 rounded-md">
                            <div class="w-2 h-2 bg-success rounded-full mr-3"></div>
                            Important Meetings
                        </a>
                        <a href="" class="flex items-center px-3 py-2 mt-2 rounded-md">
                            <div class="w-2 h-2 bg-warning rounded-full mr-3"></div>
                            Work
                        </a>
                        <a href="" class="flex items-center px-3 py-2 mt-2 rounded-md">
                            <div class="w-2 h-2 bg-pending rounded-full mr-3"></div>
                            Design
                        </a>
                        <a href="" class="flex items-center px-3 py-2 mt-2 rounded-md">
                            <div class="w-2 h-2 bg-danger rounded-full mr-3"></div>
                            Next Week
                        </a>
                        <a href="" class="flex items-center px-3 py-2 mt-2 rounded-md"> <i class="w-4 h-4 mr-2" data-lucide="plus"></i> Add New Label </a>
                    </div> */}
                </div>
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
                                                    placeholder="example@gmail.com" />
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
                    <div>
                        {/* <button className="btn btn-primary">Upload</button> */}
                        <div className="dropdown">
                            <button className="dropdown-toggle btn box" aria-expanded="false" data-tw-toggle="dropdown" 
                                onClick={() => navigate("/create-template")}>
                                <span> <Icon icon="lucide:plus" className='icon' /> </span>
                            </button>
                            {/* <div class="dropdown-menu w-40">
                                <ul class="dropdown-content">
                                    <li>
                                        <a href="" class="dropdown-item"> <i data-lucide="file" class="w-4 h-4 mr-2"></i> Share Files </a>
                                    </li>
                                    <li>
                                        <a href="" class="dropdown-item"> <i data-lucide="settings" class="w-4 h-4 mr-2"></i> Settings </a>
                                    </li>
                                </ul>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="intro-y">
                    {templates.map(template => (
                        <div id={template.id} className="intro-y">
                            <div className="file box zoom-in">
                                <div>
                                    <input className="form-check-input" type="checkbox" />
                                </div>
                                <a href="" className="file__icon file__icon--file">
                                    <div className="file__icon__file-name"></div>
                                </a>
                                <a href="">{template.templateName}</a>
                                <div>Category: {template.contractCategoryName}</div>
                                <div>Type: {template.templateTypeName}</div>
                                <div className="dropdown">
                                    <a className="dropdown-toggle" href="javascript:;" aria-expanded="false"
                                        data-tw-toggle="dropdown" onClick={() => openOptionMenu(template.id)}>
                                        <Icon icon="lucide:more-vertical" className='icon' /></a>
                                    <div id={"option-menu-" + template.id} className="dropdown-menu">
                                        <ul className="dropdown-content">
                                            <li>
                                                <a href="" className="dropdown-item">
                                                    <Icon icon="lucide:edit" className='icon' /> Edit </a>
                                            </li>
                                            <li>
                                                <a href="" className="dropdown-item">
                                                    <Icon icon="lucide:trash" className='icon' /> Delete </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default List;