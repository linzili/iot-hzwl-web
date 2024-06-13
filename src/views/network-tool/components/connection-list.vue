<script setup lang="ts">
import type { connection } from '../types'
const { token } = useToken()

const networkStore = useNetworkStore()

function handleChancgeActive(client: connection) {
  if (networkStore.comm !== undefined) {
    return
  }
  networkStore.activeClient = client
}
</script>
<template>
  <a-card title="连接列表" class="w-full h-full overflow-auto">
    <a-list :data-source="networkStore.connectionList" :locale="{ emptyText: '暂无连接' }">
      <template #renderItem="{ item }">
        <a-list-item
          class="connection-item"
          :class="networkStore.comm !== undefined ? 'cursor-not-allowed' : 'cursor-pointer'"
          @click="handleChancgeActive(item)"
          :style="{ backgroundColor: networkStore.activeClient?.client === item.client ? token.colorFillSecondary : null }"
        >
          <a-list-item-meta :title="item.addr" :description="item.client">
            <template #avatar>
              <a-tag color="processing" v-if="item.online">
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
  padding: 0.5rem 0.5rem;
}
</style>
