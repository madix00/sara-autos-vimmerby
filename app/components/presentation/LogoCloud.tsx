export default function LogoCloud({ title }: { title?: string }) {
	return (
		<div className="py-24 sm:py-32">
			{title && (
				<h3 className="text-center font-semibold textsm sm:text-xl tracking-tight mb-5">
					{title}
				</h3>
			)}
			<div className="mx-auto max-w-7xl">
				<div className="mx-auto grid grid-cols-4 items-center gap-x-1 gap-y-1 sm:max-w-xl lg:mx-0 lg:max-w-none overflow-hidden  rounded-2xl">
					<div className="bg-neutral-50 py-8 px-2 col-span-2 lg:col-span-1">
						<img
							alt="Santander"
							src="https://vip-bilar.se/wp-content/uploads/2023/08/santander.png"
							width={158}
							height={48}
							className="max-h-12 w-full object-contain invert"
						/>
					</div>

					<div className="bg-neutral-50 py-8 px-2 col-span-2 lg:col-span-1">
						<img
							alt="Folksam"
							src="https://vip-bilar.se/wp-content/uploads/2023/08/folksam.png"
							width={158}
							height={48}
							className="max-h-12 w-full object-contain invert"
						/>
					</div>

					<div className="bg-neutral-50 py-8 px-2 col-span-2 lg:col-span-1">
						<img
							alt="MY MONEY"
							src="https://vip-bilar.se/wp-content/uploads/2023/08/mymoney.png"
							width={158}
							height={48}
							className="max-h-12 w-full object-contain invert"
						/>
					</div>

					<div className="bg-neutral-50 py-8 px-2 col-span-2 lg:col-span-1">
						<img
							alt="SVEA"
							src="https://vip-bilar.se/wp-content/uploads/2023/08/sveavit.png"
							width={158}
							height={48}
							className="max-h-12 w-full object-contain invert "
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
