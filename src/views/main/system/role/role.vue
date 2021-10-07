<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
      pageName="role"
    ></page-content>
    <page-modal
      :otherInfo="otherInfo"
      :modalConfig="modalConfig"
      ref="pageModalRef"
      :defaultInfo="defaultInfo"
      pageName="role"
    >
      <div class="menu-tree">
        <el-tree
          :data="menus"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
          ref="elTreeRef"
        >
        </el-tree>
      </div>
    </page-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref, nextTick } from 'vue'
import { useStore } from '@/store'
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'
import PageModal from '@/components/page-modal/src/page-modal.vue'

import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'

import { usePageModal } from '@/hooks/usePageModal'

import { ElTree } from 'element-plus'

import { menuMapLeafKeys } from '@/utils/map-menus'

export default defineComponent({
  name: 'role',
  components: {
    PageContent,
    PageSearch,
    PageModal
  },
  setup() {
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList)
      nextTick(() => {
        console.log(elTreeRef.value)
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [pageModalRef, defaultInfo, handleNewData, handleEditData] = usePageModal(
      undefined,
      editCallback
    )
    const store = useStore()
    const menus = computed(() => store.state.entireMenu)
    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, ...halfCheckedKeys]
      otherInfo.value = { menuList }
    }
    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      pageModalRef,
      defaultInfo,
      handleNewData,
      handleEditData,
      menus,
      otherInfo,
      elTreeRef,
      handleCheckChange
    }
  }
})
</script>

<style scoped lang="less">
.menu-tree {
  margin-left: 25px;
}
</style>
