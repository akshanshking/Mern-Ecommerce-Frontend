import { useState, useEffect } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router";

export default function Checkout() {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (!userId) {
      navigate("/login");
      return;
    }
    api.get(`/cart/${userId}`).then((res) => setCart(res.data));
    api.get(`/address/${userId}`).then((res) => {
      setAddresses(res.data);
      setSelectedAddress(res.data[0]);
    });
  }, []);

  if (!cart) return <div className="p-6 text-white bg-[#022c2d] min-h-screen">Loading...</div>;

  const total = cart.items.reduce(
    (sum, item) => sum + item.productId.price * item.quantity,
    0
  );

 const placeOrder = async () => {
  if (!selectedAddress) {
    alert("Please select address");
    return;
  }

  try {
    const res = await api.post("/order/place", {
      userId,
      address: selectedAddress,
    });

    // DEBUG: This will show you exactly what the server sent back
    console.log("Full Server Response:", res.data);

    // Try to find the ID in every common location
    const newOrderId = 
      res.data._id || 
      res.data.order?._id || 
      res.data.orderId || 
      res.data.id;

    if (newOrderId) {
      console.log("Redirecting to order:", newOrderId);
      navigate(`/order-success/${newOrderId}`);
    } else {
      // If we still can't find it, we alert the user with the actual data received
      alert("Order placed! But we couldn't find the ID. Check console.");
      console.error("The response data was:", res.data);
    }
  } catch (error) {
    console.error("Critical Checkout Error:", error);
    alert("Server error: Could not place order.");
  }
};

  return (
    <div className="min-h-screen bg-[#022c2d] text-white p-6 pt-24 relative overflow-hidden font-sans">
      
      {/* Decorative Gold Arc from image */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none z-0">
        <svg viewBox="0 0 100 100" className="w-full h-full opacity-20">
          <path d="M100,0 C80,30 75,70 100,100" stroke="#f1c40f" fill="none" strokeWidth="0.5" />
        </svg>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-3xl font-bold mb-8 font-['Quicksand'] border-l-4 border-[#ff7043] pl-4">Checkout</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Left: Address Selection */}
          <div className="md:col-span-2 space-y-4">
            <h2 className="text-xl font-semibold mb-4 opacity-80">Delivery Address</h2>
            {addresses.map((addr) => (
              <label
                key={addr._id}
                className={`block p-5 rounded-2xl cursor-pointer transition-all border-2 ${
                  selectedAddress?._id === addr._id 
                  ? "bg-white text-gray-900 border-[#ff7043] shadow-lg" 
                  : "bg-white/10 text-white border-transparent hover:bg-white/20"
                }`}
              >
                <div className="flex items-start gap-4">
                  <input
                    type="radio"
                    name="address"
                    checked={selectedAddress?._id === addr._id}
                    onChange={() => setSelectedAddress(addr)}
                    className="mt-1 accent-[#ff7043]"
                  />
                  <div className="flex-1">
                    <strong className="text-lg block mb-1">{addr.fullName}</strong>
                    <p className="text-sm opacity-80 leading-relaxed">
                      {addr.addressLine}, {addr.city}, {addr.state} - {addr.pincode}
                    </p>
                    <p className="text-sm mt-2 font-semibold">📞 {addr.phone}</p>
                  </div>
                </div>
              </label>
            ))}
            
            <button 
                onClick={() => navigate("/checkout-address")}
                className="text-sm text-[#ff7043] font-bold hover:underline"
            >
                + Add New Address
            </button>
          </div>

          {/* Right: Summary */}
          <div className="bg-white text-gray-900 p-8 rounded-[32px] shadow-2xl h-fit sticky top-28">
            <h2 className="text-xl font-bold mb-6 border-b pb-4 border-gray-100">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
                <div className="flex justify-between text-gray-500">
                    <span>Items Total</span>
                    <span>${total}</span>
                </div>
                <div className="flex justify-between text-gray-500">
                    <span>Delivery</span>
                    <span className="text-green-600 font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-2xl font-black pt-4 border-t border-gray-100">
                    <span>Total</span>
                    <span>${total}</span>
                </div>
            </div>

            <button 
              className="w-full bg-[#ff7043] text-white py-4 rounded-2xl font-bold shadow-lg hover:bg-[#e64a19] transition-all active:scale-95 text-lg"
              onClick={placeOrder}
            >
              Place Order (COD)
            </button>
            <p className="text-[10px] text-center text-gray-400 mt-4 uppercase tracking-widest">Secure Checkout</p>
          </div>

        </div>
      </div>
    </div>
  );
}