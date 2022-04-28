import { gql, useMutation, useQuery } from '@apollo/client'
import { FormEvent, useState } from 'react';
import { FiUserPlus,  FiEdit2, FiTrash, FiUserCheck } from 'react-icons/fi'

// Users List
const GET_USERS = gql`
  query {
    users {
       id 
       name
    }
  }
`;

//Create Users
const CREATE_USERS = gql`
  mutation ($name: String!) {
    createUsers( name: $name) {
      id 
      name
    }
  }
`;

//Update Users
const  UPDATE_USERS = gql`
  mutation ($name: String!, $id: String!) {
    updateUser(id: $id, name: $name) {
      id
      name
    }
  }
`;

//Delete Users
const DELETE_USERS = gql`
  mutation ($id: String!) {
    deleteUsers( id: $id) {
      id
      name
    }
  }
`;


type User = {
  id: string,
  name: string  
}




export function UserCards() {
  const [ name, setName ] = useState('')
  const [newName, setNewName ] = useState('')
  const [isActive, setIsActive ] = useState(false)
  
  //GET_USERS
  const { data } = useQuery<{ users: User[]}>(GET_USERS)

  //CREATE_USERS
  const [createUsers, { data: users }] = useMutation(CREATE_USERS)

  //UPDATE_USER
  const [updateUser, { data: usersUpdated }] = useMutation(UPDATE_USERS)

  //DELETE_USERS
  const [deleteUsers, { data: usersDeleted }] = useMutation(DELETE_USERS)
  
  async function handleCreateUser( event: FormEvent){
    event.preventDefault()

    if(!name) {
      return
    }

    await createUsers({
      variables: {
        name
      },
      refetchQueries: [GET_USERS],
    })

    return users
  }

  async function isUpdatingUser() {
    setIsActive(true)
  }

  async function hadleUpdateUser( id: string, name: string,) {
    

    if(!name) {
      return
    }

    await updateUser({
      variables : {
        id,
        name
      },
      refetchQueries: [GET_USERS]
    })
    setIsActive(false)
    return usersUpdated
  }


  async function handleDeleteUser(id: string){

    await deleteUsers({
      variables: {
        id
      },
      refetchQueries: [GET_USERS]
    })

    return usersDeleted
  }


  return (
    <div id="create" className="relative grid grid-cols-1 md:grid-cols-3  m-auto justify-center justify-items-center items-center p-10 bg-[#181515]" >
      <div className="text-white">
        <div className="flex flex-col w-96 h-96 border-2 border-solid border-neutral-500 p-8  rounded-2xl">
        <h1 className="font-semibold text-2xl mb-8 text-slate-400">New User</h1>
        <form className="flex flex-col  mb-4" onSubmit={handleCreateUser}>
          <label className="mb-4 font-semibold" htmlFor="name">Name</label>
          <input 
          className="mb-4 text-white bg-transparent rounded p-4 border-violet-500" 
          type="text" 
          placeholder="Name complete"
          value={name}
          onChange ={ e => setName(e.target.value)} 
          
          />
          <button className="bg-green-500 rounded text-center font-semibold p-4 " type="submit">Create</button>
        </form>
          <FiUserPlus 
          className="stroke-violet-500 mt-7"
            size={50}
            style={{
              textAlign: 'center',
              width: '100%',
            }}
          />
        </div>
      </div>

      <div className="flex flex-col w-96 h-96 border-2 border-solid border-neutral-500 p-8 rounded-2xl scrollbar-hide overflow-auto snap-always">
          <h1 className="font-semibold text-2xl mb-8 text-slate-400">Users</h1>
          {data?.users.map( user  => (
            <>
            <div className="flex w-full justify-between p-2 bg-violet-500 rounded mb-4">
            <div className="flex bg-violet-500 items-center" >
              <FiUserCheck className="text-lg text-white font-semibold mr-2"/>
              <p className="text-lg text-white">{user.name}</p>
            </div>
              
            <div className="flex items-center" >
              <FiEdit2 className="text-lg text-white hover:text-green-500 font-semibold mr-4 cursor-pointer" onClick={isUpdatingUser}/>
              <FiTrash className="text-lg text-white hover:text-red-400 font-semibold cursor-pointer" onClick={() => handleDeleteUser(user.id)}/>
            </div>
          </div>
          <form onSubmit={() => hadleUpdateUser(user.id, newName)} >
            <input 
            type={isActive ? "text" : "hidden"} 
            className={isActive ? 'mb-4 text-white bg-transparent rounded p-2 border border-violet-500 border-l-4 w-9/12' : '' } 
            placeholder="New name"
            value={newName}
            onChange ={ e => setNewName(e.target.value)} 
            />
            <button className={ isActive ? 'bg-green-500 rounded text-center font-semibold p-2 ml-1': 'hidden'} type="submit">Change</button>
          </form>

          </>  
            ))}
        </div>
          
        <div className="flex flex-col w-96 h-96 bg-violet-500 p-8 rounded-2xl">
          <h1 className="font-semibold text-4xl w-fit mb-8 text-white">
            Maintenance your users with us, to know more contact us,
            we love to hear more about you 😁
          </h1>
          
         
        </div>
    </div>
  )
}