<script lang="ts" setup></script>

<template>
  <a-row class="h-full">
    <a-col class="h-full bg-blue-50" flex="1">1</a-col>
    <a-col :span="8" class="max-w-160 min-w-96">
      <LoginPanel />
    </a-col>
  </a-row>
</template>
