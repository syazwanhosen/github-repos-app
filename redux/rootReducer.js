import { combineReducers } from "redux";
import repoReducer from "./repos/repoSlice";

const rootReducer = combineReducers({
  repos: repoReducer,
});

export default rootReducer;
