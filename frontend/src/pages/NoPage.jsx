import { useNavigate } from 'react-router-dom';
import NoPages from '../assets/404Page.jpg';

export const NoPage = () => {
  const navigate = useNavigate()

  const HandleGoBack = () => {
    navigate('/')
  }

  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <img src={NoPages} alt="" className="h-screen" />
        <button onClick={HandleGoBack} className='absolute right-8 top-8 bg-green-500 text-white font-semibold rounded-md tracking-wide h-fit py-2 px-3 hover:bg-white hover:ring-2 hover:ring-green-500 hover:text-black transition-colors'>Go To Home</button>
      </div>

    </>
  )
}