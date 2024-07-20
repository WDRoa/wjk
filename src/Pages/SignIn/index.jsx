import { Link } from 'react-router-dom'
import Layout from '../../Components/Layout'

function SignIn() {
  return (
    <Layout>
      <h1 className="font-medium text-xl text-center mb-6 w-80 dark:text-gray-300">Welcome</h1>
      <div className='flex flex-col w-80 dark:text-gray-300'>
        <p>
          <span className='font-light text-sm'>Email: </span>
          <span>WDRoa@email.com</span>
        </p>
        <p>
          <span className='font-light text-sm'>Password: </span>
          <span>******</span>
        </p>
        <Link
          to="/">
          <button
            className='bg-gray-600 disabled:bg-black/40 text-white  w-full rounded-lg py-1 mt-4 mb-2 font-bold text-lg hover:text-green-600 dark:bg-gray-700 dark:text-gray-300'>
            Sign in
          </button>
        </Link>
        <div className='text-center hover:text-blue-600'>
          <a className='font-light text-xs underline underline-offset-4' href='/'>Forgot my password</a>
        </div>
        <button
          className='border border-black disabled:text-black/40 disabled:border-black/40
          rounded-lg mt-6 py-1 font-bold text-lg dark:border-gray-300'>
          Sign up
        </button>
      </div>
    </Layout>
  )
}

export default SignIn