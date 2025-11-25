export default function Utrustning({ data }: { data: string[] }) {
	// 1. Sort alphabetically
	const sorted = [...data].sort((a, b) => a.localeCompare(b));

	// 2. Split evenly into two columns
	const mid = Math.ceil(sorted.length / 2);
	const col1 = sorted.slice(0, mid);
	const col2 = sorted.slice(mid);
	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 sm:gap-4 text-text-default">
			<ul>
				{col1.map((item, index) => (
					<li key={index} className="text-xs mb-3">
						{item}
					</li>
				))}
			</ul>
			<ul>
				{col2.map((item, index) => (
					<li key={index} className="text-xs mb-3">
						{item}
					</li>
				))}
			</ul>
		</div>
	);
}
