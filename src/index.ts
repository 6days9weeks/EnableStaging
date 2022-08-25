import { Plugin, registerPlugin } from "enmity/managers/plugins";
import { getByProps, getModule } from "enmity/metro";
import * as Assets from "enmity/api/assets";
const Toast = getModule(
  (m) =>
    m.open !== undefined &&
    m.close !== undefined &&
    !m.openLazy &&
    !m.startDrag &&
    !m.init &&
    !m.openReplay &&
    !m.openChannelCallPopout
);
const EnableStaging: Plugin = {
  ...{
    name: "EnableStaging",
    version: "2.0.0",
    description: "Bypasses experiment gate, fuck you aj.",
    authors: [
      {
        name: "dia ♡",
        id: "696828906191454221",
      },
    ],
    color: "#a0939d",
  },

  onStart() {
    const plugin = () => {
      Toast.open({
        content: `Trying to enable experiments...`,
        source: Assets.getIDByName("debug"),
      });
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
      Toast.open({
        content: `Experiments have been successfully enabled.`,
        source: Assets.getIDByName("Check"),
      });
    };

    setTimeout(() => {
      plugin();
    }, 300); // give Flux some time to initialize -- 300ms should be more than enough
  },

  onStop() {},
};

registerPlugin(EnableStaging);
