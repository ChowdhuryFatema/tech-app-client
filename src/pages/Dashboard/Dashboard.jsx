import { Link, NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import useAuth from "../../Hooks/useAuth";
import useModerator from "../../Hooks/useModerator";
import logo from '../../assets/logo.png';

const Dashboard = () => {

    const [isAdmin] = useAdmin();
    const [isModerator] = useModerator();
    const { user } = useAuth();

    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="w-full lg:hidden navbar bg-base-300">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </div>
                        <div className="flex-1 px-2 mx-2">Navbar Title</div>
                    </div>
                    {/* Page content here */}

                    <Outlet></Outlet>

                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className="menu w-80 min-h-full text-base-content side-bar">
                        {/* Sidebar content here */}

                        <div className="bg-black w-full min-h-screen bg-opacity-75 p-5">
                            <div className="flex justify-center item-center">
                                <Link to="/" className="flex items-center gap-2 mb-5">
                                    <img className='w-8 animate-spin' src={logo} />
                                    <span className="text-2xl font-bold text-white">Tech Apps</span>
                                </Link>
                            </div>

                            <div className="mb-5 space-y-5">
                                <div className="flex justify-center items-center">
                                    <img className="w-20 h-20 rounded-full" src={user?.photoURL} alt="" />
                                </div>
                                <h2 className="text-[#0ae0b8] text-center text-lg font-semibold">{user?.displayName}</h2>
                            </div>
                            <ul>
                                {/* User route  */}
                                {
                                    user && !isAdmin && !isModerator && <>

                                        <li> <NavLink className="text-lg text-white" to="/dashboard/myProfile">My Profile</NavLink></li>
                                        <li><NavLink className="text-lg text-white" to="/dashboard/addProduct">Add Product</NavLink></li>
                                        <li><NavLink className="text-lg text-white" to="/dashboard/myProducts">My Products</NavLink></li>

                                    </>
                                }

                                {/* Moderator route */}
                                {
                                    isModerator && !isAdmin && <>
                                        <li>
                                            <NavLink className="text-lg text-white" to="/dashboard/productReview">Product Review Queue</NavLink>
                                        </li>
                                        <li>
                                            <NavLink className="text-lg text-white" to="/dashboard/reportedProducts"> Reported Contents</NavLink>
                                        </li>
                                    </>
                                }

                                {/* Admin route */}
                                {
                                    isAdmin &&
                                    <>
                                        <li><NavLink className="text-lg text-white" to="/dashboard/statistics">Statistics</NavLink></li>
                                        <li>
                                            <NavLink className="text-lg text-white" to="/dashboard/manageUsers">Manage Users</NavLink>
                                        </li>
                                        <li>
                                            <NavLink className="text-lg text-white" to="/dashboard/manageCoupons">Manage Coupons</NavLink>
                                        </li>
                                    </>
                                }
                            </ul>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;