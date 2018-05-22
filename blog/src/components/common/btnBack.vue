<template>
   <p @click="goBack()">返回上层</p>
</template>

<script>

export default {
  methods: {
    goBack(){
      this.$router.goBack();
    }
  }
}

</script>

<style scoped>
</style>
