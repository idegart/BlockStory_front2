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
        color: '#FA5555',
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
        value: 'text_block_input',
        label: 'С полем ввода',
        icon: 'keyboard-o',
        color: '#67C23A',
        disabled: true,
        description: 'В данной блоке пользователь будет вводить свои ответы'
      },
    ]
  },
  {
    value: 'params',
    label: 'Параметры',
    children: [
      {
        value: 'set_param',
        label: 'Установить параметр',
        icon: 'download',
        color: '#409EFF',
        disabled: true,
        description: 'В этом блоке можно присваивать параметры'
      }
    ]
  },
  {
    value: 'compare',
    label: 'Сравнения',
    children: [
      {
        value: 'arrows-h',
        label: 'Равно',
        icon: 'usd',
        color: '',
        disabled: true,
        description: 'В этом блоке будет проверка на равенство'
      },
      {
        value: 'more',
        label: 'Больше/меньше',
        icon: 'chevron-right',
        color: '',
        disabled: true,
        description: 'В этом блоке будет проверка на больше/меньше'
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
        disabled: true,
        description: 'В этом блоке будет возможность делать донаты автору'
      },
      {
        value: 'mining',
        label: 'Майнинг',
        icon: '',
        color: '',
        disabled: true,
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
