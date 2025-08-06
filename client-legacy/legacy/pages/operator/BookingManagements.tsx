import { FC, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Plus, Edit2, Trash2 } from "react-feather";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

interface Booking {
	id: string;
	resourceId: string;
	userId: string;
	date: string;
	startTime: string;
	endTime: string;
	status: "pending" | "approved" | "rejected" | "cancelled";
}

interface Resource {
	id: string;
	name: string;
	type: string;
}

interface User {
	id: string;
	name: string;
	email: string;
}

// Mock data for bookings
const mockBookings: Booking[] = [
	{
		id: "1",
		resourceId: "resource1",
		userId: "user1",
		date: "2024-01-20",
		startTime: "09:00",
		endTime: "10:00",
		status: "pending",
	},
	// Add more mock data as needed
];

// Mock data for resources and users
const mockResources: Resource[] = [
	{ id: "1", name: "Meeting Room A", type: "Room" },
	{ id: "2", name: "Conference Room B", type: "Room" },
	{ id: "3", name: "Desk 101", type: "Desk" },
];

const mockUsers: User[] = [
	{ id: "1", name: "John Doe", email: "john@example.com" },
	{ id: "2", name: "Jane Smith", email: "jane@example.com" },
	{ id: "3", name: "Bob Wilson", email: "bob@example.com" },
];

