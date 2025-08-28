import Landing from "../Components/landing";
import CompaniesAndCategories from "../Components/CompaniesAndCategories";


const HomePage =()=>{
  return (
    <div className="min-h-[100vh] bg-mine-shaft-950 font-[Poppins, sans-serif]">
        <Landing />
        <CompaniesAndCategories />
    </div>
  )
}

export default HomePage;