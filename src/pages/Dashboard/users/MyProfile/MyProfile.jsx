import useAuth from "../../../../Hooks/useAuth";
import BannerBtn from "../../../../components/BannerBtn";


const MyProfile = () => {

    const { user } = useAuth();
    console.log(user);

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="text-center space-y-4 shadow-2xl">
                <div className="profile-bg flex justify-center items-center p-10">
                    <img className="rounded-full w-40 h-40 -mb-28" src={user?.photoURL} />
                </div>
                <div className="p-10">
                    <h2 className="mt-10">Name: {user?.displayName}</h2>
                    <p>Email: {user?.email}</p>
                    

                  
                    <button className="mt-8" onClick={() => document.getElementById('my_modal_1').showModal()}>
                        
                    <BannerBtn label="Membership Subscription"></BannerBtn>
                        
                        </button>
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Hello!</h3>
                            <p className="py-4">Press ESC key or click the button below to close</p>
                            <div className="modal-action">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn">Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>



                </div>
            </div>
        </div>
    );
};

export default MyProfile;