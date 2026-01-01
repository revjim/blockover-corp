const XLSX = require('xlsx');

const filePath = process.env.HOME + '/Downloads/Itemized_Report_2025.xlsx';
const workbook = XLSX.readFile(filePath);
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];

// Get the raw sheet data to see the structure
const range = XLSX.utils.decode_range(worksheet['!ref']);
console.log('Sheet range:', worksheet['!ref']);
console.log('Rows:', range.e.r + 1);
console.log('Columns:', range.e.c + 1);
console.log('---');

// Show first 5 rows, all columns
console.log('First 5 rows (raw):');
for (let R = 0; R <= Math.min(4, range.e.r); R++) {
  console.log(`\nRow ${R}:`);
  for (let C = 0; C <= range.e.c; C++) {
    const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
    const cell = worksheet[cellAddress];
    if (cell) {
      console.log(`  Col ${C} (${String.fromCharCode(65 + C)}): ${cell.v}`);
    }
  }
}
