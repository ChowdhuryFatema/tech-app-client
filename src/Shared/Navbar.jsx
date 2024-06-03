import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import useAuth from '../Hooks/useAuth';
import userImg from '../assets/user.png';

const Navbar = ({ color, bgColor }) => {

    const { user, logOutUser } = useAuth();
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const navLinks = <>
        <NavLink className={`corner relative text-lg px-4 py-2 font-semibold ${color}`} to="/">Home</NavLink>
        <NavLink className={`corner relative text-lg px-4 py-2 font-semibold ${color}`} to="/products">Products</NavLink>
    </>

    const handleLogOut = () => {
        logOutUser()
    }

    useEffect(() => {
        const currentTheme = localStorage.getItem('theme');
        localStorage.setItem('theme', theme || currentTheme);

        const localTheme = localStorage.getItem('theme');
        document.querySelector('html').setAttribute('data-theme', localTheme);

    }, [theme]);

    const handleToggle = (e) => {
        if (e.target.checked) {
            setTheme('dark');
        } else {
            setTheme('light');
        }
    }

    return (
        <div className={`fixed w-full top-0 left-0 z-50 shadow-md ${bgColor}`}>
            <div className='max-w-7xl mx-auto px-5'>
                <div className="navbar">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                {navLinks}
                            </ul>
                        </div>
                        <Link to="/" className="flex items-center gap-2">
                            <img className='w-10 animate-spin' src={logo} />
                            <span className={`text-3xl font-bold ${color}`}>Tech Apps</span>
                        </Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {navLinks}
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <label onChange={handleToggle} className="me-3 cursor-pointer grid place-items-center">
                            <input
                                type="checkbox"


                                defaultChecked={theme == 'dark' ? true : false}
                                value="dark" className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2" />

                            <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5" /><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" /></svg>
                            <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                        </label>

                        {
                            user ?

                                <div className="dropdown dropdown-end">
                                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                        <div className="w-10 rounded-full border-2 border-[#0ae0b8]">
                                            <img alt="Tailwind CSS Navbar component" src={user?.photoURL || userImg} />
                                        </div>
                                    </div>
                                    <ul tabIndex={0} className="relative z-50 menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                                        <li>
                                            <a className="justify-between py-2">
                                                {user?.displayName && user?.displayName}
                                            </a>
                                        </li>
                                        <Link to="/dashboard/myProducts">Dashboard</Link>
                                        <li onClick={handleLogOut}><a className="py-2">Logout</a></li>
                                    </ul>
                                </div>
                                :
                                <div className='flex gap-4'>
                                    <Link to="/logIn" className="relative px-4 py-2 font-bold overflow-hidden group bg-[#0ae0b8] hover:bg-gradient-to-r hover:from-[#0ae0b8] hover:to-[#0ae0b8] text-white rounded-md transition-all ease-out duration-300">
                                        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                        <span className="relative">Sign In</span>
                                    </Link>
                                    <Link to="/signUp" className={`relative inline-flex items-center justify-center px-4 py-2 overflow-hidden font-bold ${color} hover:text-white rounded-md shadow-2xl group border border-[#0ae0b8]`}>
                                        <span className="absolute inset-0 w-full h-full transition duration-300 ease-out opacity-0 bg-[#0ae0b8] group-hover:opacity-100"></span>
                                        <span className="absolute top-0 left-0 w-full bg-gradient-to-b from-white to-transparent opacity-5 h-1/3"></span>
                                        <span className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white to-transparent opacity-5"></span>
                                        <span className="absolute bottom-0 left-0 w-4 h-full bg-gradient-to-r from-white to-transparent opacity-5"></span>
                                        <span className="absolute bottom-0 right-0 w-4 h-full bg-gradient-to-l from-white to-transparent opacity-5"></span>
                                        <span className="absolute inset-0 w-full h-full border border-white rounded-md opacity-10"></span>
                                        <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full group-hover:w-56 group-hover:h-56 opacity-5"></span>
                                        <span className="relative">Sign Up</span>
                                    </Link>
                                </div>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};
Navbar.propTypes = {
    color: PropTypes.string,
    bgColor: PropTypes.string,
}
export default Navbar;