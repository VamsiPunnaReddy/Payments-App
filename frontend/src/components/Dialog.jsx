import { useRecoilState, useRecoilValue } from "recoil"
import { renderAtom, userDataAtom } from "../store/atom/Atom"


export const Dialog = () => {
  const [render, setRender] = useRecoilState(renderAtom)
  const userData = useRecoilValue(userDataAtom)

  const HandleDialog = () => {
    setRender(false)
  }

  return (
    <>
      <dialog open={render} className="absolute top-0 w-screen h-[calc(100vh-5rem)] pt-12 bg-slate-200">

        <div className="relative max-w-lg shadow-2xl rounded-2xl mx-auto h-fit space-y-3 p-12 bg-white">
          <button onClick={HandleDialog} className="absolute right-2 top-2 text-black text-2xl font-semibold rounded-md tracking-wide h-fit py-2 px-3 hover:bg-white hover:ring-2 hover:ring-green-500 hover:text-black transition-colors"> X </button>
          <h1 className="text-3xl font-bold text-center pb-12"> Send Money </h1>
          <div className="flex gap-4 items-center">
            <div className="flex items-center text-2xl justify-center text-white bg-green-500 aspect-[1/1] w-10 rounded-full font-medium"> {userData ? userData.username[0].toUpperCase() : ''} </div>
            <p className="text-xl font-semibold"> {userData.username} </p>
          </div>
          <p className="text-sm font-semibold">Amount (in Rs)</p>
          <input type="text" placeholder="Enter Amount" className="border-2 bo rounded-lg px-3 py-2.5 w-full" />
          <button className="bg-green-500 text-white font-semibold rounded-md tracking-wide h-fit py-2 px-3 hover:bg-white hover:ring-2 hover:ring-green-500 hover:text-black transition-colors w-full"> Initiate Transfer </button>
        </div>

      </dialog>
    </>
  )
}