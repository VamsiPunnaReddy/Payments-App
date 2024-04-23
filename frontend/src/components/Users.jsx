import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRecoilState, useSetRecoilState } from "recoil"
import { userAtom, userDataAtom } from "../store/atom/Atom"


export const Users = () => {

  const setUserData = useSetRecoilState(userDataAtom)
  const [users, setUsers] = useRecoilState(userAtom)

  const [filter, setFilter] = useState('')
  const navigate = useNavigate()

  let timer = null

  const HandleSetFilter = (e) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      setFilter(e.target.value)
    }, 600)
  }



  useEffect(() => {
    axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    })
      .then(res => {
        setUsers(res.data.users)
      })
    console.log(filter)

  }, [filter])

  const HandleDialog = (user) => {
    setUserData(user)
    navigate('/send')
  }

  return (
    <>
      {console.log("re-render")}
      <div className="space-y-3">
        <p className="text-xl font-semibold">Users</p>
        <input type="text" placeholder="Search users..." onChange={(e) => HandleSetFilter(e)} className="border-2 rounded-md px-3 py-2.5 w-full" />
        <div className="space-y-3">
          {users.map((user, index) => {
            return (
              <div key={index} className="flex justify-between ">
                <div className="flex gap-4 items-center">
                  <div className="flex items-center justify-center bg-gray-200 w-8 h-8 rounded-full font-medium"> {user.fullName[0].toUpperCase()} </div>
                  <p className="text-lg font-semibold"> {user.fullName} </p>
                </div>
                <button onClick={() => HandleDialog(user)} className="bg-gray-900 text-white rounded-md h-fit py-2 px-3 hover:bg-white hover:text-black hover:ring-2 hover:ring-black transition-colors"> Send money </button>
              </div>

            )
          })}
        </div>
      </div>

    </>
  )
}