import { useState } from 'react';
import { useNavigate } from 'react-router';
import api from '../api/axios';

export default function Login() {
    const [form,setForm]=useState({
        email:"",
        password:""
    })
    const [msg, setMsg]=useState("");
    const navigate=useNavigate();

    const handleChange=(e)=>{
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }

    const handleSubmit=async(e)=>{
        e.preventDefault();

        try{
            const res = await api.post("auth/Login", form);

            console.log(res,"data");
            //Save Token to Local Storage
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("userId", res.data.user.id);


            setMsg("Login Successful");
            //Redirect to Home Page after 1 second
            setTimeout(()=>{
                navigate("/");
            },1000); 
        } catch(err){
            setMsg(err.response?.data?.message || "An error occured");
        }
    }

    return(
        <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-6 text-center">Login to Your Account</h2>
                {msg && (
                    <div className="mb-4 text-center text-sm text-red-600 font-medium">
                        {msg}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={form.email}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Login
                    </button>

                </form>
            </div>
        </div>
    )
}
