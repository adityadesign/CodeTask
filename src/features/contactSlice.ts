import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface Contact{
  id: string,  
  firstName: string,
  lastName: string,
  status: boolean
}

interface ContactState{
    contacts: Contact[]
}

const initialState: ContactState = {
  contacts: [],
}

export const contactDetail = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    createContact: (state, action: PayloadAction<Contact>) => {
      state.contacts.push(action.payload)
    },
    deleteContact: (state, action: PayloadAction<string>) => {
      state.contacts = state.contacts.filter(item => item.id!==action.payload)
    },
    updateContact: (state, action:  PayloadAction<Contact>) => {
      state.contacts = state.contacts.map(item => item.id === action.payload.id ? action.payload : item)
    }
  },
})

export default contactDetail.reducer    
export const {createContact, deleteContact, updateContact} = contactDetail.actions