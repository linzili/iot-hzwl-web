<script setup lang="ts">
import type { FormInstance, Rule } from 'ant-design-vue/es/form'
import type { connection } from '../types'
import { message } from 'ant-design-vue'

const props = defineProps<{
  activeClient?: connection
}>()

const emits = defineEmits<{
  message: [payload: string]
}>()

const isConnect = defineModel<boolean>('isConnect')
const loading = ref(false)

const configRules: Record<string, Rule[]> = {}
const formRef = ref<FormInstance>()

const connectTip = ref('映射到本地服务后，此连接将被锁定，无法切换。您在此页面只能查看消息，不能发送消息。')

// const socket = ref<WebSocket>()

async function handleConnect() {
  await formRef.value?.validate()
  loading.value = true
}

function handleDisconnect() {
  if (isConnect.value === true) {
    isConnect.value = false

    message.warning('串口映射已断开')
  }
}

watch(
  () => props.activeClient,
  (newValue) => {
    if (newValue === undefined || newValue.online === false) {
      handleDisconnect()
    }
  },
  { deep: true }
)

const config = reactive<CommProperties>({
  com: 'com1',
  baud: '115200',
  dataBits: 5,
  parity: 'N',
  stopBits: 1,
  dateType: 'hex',
  timeout: 10,
  rts: 0
})

function forwordMessage(payload: string) {
  console.log(payload)
}

defineExpose({
  forwordMessage
})
</script>

<template>
  <a-form ref="formRef" :model="config" :rules="configRules" layout="vertical" :disabled="isConnect"> </a-form>
  <a-tooltip v-if="activeClient?.online !== true">
    <template #title>请选择一个在线连接后进行操作 </template>
    <a-button type="primary" disabled> 打开串口 </a-button>
  </a-tooltip>
  <a-button v-else type="primary" @click="isConnect ? handleDisconnect() : handleConnect()" :loading="loading === true">
    {{ isConnect ? '关闭' : '打开' }}串口
  </a-button>
  <a-tooltip>
    <template #title>{{ connectTip }}</template>
    <QuestionCircleOutlined class="ml-4" />
  </a-tooltip>

  <!-- <a-form ref="formRef" :model="config" :rules="configRules" layout="vertical" :disabled="isConnect">
    <a-form-item label="配置方式">
      <a-select v-model:value="config.type">
        <a-select-option v-for="type in configTypeList" :key="type.value" :value="type.value">{{ type.label }} </a-select-option>
      </a-select>
    </a-form-item>
    <a-form-item label="地址" name="ip"><a-input v-model:value="config.ip" :disabled="!enableManual" /></a-form-item>
    <a-form-item label="端口" name="port">
      <a-input-number v-model:value="config.port" :disabled="!enableManual" :controls="false" class="w-full" :min="1" :max="65535" />
    </a-form-item>
  </a-form>
  <a-tooltip v-if="activeClient?.online !== true">
    <template #title>请选择一个在线连接后进行操作 </template>
    <a-button type="primary" disabled> 打开映射 </a-button>
  </a-tooltip>
  <a-button v-else type="primary" @click="isConnect ? handleDisconnect() : handleConnect()" :loading="loading === true">
    {{ isConnect ? '关闭' : '打开' }}映射
  </a-button>
  <a-tooltip>
    <template #title>{{ connectTip }}</template>
    <QuestionCircleOutlined class="ml-4" />
  </a-tooltip> -->
  <SerialIntroduce />
</template>
