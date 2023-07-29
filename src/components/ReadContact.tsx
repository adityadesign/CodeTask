import { useNavigate, useParams } from "react-router-dom"
import { useAppSelector } from "../app/hooks"
import { useEffect, useState } from "react"

interface ReadData{
    id: string,
    firstName: string,
    lastName: string,
    status: string
}

const ReadContact = () => {
    const {id} = useParams()
    const {contacts} = useAppSelector(state => state.contact)
    const [readContact, setReadContact] = useState<ReadData>()
    const navigate = useNavigate()

    useEffect(()=>{
        if(id){
            const read = contacts.filter(item => item.id === id)
            setReadContact(read[0])
        }
    },[])

    return (
        <div className="w-full md:w-80 mx-5">
            {readContact ? 
            <div className="p-4 bg-gray-200 rounded-lg drop-shadow-md flex flex-col items-center">
                <p className="font-semibold text-lg">{readContact.firstName}</p>
                <p className="font-semibold text-lg mb-4">{readContact.lastName}</p>
                <p className="font-semibold text-lg">{readContact.status}</p>
            </div> :
            <div>Loading...</div>}
            <button className="text-white mt-4 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                onClick={()=>navigate('/')}>
                Back
            </button>
        </div>
    )
}

export default ReadContact