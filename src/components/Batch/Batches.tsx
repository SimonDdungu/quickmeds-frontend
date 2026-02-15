'use client'

import { BatchSearchQuery, BatchType } from '@/interfaces'
import { useState } from 'react'
import { AddBatchDialog, DeleteBatchDialog, EditBatchDialog } from './QuickActions'
import TextSearchFields, { DateSearchFields, NumberSearchFields } from './SearchFields'
import { Search, XCircle } from 'lucide-react'

import { useBatches } from '@/hooks/inventory/useBatch'
import Image from 'next/image'
import { Pagination } from '../Global'

interface BatchCardProps {
  batch: Partial<BatchType>
}

export const BatchCards = ({batch, }: BatchCardProps) => {
  const [editOpen, setEditOpen] = useState<boolean>(false)
  const [deleteOpen, setDeleteOpen] = useState<boolean>(false)

  const Price = Number(batch.selling_price_per_unit)

  return (
    <div className='flex flex-col gap-y-2 w-60 bg-white rounded-lg shadow p-5'>
      <h6 className='text-xs text-gray-700'>{batch.batch_number}</h6>
      <div className='size-40 mx-auto rounded-lg overflow-hidden border-2 border-gray-200 mb-2 relative'>
        <Image src={batch?.medicine_details?.image ?? ""} alt={batch?.medicine_details?.name ?? ""} fill className='w-full h-full object-cover' unoptimized/>
      </div>
      <div>
        <h5 className='text-center'>{batch?.medicine_details?.name ?? ""}</h5>
        <p className='text-sm mb-2 text-center'>{batch?.medicine_details?.generic_name ?? ""}</p>
        <p className='text-center mb-2'>UGX {Price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) ?? "..."}</p>

        <div className='text-xs border p-2 rounded-lg space-y-1 text-gray-700'>
          <p>Qty received: {batch.quantity_received ?? ""}</p>
          <p>Qty remaining: {batch.quantity_remaining ?? ""}</p>
          <p>Dosage: {batch?.medicine_details?.dosage_form ?? ""}</p>
          <p>exp: {batch.expiry_date ?? ""}</p>
        </div>

        
      </div>

      <div className='mt-2 flex gap-x-5 text-xs items-center justify-center'>
        <button onClick={() => setEditOpen(true)} className='px-4 py-1 bg-blue-800 hover:bg-blue-900 text-white rounded-lg cursor-pointer transition-colors'>
          Edit
        </button>
        <button className='px-4 py-1 bg-gray-800 hover:bg-gray-900 text-white rounded-lg cursor-pointer transition-colors'>
          View
        </button>
        <button onClick={() => setDeleteOpen(true)} className='px-4 py-1 bg-red-800 hover:bg-red-900 text-white rounded-lg cursor-pointer transition-colors'>
          Delete
        </button>
      </div>


      <EditBatchDialog open={editOpen} setOpen={setEditOpen} batch={batch}/>
      <DeleteBatchDialog open={deleteOpen} setOpen={setDeleteOpen} batch={batch}/>
    </div>
  )
}

