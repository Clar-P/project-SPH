<template>
  <div>
      <!-- 三级联动全局组件:已经注册为全局组件，不需要引入，直接使用 -->
      <TypeNav></TypeNav>
      <ListContainer></ListContainer>
      <Recommend></Recommend>
      <Rank></Rank>
      <Like></Like>
      <Floor></Floor>
      <Floor></Floor>
      <Brand></Brand>
  </div>
</template>

<script>
// 引入其余的组件
import ListContainer from '@/pages/Home/ListContainer'
import Recommend from '@/pages/Home/Recommend'
import Rank from '@/pages/Home/Rank'
import Like from '@/pages/Home/Like'
import Floor from '@/pages/Home/Floor'
import Brand from '@/pages/Home/Brand'



export default {
    name:'Home',
    components:{ListContainer,Recommend,Rank,Like,Floor,Brand},
    
}
</script>

<style>

</style>