import { useNavigate } from "react-router-dom"
import { useAppSelector, useAppDispatch } from '../app/hooks'
import { deleteContact } from '../features/contactSlice'

const Home = () => {
    const navigate = useNavigate()
    const contacts = useAppSelector(state => state.contact.contacts)
    const dispatch = useAppDispatch()
    
    return (
    <div className="flex flex-col items-center w-full p-2 md:max-w-3xl xl:max-w-4xl">
        <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg p-4 text-center mr-2 mb-2"
            onClick={() => navigate('/create')}>
            Create Contact
        </button>
        <div className="flex flex-wrap gap-5 m-5 w-full justify-around">
        {contacts.length>0 ? 
            contacts.map(item => {
                return (
                <div key={item.id} className="sm:w-64 w-full p-4 bg-gray-200 rounded-lg drop-shadow-md hover:bg-gray-100 flex flex-col items-center cursor-pointer" 
                    onClick={()=>navigate(`/read/${item.id}`)}>
                    <p className="font-semibold text-lg">{item.firstName}</p>
                    <p className="font-semibold text-lg mb-5">{item.lastName}</p>
                    <div className="flex justify-center">
                        <button className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                            onClick={(e) => [navigate(`/edit/${item.id}`), e.stopPropagation()]}>
                            Edit
                        </button>
                        <button className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                            onClick={(e) => [navigate('/'), dispatch(deleteContact(item.id)), e.stopPropagation()]}>
                            Delete
                        </button>
                    </div>
                </div>)
            }) 
            : 
            <div className="bg-red-200 w-72 mt-8 flex justify-center px-12 py-5 rounded-lg border-red-400 border-2">
                No Contact Found. 
                Please add contact from Create Contact Button
            </div>
        }
        </div>
    </div>
    )
}

export default Home