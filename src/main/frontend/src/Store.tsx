import {
  createStore,
  createTypedHooks,
  Action,
  action,
  persist,
} from "easy-peasy";

type inputs = {
  name: string;
  room: string;
};

interface messagesReturn {
  message: string;
  room: string;
  user: string;
}

export interface StoreModel {
  roomstate: undefined | inputs;
  users: string[];
  updateUsers: Action<StoreModel, string[]>;
  enterRoom: Action<StoreModel, inputs>;
  leaveRoom: Action<StoreModel>;
  messages: messagesReturn[];
  updateMessages: Action<StoreModel, messagesReturn[]>;
}

export const store = createStore<StoreModel>(
  persist({
    roomstate: undefined,
    users: [""],
    updateUsers: action((state, payload) => {
      state.users = payload;
    }),
    enterRoom: action((state, payload) => {
      state.roomstate = payload;
    }),
    messages: [{ message: "", room: "", user: "" }],
    updateMessages: action((state, payload) => {
      state.messages = payload;
    }),
    leaveRoom: action((state, payload) => {
      state.roomstate = undefined;
    }),
  })
);

const typedHooks = createTypedHooks<StoreModel>();
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
