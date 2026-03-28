from PIL import Image

def remove_bg(image_path, out_path, tolerance=60):
    img = Image.open(image_path).convert("RGBA")
    data = img.getdata()
    new_data = []
    
    ref_color = img.getpixel((0,0))
    
    for item in data:
        diff = sum(abs(item[i] - ref_color[i]) for i in range(3))
        if diff < tolerance:
            new_data.append((255, 255, 255, 0))
        else:
            new_data.append(item)
            
    img.putdata(new_data)
    img.save(out_path, "PNG")

remove_bg('assets/alula.png', 'assets/alula_transparent.png')
