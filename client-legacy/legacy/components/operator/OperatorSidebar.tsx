import { FC } from "react";
import { Users, Calendar, Box, LogOut, UserPlus, Gift } from "react-feather";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { signOut } from "@/api/authApi";

const OperatorSidebar: FC = () => {
	const navigate = useNavigate();

	const handleSignOut = async () => {
		await signOut();
		navigate("/login", { replace: true });
	};

	const navigationItems = [
		{ name: "Clients", path: "/clients", icon: Users },
		{ name: "Resources", path: "/resources", icon: Box },
		{ name: "Referrals", path: "/referrals", icon: UserPlus },
		{ name: "Rewards", path: "/rewards-management", icon: Gift }, // Update path here
		{
			name: "Availability",
			path: "/resource-availability",
			icon: Calendar,
		},
	];

	return (
		<div className="flex flex-col h-screen bg-[#150c2b] text-white duration-200 group w-24 hover:w-64">
			{/* Logo */}
			<div className="flex items-center justify-center py-6">
				<img src="/logo_white.png" alt="" className="w-16 my-4" />
			</div>

			{/* Navigation Links */}
			<ul className="flex flex-col w-full">
				{navigationItems.map((item) => (
					<li key={item.path}>
						<NavLink
							to={item.path}
							className="flex h-10 my-2 items-center hover:bg-[#32ffa8] hover:text-[#150c2b]"
						>
							<div className="min-w-[6rem] flex justify-center">
								<item.icon className="h-6 w-6" />
							</div>
							<span className="opacity-0 group-hover:opacity-100 transition-opacity duration-100 font-bold">
								{item.name}
							</span>
						</NavLink>
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

export default OperatorSidebar;
