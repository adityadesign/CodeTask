import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className='h-full flex justify-around sm:justify-start sm:flex-col sm:text-xl bg-blue-200 font-semibold'>
        <Link to='/' className="sm:py-4 sm:px-2 py-2 px-2 hover:bg-blue-400 hover:rounded-xl hover:text-white">
            Contacts
        </Link>
        <Link to='/charts/cases' className="sm:py-4 sm:px-2 py-2 px-2 hover:bg-blue-400 hover:rounded-xl hover:text-white">
            Charts and Maps
        </Link>
    </div>
  )
}

export default Sidebar