import os
from PIL import Image, ImageDraw, ImageFont, ImageFilter

def create_tango_og():
    bg_path = r"C:\Users\Bagus\.gemini\antigravity-ide\brain\0e154e2d-427e-4b45-a887-8a68182410c6\tango_n3_clean_bg_1790567903443.jpg"
    im = Image.open(bg_path).convert("RGBA")

    # Target 1200 x 630
    target_w, target_h = 1200, 630
    
    # Calculate crop
    src_w, src_h = im.size
    aspect_target = target_w / target_h
    aspect_src = src_w / src_h

    if aspect_src > aspect_target:
        # Source is wider, crop width
        new_w = int(src_h * aspect_target)
        left = (src_w - new_w) // 2
        im = im.crop((left, 0, left + new_w, src_h))
    else:
        # Source is taller, crop height
        new_h = int(src_w / aspect_target)
        top = (src_h - new_h) // 2
        im = im.crop((0, top, src_w, top + new_h))

    im = im.resize((target_w, target_h), Image.Resampling.LANCZOS)

    # Add dark vignette/gradient overlay on the left to make text pop
    overlay = Image.new("RGBA", (target_w, target_h), (0, 0, 0, 0))
    draw_ov = ImageDraw.Draw(overlay)
    
    for x in range(750):
        # Quadratic falloff from left to right
        alpha = int(230 * (1.0 - (x / 750.0) ** 1.3))
        draw_ov.line([(x, 0), (x, target_h)], fill=(5, 11, 20, max(0, alpha)))
        
    im = Image.alpha_composite(im, overlay)

    draw = ImageDraw.Draw(im)

    # Fonts
    jp_font_path = r"C:\Windows\Fonts\meiryob.ttc"
    en_font_path = r"C:\Windows\Fonts\segoeuib.ttf"
    en_reg_path = r"C:\Windows\Fonts\segoeui.ttf"

    font_brand = ImageFont.truetype(en_font_path, 20)
    font_brand_tag = ImageFont.truetype(en_font_path, 11)
    font_badge = ImageFont.truetype(jp_font_path, 13)
    font_title_jp = ImageFont.truetype(jp_font_path, 50)
    font_sub_en = ImageFont.truetype(en_font_path, 15)
    font_desc = ImageFont.truetype(jp_font_path, 17)
    font_desc_bold = ImageFont.truetype(jp_font_path, 17)
    font_feat = ImageFont.truetype(jp_font_path, 14)
    font_url = ImageFont.truetype(en_font_path, 14)

    # Top Brand Row (x=60, y=50)
    # Brand mark icon
    mark_x, mark_y = 60, 48
    draw.rounded_rectangle([mark_x, mark_y, mark_x + 36, mark_y + 36], radius=9, fill=(14, 165, 233))
    draw.text((mark_x + 9, mark_y + 4), "K", font=font_brand, fill=(4, 16, 30))
    
    # "KAIDEVLAB"
    draw.text((mark_x + 48, mark_y + 5), "KAIDEVLAB", font=font_brand, fill=(248, 250, 252))
    
    # Pill "LEARNING SUITE"
    tag_x = mark_x + 195
    draw.rounded_rectangle([tag_x, mark_y + 5, tag_x + 125, mark_y + 31], radius=13, fill=(14, 165, 233, 40), outline=(56, 189, 248, 120), width=1)
    draw.text((tag_x + 12, mark_y + 9), "TOOLS & LABS", font=font_brand_tag, fill=(56, 189, 248))

    # JLPT Badge (y=112)
    badge_x, badge_y = 60, 110
    draw.rounded_rectangle([badge_x, badge_y, badge_x + 295, badge_y + 34], radius=17, fill=(245, 158, 11, 35), outline=(251, 191, 36, 120), width=1)
    draw.text((badge_x + 14, badge_y + 6), "★ JLPT N3 合格対策 · 2021年改訂版", font=font_badge, fill=(251, 191, 36))

    # Title JP (y=162)
    title_y = 160
    draw.text((60, title_y), "新完全マスター ", font=font_title_jp, fill=(255, 255, 255))
    # measure "新完全マスター " to place "単語 N3"
    bbox = draw.textbbox((60, title_y), "新完全マスター ", font=font_title_jp)
    draw.text((bbox[2], title_y), "単語 N3", font=font_title_jp, fill=(56, 189, 248))

    # English Subtitle
    sub_y = title_y + 70
    draw.text((60, sub_y), "SHIN KANZEN MASTER TANGO N3 INTERACTIVE", font=font_sub_en, fill=(148, 163, 184))

    # Description (2 lines)
    desc_y = sub_y + 36
    draw.text((60, desc_y), "1,800 Kosakata Lengkap (46 Bab) & 20 Cerita Latihan Membaca", font=font_desc_bold, fill=(241, 245, 249))
    draw.text((60, desc_y + 28), "Dilengkapi Audio Native TTS, Furigana Toggle, dan Kuis Dokkai", font=font_desc, fill=(148, 163, 184))

    # Features Grid (2 columns x 2 rows)
    feats = [
        ("✓  1,800 Kata & 46 Bab Penuh", (52, 211, 153)),
        ("✓  20 Cerita (読んでみよう)", (52, 211, 153)),
        ("✓  Audio Pelafalan Native TTS", (56, 189, 248)),
        ("✓  Kuis Pemahaman JLPT Dokkai", (56, 189, 248)),
    ]

    grid_y = desc_y + 78
    # col 1
    draw.text((60, grid_y), feats[0][0], font=font_feat, fill=feats[0][1])
    draw.text((60, grid_y + 32), feats[2][0], font=font_feat, fill=feats[2][1])
    # col 2
    draw.text((370, grid_y), feats[1][0], font=font_feat, fill=feats[1][1])
    draw.text((370, grid_y + 32), feats[3][0], font=font_feat, fill=feats[3][1])

    # Bottom URL Bar (y=535)
    bar_y = 535
    draw.rounded_rectangle([60, bar_y, 440, bar_y + 42], radius=12, fill=(15, 23, 42, 200), outline=(56, 189, 248, 90), width=1)
    draw.text((80, bar_y + 11), "kaidevlab.com/tools/tango-n3/", font=font_url, fill=(56, 189, 248))
    draw.text((350, bar_y + 11), "·  Live Web App", font=font_url, fill=(148, 163, 184))

    # Convert to RGB and save
    final_rgb = im.convert("RGB")

    output_paths = [
        r"c:\Users\Bagus\CodeBuddy\20260917204518\kaidevlab\public\project-screenshots\tango-n3-og.png",
        r"c:\Users\Bagus\CodeBuddy\20260917204518\kaidevlab\public\tools\tango-n3-og.png",
        r"c:\Users\Bagus\CodeBuddy\20260917204518\kaidevlab\src\app\tools\tango-n3\opengraph-image.png",
        r"c:\Users\Bagus\CodeBuddy\20260917204518\kaidevlab\src\app\tools\tango-n3\twitter-image.png",
    ]

    for p in output_paths:
        os.makedirs(os.path.dirname(p), exist_ok=True)
        final_rgb.save(p, "PNG", optimize=True)
        print("Saved OG image to:", p)

if __name__ == "__main__":
    create_tango_og()
