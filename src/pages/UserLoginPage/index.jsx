import { useState, useEffect } from "react";
import { Link, json } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill, BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import './css/style.css';
import contractManagementImg from '../../assets/img/contractmanagementlogo.png';
import logoImg from '../../assets//img/hisoftlogo.jpg';
import { jwtDecode } from 'jwt-decode';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab'


function UserLogin() {
    const [visible, setVisible] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPasword] = useState('');
    const [state, setState] = useState(true)
    const navigate = useNavigate();

    let headers = new Headers();
    let url = "https://localhost:7073/auth/login";
    headers.append('Content-Type', 'application/json');

    const handleUsernameChange = event => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = event => {
        setPasword(event.target.value);
    };

    const fetchUserData = async (e) => {
        e.preventDefault();
        const res = await fetch(url, { mode: 'cors', method: 'POST', headers: headers, body: JSON.stringify({ "username": username, "password": password }) });
        if (res.status === 200) {
            const data = await res.json();
            const token = data.token;
            localStorage.setItem("Token", token);
            localStorage.setItem("FullName", jwtDecode(token).name);
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Login succesfully!',
                showConfirmButton: false,
                timer: 1500
            })
            console.log(token);
            if (jwtDecode(token).role === 'Staff') {
                navigate('/home');
            }
            if (jwtDecode(token).role === 'Sale Manager') {
                navigate('/create-template');
            }
        } else {
            const data = await res.json();
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: data.title
            })
        }
    };

    useEffect(() => {
        if (localStorage) {
            localStorage.removeItem("Token");
        }
    }, [])

    return (
        <div className="loginPage flex">
            <div className="container flex">
                <div className="imgDiv">
                    <img className="contractImg" src={contractManagementImg} alt='/' />
                    <div className="overlayDiv"></div>
                    <div className="textDiv">
                        <h2 className="title">
                            Hisoft Contract Management System
                        </h2>
                    </div>
                    <div className="footerDiv">
                        <span className='text'>If you are our partner, please enter review code!</span>
                        <Link to="/partner-code">
                            <button className='btn'>Enter Code</button>
                        </Link>
                    </div>
                </div>
                <div className="formDiv">
                    <div className="headerDiv">
                        <img className='logo' src={logoImg} alt='Hisoft Logo' />
                        <h3 className='welcome'>Welcome Back!</h3>
                    </div>
                    <form onSubmit={fetchUserData} className='form grid'>
                        <div className="inputDiv">
                            <label className="label" htmlFor='username'>Username</label>
                            <div className="input flex">
                                <FaUserShield className='icon' />
                                <input className="inputData" type='text' id='username' placeholder='Enter Username' required
                                    onChange={handleUsernameChange} value={username} minLength={6} />
                            </div>
                        </div>
                        <div className="inputDiv">
                            <label className="label" htmlFor='password'>Password</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className='icon' />
                                <input className="inputData" type={visible ? "text" : "password"} id='password'
                                    placeholder='Enter Password' required onChange={handlePasswordChange} value={password} />
                                <div className="toggle" onClick={() => setVisible(!visible)}>{visible ? <BsFillEyeFill className='icon' /> : <BsFillEyeSlashFill className='icon' />}</div>
                            </div>
                        </div>
                        <button className="btn">
                            <span>Login</span>
                            <AiOutlineSwapRight className='icon' />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default UserLogin;