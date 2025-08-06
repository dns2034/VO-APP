import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import GenerateQRCodeModal from "./generate-qr-code-modal";
import { UpdateResourceTypeModal } from "./update-resource-type-modal";

type Resource = {
  id: string;
  name: string;
  description: string;
  spaceType: string;
  status: "Enabled" | "Disabled";
  qrCode: string | null;
};

const statusOptions = ["All Statuses", "Enabled", "Disabled"] as const;
const resourceOptions = [
  "All Spaces",
  "Co-Working Space",
  "Conference Room A",
] as const;

export const ResourceManagementTable = () => {
  const [searchValue, setSearchValue] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<(typeof statusOptions)[number]>("All Statuses");
  const [resourceFilter, setResourceFilter] =
    useState<(typeof resourceOptions)[number]>("All Spaces");
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedResource, setSelectedResource] = useState<Resource | null>(
    null
  );
  const [qrCodeOpen, setQRCodeOpen] = useState(false);

  const data: Resource[] = [
    {
      id: "1",
      name: "Co-Working Space",
      description: "Abccddd......",
      spaceType: "Desk",
      status: "Enabled",
      qrCode: "some-qr-code",
    },
    {
      id: "2",
      name: "Meeting Room A",
      description: "Abccd......",
      spaceType: "Meeting Room",
      status: "Disabled",
      qrCode: null,
    },
  ];

  const filteredData = data.filter((resource) => {
    const matchesSearch =
      resource.name.toLowerCase().includes(searchValue.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchValue.toLowerCase());

    const matchesStatus =
      statusFilter === "All Statuses" || resource.status === statusFilter;
    const matchesResource =
      resourceFilter === "All Spaces" || resource.name === resourceFilter;

    return matchesSearch && matchesStatus && matchesResource;
  });

  const columns = [
    {
      id: "name",
      header: "Space Name",
      cell: ({ row }: { row: { original: Resource } }) => row.original.name,
      sortable: true,
    },
    {
      id: "description",
      header: "Description",
      cell: ({ row }: { row: { original: Resource } }) =>
        row.original.description,
    },
    {
      id: "spaceType",
      header: "Space Type",
      cell: ({ row }: { row: { original: Resource } }) =>
        row.original.spaceType,
    },
    {
      id: "status",
      header: "Status",
      cell: ({ row }: { row: { original: Resource } }) => (
        <span
          className={`px-2 py-1 rounded-full text-xs ${
            row.original.status === "Enabled"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {row.original.status}
        </span>
      ),
    },
    {
      id: "qrCode",
      header: "QR Code",
      cell: ({ row }: { row: { original: Resource } }) =>
        row.original.qrCode ? (
          <Button variant="link" className="h-4 p-0">
            View
          </Button>
        ) : (
          <span className="text-muted-foreground">No QR Yet</span>
        ),
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }: { row: { original: Resource } }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              onClick={() => {
                setSelectedResource(row.original);
                setUpdateModalOpen(true);
              }}
            >
              Update
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                console.log("Generate QR Code", row.original.id);
                setQRCodeOpen(true);
              }}
            >
              Generate QR Code
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Disable", row.original.id)}
              className={row.original.status === "Disabled" ? "hidden" : ""}
            >
              Disable
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Enable", row.original.id)}
              className={row.original.status === "Enabled" ? "hidden" : ""}
            >
              Enable
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => console.log("Delete", row.original.id)}
              className="text-red-600 focus:text-red-600"
            >
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  const filters = (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{statusFilter}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {statusOptions.map((option) => (
            <DropdownMenuItem
              key={option}
              onClick={() => setStatusFilter(option)}
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">{resourceFilter}</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {resourceOptions.map((option) => (
            <DropdownMenuItem
              key={option}
              onClick={() => setResourceFilter(option)}
            >
              {option}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );

  return (
    <>
      <DataTable<Resource>
        columns={columns}
        data={filteredData}
        searchPlaceholder="Search by name, organization..."
        searchValue={searchValue}
        onSearchChange={setSearchValue}
        filters={filters}
        page={1}
        pageSize={10}
        totalCount={filteredData.length}
        showDatePicker={false}
      />

      {selectedResource && (
        <UpdateResourceTypeModal
          open={updateModalOpen}
          onOpenChange={setUpdateModalOpen}
          onSubmit={(data) => {
            console.log("Update resource with:", data);
          }}
          initialData={{
            name: selectedResource.name,
            description: selectedResource.description,
            spaceType: selectedResource.spaceType,
          }}
        />
      )}
      <GenerateQRCodeModal
        open={qrCodeOpen}
        setClose={() => {
          setQRCodeOpen(false);
        }}
      />
    </>
  );
};
