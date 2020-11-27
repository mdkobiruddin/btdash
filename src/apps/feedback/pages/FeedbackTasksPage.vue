<template>
  <feedback-list :tasks="incompleteTasks" @edit-task="$emit('edit-task', $event)" />
</template>

<script>
import { mapGetters } from 'vuex'
import FeedbackList from '../components/FeedbackList'

export default {
  components: {
    FeedbackList
  },
  computed: {
    ...mapGetters('feedback-app', ['incompleteTasks'])
  }
}
</script>
