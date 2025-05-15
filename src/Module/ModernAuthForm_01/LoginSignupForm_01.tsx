'use client'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Input } from '@/components/ui/Input'
import { Label } from '@/components/ui/Label'
import { Button } from '@/components/ui/Button'
import { PasswordInput } from '@/components/ui/PasswordInput'

const LoginSignupForm_01 = ({ isUserExist, authToggler }: any) => {

    /// Define validation schema using Yup
    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is required'),
        password: Yup.string()
            .min(8, 'Password must be at least 8 characters')
            .required('Password is required'),
    })

    /// Initialize formik
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: (values) => {
            /// Handle form submission
            console.log('Form Values', values)
        },
    })

    return (
        <div className='w-full'>
            <form onSubmit={formik.handleSubmit} className='w-full h-fit space-y-3'>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Email"
                        {...formik.getFieldProps('email')}
                        errorText={formik.touched.email && formik.errors.email? formik.errors.email : ""}
                    />
                </div>

                <div>
                    <Label htmlFor="password">Password</Label>
                    <PasswordInput
                        id="password"
                        placeholder="Password"
                        autoComplete="password"
                        {...formik.getFieldProps('password')}
                        errorText={formik.touched.password && formik.errors.password? formik.errors.password : ""}

                    />
                </div>

                <Button
                    type="submit"
                    className='w-full py-6 text-[16px] rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold'
                >
                    {isUserExist ? "Login" : "Sign up"}
                </Button>
            </form>

            <h1 className='text-[15px] text-center select-none mt-6'>
                {isUserExist ? "Don't have an account?" : "Already have an account?"}
                <span
                    onClick={authToggler}
                    className='font-semibold text-rose-600 cursor-pointer ml-1.5 select-none'
                >
                    {isUserExist ? "Sign Up" : "Login"}
                </span>
            </h1>
        </div>
    )
}

export default LoginSignupForm_01
