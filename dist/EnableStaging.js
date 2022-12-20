function t(o) {
  window.enmity.plugins.registerPlugin(o);
}
function m(...o) {
  return window.enmity.modules.getByProps(...o);
}
const d = window.enmity.modules.common.Dialog;
const { native: e } = window.enmity;
function s() {
  e.reload();
}
const w = {
  name: "EnableStaging",
  version: "3.0.0",
  description: "Bypasses experiment gate. Fuck you aj.",
  authors: [{ name: "dia \u2661", id: "696828906191454221" }],
  color: "#2F3136",
  onStart() {
    const o = m("getCurrentUser"),
      i = m("getSerializedState");
    (o.getCurrentUser().flags |= 1),
      o._dispatcher._actionHandlers
        ._computeOrderedActionHandlers("OVERLAY_INITIALIZE")
        .forEach(function (n) {
          n.name.includes("Experiment") &&
            n.actionHandler({
              serializedExperimentStore: i.getSerializedState(),
              user: { flags: 1 },
            });
        });
  },
  onStop() {
    d.show({
      title: "Experiments Disabled.",
      body: "Disabling Experiments requires a restart, would you like to restart Discord?",
      confirmText: "Yes",
      cancelText: "No",
      onConfirm: s,
    });
  },
};
t(w);
