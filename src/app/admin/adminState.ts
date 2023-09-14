import { observable } from "@legendapp/state";
import { enableReactUse } from "@legendapp/state/config/enableReactUse";
import { ObservablePersistLocalStorage } from "@legendapp/state/persist-plugins/local-storage";
import { persistObservable } from "@legendapp/state/persist";
import { Item } from "~/backend/db";

enableReactUse();

export const state$ = observable<{ items: Item[] }>({
  items: [],
});

persistObservable(state$, {
  persistLocal: ObservablePersistLocalStorage,
  local: "state",
});