const BookingManagements: FC = () => {
	const [bookings, setBookings] = useState<Booking[]>(mockBookings);
	const [isDialogOpen, setIsDialogOpen] = useState(false);
	const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const ITEMS_PER_PAGE = 8;
	const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
	const [resources] = useState<Resource[]>(mockResources);
	const [users] = useState<User[]>(mockUsers);

	const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
	const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
	const currentItems = bookings.slice(indexOfFirstItem, indexOfLastItem);
	const totalPages = Math.ceil(bookings.length / ITEMS_PER_PAGE);

	const updateBookingStatus = (
		bookingId: string,
		newStatus: Booking["status"]
	) => {
		setBookings(
			bookings.map((booking) =>
				booking.id === bookingId ? { ...booking, status: newStatus } : booking
			)
		);
	};

	const handleStatusUpdate = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!editingBooking) return;

		const formData = new FormData(e.currentTarget);
		const newStatus = formData.get("status") as Booking["status"];

		updateBookingStatus(editingBooking.id, newStatus);
		setIsDialogOpen(false);
		setEditingBooking(null);
	};

	const getStatusBadgeClass = (status: Booking["status"]) => {
		const classes = {
			pending: "bg-yellow-100 text-yellow-800",
			approved: "bg-green-100 text-green-800",
			rejected: "bg-red-100 text-red-800",
			cancelled: "bg-gray-100 text-gray-800",
		};
		return classes[status];
	};

	// Add new booking function
	const handleAddBooking = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const formData = new FormData(e.currentTarget);
		const newBooking: Booking = {
			id: Date.now().toString(),
			resourceId: formData.get("resourceId") as string,
			userId: formData.get("userId") as string,
			date: formData.get("date") as string,
			startTime: formData.get("startTime") as string,
			endTime: formData.get("endTime") as string,
			status: "pending",
		};

		setBookings([...bookings, newBooking]);
		setIsAddDialogOpen(false);
	};

	// Delete booking function
	const handleDeleteBooking = (bookingId: string) => {
		if (window.confirm("Are you sure you want to delete this booking?")) {
			setBookings(bookings.filter((booking) => booking.id !== bookingId));
		}
	};

	return (
		<div className="h-[calc(100vh-4rem)] overflow-auto p-4">
			<Card className="min-h-full">
				<div className="p-4 flex flex-col h-full">
					<div className="flex justify-between items-center mb-4">
						<h2 className="text-lg font-semibold">Booking Management</h2>
						<Button
							className="bg-[#7643ea]"
							onClick={() => setIsAddDialogOpen(true)}
						>
							<Plus className="h-4 w-4 mr-2" />
							Add Booking
						</Button>
					</div>

					<div className="flex-1 overflow-auto">
						<Table>
							<TableHeader>
								<TableRow>
									<TableHead>Resource</TableHead>
									<TableHead>User</TableHead>
									<TableHead>Date</TableHead>
									<TableHead>Time</TableHead>
									<TableHead>Status</TableHead>
									<TableHead>Actions</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{currentItems.map((booking) => (
									<TableRow key={booking.id}>
										<TableCell>{booking.resourceId}</TableCell>
										<TableCell>{booking.userId}</TableCell>
										<TableCell>
											{new Date(booking.date).toLocaleDateString()}
										</TableCell>
										<TableCell>{`${booking.startTime} - ${booking.endTime}`}</TableCell>
										<TableCell>
											<span
												className={`px-2 py-1 rounded-full text-sm ${getStatusBadgeClass(
													booking.status
												)}`}
											>
												{booking.status.charAt(0).toUpperCase() +
													booking.status.slice(1)}
											</span>
										</TableCell>
										<TableCell className="space-x-2">
											<Button
												variant="outline"
												size="icon"
												onClick={() => {
													setEditingBooking(booking);
													setIsDialogOpen(true);
												}}
											>
												<Edit2 className="h-4 w-4" />
											</Button>
											<Button
												variant="outline"
												size="icon"
												className="text-red-500"
												onClick={() => handleDeleteBooking(booking.id)}
											>
												<Trash2 className="h-4 w-4" />
											</Button>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</div>

					<div className="mt-4 py-2 flex items-center justify-between border-t">
						<div className="text-sm text-gray-500">
							Showing {indexOfFirstItem + 1} to{" "}
							{Math.min(indexOfLastItem, bookings.length)} of {bookings.length}{" "}
							entries
						</div>
						<div className="flex gap-2">
							<Button
								variant="outline"
								size="sm"
								onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
								disabled={currentPage === 1}
							>
								Previous
							</Button>
							{Array.from({ length: totalPages }, (_, i) => i + 1).map(
								(page) => (
									<Button
										key={page}
										variant={currentPage === page ? "default" : "outline"}
										size="sm"
										onClick={() => setCurrentPage(page)}
									>
										{page}
									</Button>
								)
							)}
							<Button
								variant="outline"
								size="sm"
								onClick={() =>
									setCurrentPage((prev) => Math.min(totalPages, prev + 1))
								}
								disabled={currentPage === totalPages}
							>
								Next
							</Button>
						</div>
					</div>
				</div>

				<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Update Booking Status</DialogTitle>
						</DialogHeader>
						<form onSubmit={handleStatusUpdate} className="space-y-4">
							<div className="space-y-2">
								<Label>Status</Label>
								<select
									name="status"
									className="w-full p-2 border rounded"
									defaultValue={editingBooking?.status}
									required
								>
									<option value="pending">Pending</option>
									<option value="approved">Approved</option>
									<option value="rejected">Rejected</option>
									<option value="cancelled">Cancelled</option>
								</select>
							</div>
							<Button type="submit" className="w-full">
								Update Status
							</Button>
						</form>
					</DialogContent>
				</Dialog>

				{/* Add Booking Dialog */}
				<Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
					<DialogContent>
						<DialogHeader>
							<DialogTitle>Add New Booking</DialogTitle>
						</DialogHeader>
						<form onSubmit={handleAddBooking} className="space-y-4">
							<div className="space-y-2">
								<Label>Resource</Label>
								<select
									name="resourceId"
									className="w-full p-2 border rounded"
									required
								>
									<option value="">Select a resource</option>
									{resources.map((resource) => (
										<option key={resource.id} value={resource.id}>
											{resource.name} - {resource.type}
										</option>
									))}
								</select>
							</div>
							<div className="space-y-2">
								<Label>User</Label>
								<select
									name="userId"
									className="w-full p-2 border rounded"
									required
								>
									<option value="">Select a user</option>
									{users.map((user) => (
										<option key={user.id} value={user.id}>
											{user.name} - {user.email}
										</option>
									))}
								</select>
							</div>
							<div className="space-y-2">
								<Label>Date</Label>
								<input
									name="date"
									type="date"
									className="w-full p-2 border rounded"
									required
								/>
							</div>
							<div className="grid grid-cols-2 gap-4">
								<div className="space-y-2">
									<Label>Start Time</Label>
									<input
										name="startTime"
										type="time"
										className="w-full p-2 border rounded"
										required
									/>
								</div>
								<div className="space-y-2">
									<Label>End Time</Label>
									<input
										name="endTime"
										type="time"
										className="w-full p-2 border rounded"
										required
									/>
								</div>
							</div>
							<Button type="submit" className="w-full">
								Add Booking
							</Button>
						</form>
					</DialogContent>
				</Dialog>
			</Card>
		</div>
	);
};

export default BookingManagements;
