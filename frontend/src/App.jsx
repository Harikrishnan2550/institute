// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import LoginSignup from "./Components/Login-Signup";
// import Admin from "./pages/Admin";
// import Partners from "./pages/Partners";

// function App() {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<LoginSignup />} />
//         <Route path="/admin/dashboard" element={<Admin />} />
//         <Route path="/partner/dashboard" element={<Partners />} />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./Components/Common/Layout";

// Pages
import Admin from "./pages/Admin";
import Partners from "./pages/Partners";
import PartnerDashboard from "./Components/PartnerDashboard";
import PartnerAccount from "./Components/PartnerAccount";
import LoginSignup from "./Components/Login-Signup";
import PartnerDetails from "./pages/PartnerDetails";
import AdminClientTrack from "./Components/AdminClientTrack";
import ClientDetails from "./Components/ClientDetails";
import AdminWallet from "./Components/AdminWallet";
import PartnerWallet from "./Components/PartnerWallet";
import AdminCourses from "./Components/AdminCourses";
import PartnerCourses from "./Components/PartnerCourses";

// ✅ Career Form Pages
import ClientPage from "./Components/ClientPage";
import EditClientPage from "./Components/EditClientPage";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PartnerClientsTable from "./Components/PartnerClientsTable";
import FollowUp from "./Components/FollowUp";

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Authentication */}
        <Route path="/" element={<LoginSignup />} />

        {/* ✅ Admin routes */}
        <Route
          path="/admin/dashboard"
          element={
            <Layout>
              <Admin />
            </Layout>
          }
        />
        <Route
          path="/admin/partners"
          element={
            <Layout>
              <Partners />
            </Layout>
          }
        />
        <Route
          path="/admin/partner-details"
          element={
            <Layout>
              <PartnerDetails />
            </Layout>
          }
        />
        <Route
          path="/admin/client-track"
          element={
            <Layout>
              <AdminClientTrack />
            </Layout>
          }
        />
        <Route
          path="/admin/client/:id"
          element={
            <Layout>
              <ClientDetails />
            </Layout>
          }
        />
        <Route
          path="/admin/client-status"
          element={
            <Layout>
              <ClientPage />
            </Layout>
          }
        />
        <Route
          path="/admin/courses"
          element={
            <Layout>
              <AdminCourses />
            </Layout>
          }
        />

        <Route
          path="/partner/courses"
          element={
            <Layout>
              <PartnerCourses />
            </Layout>
          }
        />

        <Route
          path="/admin/edit-client/:id"
          element={
            <Layout>
              <EditClientPage />
            </Layout>
          }
        />
        <Route
          path="/admin/follow-up"
          element={
            <Layout>
              <FollowUp />
            </Layout>
          }
        />

        {/* ✅ Partner routes */}
        <Route
          path="/partner/dashboard"
          element={
            <Layout>
              <PartnerDashboard />
            </Layout>
          }
        />
        <Route
          path="/partner/account"
          element={
            <Layout>
              <PartnerAccount />
            </Layout>
          }
        />
        <Route
          path="/partner/client-status"
          element={
            <Layout>
              <ClientPage />
            </Layout>
          }
        />

        <Route
          path="/partner/client-track"
          element={
            <Layout>
              <PartnerClientsTable />
            </Layout>
          }
        />

        <Route
          path="/admin/wallet"
          element={
            <Layout>
              <AdminWallet />
            </Layout>
          }
        />

        <Route
          path="/partner/wallet"
          element={
            <Layout>
              <PartnerWallet />
            </Layout>
          }
        />

        {/* ✅ Fallback / 404 Page */}
        <Route
          path="*"
          element={
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-700">
              <h1 className="text-5xl font-bold mb-3 text-indigo-600">404</h1>
              <p className="text-lg">
                Oops! The page you are looking for doesn’t exist.
              </p>
              <a
                href="/"
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
              >
                Go Home
              </a>
            </div>
          }
        />
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
      <footer />
    </Router>
  );
}

export default App;
