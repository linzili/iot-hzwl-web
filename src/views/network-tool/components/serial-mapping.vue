<script setup lang="ts">
import type { FormInstance, Rule } from 'ant-design-vue/es/form'
import { baudList, dataBitsList, parityList, stopBitsList } from '../config/config'

const networkStore = useNetworkStore()

const formRef = ref<FormInstance>()

const connectTip = ref('映射到本地服务后，此连接将被锁定，无法切换。您在此页面只能查看消息，不能发送消息。')

const config = reactive<CommProperties>({
  com: undefined,
  baud: '9600',
  dataBits: 8,
  parity: 'N',
  stopBits: 1,
  dateType: 'hex',
  timeout: 10,
  rts: 0
})
const configRules: Record<string, Rule[]> = {
  com: [{ required: true, message: '请选择串口号' }]
}
const labelCol = { style: { width: '70px' } }

async function handleOpenMapping() {
  await formRef.value?.validate()

  networkStore.handleOpenComm(config)
}

function handleCloseMapping() {
  networkStore.handleCloseComm()
}

function handleGetCommList(open: boolean) {
  if (open === true) {
    networkStore.handleGetCommList()
  }
}

onMounted(() => {
  networkStore.handleGetCommList()
})
</script>

<template>
  <a-row class="h-full" :gutter="16">
    <a-col class="w-80 h-full overflow-auto">
      <a-card class="mb-4" title="设备配置">
        <a-form :labelCol="labelCol">
          <a-form-item label="波特率">
            <a-select :options="baudList"> </a-select>
          </a-form-item>
        </a-form>
      </a-card>

      <a-card class="mb-4" title="串口配置">
        <a-form :model="config" :labelCol="labelCol" ref="formRef" :rules="configRules" :disabled="networkStore.comm !== undefined">
          <a-form-item label="串口号" name="com">
            <a-select v-model:value="config.com" @dropdownVisibleChange="handleGetCommList">
              <a-select-option v-for="comm in networkStore.commList" :key="comm.PName" :value="comm.PName">{{ comm.PName }}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="波特率" name="baud">
            <a-select v-model:value="config.baud" :options="baudList"> </a-select>
          </a-form-item>
          <a-form-item label="数据位" name="dataBits">
            <a-select v-model:value="config.dataBits" :options="dataBitsList"> </a-select>
          </a-form-item>
          <a-form-item label="校验位" name="parity">
            <a-select v-model:value="config.parity" :options="parityList"> </a-select>
          </a-form-item>
          <a-form-item label="停止位" name="stopBits">
            <a-select v-model:value="config.stopBits" :options="stopBitsList"> </a-select>
          </a-form-item>
          <a-form-item label="RTS" name="rts">
            <a-switch v-model:checked="config.rts" checked-value="1" un-checked-value="0" />
          </a-form-item>
        </a-form>
        <a-tooltip v-if="networkStore.activeClient?.online !== true">
          <template #title>请选择一个在线连接后进行操作 </template>
          <a-button type="primary" disabled> 打开映射 </a-button>
        </a-tooltip>
        <a-button v-else type="primary" @click="networkStore.comm === undefined ? handleOpenMapping() : handleCloseMapping()">
          {{ networkStore.comm === undefined ? '打开' : '关闭' }}映射
        </a-button>
        <a-tooltip>
          <template #title>{{ connectTip }}</template>
          <QuestionCircleOutlined class="ml-4" />
        </a-tooltip>
      </a-card>

      <a-card title="目标串口">
        <a-form :labelCol="labelCol">
          <a-form-item label="串口号">
            <a-select v-model:value="config.com" @dropdownVisibleChange="handleGetCommList" placeholder="请选择">
              <a-select-option v-for="comm in networkStore.commList" :key="comm.PName" :value="comm.PName">{{ comm.PName }}</a-select-option>
            </a-select>
          </a-form-item>
        </a-form>
      </a-card>
    </a-col>
    <a-col class="w-[calc(100%_-_20rem)] h-full">
      <SerialIntroduce class="mb-4" />
      <message-list class="h-[calc(100%_-_10rem)]" />
    </a-col>
  </a-row>
</template>
