import { useParams, useNavigate } from "react-router";

export default function OrderSuccess() {
    const { id } = useParams(); 
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#022c2d] flex items-center justify-center p-6 font-sans relative overflow-hidden">
            
            {/* 1. TOP-RIGHT: Fixed Golden Curve (Matching Home Page) */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none z-0">
                <svg viewBox="0 0 100 100" className="w-full h-full" preserveAspectRatio="none">
                    <path 
                        d="M100,0 C80,30 75,70 100,100" 
                        stroke="#f1c40f" 
                        fill="none" 
                        strokeWidth="0.4" 
                        className="opacity-40"
                    />
                </svg>
            </div>

            {/* 2. BOTTOM-RIGHT: Fixed Pure White Shape (Matching Home Page) */}
            <div className="absolute -bottom-24 -right-24 w-[450px] h-[450px] pointer-events-none z-0">
                <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle 
                        cx="100" 
                        cy="100" 
                        r="80" 
                        fill="#ffffff" 
                        className="opacity-15"
                    />
                </svg>
            </div>

            {/* Success Card */}
            <div className="max-w-md w-full bg-[#f0f0f0] rounded-[40px] p-12 text-center shadow-2xl relative z-10">
                
                {/* Success Icon with specific branding colors */}
                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-md border-4 border-green-500">
                    <span className="text-5xl text-green-500 font-bold">✓</span>
                </div>

                <h1 className="text-3xl font-black text-gray-900 mb-2 tracking-tight">Order Confirmed!</h1>
                <p className="text-gray-500 mb-10 font-medium">Thank you for shopping with us.</p>

                {/* ID Display Box - Using monochromatic premium style */}
                <div className="bg-white rounded-3xl p-6 mb-10 shadow-inner border border-gray-100">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 font-black mb-2">Order Tracking ID</p>
                    <p className="text-xl font-mono text-[#022c2d] font-bold break-all">
                        {id && id !== "undefined" ? id : "Processing..."}
                    </p>
                </div>

                {/* The Signature Orange Button */}
                <button
                    onClick={() => navigate("/")}
                    className="w-full bg-[#ff7043] text-white py-4 rounded-2xl font-black shadow-lg hover:bg-[#e64a19] transition-all active:scale-95 flex items-center justify-center gap-3 text-lg"
                >
                    Continue Shopping 🛍️
                </button>
                
                <p className="mt-8 text-xs text-gray-400 font-bold uppercase tracking-widest leading-loose">
                    Akshansh's Store <br/> A confirmation email is on its way.
                </p>
            </div>
        </div>
    );
}