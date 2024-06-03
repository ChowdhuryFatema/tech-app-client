import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../../Hooks/useAdmin";
import useAuth from "../../Hooks/useAuth";
import useModerator from "../../Hooks/useModerator";

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
                    <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        {/* Sidebar content here */}

                        {
                            user && !isAdmin && !isModerator && <>

                                <NavLink to="/dashboard/myProfile">My Profile</NavLink>
                                <NavLink to="/dashboard/addProduct">Add Product</NavLink>
                                <NavLink to="/dashboard/myProducts">My Products</NavLink>

                            </>
                        }

                        {
                            isModerator && !isAdmin && <>
                                <NavLink to="/dashboard/productReview">Product Review Queue</NavLink>
                            </>
                        }


                        {/* Admin route */}

                        {
                            isAdmin &&
                            <>
                                <NavLink to="/dashboard/statistics">Statistics</NavLink>
                                <NavLink to="/dashboard/manageUsers">Manage Users</NavLink>
                                <NavLink to="/dashboard/manageCoupons">Manage Coupons</NavLink>
                            </>
                        }

                        <hr />

                        {/* shared nav link  */}

                        <NavLink to="/">Home</NavLink>






                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;