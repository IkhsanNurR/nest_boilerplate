import puppeteer, { Browser, Page, LaunchOptions } from 'puppeteer';
import { APP_AREA } from '../env/env.config';

interface GeneratePDFOptions {
	html: string;
	is_save?: boolean | string;
	file_name?: string | null;
	customCSS?: string | null;
	typeCSS?: 'url' | 'path' | 'content' | null;
	locationCSS?: string | null;
	file_path?: string | null;
	landscape?: boolean;
	size?: 'A4' | 'A5';
}

let data_browser: LaunchOptions = {};

switch (APP_AREA) {
	case 'DOCKER':
		data_browser = {
			headless: true,
			args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
			executablePath: '/app/chrome/linux-116.0.5793.0/chrome-linux64/chrome',
			dumpio: true,
		};
		break;
	case 'WIN':
		data_browser = {
			headless: true,
			args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
			executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
			dumpio: true,
		};
		break;
	case 'PM2':
		data_browser = {
			headless: true,
			args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
			executablePath: '/usr/bin/chromium-browser',
			dumpio: true,
		};
		break;
	case 'MACARM':
		data_browser = {
			headless: true,
			args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
			dumpio: true,
		};
		break;
	default:
		data_browser = {
			headless: true,
			args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
			executablePath: '/usr/bin/chromium-browser',
			dumpio: true,
		};
		break;
}

export const generatePDF = async (options: GeneratePDFOptions): Promise<Buffer> => {
	let browser: Browser | null = null;
	let page: Page | null = null;

	try {
		browser = await puppeteer.launch(data_browser);
		page = await browser.newPage();

		if (options.size === 'A5') {
			await page.setViewport({ width: 420, height: 595 });
		} else {
			await page.setViewport({ width: 595, height: 842 });
		}

		await page.setContent(options.html);

		if (options.customCSS) {
			switch (options.typeCSS) {
				case 'url':
					await page.addStyleTag({ url: options.locationCSS ?? '' });
					break;
				case 'path':
					await page.addStyleTag({ path: options.locationCSS ?? '' });
					break;
				case 'content':
					await page.addStyleTag({ content: options.locationCSS ?? '' });
					break;
			}
		}

		const pdfBuffer: Buffer = Buffer.from(await page.pdf({ printBackground: true, landscape: options.landscape ?? false, format: options.size ?? 'A4' }));
		return pdfBuffer;
	} catch (error) {
		console.error('Error generating PDF:', error);
		throw new Error(`Failed to generate PDF: ${(error as Error).message}`);
	} finally {
		if (page) await page.close();
		if (browser) await browser.close();
	}
};
