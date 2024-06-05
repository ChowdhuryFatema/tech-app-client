import useAuth from "../../../../Hooks/useAuth";


const MyProfile = () => {

    const { user } = useAuth();
    console.log(user);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-center space-y-4">
                <div className="flex justify-center items-center">
                    <img className="rounded-full" src={user?.photoURL} />
                </div>
                <h2>{user?.displayName}</h2>
                <p>{user?.email}</p>
            </div>
        </div>
    );
};

export default MyProfile;