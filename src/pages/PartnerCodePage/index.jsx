import { useState } from "react";
import { Link } from 'react-router-dom';
import { FaUserShield } from 'react-icons/fa';
import { BsFillShieldLockFill, BsFillEyeFill, BsFillEyeSlashFill, BsShieldFillCheck } from 'react-icons/bs';
import { AiOutlineSwapRight } from 'react-icons/ai';
import './css/style.css';
import contractManagementImg from '../../assets/img/contractmanagementlogo.png';
import logoImg from '../../assets/img/hisoftlogo.jpg';

function PartnerCode() {
    const [visible, setVisible] = useState(true);

    return(
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
                        <span className='text'>If you already have an account on this website, please sign in!</span>
                        <Link to="/login">
                            <button className='btn'>Sign in</button>
                        </Link>
                    </div>
                </div>
                <div className="formDiv">
                    <div className="headerDiv">
                        <img className='logo' src={logoImg} alt='Hisoft Logo' />
                        <BsShieldFillCheck className="icon" />
                        <h3 className='welcome'>Enter Your Code!</h3>
                    </div>
                    <form action='' className='form grid'>
                        {/* <div className="inputDiv">
                            <label className="label" htmlFor='username'>Username</label>
                            <div className="input flex">
                                <FaUserShield className='icon' />
                                <input className="inputData" type='text' id='username' placeholder='Enter Username' required />
                            </div>
                        </div> */}
                        <div className="inputDiv">
                            <label className="label" htmlFor='password'>Partner Code</label>
                            <div className="input flex">
                                <BsFillShieldLockFill className='icon' />
                                <input className="inputData" type={ visible ? "text" : "password"} id='password' placeholder='Enter code' required />
                                <div className="toggle" onClick={() => setVisible(!visible)}>{ visible ? <BsFillEyeFill className='icon' /> : <BsFillEyeSlashFill className='icon' />}</div>
                            </div>
                        </div>
                        <button className="btn">
                            <span>Confirm</span>
                            <AiOutlineSwapRight className='icon' />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default PartnerCode;