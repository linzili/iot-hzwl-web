<script lang="ts" setup>
import type { SelectProps } from 'ant-design-vue'
import type { IParseConfig } from '../types'
import { charCountOption, charOrderOptionMap, checkTypeOption, dataTypeOption } from '../config/modbus-config'

function splitAndReverse(array: Uint8Array): Uint8Array {
  const mid = Math.floor(array.length / 2)
  const firstHalf = Array.from(array.slice(0, mid)).reverse()
  const secondHalf = Array.from(array.slice(mid)).reverse()
  return Uint8Array.from([...firstHalf, ...secondHalf])
}

function splitAndSwitch(array: Uint8Array): Uint8Array {
  const mid = Math.floor(array.length / 2)
  const firstHalf = Array.from(array.slice(0, mid))
  const secondHalf = Array.from(array.slice(mid))
  return Uint8Array.from([...secondHalf, ...firstHalf])
}
const props = defineProps<{
  sourceData: string
}>()
const parseConfig = defineModel<IParseConfig>('parseConfig', { required: true })

const parseData = computed(() => {
  if (props.sourceData) {
    const byteArray = hexToUint8Array(props.sourceData)

    if (
      parseConfig.value.startAddress !== undefined &&
      parseConfig.value.charCount !== undefined &&
      byteArray.length >= parseConfig.value.startAddress + parseConfig.value.charCount
    ) {
      let parseByteArray = byteArray.slice(parseConfig.value.startAddress - 1, parseConfig.value.startAddress + parseConfig.value.charCount - 1)
      switch (parseConfig.value.charOrder) {
        case 'desc':
          parseByteArray.reverse()
          break
        case 'ascAndDesc':
          parseByteArray = splitAndReverse(parseByteArray)
          break
        case 'descAndAsc':
          parseByteArray = splitAndSwitch(parseByteArray)
          break
      }
      const parseHexString = uint8ArrayToHexString(parseByteArray)
      switch (parseConfig.value.dataType) {
        case 'UnsignedInt':
          return hexToUnsignedInt(parseHexString)
        case 'SignedInt':
          return hexToSignedInt(parseHexString)
        case 'Float':
          return hexToFloat(parseHexString)
        case 'BCD':
          return hexToBCD(parseHexString)
        case 'Double':
          return hexToDouble(parseHexString)
        case 'HEX':
          return parseHexString.toUpperCase()
      }
    }
  }
  return undefined
})

const charOrderOption = computed<SelectProps['options']>(() =>
  parseConfig.value.charCount !== undefined ? charOrderOptionMap.get(parseConfig.value.charCount) || charOrderOptionMap.get('other') : []
)
</script>

<template>
  <a-row>
    <a-col class="flex flex-col"><slot /></a-col>
    <a-col flex="1">
      <a-form
        :label-col="{ style: { width: '6rem', marginBottom: '1.5rem' } }"
        :model="parseConfig"
        :wrapper-col="{ style: { width: '9rem' } }"
        layout="inline"
      >
        <a-form-item label="起始地址" name="startAddress">
          <a-input-number v-model:value="parseConfig.startAddress" :controls="false" class="w-full" />
        </a-form-item>
        <a-form-item label="截取字节数" name="charCount">
          <a-select v-model:value="parseConfig.charCount" :options="charCountOption" @change="parseConfig.charOrder = 'asc'" />
        </a-form-item>
        <a-form-item label="字节顺序" name="charOrder">
          <a-select v-model:value="parseConfig.charOrder" :options="charOrderOption" />
        </a-form-item>
        <a-form-item label="数据类型" name="dataType">
          <a-select v-model:value="parseConfig.dataType" :options="dataTypeOption" />
        </a-form-item>
        <a-form-item label="校验方式" name="checkType">
          <a-select v-model:value="parseConfig.checkType" :options="checkTypeOption" />
        </a-form-item>
      </a-form>

      <a-typography-paragraph>
        <a-typography-text class="w-24 text-right inline-block">解析数据：</a-typography-text>
        <span class="command h-full w-36">
          <div>{{ parseData }}</div>
        </span>
      </a-typography-paragraph>
    </a-col>
  </a-row>
</template>
