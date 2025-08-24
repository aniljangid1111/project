import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import Admins from "./components/pages/userManagement/Admins";
import DashboardHome from "./components/pages/DashboardHome";
import User from "./components/pages/userManagement/User";
import Context from "./context/Context";
import Countries from "./components/pages/Location/Countries";
import Slider from "./components/pages/masterCatalogs/Slider";
import EditSlider from "./components/pages/masterCatalogs/EditSlider";
import Testimonails from "./components/pages/masterCatalogs/Testimonails";
import WhyChooseUs from "./components/pages/masterCatalogs/WhyChooseUs";
import Coupons from "./components/pages/masterCatalogs/Coupons";
import ProductCategories from "./components/pages/productCatalogs/Categories";
import Materials from "./components/pages/productCatalogs/Materials";
import Color from "./components/pages/productCatalogs/Color";
import Product from "./components/pages/productCatalogs/Product";
import EditProduct from "./components/pages/productCatalogs/EditProduct";
import ContactEnquiry from "./components/pages/enquiry/ContactEnquiry";
import Newsletters from "./components/pages/enquiry/NewsLetter";
import PaymentGateway from "./components/pages/configuration/PaymentGateway";
import EditPaymentGateways from "./components/pages/configuration/EditPaymentGateways";
import Configuration from "./components/pages/configuration/Configuration";
import EditUser from "./components/pages/EditUsers";
import Faqs from "./components/pages/faqs/Faqs";
import CreateFaqs from "./components/pages/faqs/CreateFaqs";
import EditFaqs from "./components/pages/faqs/EditFaqs";
import CmsPagesListing from "./components/pages/cms/Cms";
import EditCms from "./components/pages/cms/EditCms";
import CreateSlider from "./components/pages/masterCatalogs/CreateSlider";
import AddProduct from "./components/pages/productCatalogs/CreateProduct";
import Profile from "./components/pages/profile/Profile";
import CompanyProfile from "./components/pages/profile/ComapnyProfile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/admins",
        element: <Admins />,
      },
      {
        path: "/dashboard/dashboardhome",
        element: <DashboardHome />,
      },
      {
        path: "/dashboard/user",
        element: <User />,
      },
      {
        path: "/dashboard/countries",
        element: <Countries />,
      },
      {
        path: "/dashboard/slider",
        element: <Slider />,
      },
      {
        path: "/dashboard/testimonials",
        element: <Testimonails />,
      },
      {
        path: "/dashboard/why-choose-us",
        element: <WhyChooseUs />,
      },
      {
        path: "/dashboard/coupons",
        element: <Coupons />,
      },
      {
        path: "/dashboard/categories",
        element: <ProductCategories />,
      },
      {
        path: "/dashboard/add-products",
        element: <AddProduct />,
      },
      {
        path: "/dashboard/materials",
        element: <Materials />,
      },
      {
        path: "/dashboard/edit-slider",
        element: <EditSlider />,
      },
      {
        path: "/dashboard/color",
        element: <Color />,
      },
      {
        path: "/dashboard/product",
        element: <Product />,
      },
      {
        path: "/dashboard/editproduct",
        element: <EditProduct />,
      },
      {
        path: "/dashboard/contact-enquiry",
        element: <ContactEnquiry />,
      },
      {
        path: "/dashboard/news-letter",
        element: <Newsletters />,
      },
      {
        path: "/dashboard/payment-gateway",
        element: <PaymentGateway />,
      },
      {
        path: "/dashboard/edit-payment-gateways",
        element: <EditPaymentGateways />,
      },
      {
        path: "/dashboard/configuration",
        element: <Configuration />,
      },
      {
        path: "/dashboard/edit-user",
        element: <EditUser />,
      },
      {
        path: "/dashboard/faqs",
        element: <Faqs />,
      },
      {
        path: "/dashboard/create-faqs",
        element: <CreateFaqs />,
      },
      {
        path: "/dashboard/edit-faqs",
        element: <EditFaqs />,
      },
      {
        path: "/dashboard/cms",
        element: <CmsPagesListing />,
      },
      {
        path: "/dashboard/edit-cms",
        element: <EditCms />,
      },
      {
        path: "/dashboard/create-slider",
        element: <CreateSlider />,
      },
      {
        path: "/dashboard/profile",
        element:<Profile/>
      },
      {
        path: "/dashboard/company-profile",
        element:<CompanyProfile/>
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Context>
      <RouterProvider router={router} />
    </Context>
  </StrictMode>
);
