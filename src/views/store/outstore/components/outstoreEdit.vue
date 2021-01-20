<template>
  <app-container>
    <template #header>
      <app-header />
    </template>

    <a-table
      rowKey="id"
      :columns="columns"
      :data-source="dataList"
      size="small"
      :pagination="false"
    >
      <template #areaSelect="{ record, text }">
        <div @click="currentRow = record">
          <a-select
            :value="text"
            :key="record['storeProdId']"
            placeholder="选择区域"
            style="width: 120px"
            size="small"
            @change="selectStoreArea"
          >
            <a-select-option v-for="opt in storeAreaList" :key="opt['code']">
              {{ opt['value'] }}
            </a-select-option>
          </a-select>
        </div>
      </template>
    </a-table>
  </app-container>
</template>
<script>
  import AppContainer from '@com/flexContainer'
  import AppHeader from './outstoreEditHeader'
  import { mapGetters, mapActions } from 'vuex'
  export default {
    components: {
      AppContainer,
      AppHeader,
    },
    computed: {
      ...mapGetters({
        dataList: 'appStore/outstore/detailList',
        storeAreaList: 'appStore/storeSelector/storeAreaList',
      }),
    },
    data() {
      return {
        currentRow: {},
        columns: [
          { title: '商品编码', dataIndex: 'prodCode' },
          { title: '商品名称', dataIndex: 'prodName' },
          { title: '单位', dataIndex: 'prodUnit' },
          { title: '数量', dataIndex: 'prodNum' },
          {
            title: '选择区域',
            dataIndex: 'areaId',
            width: 130,
            slots: { customRender: 'areaSelect' },
          },
          { title: '库存', dataIndex: 'storeNum', align: 'right', width: 80 },
          { title: '备注', dataIndex: 'remark', ellipsis: true },
        ],
      }
    },
    methods: {
      ...mapActions({
        selectArea: 'appStore/outstore/selectArea',
      }),
      selectStoreArea(areaId) {
        const { id, prodId: productId } = this.currentRow
        this.selectArea({ id, productId, areaId })
      },
    },
  }
</script>
