import { useState } from "react"
import Cookies from "js-cookie"
import { Navigate, useNavigate } from 'react-router-dom'


import "./Login.css"

function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState(false)
    const navigate = useNavigate()

    const onChangeUsername = (event) => {
        setUsername(event.target.value)
    }
    const onChangePassword = (event) => {
        setPassword(event.target.value)

    }

    const onSubmitLogin = async (event) => {
        event.preventDefault()
        const url = "https://apis.ccbp.in/login"
        const userDetails = {
            username: username,
            password: password
        }
        const options = {
            method: 'POST',
            body: JSON.stringify(userDetails),
        }
        const response = await fetch(url, options)

        if (response.status === 200) {
            const token = await response.json()
            console.log(token.jwt_token)
            Cookies.set("jwt_token", token.jwt_token, { expires: 30 })
            navigate("/")
        } else {
            setError(true)
        }
    }

    if (Cookies.get("jwt_token") !== undefined) {
        return <Navigate replace to="/" />
    }
    return (
        <div>
            <div className="login-form-container">
                <div className="images-container">
                    <img className="instagram-mobile-image" src="https://cdn.dribbble.com/users/8645133/screenshots/16155817/media/509a983f4249b2d2cfc54a93a4e92d7f.gif" alt="instagram mobile view" />
                </div>
                <form className="login-form" onSubmit={onSubmitLogin}>
                    <img className="instagram-text-image" alt="instagram text" src="https://hindubabynames.info/downloads/wp-content/themes/hbn_download/download/social-media/instagram-text-logo.png" />

                    <input onChange={onChangeUsername} value={username} placeholder="Phone number, email, username" className="form-input" type="text" />
                    <input onChange={onChangePassword} value={password} placeholder="Password" className="form-input" type="password" />

                    {error && <p className="error-msg">*Invalid userDetails</p>}
                    <button type="submit" className="login-button">Log in</button>
                </form>
            </div>
        </div>
    )
}

export default Login