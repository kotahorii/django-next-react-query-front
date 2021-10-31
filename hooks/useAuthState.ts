import Cookie from 'universal-cookie'
import { AuthUser, Token } from '../types/types'
import axios from 'axios'
import { useRouter } from 'next/dist/client/router'
import { atom, useRecoilState } from 'recoil'
import { FormEvent, useState } from 'react'

const cookie = new Cookie()
const authState = atom({
  key: 'authState',
  default: { username: '', password: '' },
})
const isLoginState = atom({
  key: 'isLoginState',
  default: true,
})
export const useAuthState = () => {
  const router = useRouter()
  const [auth, setAuth] = useRecoilState(authState)
  const [isLogin, setIsLogin] = useRecoilState(isLoginState)
  const [isLoading, setIsLoading] = useState(false)
  const login = async () => {
    try {
      setIsLoading(true)
      const res = await axios.post<Token>(
        `${process.env.NEXT_PUBLIC_RESTAPI_URL}jwt/create/`,
        auth,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      if (res.status === 200) {
        const options = { path: '/' }
        cookie.set('access_token', res.data.access, options)
        setIsLoading(false)
        router.push('/main-page')
      }
    } catch (err) {
      alert(err.message)
    }
  }
  const authUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isLogin) {
      login()
    } else {
      try {
        setIsLoading(true)
        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_RESTAPI_URL}register/`,
          auth,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        if (res.status === 201) login()
      } catch (err) {
        alert(err.message)
      }
    }
  }
  return { auth, setAuth, isLogin, setIsLogin, authUser, isLoading }
}
