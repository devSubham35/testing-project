'use client'
import { MdEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import useFormPage from "./useFormPage";
import { Input } from "@/components/ui/Input";
import { PasswordInput } from "@/components/ui/PasswordInput";

const buttonStyle = "w-full selection-none py-2.5 rounded-lg font-medium border-[2px] text-[14px] cursor-pointer flex items-center justify-center gap-1.5"

const LoginSignupForm_02 = () => {

    const { step, isUserExist, authToggler, buttonHandler, formik } = useFormPage()

    return (
        <div className='w-full'>


            <div className='mb-8'>
                <h1 className='font-bold text-center text-[22px] text-pink-800'>
                    {isUserExist ? "Login" : "Sign Up"}
                </h1>
                <p className='text-center text-[14px] text-gray-600'>
                    Join us now! to kick-start your journey
                </p>
            </div>

            <form onSubmit={(e: any) => { e.preventDefault(); formik.handleSubmit() }} className='w-full space-y-4 mb-3'>
                {step !== 1 &&
                    <div className='space-y-3'>
                        {step === 2 &&
                            <Input
                                id="userName"
                                placeholder="User Name"
                                {...formik.getFieldProps('userName')}
                                errorText={formik.touched.password && formik.errors.userName ? formik.errors.userName : ""}
                            />
                        }
                        <Input
                            id="email"
                            placeholder="Email"
                            {...formik.getFieldProps('email')}
                            errorText={formik.touched.email && formik.errors.email ? formik.errors.email : ""}
                        />
                        <PasswordInput
                            id="password"
                            placeholder="Password"
                            autoComplete="password"
                            {...formik.getFieldProps('password')}
                            errorText={formik.touched.password && formik.errors.password ? formik.errors.password : ""}
                        />
                    </div>
                }

                {step === 1 ?
                    <>
                        <button type="button" className={`${buttonStyle}`}>
                            <FcGoogle className='text-[18px]' />
                            Sign up with Google
                        </button>
                        <button onClick={buttonHandler} type="button" className={`${buttonStyle} 
                            text-white bg-pink-800 hover:bg-pink-900 transition-colors duration-500`}>
                            <MdEmail className='text-[18px]' />
                            Sign up with Email
                        </button>
                    </>
                    :
                    <button
                        type="submit"
                        className={`${buttonStyle} 
                    text-white bg-pink-800 hover:bg-pink-900 transition-colors duration-500`}>
                        {isUserExist ? "Login" : "Sign Up"}
                    </button>
                }
            </form>





            <div>
                <h1 className='text-[15px] text-center select-none'>
                    {isUserExist ? "Don't have an account?" : "Already have an account?"}
                    <span onClick={authToggler}
                        className='font-semibold text-pink-800 cursor-pointer ml-1.5 select-none'>
                        {isUserExist ? "Sign Up" : "Login"}
                    </span>
                </h1>
                {step !== 1 &&
                    <div className='w-full'>
                        <div className='w-full flex items-center my-3'>
                            <hr className='w-full border-[1px]' />
                            <h1 className='w-fit mx-3'>or</h1>
                            <hr className='w-full border-[1px]' />
                        </div>

                        <button type="button" className={`${buttonStyle}`}>
                            <FcGoogle className='text-[18px]' />
                            {isUserExist ? "Login" : "Sign Up"} with Google
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default LoginSignupForm_02