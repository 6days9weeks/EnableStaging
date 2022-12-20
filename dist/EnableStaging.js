function d(o) {
  window.enmity.plugins.registerPlugin(o);
}
function i(...o) {
  return window.enmity.modules.getByProps(...o);
}
const { native: e } = window.enmity;
function w() {
  e.reload();
}
const l = {
  name: "EnableStaging",
  version: "3.0.0",
  description: "Bypasses experiment gate. Fuck you aj.",
  authors: [{ name: "dia \u2661", id: "696828906191454221" }],
  color: "#2F3136",
  onStart() {
    const o = () => {
      const n = i("getCurrentUser"),
        t = i("getSerializedState");
      (n.getCurrentUser().flags |= 1),
        n._dispatcher._actionHandlers
          ._computeOrderedActionHandlers("OVERLAY_INITIALIZE")
          .forEach(function (m) {
            m.name.includes("Experiment") &&
              m.actionHandler({
                serializedExperimentStore: t.getSerializedState(),
                user: { flags: 1 },
              });
          });
    };
    setTimeout(() => {
      o();
    }, 500);
  },
  onStop() {
    s.show({
      title: "Experiments Disabled.",
      body: "Disabling Experiments requires a restart, would you like to restart Discord?",
      confirmText: "Yes",
      cancelText: "No",
      onConfirm: w,
    });
  },
};
d(l);
