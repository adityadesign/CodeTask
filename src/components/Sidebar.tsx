import { Link } from "react-router-dom"

const Sidebar = () => {
  return (
    <div className='float-left h-full flex flex-col text-xl bg-blue-200 font-semibold'>
        <Link to='/' className="py-4 px-2 hover:bg-blue-400 hover:rounded-xl hover:text-white">
            Contacts
        </Link>
        <Link to='/charts/cases' className="py-4 px-2 hover:bg-blue-400 hover:rounded-xl hover:text-white">
            Charts and Maps
        </Link>
    </div>
  )
}

export default Sidebar