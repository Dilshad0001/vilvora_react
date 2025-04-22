


import React from 'react';

function Footer() {
    return (
        <footer className="bg-[#CF4616] text-white" id="footer">
            <div className="w-full flex flex-col xl:flex-row">
                {/* Left Newsletter Section */}
                <div className="xl:w-[25%] w-full bg-[#CF4616] px-8 py-10 flex flex-col justify-between space-y-6">
                    <h2 className="text-3xl font-semibold">Newsletter</h2>
                    <p className="text-base max-w-xs">Sign up to receive updates on new products and special offers</p>
                    <div className="text-lg flex flex-col space-y-2">
                        <p className="font-medium">Subscribe to our newsletter</p>
                        <label className="text-sm mt-3">Email *</label>
                        <input
                            type="email"
                            className="border-b-2 border-white bg-transparent placeholder-white text-white focus:outline-none focus:border-white py-1"
                            placeholder="Enter your email"
                        />
                        <button className="w-full mt-4 bg-white text-[#CF4616] font-semibold py-2 transition-all hover:bg-[#fefefe]">
                            Submit
                        </button>
                    </div>
                </div>

                {/* Right Links Section */}
                <div className="xl:w-[75%] bg-[#E8EBED] text-black">
                    <div className="grid grid-cols-2 xl:grid-cols-4 gap-6 py-10 px-8 xl:px-16">
                        {/* Shop */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Shop</h3>
                            <ul className="space-y-2 text-base">
                                <li className="hover:underline cursor-pointer">Men</li>
                                <li className="hover:underline cursor-pointer">Women</li>
                                <li className="hover:underline cursor-pointer">Sale</li>
                                <li className="hover:underline cursor-pointer">Stories</li>
                            </ul>
                        </div>

                        {/* Follow */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Follow</h3>
                            <ul className="space-y-2 text-base">
                                <li className="hover:underline cursor-pointer">Instagram</li>
                                <li className="hover:underline cursor-pointer">Facebook</li>
                            </ul>
                        </div>

                        {/* Policy */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Policy</h3>
                            <ul className="space-y-2 text-base">
                                <li className="hover:underline cursor-pointer">Terms & Conditions</li>
                                <li className="hover:underline cursor-pointer">Privacy Policy</li>
                                <li className="hover:underline cursor-pointer">Shipping Policy</li>
                                <li className="hover:underline cursor-pointer">Refund Policy</li>
                                <li className="hover:underline cursor-pointer">Accessibility</li>
                                <li className="hover:underline cursor-pointer">FAQ</li>
                            </ul>
                        </div>

                        {/* Store */}
                        <div>
                            <h3 className="text-xl font-semibold mb-4">Store</h3>
                            <ul className="space-y-2 text-base">
                                <li>Bridgeon Manjeri</li>
                                <li>Manjeri 679331</li>
                                <li>9:00 - 5:00</li>
                                <li>vilvora@gmail.com</li>
                                <li>9995869125</li>
                            </ul>
                        </div>
                    </div>

                    {/* Footer bottom */}
                    <div className="text-sm text-center py-6 border-t border-gray-300 px-4">
                        © 2025 Dilshad. Built at Bridgeon Solutions.
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
