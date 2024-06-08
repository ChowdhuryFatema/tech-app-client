import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { useForm } from "react-hook-form"
import Swal from "sweetalert2";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
import BannerBtn from "../../components/BannerBtn";
import Navbar from "../../Shared/Navbar";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const SignUp = () => {

    const [showPassword, setShowPassword] = useState(false)
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data, e) => {

        const { name, email, photo, password } = data;
        console.log(name, photo);

        if (password.length < 6) {
            return toast.error("Your password must be at least 6 characters")
        }
        else if (!/[A-Z]/.test(password)) {
            return toast.error('Your password should contain at least one capital letter')
        }
        else if (!/[@#$%^&*]/.test(password)) {
            return toast.error('Your password should contain at least one special character')
        }

        createUser(email, password)
            .then(result => {
                console.log(result);
                
                updateUserProfile(name, photo)
                navigate(location?.state || '/')


                const userInfo = {
                    name,
                    photo,
                    email,
                }
                axiosPublic.post('/users', userInfo)
                    .then(data => {
                        if (data.data.insertedId) {
                            Swal.fire({
                                text: "User Created Successfully!",
                                icon: "success"
                            });
                            e.target.reset()
                            
                        }
                    })

            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message,
                });
            })

    }


    return (
        <div>
            <div className="min-h-[100px]">
                <Navbar bgColor="bg-white"></Navbar>
            </div>
            <div className="max-w-3xl mx-auto px-5 py-10">

                <div className="p-10 sign-up rounded-md" >
                    <div className="mb-10 space-y-2">
                        <h2 className="text-4xl md:text-5xl font-bold heading relative logo text-center text-white">Sign Up</h2>
                        <p className="text-center text-sm text-white">Already have an account?
                            <Link to="/login" className="underline font-semibold text-[#0ae0b8]"> Sign In</Link>
                        </p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <label className="space-y-2">
                                    <p className="text-white md:text-lg">Name</p>
                                    <input type="text" placeholder="Name" className="border text-white rounded-md p-3 outline-none w-full bg-transparent" {...register("name", { required: true })} />
                                    {errors.name && <span className="text-red-500 text-sm">This field is required</span>}
                                </label>
                                <label className="space-y-2">
                                    <p className="text-white md:text-lg">Email</p>
                                    <input type="email" placeholder="Email" className="border text-white rounded-md p-3 outline-none w-full bg-transparent" {...register("email", { required: true })} />

                                    {errors.email && <span className="text-red-500 text-sm">This field is required</span>}
                                </label>
                                <label className="space-y-2">
                                    <p className="text-white md:text-lg">Photo URL</p>
                                    <input type="url" placeholder="Photo URL" className="border text-white rounded-md p-3 outline-none w-full bg-transparent" {...register("photo", { required: true })} />
                                    {errors.photo && <span className="text-red-500 text-sm">This field is required</span>}
                                </label>
                                <label className="space-y-2">
                                    <p className="text-white md:text-lg">Password</p>
                                    <div className="relative">
                                        <input type={showPassword ? 'text' : 'password'} name="password" placeholder="Password" className="border text-white rounded-md p-3 outline-none w-full bg-transparent" {...register("password", { required: true })} />

                                        <p
                                            onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3">

                                            {showPassword ?
                                                <LuEye size={20} /> :
                                                <LuEyeOff size={20} />}
                                        </p>
                                    </div>

                                    {errors.password && <span className="text-red-500 text-sm">This field is required</span>}
                                </label>
                            </div>
                            <input type="checkbox" name="" id="" />
                            <span className="ml-2 text-sm text-white">I agree the Terms and Conditions</span>


                            <div className="pt-4 flex justify-center">
                                <button type="submit">
                                    <BannerBtn label="Sign Up"></BannerBtn>
                                </button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </div>

    );
};

export default SignUp;