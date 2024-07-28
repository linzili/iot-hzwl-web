<script lang="tsx">
import type { SimpleDictData } from '@/types/dict'
import { Tag } from 'ant-design-vue'
import type { PropType } from 'vue'

export default defineComponent({
  name: 'dict-tag',
  props: {
    type: {
      type: String as PropType<string>,
      required: true
    },
    value: {
      type: Number as PropType<number>,
      required: true
    }
  },
  setup(props) {
    const dictData = ref<SimpleDictData>()

    const getDictObj = (dictType: string, value: number) => {
      const dictOptions = getDictOptions(dictType)
      dictData.value = dictOptions.find((item) => item.value === value)
    }

    const rederDictTag = () => {
      if (!props.type) {
        return null
      }
      if (props.value === undefined || props.value === null) {
        return null
      }
      getDictObj(props.type, props.value)

      return <Tag color={ColorTypeOption.find((option) => option.value === dictData.value?.colorType)?.color}>{dictData.value?.label}</Tag>
    }
    return () => rederDictTag()
  }
})
</script>
