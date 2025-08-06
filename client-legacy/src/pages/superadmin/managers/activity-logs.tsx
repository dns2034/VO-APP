import { DataTable, SortDirection } from "@/components/ui/data-table";
import { createColumnHelper } from "@tanstack/react-table";
import { useEffect, useState } from "react";

interface TUser {
  name: string;
  email: string;
  role: "client" | "manager" | "superadmin";
  target: string;
  action: string;
}

const tableRecords: TUser[] = [
  {
    name: "John Ray Ben Dela Rama",
    email: "johnraybendelarama@incub8space.com",
    role: "client",
    target: "user1",
    action: "Update user information",
  },
  {
    name: "Kurtd Daniel Bigtas",
    email: "kurtddanielbigtas@incub8space.com",
    role: "client",
    target: "user1",
    action: "Update user information",
  },
];

const columnHelper = createColumnHelper<TUser>();

const columns = [
  columnHelper.accessor("name", {
    header: "Name",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("email", {
    header: "Email",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("role", {
    header: () => "Role",
    cell: (info) => info.getValue(),
    footer: (info) => info.column.id,
  }),
  columnHelper.accessor("target", {
    header: "Target",
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor("action", {
    header: "Action",
    cell: (info) => info.getValue(),
  }),
];

const ActivityLogs = () => {
  const [searchfilter, setSearchFilter] = useState<string>("");
  const [records, setRecords] = useState<TUser[]>(tableRecords);

  //@ts-ignore
  async function onFilter(value) {
    setSearchFilter(value as string);
  }

  async function onSort(field: string, direction: SortDirection) {
    console.log(field, direction);
  }

  useEffect(() => {
    if (searchfilter.length > 0) {
      setRecords(
        tableRecords.filter((item) => {
          if (item.email.includes(searchfilter)) {
            return item;
          }
          return null;
        })
      );
    } else {
      setRecords(tableRecords);
    }
  }, [searchfilter]);
  return (
    <div className="w-full min-h-screen flex flex-col justify-start items-start py-6 px-8 gap-y-14">
      <p className="text-3xl font-semibold">Managers Activity Logs</p>
      <div className="w-full">
        <DataTable<TUser>
          noDataText="No activity."
          totalCount={2}
          //@ts-ignore
          columns={columns}
          data={records!}
          onSearchChange={onFilter}
          searchPlaceholder="Search by email"
          searchValue={searchfilter}
          onSortChange={onSort}
        />
      </div>
    </div>
  );
};

export default ActivityLogs;
