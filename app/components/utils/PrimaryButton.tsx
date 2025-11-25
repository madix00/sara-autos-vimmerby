"use client";

import Link from "next/link";

const PrimaryButton = ({
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
		" cursor-pointer bg-primary text-secondary font-medium px-6 py-3 rounded-md text-sm flex items-center justify-center " +
		(fullWidth ? "w-full" : "w-fit");

	const combinedClass = `${baseClass} ${className ?? ""}`; // combine here

	if (submit) {
		return (
			<button type="submit" onClick={onClick} className={combinedClass}>
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
			type={submit ? "submit" : "button"}
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

export default PrimaryButton;
