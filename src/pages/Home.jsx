import { useEffect, useState } from "react";
import api from "../api/axios";
import { Link } from "react-router";

export default function Home() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");

    const loadProducts = async () => {
        const res = await api.get(
            `/products?search=${search}&category=${category}`
        );
        setProducts(res.data);
    }

    useEffect(() => {
        loadProducts();
    }, [search, category]);

    const addToCart = async (productId) => {
        try {

            const userId = localStorage.getItem("userId");
            if (!userId) {
                alert("Please login to add items to cart");
                return;
            }

            const res = await api.post("/cart/add", { userId, productId });

            const total = res.data.cart.items.reduce(
                (sum, item) => sum + item.productId.price * item.quantity,
                0
            );

            localStorage.setItem("cartCount", total);
            window.dispatchEvent(new Event("cartUpdated"));
        } catch (error) {
            console.error("Cart Error:", error);
            alert("Failed to add to cart ❌");
        }
    };



    return (
        <div className="p-6 pt-24 min-h-screen bg-[#022c2d] text-white relative font-sans">
            
            {/* 1. TOP-RIGHT: Elegant Golden Arc Detail */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] pointer-events-none opacity-20">
                <svg viewBox="0 0 100 100" className="w-full h-full text-gold">
                    <path d="M100,0 Q70,50 100,100" stroke="#f1c40f" fill="none" strokeWidth="0.5" />
                </svg>
            </div>

            {/* 2. BOTTOM-RIGHT: Subtle White Curve Detail */}
            <div className="absolute -bottom-20 -right-20 w-[600px] h-[600px] pointer-events-none opacity-10">
                <svg viewBox="0 0 100 100" className="w-full h-full text-white">
                    <circle cx="50" cy="50" r="50" fill="white" />
                </svg>
            </div>

            {/* Typography and Search Bar Section */}
            <div className="mb-10 flex flex-col md:flex-row gap-4 items-center bg-white/95 p-5 rounded-2xl shadow-xl relative z-10 text-gray-800">
                {/* Search Input */}
                <div className="relative w-full md:w-2/3">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-white text-gray-800 px-6 py-3 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-[#ff7043] placeholder-gray-400"
                    />
                </div>
                {/* Category Filter - Matches "All Categories" metal look */}
                <div className="relative w-full md:w-1/3">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full bg-[#f1f1f1] text-gray-800 px-6 py-3 rounded-xl appearance-none cursor-pointer font-medium"
                        style={{ borderRight: '16px solid transparent', backgroundImage: 'linear-gradient(to right, #ffffff, #dcdcdc)' }}
                    >
                        <option value="">All Categories</option>
                        <option value="Laptops">Laptops</option>
                        <option value="Mobiles">Mobiles</option>
                        <option value="Tablets">Tablets</option>
                    </select>
                </div>
            </div>

            {/* 3. PRODUCTS GRID: Enhanced Interactive Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
                {products.map((product) => (
                    <div
                        key={product._id}
                        className="bg-[#f0f0f0] p-6 rounded-3xl shadow-xl flex flex-col justify-between group transition-all duration-300 hover:-translate-y-2 hover:shadow-[#f1c40f]/20"
                    >
                        <Link to={`/product/${product._id}`} className="block">
                            {/* Inner white container for the image */}
                            <div className="bg-white rounded-2xl p-6 h-52 flex items-center justify-center overflow-hidden mb-5">
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <h2 className="font-bold text-gray-900 text-lg mb-2 leading-tight h-14 overflow-hidden">
                                {product.title}
                            </h2>
                        </Link>

                        {/* Price + Add to Cart Row */}
                        <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4">
                            <p className="text-[#333] font-black text-2xl">
                                ${product.price}
                            </p>
                            <button
                                onClick={() => addToCart(product._id)}
                                className="bg-[#ff7043] text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow hover:bg-[#e64a19] transition active:scale-95 flex items-center gap-2"
                            >
                                Add to Cart <span className="text-base">🛒</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}