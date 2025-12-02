import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function AddCategorySub() {
    const [categoryImage, setCategoryImage] = useState(null);
    const [categoryName, setCategoryName] = useState('');
    const [order, setOrder] = useState('');



    const handleSubmit = (e) => {
        e.preventDefault();
        // You can handle form data submission here
        console.log({
            categoryImage,
            categoryName,
            order,
        });
    };

    return (
        <>
            <section className="max-w-6xl mx-auto">
                {/* Breadcrumb */}
                <nav className="flex border-b-2" aria-label="Breadcrumb">
                    <ol className="p-3 px-6 inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                        <li className="inline-flex items-center">
                            <Link
                                className="inline-flex items-center text-md font-medium text-gray-700 hover:text-blue-600"
                                to="/"
                            >
                                Daseboard
                            </Link>
                        </li>
                        <li>
                            <div className="flex items-center">

                                <Link
                                    className="ms-1 text-md font-medium text-gray-700 hover:text-blue-600 md:ms-2"
                                    to="/add-category"
                                >
                                    Add  Category
                                </Link>
                            </div>
                        </li>
                    </ol>
                </nav>

                {/* Main Form */}
                <div className="w-full min-h-[610px]">
                    <div className="max-w-[1220px] mx-auto py-5">
                        <h3 className="text-[26px] font-semibold bg-slate-100 py-3 px-4 rounded-t-md border border-slate-400">
                            Add Category
                        </h3>

                        <form
                            autoComplete="off"
                            className="border border-t-0 p-3 rounded-b-md border-slate-400"
                            onSubmit={handleSubmit}
                        >
                            <div className="flex gap-5">
                                {/* Left side - Image Upload */}
                                <div className="w-1/3">
                                    <label className="block text-md font-medium text-gray-900 mb-2">
                                        Category Image
                                    </label>

                                    <div
                                        className="w-full p-6 border-2 border-dashed border-gray-300 rounded text-center cursor-pointer bg-gray-50 hover:bg-gray-100"
                                        onClick={() => document.getElementById("categoryImage").click()}
                                        onDragOver={(e) => e.preventDefault()}
                                        onDrop={(e) => {
                                            e.preventDefault();
                                            const file = e.dataTransfer.files[0];
                                            if (file && file.type.startsWith("image/")) {
                                                setCategoryImage(file);
                                            }
                                        }}
                                    >
                                        {categoryImage ? (
                                            <div className="flex flex-col items-center">
                                                <img
                                                    src={URL.createObjectURL(categoryImage)}
                                                    alt="Preview"
                                                    className="w-32 h-32 object-cover rounded mb-2"
                                                />
                                                <p className="text-sm text-green-600">{categoryImage.name}</p>
                                            </div>
                                        ) : (
                                            <div>
                                                <p className="text-gray-600">Drag & drop or click to upload</p>
                                                <p className="text-sm text-gray-400">Only image files allowed</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Hidden input */}
                                    <input
                                        type="file"
                                        accept="image/*"
                                        name="categoryImage"
                                        id="categoryImage"
                                        onChange={(e) => setCategoryImage(e.target.files[0])}
                                        className="hidden"
                                    />
                                </div>


                                {/* Right side - Text Inputs */}
                                <div className="w-2/3">
                                    <div>
                                        <div class="mb-5">
                                            <label class="block  text-md font-medium text-gray-900">Parent Category Name</label>
                                            <select name="parentCatSelectBox" class="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
                                                <option value="">Select Category</option>
                                                <option value="Mens">Men's</option>
                                                <option value="Women">Women</option>
                                                <option value="Sale">Sale</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="mb-5">
                                        <label class="block mb-5 text-md font-medium text-gray-900">Sub Category Name</label>
                                        <select name="parentCatSelectBox" class="border-2 border-gray-300 text-gray-900 mb-6 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3">
                                            <option value="">Select Category</option>
                                            <option value="Mens">Men's</option
                                            ><option value="Women">Women</option>
                                            <option value="Sale">Sale</option>
                                        </select>
                                    </div>
                                    <div className="mb-5">
                                        <label
                                            htmlFor="categoryName"
                                            className="block text-md font-medium text-gray-900"
                                        >
                                            Category Name
                                        </label>
                                        <input
                                            type="text"
                                            name="categoryName"
                                            id="categoryName"
                                            value={categoryName}
                                            onChange={(e) => setCategoryName(e.target.value)}
                                            className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                                            placeholder="Category Name"
                                            required
                                        />
                                    </div>

                                    <div className="mb-5">
                                        <label
                                            htmlFor="order"
                                            className="block text-md font-medium text-gray-900"
                                        >
                                            Order
                                        </label>
                                        <input
                                            type="number"
                                            name="order"
                                            id="order"
                                            value={order}
                                            onChange={(e) => setOrder(e.target.value)}
                                            className="text-[19px] border-2 shadow-sm border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 px-3"
                                            placeholder="Order"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="focus:outline-none my-5 text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5"
                            >
                                Add Sub Category
                            </button>
                        </form>
                    </div>
                </div>
            </section>
        </>
    );
}
