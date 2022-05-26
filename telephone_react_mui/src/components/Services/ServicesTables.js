import React from "react";
import MaterialTable from "material-table";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import Search from "@material-ui/icons/Search";
import ViewColumn from "@material-ui/icons/ViewColumn";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { forwardRef } from "react";
import {
  BASE_URL,
  createAPIEndpointService,
  ENDPOINTS,
} from "./../../api/index";
import axios from "axios";
import { useState } from "react";

const tableIcons = {
  Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
  phone: forwardRef((props, ref) => <LocalPhoneIcon {...props} ref={ref} />),
  Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
  Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
  Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
  Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
  FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
  LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
  NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
  Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
  SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
  ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
  ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
};
const ServicesTables = (props) => {
  const { ServiceList, selectedCorpsClick, SetServiceList } = props;
  const [selectedRow, setSelectedRow] = useState(null);
  console.log("serviceList = ", ServiceList);
  const handleUpdateClick = (oldData, newData) => {
    if (newData) {
      console.log("newData = ", newData);
      console.log("oldData = ", oldData);
      newData = { ...newData, tel: parseInt(newData.tel) };
      if (validate(newData)) {
        createAPIEndpointService(ENDPOINTS.SERVICES)
          .update(oldData.serviceId, newData)
          .then((res) => {
            SetServiceList(
              ServiceList.map((x) =>
                x.serviceId == newData.serviceId
                  ? {
                      ...x,
                      fullName: newData.fullName,
                      tel: newData.tel,
                    }
                  : x
              )
            );
            //setOpen(false);
            alert("done");
          })
          .catch((err) => console.log(err));
      }
    }
  };

  const fetchServicesListes = async (id) => {
    const response = await axios
      .get(BASE_URL + "Services/GetListServices?id=" + id)
      .catch((err) => {
        console.log("Error axios =", err);
      });
    const data = JSON.stringify(response);
    console.log("servies listes = ", data);
    SetServiceList(response.data);
    return data;
  };
  const handleAddClick = (newData) => {
    if (newData) {
      const NewService = {
        corpsID: selectedCorpsClick.corpsId,
        fullName: newData.fullName,
        shortName: newData.fullName,
        tel: parseInt(newData.tel),
      };

      if (validate(newData)) {
        createAPIEndpointService(ENDPOINTS.SERVICES)
          .create(NewService)
          .then((res) => {
            fetchServicesListes(selectedCorpsClick.corpsId);
          })
          .catch((err) => console.log(err));
      }
    }
  };
  const handleDeleteClick = (Data) => {
    if (validate(Data)) {
      createAPIEndpointService(ENDPOINTS.SERVICES)
        .delete(Data.serviceId)
        .then((res) => {
          SetServiceList(
            ServiceList.filter((x) => x.serviceId != Data.serviceId)
          );
        })
        .catch((err) => console.log(err));
    }
  };
  const validate = (values) => {
    let temp = {};
    temp.fullName = values.fullName == "" ? false : true;
    temp.fullName = values.shortName == "" ? false : true;
    temp.imageSrc = values.Tel == "" ? false : true;

    return Object.values(temp).every((x) => x == true);
  };
  return (
    <>
      <MaterialTable
        icons={tableIcons}
        title="أرقام الهواتف"
        columns={[
          { title: "المصلحة", field: "fullName" },
          {
            title: "الهاتف",
            field: "tel",
            type: "numeric",
            validate: (rowData) =>
              rowData.tel < 10000
                ? { isValid: true, helperText: "رقم الهاتف يتكون من 5 أرقام" }
                : true,
          },
          {
            title: "",
            render: (rowData) => (
              <LocalPhoneIcon style={{ width: 50, borderRadius: "50%" }} />
            ),
          },
        ]}
        data={ServiceList}
        // actions={[
        //   (rowData) => ({
        //     icon: LocalPhoneIcon,
        //     tooltip: 'Delete User',
        //     //onClick: (event, rowData) =>
        //     // alert('You want to delete ' + rowData.service),
        //     // disabled: rowData.birthYear < 2000,
        //   }),
        // ]}
        options={{
          filtering: true,
        }}
        editable={{
          onRowAdd: (newData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                // setData([...data, newData]);
                handleAddClick(newData);
                resolve();
              }, 1000);
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                // const dataUpdate = [...data];
                // const index = oldData.tableData.id;
                // dataUpdate[index] = newData;
                // setData([...dataUpdate]);
                handleUpdateClick(oldData, newData);

                resolve();
              }, 1000);
            }),
          onRowDelete: (oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                // const dataDelete = [...data];
                // const index = oldData.tableData.id;
                // dataDelete.splice(index, 1);
                // setData([...dataDelete]);
                handleDeleteClick(oldData);
                resolve();
              }, 1000);
            }),
        }}
        onRowClick={(evt, selectedRow) =>
          setSelectedRow(selectedRow.tableData.id)
        }
        options={{
          rowStyle: (rowData) => ({
            backgroundColor:
              selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
          }),
        }}
      />
    </>
  );
};

export default ServicesTables;
