import { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import api from '../api/axios';
import birdLogo from '../assets/bird.png'; 

export default function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });
    const [msg, setMsg] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await api.post("auth/login", form);
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.user.id);
            setMsg("Login Successful");
            setTimeout(() => navigate("/"), 1000);
        } catch (err) {
            setMsg(err.response?.data?.message || "An error occurred");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#7d8481] px-4 font-sans">
            {/* External Font Import for that "Stylish" look */}
            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Quicksand:wght@400;500;600&display=swap');`}
            </style>

            <div className="flex flex-col md:flex-row w-full max-w-[1000px] h-auto md:h-[650px] bg-white rounded shadow-2xl overflow-hidden">
                
                {/* LEFT SECTION - Matches Bird Image Background */}
                <div className="flex-[1.2] bg-[#9cb4a5] flex flex-col items-center justify-center text-center text-white relative overflow-hidden">
                    <img 
                        src={birdLogo} 
                        alt="Bird Illustration" 
                        className="w-full h-auto max-h-[70%] object-contain" 
                    />
                    
                    <div className="px-10 pb-10">
                        <h2 className="text-2xl font-semibold mb-2 font-['Quicksand']">Welcome to Our Page</h2>
                        <p className="text-sm opacity-80 leading-relaxed max-w-xs mx-auto font-['Quicksand']">
                            We’re glad you’re back! Log in to pick up where you left off.
                        </p>
                        
                        <div className="flex justify-center space-x-2 mt-6">
                            <span className="w-2 h-2 bg-white opacity-40 rounded-full"></span>
                            <span className="w-2 h-2 bg-white rounded-full"></span>
                            <span className="w-2 h-2 bg-white opacity-40 rounded-full"></span>
                        </div>
                    </div>
                </div>

                {/* RIGHT SECTION - LOGIN FORM */}
                <div className="flex-1 p-10 md:p-16 flex flex-col justify-center relative bg-white">
                    {/* The "Stylish" Logo Title */}
                    <h1 className="absolute top-8 right-10 text-2xl text-gray-700 tracking-tight font-['Pacifico']">
                        Akshansh's Store
                    </h1>

                    <div className="mt-10">
                        <div className="text-center mb-10">
                            <h3 className="text-gray-400 text-sm font-['Quicksand']">Welcome to Akshansh's Store</h3>
                        </div>

                        {msg && (
                            <div className={`mb-6 text-center text-sm font-medium ${msg.includes("Successful") ? "text-green-600" : "text-red-500"}`}>
                                {msg}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="border-b border-gray-200 py-1">
                                <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-widest font-['Quicksand']">User Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="David Brooks"
                                    className="w-full focus:outline-none text-gray-700 bg-transparent py-2 border-none text-base font-['Quicksand']"
                                    required
                                />
                            </div>

                            <div className="border-b border-gray-200 py-1">
                                <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-widest font-['Quicksand']">Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="********"
                                    className="w-full focus:outline-none text-gray-700 bg-transparent py-2 border-none text-base font-['Quicksand']"
                                    required
                                />
                            </div>

                            <div className="text-right !mt-2">
                                <a href="#" className="text-[11px] text-gray-400 hover:text-gray-600 font-['Quicksand']">Forgot password?</a>
                            </div>

                            <button
                                type="submit"
                                className="w-full max-w-[200px] mx-auto block bg-[#5a5a5a] text-white py-3 rounded-full text-sm font-semibold hover:bg-black transition-all shadow-lg active:scale-95 font-['Quicksand']"
                            >
                                Sign In
                            </button>
                        </form>

                        <div className="relative my-10">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                            <div className="relative flex justify-center text-[10px] uppercase tracking-tighter"><span className="bg-white px-4 text-gray-300 font-['Quicksand']">or</span></div>
                        </div>

                        <p className="text-center text-xs text-gray-400 font-['Quicksand']">
                            New to Akshansh's Store? 
                            <Link to="/Signup" className="font-bold text-gray-700 border-b border-gray-700 ml-1 hover:text-black">
                            Create Account
                            </Link>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    )
}