export interface InvoiceItem {
  id: string;
  description: string;
  hsnSac: string;
  quantity: number;
  rate: number;
  per: string;
  amount: number;
  cgstRate: number;
  cgstAmount: number;
  sgstRate: number;
  sgstAmount: number;
}

export interface InvoiceData {
  invoiceNo: string;
  date: string;
  deliveryNote: string;
  termsOfPayment: string;
  ewayBillNo: string;
  vehicleNo: string;
  buyersOrderNo: string;
  buyerOrderDate: string;
  dispatchedDocNo: string;
  deliveryNoteDate: string;
  dispatchedThrough: string;
  destination: string;
  termsOfDelivery: string;
  
  sellerDetails: {
    name: string;
    address: string;
    cityStateZip: string;
    gstin: string;
    stateNameCode: string;
    email: string;
    mobile: string;
  };

  buyerDetails: {
    name: string;
    address: string;
    cityStateZip: string;
    gstin: string;
    stateNameCode: string;
    email: string;
    mobile: string;
  };

  items: InvoiceItem[];
  
  bankDetails: {
    bankName: string;
    accountNumber: string;
    ifscCode: string;
  };
}
