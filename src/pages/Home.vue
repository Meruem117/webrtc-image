<template>
  <div class="container">
    <h5>Image</h5>
    <van-uploader :after-read="afterRead" />
  </div>
</template>

<script>
import { Uploader } from 'vant'
import { getBeautifyPic } from '@/tencentcloud/service'

export default {
  name: 'HomePage',
  components: {
    [Uploader.name]: Uploader
  },
  data() {
    return {}
  },
  methods: {
    afterRead(file) {
      console.log(file.content)
      getBeautifyPic(file.content).then(res => {
        console.log(res)
      })
      // getSegmentPortraitPic(file.content)
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 20px;
}
</style>