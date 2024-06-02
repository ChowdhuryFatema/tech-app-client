import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../Hooks/useAxiosSecure";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { TiTick } from "react-icons/ti";


const ManageUsers = () => {
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        }
    })

    const handleMakeAdmin = user => {

        const userInfo = {
            ...user,
            role: 'admin',
        }

        axiosSecure.patch(`/users/admin/${user._id}`, userInfo)
            .then(data => {
                if (data.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })
    }
    const handleMakeModerator = user => {
        const userInfo = {
            ...user,
            role: 'moderator',
        }
        axiosSecure.patch(`/users/admin/${user._id}`, userInfo)
            .then(data => {
                if (data.data.modifiedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Moderator Now!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                    refetch();
                }
            })
    }

    const handleDeleteUser = id => {

        axiosSecure.delete(`/users/${id}`)
            .then(data => {
                console.log(data.data);
                refetch()
            })

    }

    return (
        <div>
            <div className="flex justify-evenly my-10">
                <h2 className="text-3xl">All Users</h2>
                <h2 className="text-3xl">Total Users: {users.length}</h2>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            users.map((user, idx) => <tr key={user._id}>
                                <th>{idx + 1}</th>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    {
                                        user.role === 'admin' ?
                                                <button className="flex items-center">
                                                    <TiTick size={20} className="text-green-600" />Admin
                                                </button>
                                            :
                                            <button onClick={() => handleMakeAdmin(user)} className="btn btn-sm bg-red-100 text-red-600">
                                                Make Admin
                                            </button>
                                    }
                                </td>
                                <td>
                                    {
                                        user.role === 'moderator' ?
                                        <button className="flex items-center">
                                            <TiTick size={20} className="text-green-600" />Moderator
                                            </button> :
                                            <button onClick={() => handleMakeModerator(user)} className="btn btn-sm bg-yellow-100 text-yellow-600">
                                                Make Moderator
                                            </button>
                                    }
                                </td>
                                <td>
                                    <button onClick={() => handleDeleteUser(user._id)} className="btn btn-ghost btn-xs">
                                        <FaTrashAlt size={20} className="text-[#D1A054]"></FaTrashAlt>
                                    </button>
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;