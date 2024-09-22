import React, { useState,useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise';
import CompanyFilter from './CompanyFilter';


function MyTable() {

  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    fetch('https://www.ag-grid.com/example-assets/space-mission-data.json')
      .then(result => result.json())
      .then(rowData => setRowData(rowData));
   }, [])
    
    
    const pagination = true;
    const paginationPageSize =10;
    const paginationPageSizeSelector = [5, 10, 15,20,25,30,40,50,100];

    // const [columnDefs] = useState([
    //     // {headerName:'trainNumber & trainName',valueGetter:p=>p.data.trainNumber+'-'+p.data.trainName,checkboxSelection: true,flex:1},
    //     { field: 'trainNumber', filter:"agNumberColumnFilter", editable: true, cellEditor: 'agNumberCellEditor'},
    //     { field: 'trainName', filter:"agColumnFilter" },
    //     { field: 'trainType', filter: 'agSetColumnFilter', editable: true,
    //         cellEditor: 'agSelectCellEditor',
    //         cellEditorParams: {
    //             values: ['Shatabdi', 'Rajdhani', 'Express', 'Humsafar', 'Mail', 'Garib Rath', 'Duronto'],
    //         },
    //         filterParams: {
    //           values: ['Rajdhani', 'Express', 'Shatabdi','Humsafar', 'Mail', 'Garib Rath', 'Duronto', 'Venkatesh'],
    //       }
    //     },
    //     { field: 'noOfSeats', valueFormatter: p => p.value.toLocaleString() + " Seats", 
    //         editable: p => p.data.trainType === 'Shatabdi',cellEditor: 'agNumberCellEditor' 
    //     },
    // ]);
    const [colDefs, setColDefs] = useState([
      { field: "mission" },
      { field: "company",filter:CompanyFilter,filterParams:{
        values:['SpaceX','ISRO','Roscosmos'] 
      }},
      { field: "location" },
      { field: "date" },
      { field: "price" },
      { field: "successful" },
      { field: "rocket" }
    ]);
    const defaultColDef = {
        flex: 1,          
        minWidth: 150,    
        sortable: true, 
        floatingFilter:true 
      };
    return (
        <div
          className="ag-theme-alpine"
          style={{ height: 500,width: 1200 }}
        >
          <AgGridReact
            rowData={rowData}                
            columnDefs={colDefs}      
            defaultColDef={defaultColDef} 
            pagination={pagination}
            paginationPageSize={paginationPageSize}
            paginationPageSizeSelector={paginationPageSizeSelector} 
            rowSelection='multiple'         
          />
        </div>
      );
    };

export default MyTable;
