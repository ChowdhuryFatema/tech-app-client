import { Link, NavLink } from "react-router-dom";
import logoImg from './../assets/logo.png';


const Footer = () => {
    return (
        <div className="footer-bg">
            <div className="bg-black bg-opacity-75">
                <div className="footer p-10 text-base-content py-20">
                    <aside>
                        <Link to="/" className="flex items-center gap-2 mb-5">
                            <img className='w-8 animate-spin' src={logoImg} />
                            <span className="text-2xl font-bold text-white">Tech Apps</span>
                        </Link>
                        <p className="text-white">
                            Web Tech App provides cutting-edge web <br /> development solutions to elevate your  <br />
                            online presence with innovative and <br />
                            user-friendly designs.
                        </p>
                    </aside>
                    <nav className="text-white">
                        <h6 className="footer-title text-white opacity-100">Services</h6>
                        <NavLink to="/">Home</NavLink>
                        <NavLink to="/products">Products</NavLink>
                        <NavLink to="/Dashboard">Dashboard</NavLink>
                        <NavLink to="/signUp">Sign Up</NavLink>
                        <NavLink to="/login">Login</NavLink>
                    </nav>
                    <div className="py-6 md:py-0 md:px-6 text-white">
                        <h1 className="text-4xl font-bold">Get in touch</h1>

                        <div className="space-y-4">
                            <p className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                                </svg>
                                <span>Chattogram, Bangladesh</span>
                            </p>
                            <p className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                                </svg>
                                <span>123456789</span>
                            </p>
                            <p className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                                </svg>
                                <span>contact@business.com</span>
                            </p>
                        </div>
                    </div>

                    <nav className="text-white">
                        <h6 className="footer-title text-white opacity-100">Social</h6>
                        <div className="grid grid-flow-col gap-4">
                            <a target="_blank" href="https://twitter.com/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg></a>
                            <a target="_blank" href="https://www.youtube.com/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path></svg></a>
                            <a target="_blank" href="https://www.facebook.com/"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className="fill-current"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path></svg></a>
                        </div>
                    </nav>
                </div>
                <hr />
                <div className="footer footer-center p-4 text-base-content">
                    <aside>
                        <p className="text-white">Copyright © 2024 - All right reserved by Tech Apps</p>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default Footer;