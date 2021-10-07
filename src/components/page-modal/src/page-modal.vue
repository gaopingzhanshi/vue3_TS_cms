<template>
  <div class="page-modal">
    <el-dialog v-model="DialogVisible" title="新建用户" width="30%" center destroy-on-close>
      <hy-form v-bind="modalConfig" v-model="formData"></hy-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="DialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import HyForm from '@/base-ui/form'
import { useStore } from 'vuex'
export default defineComponent({
  components: { HyForm },
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      require: true
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const store = useStore()
    const DialogVisible = ref(false)
    const formData = ref<any>({})
    watch(
      () => props.defaultInfo,
      (newValue) => {
        for (const item of props.modalConfig.formItems) {
          formData.value[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )
    const handleConfirmClick = () => {
      DialogVisible.value = false
      if (Object.keys(props.defaultInfo).length) {
        // 编辑
        console.log('编辑用户')
        store.dispatch('system/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData.value, ...props.otherInfo },
          id: props.defaultInfo.id
        })
      } else {
        // 新建
        console.log('新建用户')
        store.dispatch('system/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData.value, ...props.otherInfo }
        })
      }
    }
    return {
      DialogVisible,
      formData,
      handleConfirmClick
    }
  }
})
</script>

<style scoped></style>
