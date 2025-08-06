import OrganizationTable from "./components/organization-table";

const OrganizationManagement = () => {
  return (
    <div className="flex flex-col h-screen container px-12 pt-5">
      <h1 className="text-2xl font-bold">Organization Management</h1>
      <p className="text-gray-600">
        Manage all branches and locations of your organization in one place.
      </p>
      <div className="pt-10">
        <OrganizationTable />
      </div>
    </div>
  );
};

export default OrganizationManagement;