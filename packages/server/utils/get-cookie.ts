export const getCookie = (
  cookies: string,
  name: string,
): string | undefined => {
  const cookiesReceived = cookies.split('; ')
  const cookie = cookiesReceived.find(row => row.startsWith(`${name}=`))
  return cookie ? cookie.split('=')[1] : undefined
}
