import { defineFormKitConfig } from "@formkit/vue";
import { generateClasses } from "@formkit/themes";

export default defineFormKitConfig({
  config: {
    classes: generateClasses({
      global: {
        outer: "mb-4 w-full",
        label: "text-sm font-medium text-neutral-200",
        help: "text-xs text-neutral-400 mt-1",
        messages: "text-red-400 text-sm mt-1",
        message: "text-red-400",
      },
      text: {
        input:
          "w-full px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white placeholder:text-neutral-400 border border-white/20 focus:ring-2 focus:ring-red-500 transition",
      },
      number: {
        input:
          "w-full px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white placeholder:text-neutral-400 border border-white/20 focus:ring-2 focus:ring-red-500 transition",
      },
      select: {
        input:
          "w-full px-4 py-2 rounded-full bg-white/10 backdrop-blur-md text-white border border-white/20 focus:ring-2 focus:ring-red-500 transition",
      },
      checkbox: {
        wrapper:
          "inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition",
        input: "accent-red-600 w-5 h-5",
        label: "text-sm text-white",
      },
      submit: {
        input:
          "w-full px-4 py-2 rounded-full bg-red-700 hover:bg-red-600 text-white font-semibold text-sm transition cursor-pointer",
      },
    }),
  },
});
