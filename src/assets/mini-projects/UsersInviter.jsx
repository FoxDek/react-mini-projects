import React, { useEffect, useState } from "react";
import { cva } from "class-variance-authority";
import { baseButton } from "../styles/button";
import Users from "../components/Users";
import Loader from "../components/Loader";

const usersContent = cva(
  'usersContent shadow-xl rounded-2xl bg-white p-4 sm:p-6 min-w-[260px] w-full max-w-sm sm:max-w-md motion-opacity-in-0 motion-delay-500'
)

const usersMain = cva (
  'usersMain w-full h-full flex flex-col gap-8 min-h-96'
)

const usersSearch = cva(
  'usersSearch flex items-center justify-center gap-4 p-2 border-1 border-gray-100 rounded-2xl w-full focus-within:border-orange-300 focus-within:shadow-md focus-within:scale-101 transition-all duration-300 ease-in-out'
)

const usersSearchInput = cva(
  'usersSearchInput outline-none w-full text-sm'
)

const userSearchIcon = cva(
  'userSearchIcon w-6 h-6 text-gray-400'
)

const usersCompleted = cva (
  "usersCompleted flex flex-col gap-10 items-center justify-center py-10 motion-opacity-in-0 motion-blur-in-md motion-duration-1000"
)

const usersCompletedImg = cva (
  "usersCompletedImg w-20 h-20"
)

const usersCompletedTitle = cva (
  "usersCompletedTitle text-3xl font-bold"
)

const usersCompletedDescription = cva (
  "usersCompletedDescription text-lg text-center"
)







function UsersInviter() {
  const [usersInviterStatement, setUsersInviterStatement] = useState(1)
  const [users, setUsers] = useState([])
  const [invitedUsers, setInvitedUsers] = useState([])
  const [inputSearchValue, setInputSearchValue] = useState('')
  const [filteredUsers, setFilteredUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(json => {
        setUsers(json)
      })
      .catch(error => {
        console.error(error);
        alert('Failed to fetch users')
      }).finally(() => setIsLoading(false));
  }, [])

  const handleInviteClick = () => {
    if (invitedUsers.length === 0) {
      alert('Please select at least one user')
      return
    }
    setUsersInviterStatement(2)
  }

  const handleRestartClick = () => {
    setInvitedUsers([])
    setUsersInviterStatement(1)
  }

  useEffect(() => {
    let fliteredList = users.filter((user) =>
      user.name.toLowerCase().includes(inputSearchValue.toLowerCase()) || user.email.toLowerCase().includes(inputSearchValue.toLowerCase())
    )
    setFilteredUsers(fliteredList) 
  }, [inputSearchValue, users])

  return (
    <>
      <div className={usersContent()}>

        { usersInviterStatement === 1 && (<div className={usersMain()}>
          <div className={usersSearch()} hidden={isLoading}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={userSearchIcon()}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
            <input  className={usersSearchInput()} name="search" type='text' value={inputSearchValue} onChange={(e) => setInputSearchValue(e.target.value)} maxLength={30} placeholder='Search' />
          </div>

          {  isLoading ? <Loader spinnerColor='border-orange-400' /> : <Users items={inputSearchValue ? filteredUsers : users} invitedUsers={invitedUsers} setInvitedUsers={setInvitedUsers} />}

          <button onClick={handleInviteClick} hidden={isLoading} className={baseButton({className: 'bg-orange-400 hover:bg-orange-500 active:bg-orange-600 text-white mt-auto border-none'})}>Invite</button>
        </div>)}

        { usersInviterStatement === 2 && (<div className={usersCompleted()}>
          <img className={usersCompletedImg()} src="../public/images/check.png" alt="Success image" />
          <p className={usersCompletedTitle()}>Success!</p>
          <p className={usersCompletedDescription()}>
            {`You have invited `}
            <strong>{invitedUsers.length}</strong>
            {` users`}
          </p>
          <button onClick={handleRestartClick} className={baseButton({className: 'bg-orange-400 hover:bg-orange-500 active:bg-orange-600 text-white mt-auto border-none'})}>Go back</button>
        </div>)}

      </div>
    </>
  );
}

export default UsersInviter;
