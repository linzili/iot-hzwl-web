import type PageModal from '@/components/page-modal/page-modal.vue'
import type PageSearch from '@/components/page-search/page-search.vue'
import type { PageParams, PageResult } from '@/types/global'
import type { Data } from '@/utils/request'
import { message } from 'ant-design-vue'
import type { Ref } from 'vue'

export interface UseSearchTableParams<T, R> {
  pageSearchRef: Ref<InstanceType<typeof PageSearch>>
  pageModalRef: Ref<InstanceType<typeof PageModal>>
  fetchData?: (params: T) => Promise<Data<PageResult<R>>>
  onNew?: (data: R) => Promise<Data<number>>
  onEdit?: (data: R) => Promise<Data<boolean>>
  onDelete?: (id: number) => Promise<Data<boolean>>
  afterAction?: () => Promise<void>
}

export const useSearchTable = <T extends PageParams, R>(params: UseSearchTableParams<T, R>) => {
  const pageParams = reactive<PageParams>({
    page: 1,
    size: 10
  })
  const loading = ref<boolean>(false)
  const dataList = ref<R[]>()
  const total = ref<number>(0)

  const handleSearch = async (value?: Partial<T>) => {
    if (params.fetchData !== undefined) {
      loading.value = true
      try {
        const { data } = await params.fetchData({ ...value, ...pageParams } as T)

        dataList.value = data.list
        total.value = data.total
      } finally {
        loading.value = false
      }
    }
  }
  const search = () => params.pageSearchRef.value.handleSearch()
  const handleDelete = async (id: number) => {
    if (params.onDelete !== undefined) {
      loading.value = true
      try {
        const { data } = await params.onDelete(id)
        console.log(data)

        if (data === true) {
          message.success('删除成功')
          if (params.afterAction) {
            await params.afterAction()
          }
          search()
        }
      } finally {
        loading.value = false
      }
    }
  }

  const handleEdit = async (record: R) => {
    if (params.onEdit !== undefined) {
      loading.value = true
      try {
        await params.onEdit(record)

        message.success('修改成功')
        if (params.afterAction) {
          await params.afterAction()
        }
        params.pageModalRef.value.close()

        search()
      } finally {
        loading.value = false
        params.pageModalRef.value.closeLoading()
      }
    }
  }

  const handleNew = async (record: R) => {
    if (params.onNew !== undefined) {
      loading.value = true
      try {
        await params.onNew(record)

        message.success('新增成功')
        if (params.afterAction) {
          await params.afterAction()
        }
        params.pageModalRef.value.close()
        search()
      } finally {
        loading.value = false
        params.pageModalRef.value.closeLoading()
      }
    }
  }

  onMounted(() => {
    params.pageSearchRef.value.setSearch(handleSearch)
  })

  watch(
    () => pageParams,
    () => search(),
    {
      deep: true
    }
  )

  return {
    pageParams,
    dataList,
    total,
    loading,
    search,
    handleDelete,
    handleEdit,
    handleNew
  }
}
