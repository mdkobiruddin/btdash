import tasks from './content/feedback'

/*
|---------------------------------------------------------------------
| TODO Vuex State
|---------------------------------------------------------------------
*/
export default {
  tasks,

  // labels
  labels: [{
    id: 'Bug report',
    title: 'Bug report',
    color: 'red'
  },{
    id: 'App Design',
    title: 'App Design',
    color: 'orange'
  },
  {
    id: 'Suggested idea',
    title: 'Suggested idea',
    color: 'green'
  }
  ]
}
