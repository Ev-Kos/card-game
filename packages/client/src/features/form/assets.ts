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
  phone: {
    pattern: /^[+ ]?\d{10,15}$/,
    message:
      'введите номер телефона от 10 до 15 цифр, может начинаться с плюса',
  },
  email: {
    pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    message: 'введите email латиницей (допустимы цифры, -, _, +)',
  },
  first_name: {
    pattern: /^[А-ЯA-Z][а-яa-z-]*$/,
    message: 'введите имя с заглавной буквы, без пробелов (допустим -)',
  },
  second_name: {
    pattern: /^[А-ЯA-Z][а-яa-z-]*$/,
    message: 'введите фамилию с заглавной буквы, без пробелов (допустим -)',
  },
}
