import { useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import '../css/_top-bar.css';

function Topbar() {
    const [saveMenuClass, setSaveMenuClass] = useState('dropdown-menu');
    const saveMenuRef = useRef(null);

    const openSaveMenu = () => {
        if (saveMenuClass === 'dropdown-menu show') {
            setSaveMenuClass('dropdown-menu');
        } else {
            setSaveMenuClass('dropdown-menu show');
        }
    }

    const closeSaveMenu = (e) => {
        if (!saveMenuRef?.current?.contains(e.target)) {
            setSaveMenuClass('dropdown-menu');
        }
    }

    document.addEventListener('mousedown', closeSaveMenu);

    return (
        <div className="topbar intro-y">
            <h2>
                Add New Template
            </h2>
            <div>
                {/* <div class="dropdown mr-2">
                    <button class="dropdown-toggle btn box flex items-center" aria-expanded="false" data-tw-toggle="dropdown"> English <i class="w-4 h-4 ml-2" data-lucide="chevron-down"></i> </button>
                    <div class="dropdown-menu w-40">
                        <ul class="dropdown-content">
                            <li>
                                <a href="" class="dropdown-item"> <i data-lucide="activity" class="w-4 h-4 mr-2"></i> <span class="truncate">English</span> </a>
                            </li>
                            <li>
                                <a href="" class="dropdown-item"> <i data-lucide="activity" class="w-4 h-4 mr-2"></i> <span class="truncate">Indonesian</span> </a>
                            </li>
                        </ul>
                    </div>
                </div> */}
                <button type="button" className="btn box">
                    <Icon icon="lucide:eye" className='icon' /> Preview </button>
                <div className="dropdown" ref={saveMenuRef}>
                    <button className="dropdown-toggle btn btn-primary" aria-expanded="false" data-tw-toggle="dropdown" onClick={openSaveMenu}> Save
                        <Icon icon="lucide:chevron-down" className='icon' /></button>
                    <div className={saveMenuClass}>
                        <ul className="dropdown-content">
                            <li>
                                <a href="" class="dropdown-item"> <Icon icon="lucide:file-text" className='icon' /> As New Template </a>
                            </li>
                            <li>
                                <a href="" class="dropdown-item"> <Icon icon="lucide:file-text" className='icon' /> As Draft </a>
                            </li>
                            <li>
                                <a href="" class="dropdown-item"> <Icon icon="lucide:file-text" className='icon' /> Export to PDF </a>
                            </li>
                            <li>
                                <a href="" class="dropdown-item"> <Icon icon="lucide:file-text" className='icon' /> Export to Word </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Topbar;