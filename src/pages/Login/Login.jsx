import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form"
import { useContext, useState } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import { LuEye, LuEyeOff } from "react-icons/lu";
import Swal from "sweetalert2";
import Navbar from "../../Shared/Navbar";
import BannerBtn from "../../components/BannerBtn";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const Login = () => {

    const [showPassword, setShowPassword] = useState(false)
    const { signInUser, googleLogin, gitHubLogin } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const axiosPublic = useAxiosPublic();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data, e) => {

        const { email, password } = data;
        signInUser(email, password)
            .then(result => {
                console.log(result)
                navigate(location?.state || '/')
                Swal.fire({
                    text: "User Login Successfully!",
                    icon: "success"
                });
                e.target.reset()

            })
            .catch(error => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: error.message,
                });
            })

    }

    const handleSocialLogin = socialProvider => {
        socialProvider()
            .then(result => {
                console.log(result)
                navigate(location?.state || '/');

                const userInfo = {
                    name: result.user.displayName,
                    email: result.user.email,
                }

                axiosPublic.post('/users', userInfo)
                .then(res => {
                    console.log(res.data);
                })

            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <>
            <Navbar bgColor="bg-white"></Navbar>
            <div className="my-10 md:my-20">
                <div className="max-w-2xl mx-auto px-5">
                    <div className="sign-up rounded-md" data-aos="zoom-in" data-aos-duration="500">
                        <div className="col-auto md:col-span-2 w-full space-y-3 dark:bg-gray-800 shadow-xl p-8 bg-black bg-opacity-20">
                            <div className="mb-10">
                                <h2 className="text-4xl md:text-5xl text-white font-bold text-center">Login</h2>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
                                <div>
                                    <label className="border text-white rounded-md p-3 flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                                        <input type="email" className="grow outline-none bg-transparent" placeholder="Email"  {...register("email", { required: true })} />


                                    </label>
                                    {errors.email && <span className="text-red text-sm">This field is required</span>}
                                </div>
                                <div>
                                    <label className="border text-white rounded-md p-3 relative flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                                        < input type={showPassword ? 'text' : 'password'} className="grow outline-none bg-transparent" placeholder="password"  {...register("password", { required: true })} />


                                        <p
                                            onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3">

                                            {showPassword ?
                                                <LuEye size={20} /> :
                                                <LuEyeOff size={20} />}
                                        </p>

                                    </label>
                                    {errors.password && <span className="text-red text-sm">This field is required</span>}


                                    <div className="mt-2 flex justify-end text-xs  dark:text-gray-600 text-white">
                                        <a rel="noopener noreferrer" href="#">Forgot Password?</a>
                                    </div>
                                </div>
                                <div className="flex justify-center pt-2">
                                    <button type="submit">
                                        <BannerBtn label="Sign In"></BannerBtn>
                                    </button>
                                </div>
                            </form>


                            <div className="flex items-center w-full my-4">
                                <hr className="w-full dark:text-gray-600" />
                                <p className="px-3 dark:text-gray-600 text-white">OR</p>
                                <hr className="w-full dark:text-gray-600" />
                            </div>
                            <div className="space-y-4">
                                <button onClick={() => handleSocialLogin(googleLogin)} aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /><path d="M1 1h22v22H1z" fill="none" /></svg>
                                    <p className="text-white">Login with Google</p>
                                </button>
                                <button onClick={() => handleSocialLogin(gitHubLogin)} aria-label="Login with GitHub" role="button" className="flex items-center justify-center w-full p-4 space-x-4 border rounded-md focus:ring-2 focus:ring-offset-1 dark:border-gray-600 focus:dark:ring-violet-600">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-6 h-6 fill-current text-white">
                                        <path d="M16 0.396c-8.839 0-16 7.167-16 16 0 7.073 4.584 13.068 10.937 15.183 0.803 0.151 1.093-0.344 1.093-0.772 0-0.38-0.009-1.385-0.015-2.719-4.453 0.964-5.391-2.151-5.391-2.151-0.729-1.844-1.781-2.339-1.781-2.339-1.448-0.989 0.115-0.968 0.115-0.968 1.604 0.109 2.448 1.645 2.448 1.645 1.427 2.448 3.744 1.74 4.661 1.328 0.14-1.031 0.557-1.74 1.011-2.135-3.552-0.401-7.287-1.776-7.287-7.907 0-1.751 0.62-3.177 1.645-4.297-0.177-0.401-0.719-2.031 0.141-4.235 0 0 1.339-0.427 4.4 1.641 1.281-0.355 2.641-0.532 4-0.541 1.36 0.009 2.719 0.187 4 0.541 3.043-2.068 4.381-1.641 4.381-1.641 0.859 2.204 0.317 3.833 0.161 4.235 1.015 1.12 1.635 2.547 1.635 4.297 0 6.145-3.74 7.5-7.296 7.891 0.556 0.479 1.077 1.464 1.077 2.959 0 2.14-0.020 3.864-0.020 4.385 0 0.416 0.28 0.916 1.104 0.755 6.4-2.093 10.979-8.093 10.979-15.156 0-8.833-7.161-16-16-16z"></path>
                                    </svg>
                                    <p className="text-white">Login with GitHub</p>
                                </button>
                            </div>
                            <p className="text-xs text-center sm:px-6 dark:text-gray-600 text-white">Do not have an account ?
                                <Link to="/signUp" rel="noopener noreferrer" className="underline dark:text-gray-800  font-semibold text-[#0ae0b8]"> Sign up</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;