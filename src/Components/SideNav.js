import { Link, useNavigate } from 'react-router-dom';

import { Outlet } from 'react-router-dom'
import { AiOutlineHome } from "react-icons/ai";
import { FiSearch } from "react-icons/fi";
import { RiMessengerLine } from "react-icons/ri";
import { FiHeart } from "react-icons/fi";
import { BsPlusSquare } from "react-icons/bs";
import { BiMoviePlay } from "react-icons/bi";
import { MdOutlineExplore } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import "./SideNav.css"
import { useState } from 'react';

const sideNavList = [
    {
        path: "/",

        tabName: "Home",
        tabIcon: <AiOutlineHome className="sidenav-icon" />,
        id: 1,
    },
    {
        path: "/search",
        tabName: "Search",
        tabIcon: <FiSearch className="sidenav-icon" />,
        id: 2
    },
    {
        path: "/explore",
        tabName: "Explore",
        tabIcon: <MdOutlineExplore className="sidenav-icon" />,
        id: 3
    },
    {
        path: "/reels",
        tabName: "Reels",
        tabIcon: <BiMoviePlay className="sidenav-icon" />,
        id: 4
    },
    {
        path: "/messages",
        tabName: "Messages",
        tabIcon: <RiMessengerLine className="sidenav-icon" />,
        id: 5
    },
    {
        path: "/notification",
        tabName: "Notification",
        tabIcon: <FiHeart className="sidenav-icon" />,
        id: 6
    },
    {
        path: "/create",
        tabName: "Create",
        tabIcon: <BsPlusSquare className="sidenav-icon" />,
        id: 7
    },
    {
        path: "/profile",
        tabName: "Profile",
        tabIcon: <img className='profile-image' alt='profile' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRreh9Fwfj6mP6s9CINDCpfUXmi6OrRXJoD8fFI7BV01mzbbC1FhW5MLGQZYgH9PJ8UhC0&usqp=CAU' />,
        id: 8
    },
    {
        path: "/more",
        tabName: "More",
        tabIcon: <RxHamburgerMenu className="sidenav-icon" />,
        id: 9
    },
]

const getActiveTabId = (url) => {
    const path = sideNavList.filter(each => url.endsWith(each.path))[0]
    return path.id
}


const SideNav = () => {
    const activeTabId = getActiveTabId(window.location.href)
    const [activeTab, setActiveTab] = useState(activeTabId)
    const navigate = useNavigate()


    return (
        <div className='main-container'>
            <div className='sidenav-container'>
                {/* <h3 className='sidenav-insta-heading'>Instagram</h3> */}
                <img onClick={() => navigate("/")} className="sidenav-insta-img" alt="instagram text" src="https://hindubabynames.info/downloads/wp-content/themes/hbn_download/download/social-media/instagram-text-logo.png" />
                <ul className='sidenav-list'>
                    {sideNavList.map(each => {
                        return (
                            <li style={{ marginTop: each.tabName === "More" ? "auto" : "0px" }} key={each.id} onClick={() => setActiveTab(each.id)} >
                                <Link to={each.path} className='sidenav-list-item'>
                                    {each.tabIcon}
                                    <p className={activeTab === each.id ? 'sidenav-item-name active-tab-name' : "sidenav-item-name"}>{each.tabName}</p>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className='outlet-container'>
                <Outlet />
            </div>
        </div>
    )
}

export default SideNav