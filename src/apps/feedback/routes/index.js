export default [{
  path: '',
  redirect: 'feedback'
}, {
  path: 'feedback',
  name: 'apps-feedback-feedback',
  component: () => import(/* webpackChunkName: "apps-feedback-feedback" */ '@/apps/feedback/pages/FeedbackTasksPage.vue')
}, {
  path: 'completed',
  name: 'apps-feedback-completed',
  component: () => import(/* webpackChunkName: "apps-feedback-completed" */ '@/apps/feedback/pages/FeedbackCompletedPage.vue')
}, {
  path: 'label/:id',
  name: 'apps-feedback-label',
  component: () => import(/* webpackChunkName: "apps-feedback-label" */ '@/apps/feedback/pages/FeedbackLabelPage.vue')
}]
