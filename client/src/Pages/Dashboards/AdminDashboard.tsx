import AdminHeader from "../../Components/Header/AdminHeader";
import CompaniesAndCategories from "../../Components/LandingPage/CompaniesAndCategories";
import HowItWorks from "../../Components/LandingPage/Howitworks";
import Landing from "../../Components/LandingPage/landing";

const AdminDashboard = () => {
  return (
    <div>
      <AdminHeader />
      <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif]">
        <Landing />
        <CompaniesAndCategories />
        <HowItWorks />
      </div>
    </div>
  );
};

export default AdminDashboard;
