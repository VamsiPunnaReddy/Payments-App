import { useRecoilState, useRecoilValue } from "recoil"
import { userDataAtom } from "../store/atom/Atom"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


export const SendMoney = () => {
  const [amount, setAmount] = useState(0)
  const [loading, setLoading] = useState(true)
  const userData = useRecoilValue(userDataAtom)
  const navigate = useNavigate()

  const HandleDialog = () => {
    navigate('/')
  }

  const HandleTransfer = async () => {
    setLoading(!loading)
    await new Promise(r => setTimeout(r, 1000))
    const res = await axios.post('http://localhost:3000/api/v1/account/transfer', {
      to: userData._id,
      amount: amount,
    }, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem('token')
      }
    })

    navigate('/')


    console.log(res)
  }

  return (
    <>
      <div className="absolute top-0 w-screen h-[calc(100vh-5rem)] pt-12 bg-slate-200">

        <div className="relative max-w-lg shadow-2xl rounded-2xl mx-auto  h-fit space-y-3 p-12 bg-white">
          <button onClick={HandleDialog} className="absolute right-2 top-2 text-black text-2xl font-semibold rounded-md tracking-wide h-fit py-2 px-3 hover:bg-white hover:ring-2 hover:ring-green-500 hover:text-black transition-colors"> X </button>
          <h1 className="text-3xl font-bold text-center pb-12"> Send Money </h1>
          <div className="flex gap-4 items-center">
            <div className="flex items-center text-2xl justify-center text-white bg-green-500 aspect-[1/1] w-10 rounded-full font-medium"> {userData ? userData.username[0].toUpperCase() : ''} </div>
            <p className="text-xl font-semibold"> {userData.username} </p>
          </div>
          <p className="text-sm font-semibold">Amount (in Rs)</p>
          <input onChange={(e) => setAmount(e.target.value)} type="text" placeholder="Enter Amount" className="border-2 bo rounded-lg px-3 py-2.5 w-full" />
          {loading ? (

            <button onClick={HandleTransfer} className="bg-green-500 text-white font-semibold rounded-md tracking-wide h-fit py-2 px-3 hover:bg-white hover:ring-2 hover:ring-green-500 hover:text-black transition-colors w-full"> Initiate Transfer </button>
          ) : (
            <button type="button" class="bg-green-500 flex justify-center text-white font-semibold rounded-md tracking-wide h-fit py-2 px-3 hover:cursor-not-allowed w-full" disabled>
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </button>
          )
          }
        </div>

      </div>
    </>
  )
}