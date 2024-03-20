import { useState, useEffect } from "react"
import axios from 'axios'
import { useRecoilState, useSetRecoilState } from "recoil"
import { userAtom, userDataAtom } from "../store/atom/Atom"
import { Link, useNavigate } from "react-router-dom"



export const Dashboad = () => {

  const [filter, setFilter] = useState('')
  const setUserData = useSetRecoilState(userDataAtom)
  const [users, setUsers] = useRecoilState(userAtom)
  const [filteredUsers, setFilteredUsers] = useState([])
  const [balance, setBalance] = useState(0)
  const token = localStorage.getItem('token')
  const navigate = useNavigate()

  if (!token) {
    return (
      <>
        <div className="h-[calc(100vh-5rem)] flex flex-col gap-10 justify-center items-center ">
          <h1 className="text-5xl font-bold">You are not Signed in</h1>
          <div className="space-x-12">
            <Link to='/signin' className="text-3xl text-blue-700 hover:underline hover:underline-offset-2 font-semibold"> Signin </Link>
            <Link to='/signup' className="text-3xl text-blue-700 hover:underline hover:underline-offset-3 font-semibold"> Signup </Link>
          </div>

        </div>

      </>
    )
  }

  useEffect(() => {
    console.log('balance useEffect')
    axios.get('http://localhost:3000/api/v1/user/bulk', {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => {
        console.log(res.data.users)
        setUsers(res.data.users)
      })



  }, [])

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/account/balance', {
      headers: {
        Authorization: "Bearer " + token
      }
    })
      .then(res => {
        setBalance(res.data.balance)
      })
  }, [])


  useEffect(() => {
    const filtered = users.filter(user =>
      user.username.includes(filter)
    );
    setFilteredUsers(filtered);
  }, [filter, users])

  const HandleDialog = (user) => {
    setUserData(user)
    navigate('/send')
  }





  return (
    <>
      {console.log(balance)}
      <div className="relative container px-20 space-y-4 py-6">
        <h3 className="text-3xl font-bold"> Your Balance ${balance.toFixed(2)} </h3>
        <p className="text-xl font-semibold">Users</p>
        <input type="text" placeholder="Search users..." onChange={(e) => setFilter(e.target.value)} className="border-2 rounded-md px-3 py-2.5 w-full" />
        <div className="space-y-3">
          {filteredUsers.map((user, index) => {
            return (

              <div key={index} className="flex justify-between ">
                <div className="flex gap-4 items-center">
                  <div className="flex items-center justify-center bg-red-200 w-8 h-8 rounded-full font-medium"> {user.username[0].toUpperCase()} </div>
                  <p className="text-lg font-semibold"> {user.username} </p>
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