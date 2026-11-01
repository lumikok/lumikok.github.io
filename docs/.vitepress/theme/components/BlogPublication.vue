<script setup lang="ts">
import { useData } from "vitepress";
import { computed } from "vue";

const { frontmatter } = useData();
const publication = computed(() => frontmatter.value.publication);
</script>

<template>
  <p v-if="publication" class="blog-publication">
    <template v-if="publication.source !== 'unpublished'">发布于 </template>
    <time :datetime="publication.timestamp || publication.date || undefined">{{ publication.label }}</time>
    <span v-if="publication.timestamp"> · 北京时间</span>
  </p>
</template>

<style scoped>
.blog-publication {
  margin: 0 0 1rem;
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
}
</style>
