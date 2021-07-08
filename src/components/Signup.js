import { useState, useEffect } from 'react'
import localForage from 'localforage'

export default function Component(props) {
  const [email, setEmail] = useState(null)
  const [isRegistered, setIsRegistered] = useState(false)
  const isEmailValid = (possibleEmail) => {
    const emailPattern = /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/
    return emailPattern.test(possibleEmail)
  }

  useEffect(() => {
    const getData = async () => {
      const registered = await localForage.getItem('registered')
      setIsRegistered(!!registered)
    }
    getData()
  }, [])

  const submitEmail = async (e) => {
    e.preventDefault()
    if (isEmailValid(email)) {
      await fetch(`https://home.plzdm.me/api/convertkit?email=${encodeURIComponent(email)}`)
      setEmail('')
      localForage.setItem('registered', true)
      setIsRegistered(true)
    } else {
      window.alert('Invalid email format')
    }
  }
  return (
    <div id="signup" className="flex pb-20 sm:pb-16">
      <div className="mx-auto lg:py-8 ">
        <span className="mt-0 inline text-3xl font-extrabold tracking-tight text-black sm:block sm:text-4xl">
          Want to fix your DM woes?
        </span>{' '}
        <span className="mt-0 inline text-3xl font-extrabold tracking-tight text-cyan sm:block sm:text-4xl">
          Get notified when we launch.
        </span>
        {isRegistered && (
          <div className="flex justify-center items-center pt-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-8 w-8 text-green-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="pl-1 text-2xl font-extrabold text-black tracking-tight sm:text-2xl">
              You're on the list! Thanks for signing up.
            </span>
          </div>
        )}
        {!isRegistered && (
          <form className="mt-4 sm:flex">
            <label htmlFor="emailAddress" className="sr-only">
              Email address
            </label>
            <input
              id="emailAddress"
              name="email"
              type="email"
              autoComplete="email"
              required
              className="text-black w-full px-5 py-3 placeholder-gray-500 focus:ring-cyan focus:border-cyan sm:max-w-xs important:border-cyan rounded-md"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
              <button
                type="submit"
                onClick={submitEmail}
                className="umami--click--submit-button w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-cyan hover:bg-hover-3 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan"
              >
                Notify me
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
