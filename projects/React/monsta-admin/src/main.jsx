import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './components/css/index.css';
import Home from './components/Home.jsx';
import Layout from './components/layout/Layout';
import AdminListing from './components/user management/AdminListing.jsx';
import UserDetails from './components/user management/UserDetails';
import ColorView from './components/color/ColorView.jsx';
import ColorAdd from './components/color/ColorAdd.jsx';
import MaterialAdd from './components/material/MaterialAdd.jsx';
import MaterialView from './components/material/MaterialView.jsx';
import AddCategoryParent from './components/parentCategory/AddCategoryParent.jsx';
import ViewCategoryParent from './components/parentCategory/ViewCategoryParent.jsx';
import ViewCountry from './components/country/ViewCountry.jsx';
import AddCountry from './components/country/AddCountry.jsx';
import ContactEnquirys from './components/enquirys/ContactEnquirys.jsx';
import Newssletters from './components/enquirys/Newssletters.jsx';
import AddFaqs from './components/faqs/AddFaqs.jsx';
import ViewFaqs from './components/faqs/ViewFaqs.jsx';
import ViewCategorySub from './components/subCategory/ViewCategorySub.jsx';
import AddCategorySub from './components/subCategory/AddCategorySub.jsx';
import AddCategorySubSub from './components/subSubCategory/AddCategorySubSub.jsx';
import ViewCategorySubSub from './components/subSubCategory/ViewCategorySubSub.jsx';
import ViewProduct from './components/product/ViewProduct.jsx';
import AddProduct from './components/product/AddProduct.jsx';

const root = createRoot(document.getElementById('root'));
root.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route path="color">
            {/* <Route path="add" element={<AddColor />}></Route>
            <Route path="update/:id?" element={<AddColor />}></Route> */}
            {/* <Route path="view" element={<ViewColor />}></Route> */}
          </Route>
          <Route path="/admin-listing" element={<AdminListing />} />
          <Route path="/user-details" element={<UserDetails />} />
          <Route path='/view-color' element={<ColorView />} />
          <Route path='/add-color' element={<ColorAdd />} />
          <Route path='/add-material' element={<MaterialAdd />} />
          <Route path='/view-material' element={<MaterialView />} />
          <Route path='/add-category' element={<AddCategoryParent />} />
          <Route path='/view-category' element={<ViewCategoryParent />} />
          <Route path='/view-subCategory' element={<ViewCategorySub />} />
          <Route path='/add-subCategory' element={<AddCategorySub />} />
          <Route path='/add-Sub-subCategory' element={<AddCategorySubSub />} />
          <Route path='/view-Sub-subCategory' element={<ViewCategorySubSub />} />
          <Route path='/add-product' element={<AddProduct />} />
          <Route path='/view-product' element={<ViewProduct />} />
          <Route path='/view-country' element={<ViewCountry />} />
          <Route path='/add-country' element={< AddCountry />} />
          <Route path='/contact-enquirys' element={< ContactEnquirys />} />
          <Route path='/newssletters' element={< Newssletters />} />
          <Route path='/add-faqs' element={<AddFaqs />} />
          <Route path='/view-faqs' element={<ViewFaqs />} />



        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
