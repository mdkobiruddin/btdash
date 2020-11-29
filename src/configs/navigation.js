import menuPages from './menus/pages.menu'

export default {
  // main navigation - side menu
  menu: [{
    text: '',
    key: '',
    items: [
      { icon: 'mdi-chart-bar', key: 'menu.dashboard', text: 'Charts', link: '/charts' },
      { icon: 'mdi-map-search-outline', key: 'menu.mapspage', text: 'Maps', link: '/mapspage' },
      { icon: 'mdi-lead-pencil', key: 'menu.action', text: 'Action', link: '/actions' },
      { icon: 'mdi-comment-edit-outline', key: 'menu.appfeedback', text: 'Feedback', link: '/feedback' }
    ]
  }, {
    // text: 'Pages',
    // key: 'menu.pages',
    // items: menuPages
  }],

  // footer links
  footer: [{
    // text: 'Docs',
    // key: 'menu.docs',
    // href: 'https://vuetifyjs.com',
    // target: '_blank'
  }]
}
