import React, { useState, ChangeEvent } from "react";
import { LoginFormDetails } from "../../../Interface/Auth";
import { FC } from "react";
import { Button } from "react-bootstrap";

type Props = {
    data: LoginFormDetails,
    openRegister: () => void,
    onchange: (e: ChangeEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
}

const LoginForm: FC<Props> = ({ data, openRegister, onchange, onSubmit }) => {

    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full p-10">
            <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>

            {/* Email input */}
            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="email">
                Email
            </label>
            <input
                type="email"
                id="email"
                placeholder="you@example.com"
                className="w-full mb-4 px-3 py-2 border rounded-md"
                onChange={onchange}
                value={data.email}
            />

            {/* Password input */}
            <div className="relative mb-4">
                <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    placeholder="********"
                    className="w-full px-3 py-2 border rounded-md"
                    onChange={onchange}
                    value={data.password}
                />
                <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                >
                    {!showPassword ? (
                        <svg
                            width="24"
                            height="23"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M2.5 2.5L17.5 17.5"
                                stroke="#999999"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M8.81973 8.82248C8.16849 9.47325 8.16812 10.5287 8.81889 11.18C9.46967 11.8312 10.5252 11.8316 11.1764 11.1808"
                                stroke="#999999"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M7.59658 3.74975C7.19834 3.86367 6.96786 4.27886 7.08178 4.6771C7.1957 5.07534 7.61089 5.30583 8.00913 5.1919L7.59658 3.74975ZM10.0004 4.16666L9.9977 4.91666H10.0004V4.16666ZM18.3337 9.99999L18.9848 10.3722C19.1166 10.1416 19.1166 9.85849 18.9849 9.62787L18.3337 9.99999ZM15.6971 12.3976C15.4159 12.7018 15.4346 13.1763 15.7388 13.4574C16.043 13.7386 16.5175 13.7199 16.7986 13.4157L15.6971 12.3976ZM14.8839 15.0793C15.2273 14.8477 15.3179 14.3815 15.0863 14.0381C14.8547 13.6947 14.3885 13.6041 14.0451 13.8357L14.8839 15.0793ZM1.66699 9.99999L1.01586 9.6278C0.884051 9.85839 0.884035 10.1415 1.01582 10.3721L1.66699 9.99999ZM5.948 6.16984C6.2908 5.93733 6.38019 5.47094 6.14768 5.12815C5.91516 4.78535 5.44878 4.69596 5.10598 4.92847L5.948 6.16984ZM7.80286 4.47083L8.00913 5.1919C8.65571 5.00694 9.32519 4.91427 9.9977 4.91666L10.0004 4.16666L10.003 3.41666C9.18918 3.41378 8.37903 3.52592 7.59658 3.74975L7.80286 4.47083ZM10.0004 4.16666V4.91666C12.9737 4.91666 15.5413 6.62526 17.6825 10.3721L18.3337 9.99999L18.9849 9.62787C16.681 5.5964 13.6937 3.41666 10.0004 3.41666V4.16666ZM18.3337 9.99999L17.6826 9.62779C17.057 10.7221 16.3943 11.6432 15.6971 12.3976L16.2479 12.9067L16.7986 13.4157C17.5864 12.5634 18.3137 11.5462 18.9848 10.3722L18.3337 9.99999ZM14.4645 14.4575L14.0451 13.8357C12.8077 14.6702 11.4667 15.0833 10.0003 15.0833V15.8333V16.5833C11.7706 16.5833 13.4029 16.0781 14.8839 15.0793L14.4645 14.4575ZM10.0003 15.8333V15.0833C7.027 15.0833 4.45934 13.3747 2.31817 9.62787L1.66699 9.99999L1.01582 10.3721C3.31964 14.4036 6.30698 16.5833 10.0003 16.5833V15.8333ZM1.66699 9.99999L2.31812 10.3722C3.41996 8.44457 4.63588 7.05986 5.948 6.16984L5.52699 5.54916L5.10598 4.92847C3.5531 5.98179 2.19569 7.56375 1.01586 9.6278L1.66699 9.99999Z"
                                fill="#999999"
                            />
                        </svg>
                    ) : (
                        <svg
                            width="25"
                            height="25"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M10.0004 4.16666C7.02704 4.16666 4.45938 5.87526 2.31821 9.62211C4.45938 13.3689 7.02704 15.0775 10.0004 15.0775C12.9737 15.0775 15.5414 13.3689 17.6825 9.62211C15.5414 5.87526 12.9737 4.16666 10.0004 4.16666Z"
                                stroke="#999999"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <circle
                                cx="10"
                                cy="10"
                                r="1.5"
                                stroke="#999999"
                                strokeWidth="1.5"
                                fill="none"
                            />
                        </svg>
                    )}
                </button>
            </div>

            {/* Login button */}
            <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 my-2 rounded-md hover:bg-green-700 transition-colors"
                onClick={onSubmit}
            >
                Login
            </button>

            <p className="mb-4 text-sm text-gray-500 text-center mt-4">
                New here?
                <button
                    type="button"
                    className="ml-1 text-green-500 hover:underline"
                    onClick={openRegister}>
                    Create an account
                </button>
            </p>
        </div>
    );
}
export default LoginForm;
