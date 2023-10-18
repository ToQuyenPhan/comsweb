import React, { useEffect, useState } from "react";
import { Icon } from '@iconify/react';
import { $ } from 'react-jquery-plugin';
import "../css/_comments.css";
import { tns } from "../index";

function Comments() {
    const [autoPlay, setAutoPlay] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);
    let timeOut = null;

    const prevComment = () => {
        const isFirstComment = currentIndex === 0;
        const newIndex = isFirstComment ? comments.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    }

    const nextComment = () => {
        const isLastComment = currentIndex === comments.length - 1;
        const newIndex = isLastComment ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }

    const comments = [
        {
            contractName: "Lorem Ipsum is simply dummy text",
            createAt: "20 Hours ago",
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
        },
        {
            contractName: "abc",
            createAt: "20 Hours ago",
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
        },
        {
            contractName: "Lorem Ipsum is simply dummy text",
            createAt: "20 Hours ago",
            content: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s."
        }
    ];

    useEffect(() => {
        timeOut = autoPlay && setTimeout(() => {
            nextComment();
        }, 2500)
    }, []);

    return (
        <div className="comments">
            <div className="intro-x">
                <h2>
                    Important Notes
                </h2>
                <button onClick={prevComment} data-carousel="important-notes" data-target="prev" className="tiny-slider-navigator btn dark:text-slate-300"> <Icon icon="lucide:chevron-left" className="icon" /> </button>
                <button onClick={nextComment} data-carousel="important-notes" data-target="next" className="tiny-slider-navigator btn dark:text-slate-300"> <Icon icon="lucide:chevron-right" className="icon" /> </button>
            </div>
            <div className="intro-x">
                <div className="box zoom-in">
                    <div className="tiny-slider" id="important-notes">
                        <div onMouseEnter={() => {setAutoPlay(false)}} onMouseLeave={() => {setAutoPlay(true)}}>
                            <div>{comments[currentIndex].contractName}</div>
                            <div>{comments[currentIndex].createAt}</div>
                            <div>{comments[currentIndex].content}</div>
                            <div>
                                <button type="button" className="btn btn-secondary">View Notes</button>
                                <button type="button" className="btn btn-outline-secondary">Dismiss</button>
                            </div>
                        </div>
                        {/* <div>
                            <div>Lorem Ipsum is simply dummy text</div>
                            <div>20 Hours ago</div>
                            <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</div>
                            <div>
                                <button type="button" className="btn btn-secondary">View Notes</button>
                                <button type="button" className="btn btn-outline-secondary">Dismiss</button>
                            </div>
                        </div>
                        <div>
                            <div>Lorem Ipsum is simply dummy text</div>
                            <div>20 Hours ago</div>
                            <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</div>
                            <div>
                                <button type="button" className="btn btn-secondary">View Notes</button>
                                <button type="button" className="btn btn-outline-secondary">Dismiss</button>
                            </div>
                        </div>
                        <div>
                            <div>Lorem Ipsum is simply dummy text</div>
                            <div>20 Hours ago</div>
                            <div>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.</div>
                            <div>
                                <button type="button" className="btn btn-secondary">View Notes</button>
                                <button type="button" className="btn btn-outline-secondary">Dismiss</button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comments;