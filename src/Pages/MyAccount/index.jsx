import { useContext, useState, useRef } from 'react'
import { ShoppingCartContext } from '../../Context'
import Layout from '../../Components/Layout'

function MyAccount() {
  const context = useContext(ShoppingCartContext)
  const [view, setView] = useState('user-info')
  const [errors, setErrors] = useState({})
  const account = localStorage.getItem('account')
  const parsedAccount = JSON.parse(account)
  const form = useRef(null)

  const validateField = (name, value) => {
    let error = '';
    if (!value) {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    } else if (name === 'email' && !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/.test(value)) {
      error = 'Please enter a valid email address';
    }
    setErrors(prevErrors => ({ ...prevErrors, [name]: error }));
    return error;
  };
  

  const handleBlur = (e) => {
    const { name, value } = e.target
    validateField(name, value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData(form.current)
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password')
    }
    const newErrors = Object.keys(data).reduce((acc, key) => {
      const error = validateField(key, data[key])
      if (error) acc[key] = error
      return acc
    }, {})
    if (Object.keys(newErrors).length === 0) {
      // Update account
      const stringifiedAccount = JSON.stringify(data)
      localStorage.setItem('account', stringifiedAccount)
      context.setAccount(data)
      setView('user-info')
    } else {
      setErrors(newErrors)
    }
  }

  const renderUserInfo = () => {
    return (
      <div className='flex flex-col w-80 dark:text-gray-300'>
        <h1 className="font-medium text-xl text-center mb-6 w-80">My account</h1>
        <p>
          <span className='font-medium text-sm'>Name: </span>
          <span className='font-light'>{parsedAccount?.name}</span>
        </p>
        <p>
          <span className='font-medium text-sm'>Email: </span>
          <span className='font-light'>{parsedAccount?.email}</span>
        </p>
        <button 
          className='bg-gray-600 py-1 text-white w-full rounded-lg select-none hover:text-green-600 font-bold text-lg dark:bg-gray-700 dark:text-gray-300 mb-6 mt-6'
          onClick={() => setView('edit-user-info')}>
          Edit
        </button>
      </div>
    )
  }

  const renderEditUserInfo = () => {
    return (
      <>
        <h1 className="font-medium text-xl text-center mb-6 w-80 dark:text-gray-300">Edit my account</h1>
        <form ref={form} className='flex flex-col gap-4 w-80 mb-6 dark:text-gray-300' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-1'>
            <label htmlFor="name" className='font-medium text-sm'>Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={parsedAccount.name}
              placeholder={parsedAccount.name}
              className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4 dark:text-gray-300 dark:border-white dark:bg-black dark:placeholder:text-white/60'
              onBlur={handleBlur}
              required
              autoComplete="name"
            />
            {errors.name && <span className='text-red-500 text-sm'>{errors.name}</span>}
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="email" className='font-medium text-sm'>Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              defaultValue={parsedAccount.email}
              placeholder={parsedAccount.email}
              title="Please enter a valid email address"
              className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4 dark:text-gray-300 dark:border-white dark:bg-black dark:placeholder:text-white/60'
              onBlur={handleBlur}
              required
              autoComplete="email"
            />
            {errors.email && <span className='text-red-500 text-sm'>{errors.email}</span>}
          </div>
          <div className='flex flex-col gap-1'>
            <label htmlFor="password" className='font-medium text-sm'>Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              defaultValue={parsedAccount.password}
              placeholder="********"
              className='rounded-lg border border-black placeholder:font-light placeholder:text-sm placeholder:text-black/60 focus:outline-none py-2 px-4 dark:text-gray-300 dark:border-white dark:bg-black dark:placeholder:text-white/60'
              onBlur={handleBlur}
              required
              autoComplete="new-password"
            />
            {errors.password && <span className='text-red-500 text-sm'>{errors.password}</span>}
          </div>
          <button
            className='bg-gray-600 py-1 text-white w-full rounded-lg select-none hover:text-green-600 font-bold text-lg dark:bg-gray-700 dark:text-gray-300 mb-6'
            type="submit">
            Save
          </button>
        </form>
      </>
    )
  }

  const renderView = () => view === 'edit-user-info' ? renderEditUserInfo() : renderUserInfo()

  return (
    <Layout>      
      {renderView()}
    </Layout>
  )
}

export default MyAccount
