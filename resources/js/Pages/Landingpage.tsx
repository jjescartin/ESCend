import React, { useState, ChangeEvent, } from "react";
import LoginForm from "../Components/Auth/Forms/LoginForm";
import RegisterModal from "../Components/Auth/Modals/RegisterModal";
import { LoginFormDetails, RegisterFormDetails } from "../Interface/Auth";
import { registerUser } from "../APIs/Auth/RegisterUserApi"
import { loginUser } from "../APIs/Auth/LoginUser";


export default function Welcome() {
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [registerFormData, setRegisterFormData] = useState<RegisterFormDetails>({
        email: "",
        password: ""
    });
    const [loginFormData, setLoginFormData] = useState<LoginFormDetails>({
        email: "",
        password: ""
    });

    const openRegisterModal = () => setIsRegisterOpen(true);
    const closeRegisterModal = () => setIsRegisterOpen(false);

    const handleRegisterFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setRegisterFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    }

    const handleLoginFormChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        console.log(id, value);
        setLoginFormData((prev) => ({
            ...prev,
            [id]: value,
        }));
    }

    const handleLogin = async (form: LoginFormDetails) => {
        console.log(form);
        try {
            const res = await loginUser(form)

            if(res.success) {
                console.log('res success');
                window.location.href = "/dashboard";
            }
        } catch (error) {
            console.log('Failed to login user', error);
        }
    }

    const handleDemoLogin = () => {
        handleLogin({
            email: "demo@mail.com",
            password: "password"
        })
    }

    const handleSubmitRegisterForm = async (form: RegisterFormDetails) => {
        try {
            const res = await registerUser(form)

            if (res.success) {
                console.log('res success');
                setLoginFormData({
                    email: res.user.email,
                    password: res.user.password
                })
                setIsRegisterOpen(false);
            }

        } catch (error) {
            console.log('Failed to create new user', error);
        }
    }

    return (
        <div className="welcom-page">
            <div className="welcome-page-content rounded-2xl">
                <div className="w-3/5 h-full p-10 bg-green-200 rounded-tl-2xl rounded-bl-2xl flex flex-col justify-center">
                    <h1 className="font-sans text-3xl font-bold">ESCend</h1>
                    <h1 className="font-sans text-2xl">Rise above tasks, one step at a time.</h1>
                </div>

                <div className="w-2/4 h-full flex items-center justify-center">
                    <LoginForm
                        data = {loginFormData}
                        openRegister={openRegisterModal} 
                        onchange={handleLoginFormChange}
                        onSubmit={()=> {handleLogin(loginFormData)}}
                        viewDemo={handleDemoLogin}/>
                </div>
            </div>

            <div className="absolute bottom-4 center text-sm text-gray-500">
                Created by Allen • For demo purposes
            </div>
            {isRegisterOpen &&
                <RegisterModal
                    isOpen={isRegisterOpen}
                    onClose={closeRegisterModal}
                    handleChange={handleRegisterFormChange}
                    submitForm={() => { handleSubmitRegisterForm(registerFormData) }} />}
        </div>
    );
}

