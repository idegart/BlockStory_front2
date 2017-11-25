const types = [
  {
    value: 'action_blocks',
    label: 'Действия',
    children: [
      {
        value: 'starter',
        label: 'Стартовый блок',
        icon: 'play',
        color: '#FA5555',
        description: 'Самый первый блок от которого начинают действие остальные блоки'
      },
      {
        value: 'next_chapter',
        label: 'Переход на главу',
        icon: 'angle-double-right',
        color: '',
        description: 'Связующий блок между главами'
      }
    ]
  },
  {
    value: 'text_blocks',
    label: 'Текстовые блок',
    children: [
      {
        value: 'text_block_select',
        label: 'С выбором ответа',
        icon: 'comments-o',
        color: '#67C23A',
        description: 'Можно задать до 4х вариантов ответов'
      },
      {
        value: 'text_block_answer',
        label: 'С полем ввода',
        icon: 'comments-o',
        color: '',
        description: 'В данной блоке пользователь будет вводить свои ответы'
      },
    ]
  },
  {
    value: 'params',
    label: 'Параметры',
    children: [
      {
        value: 'param_set',
        label: 'Установить параметр',
        icon: 'comments-o',
        color: '',
        description: 'В этом блоке можно присваивать параметры'
      }
    ]
  },
  {
    value: 'money',
    label: 'Деньги',
    children: [
      {
        value: 'advertising',
        label: 'Реклама',
        icon: 'usd',
        disabled: true,
        color: '',
        description: 'В этом блоке будет размещена реклама, с помощью которой Вы сможете монетизировать свой проект'
      },
      {
        value: 'donate',
        label: 'Донат',
        icon: 'money',
        color: '',
        description: 'В этом блоке будет возможность делать донаты автору'
      },
      {
        value: 'mining',
        label: 'Майнинг',
        icon: '',
        color: '',
        description: 'В данный блок будет помещена капча, которую пользователь должен пройти и таким образом принесет Вам немного сатошей.'
      }
    ]

  },
  {
    value: 'other',
    label: 'Другое',
    children: [
      {
        value: 'random',
        label: 'Рандом',
        icon: 'random',
        color: '#878D99',
        description: 'В этом блоке можно задать рандом следующего блока'
      }
    ]

  }
];

export default types;
