<template>
  <div>
    <!-- 商品分类三级列表 -->
    <typeNav />
    <div class="main">
      <div class="py-container">
        <!--bread 面包屑：带有x的结构-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- // 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
            <!-- // 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword"> {{ searchParams.keyword }}<i @click="removeKeyword">x</i></li>
            <!-- // 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark"> {{ searchParams.trademark.split(':')[1] }}<i @click="removeTradeMark">x</i></li>
            <!-- 平台的售卖的属性值展示 -->
            <li class="with-x" v-for="(attrValue,index) in searchParams.props" :key="index">{{attrValue.split(":")[1]}}<i @click="removeAttr(index)">x</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 价格的结构 -->
              <ul class="sui-nav">
                <li :class="{active:isOne}" @click="changeOrder('1')">
                  <a>综合<span v-show="isOne" class="iconfont" :class="{'icon-up':isAsc,'icon-down-arrow':isDesc}"></span>
                  </a>
                </li>
                <li :class="{active:isTwo}" @click="changeOrder('2')">
                  <a>价格<span v-show="isTwo" class="iconfont" :class="{'icon-up':isAsc,'icon-down-arrow':isDesc}"></span>
                  </a>
                </li>
                
              </ul>
            </div>
          </div>

          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good, index) in goodsList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 在路由跳转的时候带上参数id，params -->
                    <router-link :to="`/detail/${good.id}`">
                      <img v-lazy="good.defaultImg"/>
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ good.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ good.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- 分页器 -->
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :continues="5" :total="total" @getPageNo="getPageNo"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters } from "vuex";

