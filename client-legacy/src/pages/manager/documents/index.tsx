import { DocumentsTable } from "./components/documents-table";

const ManagerDocumentsPage = () => {
  return (
    <div className="flex flex-col min-h-screen container px-2 md:px-12 pt-5">
      <div className="flex justify-between items-center flex-col md:flex-row w-full">
        <div className="w-full md:w-auto text-left mb-4 md:mb-0">
          <h1 className="text-2xl font-bold">Manager Documents</h1>
          <p className="text-gray-600">This is the documents management page.</p>
        </div>
      </div>
      <div className="pt-10 w-full">
        <DocumentsTable />
      </div>
    </div>
  );
};

export default ManagerDocumentsPage;