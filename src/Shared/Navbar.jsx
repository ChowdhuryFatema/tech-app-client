import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/logo.png';

const Navbar = () => {

    const navLinks = <>
        <NavLink className="corner relative text-lg px-4 py-2 font-semibold text-white" to="/">Home</NavLink>
        <NavLink className="text-lg px-4 py-2 font-semibold text-white" to="/products">Products</NavLink>
    </>

    return (
        <div className='fixed w-full top-0 left-0 z-50'>
            <div className='max-w-7xl mx-auto px-5'>
                <div className="navbar">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                            </div>
                            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                                {navLinks}
                            </ul>
                        </div>
                        <Link to="/" className="flex items-center gap-2">
                            <img className='w-10 animate-spin' src={logo} />
                            <span className='text-3xl font-bold text-white'>Tach Apps</span>
                        </Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {navLinks}
                        </ul>
                    </div>
                    <div className="navbar-end">
                        <div className='flex gap-4'>
                            <Link to="/logIn" className="relative px-4 py-2 overflow-hidden group bg-[#0ae0b8] hover:bg-gradient-to-r hover:from-[#0ae0b8] hover:to-[#0ae0b8] text-black font-bold transition-all ease-out duration-300">
                                <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
                                <span className="relative">Sign In</span>
                            </Link>
                            <Link to="/signUp" className="relative inline-flex items-center justify-center px-4 py-2 overflow-hidden tracking-tighter text-white font-bold bg-gray-800 group corner hover:text-black duration-500">
                                <span className="absolute w-0 transition-all duration-500 ease-out bg-[#0ae0b8] rounded-full group-hover:w-56 h-56"></span>
                                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                                <span className="relative">Sign Up</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;