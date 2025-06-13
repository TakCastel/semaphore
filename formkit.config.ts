// formkit.config.ts
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
          "bg-white/10 backdrop-blur-md text-white placeholder:text-neutral-400 px-4 py-2 rounded-full border border-white/20 focus:ring-2 focus:ring-red-500 transition w-full text-base",
      },
      number: {
        input:
          "bg-white/10 backdrop-blur-md text-white placeholder:text-neutral-400 px-4 py-2 rounded-full border border-white/20 focus:ring-2 focus:ring-red-500 transition w-full text-base",
      },
      select: {
        input:
          "bg-white/10 backdrop-blur-md text-white px-4 py-2 rounded-full border border-white/20 focus:ring-2 focus:ring-red-500 transition w-full text-base",
      },
      date: {
        input:
          "bg-white/10 backdrop-blur-md text-white placeholder:text-neutral-400 px-4 py-2 rounded-full border border-white/20 focus:ring-2 focus:ring-red-500 transition w-full text-base",
      },
      checkbox: {
        outer: "w-full",
        wrapper:
          "inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition",
        input: "accent-red-600 w-5 h-5",
        label: "text-base text-white",
      },
      submit: {
        input:
          "w-full bg-red-700 hover:bg-red-600 text-white font-semibold text-sm px-4 py-2 rounded-full transition cursor-pointer",
      },
    }),
  },
});
