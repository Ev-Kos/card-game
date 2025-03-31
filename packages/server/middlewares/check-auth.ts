import { Request, Response, NextFunction } from 'express'
import axios from 'axios'
import { serverError, unauthorizedError } from '../utils/errors'
import { TUserData } from '../utils/types'
import { getCookie } from '../utils/get-cookie'

declare module 'express' {
  interface Request {
    user?: TUserData
  }
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
