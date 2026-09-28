import BlogTheme from "@sugarat/theme";
import { h } from "vue";

import ProjectMeta from "./components/ProjectMeta.vue";
// @ts-ignore: Could not find a declaration file for module './style.css'.
import "./style.css";
// @ts-ignore: Could not find a declaration file for module './components/SiteRuntime.vue'.
// import SiteRuntime from "./components/SiteRuntime.vue";

export default {
  ...BlogTheme,
  Layout: () =>
    h(BlogTheme.Layout, null, {
      "doc-before": () => h(ProjectMeta),
    }),
};
