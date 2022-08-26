function d(e) {
  window.enmity.plugins.registerPlugin(e);
}
function l(e, s) {
  return window.enmity.modules.getModule(e, s);
}
function o(...e) {
  return window.enmity.modules.getByProps(...e);
}
window.enmity.modules.common;
function a(e) {
  return window.enmity.assets.getIDByName(e);
}
const c = l(
  (e) =>
    e.open !== void 0 &&
    e.close !== void 0 &&
    !e.openLazy &&
    !e.startDrag &&
    !e.init &&
    !e.openReplay &&
    !e.openChannelCallPopout
),
  p = {
    name: "EnableStaging",
    version: "2.0.1",
    description: "Bypasses experiment gate. Fuck you aj.",
    authors: [{ name: "dia ♡", id: "696828906191454221" }],
    color: "#a0939d",
    onStart() {
      const e = () => {
        const n = o("getUsers"),
          r = Object.values(
            o("isDeveloper")._dispatcher._actionHandlers._dependencyGraph
              .nodes
          );
        try {
          r.find(
            (t) => t.name === "ExperimentStore"
          ).actionHandler.OVERLAY_INITIALIZE({ user: { flags: 1 } });
        } catch { }
        const i = n.getCurrentUser;
        (n.getCurrentUser = () => ({ hasFlag: () => !0 })),
          r
            .find((t) => t.name === "DeveloperExperimentStore")
            .actionHandler.OVERLAY_INITIALIZE(),
          (n.getCurrentUser = i);
      },
        s = () => {
          c.open({
            content: "Trying to enable experiments...",
            source: a("debug"),
          });
          const n = o("getUsers"),
            r = Object.values(
              o("isDeveloper")._dispatcher._actionHandlers._dependencyGraph
                .nodes
            );
          try {
            r.find(
              (t) => t.name === "ExperimentStore"
            ).actionHandler.OVERLAY_INITIALIZE({ user: { flags: 1 } });
          } catch { }
          const i = n.getCurrentUser;
          (n.getCurrentUser = () => ({ hasFlag: () => !0 })),
            r
              .find((t) => t.name === "DeveloperExperimentStore")
              .actionHandler.OVERLAY_INITIALIZE(),
            (n.getCurrentUser = i),
            c.open({
              content: "Experiments have been successfully enabled.",
              source: a("Check"),
            });
        },
        u = () => {
          e(),
            setTimeout(() => {
              s();
            }, 100);
        };
      setTimeout(() => {
        u();
      }, 300);
    },
    onStop() { },
  };
d(p);

