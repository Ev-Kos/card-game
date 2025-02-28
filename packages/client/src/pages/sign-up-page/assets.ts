import type { TFormProps } from '../../features/form/form'

export const signUpFormData: Pick<TFormProps, 'formFieldsData'> = {
  formFieldsData: [
    {
      title: 'Имя',
      placeholder: 'введите имя',
      type: 'text',
      name: 'first_name',
      required: true,
    },
    {
      title: 'Фамилия',
      placeholder: 'введите фамилию',
      type: 'text',
      name: 'second_name',
      required: true,
    },
    {
      title: 'Логин',
      placeholder: 'введите логин',
      type: 'text',
      name: 'login',
      required: true,
    },
    {
      title: 'Email',
      placeholder: 'введите email',
      type: 'email',
      name: 'email',
      required: true,
    },
    {
      title: 'Телефон',
      placeholder: 'введите телефон',
      type: 'text',
      name: 'phone',
      required: true,
    },
    {
      title: 'Пароль',
      placeholder: 'введите пароль',
      type: 'password',
      name: 'password',
      required: true,
    },
    {
      title: 'Пароль (еще раз)',
      placeholder: 'повторите пароль',
      type: 'password',
      name: 'password',
      required: true,
    },
  ],
}
