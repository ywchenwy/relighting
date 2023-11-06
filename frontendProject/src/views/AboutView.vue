<template>
  <div class="about">
    <div class="item">
      <img src="../assets/no.svg" alt="" ref="img1" />
      <div class="btn">
        <el-button
          size="large"
          :icon="Upload"
          @click="triggerFileUpload('face')"
          >上传人脸</el-button
        >
        <input
          ref="fileInput1"
          type="file"
          style="display: none"
          name="image"
          @change="handleFileUpload"
        />
      </div>
      <div class="loading" v-if="isLoading1">
        <img src="../assets/loading.svg" alt="" srcset="" />
      </div>
    </div>
    <div class="item">
      <img src="../assets/no.svg" alt="" ref="img2" />
      <div class="btn">
        <el-button size="large" :icon="Upload" @click="triggerFileUpload('bgi')"
          >上传背景</el-button
        >
        <input
          ref="fileInput2"
          type="file"
          style="display: none"
          name="image"
          @change="handleFileUpload"
        />
      </div>
      <div class="loading" v-if="isLoading2">
        <img src="../assets/loading.svg" alt="" srcset="" />
      </div>
    </div>
    <div class="item">
      <img src="../assets/no.svg" alt="" ref="img3" />
      <div class="btn">
        <el-button
          size="large"
          :icon="Download"
          @click="downloadFile"
          :loading="isLoading"
          >下载生成</el-button
        >
      </div>
      <div class="loading" v-if="isLoading3">
        <img src="../assets/loading.svg" alt="" srcset="" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { Upload, Download } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
const fileInput1 = ref(null)
const fileInput2 = ref(null)
const img1 = ref(null)
const img2 = ref(null)
const img3 = ref(null)
const flagSelect = ref('')
const isLoading = ref(false)
const set = ref(new Set())
const isLoading1 = ref(false)
const isLoading2 = ref(false)
const isLoading3 = ref(false)
const triggerFileUpload = (flag) => {
  flagSelect.value = flag
  if (flag === 'face') fileInput1.value.click()
  else fileInput2.value.click()
}
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  uploadFile(file)
}

const uploadFile = async (file) => {
  if (!file) {
    // 如果没有选择文件，则不执行上传操作
    return
  }

  let targetImg = null
  let targetLoading = null
  if (flagSelect.value === 'face') {
    targetLoading = isLoading1
    targetImg = img1
  } else {
    targetLoading = isLoading2
    targetImg = img2
  }
  targetLoading.value = true
  set.value.add(flagSelect.value)

  const reader = new FileReader()
  reader.onload = (event) => {
    targetImg.value.src = event.target.result
  }
  reader.readAsDataURL(file)

  const formData = new FormData()
  formData.append('image', file)
  console.log(formData)

  const res = await fetch(`/api/${flagSelect.value}`, {
    method: 'POST',
    body: formData
  })
  targetLoading.value = false
  if (res.status === 200) {
    ElMessage({
      message: '图片上传成功',
      type: 'success',
      duration: 1500
    })
  } else {
    ElMessage({
      message: '图片上传失败',
      type: 'warning',
      duration: 1500
    })
  }
}

const downloadFile = () => {
  if (set.value.size !== 2) {
    console.log(set.value.size)
    ElMessage({
      message: '请先上传前面两张照片',
      type: 'warning',
      duration: 2000
    })
    return false
  }
  isLoading3.value = true
  isLoading.value = true
  getImg()
}
const getImg = async () => {
  const res = await fetch('/api/image', {
    method: 'GET'
  })
  const blob = await res.blob()
  const imageUrl = URL.createObjectURL(blob)
  console.log(imageUrl)
  img3.value.src = imageUrl
  isLoading.value = false
  isLoading3.value = false
  ElMessage({
    message: '结果下载成功',
    type: 'success',
    duration: 1500
  })
}
</script>

<style lang="less" scoped>
.about {
  display: flex;
  justify-content: space-around;
  .item {
    border-radius: 8px;
    width: 25%;
    height: auto;
    aspect-ratio: 1 / 1;
    position: relative;
    .loading {
      position: absolute;
      width: 53%;
      height: 53%;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      background: rgba(119, 96, 96, 0.61);
      backdrop-filter: blur(2px);
      border-radius: 25px;
      img {
        transform: scale(0.7);
        animation: rotateing 2s linear infinite;
        display: block;
      }
    }
    @keyframes rotateing {
      0% {
        transform: scale(0.7) rotate(0);
      }
      100% {
        transform: scale(0.7) rotate(360deg);
      }
    }
    img {
      width: 100%;
      display: block;
      border-radius: 20px;
    }
    .btn {
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translate(-50%, 80%);
      button {
        border-radius: 25px;
        // background-image: linear-gradient(-20deg, #e9defa 0%, #fbfcdb 100%);
        background-color: #00ffd1;
        box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25) inset;
        color: #000;
        &:hover {
          color: #fff;
        }
      }
      input {
        display: none;
      }
    }
  }
}
</style>
