import os, time
from PIL import Image, ImageFilter
from scipy.ndimage import binary_fill_holes
import numpy as np
from concurrent.futures import ProcessPoolExecutor

os.makedirs('assets/disassemble_frames', exist_ok=True)

def process_single_frame(idx):
    in_path = f'assets/frames/ezgif-frame-{idx:03d}.jpg'
    out_path = f'assets/disassemble_frames/frame_{idx:03d}.webp'
    
    # Load original 1280x720 frame (do not downscale for maximum retina sharpness!)
    im = Image.open(in_path).convert('RGB')
    rgb = np.array(im, dtype=np.float32)

    bg_color = np.array([227.0, 228.0, 220.0])
    diff = np.sqrt(np.sum((rgb - bg_color) ** 2, axis=2))

    is_shoe = diff > 13.5
    # Cut floor shadow (below Y=596 on 720p image)
    is_shoe[596:, :] = False
    is_shoe = binary_fill_holes(is_shoe)

    alpha = (is_shoe * 255).astype(np.uint8)
    alpha_im = Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(radius=0.8))

    rgba = np.zeros((720, 1280, 4), dtype=np.uint8)
    rgba[:, :, :3] = np.clip(rgb, 0, 255).astype(np.uint8)
    rgba[:, :, 3] = np.array(alpha_im)

    out = Image.fromarray(rgba, 'RGBA')
    # Unsharp mask enhances leather micro-textures, stitching, and metallic SAMBA foil
    out = out.filter(ImageFilter.UnsharpMask(radius=1.2, percent=140, threshold=2))
    out.save(out_path, format='WEBP', quality=95)
    return idx

if __name__ == '__main__':
    t0 = time.time()
    with ProcessPoolExecutor() as executor:
        results = list(executor.map(process_single_frame, range(1, 151)))
    print(f'Successfully generated all {len(results)} ultra-HD 1280x720 frames in {time.time()-t0:.2f}s!')
