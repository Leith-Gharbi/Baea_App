import { combineReducers } from "redux";
import { baseReducer, selectedBaseReducer } from "./baseReducer";
import {
  selectedCorpsReducer,
  EditCorpsReducer,
  UpdateCorpsReducer,
  FetchCorpsReducer,
} from "./corpsReducer";
import { loginReducer } from "./AuthReducer";
import { documentReducer } from "./DocumentReducer";
const reducers = combineReducers({
  allBases: baseReducer,
  allDocuments: documentReducer,
  base: selectedBaseReducer,
  corps: selectedCorpsReducer,
  user: loginReducer,
  corpstoEdit: EditCorpsReducer,
  corpstoUpdate: UpdateCorpsReducer,
  corpsList: FetchCorpsReducer,
});

export default reducers;
