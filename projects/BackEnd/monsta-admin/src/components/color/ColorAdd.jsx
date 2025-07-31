import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export default function ColorAdd() {
    const [colorCode, setColorCode] = useState("");
    const [colorDetails, setColorDetails] = useState('');

    const navigate = useNavigate();
    const params = useParams();
    const updateId = params.id;

    useEffect(() => {
        if (updateId) {
            axios.post(`http://localhost:8001/api/admin/color/details/${updateId}`)
                .then((response) => {
                    if (response.data._status == true) {
                        const data = response.data._data;
                        setColorDetails(data);
                        setColorCode(data.code); // set colorCode when updateId
                    } else {
                        toast.error(response.data._message);
                        for (var value of response.data._data) {
                            toast.info(value);
                        }
                    }
                })
                .catch(() => {
                    toast.error("Something went wrong");
                });
        }
    }, [updateId]);


    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: e.target.name.value,
            code: e.target.code.value,
            order: e.target.order.value,
        }

        if (!updateId) {
            // Add color
            axios.post('http://localhost:8001/api/admin/color/create', data)
                .then((response) => {
                    if (response.data._status == true) {
                        toast.success(response.data._message);
                        navigate('/view-color')
                    } else {
                        toast.error(response.data._message)
                        for (var value of response.data._data) {
                            toast.info(value);
                        }
                    }
                })
                .catch(() => {
                    toast.error(response.data._message)
                })
        } else {
            // Update Color
            axios.put('http://localhost:8001/api/admin/color/update/'+updateId, data)
                .then((response) => {
                    if (response.data._status == true) {
                        toast.success(response.data._message);
                        navigate('/view-color')
                    } else {
                        toast.error(response.data._message)
                        for (var value of response.data._data) {
                            toast.info(value);
                        }
                    }
                })
                .catch(() => {
                    toast.error(response.data._message)
                })
        }

    };

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 border rounded-lg shadow bg-white">
            <h2 className="text-2xl font-bold mb-6 bg-gray-100 p-2 rounded">
                {
                    updateId ?
                        'Update Color'
                        :
                        'Add Colors'
                }
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Color Name */}
                <div>
                    <label className="block text-sm font-semibold mb-1">Color Name</label>
                    <input
                        type="text"
                        name="name"
                        defaultValue={colorDetails.name}
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
                            // name="code"
                            defaultValue={colorDetails.code}
                            onChange={(e) => setColorCode(e.target.value)}
                            className="w-12 h-12 border rounded"
                        />
                        <input
                            type="text"
                            name="code"
                            // defaultValue={colorDetails.code}
                            defaultValue={colorCode}
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
                        type="text"
                        name="order"
                        defaultValue={colorDetails.order}
                        placeholder="Enter Order"
                        className="w-full p-2 border rounded"
                    />
                </div>

                {/* Button */}
                <button type="submit" className="px-6 py-2 bg-purple-600 text-white rounded hover:bg-purple-700">
                    {
                        updateId ? 'Update color' : 'Add Color'
                    }

                </button>
            </form>
        </div>
    );
}

