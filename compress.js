import sharp from 'sharp';
import fs from 'fs';

async function compressImage() {
  try {
    if (fs.existsSync('/input_file_0.png')) {
      await sharp('/input_file_0.png')
        .resize(1280) // 해상도를 조금 더 줄여서 PNG 용량 확보
        .png({ compressionLevel: 9, palette: true }) // PNG 압축 및 팔레트 최적화
        .toFile('/input_file_0_compressed.png');
      console.log('Image compressed successfully');
    } else {
      console.error('Source image not found');
    }
  } catch (error) {
    console.error('Error compressing image:', error);
  }
}

compressImage();
