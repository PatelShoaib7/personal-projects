let createExcelFile = async function (excelFileName = "", column = [], failedRecords = []) {
    const options = {
      filename: './public/xls/new_lms_report/'.concat(excelFileName)
    };
  
    const workbook = new ExcelJS.stream.xlsx.WorkbookWriter(options);
    const worksheet = workbook.addWorksheet('Sheet1');
    worksheet.columns = column.map(e => ({header: e, key: e}));
  
    failedRecords.forEach(e => {
      worksheet.addRow(e).commit();
    });
    await workbook.commit();
  }


  module.export = {
    createExcelFile :createExcelFile
  }