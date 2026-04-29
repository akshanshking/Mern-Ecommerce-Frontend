import { useState } from "react";
import { useNavigate } from "react-router"; // Assuming you use react-router for navigation
import api from "../api/axios";
import birdLogo from '../assets/bird.png'; 

export default function Signup() {
    const [form, setForm] = useState({
        name: "",
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
            const response = await api.post("/auth/signup", form);
            setMsg(response.data.message);
            // Optionally redirect to login after a delay
            if (response.status === 201 || response.status === 200) {
                setTimeout(() => navigate("/login"), 2000);
            }
        } catch (err) {
            setMsg(err.response?.data?.message || "An error occurred");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#7d8481] px-4 font-sans">
            {/* External Font Import */}
            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Quicksand:wght@400;500;600&display=swap');`}
            </style>

            <div className="flex flex-col md:flex-row w-full max-w-[1000px] h-auto md:h-[650px] bg-white rounded shadow-2xl overflow-hidden">
                
                {/* LEFT SECTION - Sage Green & Bird Illustration */}
                <div className="flex-[1.2] bg-[#9cb4a5] flex flex-col items-center justify-center text-center text-white relative overflow-hidden">
                    <img 
                        src={birdLogo} 
                        alt="Bird Illustration" 
                        className="w-full h-auto max-h-[70%] object-contain" 
                    />
                    
                    <div className="px-10 pb-10">
                        <h2 className="text-2xl font-semibold mb-2 font-['Quicksand']">Join Our Community</h2>
                        <p className="text-sm opacity-80 leading-relaxed max-w-xs mx-auto font-['Quicksand']">
                            Create an account to start your journey with Akshansh's Store today.
                        </p>
                        
                        <div className="flex justify-center space-x-2 mt-6">
                            <span className="w-2 h-2 bg-white rounded-full"></span>
                            <span className="w-2 h-2 bg-white opacity-40 rounded-full"></span>
                            <span className="w-2 h-2 bg-white opacity-40 rounded-full"></span>
                        </div>
                    </div>
                </div>

                {/* RIGHT SECTION - SIGNUP FORM */}
                <div className="flex-1 p-10 md:p-16 flex flex-col justify-center relative bg-white">
                    {/* Stylish Branding */}
                    <h1 className="absolute top-8 right-10 text-2xl text-gray-700 tracking-tight font-['Pacifico']">
                        Akshansh's Store
                    </h1>

                    <div className="mt-10">
                        <div className="text-center mb-8">
                            <h3 className="text-gray-400 text-sm font-['Quicksand']">Create your account</h3>
                        </div>

                        {msg && (
                            <div className={`mb-6 text-center text-sm font-medium ${msg.toLowerCase().includes("success") ? "text-green-600" : "text-red-500"}`}>
                                {msg}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="border-b border-gray-200 py-1">
                                <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-widest font-['Quicksand']">Full Name</label>
                                <input
                                    name='name'
                                    type="text"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="John Doe"
                                    className="w-full focus:outline-none text-gray-700 bg-transparent py-2 border-none text-base font-['Quicksand']"
                                    required
                                />
                            </div>

                            <div className="border-b border-gray-200 py-1">
                                <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-widest font-['Quicksand']">Email Address</label>
                                <input
                                    name='email'
                                    type="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="john@example.com"
                                    className="w-full focus:outline-none text-gray-700 bg-transparent py-2 border-none text-base font-['Quicksand']"
                                    required
                                />
                            </div>

                            <div className="border-b border-gray-200 py-1">
                                <label className="block text-[10px] uppercase font-bold text-gray-400 tracking-widest font-['Quicksand']">Password</label>
                                <input
                                    name='password'
                                    type="password"
                                    value={form.password}
                                    onChange={handleChange}
                                    placeholder="********"
                                    className="w-full focus:outline-none text-gray-700 bg-transparent py-2 border-none text-base font-['Quicksand']"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full max-w-[200px] mx-auto block bg-[#5a5a5a] text-white py-3 rounded-full text-sm font-semibold hover:bg-black transition-all shadow-lg active:scale-95 font-['Quicksand'] mt-8"
                            >
                                Sign Up
                            </button>
                        </form>

                        <div className="relative my-10">
                            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100"></div></div>
                            <div className="relative flex justify-center text-[10px] uppercase tracking-tighter"><span className="bg-white px-4 text-gray-300 font-['Quicksand']">or</span></div>
                        </div>

                        <p className="text-center text-xs text-gray-400 font-['Quicksand']">
                            Already have an account? <a href="/login" className="font-bold text-gray-700 border-b border-gray-700 ml-1 hover:text-black">Sign In</a>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}