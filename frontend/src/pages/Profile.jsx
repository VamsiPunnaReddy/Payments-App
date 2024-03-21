import axios from "axios"
import { useEffect, useState } from "react"


export const Profile = () => {
  const [user, setUser] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3000/api/v1/user/profile', {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    })
      .then(res => {
        setUser(res.data.user)
      })
  }, [])
  return (
    <>
      <div className="space-y-8 pt-8 px-20">

        <ProfileData userType={"Full Name:"} userData={user.fullName} />
        <ProfileData userType={"Username:"} userData={user.fullName} />
        <ProfileData userType={"Email:"} userData={user.fullName} />
        <ProfileData userType={"Password:"} userData={"********"} />
        <button className="bg-green-500 text-white font-semibold rounded-md tracking-wide h-fit py-2 px-3 hover:bg-white hover:ring-2 hover:ring-green-500 hover:text-black transition-colors "> Edit Details </button>

      </div>

    </>
  )


}

const ProfileData = ({ userType, userData }) => {
  return (
    <>
      <div className="flex gap-2">
        <b className="text-2xl"> {userType} </b>
        <p className="text-xl self-center text-gray-500"> {userData} </p>
      </div>
    </>
  )
}