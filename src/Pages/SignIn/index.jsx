import { useContext, useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ShoppingCartContext } from '../../Context'
import Layout from '../../Components/Layout'

function SignIn() {
  const context = useContext(ShoppingCartContext)
  const [view, setView] = useState('user-info')
  const form = useRef(null)
  const navigate = useNavigate()

  // States for validation errors
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [isDisabled, setIsDisabled] = useState(true)

  // Effect to check if the form has errors or is empty
  useEffect(() => {
    const hasErrors = Object.values(errors).some(error => error)
    const isFormEmpty = Object.values(formValues).some(value => !value)
    setIsDisabled(hasErrors || isFormEmpty)
  }, [errors, formValues])

  // Account
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)
  // Has an account
  const noAccountInLocalStorage = parsedAccount ? Object.keys(parsedAccount).length === 0 : true
  const noAccountInLocalState = context.account ? Object.keys(context.account).length === 0 : true
  const hasUserAnAccount = !noAccountInLocalStorage || !noAccountInLocalState

  const handleSignIn = () => {
    const stringifiedSignOut = JSON.stringify(false)
    localStorage.setItem('sign-out', stringifiedSignOut)
    context.setSignOut(false)
    // Redirect
    navigate('/:category')
  }

  const createAnAccount = () => {
    const formData = new FormData(form.current)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password')
    }

    // Create account
    const stringifiedAccount = JSON.stringify(data)
    localStorage.setItem('account', stringifiedAccount)
    context.setAccount(data)
    // Sign In
    handleSignIn()
  }

  const maskEmail = (email) => {
    if (!email) return ''
    const [firstPart, lastPart] = email.split('@')
    const maskedFirstPart = firstPart.slice(0, 3)
    const maskedLastPart = lastPart.slice(-4)
    return `${maskedFirstPart}*****${maskedLastPart}`
  }

  const maskPassword = (password) => {
    if (!password) return ''
    return '*****'
  }

  const validateField = (name, value) => {
    let error = ''
    if (!value) {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`
    } else if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      error = 'Please enter a valid email address'
    }
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }))
    return error
  }

  const handleBlur = (e) => {
    const { name, value } = e.target
    validateField(name, value)
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormValues(prevValues => ({ ...prevValues, [name]: value }))
    validateField(name, value)
  }

  const renderLogIn = () => {
    return (
      <div className='flex flex-col w-80 dark:text-gray-300'>
        <h1 className="font-medium text-xl text-center mb-6 w-80 dark:text-gray-300">Log in into your WJK account</h1>
        <p>
          <span className='font-medium text-sm'>Email: </span>
          <span className='font-light'>{maskEmail(parsedAccount?.email)}</span>
        </p>
        <p>
          <span className='font-medium text-sm'>Password: </span>
          <span className='font-light'>{maskPassword(parsedAccount?.password)}</span>
        </p>
        <button
          className='bg-gray-600 disabled:text-red-600 disabled:border-red-600 disabled:border-2 select-none text-white w-full rounded-lg py-1 mt-4 mb-2 font-bold text-lg hover:text-green-600 dark:bg-gray-700 dark:text-gray-300'
          onClick={() => handleSignIn()}
          disabled={!hasUserAnAccount}>
          Sign in
        </button>
        <div className='text-center hover:text-blue-600'>
          <a className='font-light text-xs underline underline-offset-4 select-none' href='/'>Forgot my password</a>
        </div>
        <button
          className='bg-gray-600 hover:text-green-600 disabled:text-red-600 disabled:border-red-600 disabled:border-2 text-white rounded-lg mt-6 py-1 font-bold text-lg dark:border-gray-300 select-none'
          onClick={() => setView('create-user-info')}
          disabled={hasUserAnAccount}>
          Sign up
        </button>
      </div>
    )
  }

  const renderCreateUserInfo = () => {
    return (
      <>
        <h1 className="font-medium text-xl text-center mb-6 w-80 dark:text-gray-300">Create your account</h1>
        <form ref={form} className='flex flex-col gap-4 w-80 mb-6'>
          <div className='flex flex-col gap-1'>
            <label htmlFor="name" className='font-medium text-sm dark:text-gray-300'>Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Your full name"
              className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4 dark:text-gray-300 dark:border-white dark:bg-black dark:placeholder:text-white/60'
              onBlur={handleBlur}
              onChange={handleChange}
              required
              autoComplete="name"
            />
            {errors.name && <span className='text-red-500 text-sm'>{errors.name}</span>}
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="email" className='font-medium text-sm dark:text-gray-300'>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Your email address"
              className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4 dark:text-gray-300 dark:border-white dark:bg-black dark:placeholder:text-white/60'
              onBlur={handleBlur}
              onChange={handleChange}
              required
              autoComplete="email"
            />
            {errors.email && <span className='text-red-500 text-sm'>{errors.email}</span>}
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="password" className='font-medium text-sm dark:text-gray-300'>Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="******"
              className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4 dark:text-gray-300 dark:border-white dark:bg-black dark:placeholder:text-white/60'
              onBlur={handleBlur}
              onChange={handleChange}
              required
              autoComplete="new-password"
            />
            {errors.password && <span className='text-red-500 text-sm'>{errors.password}</span>}
          </div>
          <button
            className='bg-gray-600 py-1 text-white w-full rounded-lg select-none hover:text-green-600 font-bold text-lg dark:bg-gray-700 dark:text-gray-300 mb-6'
            onClick={(e) => {
              e.preventDefault()
              createAnAccount()
            }}
            disabled={isDisabled}>
            Create
          </button>
          {isDisabled && <span className="text-yellow-500 text-sm">⚠️Please fill out all fields correctly.</span>}
        </form>
      </>
    )
  }

  const renderView = () => view === 'create-user-info' ? renderCreateUserInfo() : renderLogIn()

  return (
    <Layout>
      {renderView()}
    </Layout>
  )
}

export default SignIn
