<template>
  <feedback-list :tasks="labelTasks" @edit-task="$emit('edit-task', $event)" />
</template>

<script>
import { mapState } from 'vuex'
import FeedbackList from '../components/FeedbackList'

export default {
  components: {
    FeedbackList
  },
  computed: {
    ...mapState('feedback-app', ['tasks']),
    labelTasks() {
      return this.tasks
        .filter((t) => t.labels.indexOf(this.$route.params.id) !== -1)
        .sort((a, b) => a === false ? 1 : -1)
    }
  }
}
</script>
