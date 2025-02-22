import type { TFormProps } from '../../features/form/form'

export const signUpFormData: Pick<
  TFormProps,
  'formFieldsData' | 'buttonLabel'
> = {
  formFieldsData: [
    {
      title: 'Имя',
      placeholder: 'введите имя',
      type: 'text',
      name: 'first_name',
    },
    {
      title: 'Фамилия',
      placeholder: 'введите фамилию',
      type: 'text',
      name: 'second_name',
    },
    {
      title: 'Логин',
      placeholder: 'введите логин',
      type: 'text',
      name: 'login',
    },
    {
      title: 'Email',
      placeholder: 'введите email',
      type: 'email',
      name: 'email',
    },
    {
      title: 'Телефон',
      placeholder: 'введите телефон',
      type: 'text',
      name: 'phone',
    },
    {
      title: 'Пароль',
      placeholder: 'введите пароль',
      type: 'password',
      name: 'password',
    },
    {
      title: 'Пароль (еще раз)',
      placeholder: 'повторите пароль',
      type: 'password',
      name: 'password',
    },
  ],
  buttonLabel: 'Зарегистрироваться',
}
