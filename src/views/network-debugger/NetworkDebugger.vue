<script setup lang="ts"></script>

<template>
  <a-row :gutter="16" class="h-full">
    <a-col :span="6" class="max-w-72 bg-amber-200">Col</a-col>
    <a-col flex="auto" class="bg-amber-600">
      <a-row class="h-full">
        <a-col flex="auto">1</a-col>
        <a-col :span="6" class="max-w-56">1</a-col>
      </a-row>
    </a-col>
  </a-row>
</template>

<style scoped></style>
