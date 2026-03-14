import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const projectRoot = process.cwd();
const imagesDir = path.join(projectRoot, 'public', 'images');
const outputDir = path.join(projectRoot, 'public', 'marketing-videos');

const reels = [
  {
    name: 'streetwear-drop-reel',
    frames: ['TShirt.JPG', 'TShirt2.JPG', 'TShirt3.JPG', 'Womens-Tees.JPG'],
  },
  {
    name: 'launch-energy-reel',
    frames: ['Bold-Cover.JPG', 'Book-Cover.JPG', 'IMG_5703.JPG', 'IMG_5708.jpg'],
  },
  {
    name: 'community-fit-reel',
    frames: ['IMG_5699.JPG', 'IMG_5701 (1).JPG', 'IMG_5702.JPG', 'IMG_5707.JPG'],
  },
];

const frameDuration = 1.6;
const transitionDuration = 0.4;
const fps = 30;
const outputWidth = 1280;
const outputHeight = 720;

function ensureFfmpegAvailable() {
  try {
    execFileSync('ffmpeg', ['-version'], { stdio: 'ignore' });
  } catch {
    console.error('FFmpeg is not installed or not on PATH. Install FFmpeg, then rerun: npm run reels:export');
    process.exit(1);
  }
}

function ensureOutputDirectory() {
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }
}

function validateFrames(reel) {
  for (const frame of reel.frames) {
    const framePath = path.join(imagesDir, frame);
    if (!existsSync(framePath)) {
      console.error(`Missing frame for reel "${reel.name}": ${framePath}`);
      process.exit(1);
    }
  }
}

function buildFilterComplex(frameCount) {
  const filters = [];

  for (let i = 0; i < frameCount; i += 1) {
    filters.push(
      `[${i}:v]scale=${outputWidth}:${outputHeight}:force_original_aspect_ratio=increase,crop=${outputWidth}:${outputHeight},format=yuv420p,setsar=1[v${i}]`,
    );
  }

  if (frameCount === 1) {
    return { filterComplex: filters.join(';'), outputLabel: 'v0' };
  }

  let previousLabel = 'v0';
  let offset = frameDuration - transitionDuration;

  for (let i = 1; i < frameCount; i += 1) {
    const nextLabel = i === frameCount - 1 ? 'final' : `x${i}`;
    filters.push(
      `[${previousLabel}][v${i}]xfade=transition=fade:duration=${transitionDuration}:offset=${offset.toFixed(2)}[${nextLabel}]`,
    );
    previousLabel = nextLabel;
    offset += frameDuration - transitionDuration;
  }

  return { filterComplex: filters.join(';'), outputLabel: 'final' };
}

function exportReel(reel) {
  validateFrames(reel);

  const args = ['-y', '-hide_banner', '-loglevel', 'error'];

  for (const frame of reel.frames) {
    args.push('-loop', '1', '-t', String(frameDuration), '-i', path.join(imagesDir, frame));
  }

  const { filterComplex, outputLabel } = buildFilterComplex(reel.frames.length);

  args.push(
    '-filter_complex',
    filterComplex,
    '-map',
    `[${outputLabel}]`,
    '-r',
    String(fps),
    '-pix_fmt',
    'yuv420p',
    '-movflags',
    '+faststart',
    path.join(outputDir, `${reel.name}.mp4`),
  );

  execFileSync('ffmpeg', args, { stdio: 'inherit' });
  console.log(`Created: public/marketing-videos/${reel.name}.mp4`);
}

ensureFfmpegAvailable();
ensureOutputDirectory();

for (const reel of reels) {
  exportReel(reel);
}

console.log('All marketing reels exported.');
