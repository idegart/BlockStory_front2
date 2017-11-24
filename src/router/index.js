import Vue from 'vue'
import Router from 'vue-router'

import Main from '@/components/Main'
import Profile from '@/components/Profile'

import Sandbox from '@/components/Sandbox'
import Games from '@/components/Games'
import Game from '@/components/Game'

import Enter from '@/components/Enter'
import Exit from '@/components/Exit'

import Agreement from '@/components/Agreement'
import Error from '@/components/Error'

import Editor from '@/components/Editor'

Vue.use(Router);

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/games',
      name: 'Games',
      component: Games
    },
    {
      path: '/game/:alias',
      name: 'Game',
      component: Game
    },
    {
      path: '/sandbox',
      name: 'Sandbox',
      component: Sandbox
    },
    {
      path: '/profile/:nickname',
      name: 'Profile',
      component: Profile
    },
    {
      path: '/enter',
      name: 'Enter',
      component: Enter
    },
    {
      path: '/exit',
      name: 'Exit',
      component: Exit
    },
    {
      path: '/agreement',
      name: 'Agreement',
      component: Agreement
    },
    {
      path: '/editor/:game/:chapter',
      name: 'Editor',
      component: Editor,
      props: true
    },
    {
      path: '/error/:status',
      name: 'Error',
      component: Error,
      props: true
    }
  ]
})
