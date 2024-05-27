import logo from '/Logo.png';
import '../components/style.css';
import user from "../assets/user.png"
import { useState } from 'react';
const Header = () => {
    const [isOpenedUser, setIsOpenedUser] = useState(false);
    const handleUserProfile = () => {
        setIsOpenedUser(!isOpenedUser);
    }
    return (
        <nav className="navbar">
            <img src={logo} alt="" />
            <div onClick={handleUserProfile}>
                <img src={user} alt="" className='logo' />
            </div>
            {isOpenedUser && (
                <div className='user-profile'>
                    <button onClick={handleUserProfile}>X</button>
                    <h4>Admin Name</h4>
                    <a href='#'>Logout</a>
                </div>
            )}
        </nav>
    )
}

export default Header
