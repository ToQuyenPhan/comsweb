import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import Swal from 'sweetalert2';
import '../css/_list.css';

function List() {
    const [contractAnnexes, setContractAnnexes] = useState([]);
    const navigate = useNavigate();
    const token = localStorage.getItem("Token");

    const openOptionMenu = (id) => {
        if (document.getElementById("option-menu-" + id).classList.contains('show')) {
            document.getElementById("option-menu-" + id).classList.remove('show');
        } else {
            document.getElementById("option-menu-" + id).classList.add('show');
        }
    }

    const fetchContractAnnexData = async () => {
        let url = `https://localhost:7073/ContractAnnexes/all`;
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
            setContractAnnexes(data.items);
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
        document.getElementById('option-menu-' + id).classList.remove('show');
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
                const res = await fetch(`https://localhost:7073/ContractAnnexes/id?id=${id}`, {
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
                        text: "Contract Annex has been deleted.",
                        icon: "success"
                    });
                    fetchContractAnnexData();
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

    const handleChooseContractAnnexDetails = (id) => {
        navigate("/contractannex-details", {
            state: {
                contractAnnexId: id
            }
        });
    }

    const handleChooseContractDetails = (id) => {
        console.log(id);
        navigate("/contract-details", {
            state: {
                contract: id
            }
        });
    }

    const handleChooseContractAnnexEdit = (id) => {
        navigate("/edit-contractannex", {
            state: {
                contractAnnexId: id
            }
        });
    }

    useEffect(() => {
        //const dummyContracts = [
        //{ id: 1, name: 'Contract 1' },
        //{ id: 2, name: 'Contract 2' },
        //{ id: 3, name: 'Contract 3' },
        //];

        //setContracts(dummyContracts);
        fetchContractAnnexData();
    }, []);

    return (
        <div className='contractannex-list'>
            <h2 className="intro-y">
                Contract Annex List
            </h2>
            <div>
                <div className="intro-y">
                    <button className="btn btn-primary" onClick={() => navigate("/create-contractannex")}>Add New</button>
                    {/* <div class="dropdown">
                        <button class="dropdown-toggle btn px-2 box" aria-expanded="false" data-tw-toggle="dropdown">
                            <span class="w-5 h-5 flex items-center justify-center"> <i class="w-4 h-4" data-lucide="plus"></i> </span>
                        </button>
                        <div class="dropdown-menu w-40">
                            <ul class="dropdown-content">
                                <li>
                                    <a href="" class="dropdown-item"> <i data-lucide="printer" class="w-4 h-4 mr-2"></i> Print </a>
                                </li>
                                <li>
                                    <a href="" class="dropdown-item"> <i data-lucide="file-text" class="w-4 h-4 mr-2"></i> Export to Excel </a>
                                </li>
                                <li>
                                    <a href="" class="dropdown-item"> <i data-lucide="file-text" class="w-4 h-4 mr-2"></i> Export to PDF </a>
                                </li>
                            </ul>
                        </div>
                    </div> */}
                    {/* <div class="hidden md:block mx-auto text-slate-500">Showing 1 to 10 of 150 entries</div> */}
                    <div>
                        <div>
                            <input type="text" className="form-control box" placeholder="Search..." />
                            <Icon icon="lucide:search" className='icon' />
                        </div>
                    </div>
                </div>
                <div className="intro-y">
                    <table className="table table-report">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>CONTRACT ANNEX NAME</th>
                                <th>VERSION</th>
                                <th>CREATED AT</th>
                                <th>STATUS</th>
                                <th>CODE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contractAnnexes.map(contractAnnex => (
                                <tr className="intro-x" id={contractAnnex.id}>
                                    <td>
                                        <div>
                                            <div className="w-10 h-10 image-fit zoom-in">
                                                {contractAnnex.id}
                                                {/* <img alt="Midone - HTML Admin Template" class="tooltip rounded-full" src="dist/images/preview-15.jpg" title="Uploaded at 5 April 2022" /> */}
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <a href="javascript:;" onClick={() => handleChooseContractAnnexDetails(contractAnnex.id)} >{contractAnnex.contractAnnexName}</a>
                                        <div>
                                            
                                            <a href="javascript:;" onClick={() => handleChooseContractDetails(contractAnnex.contractId)} >{contractAnnex.contractName}</a>
                                            </div>
                                    </td>
                                    <td>{contractAnnex.version}</td>
                                    <td>{contractAnnex.createdDateString}</td>
                                    <td>
                                        <div className="text-danger">
                                            {/* <i data-lucide="check-square" class="w-4 h-4 mr-2"></i>  */}
                                            {contractAnnex.statusString} </div>
                                    </td>
                                    <td>{contractAnnex.code}</td>
                                    <td className="table-report__action">
                                        <div>
                                            <Icon icon="lucide:more-horizontal" className="icon" onClick={() => openOptionMenu(contractAnnex.id)} />
                                            <div id={"option-menu-" + contractAnnex.id}>
                                                <ul className="dropdown-content">
                                                    <li>
                                                        <a href="javascript:;" className="dropdown-item" onClick={() => handleChooseContractAnnexDetails(contractAnnex.id)}> <Icon icon="lucide:eye" className='icon' /> View Details </a>
                                                    </li>
                                                    <li>
                                                        <a href="javascript:;" className="dropdown-item" onClick={() => handleChooseContractAnnexEdit(contractAnnex.id)}> <Icon icon="bx:edit" className="icon" /> Edit </a>
                                                    </li>
                                                    <li>
                                                        {contractAnnex.statusString !== "Deleted" && (
                                                            <a href="javascript:;" className="dropdown-item" onClick={() => handleDeleteClick(contractAnnex.id)}>
                                                                <Icon icon="lucide:trash-2" className="icon" /> Delete
                                                            </a>
                                                        )}
                                                    </li>
                                                </ul>
                                            </div>
                                            {/* <a class="flex items-center mr-3" href="javascript:;"> <i data-lucide="check-square" class="w-4 h-4 mr-1"></i> Edit </a>
                                    <a class="flex items-center text-danger" href="javascript:;" data-tw-toggle="modal" data-tw-target="#delete-confirmation-modal"> <i data-lucide="trash-2" class="w-4 h-4 mr-1"></i> Delete </a> */}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* <div class="intro-y col-span-12 flex flex-wrap sm:flex-row sm:flex-nowrap items-center">
                    <nav class="w-full sm:w-auto sm:mr-auto">
                        <ul class="pagination">
                            <li class="page-item">
                                <a class="page-link" href="#"> <i class="w-4 h-4" data-lucide="chevrons-left"></i> </a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#"> <i class="w-4 h-4" data-lucide="chevron-left"></i> </a>
                            </li>
                            <li class="page-item"> <a class="page-link" href="#">...</a> </li>
                            <li class="page-item"> <a class="page-link" href="#">1</a> </li>
                            <li class="page-item active"> <a class="page-link" href="#">2</a> </li>
                            <li class="page-item"> <a class="page-link" href="#">3</a> </li>
                            <li class="page-item"> <a class="page-link" href="#">...</a> </li>
                            <li class="page-item">
                                <a class="page-link" href="#"> <i class="w-4 h-4" data-lucide="chevron-right"></i> </a>
                            </li>
                            <li class="page-item">
                                <a class="page-link" href="#"> <i class="w-4 h-4" data-lucide="chevrons-right"></i> </a>
                            </li>
                        </ul>
                    </nav>
                    <select class="w-20 form-select box mt-3 sm:mt-0">
                        <option>10</option>
                        <option>25</option>
                        <option>35</option>
                        <option>50</option>
                    </select>
                </div> */}
            </div>
        </div>
    );
}

export default List;