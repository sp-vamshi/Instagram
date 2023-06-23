import { useEffect, useRef, useState } from "react"
import "./Home.css"
import Cookies from "js-cookie"
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import Story from "./Story"

const additionalStories = [
    {
        user_name: "Akhil",
        user_id: "Akhil_kodali",
        story_url: "https://mirimstudent25.files.wordpress.com/2013/10/movietalk-despicableme630-jpg_002144.jpg"
    },
    {
        user_name: "Ankit",
        user_id: "Ankit_mishra",
        story_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLoc4yamyuvCw6mXLD1tjrfsFkj4Jl3oEKsA&usqp=CAU"
    },
    {
        user_name: "Vishnu",
        user_id: "Vishnu_G",
        story_url: "https://images.unsplash.com/photo-1615551298862-0795063e3f1e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8NXx8fGVufDB8fHx8&w=1000&q=80"
    },
    {
        user_name: "Venkat Sai",
        user_id: "Venkat_k",
        story_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqH-q5dYTLaKgadJ_NXPD6ZRjzUdf2A5ovNkCWKcJ9kIp88rr1vdZjJhmkEgVLgKC9sA4&usqp=CAU"
    },
    {
        user_name: "Vamshi",
        user_id: "Vamshi_Sp",
        story_url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDd3DmiBmDb4a4_scXasJY4GWpPNIVIp6MRN8aD3nW83g1fQRBd8EObwb8M7z1ENCJ6jc&usqp=CAU"
    },
]

const Home = () => {

    const [stories, setStories] = useState()
    const storiesContRef = useRef()

    const modalRef = useRef()

    const openModal = (userId) => {
        const currentStoryData = stories.users_stories.filter(each => each.user_id === userId)[0]
        console.log(currentStoryData)
        setStories({ ...stories, currentStory: currentStoryData })
        modalRef.current.style.display = "block"
    }

    const closeModal = () => {
        modalRef.current.style.display = "none"
    }

    const getStoriesData = async () => {
        const jwtToken = Cookies.get("jwt_token")
        const url = "https://apis.ccbp.in/insta-share/stories"
        const options = {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        }

        const response = await fetch(url, options)
        const storiesData = await response.json()
        setStories({ currentStory: "", users_stories: [...storiesData.users_stories, ...additionalStories] })
    }

    const navigation = (dir) => {

        const container = storiesContRef.current;
        const scrollAmount =

            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });

    };


    useEffect(() => {
        getStoriesData()
    }, [])

    const changeCurrentStory = (curtStory) => {
        setStories({ ...stories, currentStory: curtStory })
    }

    return (
        <div className="home-container">
            <div className="newsfeed-container">
                <div className="stories-top-container">
                    <div className="arrow-container left">
                        <BsFillArrowLeftCircleFill onClick={() => navigation("left")} className="arrow-icon" />
                    </div>
                    <div ref={storiesContRef} className="stories-container">
                        {stories && stories.users_stories.map((each, ind) => {
                            return (
                                <div key={ind} className="story-card" onClick={() => openModal(each.user_id)} >
                                    <div className="story-image-card">
                                        <img className="story-image" src={each.story_url} alt={each.user_id} />
                                    </div>
                                    <div className="story-username">{each.user_name}</div>

                                </div>
                            )
                        })}
                    </div>
                    <div className="arrow-container right">
                        <BsFillArrowRightCircleFill onClick={() => navigation("right")} className="arrow-icon" />
                    </div>
                </div>

                <div ref={modalRef} className="modal">
                    <span onClick={closeModal} className="close" title="Close Modal">×</span>
                    <div className="story-component-container">
                        {stories && <Story changeCurrentStory={changeCurrentStory} storyDetails={stories} />}
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Home