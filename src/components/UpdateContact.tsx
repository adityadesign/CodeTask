import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector} from '../app/hooks'
import { updateContact } from '../features/contactSlice'
import { useEffect, useState } from 'react'

interface FormData{
    id: string,
    firstName: string,
    lastName: string,
    status: boolean
}

const UpdateContact = () => {
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const {contacts} = useAppSelector(state => state.contact)
    const navigate = useNavigate()
    
    const [updateData, setUpdateData] = useState<FormData>({
        id: '',
        firstName: '',
        lastName: '',
        status: false
    })

    useEffect(() => {
        if(id){
            const edit = contacts.filter(item => item.id === id)
            setUpdateData(edit[0])
        }
    },[])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdateData(prevData => (
            {...prevData,
            [e.target.name]: e.target.value}
        ))
    }   

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(updateContact(updateData))
        navigate('/')
    }

    return (
        <>
        {updateData && <form className="flex flex-col h-max w-max items-center border rounded-md p-5 shadow-md m-2 gap-5"
            onSubmit={handleSubmit}>
            <div className="text-lg">Edit Contact</div>
            <div>
                <label htmlFor="firstName">First name: </label>
                <input className="border rounded-md p-1" 
                    type="text" 
                    id="firstName"
                    name="firstName"
                    onChange={handleChange}
                    value={updateData.firstName}
                    required/>
            </div>
            <div>
                <label htmlFor="">Last name: </label>
                <input className="border rounded-md p-1" 
                    type="text" 
                    name="lastName"
                    onChange={handleChange}
                    value={updateData.lastName}
                    required/>
            </div>
            <div className="flex gap-4">
                <p>Status:</p>
                <div>
                    <input type="radio" 
                        name="status"
                        value='Active'
                        onChange={handleChange}
                        required/>
                    <label htmlFor="active"> Active</label>
                </div>
                <div>
                    <input type="radio" 
                        name="status"
                        value='Inactive'
                        onChange={handleChange}
                        required/>
                    <label htmlFor="inactive"> Inactive</label>
                </div>
            </div>
            <button className="bg-blue-500 text-white rounded-md p-2 font-semibold hover:bg-blue-600 active:bg-blue-700">
                Save Contact
            </button>
        </form>}
        </>
    )
}

export default UpdateContact