type TError = {
  pattern: RegExp
  message: string
}

export const fieldError: Record<string, TError> = {
  password: {
    pattern: /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d!.@#$%^&*()_+=-]{8,40}$/,
    message:
      'введите пароль от 8 до 40 символов, с хотя бы одной заглавной буквой и цифрой',
  },
  login: {
    pattern: /^(?=.*[a-zA-Z])([a-zA-Z0-9_-]{3,20})$/,
    message:
      'введите логин латиницей, без пробелов, от 3 до 20 символов (допустимы цифры, -, _)',
  },
}
