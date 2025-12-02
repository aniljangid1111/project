import React, { useState } from 'react';

export default function AddProduct() {
  const [productImage, setProductImage] = useState(null);
  const [backImage, setBackImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const handleDrop = (e, setImage) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleGalleryDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setGalleryImages(newPreviews);
  };

  const handleFileChange = (e, setImage) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleGalleryFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setGalleryImages(newPreviews);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Create Product</h2>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Drag & Drop Section */}
        <div className="md:w-1/2 space-y-4">
          {/* Product Image */}
          <div
            className="w-full h-40 border-2 border-dashed rounded flex items-center justify-center bg-gray-100 cursor-pointer relative"
            onDrop={(e) => handleDrop(e, setProductImage)}
            onDragOver={(e) => e.preventDefault()}
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setProductImage)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {productImage ? (
              <img src={productImage} alt="Product" className="h-full object-contain" />
            ) : (
              <p className="text-gray-500">Product Image (Drag & Drop)</p>
            )}
          </div>

          {/* Back Image */}
          <div
            className="w-full h-40 border-2 border-dashed rounded flex items-center justify-center bg-gray-100 cursor-pointer relative"
            onDrop={(e) => handleDrop(e, setBackImage)}
            onDragOver={(e) => e.preventDefault()}
          >
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e, setBackImage)}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {backImage ? (
              <img src={backImage} alt="Back" className="h-full object-contain" />
            ) : (
              <p className="text-gray-500">Back Image (Drag & Drop)</p>
            )}
          </div>

          {/* Gallery Images */}
          <div
            className="w-full h-40 border-2 border-dashed rounded flex items-center justify-center bg-gray-100 cursor-pointer relative overflow-x-auto"
            onDrop={handleGalleryDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleGalleryFileChange}
              className="absolute inset-0 opacity-0 cursor-pointer"
            />
            {galleryImages.length > 0 ? (
              <div className="flex gap-2 overflow-x-auto px-2">
                {galleryImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="Gallery"
                    className="h-32 w-32 object-cover border rounded"
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Gallery Images (Drag & Drop)</p>
            )}
          </div>
        </div>

        {/* Right Form Fields */}
        <div className="md:w-1/2 space-y-4">
          <input type="text" placeholder="Product Name" className="w-full border p-2 rounded" />

          <select className="w-full border p-2 rounded">
            <option>Select Parent Category</option>
          </select>

          <select className="w-full border p-2 rounded">
            <option>Select Sub Category</option>
          </select>

          <select className="w-full border p-2 rounded">
            <option>Select Sub Sub Category</option>
          </select>

          <select className="w-full border p-2 rounded">
            <option>Select Material</option>
          </select>

          <select className="w-full border p-2 rounded">
            <option>Select Color</option>
          </select>

          <select className="w-full border p-2 rounded">
            <option>Select Product Type</option>
          </select>

          <select className="w-full border p-2 rounded">
            <option>Is Best Selling?</option>
          </select>

          <select className="w-full border p-2 rounded">
            <option>Is Top Rated?</option>
          </select>

          <select className="w-full border p-2 rounded">
            <option>Is Upsell?</option>
          </select>

          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Actual Price" className="w-full border p-2 rounded" />
            <input type="number" placeholder="Sale Price" className="w-full border p-2 rounded" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Total In Stocks" className="w-full border p-2 rounded" />
            <input type="number" placeholder="Order" className="w-full border p-2 rounded" />
          </div>
        </div>
      </div>

      {/* Description Field */}
      <div className="mt-6">
        <label className="block mb-1 font-medium">Description</label>
        <textarea
          placeholder="Enter product description..."
          className="w-full border p-2 rounded min-h-[120px]"
        />
      </div>

      {/* Submit */}
      <div className="mt-6">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Create Product
        </button>
      </div>
    </div>
  );
}
