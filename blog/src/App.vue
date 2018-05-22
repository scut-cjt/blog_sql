<template>
  <div id="app">
    <transition :name='transitionName' keep-alive>
      <router-view class="router-wrapper"/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      transitionName: 'slide-right'  // 默认动态路由变化为slide-right
    }
  },
  watch: {
    '$route' (to, from) {
      let isBack = this.$router.isBack  //  监听路由变化时的状态为前进还是后退
      if(isBack) {
        this.transitionName = 'slide-right'
      } else {
        this.transitionName = 'slide-left'
      }
      this.$router.isBack = false
    }
  }
}

</script>

<style>
  .router-wrapper {
    position: absolute;
    transition: all .3s ease;
    top: 0;
    left: 0;
    padding: 10px;
    right: 0;
    bottom: 0;
  }

  .slide-left-enter,
  .slide-right-leave-active {
    -webkit-transform: translate(100%, 0);
    transform: translate(100%, 0);
  }

  .slide-left-leave-active,
  .slide-right-enter {
    -webkit-transform: translate(-100%, 0);
    transform: translate(-100% 0);
  }
</style>
