import { Plugin, registerPlugin } from "enmity/managers/plugins";
import { getByProps } from "enmity/metro";
import { Dialog } from "enmity/metro/common";
import { reload } from "enmity/api/native";

const EnableStaging: Plugin = {
  name: "EnableStaging",
  version: "3.0.0",
  description: "Bypasses experiment gate. Fuck you aj.",
  authors: [
    {
      name: "dia ♡",
      id: "696828906191454221",
    },
  ],
  color: "#2F3136",

  onStart() {
    const e = () => {
      // modified from a desktop snippet
      // don't know who originally made it but
      // thanks Dziurwa <3  
      const CurrentUserStore = getByProps("getCurrentUser");
      const SerialState = getByProps("getSerializedState");
      CurrentUserStore.getCurrentUser().flags |= 1;
      CurrentUserStore._dispatcher._actionHandlers
        ._computeOrderedActionHandlers("OVERLAY_INITIALIZE")
        .forEach(function (e) {
          e.name.includes("Experiment") &&
            e.actionHandler({
              serializedExperimentStore: SerialState.getSerializedState(),
              user: { flags: 1 },
            });
        });
    };
    setTimeout(() => {
      e();
    }, 500);
  },

  onStop() {
    Dialog.show({
      title: "Experiments Disabled.",
      body: "Disabling Experiments requires a restart, would you like to restart Discord?",
      confirmText: "Yes",
      cancelText: "No",
      onConfirm: reload,
    });
  },
};

registerPlugin(EnableStaging);
