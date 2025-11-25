import path from "path";
import fs from "fs";

export function loadHtmlTemplate(templateName: string): string {
	const templatePath = path.join(
		process.cwd(),
		"app",
		"templates",
		templateName
	);
	return fs.readFileSync(templatePath, "utf-8");
}
