import { FC } from "react";
import {
	Users,
	Calendar,
	Settings,
	BookOpen,
	Shield,
	LogOut,
} from "react-feather";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { signOut } from "@/api/authApi";

const ManagerSidebar: FC = () => {
	const navigate = useNavigate();

	const handleSignOut = async () => {
		await signOut();
		navigate("/login", { replace: true });
	};

	const links = [
		{ to: "/operator-management", icon: Shield, text: "Operator Management" },
		{ to: "/clients", icon: Users, text: "Clients" },
		{ to: "/office-availability", icon: Calendar, text: "Office Availability" },
		{ to: "/resources", icon: BookOpen, text: "Resources" },
		{ to: "/booking-management", icon: Settings, text: "Booking Management" },
	];

	return (
		<div className="flex flex-col h-screen bg-[#150c2b] text-white duration-200 group w-24 hover:w-64">
			{/* Logo */}
			<div className="flex items-center justify-center py-6">
				<img src="/logo_white.png" alt="" className="w-16 my-4" />
			</div>

			{/* Navigation Links */}
			<ul className="flex flex-col w-full">
				{links.map((link) => (
					<li key={link.to}>
						<Link
							to={link.to}
							className="flex h-10 my-2 items-center hover:bg-[#32ffa8] hover:text-[#150c2b]"
						>
							<div className="min-w-[6rem] flex justify-center">
								<link.icon className="h-6 w-6" />
							</div>
							<span className="opacity-0 group-hover:opacity-100 transition-opacity duration-100 font-bold">
								{link.text}
							</span>
						</Link>
					</li>
				))}
			</ul>

			<div className="flex-grow" />

			{/* Sign Out Button */}
			<div className="w-full px-4 pb-4">
				<Button
					onClick={handleSignOut}
					className="w-full flex items-center justify-center space-x-2 hover:bg-[#32ffa8] hover:text-[#150c2b]"
					variant="ghost"
				>
					<LogOut className="h-6 w-6" />
					<span className="opacity-0 group-hover:opacity-100 transition-opacity duration-100 font-bold">
						Sign Out
					</span>
				</Button>
			</div>
		</div>
	);
};

export default ManagerSidebar;
