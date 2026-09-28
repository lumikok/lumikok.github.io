<script setup lang="ts">
import { useData } from "vitepress";
import { computed, nextTick, onMounted, ref, watch } from "vue";

const { frontmatter, page } = useData();
const container = ref<HTMLElement>();

const categoryLabels: Record<string, string> = {
  personal: "个人产品",
  learning: "学习项目",
  experiments: "工具探索",
};

const category = computed(() => {
  const match = page.value.relativePath
    .replace(/\\/g, "/")
    .match(/^contents\/projects\/([^/]+)\/[^/]+\.md$/);
  return match ? categoryLabels[match[1]] : undefined;
});

const visible = computed(
  () => Boolean(category.value) && !page.value.relativePath.endsWith("/index.md"),
);

const statusLabel = computed(() =>
  frontmatter.value.status === "completed" ? "已完成" : "持续进行",
);

function formatMonth(value?: string) {
  return value?.replace("-", ".") || "";
}

const period = computed(() => {
  const start = formatMonth(frontmatter.value.start);
  const end = ["present", "ongoing", "now"].includes(frontmatter.value.end)
    ? "至今"
    : formatMonth(frontmatter.value.end);
  return end && end !== start ? `${start}—${end}` : start;
});

async function placeAfterTitle() {
  await nextTick();
  if (!visible.value || !container.value) return;
  const title = document.querySelector("#VPContent .vp-doc h1");
  title?.after(container.value);
}

onMounted(placeAfterTitle);
watch(() => page.value.relativePath, placeAfterTitle);
</script>

<template>
  <div v-if="visible" ref="container" class="project-meta" data-pagefind-ignore="all">
    <div class="project-meta__labels">
      <span>{{ category }}</span>
      <span v-if="frontmatter.method">{{ frontmatter.method }}</span>
      <span>{{ statusLabel }}</span>
    </div>
    <div class="project-meta__details">
      <time v-if="period">{{ period }}</time>
      <span v-if="frontmatter.stack">{{ frontmatter.stack }}</span>
    </div>
    <div v-if="frontmatter.repo || frontmatter.release" class="project-meta__links">
      <a v-if="frontmatter.repo" :href="frontmatter.repo" target="_blank" rel="noreferrer">GitHub 仓库 ↗</a>
      <a v-if="frontmatter.release" :href="frontmatter.release" target="_blank" rel="noreferrer">最新版本 ↗</a>
    </div>
  </div>
</template>

<style scoped>
.project-meta {
  margin: 0.7rem 0 2rem;
  padding: 0.85rem 0;
  border-top: 1px solid var(--vp-c-divider);
  border-bottom: 1px solid var(--vp-c-divider);
}

.project-meta__labels,
.project-meta__details,
.project-meta__links {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1rem;
}

.project-meta__labels span {
  color: var(--vp-c-brand-1);
  font-size: 0.76rem;
  font-weight: 700;
  letter-spacing: 0.04em;
}

.project-meta__details {
  margin-top: 0.45rem;
  color: var(--vp-c-text-2);
  font-size: 0.88rem;
}

.project-meta__links {
  margin-top: 0.65rem;
}

.project-meta__links a {
  color: var(--vp-c-text-1);
  font-size: 0.84rem;
  font-weight: 600;
  text-decoration: none;
}

.project-meta__links a:hover {
  color: var(--vp-c-brand-1);
}
</style>
