const LoginForm = () => {
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
                className="w-full mb-4 px-4 py-2 border rounded-md"
            />

            {/* Password input */}
            <label className="block mb-2 text-sm font-medium text-gray-700" htmlFor="password">
                Password
            </label>
            <input
                type="password"
                id="password"
                placeholder="********"
                className="w-full mb-2 px-4 py-2 border rounded-md"
            />

            {/* Row: Remember me checkbox + Forgot password link */}
            <div className="flex justify-between items-center mb-4">
                <label className="flex items-center text-sm text-gray-700">
                    <input type="checkbox" className="mr-2" />
                    Remember me
                </label>

                <a href="#" className="text-green-500 text-sm hover:underline">
                    Forgot Password?
                </a>
            </div>


            {/* Login button */}
            <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 my-2 rounded-md hover:bg-green-600 transition-colors"
            >
                Login
            </button>

            <p className="mb-4 text-sm text-gray-500 text-center mt-4">
                New here? <a href="#" className="text-green-500 hover:underline">Create an account</a>
            </p>
        </div>
    );
}
export default LoginForm;
