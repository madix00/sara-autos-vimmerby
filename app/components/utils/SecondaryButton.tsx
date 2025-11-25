"use client";

import Link from "next/link";

const SecondaryButton = ({
	title,
	onClick,
	href,
	fullWidth,
	icon,
	iconBefore,
	iconAfter,
	submit,
	className,
}: {
	title: string;
	onClick?: () => void;
	href: string;
	fullWidth?: boolean;
	icon?: React.ReactNode;
	iconBefore?: React.ReactNode;
	iconAfter?: React.ReactNode;
	submit?: boolean;
	className?: string;
}) => {
	const baseClass =
		"cursor-pointer bg-secondary text-white px-6 font-medium py-3 rounded-md text-sm w-fit flex items-center justify-center " +
		(fullWidth ? "w-full" : "w-fit");

	const combinedClass = `${baseClass} ${className ?? ""}`;

	if (submit) {
		return (
			<button type="submit" onClick={onClick} className={baseClass}>
				{iconBefore && <span className="mr-2">{icon}</span>}
				<span>{title}</span>
				{iconAfter && <span className="ml-2">{icon}</span>}
			</button>
		);
	}
	return (
		<Link
			onClick={(e) => {
				if (onClick) {
					e.preventDefault();
					onClick();
				}
			}}
			href={href}
			className={combinedClass}
		>
			{iconBefore && <span className="mr-2">{icon}</span>}
			<span className={`${iconBefore && "mr-3"} ${iconAfter && "ml-3"}`}>
				{title}
			</span>
			{iconAfter && <span className="ml-2">{icon}</span>}
		</Link>
	);
};

export default SecondaryButton;
