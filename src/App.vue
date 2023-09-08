<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-show="$route.meta.showFooter"></Footer>
  </div>
</template>

<script>
// 引入
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'

export default {
  name: 'App',
  components:{Header,Footer},
  mounted(){
    // 通过Vuex发送请求，获取数据，存储与仓库当中
    // 优化，放在typenav中会在home与search组件间切换时都会重新发一次请求，因为切换后原来的组件会被销毁，影响性能，
    // 放在app组件中只会发起一次请求，优化了性能
    this.$store.dispatch("home/categoryList");
  }
}
</script>

<style>

</style>
