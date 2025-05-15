import * as Yup from 'yup';
import { useState, useMemo, useEffect } from 'react';
import { useFormik } from "formik";

const useFormPage = () => {

    const [step, setStep] = useState(1);
    const [isUserExist, setIsUserExist] = useState(false);


    const signUpHandler = () => {
        setIsUserExist(false);
        setStep(2);
    }

    const loginHandler = () => {
        setIsUserExist(true);
        setStep(3);
    }

    const authToggler = () => {
        setIsUserExist(prev => !prev);
        isUserExist ? signUpHandler() : loginHandler();
    }

    const buttonHandler = () => {
        if (step === 1) {
            signUpHandler();
        } else if (step === 2) {
            console.log("Sign In Successfully");
        } else if (step === 3) {
            console.log("Login Successfully");
        }
    }

    // Define dynamic validation schema using Yup
    const validationSchema = useMemo(() => {
        if (step === 2) {
            return Yup.object({
                userName: Yup.string().required('Username is required'),
                email: Yup.string().email('Invalid email address').required('Email is required'),
                password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
            });
        } else {
            return Yup.object({
                email: Yup.string().email('Invalid email address').required('Email is required'),
                password: Yup.string().min(6, 'Password must be at least 6 characters long').required('Password is required'),
            });
        }
    }, [step]);


    const initialValues = step === 2 ? { userName: "", email: "", password: ""} : { email: "", password: ""}

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        onSubmit: (values) => {
            console.log('Form data', values);
            // Handle form submission
        },
        validateOnChange: true,
        validateOnBlur: true,
    });


    useEffect(() => {
        formik?.resetForm()
    }, [step])

    return {
        step,
        isUserExist,
        authToggler,
        buttonHandler,
        formik
    }
}

export default useFormPage;