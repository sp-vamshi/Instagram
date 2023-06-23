
import "./story.css"
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";


const Story = (props) => {

    const { storyDetails, changeCurrentStory } = props
    const { currentStory, users_stories } = storyDetails
    // const[userStories, setUserStories] = useState(users_stories)
    const storyIndx = users_stories.findIndex(each => each.user_id === currentStory.user_id)
    const userStories = storyIndx < 2 ? users_stories.slice(storyIndx === 1 ? storyIndx - 1 : storyIndx, storyIndx + 3) : users_stories.slice(storyIndx - 2, storyIndx + 3)
    console.log(userStories)

    const getStyles = (bool) => {
        let style = ''
        if (bool) {
            if (storyIndx < 1) {
                style = "opened-story-card no-left-stories"
            }
            else if (storyIndx > users_stories.length - 2) {
                style = "opened-story-card no-right-stories"
            } else {
                style = "opened-story-card"
            }
        } else {
            style = "other-story-cards"
        }

        return style
    }

    const changeStory = (obj) => {
        changeCurrentStory(obj)
    }

    const onNextBackStory = (direction) => {
        if (direction === "left" && storyIndx >= 1) {
            const obj = users_stories[storyIndx - 1]
            changeStory(obj)
        } else if (direction === "right" && storyIndx <= users_stories.length - 2) {
            const obj = users_stories[storyIndx + 1]
            changeStory(obj)
        }
    }


    return (
        <div className="stories-modal">
            {storyIndx >= 1 && <BsFillArrowLeftCircleFill onClick={() => onNextBackStory("left")} className="story-arrow-icon" />}
            {userStories.map(each => {
                const storyCardStyles = getStyles(each.user_id === currentStory.user_id)
                return (
                    <div onClick={() => changeStory(each)} key={each.user_id} className={storyCardStyles} >
                        <div className="story-user-profile-name-image-container">
                            <img alt={each.user_id} className="user-story-profile-image" src={each.story_url} />
                            <h6 className="story-user-name">@ {each.user_name}</h6>
                        </div>
                        <img alt={each.user_id} className="opened-story-image" src={each.story_url} />
                    </div>
                )
            })}
            {storyIndx <= users_stories.length - 2 && <BsFillArrowRightCircleFill onClick={() => onNextBackStory("right")} className="story-arrow-icon" />}
        </div>
    )
}

export default Story