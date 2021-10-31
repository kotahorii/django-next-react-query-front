import { useAuthState } from '../hooks/useAuthState'

export const Auth = () => {
  const { isLogin, setIsLogin, auth, setAuth, authUser, isLoading } =
    useAuthState()

  return (
    <div className="max-w-xs w-full">
      <form
        onSubmit={authUser}
        className="bg-gray-700 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label className="block text-white text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            value={auth.username}
            onChange={(e) => setAuth({ ...auth, username: e.target.value })}
          />
        </div>
        <div className="mb-6">
          <label className="block text-white text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight"
            value={auth.password}
            onChange={(e) => setAuth({ ...auth, password: e.target.value })}
          />
        </div>
        <div className="flex space-x-3 justify-start items-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:shadow-outline"
          >
            {isLogin ? 'Sign In' : 'Sign up'}
          </button>
          <span
            onClick={() => setIsLogin(!isLogin)}
            className="cursor-pointer inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-600"
          >
            {isLogin ? 'Create new account' : 'Back to Login'}
          </span>
        </div>
      </form>
    </div>
  )
}
