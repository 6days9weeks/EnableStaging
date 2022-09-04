import { Plugin, registerPlugin } from "enmity/managers/plugins";
import { getByProps } from "enmity/metro";
import { Dialog } from "enmity/metro/common";
import { reload } from "enmity/api/native";

const EnableStaging: Plugin = {
  ...{
    name: "EnableStaging",
    version: "2.0.2",
    description: "Bypasses experiment gate. Fuck you aj.",
    authors: [
      {
        name: "dia ♡",
        id: "696828906191454221",
      },
    ],
    color: "#a0939d",
  },

  onStart() {
    const UserStore = getByProps("getUsers");
    const nodes = Object.values(
      getByProps("isDeveloper")._dispatcher._actionHandlers._dependencyGraph
        .nodes
    );
    try {
      nodes
        .find((x) => x.name === "ExperimentStore")
        .actionHandler["OVERLAY_INITIALIZE"]({ user: { flags: 1 } });
    } catch {}
    const oldUser = UserStore.getCurrentUser;
    UserStore.getCurrentUser = () => {
      return { hasFlag: () => true };
    };
    nodes
      .find((x) => x.name === "DeveloperExperimentStore")
      .actionHandler["OVERLAY_INITIALIZE"]();
    UserStore.getCurrentUser = oldUser;
  },

  onStop() {
    const wannaReload = () => {
      Dialog.show({
        title: "Experiments Disabled.",
        body: "Disabling Experiments requires a restart, would you like to restart Discord?",
        confirmText: "Yes",
        cancelText: "No",
        onConfirm: reload,
      });
    };
    wannaReload();
  },
};

registerPlugin(EnableStaging);
