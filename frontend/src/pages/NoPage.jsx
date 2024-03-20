import NoPages from '../assets/404Page.jpg';

export const NoPage = () => {
  return (
    <>
      <div className="h-screen flex justify-center items-center">
        <img src={NoPages} alt="" className="h-screen" />
        <button >Go back</button>
      </div>

    </>
  )
}