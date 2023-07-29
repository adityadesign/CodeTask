import { useNavigate } from "react-router-dom"
import { useAppDispatch} from '../app/hooks'
import { createContact } from '../features/contactSlice'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

interface FormData{
    id: string,
    firstName: string,
    lastName: string,
    status: boolean
}

const CreateContact = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [data, setData] = useState<FormData>({
        id: '',
        firstName: '',
        lastName: '',
        status: false
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData(prevData => (
            {...prevData,
            id: uuidv4(),
            [e.target.name]: e.target.value}
        ))
    }   

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        dispatch(createContact(data))
        navigate('/')
    }

    return (
        <form className="flex flex-col h-max w-max items-center border rounded-md p-5 shadow-md m-2 gap-5"
            onSubmit={handleSubmit}>
            <div className="text-xl">Create Contact</div>
            <div>
                <label htmlFor="firstName">First name: </label>
                <input className="border rounded-md p-1" 
                    type="text" 
                    id="firstName"
                    name="firstName"
                    onChange={handleChange}
                    value={data.firstName}
                    required/>
            </div>
            <div>
                <label htmlFor="">Last name: </label>
                <input className="border rounded-md p-1" 
                    type="text" 
                    name="lastName"
                    onChange={handleChange}
                    value={data.lastName}
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
        </form>
    )
}

export default CreateContact