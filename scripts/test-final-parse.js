const XLSX = require('xlsx');

const filePath = process.env.HOME + '/Downloads/Itemized_Report_2025.xlsx';
const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Try parsing normally first
let jsonData = XLSX.utils.sheet_to_json(worksheet);

// Check if first row looks like a title row
if (jsonData.length > 0 && jsonData[0]) {
  const firstRowKeys = Object.keys(jsonData[0]);
  if (firstRowKeys.some(key => key.startsWith('__EMPTY')) ||
      firstRowKeys.some(key => key.includes('Itemized Report'))) {
    console.log('Detected Amazon Vine Itemized Report format');
    console.log('Re-parsing from row 3 with headers from row 3...\n');
    jsonData = XLSX.utils.sheet_to_json(worksheet, { range: 2 });
  }
}

console.log('Column names:', Object.keys(jsonData[0] || {}));
console.log('Total data rows:', jsonData.length);
console.log('---\n');

console.log('Sample orders (first 5):');
for (let i = 0; i < Math.min(5, jsonData.length); i++) {
  const row = jsonData[i];
  console.log(`\nOrder ${i + 1}:`);
  console.log('  Order Number:', row["Order Number"]);
  console.log('  ASIN:', row["ASIN"]);
  console.log('  Product:', row["Product Name"]?.substring(0, 60) + '...');
  console.log('  Type:', row["Order Type"]);
  console.log('  Date:', row["Order Date"]);
  console.log('  Value:', row["Estimated Tax Value"]);
}

// Check for cancellations
const cancellations = jsonData.filter(row =>
  row["Order Type"]?.toUpperCase() === "CANCELLATION"
);
console.log('\n---');
console.log('Total cancellations found:', cancellations.length);

if (cancellations.length > 0) {
  console.log('\nSample cancellation:');
  const c = cancellations[0];
  console.log('  Order Number:', c["Order Number"]);
  console.log('  ASIN:', c["ASIN"]);
  console.log('  Product:', c["Product Name"]?.substring(0, 60));
  console.log('  Cancelled Date:', c["Cancelled Date"]);
}

// Count unique ASINs
const uniqueAsins = new Set(jsonData.map(row => row["ASIN"]).filter(Boolean));
console.log('\n---');
console.log('Unique ASINs:', uniqueAsins.size);
console.log('Total orders (including cancellations):', jsonData.length);
