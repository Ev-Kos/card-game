export const userForm = {
  formFieldsData: [
    {
      title: 'Имя',
      name: 'first_name',
      type: 'text',
      required: true,
    },
    {
      title: 'Фамилия',
      name: 'second_name',
      type: 'text',
      required: true,
    },
    {
      title: 'Имя в игре',
      name: 'display_name',
      type: 'text',
    },
    {
      title: 'Логин',
      name: 'login',
      type: 'text',
      required: true,
    },
    {
      title: 'Email',
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      title: 'Телефон',
      name: 'phone',
      type: 'tel',
      required: true,
    },
  ],
  inputTitlePosition: 'internal' as const,
}

export const passwordForm = {
  formFieldsData: [
    {
      title: 'Старый пароль',
      name: 'oldPassword',
      type: 'password',
      required: true,
    },
    {
      title: 'Новый пароль',
      name: 'newPassword',
      type: 'password',
      required: true,
    },
  ],
  inputTitlePosition: 'internal' as const,
}