export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      // 带给服务器的参数
      searchParams: {
        // 一级分类的id
        category1Id: "",
        // 二级分类的id
        category2Id: "",
        // 三级分类的id
        category3Id: "",
        // 分类名字
        categoryName: "",
        // 关键字
        keyword: "",
        // 排序:初始状态应该是综合|降序
        order: "1:desc",
        // 分液器用的：代表的是当前是第几页。默认就是第一页
        pageNo: 1,
        // 代表的是每一页展示几个数据
        pageSize: 3,
        // 平台售卖属性操作带的参数
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  // 当组件挂在完毕之前执行一次【先于mounted】，把初识的参数值改变后的新参数值带给mounted去发送请求
  // 在发送请求之前，把接口需要传递的参数，进行整理（在给服务器发请求之前，把参数整理好，服务器就会返会查询的数据）
  beforeMount(){
    // 复杂的写法
    // this.searchParams.category1Id = this.$route.query.category1Id
    // this.searchParams.category2Id = this.$route.query.category2Id
    // this.searchParams.category3Id = this.$route.query.category3Id
    // this.searchParams.categoryName = this.$route.query.categoryName
    // this.searchParams.keyword = this.$route.params.keyword
    Object.assign(this.searchParams,this.$route.query,this.$route.params)
  },
  // 组件挂载完毕执行一次【仅仅执行一次】
  mounted() {
    // 在组件挂载完毕之前带给服务器参数【searchParams参数发生变化有数值带给服务器】
    this.getData();
  },
  computed: {
    ...mapGetters("search", ["goodsList","total"]),
    isOne(){
      return this.searchParams.order.indexOf('1') != -1
    },
    isTwo(){
      return this.searchParams.order.indexOf('2') != -1
    },
    isAsc(){
      return this.searchParams.order.indexOf('asc') != -1
    },
    isDesc(){
      return this.searchParams.order.indexOf('desc') != -1
    }
  },
  methods: {
    // 向服务器发送请求获取search模块数据（根据参数不同返回不同的数据进行展示）
    // 把这次请求封装为一个函数：当你需要在调用的时候调用即可
    getData() {
      this.$store.dispatch("search/getSearchList", this.searchParams);
    },
    // 删除分类的名字
    removeCategoryName(){
      // 把带个服务器的参数置空了，还需要向服务器重新发送请求
      // 带给服务器参数对象里面的参数都是可有可无的，那么有些与此次请求无关的参数就不用传给服务器，可以节省载荷，省流量
      // 如果属性值为空的字符串，还是会带给服务器，把相应属性的值设置为undefined。这个属性就不会带给服务器
      this.searchParams.categoryName = undefined
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      this.getData()
      // 地址栏也需要修改，进行路由跳转

      // 此时组件数据已经变了，但是路径中的还没变，因为改组件中的数据并不会改路径的数据
      // 本意是删除query参数，如果搜索框有关键字即有params则不应删除，路路由跳转应该把params带上
      this.$router.push({name:'search',params:this.$route.params})
      // 跳转之后生成新的组件实例对象，参数数据重置为初始数据
    },
    // 删除关键字
    removeKeyword(){
      // 给服务器带的参数searchParams的keyword置空
      this.searchParams.keyword = undefined
      // 再次发起请求
      this.getData()
      // 通知兄弟组件Header清除关键字
      this.$bus.$emit("clear")
      // 路径跳转,上面发送了一次请求，query必定存在
      this.$router.push({name:'search',query:this.$route.query})

    },
    // 自定义事件回调
    trademarkInfo(trademark){
      // 根据文档中参数的示例整理参数成接口要的参数的形式
        console.log('我是父组件',trademark);
        this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
        // 再次发请求获取search模块列表数据进行展示
        this.getData()
    },
    // 删除品牌的信息
    removeTradeMark(){
      this.searchParams.trademark = undefined
      // 再次发请求
      this.getData()
    },
    // 收集平台属性地方的回调函数
    attrInfo(attrs,attrValue){
      // 请求文档中的格式： ["属性ID"：属性值:属性名]
      // 参数格式整理好
      // console.log(attrs,attrValue);
      let props =  `${attrs.attrId}:${attrValue}:${attrs.attrName}`
      // 数组去重，没有重复的属性值再添加
      if(this.searchParams.props.indexOf(props) == -1){
        this.searchParams.props.push(props)
      }
      // 再次发起请求
      this.getData()

    },
    // 删除售卖属性的面包屑
    removeAttr(index){
      // 再次整理参数
      this.searchParams.props.splice(index,1)
      // 参数变了就再发请求
      this.getData()
    },
    // 排序的操作
    changeOrder(flag){
      // flag形参：他是一个标记，代表用户点击的是综合（1）还是价格（2）【用户点击的时候传递过来的】
      let originOrder = this.searchParams.order
      // 这里获取到的是当前的状态
      let originFlag = this.searchParams.order.split(":")[0]
      let originSort = this.searchParams.order.split(":")[1]
      let newOrder = ''

      // console.log(flag);
      // console.log(originFlag);
      // 好像模板字符串中有普通字符串要把普通字符串当成变量包裹着使用
      // 直接 `${flag}:'desc'` 是不允许的，
      if(originFlag == flag){
          if(originSort == 'asc'){
            newOrder = `${flag}:${'desc'}`
            console.log('asc');
          }else{
            newOrder = `${flag}:${'asc'}`
            console.log('desc');
          }
      }else{
        newOrder = `${flag}:${'desc'}`
        // console.log('xxx');
      }
      // 再次发起请求
      this.searchParams.order = newOrder
      this.getData()

    },
    // 获取当前页的操作
    getPageNo(page){
      this.searchParams.pageNo = page
      this.getData()
    }
  },
  // 数据监听：监听组件实例身上的属性的属性值变化
  watch:{
    // 监听路由的信息是否发生变化，如果发生变化，再次发起请求
    $route(newValue,oldValue){
      // 再次发请求之前整理带给服务器参数
      Object.assign(this.searchParams,this.$route.query,this.$route.params)
      // 再次发起ajax请求
      this.getData()
      // 每一次请求完毕，应该把相应的1/2/3级分类的id置空，让他接收下一次的请求的相应1/2/3id
      // keyword和Name不用重置是因为不会叠加，而有时只要某一级id却会把之前的另外两级id一起带上,但只需要一个级的id就行,
      // 简单说就是三个id互斥，有一个就不能有另外两个
      // 分类名字与关键字不用清理：因为每一次路由跳转发生变化的时候，都会给让赋予新的数据
      // 可以重新等于空字符创，为了节省宽带流量也可以等于undefined
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
    }
  }
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>