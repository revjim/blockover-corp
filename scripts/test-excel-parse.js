const XLSX = require('xlsx');
const fs = require('fs');

const filePath = process.env.HOME + '/Downloads/Itemized_Report_2025.xlsx';

if (!fs.existsSync(filePath)) {
  console.error('File not found:', filePath);
  process.exit(1);
}

const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0];
console.log('Sheet name:', sheetName);
console.log('---');

const worksheet = workbook.Sheets[sheetName];
const jsonData = XLSX.utils.sheet_to_json(worksheet);

console.log('Total rows:', jsonData.length);
console.log('---');

if (jsonData.length > 0) {
  console.log('Column names (first row):');
  console.log(Object.keys(jsonData[0]));
  console.log('---');

  console.log('First 3 rows of data:');
  console.log(JSON.stringify(jsonData.slice(0, 3), null, 2));
}
