import ClientsTable from "./components/clients-table";

const ClientManagement = () => {
  return (
    <div className="flex flex-col  h-screen container px-12 pt-5 ">
      <h1 className="text-2xl font-bold">Client Management</h1>
      <p className="text-gray-600">
        Manage clients, view statuses, and business information
      </p>
      <div className="pt-10">
        <ClientsTable />
      </div>
    </div>
  );
};
export default ClientManagement;
