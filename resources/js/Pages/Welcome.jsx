import LoginForm from "@/Components/Auth/LoginForm";


export default function Welcome() {
    return (
        <div className="welcom-page">
            <div className="welcome-page-content rounded-2xl">
                <div className="w-3/5 h-full p-10 bg-green-200 rounded-tl-2xl rounded-bl-2xl flex flex-col justify-center">
                    <h1 className="font-sans text-3xl font-bold">ESCend</h1>
                    <h1 className="font-sans text-2xl">Rise above tasks, one step at a time.</h1>
                </div>

                <div className="w-2/4 h-full flex items-center justify-center">
                    <LoginForm />
                </div>
            </div>

            <div className="absolute bottom-4 center text-sm text-gray-500">
                Created by Allen • For demo purposes
            </div>
        </div>
    );
}
