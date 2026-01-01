const XLSX = require('xlsx');
const fs = require('fs');

const filePath = process.env.HOME + '/Downloads/Itemized_Report_2025.xlsx';

if (!fs.existsSync(filePath)) {
  console.error('File not found:', filePath);
  process.exit(1);
}

const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Try parsing normally first
let jsonData = XLSX.utils.sheet_to_json(worksheet);

console.log('Initial parse - first row keys:', Object.keys(jsonData[0] || {}));
console.log('---');

// Check if first row looks like a header row (Amazon Vine format)
if (jsonData.length > 0 && jsonData[0]) {
  const firstRowKeys = Object.keys(jsonData[0]);
  if (firstRowKeys.some(key => key.startsWith('__EMPTY')) ||
      firstRowKeys.some(key => key.includes('Itemized Report'))) {
    console.log('Detected title row, re-parsing from row 2...');
    jsonData = XLSX.utils.sheet_to_json(worksheet, { range: 1 });
  }
}

console.log('Final column names:', Object.keys(jsonData[0] || {}));
console.log('---');
console.log('Total data rows:', jsonData.length);
console.log('---');

if (jsonData.length > 0) {
  console.log('First 3 sample rows:');
  for (let i = 0; i < Math.min(3, jsonData.length); i++) {
    const row = jsonData[i];
    console.log(`\nRow ${i + 1}:`);
    console.log('  Order Number:', row["Order Number"]);
    console.log('  ASIN:', row["ASIN"]);
    console.log('  Product Name:', row["Product Name"]?.substring(0, 50) + '...');
    console.log('  Order Type:', row["Order Type"]);
    console.log('  Order Date:', row["Order Date"]);
    console.log('  Estimated Tax Value:', row["Estimated Tax Value"]);
  }
}

// Check for any cancellations
const cancellations = jsonData.filter(row =>
  row["Order Type"]?.toUpperCase() === "CANCELLATION"
);
console.log('\n---');
console.log('Found', cancellations.length, 'cancellation records');

if (cancellations.length > 0) {
  console.log('Sample cancellation:', {
    orderNumber: cancellations[0]["Order Number"],
    asin: cancellations[0]["ASIN"],
    productName: cancellations[0]["Product Name"]?.substring(0, 50),
    cancelledDate: cancellations[0]["Cancelled Date"]
  });
}
