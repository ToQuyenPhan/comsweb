import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { Icon } from '@iconify/react';
import '../css/_flow.css';
import { useRef, useState } from 'react';
import Swal from 'sweetalert2';

function CreateFlow() {
    const [templateName, setTemplateName] = useState('');
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [flowOrder, setOrder] = useState('');
    const [selectedFlowRole, setSelectedFlowRole] = useState(null);
    const [flowId, setFlowId] = useState('');
    const [contractCategories, setContractCategories] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedContractCategory, setSelectedContractCategory] = useState(null);
    const [flowList, setFlowList] = useState([{ order: "", user: "", flowRole: "" }]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const token = localStorage.getItem("Token");


    const contractCategoryList = contractCategories.map(category => {
        return { label: category.categoryName, value: category.id }
    })
    const userList = users.map(user => {
        return {value: user.id , label: user.fullName }
    })
    
    const flowRoleList = [
        { label: "Approver", value: 1},
        { label: "Signer", value: 2 }
    ];


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
    const fetchUserData = async () => {
        const res = await fetch("https://localhost:7073/Users/gets", {
            mode: "cors",
            method: "GET",
            headers: new Headers({
                Authorization: `Bearer ${token}`
            }),
        });
        if (res.status === 200) {
            const data = await res.json();
            setUsers(data);
        } else {
            const data = await res.json();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.title
            })
        }
    };


    const fetchCreateFlow = async () => {
        const res = await fetch("https://localhost:7073/Flows/add", {
            mode: "cors",
            method: "POST",
            headers: new Headers({
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            }),
            body: JSON.stringify({
                "contractCategoryId": selectedContractCategory.value, "status": 1,
            })
        });
        if (res.status === 200) {
            const data = await res.json();
            let orders = flowList.map(flow => flow.order);
            let users = flowList.map(flow => flow.user);
            let flowRoles = flowList.map(flow => flow.flowRole);
            console.log(data.items);
            const addFlowDetail = await fetch(`https://localhost:7073/FlowDetails/add`, {
                mode: "cors",
                method: "POST",
                headers: new Headers({
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }),
                body: JSON.stringify({
                    "userId": users, "flowRole": flowRoles, "order": orders, "flowId": data.id,
                })
            });
            if (addFlowDetail.status === 200) {
                const data = await addFlowDetail.json();
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Create Flow Successfully!',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/category-list");
            } else {
                const data = await addFlowDetail.json();
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: data.title
                })
            }
        } else {

            const data = await res.json();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.title
            })
        }
    }
    const handleOrderChange = (index, event) => {
        const updatedFlowList = [...flowList];
        updatedFlowList[index].order = event.value;
        setFlowList(updatedFlowList);
    };

    const handleSelectUser = (index, event) => {
        const updatedFlowList = [...flowList];
        updatedFlowList[index].user = event.value; 
        setFlowList(updatedFlowList);
        setSelectedUserId(event);
        
    };

    const handleSelectFlowRole = (index, event) => {
        const updatedFlowList = [...flowList];
        updatedFlowList[index].flowRole = event.value; 
        setFlowList(updatedFlowList);
        setSelectedFlowRole(event);
    };

    const handleAddFlow = () => {
        setFlowList([...flowList, { order: "", user: "", flowRole: "" }]);
    };
    const handleRemoveFlow = (index) => {
        const updatedFlowtList = [...flowList];
        updatedFlowtList.splice(index, 1);
        setFlowList(updatedFlowtList);
    };

    const handleSelectContractCategory = (data) => {
        setSelectedContractCategory(data);
    }

    const handleCreateClick = (e) => {
        e.preventDefault();
        fetchCreateFlow();
    }


    useEffect(() => {
        fetchContractCategoryData();
        fetchUserData();
    }, []);

    return (
        <div>
            <form onSubmit={handleCreateClick}>
                <div className="topbar intro-y">
                    <h2>
                        Add New Flow
                    </h2>
                    <div>
                        <div className="dropdown">
                            <button className="dropdown-toggle btn btn-primary" type='submit' > Save
                                <Icon icon="lucide:plus" className='icon' /></button>
                        </div>
                    </div>
                </div>
                <div className="main">
                    <div className="main-body">
                        <div className="main-content">
                            <div className="pos intro-y flow">
                                <div className="intro-y">
                                    <div className="post intro-y box">
                                        <div className="post__content tab-content">
                                            <div className="tab-pane active" role="tabpanel" aria-labelledby="content-tab">
                                                <div className="dark:border-darkmode-400">
                                                    <div className="dark:border-darkmode-400">
                                                        Flow Information </div>
                                                    <div>
                                                        <div>Contract Category Name <span>*</span></div>
                                                        <Select id="select-category" options={contractCategoryList} className="form-select"
                                                            value={selectedContractCategory} onChange={handleSelectContractCategory}
                                                            required />
                                                    </div>
                                                    {/* <button
                                                        type="button"
                                                        className="btn btn-secondary"
                                                        onClick={handleAddFlow}
                                                    >
                                                        <Icon icon="lucide:plus" className="icon" />
                                                    </button> */}
                                                    {flowList && flowList.map((flow, index) => (
                                                        <div class="mt-5" key={index}>
                                                            <div>
                                                                <div>Order <span>{index + 1}</span></div>
                                                                <input
                                                                    type="hidden"
                                                                    className="form-select"
                                                                    value={flow.order}
                                                                    onChange={(event) => handleOrderChange(index, event)}
                                                                    placeholder="Order"
                                                                    required
                                                                />
                                                            </div>
                                                            <div>
                                                                <div>User<span>*</span></div>
                                                                <Select
                                                                    id="select-user"
                                                                    options={userList}
                                                                    className="form-select"
                                                                    value={selectedUserId[index]}
                                                                    onChange={(event) => handleSelectUser(index, event)}
                                                                    required
                                                                />

                                                            </div>
                                                            <div>
                                                                <div>Flow Role <span>*</span></div>
                                                                <Select
                                                                    id="select-type"
                                                                    options={flowRoleList}
                                                                    className="form-select"
                                                                    value={selectedFlowRole[index]}
                                                                    onChange={(event) => handleSelectFlowRole(index, event)}
                                                                    required
                                                                />

                                                            </div>
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger ms-2"
                                                                onClick={() => handleRemoveFlow(index)}
                                                            >
                                                                <Icon icon="lucide:delete" className="icon" />
                                                            </button>
                                                        </div>
                                                    ))}
                                                    <button
                                                        type="button"
                                                        className="btn btn-secondary"
                                                        onClick={handleAddFlow}
                                                    >
                                                        <Icon icon="lucide:plus" className="icon" />
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="tab-pane active" role="tabpanel" aria-labelledby="content-tab">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="loading-icon" style={{ display: loading ? "flex" : "none" }}>
                                    <div>
                                        <Icon icon="line-md:loading-alt-loop" className='icon' />
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
export default CreateFlow;