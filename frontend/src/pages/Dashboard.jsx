import { Link } from "react-router-dom"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"



export const Dashboad = () => {

  const token = localStorage.getItem('token')

  return (
    <>
      {!token ? <>
        <div className="h-[calc(100vh-5rem)] flex flex-col gap-10 justify-center items-center ">
          <h1 className="text-5xl font-bold">You are not Signed in</h1>
          <div className="space-x-12">
            <Link to='/signin' className="text-3xl text-blue-700 hover:underline hover:underline-offset-2 font-semibold"> Signin </Link>
            <Link to='/signup' className="text-3xl text-blue-700 hover:underline hover:underline-offset-3 font-semibold"> Signup </Link>
          </div>

        </div>

      </> :

        <div className="relative container px-20 space-y-6 py-6">
          <Balance />
          <Users />
        </div>}

    </>
  )



}