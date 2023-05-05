import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// TODO: set defineConfig.site *
export default defineConfig({
  site: "https://www.brazucas-em-portugal.com",
  integrations: [tailwind(), react()]
});