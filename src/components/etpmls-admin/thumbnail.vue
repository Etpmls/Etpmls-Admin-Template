<template>
  <el-upload
    ref="thumbnail"
    :file-list="thumbnailfileList"
    :action="thumbnailAction"
    :before-upload="thumbnailBeforeUpload"
    :on-success="handleAvatarSuccess"
    :on-remove="handleRemove"
    list-type="picture-card"
    accept="image/*"
    name="file"
    :headers="headers"
  >
    <i class="el-icon-plus" />
    <div slot="tip" class="el-upload__tip">
      {{ lang('etp_message.image_600kg') }}
    </div>
  </el-upload>
</template>

<script>
import { getUserToken, getBaseUrl } from '@/utils/etpmls-admin'
import { AttachmentUploadImage } from '@/api/etpmls-admin'
import { getlang } from '@/utils/etpmls-admin'
export default {
  name: 'Thumbnail',
  props: {
    value: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data() {
    return {
      thumbnailfileList: [],
      thumbnail: this.value,
      thumbnailAction: getBaseUrl() + AttachmentUploadImage(),
      headers: {}
    }
  },
  created() {
    this.setUploadHeader()
    if (this.thumbnail) {
      if (this.thumbnail.length > 0) {
        this.thumbnailfileList = this.thumbnail
        for (var i = 0; i < this.thumbnailfileList.length; i++) {
          this.thumbnailfileList[i].url =
            getBaseUrl() + '/' + this.thumbnailfileList[i].path
        }
      }
    } else {
      this.thumbnail = []
    }
  },
  methods: {
    thumbnailBeforeUpload(file) {
      const isRightSize = file.size / 1024 < 600
      if (!isRightSize) {
        this.$message.error(this.lang('etp_message.file_600kb'))
      }
      const isAccept = new RegExp('image/*').test(file.type)
      if (!isAccept) {
        this.$message.error(this.lang('etp_message.image_only'))
      }
      return isRightSize && isAccept
    },
    handleAvatarSuccess(res, file) {
      this.thumbnail.push({ path: res.data.path, url: getBaseUrl() + '/' + res.data.path })
      this.$emit('update:value', this.thumbnail)
    },
    handleRemove(file, fileList) {
      var i = this.thumbnail.indexOf(file)
      this.thumbnail.splice(i, 1)
    },
    setUploadHeader() {
      if (getUserToken()) {
        this.headers['token'] = getUserToken()
      }
    },
    lang(field) {
      return getlang(this, field)
    }
  }
}
</script>

<style scoped></style>
