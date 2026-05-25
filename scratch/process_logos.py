import os
from PIL import Image

def process_logo(src_path, dest_prefix, make_dark_copy=True):
    img = Image.open(src_path).convert("RGBA")
    width, height = img.size
    pixels = img.load()
    
    # 1. Clean background and isolate white silhouette
    # We turn any dark or low-alpha pixels completely transparent (0, 0, 0, 0)
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            brightness = 0.299 * r + 0.587 * g + 0.114 * b
            if a < 15 or brightness < 40:
                pixels[x, y] = (0, 0, 0, 0)
            else:
                # Force white to be crisp white
                pixels[x, y] = (255, 255, 255, a)

    # Find bounding box
    min_x, min_y = width, height
    max_x, max_y = 0, 0
    any_pixel = False
    
    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            if a > 15:
                any_pixel = True
                if x < min_x: min_x = x
                if x > max_x: max_x = x
                if y < min_y: min_y = y
                if y > max_y: max_y = y
                
    if not any_pixel:
        print(f"Error: No solid content found in {os.path.basename(src_path)}")
        return

    # Add 10px padding
    padding = 10
    min_x = max(0, min_x - padding)
    min_y = max(0, min_y - padding)
    max_x = min(width - 1, max_x + padding)
    max_y = min(height - 1, max_y + padding)
    
    cropped_white = img.crop((min_x, min_y, max_x + 1, max_y + 1))
    
    # Save the white silhouette version
    white_path = dest_prefix + "_blanco.png"
    cropped_white.save(white_path, "PNG")
    print(f"Saved: {os.path.basename(white_path)} (Size: {cropped_white.size})")
    
    if make_dark_copy:
        # Create the navy blue version by replacing white with (#081225)
        cropped_navy = cropped_white.copy()
        navy_pixels = cropped_navy.load()
        n_w, n_h = cropped_navy.size
        
        for y in range(n_h):
            for x in range(n_w):
                r, g, b, a = navy_pixels[x, y]
                if a > 0:
                    # Settle on premium corporate navy #081225
                    navy_pixels[x, y] = (8, 18, 37, a)
                    
        navy_path = dest_prefix + "_azul.png"
        cropped_navy.save(navy_path, "PNG")
        print(f"Saved: {os.path.basename(navy_path)} (Size: {cropped_navy.size})")

def main():
    dir_src = r"C:\Users\Edgar\.gemini\antigravity\brain\bd586d8e-6c95-4d45-84d5-eddcc8e71b15"
    dir_dest = r"c:\Users\Edgar\Desktop\INTRANETJAE\web-app\public\assets"
    
    os.makedirs(dir_dest, exist_ok=True)
    
    # 1. GRUPO JAE (Parent Logo)
    # Target: media__1779667387206.png (Main corporate logo)
    src_jae = os.path.join(dir_src, "media__1779667387206.png")
    dest_jae = os.path.join(dir_dest, "logo_jae")
    if os.path.exists(src_jae):
        process_logo(src_jae, dest_jae, make_dark_copy=True)
        
    # 2. JARDÍN DE LOS ÁNGELES (Brand 1)
    # Target: media__1779667387205.png
    src_jardin = os.path.join(dir_src, "media__1779667387205.png")
    dest_jardin = os.path.join(dir_dest, "logo_jardin")
    if os.path.exists(src_jardin):
        process_logo(src_jardin, dest_jardin, make_dark_copy=True)
        
    # 3. ETERNUM SERVICIOS FUNERARIOS (Brand 2)
    # Target: new uploaded media__1779668199194.png (Eternum white on black)
    src_eternum = os.path.join(dir_src, "media__1779668199194.png")
    dest_eternum = os.path.join(dir_dest, "logo_eternum")
    if os.path.exists(src_eternum):
        process_logo(src_eternum, dest_eternum, make_dark_copy=True)

if __name__ == "__main__":
    main()
