const puppeteer = require("puppeteer");
const pdftk = require("node-pdftk");
("use strict");
const cloudinary = require("cloudinary");
const fs = require("fs");
const { PDFDocument, StandardFonts } = require("pdf-lib");
const axios = require("axios");

const mergePDF_Func = async (pdfUrls, res) => {
  try {
    // const pdfUrls = [];
    // pdfUrls.push(BI_PDFF);
    // pdfUrls.push(Pro_PDFF);

    console.log("====================>>>>>>>>>>>>>>>>>>>pdfUrls   ==", pdfUrls);
    //const outputPath = 'merged.pdf';
    return new Promise(async (resolve, reject) => {
      const mergedPdf = await PDFDocument.create();
      for (const url of pdfUrls) {
        console.log("=========================>>>>>>>>>>>>>>>>>>>urlurl", url);
        const response = await axios.get(url, {
          responseType: "arraybuffer",
        });

        const pdfBytes = response.data;
        console.log("------------pdfBytes -----------data----------", pdfBytes);
        const pdfDoc = await PDFDocument.load(pdfBytes);
        const copiedPages = await mergedPdf.copyPages(
          pdfDoc,
          pdfDoc.getPageIndices()
        );
        copiedPages.forEach((page) => mergedPdf.addPage(page));
      }

      const mergedPdfBytes = await mergedPdf.save();

      let fileNameHashed = "Merged_PDF" + Date.now();

      console.log(
        "------------------------- fileNameHashed  ---------------------   ",
        fileNameHashed
      );
       resolve(mergedPdfBytes)
    }).catch((error) => {
      if (error) {
        console.log(error);
        return reject(error);
      }
    });
    //}
  } catch (error) {}
};

module.exports = {
  mergePDF_Func: mergePDF_Func,
};
