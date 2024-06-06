import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import BannerBtn from "../../components/BannerBtn";


const ReviewForm = () => {

    const { user } = useAuth();
    const axiosPublic = useAxiosPublic();


    const handleReviewSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const description = form.description.value
        const rating = form.rating.value;


        const productReview = {

            reviewerName: user?.displayName,
            reviewerImage: user?.photoURL,
            email: user?.email,
            rating,
            description,

        }
        console.log(productReview)

        axiosPublic.post('/productReview', productReview)
            .then(data => {
                console.log(data.data);

                if (data.data.insertedId) {
                    Swal.fire({
                        text: "Product Added Successfully!",
                        icon: "success"
                    });
                    form.reset()
                }
            })
    }




    return (
        <div className="add-book min-h-[calc(100vh-80px)] relative">
            <div className="overlay1">
                <div className="max-w-5xl mx-auto px-5 py-16 relative z-30">
                    <div className="mb-8">
                        <h2 className="text-red text-3xl md:text-5xl text-red font-semibold text-center">Add Product</h2>
                    </div>
                    <form onSubmit={handleReviewSubmit} className="space-y-2 md:space-y-5">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">

                            <div className="space-y-2">
                                <p className="text-lg">Reviewer Name</p>
                                <input type="text" defaultValue={user?.displayName} className="border py-3 px-2 outline-none w-full bg-transparent rounded-md" disabled />
                            </div>


                            <div className="space-y-2">
                                <p className="text-lg">Reviewer Image</p>
                                <input type="url" defaultValue={user?.photoURL} className="border py-3 px-2 outline-none w-full bg-transparent rounded-md" disabled />
                            </div>
                        </div>
                        <div>
                            <div className="space-y-2">
                                <p className="text-lg">Review Description</p>
                                <textarea name="description" placeholder="Description" rows={8} className="border py-3 px-2 outline-none w-full bg-transparent rounded-md" ></textarea>
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5">
                            <div className="space-y-2">
                                <p className="text-lg">Rating</p>
                                <select name="rating" className="border px-2 outline-none w-full bg-transparent rounded-md py-3">
                                    <option className="py-5 outline-none w-full bg-transparent">Select Rating</option>
                                    <option className="text-black" value="1">1</option>
                                    <option className="text-black" value="2">2</option>
                                    <option className="text-black" value="3">3</option>
                                    <option className="text-black" value="4">4</option>
                                    <option className="text-black" value="5">5</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <p className="text-lg">External Links</p>
                                <input type="text" name="externalLink" placeholder="External Links" className="border py-3 px-2 outline-none w-full bg-transparent rounded-md" />
                            </div>
                        </div>

                        <div className="pt-5">
                            <button type="submit">
                                <BannerBtn label="Submit"></BannerBtn>
                            </button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default ReviewForm;


