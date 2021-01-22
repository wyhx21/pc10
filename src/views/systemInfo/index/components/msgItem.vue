<template>
  <div class="app-msg-item">
    <h4>{{ data['title'] }}</h4>
    <p>{{ data['content'] }}</p>
  </div>
</template>
<script>
  export default {
    props: {
      data: {
        default: {},
      },
    },
  }
</script>
