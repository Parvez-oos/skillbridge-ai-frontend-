const fs = require('fs');
const path = require('path');

// SkillBridge AI Brand Colors
const PRIMARY = { r: 99, g: 102, b: 241 };   // #6366F1
const ACCENT = { r: 139, g: 92, b: 246 };     // #8B5CF6
const BG_DARK = { r: 9, g: 9, b: 11 };        // #09090B
const WHITE = { r: 255, g: 255, b: 255 };

function createPNG(width, height, pixelFunc) {
  // PNG signature
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8;  // bit depth
  ihdrData[9] = 6;  // color type: RGBA
  ihdrData[10] = 0; // compression
  ihdrData[11] = 0; // filter
  ihdrData[12] = 0; // interlace
  const ihdr = createChunk('IHDR', ihdrData);

  // IDAT chunk (raw image data with zlib)
  const rawData = [];
  for (let y = 0; y < height; y++) {
    rawData.push(0); // filter byte: None
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = pixelFunc(x, y, width, height);
      rawData.push(r, g, b, a);
    }
  }
  const compressed = deflate(Buffer.from(rawData));
  const idat = createChunk('IDAT', compressed);

  // IEND chunk
  const iend = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdr, idat, iend]);
}

function createChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);
  const typeBuffer = Buffer.from(type, 'ascii');
  const crcData = Buffer.concat([typeBuffer, data]);
  const crc = crc32(crcData);
  const crcBuffer = Buffer.alloc(4);
  crcBuffer.writeUInt32BE(crc, 0);
  return Buffer.concat([length, typeBuffer, data, crcBuffer]);
}

// CRC32 implementation
function crc32(buf) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < buf.length; i++) {
    crc ^= buf[i];
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0);
    }
  }
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

// zlib deflate (simplified - store blocks)
function deflate(data) {
  const MAX_BLOCK = 65535;
  const blocks = [];

  for (let i = 0; i < data.length; i += MAX_BLOCK) {
    const isLast = i + MAX_BLOCK >= data.length;
    const block = data.slice(i, Math.min(i + MAX_BLOCK, data.length));

    // Header: BFINAL=1/0, BTYPE=00 (no compression)
    const header = isLast ? 0x01 : 0x00;
    const len = block.length;
    const nlen = (~len) & 0xFFFF;

    const blockBuf = Buffer.alloc(5 + block.length);
    blockBuf[0] = header;
    blockBuf.writeUInt16LE(len, 1);
    blockBuf.writeUInt16LE(nlen, 3);
    block.copy(blockBuf, 5);
    blocks.push(blockBuf);
  }

  // Adler32 checksum
  let a = 1, b = 0;
  for (let i = 0; i < data.length; i++) {
    a = (a + data[i]) % 65521;
    b = (b + a) % 65521;
  }
  const adler = ((b << 16) | a) >>> 0;
  const adlerBuf = Buffer.alloc(4);
  adlerBuf.writeUInt32BE(adler, 0);

  // zlib header: CMF=0x78 (deflate, window 32768), FLG=0x01
  return Buffer.concat([Buffer.from([0x78, 0x01]), ...blocks, adlerBuf]);
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function colorLerp(c1, c2, t) {
  return {
    r: Math.round(lerp(c1.r, c2.r, t)),
    g: Math.round(lerp(c1.g, c2.g, t)),
    b: Math.round(lerp(c1.b, c2.b, t)),
  };
}

function drawIcon(x, y, w, h) {
  const cx = w / 2;
  const cy = h / 2;
  const maxR = Math.min(w, h) / 2;
  const dx = x - cx;
  const dy = y - cy;
  const dist = Math.sqrt(dx * dx + dy * dy);

  // Rounded square mask
  const cornerR = maxR * 0.22;
  const halfSize = maxR * 0.85;
  const ix = Math.abs(x - cx);
  const iy = Math.abs(y - cy);

  // Check if inside rounded square
  let inside = false;
  if (ix <= halfSize && iy <= halfSize) {
    if (ix <= halfSize - cornerR || iy <= halfSize - cornerR) {
      inside = true;
    } else {
      const cdx = ix - (halfSize - cornerR);
      const cdy = iy - (halfSize - cornerR);
      if (Math.sqrt(cdx * cdx + cdy * cdy) <= cornerR) {
        inside = true;
      }
    }
  }

  if (!inside) return [0, 0, 0, 0];

  // Background gradient
  const gradT = dist / maxR;
  const bg = colorLerp(BG_DARK, { r: 20, g: 20, b: 28 }, gradT * 0.5);

  // Draw "S" lettermark
  const sWidth = maxR * 0.38;
  const sHeight = maxR * 0.55;
  const sx = (x - cx) / sWidth;
  const sy = (y - cy) / sHeight;

  // S-curve paths (two arcs)
  const topArcY = sy + 0.35;
  const botArcY = sy - 0.35;
  const topDist = Math.sqrt(sx * sx + topArcY * topArcY);
  const botDist = Math.sqrt(sx * sx + botArcY * botArcY);
  const strokeW = 0.28;

  const inTopArc = topDist > 0.65 - strokeW && topDist < 0.65 + strokeW && sy < 0.05;
  const inBotArc = botDist > 0.65 - strokeW && botDist < 0.65 + strokeW && sy > -0.05;
  const inMidLine = Math.abs(sx) < strokeW * 1.2 && Math.abs(sy) < strokeW * 1.8;

  const inS = inTopArc || inBotArc || inMidLine;

  if (inS) {
    // Gradient from primary to accent
    const t = (sy + 0.5);
    const c = colorLerp(PRIMARY, ACCENT, Math.max(0, Math.min(1, t)));
    // Subtle inner glow
    const glowFactor = 1 - Math.min(1, Math.abs(topDist - 0.65) / strokeW) * 0.3;
    return [
      Math.min(255, c.r + 30),
      Math.min(255, c.g + 30),
      Math.min(255, c.b + 30),
      255
    ];
  }

  // Subtle glow around the S
  const sProximity = inTopArc || inBotArc ? 0 : Math.min(
    topDist > 0.65 ? topDist - 0.65 : 0.65 - topDist,
    botDist > 0.65 ? botDist - 0.65 : 0.65 - botDist
  );
  if (sProximity < 0.15 && !inS) {
    const glowAlpha = (1 - sProximity / 0.15) * 0.15;
    return [
      Math.min(255, bg.r + PRIMARY.r * glowAlpha),
      Math.min(255, bg.g + PRIMARY.g * glowAlpha),
      Math.min(255, bg.b + PRIMARY.b * glowAlpha),
      255
    ];
  }

  return [bg.r, bg.g, bg.b, 255];
}

// Generate icons
const publicDir = path.join(__dirname, '..', 'public');

console.log('Generating icon-192.png...');
const icon192 = createPNG(192, 192, drawIcon);
fs.writeFileSync(path.join(publicDir, 'icon-192.png'), icon192);
console.log('  -> icon-192.png (' + icon192.length + ' bytes)');

console.log('Generating icon-512.png...');
const icon512 = createPNG(512, 512, drawIcon);
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), icon512);
console.log('  -> icon-512.png (' + icon512.length + ' bytes)');

