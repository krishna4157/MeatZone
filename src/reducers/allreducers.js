import counter from "./counter";
// import auth from "./auth";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  counter,
});
export default allReducers;