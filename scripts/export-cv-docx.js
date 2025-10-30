
import fs from 'fs';
import path from 'path';
import htmlDocx from 'html-docx-js';

async function exportDocx() {
    const html = fs.readFileSync(path.resolve('generated/cv-latest.html'), 'utf8');
    const docxBlob = htmlDocx.asBlob(html);
    const arrayBuffer = await docxBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(path.resolve('generated/cv-latest.docx'), buffer);
    console.log('✅ Word CV exported to generated/cv-latest.docx');
}

exportDocx();