console.log('Generating apple-touch-icon.png...');
const appleIcon = createPNG(180, 180, drawIcon);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleIcon);
console.log('  -> apple-touch-icon.png (' + appleIcon.length + ' bytes)');

console.log('Generating favicon.png (32x32)...');
const faviconPng = createPNG(32, 32, drawIcon);
fs.writeFileSync(path.join(publicDir, 'favicon.png'), faviconPng);
console.log('  -> favicon.png (' + faviconPng.length + ' bytes)');

// Generate ICO file (contains 16x16 and 32x32)
console.log('Generating favicon.ico...');
const icon16 = createPNG(16, 16, drawIcon);

// ICO format
const icoHeader = Buffer.alloc(6);
icoHeader.writeUInt16LE(0, 0);     // reserved
icoHeader.writeUInt16LE(1, 2);     // type: icon
icoHeader.writeUInt16LE(2, 4);     // count: 2 images

const icoDir1 = Buffer.alloc(16);
icoDir1[0] = 16;                   // width
icoDir1[1] = 16;                   // height
icoDir1[2] = 0;                    // color palette
icoDir1[3] = 0;                    // reserved
icoDir1.writeUInt16LE(1, 4);       // color planes
icoDir1.writeUInt16LE(32, 6);      // bits per pixel
icoDir1.writeUInt32LE(icon16.length, 8);  // size
icoDir1.writeUInt32LE(22, 12);     // offset (6 + 16 + 16)

const icoDir2 = Buffer.alloc(16);
icoDir2[0] = 32;                   // width
icoDir2[1] = 32;                   // height
icoDir2[2] = 0;                    // color palette
icoDir2[3] = 0;                    // reserved
icoDir2.writeUInt16LE(1, 4);       // color planes
icoDir2.writeUInt16LE(32, 6);      // bits per pixel
icoDir2.writeUInt32LE(faviconPng.length, 8);  // size
icoDir2.writeUInt32LE(22 + icon16.length, 12); // offset

const ico = Buffer.concat([icoHeader, icoDir1, icoDir2, icon16, faviconPng]);
fs.writeFileSync(path.join(publicDir, 'favicon.ico'), ico);
console.log('  -> favicon.ico (' + ico.length + ' bytes)');

console.log('\nAll icons generated successfully!');
