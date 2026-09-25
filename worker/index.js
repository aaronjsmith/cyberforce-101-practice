export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/range" || url.pathname.startsWith("/range/")) {
      return env.CYBER_RANGE.fetch(request);
    }
    return env.ASSETS.fetch(request);
  },
};
