<script lang="ts" setup>
import type { FormInstance } from 'ant-design-vue/es/form'
import type { IPageModalProps } from './type'
import { getDictOptions } from '@/utils/dict'

const props = defineProps<IPageModalProps>()

const emit = defineEmits(['newConfirm', 'editConfirm'])

const visible = ref(false)

const type = ref<'new' | 'edit'>('new')

const formData = reactive<{ [key: string]: any }>({})
const formRef = ref<FormInstance>()
const confirmLoading = ref(false)
const open = (_type: 'new' | 'edit' = 'new', itemData?: { [key: string]: any }) => {
  type.value = _type

  for (const item of props.modalConfig.formItems) {
    if ((item.mode === undefined || item.mode === 'edit') && _type === 'edit' && itemData) {
      formData[item.prop] = itemData[item.prop]
    } else if ((item.mode === undefined || item.mode === 'new') && _type === 'new' && item.initialValue) {
      formData[item.prop] = item.initialValue
    } else {
      delete formData[item.prop]
    }
  }

  visible.value = true
}
const close = () => {
  visible.value = false
}

const closeLoading = () => {
  confirmLoading.value = false
}

const handleConfirm = async () => {
  await formRef.value?.validate()
  if (type.value === 'edit') {
    emit('editConfirm', formData)
  } else {
    emit('newConfirm', formData)
  }
  confirmLoading.value = true
}

defineExpose({
  open,
  close,
  closeLoading
})
</script>

<template>
  <a-modal
    v-model:open="visible"
    :confirmLoading
    :title="type === 'new' ? modalConfig.header.newTitle : modalConfig.header.editTitle"
    destroyOnClose
    @ok="handleConfirm"
  >
    <div class="mt-4">
      <a-form ref="formRef" :labelAlgin="modalConfig.labelAlight" :labelCol="modalConfig.labelCol" :model="formData" :rules="modalConfig.formRule">
        <template v-for="item in modalConfig.formItems" :key="item.prop">
          <template v-if="item.type !== 'none'">
            <template v-if="item.type === 'slot'">
              <slot :name="item.slotName" :formData="formData" :item="item" />
            </template>

            <template v-else-if="item.mode === undefined || item.mode === type">
              <a-form-item :label="item.label" :name="item.prop">
                <a-input v-if="item.type === 'input'" v-model:value="formData[item.prop]" />
                <a-radio-group v-else-if="item.type === 'radio'" v-model:value="formData[item.prop]">
                  <a-radio
                    v-for="radio in item.options"
                    :key="radio[item.fieldNames?.value || 'value']"
                    :value="radio[item.fieldNames?.value || 'value']"
                  >
                    {{ radio[item.fieldNames?.label || 'label'] }}
                  </a-radio>
                </a-radio-group>
                <a-input-number
                  v-else-if="item.type === 'input-number'"
                  v-model:value="formData[item.prop]"
                  :max="item.max"
                  :min="item.min"
                  class="w-full"
                />
                <a-date-picker v-else-if="item.type === 'date-picker'" v-model:value="formData[item.prop]" valueFormat="YYYY-MM-DD HH:mm:ss" />
                <a-select
                  v-else-if="item.type === 'select'"
                  v-model:value="formData[item.prop]"
                  :fieldNames="{ label: item.fieldNames?.label || 'label', value: item.fieldNames?.value || 'value' }"
                  :options="item.options"
                />

                <a-tree-select
                  v-else-if="item.type === 'tree-select'"
                  v-model:value="formData[item.prop]"
                  :fieldNames="{ label: item.fieldNames?.label || 'label', value: item.fieldNames?.value || 'value' }"
                  :tree-data="item.options"
                />

                <a-select
                  v-else-if="item.type === 'dict-select'"
                  v-model:value="formData[item.prop]"
                  :fieldNames="{ label: item.fieldNames?.label || 'label', value: item.fieldNames?.value || 'value' }"
                  :options="getDictOptions(item.dictType)"
                />
                <a-radio-group v-else-if="item.type === 'dict-radio'" v-model:value="formData[item.prop]">
                  <a-radio v-for="radio in getDictOptions(item.dictType)" :key="radio.value" :value="radio.value">
                    {{ radio.label }}
                  </a-radio>
                </a-radio-group>
              </a-form-item>
            </template>
          </template>
        </template>
      </a-form>
    </div>
  </a-modal>
</template>
