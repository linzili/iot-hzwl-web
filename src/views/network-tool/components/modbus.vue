<script lang="ts" setup>
import { message } from 'ant-design-vue'
import { checkTypeOption } from '../config/modbus-config'
import useModbusParse from '../hooks/modbus-parse'

const networkStore = useNetworkStore()

const { readCommand, readConfig, sourceData, loading, handleSendReadCommand, parseConfigList } = useModbusParse()

const { hexRule } = useRules

function handleRemoveDataParseConfig(index: number) {
  if (parseConfigList.value.length <= 1) {
    message.warning('至少保留一条数据解析')
    return
  }
  parseConfigList.value.splice(index, 1)
}
</script>

<template>
  <a-row class="h-full" :gutter="16">
    <a-col class="h-full w-[calc(100%_-_28rem)] flex flex-col">
      <a-card class="mb-4 header" title="读取测试">
        <a-form
          :label-col="{ style: { width: '6rem', marginBottom: '1.5rem' } }"
          :model="readConfig"
          :wrapper-col="{ style: { width: '9rem' } }"
          layout="inline"
        >
          <a-form-item :rules="hexRule" label="从机地址" name="slaveAddress">
            <a-input v-model:value="readConfig.slaveAddress" :maxlength="2" />
          </a-form-item>
          <a-form-item :rules="hexRule" label="功能码" name="functionCode">
            <a-input v-model:value="readConfig.functionCode" :maxlength="2" />
          </a-form-item>
          <a-form-item :rules="hexRule" label="起始地址" name="registerAddress">
            <a-input v-model:value="readConfig.registerAddress" :maxlength="4" />
          </a-form-item>
          <a-form-item :rules="hexRule" label="寄存器数量" name="registerCount">
            <a-input v-model:value="readConfig.registerCount" :maxlength="4" />
          </a-form-item>
          <a-form-item label="校验方式">
            <a-select v-model:value="readConfig.checkType" :options="checkTypeOption" />
          </a-form-item>
        </a-form>
        <a-typography-paragraph>
          <a-typography-text class="w-24 text-right inline-block">读取参数：</a-typography-text>
          <span class="command">
            <div>{{ readCommand }}</div>
          </span>
          <a-tooltip v-if="networkStore.activeClient?.online !== true">
            <template #title>请选择一个在线连接后进行操作 </template>
            <a-button disabled type="primary">读取</a-button>
          </a-tooltip>
          <a-button v-else :loading="loading" type="primary" @click="handleSendReadCommand"> 读取</a-button>
        </a-typography-paragraph>
      </a-card>

      <a-card class="content overflow-auto flex-1" title="数据解析">
        <a-typography-paragraph>
          <a-typography-text class="w-24 text-right inline-block">原始数据：</a-typography-text>
          <span class="command">
            <div>{{ sourceData }}</div>
          </span>
        </a-typography-paragraph>
        <a-divider />
        <div v-for="(cofnig, index) in parseConfigList" :key="index">
          <modbus-parse :parse-config="cofnig" :source-data="sourceData">
            <MinusCircleTwoTone class="text-2xl items-center flex-1" @click="handleRemoveDataParseConfig(index)" />
          </modbus-parse>
          <a-divider />
        </div>
        <PlusCircleTwoTone class="text-center block text-2xl" @click="parseConfigList.push({ checkType: 'CRC16' })" />
      </a-card>
    </a-col>
    <a-col class="h-full w-112">
      <message-list class="h-full" />
    </a-col>
  </a-row>
</template>
