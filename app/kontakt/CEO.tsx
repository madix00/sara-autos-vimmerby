export default function CEO() {
	return (
		<>
			<div className="lg:mt-6 lg:w-80 lg:flex-none">
				<figure className="mt-10">
					{/* <motion.div
            initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, amount: 1 }}
          > */}
					<blockquote className="text-lg/8 font-semibold  text-text-default">
						<p>
							"Kontakta oss idag för att veta hur vi kan hjälpa er att köpa
							eller sälja bil till rätt pris!"
						</p>
					</blockquote>
					{/* </motion.div> */}
					<figcaption className="mt-10 flex gap-x-6 justify-center items-center">
						<img
							alt=""
							src="https://images.unsplash.com/photo-1757406005026-990a2b022e49?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDZ8fHxlbnwwfHx8fHw%3D&auto=format&fit=crop&q=60&w=600"
							className="size-24 flex-none rounded-full object-cover"
						/>
						<div>
							<div className="text-base font-semibold  text-text-default">
								Perry Sterndalen
							</div>
							<div className="text-sm/6  text-text-muted">
								Verksamhetschef & grundare
							</div>
						</div>
					</figcaption>
				</figure>
			</div>
		</>
	);
}
