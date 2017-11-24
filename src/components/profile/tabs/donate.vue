<template>
  <div style="text-align: center">
    <iframe :src="src"
            width="450"
            height="213"
            frameborder="0"
            allowtransparency="true"
            scrolling="no">
    </iframe>
  </div>
</template>

<script>

    export default {
      props: ['user'],
      computed:{
        src(){
          return 'https://money.yandex.ru/quickpay/shop-widget?writer=seller&targets='
          + encodeURIComponent('Поддержать пользователя "' + this.user.nickname + '"')
          + '&targets-hint=&default-sum=100&button-text=11&payment-type-choice=on&hint=&successURL=&quickpay=shop&'
          + 'account=' + this.user.extra.donate.ya_money
        }
      }
    }
</script>
