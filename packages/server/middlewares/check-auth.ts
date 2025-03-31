import { Request, Response, NextFunction } from 'express'
import axios from 'axios'
import { serverError, unauthorizedError } from '../utils/errors'
import { TUserData } from '../utils/types'

declare module 'express' {
  interface Request {
    user?: TUserData
  }
}

function getCookie(cookies: string, name: string): string | undefined {
  const cookiesReceived = cookies.split('; ')
  const cookie = cookiesReceived.find(row => row.startsWith(`${name}=`))
  return cookie ? cookie.split('=')[1] : undefined
}

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const cookies = req.headers.cookie
    const uuid = getCookie(String(cookies), 'uuid')
    const authCookie = getCookie(String(cookies), 'authCookie')

    if (!uuid || !authCookie) {
      unauthorizedError(res, 'Not authenticated')
      return
    }

    const response = await axios.get(
      'https://ya-praktikum.tech/api/v2/auth/user',
      {
        headers: {
          Cookie: `uuid=${uuid}; authCookie=${authCookie}`,
        },
        validateStatus: (status: number) => status < 500,
      },
    )

    if (response.status !== 200) {
      unauthorizedError(res, 'Not authenticated')
      return
    }

    req.user = response.data

    next()
  } catch (error) {
    console.error('Auth error:', error)
    serverError(res)
  }
}
