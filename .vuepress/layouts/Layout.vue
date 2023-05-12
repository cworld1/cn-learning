<template>
  <ParentLayout>
    <template #page-bottom>
      <CommentService :darkmode="isDarkMode" />
      <p class="my-footer" style="text-align:center">
        &copy;2023 • <a href="https://cworld.top/">CWorld</a> • 总访问 <span id="busuanzi_value_site_pv"></span> 次
      </p>
    </template>
  </ParentLayout>
</template>

<script setup lang="ts">
import { onUnmounted, onMounted, ref } from "vue";
import ParentLayout from "@vuepress/theme-default/lib/client/layouts/Layout.vue";
// import "https://busuanzi.icodeq.com/busuanzi.pure.mini.js";

const isDarkMode = ref(false);

onMounted(() => {
  const html = document.documentElement;

  isDarkMode.value = html.classList.contains("dark");

  // watch theme change
  const observer = new MutationObserver(() => {
    isDarkMode.value = html.classList.contains("dark");
  });

  observer.observe(html, {
    attributeFilter: ["class"],
    attributes: true,
  });

  // busuanzi
  const script = document.createElement('script');
  script.src = 'https://busuanzi.icodeq.com/busuanzi.pure.mini.js';
  const footerEl = document.querySelector('.my-footer');
  if (footerEl) {
    footerEl.appendChild(script);
  } else {
    console.error('阅读量载入失败');
  }

  onUnmounted(() => {
    observer.disconnect();
  });
});
</script>