export default function Batches() {
  const [page, setPage] = useState<number>(1)
  const [batch_number, setBatchNumber] = useState<string | undefined>(undefined)
  const [search, setSearch] = useState<string | undefined>(undefined)

  const [wholesaler, setWholesaler] = useState<string | undefined>(undefined)
  const [selling_price_per_unit, setSelling_price_per_unit] = useState<number | undefined>(undefined)
  const [selling_price_minimum, setSelling_price_minimum] = useState<number | undefined>(undefined)
  const [selling_price_maximum, setSelling_price_maximum] = useState<number | undefined>(undefined)

  const [purchase_price, setPurchase_price] = useState<number | undefined>(undefined)
  const [purchase_price_minimum, setPurchase_price_minimum] = useState<number | undefined>(undefined)
  const [purchase_price_maximum, setPurchase_price_maximum] = useState<number | undefined>(undefined)

  const [quantity_received, setQuantity_received] = useState<number | undefined>(undefined)
  const [quantity_received_min, setQuantity_received_min] = useState<number | undefined>(undefined)
  const [quantity_received_max, setQuantity_received_max] = useState<number | undefined>(undefined)

  const [quantity_remaining, setQuantity_remaining] = useState<number | undefined>(undefined)
  const [quantity_remaining_min, setQuantity_remaining_min] = useState<number | undefined>(undefined)
  const [quantity_remaining_max, setQuantity_remaining_max] = useState<number | undefined>(undefined)

  const [expiry_date, setExpiry_date] = useState<string | undefined>(undefined)
  const [expiry_date_from, setExpiry_date_from] = useState<string | undefined>(undefined)
  const [expiry_date_to, setExpiry_date_to] = useState<string | undefined>(undefined)

  const [searchQuery, setSearchQuery] = useState<BatchSearchQuery>({ 
    search: undefined, batch_number: undefined, medicine: undefined, medicine_generic: undefined, wholesaler: undefined, purchase_price: undefined, 
    purchase_price_maximum: undefined, purchase_price_minimum: undefined, selling_price_maximum: undefined, selling_price_minimum: undefined,
    selling_price_per_unit: undefined, quantity_received: undefined, quantity_received_max: undefined, quantity_received_min: undefined, 
    quantity_remaining: undefined, quantity_remaining_max: undefined, quantity_remaining_min: undefined, expiry_date: undefined, expiry_date_from: undefined,
    expiry_date_to: undefined
  });

  const { data } = useBatches({page: page, ...searchQuery})

  const batches: BatchType[] = data?.results ?? []

  console.log("FETCHED BATCHES: ", batches)

  const clearSearchQueries = () => {
    setBatchNumber(undefined)
    setWholesaler(undefined)
    setSearch(undefined)

    setSelling_price_per_unit(undefined)
    setSelling_price_minimum(undefined)
    setSelling_price_maximum(undefined)
    setPurchase_price(undefined)
    setPurchase_price_minimum(undefined)

    setPurchase_price_maximum(undefined)
    setQuantity_received(undefined)
    setQuantity_received_min(undefined)
    setQuantity_received_max(undefined)
    setQuantity_remaining(undefined)
    setQuantity_remaining_min(undefined)
    setQuantity_remaining_max(undefined)
    setExpiry_date(undefined)
    setExpiry_date_from(undefined)
    setExpiry_date_to(undefined)


    setSearchQuery({ 
      search: undefined, batch_number: undefined, wholesaler: undefined, purchase_price: undefined, 
      purchase_price_maximum: undefined, purchase_price_minimum: undefined, selling_price_maximum: undefined, selling_price_minimum: undefined,
      selling_price_per_unit: undefined, quantity_received: undefined, quantity_received_max: undefined, quantity_received_min: undefined, 
      quantity_remaining: undefined, quantity_remaining_max: undefined, quantity_remaining_min: undefined, expiry_date: undefined, expiry_date_from: undefined,
      expiry_date_to: undefined
    })
  }

  return (
    <div>
          <div className='flex justify-between items-end mb-15'>
              <form onSubmit={(e) => {e.preventDefault(); setSearchQuery({batch_number, search, wholesaler, purchase_price, purchase_price_maximum, purchase_price_minimum, selling_price_maximum, selling_price_minimum, selling_price_per_unit, quantity_received, quantity_received_max, quantity_received_min, quantity_remaining, quantity_remaining_max, quantity_remaining_min, expiry_date, expiry_date_from, expiry_date_to})}} className='flex flex-col gap-x-3 gap-y-5'>
                <div className='flex flex-wrap gap-3  items-end'>
                  <TextSearchFields label='Batch Number' name='batch_number' value={batch_number} onChange={setBatchNumber}/>
                  <TextSearchFields label='Medicine' name='medicine' value={search} onChange={setSearch}/>
                  <TextSearchFields label='Wholesaler' name='wholesaler' value={wholesaler} onChange={setWholesaler}/>
                  <NumberSearchFields label='Purchase price' name='purchase_price' value={purchase_price} onChange={setPurchase_price}/>
                  <NumberSearchFields label='Selling price' name='selling_price_per_unit' value={selling_price_per_unit} onChange={setSelling_price_per_unit}/>
                  
                  <div className='flex gap-3 items-end'>
                  <NumberSearchFields label='Purchase price Min' name='purchase_price_minimum' value={purchase_price_minimum} onChange={setPurchase_price_minimum}/>
                  <p className='mb-1'>{" - "}</p>
                  <NumberSearchFields label='Purchase price Max' name='purchase_price_maximum' value={purchase_price_maximum} onChange={setPurchase_price_maximum}/>

                  <NumberSearchFields label='Selling price Min' name='selling_price_minimum' value={selling_price_minimum} onChange={setSelling_price_minimum}/>
                  <p className='mb-1'>{" - "}</p>
                  <NumberSearchFields label='Selling price Max' name='selling_price_maximum' value={selling_price_maximum} onChange={setSelling_price_maximum}/>
                  </div>

                  <NumberSearchFields label='Quantity received' name='quantity_received' value={quantity_received} onChange={setQuantity_received}/>
                  <NumberSearchFields label='Quantity received Min' name='quantity_received_min' value={quantity_received_min} onChange={setQuantity_received_min}/>
                  <p className='mb-1'>{" - "}</p>
                  <NumberSearchFields label='Quantity received Max' name='quantity_received_max' value={quantity_received_max} onChange={setQuantity_received_max}/>
                  
                  <NumberSearchFields label='Quantity remaining' name='quantity_remaining' value={quantity_remaining} onChange={setQuantity_remaining}/>
                  <NumberSearchFields label='Quantity remaining Min' name='quantity_remaining_min' value={quantity_remaining_min} onChange={setQuantity_remaining_min}/>
                  <p className='mb-1'>{" - "}</p>
                  <NumberSearchFields label='Quantity remaining Max' name='quantity_remaining_max' value={quantity_remaining_max} onChange={setQuantity_remaining_max}/>

                  <DateSearchFields label='Expiry Date' name='expiry_date' value={expiry_date} onChange={setExpiry_date}/>
                  <DateSearchFields label='Expiry Date From' name='expiry_date_from' value={expiry_date_from} onChange={setExpiry_date_from}/>
                  <p className='mb-1'>{" - "}</p>
                  <DateSearchFields label='Expiry Date To' name='expiry_date_to' value={expiry_date_to} onChange={setExpiry_date_to}/>


                  <div className='ml-5 flex gap-x-3'>
                    <button type='submit' className=' cursor-pointer text-gray-700 bg-gray-200 hover:bg-blue-100 rounded-full p-2 transition-colors'>
                      <Search size={22}/>
                    </button>
                    <button type='button' onClick={clearSearchQueries} className=' cursor-pointer text-gray-700 bg-gray-200 hover:bg-blue-100 rounded-full p-2 transition-colors'>
                      <XCircle size={22}/>
                    </button>
                </div>
                </div>

                
              </form>
                <AddBatchDialog />
            </div>

            
            <div className='flex flex-row flex-wrap gap-x-4 gap-y-6 justify-center items-center'>
              {batches.map((batch) => (
                <BatchCards 
                  key={batch.id} 
                  batch={batch}
                />
              ))}
            </div>

            <Pagination totalCount={data?.count ?? 0} pageSize={10} page={page} onPageChange={setPage}/>
          

    </div>
  )
}
