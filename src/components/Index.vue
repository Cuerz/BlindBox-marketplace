<template>
  <div class="container">
    <div class="bg-blur"></div>
    <div class="content">
      <el-col :span="12">
        <div class="left">
          <h1>Discover, collect, and sell extraordinary Boxs</h1>
          <span>OpenSea is the world's first and largest BlindBox marketplace</span>
          <div>
            <router-link to="/BoxsList">
              <el-button type="primary" style="width:7vw;height:7vh;font-size: 20px;margin:30px 20px 20px 0;">Explore</el-button>
            </router-link>
            <el-button style="width:7vw;height:7vh;font-size: 20px;">Create</el-button>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="right">
          <el-card shadow="hover" style="width:520px">
            <img src="../../static/img/LongNeckieAdira.gif" class="image">
            <div style="display:flex">
              <img src="../../static/img/author.png" style="width:38px;height: 38px;border-radius: 50%;">
              <div>
                <h2>Black Future Collection: Long Neckie Adira</h2>
                <h3>by Nyla Hayes</h3>
                </div>
            </div>
          </el-card>
        </div>
      </el-col>
    </div>
  </div>

</template>

<script>
import store from '@/vuex/store';
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex';
export default {
  name: 'Index',
  created () {
    this.loadSeckillsInfo();
    this.loadCarouselItems();
    this.loadComputer();
    this.loadEat();
    this.loadShoppingCart();
  },
  mounted () {
    const father = this;
    this.setIntervalObj = setInterval(function () {
      father.REDUCE_SECKILLS_TIME();
    }, 1000);
  },
  data () {
    return {
      setIntervalObj: null
    };
  },
  methods: {
    ...mapActions(['loadSeckillsInfo', 'loadCarouselItems', 'loadComputer', 'loadEat', 'loadShoppingCart']),
    ...mapMutations(['REDUCE_SECKILLS_TIME'])
  },
  computed: {
    ...mapState([ 'seckills', 'computer', 'eat' ]),
    ...mapGetters([ 'seckillsHours', 'seckillsMinutes', 'seckillsSeconds' ])
  },
  components: {
  },
  destroyed () {
    clearInterval(this.setIntervalObj);
  },
  store
};
</script>

<style scoped>

.bg-blur{
  background-image: url(../../static/img/LongNeckieAdira.gif);
  height: 795px;
  background-size: cover;
  background-color: rgb(255, 255, 255);
  background-position: center center;
  opacity: 0.3;
  filter: blur(8px);
}

.content {
  position: absolute;
  top: 200px;
  left: 10px;
  right: 10px;
  height: -30px;
  text-align: center;
}

.left {
  font: 30px Poppins,sans-serif;
  height: 40vh;
  margin-top: 60px;
  margin-left: 5vw;
}

.right {
  display: flex;
  justify-content: center;
}

</style>
