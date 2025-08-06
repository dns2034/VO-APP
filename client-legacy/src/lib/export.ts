import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

type ExportToPDFOptions = {
  title?: string;
  columns: { header: string; dataKey: string }[];
  data: Record<string, unknown>[];
  orientation?: 'portrait' | 'landscape';
  unit?: 'pt' | 'mm' | 'cm' | 'in';
  format?: string | number[];
};

/**
 * Export data to PDF
 * 
 * @param options - The options for the PDF
 * @example
 * const pdf = exportToPDF({
 *   title: 'Booking History',
 *   columns: [{ header: 'Name', dataKey: 'name' }],
 *   data: [{ name: 'John Doe' }],
 * });
 * pdf.save('booking-history.pdf');
 */
export function exportToPDF({
  title,
  columns,
  data,
  orientation = 'portrait',
  unit = 'mm',
  format = 'a4',
}: ExportToPDFOptions): jsPDF {
  const doc = new jsPDF({ orientation, unit, format });

  if (title) {
    doc.setFontSize(16);
    doc.text(title, 14, 20);
  }

  autoTable(doc, {
    head: [columns.map(col => col.header)],
    body: data.map(row =>
      columns.map(col => row[col.dataKey] ?? '')
    ),
    startY: title ? 30 : 10,
  });

  return doc;
}