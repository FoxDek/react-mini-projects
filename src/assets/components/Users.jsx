import React from 'react'
import { cva } from 'class-variance-authority'

const usersList = cva(
  'usersList flex flex-col gap-4 max-h-[350px] overflow-y-auto pr-2.5 w-full'
)

const usersListItem = cva (
  "usersListItem flex justify-between items-center gap-5 sm:gap-10 w-full"
)

const usersListItemAbout = cva (
  "usersListItemAbout flex flex-col mr-auto"
)

const usersListItemImg = cva (
  "usersListItemImg w-10 sm:w-14 rounded-full aspect-square"
)

const usersListItemName = cva (
  "usersListItemName text-sm sm:text-lg font-semibold"
)

const usersListItemEmail = cva (
  "usersListItemEmail text-[10px] md:text-sm opacity-60 wrap-anywhere"
)

const usersListItemButton = cva (
  'usersListItemButton'
)

const usersListItemButtonIcon = cva (
  'usersListItemButtonIcon w-7 h-7 text-gray-600 hover:text-green-500 transition-all duration-300 ease-in-out',
  {
    variants: {
      active: {
        true: 'transform rotate-45 stroke-2 text-red-500 hover:text-red-700',
        false: ''
      }
    }
  }
)

function Users({items, invitedUsers, setInvitedUsers}) {

  const handleToggleUser = (id) => {

    if (invitedUsers.includes(id)) {
      const newList = invitedUsers.filter(element => element !== id)
      setInvitedUsers(newList)
    } else {
      const newList = [...invitedUsers, id]
      setInvitedUsers(newList)
    }
  }

  return (
    <ul className={usersList()}>

      {items.map(item => (
        <li key={item.id} className={usersListItem()}>
          <img className={usersListItemImg()} src={`https://picsum.photos/seed/${item.id}/200`} alt="" />
          <div className={usersListItemAbout()}>
            <p className={usersListItemName()}>{item.name}</p>
            <span className={usersListItemEmail()}>{item.email}</span>
          </div>
          <button className={usersListItemButton()} onClick={() => handleToggleUser(item.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={usersListItemButtonIcon( { active: invitedUsers.includes(item.id) })}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
        </li>
        ))
      }


      {/* <li className={usersListItem()}>
        <img src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80" alt="" className="w-14 rounded-full aspect-square" />
        <div className={usersListItemAbout()}>
          <p className={usersListItemName()}>John Doe</p>
          <span className={usersListItemEmail()}>@johndoe</span>
        </div>
        <button className={usersListItemButton()}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={usersListItemButtonIcon()}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </li> */}


    </ul>
  )
}

export default Users