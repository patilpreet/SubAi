export default {
  preset: process.env.VERCEL ? "vercel" : (process.env.NITRO_PRESET || "vercel"),
};
