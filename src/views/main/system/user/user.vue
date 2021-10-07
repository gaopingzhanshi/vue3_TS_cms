<template>
  <div class="user">
    <page-search
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
      :searchFormConfig="searchFormConfig"
    />

    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      pageName="users"
    ></page-content>
    <page-modal
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfigRef"
      ref="pageModalRef"
      pageName="users"
    ></page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageSearch } from '@/hooks/usePageSearch'
import { usePageModal } from '@/hooks/usePageModal'
import { useStore } from '@/store'

export default defineComponent({
  name: 'user',
  components: {
    PageSearch,

    PageContent,
    PageModal
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const newCallback = () => {
      const passwordItem = modalConfig.formItems.find((item) => item.field === 'password')
      passwordItem!.isHidden = false
    }
    const editCallback = () => {
      const passwordItem = modalConfig.formItems.find((item) => item.field === 'password')
      passwordItem!.isHidden = true
    }
    const store = useStore()
    const modalConfigRef = computed(() => {
      const departmentItem = modalConfig.formItems.find((item) => item.field === 'departmentId')
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return { title: item.name, value: item.id }
      })
      const roleItem = modalConfig.formItems.find((item) => item.field === 'roleId')
      roleItem!.options = store.state.entireRole.map((item) => {
        return { title: item.name, value: item.id }
      })
      return modalConfig
    })

    const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(
      newCallback,
      editCallback
    )

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfigRef,
      handleResetClick,
      handleQueryClick,
      pageContentRef,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData
    }
  }
})
</script>

<style scoped></style>
