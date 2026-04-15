import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Plus, Trash2 } from 'lucide-react';
import { InvoiceData, InvoiceItem } from '../types';
import './InvoiceForm.css';

const initialInvoiceData: InvoiceData = {
  invoiceNo: 'RTS/25-26/062',
  date: '2025-07-20',
  deliveryNote: '',
  termsOfPayment: '',
  ewayBillNo: '',
  vehicleNo: '',
  buyersOrderNo: '',
  buyerOrderDate: '',
  dispatchedDocNo: '',
  deliveryNoteDate: '',
  dispatchedThrough: '',
  destination: '',
  termsOfDelivery: '',
  sellerDetails: {
    name: 'Rejoice Technical Solutions',
    address: '24,1 Street NGR Nagar Anaikadu',
    cityStateZip: 'Tiruppur, Tamil Nadu - 641601',
    gstin: '33EZHPS2716B1ZL',
    stateNameCode: 'Tamil Nadu Code :33',
    email: 'rtssenthilpr@gmail.com',
    mobile: '9629800900'
  },
  buyerDetails: {
    name: '',
    address: '',
    cityStateZip: '',
    gstin: '',
    stateNameCode: '',
    email: '',
    mobile: ''
  },
  items: [
    {
      id: uuidv4(),
      description: 'dust bin holder (basket holder) with gi cotted.',
      hsnSac: '7326',
      quantity: 300,
      rate: 185,
      per: 'nos',
      amount: 55500,
      cgstRate: 9,
      cgstAmount: 4995,
      sgstRate: 9,
      sgstAmount: 4995
    }
  ],
  bankDetails: {
    bankName: 'state Bank of India',
    accountNumber: '35842362408',
    ifscCode: 'SBIN0000935'
  }
};

