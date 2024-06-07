import useAuth from "../../../../Hooks/useAuth";
import BannerBtn from "../../../../components/BannerBtn";
import Payment from "../MyProducts/Payment/Payment";


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

                    {/* modal  */}
                    <button className="mt-8" onClick={() => document.getElementById('my_modal_1').showModal()}>                   
                    <BannerBtn label="Membership Subscription"></BannerBtn>
                        </button>
                    <dialog id="my_modal_1" className="modal">
                        <div className="modal-box pt-10">
                           <Payment></Payment>
                            <div className="modal-action">
                                
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;