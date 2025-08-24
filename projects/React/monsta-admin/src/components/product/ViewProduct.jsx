import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const productData = [
    {
        id: 1,
        name: "Men's",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        shortDescription: "Lorem ipsum dolor sit...",
        thumbnail: "https://via.placeholder.com/60",
        status: "Active",
    },
    {
        id: 2,
        name: "Men's",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        shortDescription: "Lorem ipsum dolor sit...",
        thumbnail: "https://via.placeholder.com/60",
        status: "Active",
    },
    {
        id: 3,
        name: "Men's",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        shortDescription: "Lorem ipsum dolor sit...",
        thumbnail: "https://via.placeholder.com/60",
        status: "Active",
    },
];

export default function ViewProduct() {
    return (
        <div className="p-4">
            <div className="bg-blue-50 border rounded-md shadow-sm">
                <h2 className="text-2xl font-semibold p-4 border-b">Product Items</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-100 text-left">
                            <tr className="text-gray-700 font-semibold">
                                <th className="px-4 py-3">DELETE</th>
                                <th className="px-4 py-3">S. NO.</th>
                                <th className="px-4 py-3">PRODUCT NAME</th>
                                <th className="px-4 py-3">DESCRIPTION</th>
                                <th className="px-4 py-3">SHORT DESCRIPTION</th>
                                <th className="px-4 py-3">THUMBNAILS</th>
                                <th className="px-4 py-3">ACTION</th>
                                <th className="px-4 py-3">STATUS</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y">
                            {productData.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-3">
                                        <input type="checkbox" />
                                    </td>
                                    <td className="px-4 py-3">{index + 1}</td>
                                    <td className="px-4 py-3">{item.name}</td>
                                    <td className="px-4 py-3">
                                        {item.description.slice(0, 25)}...
                                        <div className="text-blue-600 cursor-pointer">Read More</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        {item.shortDescription}
                                        <div className="text-blue-600 cursor-pointer">Read More</div>
                                    </td>
                                    <td className="px-4 py-3">
                                        <img
                                            src={item.thumbnail}
                                            alt="Thumbnail"
                                            className="w-14 h-14 object-cover rounded"
                                        />
                                    </td>
                                    <td className="px-4 py-3 flex gap-3 text-lg">
                                        <FaTrash className="text-red-600 cursor-pointer" />
                                        <span className="text-gray-400">|</span>
                                        <FaEdit className="text-yellow-500 cursor-pointer" />
                                    </td>
                                    <td className="px-4 py-3 text-gray-700">{item.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
