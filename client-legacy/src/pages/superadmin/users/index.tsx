import UserTable from "../users/components/user-table";

const UserManagement = () => {
  return (
    <div className="flex flex-col  h-screen container px-12 pt-5 ">
      <h1 className="text-2xl font-bold">User Management</h1>
      <p className="text-gray-600">
        Manage users, view statuses, and easily activate or deactivate accounts
      </p>
      <div className="pt-10">
        <UserTable />
      </div>
    </div>
  );
};
export default UserManagement;
