"use client";

import { Toaster } from "sonner";

export function ClientToaster() {
	return (
		<Toaster
			position="bottom-right"
			richColors
			toastOptions={{
				style: {
					minWidth: "400px",
					fontSize: "18px",
					padding: "32px 40px",
					borderRadius: "12px",
				},
			}}
		/>
	);
}
