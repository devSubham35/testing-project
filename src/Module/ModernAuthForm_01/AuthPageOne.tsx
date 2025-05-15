'use client'
import { useState } from "react";
import LoginSignupForm from "./LoginSignupForm_01"


const AuthPageOne = () => {

    const [isUserExist, setIsUserExist] = useState(false);
    const authToggler = () => {
        setIsUserExist(prev => !prev);
    }

    return (
            <div className='w-[50rem] h-[500px] rounded-2xl bg-white shadow-xl flex justify-between overflow-hidden'>

                <div className={`w-[50%] h-full p-6 flex justify-center items-center overflow-hidden duration-700
                     ${isUserExist? "translate-x-full" : "translate-x-0"}`}>
                    <LoginSignupForm
                        isUserExist={isUserExist}
                        authToggler={authToggler}
                    />
                </div>

                <div className={`relative w-[50%] h-full p-6 bg-rose-700 flex flex-col justify-center items-center duration-700 overflow-hidden 
                    ${isUserExist? "-translate-x-full" : "translate-x-0"}`}>
                    {
                        isUserExist ?
                            <>
                                <h1 className="text-[30px] font-bold text-white text-center">Welcome Back!</h1>
                                <p className="text-[15px] text-white/80 text-center font-medium">
                                    Access your account by logging in. Enter your credentials to continue.
                                </p>
                            </>
                            :
                            <>
                                <h1 className="text-[30px] font-bold text-white text-center">Create Account</h1>
                                <p className="text-[15px] text-white/80 text-center font-medium">
                                    Join our community by signing up for a new account. It’s quick, easy, and free!
                                </p>
                            </>
                    }

                    <div className="w-[400px] h-[400px] rounded-full bg-rose-100 absolute blur-lg
                    top-10 left-28 opacity-20"></div>
                </div>


            </div>
    )
}

export default AuthPageOne