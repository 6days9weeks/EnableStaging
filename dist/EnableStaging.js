function c(e) {
  window.enmity.plugins.registerPlugin(e);
}
function w(e, s) {
  return window.enmity.modules.getModule(e, s);
}
function i(...e) {
  return window.enmity.modules.getByProps(...e);
}
window.enmity.modules.common,
  window.enmity.modules.common.Constants,
  window.enmity.modules.common.Clipboard,
  window.enmity.modules.common.Assets,
  window.enmity.modules.common.Messages,
  window.enmity.modules.common.Clyde,
  window.enmity.modules.common.Avatars,
  window.enmity.modules.common.Native,
  window.enmity.modules.common.React,
  window.enmity.modules.common.Dispatcher,
  window.enmity.modules.common.Storage,
  window.enmity.modules.common.Toasts;
const u = window.enmity.modules.common.Dialog;
window.enmity.modules.common.Token,
  window.enmity.modules.common.REST,
  window.enmity.modules.common.Settings,
  window.enmity.modules.common.Users,
  window.enmity.modules.common.Navigation,
  window.enmity.modules.common.NavigationNative,
  window.enmity.modules.common.NavigationStack,
  window.enmity.modules.common.Theme,
  window.enmity.modules.common.Linking,
  window.enmity.modules.common.StyleSheet,
  window.enmity.modules.common.ColorMap,
  window.enmity.modules.common.Components,
  window.enmity.modules.common.Locale,
  window.enmity.modules.common.Profiles,
  window.enmity.modules.common.Lodash,
  window.enmity.modules.common.Logger,
  window.enmity.modules.common.Flux,
  window.enmity.modules.common.SVG,
  window.enmity.modules.common.Scenes,
  window.enmity.modules.common.Moment;
const { native: t } = window.enmity;
function y() {
  t.reload();
}
t.version, t.build, t.device, t.version;
function r(e) {
  return window.enmity.assets.getIDByName(e);
}
const l = w(
    (e) =>
      e.open !== void 0 &&
      e.close !== void 0 &&
      !e.openLazy &&
      !e.startDrag &&
      !e.init &&
      !e.openReplay &&
      !e.openChannelCallPopout
  ),
  g = {
    name: "EnableStaging",
    version: "2.0.1",
    description: "Bypasses experiment gate. Fuck you aj.",
    authors: [{ name: "dia \u2661", id: "696828906191454221" }],
    color: "#a0939d",
    onStart() {
      const e = () => {
          const o = i("getUsers"),
            m = Object.values(
              i("isDeveloper")._dispatcher._actionHandlers._dependencyGraph
                .nodes
            );
          try {
            m.find(
              (n) => n.name === "ExperimentStore"
            ).actionHandler.OVERLAY_INITIALIZE({ user: { flags: 1 } });
          } catch {}
          const d = o.getCurrentUser;
          (o.getCurrentUser = () => ({ hasFlag: () => !0 })),
            m
              .find((n) => n.name === "DeveloperExperimentStore")
              .actionHandler.OVERLAY_INITIALIZE(),
            (o.getCurrentUser = d);
        },
        s = () => {
          l.open({
            content: "Trying to enable experiments...",
            source: r("debug"),
          });
          const o = i("getUsers"),
            m = Object.values(
              i("isDeveloper")._dispatcher._actionHandlers._dependencyGraph
                .nodes
            );
          try {
            m.find(
              (n) => n.name === "ExperimentStore"
            ).actionHandler.OVERLAY_INITIALIZE({ user: { flags: 1 } });
          } catch {}
          const d = o.getCurrentUser;
          (o.getCurrentUser = () => ({ hasFlag: () => !0 })),
            m
              .find((n) => n.name === "DeveloperExperimentStore")
              .actionHandler.OVERLAY_INITIALIZE(),
            (o.getCurrentUser = d),
            l.open({
              content: "Experiments have been successfully enabled.",
              source: r("Check"),
            });
        },
        a = () => {
          e(),
            setTimeout(() => {
              s();
            }, 100);
        };
      setTimeout(() => {
        a();
      }, 300);
    },
    onStop() {
      u.show({
        title: "Experiments Disabled.",
        body: "Disabling Experiments requires a restart, would you like to restart Discord?",
        confirmText: "Yes",
        cancelText: "No",
        onConfirm: y,
      });
    },
  };
c(g);
