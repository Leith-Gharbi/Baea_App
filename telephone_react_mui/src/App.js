import { useHistory } from "react-router-dom";
import { Switch, Route, useParams } from "react-router-dom";
import CorpsListes from "./components/Corps/CorpsListes";
import MenuAppBar from "./components/controls/MenuAppBar";
import SimpleBottomNavigation from "./components/controls/SimpleBottomNavigation";
import BaseListes from "./components/Bases/baseListes";
import FileUploadComponent from "./components/FileUploadComponent";
import ReportsCard from "./components/Reports/ReportsCard";
import ReportsListes from "./components/Reports/ReportsListes";
import FilesListes from "./components/Files/FilesListes";
import DocumentLists from "./components/Documents/DocumentLists";

function App() {
  const history = useHistory();
  console.log("history= ", history);

  return (
    <>
      <Switch>
        <Route path="/base" children={<CorpsListes />} />
        <Route path="/Report" children={<ReportsListes />} />
        <Route path="/Documents" children={<DocumentLists />} />
        <Route path="/Files" children={<FilesListes />} />
        <Route path="/:id" children={<Child />} />
        <Route exact path="/">
          <BaseListes></BaseListes>
        </Route>
      </Switch>
    </>
  );
}

function Child() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { id, name } = useParams();

  return (
    <div>
      <CorpsListes name={name} id={id} />
    </div>
  );
}

export default App;
