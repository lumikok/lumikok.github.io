<template>
  <span id="site-runtime-easy">计算中...</span>
</template>

<script setup>
import { onMounted, onUnmounted } from "vue";

// 动态导入并初始化计时器
let timer = null;
onMounted(async () => {
  // 动态导入 EasyTimer.js 库 (从 CDN 加载 ESM 模块)
  const { default: Timer } =
    await import("https://cdn.skypack.dev/easytimer.js");
  const runtimeElement = document.getElementById("site-runtime-easy");
  if (!runtimeElement) return;

  // 配置计时器，从2026年5月22日开始计时 (月份从0开始，4代表5月)
  const startDate = new Date(2026, 4, 22, 0, 0, 0);
  timer = new Timer({
    startValues: {
      days: Math.floor((new Date() - startDate) / 86400000),
    },
  });

  // 每秒更新显示
  timer.start();
  timer.addEventListener("secondsUpdated", () => {
    runtimeElement.innerText = formatTime(timer.getTimeValues());
  });
});

onUnmounted(() => {
  if (timer) timer.stop();
});

// 格式化显示时间 (精确到秒)
function formatTime(timeValues) {
  const { days, hours, minutes, seconds } = timeValues;
  return `${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`;
}
</script>
