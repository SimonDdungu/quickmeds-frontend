import React from 'react';
import TopMedicineData from '@/constants';
import DataTable from './DataTable';
import { Column } from 'primereact/column';
import { Paginator } from 'primereact/paginator';

export default function TopMedicineTable() {
     const monthName = new Date().toLocaleDateString("en-US", { month: "long" });
    return (
        <div className='mt-10'>
            <h2 className='mb-5'>Top Selling Medicine - {monthName}</h2>

            <DataTable data={TopMedicineData}/>
        
            

        </div>
    );
}
        



{/* 
    <div className="card text-sm max-w-fit">
                <DataTable value={TopMedicineData} showGridlines tableStyle={{ minWidth: '50rem' }} size={"small"}>
                    <Column field="name" header="Brand" sortable></Column>
                    <Column field="generic_name" header="Name" sortable></Column>
                    <Column field="sold" header="Sold" sortable></Column>
                </DataTable>
    </div> */}