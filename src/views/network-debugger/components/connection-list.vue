<script setup lang="ts">
const count = 3
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`

const list = ref([])
onMounted(() => {
  fetch(fakeDataUrl)
    .then((res) => res.json())
    .then((res) => {
      list.value = res.results
    })
})
</script>
<template>
  <a-card title="连接列表" class="w-full h-full overflow-auto">
    <a-list :data-source="list" :locale="{ emptyText: '暂无连接' }">
      <template #renderItem>
        <a-list-item class="connection-item">
          <a-list-item-meta title="192.168.123.123:45678" description="123123">
            <template #avatar>
              <a-tag color="processing" v-if="true">
                <template #icon>
                  <check-circle-outlined />
                </template>
                在线
              </a-tag>
              <a-tag color="default" v-else>
                <template #icon>
                  <minus-circle-outlined />
                </template>
                离线
              </a-tag>
            </template>
          </a-list-item-meta>
        </a-list-item>
      </template>
    </a-list>
  </a-card>
</template>

<style scoped>
.connection-item {
  padding: 0.5rem 0.25rem;
}
</style>
