import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'

export const Signup = () => {
  const navigate = useNavigate()


  async function HandleSignInForm(e) {
    e.preventDefault();
    const data = new FormData(e.target);

    const fullName = data.get('fullName');
    const username = data.get('username');
    const email = data.get('email');
    const password = data.get('password');

    data.set('fullName', fullName);
    data.set('username', username);
    data.set('email', email);
    data.set('password', password);

    const res = await axios.post('http://localhost:3000/api/v1/user/signup', {

      fullName,
      username,
      email,
      password,

    })
    console.log(res.status)
    if (res.status >= 200 && res.status < 300) {
      alert('Signed up successfully');
      localStorage.setItem('token', res.data.token);
      navigate('/')
    } else {
      alert('Invalid Inputs');
    }

  }


  return (
    <>
      <div className="flex min-h-dvh flex-col justify-center items-center px-6 py-12">
        <div className="mx-auto w-full max-w-sm">
          <div className="mx-auto w-full max-w-sm">
            <h2 className=" text-start text-2xl sm:text-3xl font-bold tracking-normal text-gray-900">Create your account</h2>
          </div>

          <div className="mt-10 mx-auto w-full max-w-sm">
            <form className="space-y-6" onSubmit={HandleSignInForm}>
              <div>
                <label htmlFor="fullName" className="block tracking-wide text-sm font-medium leading-none text-gray-900">Full Name</label>
                <div className="mt-2">
                  <input id="fullName" name="fullName" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-700 " />
                </div>
              </div>

              <div>
                <label htmlFor="username" className="block tracking-wide text-sm font-medium leading-none text-gray-900">Username</label>
                <div className="mt-2">
                  <input id="username" name="username" type="text" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-700 " />
                </div>
              </div>
              <div>

                <label htmlFor="email" className="block tracking-wide text-sm font-medium leading-none text-gray-900">Email</label>
                <div className="mt-2">
                  <input id="email" name="email" type="email" autoComplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-700 " />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block tracking-wide text-sm font-medium leading-none text-gray-900">Password</label>
                </div>
                <div className="mt-2">
                  <input id="password" name="password" type="password" autoComplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-blue-700 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div>
                <button type="submit" className="flex w-full justify-center rounded-md bg-blue-700 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-blue-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700">Sign up</button>
              </div>
            </form>

            <p className="mt-4 text-center text-md text-gray-500">
              Aleady a member?
              <Link to='/signin' className="ml-2 font-semibold tracking-wide text-blue-700 hover:text-blue-600">Sign in</Link>
            </p>
          </div>
        </div>

      </div>
    </>
  )
}