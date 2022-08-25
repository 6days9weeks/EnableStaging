function u(e) {
  window.enmity.plugins.registerPlugin(e);
}
function c(e, n) {
  return window.enmity.modules.getModule(e, n);
}
function r(...e) {
  return window.enmity.modules.getByProps(...e);
}
window.enmity.modules.common;
function i(e) {
  return window.enmity.assets.getIDByName(e);
}
const s = c(
    (e) =>
      e.open !== void 0 &&
      e.close !== void 0 &&
      !e.openLazy &&
      !e.startDrag &&
      !e.init &&
      !e.openReplay &&
      !e.openChannelCallPopout
  ),
  d = {
    name: "EnableStaging",
    version: "2.0.0",
    description: "Bypasses experiment gate, fuck you aj.",
    authors: [{ name: "dia ♡", id: "696828906191454221" }],
    color: "#a0939d",
    onStart() {
      const e = () => {
        s.open({
          content: "Trying to enable experiments...",
          source: i("debug"),
        });
        const n = r("getUsers"),
          o = Object.values(
            r("isDeveloper")._dispatcher._actionHandlers._dependencyGraph.nodes
          );
        try {
          o.find(
            (t) => t.name === "ExperimentStore"
          ).actionHandler.OVERLAY_INITIALIZE({ user: { flags: 1 } });
        } catch {}
        const a = n.getCurrentUser;
        (n.getCurrentUser = () => ({ hasFlag: () => !0 })),
          o
            .find((t) => t.name === "DeveloperExperimentStore")
            .actionHandler.OVERLAY_INITIALIZE(),
          (n.getCurrentUser = a),
          s.open({
            content: "Experiments have been successfully enabled.",
            source: i("Check"),
          });
      };
      setTimeout(() => {
        e();
      }, 300);
    },
    onStop() {},
  };
u(d);
