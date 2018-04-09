<template>
  <div class="hello">
    <h3>{{title}}</h3>
    <p>{{content}}</p>
  </div>
</template>

<script>
import qs from 'qs'
import { mapGetters } from 'vuex'

export default {
  name: 'articleDetail',
  mounted(){
    getArticleDetail.call(this)
  },
  data () {
    return {
      title:'',
      content: ''
    }
  },
  methods: {
  }
}

function getArticleDetail() {
  console.log(this)
}
</script>

<style scoped>
  textarea{
    margin-top: 20px;
    resize: none;
  }
</style>
