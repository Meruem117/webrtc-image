<template>
  <div class="container">
    <div class="base-box" v-show="!show">
      <van-image width="240" height="240" :src="src" fit="scale-down" @click="imagePreview(src)" v-if="src" />
      <van-button class="btn" type="primary" @click="openCamera">打开相机</van-button>
    </div>
    <div class="video-box" v-show="show">
      <video id="video" class="video" playsinline autoplay></video>
      <img class="video-cover" src="@/assets/bg.png" />
      <div class="btn-group">
        <van-button class="btn" type="primary" @click="show = false">取消</van-button>
        <van-button class="btn" type="primary" @click="takePhoto">拍照</van-button>
        <van-button class="btn" type="primary" @click="front = !front">翻转</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import html2canvas from 'html2canvas'
import { Button, Image, ImagePreview } from 'vant'

export default {
  name: 'HomePage',
  components: {
    [Button.name]: Button,
    [Image.name]: Image,
    [ImagePreview.name]: ImagePreview
  },
  data() {
    return {
      show: false,
      front: false,
      src: 'https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg'
    }
  },
  methods: {
    openCamera() {
      let that = this
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {}
      }
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
          var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia
          if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'))
          }
          return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject)
          })
        }
      }
      const constraints = {
        audio: false,
        video: { facingMode: this.front ? 'user' : 'environment' }
      }
      navigator.mediaDevices.getUserMedia(constraints).then(stream => {
        var video = document.querySelector('video')
        window.stream = stream
        if ("srcObject" in video) {
          video.srcObject = stream
        } else {
          video.src = window.URL.createObjectURL(stream)
        }
        video.onloadedmetadata = function () {
          video.play()
        }
        this.show = true
      }).catch(() => {
        this.show = false
        that.$toast('该环境不支持调用此功能！')
      })
    },
    takePhoto() {
      html2canvas(document.getElementById("video"), {
        backgroundColor: null,
        useCORS: true
      }).then(canvas => {
        let url = canvas.toDataURL('image/jpg')
        this.src = url
        this.show = false
      })
    },
    imagePreview(src) {
      ImagePreview({
        images: [src],
        startPosition: 0
      })
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}

.container .base-box {
  width: 100%;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.container .base-box .btn {
  margin-top: 15px;
}

.container .video-box {
  width: 100%;
  height: 100vh;
  position: relative;
}

.container .video-box .video {
  position: absolute;
  top: 0;
  width: 100%;
  height: 80%;
  background-color: #000;
}

.container .video-box .video-cover {
  position: absolute;
  top: 0;
  width: 100%;
  height: 80%;
}

.container .video-box .btn-group {
  position: absolute;
  bottom: -20px;
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-around;
}


.container .video-box .btn-group .btn {
  width: 120px;
}
</style>