import React, { useState } from "react";

export default function ColorAdd() {
    const [colorName, setColorName] = useState("");
    const [colorCode, setColorCode] = useState("#000000");
    const [order, setOrder] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 border rounded-lg shadow bg-white">
            <h2 className="text-2xl font-bold mb-6 bg-gray-100 p-2 rounded">Add Colors</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Color Name */}
                <div>
                    <label className="block text-sm font-semibold mb-1">Color Name</label>
                    <input
                        type="text"
                        value={colorName}
                        onChange={(e) => setColorName(e.target.value)}
                        placeholder="Enter Color Name"
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Color Picker and Code */}
                <div>
                    <label className="block text-sm font-semibold mb-1">Color Picker</label>
                    <div className="flex items-center gap-4">
                        <input
                            type="color"
                            value={colorCode}
                            onChange={(e) => setColorCode(e.target.value)}
                            className="w-12 h-12 border rounded"
                        />
                        <input
                            type="text"
                            value={colorCode}
                            onChange={(e) => setColorCode(e.target.value)}
                            className="w-40 p-2 border rounded"
                            placeholder="#000000"
                        />
                    </div>
                </div>

                {/* Order */}
                <div>
                    <label className="block text-sm font-semibold mb-1">Order</label>
                    <input
                        type="number"
                        value={order}
                        onChange={(e) => setOrder(e.target.value)}
                        placeholder="Enter Order"
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Button */}
                <button
                    type="submit"
                    className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                >
                    Add Color
                </button>
            </form>
        </div>
    );
}

