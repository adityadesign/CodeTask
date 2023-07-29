import Sidebar from "./Sidebar"

const Navbar = () => {
  return (
    <>
    <div className="flex justify-center p-5 font-bold text-2xl text-white bg-blue-500">
        Contact Page
    </div>
    <div className="sm:hidden">
      <Sidebar/>
    </div>
    </>
  )
}

export default Navbar