import { NextRequest } from 'next/server';
import JSZip from 'jszip';
import fs from 'node:fs';
import path from 'node:path';

export const dynamic = 'force-dynamic';

const IGNORED_DIRS = new Set([
  'node_modules',
  '.next',
  '.git',
  '.devcontainer',
]);

const IGNORED_FILES = new Set([
  'bun.lock',
]);

async function addDirectoryToZip(dirPath: string, rootPath: string, zip: JSZip) {
  const entries = await fs.promises.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.relative(rootPath, fullPath).replace(/\\/g, '/');

    if (entry.isDirectory()) {
      if (IGNORED_DIRS.has(entry.name)) {
        continue;
      }
      await addDirectoryToZip(fullPath, rootPath, zip);
    } else if (entry.isFile()) {
      if (IGNORED_FILES.has(entry.name) || entry.name.endsWith('.log')) {
        continue;
      }
      try {
        const content = await fs.promises.readFile(fullPath);
        zip.file(relativePath, content);
      } catch (readErr) {
        console.warn(`Could not read file for zip: ${relativePath}`, readErr);
      }
    }
  }
}

/**
 * Endpoint generating a clean project ZIP archive excluding node_modules and build artifacts
 */
export async function GET(_req: NextRequest) {
  try {
    const zip = new JSZip();
    const rootDir = process.cwd();

    await addDirectoryToZip(rootDir, rootDir, zip);

    const zipBuffer = await zip.generateAsync({
      type: 'nodebuffer',
      compression: 'DEFLATE',
      compressionOptions: { level: 6 },
    });

    return new Response(zipBuffer, {
      headers: {
        'Content-Type': 'application/zip',
        'Content-Disposition': 'attachment; filename="cbd-master-project.zip"',
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    console.error('Failed to generate project ZIP:', error);
    return new Response(JSON.stringify({ error: 'Chyba při generování ZIP archivu.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
