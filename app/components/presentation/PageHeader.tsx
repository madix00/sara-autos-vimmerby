"use client";

import { motion } from "framer-motion";

export default function PageHeader({
	header,
	desc,
}: {
	header: string;
	desc: string;
}) {
	return (
		<div className="sm:text-center mt-20">
			<div className="mx-auto max-w-2xl">
				<motion.p
					initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
					animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
					transition={{ duration: 0.9, delay: 0.1, ease: "easeOut" }}
					className=" text-3xl font-semibold tracking-tight text-balance text-text-default sm:text-5xl"
				>
					{header}
				</motion.p>

				<motion.p
					initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
					animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
					transition={{ duration: 0.9, delay: 0.5, ease: "easeOut" }}
					className="mt-6 text-base/6 sm:text-lg/8 text-text-muted"
				>
					{desc}
				</motion.p>
			</div>
		</div>
	);
}
