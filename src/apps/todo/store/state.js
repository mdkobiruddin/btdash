import tasks from './content/tasks'

/*
|---------------------------------------------------------------------
| TODO Vuex State
|---------------------------------------------------------------------
*/
export default {
  tasks,

  // labels
  labels: [{
    id: 'account',
    title: 'Account',
    color: 'red'
  },{
    id: 'data',
    title: 'Data',
    color: 'orange'
  }
  ]
}
