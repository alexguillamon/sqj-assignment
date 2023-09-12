import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  presets: [{
    content: [""],
    theme: {
      extend: {},
    },
    plugins: [],
  }],
} satisfies Config;