export const InvoiceForm: React.FC = () => {
  const [data, setData] = useState<InvoiceData>(initialInvoiceData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleSellerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      sellerDetails: { ...prev.sellerDetails, [name]: value }
    }));
  };

  const handleBuyerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      buyerDetails: { ...prev.buyerDetails, [name]: value }
    }));
  };

  const addItem = () => {
    setData(prev => ({
      ...prev,
      items: [...prev.items, {
        id: uuidv4(), description: '', hsnSac: '', quantity: 1, rate: 0, per: 'nos', amount: 0, cgstRate: 9, cgstAmount: 0, sgstRate: 9, sgstAmount: 0
      }]
    }));
  };

  const removeItem = (id: string) => {
    setData(prev => ({ ...prev, items: prev.items.filter(item => item.id !== id) }));
  };

  const handleItemChange = (id: string, field: keyof InvoiceItem, value: any) => {
    setData(prev => {
      const newItems = prev.items.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          // Recalculate
          if (field === 'quantity' || field === 'rate' || field === 'cgstRate' || field === 'sgstRate') {
            updatedItem.amount = Number(updatedItem.quantity) * Number(updatedItem.rate);
            updatedItem.cgstAmount = (updatedItem.amount * Number(updatedItem.cgstRate)) / 100;
            updatedItem.sgstAmount = (updatedItem.amount * Number(updatedItem.sgstRate)) / 100;
          }
          return updatedItem;
        }
        return item;
      });
      return { ...prev, items: newItems };
    });
  };

  const handleBankChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      bankDetails: { ...prev.bankDetails, [name]: value }
    }));
  }

  // Calculate Totals
  const totalQty = data.items.reduce((sum, item) => sum + Number(item.quantity), 0);
  const totalAmount = data.items.reduce((sum, item) => sum + item.amount, 0);
  const totalCGST = data.items.reduce((sum, item) => sum + item.cgstAmount, 0);
  const totalSGST = data.items.reduce((sum, item) => sum + item.sgstAmount, 0);
  const finalTotal = totalAmount + totalCGST + totalSGST;

  return (
    <div className="invoice-container">
      <div className="invoice-header">
        <h1>Tax Invoice Generator</h1>
        <p>Create modern and professional invoices</p>
      </div>

      <div className="form-card">
        <h2 className="section-title">Party Details</h2>
        <div className="grid-2-col">
          {/* Seller Details */}
          <div className="party-details">
            <h3>Bill From (Seller)</h3>
            <div className="input-group">
              <label>Company Name</label>
              <input type="text" name="name" value={data.sellerDetails.name} onChange={handleSellerChange} />
            </div>
            <div className="input-group">
              <label>Address</label>
              <textarea name="address" value={data.sellerDetails.address} onChange={handleSellerChange} rows={2} />
            </div>
            <div className="grid-2-col-inner">
              <div className="input-group">
                <label>City & State</label>
                <input type="text" name="cityStateZip" value={data.sellerDetails.cityStateZip} onChange={handleSellerChange} />
              </div>
              <div className="input-group">
                <label>GSTIN</label>
                <input type="text" name="gstin" value={data.sellerDetails.gstin} onChange={handleSellerChange} />
              </div>
              <div className="input-group">
                <label>State Code</label>
                <input type="text" name="stateNameCode" value={data.sellerDetails.stateNameCode} onChange={handleSellerChange} />
              </div>
              <div className="input-group">
                <label>Mobile</label>
                <input type="text" name="mobile" value={data.sellerDetails.mobile} onChange={handleSellerChange} />
              </div>
            </div>
          </div>

          {/* Buyer Details */}
          <div className="party-details">
            <h3>Bill To (Buyer)</h3>
            <div className="input-group">
              <label>Company Name</label>
              <input type="text" name="name" value={data.buyerDetails.name} onChange={handleBuyerChange} />
            </div>
            <div className="input-group">
              <label>Address</label>
              <textarea name="address" value={data.buyerDetails.address} onChange={handleBuyerChange} rows={2} />
            </div>
            <div className="grid-2-col-inner">
              <div className="input-group">
                <label>City & State</label>
                <input type="text" name="cityStateZip" value={data.buyerDetails.cityStateZip} onChange={handleBuyerChange} />
              </div>
              <div className="input-group">
                <label>GSTIN</label>
                <input type="text" name="gstin" value={data.buyerDetails.gstin} onChange={handleBuyerChange} />
              </div>
              <div className="input-group">
                <label>State Code</label>
                <input type="text" name="stateNameCode" value={data.buyerDetails.stateNameCode} onChange={handleBuyerChange} />
              </div>
              <div className="input-group">
                <label>Mobile</label>
                <input type="text" name="mobile" value={data.buyerDetails.mobile} onChange={handleBuyerChange} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="form-card">
        <h2 className="section-title">Invoice Details</h2>
        <div className="grid-4-col">
          <div className="input-group">
            <label>Invoice No.</label>
            <input type="text" name="invoiceNo" value={data.invoiceNo} onChange={handleInputChange} />
          </div>
          <div className="input-group">
            <label>Date</label>
            <input type="date" name="date" value={data.date} onChange={handleInputChange} />
          </div>
          <div className="input-group">
            <label>Delivery Note</label>
            <input type="text" name="deliveryNote" value={data.deliveryNote} onChange={handleInputChange} />
          </div>
          <div className="input-group">
            <label>Terms of Payment</label>
            <input type="text" name="termsOfPayment" value={data.termsOfPayment} onChange={handleInputChange} />
          </div>
          <div className="input-group">
            <label>Buyer Order No</label>
            <input type="text" name="buyersOrderNo" value={data.buyersOrderNo} onChange={handleInputChange} />
          </div>
          <div className="input-group">
            <label>Dispatched Document No</label>
            <input type="text" name="dispatchedDocNo" value={data.dispatchedDocNo} onChange={handleInputChange} />
          </div>
          <div className="input-group">
            <label>Dispatched Through</label>
            <input type="text" name="dispatchedThrough" value={data.dispatchedThrough} onChange={handleInputChange} />
          </div>
          <div className="input-group">
            <label>Vehicle No</label>
            <input type="text" name="vehicleNo" value={data.vehicleNo} onChange={handleInputChange} />
          </div>
        </div>
      </div>

      <div className="form-card">
        <h2 className="section-title d-flex-between">
          <span>Items Details</span>
          <button className="btn-primary" onClick={addItem}><Plus size={16} /> Add Item</button>
        </h2>

        <div className="table-responsive">
          <table className="items-table">
            <thead>
              <tr>
                <th style={{ width: '30%' }}>Description of Goods</th>
                <th>HSN/SAC</th>
                <th>Qty</th>
                <th>Rate</th>
                <th>Per</th>
                <th>CGST %</th>
                <th>SGST %</th>
                <th>Amount</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <input type="text" value={item.description} onChange={e => handleItemChange(item.id, 'description', e.target.value)} placeholder="Item description" className="w-full" />
                  </td>
                  <td>
                    <input type="text" value={item.hsnSac} onChange={e => handleItemChange(item.id, 'hsnSac', e.target.value)} className="w-full" />
                  </td>
                  <td>
                    <input type="number" value={item.quantity} onChange={e => handleItemChange(item.id, 'quantity', e.target.value)} className="text-right w-full" />
                  </td>
                  <td>
                    <input type="number" value={item.rate} onChange={e => handleItemChange(item.id, 'rate', e.target.value)} className="text-right w-full" />
                  </td>
                  <td>
                    <input type="text" value={item.per} onChange={e => handleItemChange(item.id, 'per', e.target.value)} className="w-full" />
                  </td>
                  <td>
                    <input type="number" value={item.cgstRate} onChange={e => handleItemChange(item.id, 'cgstRate', e.target.value)} className="text-right w-full" />
                  </td>
                  <td>
                    <input type="number" value={item.sgstRate} onChange={e => handleItemChange(item.id, 'sgstRate', e.target.value)} className="text-right w-full" />
                  </td>
                  <td className="text-right font-semibold">
                    {(item.amount || 0).toFixed(2)}
                  </td>
                  <td className="text-center">
                    <button className="btn-danger-icon" onClick={() => removeItem(item.id)}>
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={2} className="text-right font-bold">Total</td>
                <td className="text-right font-bold">{totalQty}</td>
                <td colSpan={4}></td>
                <td className="text-right font-bold">{totalAmount.toFixed(2)}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div className="tax-summary">
          <div className="tax-row"><span>Total Taxable Value:</span> <span>{totalAmount.toFixed(2)}</span></div>
          <div className="tax-row"><span>Total CGST:</span> <span>{totalCGST.toFixed(2)}</span></div>
          <div className="tax-row"><span>Total SGST:</span> <span>{totalSGST.toFixed(2)}</span></div>
          <div className="tax-row final-total"><span>Total Invoice Value:</span> <span>&#8377; {finalTotal.toFixed(2)}</span></div>
        </div>
      </div>

      <div className="form-card">
        <h2 className="section-title">Bank Details</h2>
        <div className="grid-3-col">
          <div className="input-group">
            <label>Bank Name</label>
            <input type="text" name="bankName" value={data.bankDetails.bankName} onChange={handleBankChange} />
          </div>
          <div className="input-group">
            <label>Account Number</label>
            <input type="text" name="accountNumber" value={data.bankDetails.accountNumber} onChange={handleBankChange} />
          </div>
          <div className="input-group">
            <label>IFSC Code</label>
            <input type="text" name="ifscCode" value={data.bankDetails.ifscCode} onChange={handleBankChange} />
          </div>
        </div>
      </div>
    </div>
  );
};
