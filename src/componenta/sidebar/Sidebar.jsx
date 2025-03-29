import React, { useContext, useState, useEffect, useRef } from "react";
import "./sidebar.css";
import { assets } from "../../assets/assets";
import { Context } from "../../context/Context";

function Sidebar() {
    const [extend, setExtend] = useState(false);
    const { onSent, prevInputs, setRecentInput, newChat } = useContext(Context);
    const sidebarRef = useRef(null); // Reference to sidebar

    const loadInput = async (input) => {
        setRecentInput(input);
        await onSent(input);
    };

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setExtend(false); // Collapse sidebar when clicking outside
            }
        };

        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    return (
        <div ref={sidebarRef} className={`sidebar ${extend ? "" : "collapsed"}`}>
            <div className="top">
                <div className="menu">
                    <img 
                        onClick={(e) => { 
                            e.stopPropagation(); // Prevents click from triggering collapse
                            setExtend(prev => !prev);
                        }} 
                        src={assets.menu_icon} 
                        alt="Menu"
                    />
                </div>
                <div onClick={() => newChat()} className="new-chat">
                    <img src={assets.plus_icon} alt="New Chat" />
                    {extend && <p>New Chat</p>}
                </div>
                {extend && (
                    <div className="recent">
                        <p className="recent-title">Recent</p>
                        {prevInputs.map((item, index) => (
                            <div key={index} onClick={() => loadInput(item)} className="recent-entry">
                                <img src={assets.message_icon} alt="Message Icon" />
                                <p>{item.slice(0, 18)}...</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div className="bottom">
                <div className="bottom-item">
                    <img src={assets.question_icon} alt="Help" />
                    {extend && <p>Help</p>}
                </div>
                <div className="bottom-item">
                    <img src={assets.history_icon} alt="Activity" />
                    {extend && <p>Activity</p>}
                </div>
                <div className="bottom-item">
                    <img src={assets.setting_icon} alt="Settings" />
                    {extend && <p>Settings</p>}
                </div>
            </div>
        </div>
    );
}

export default Sidebar;