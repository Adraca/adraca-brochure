import zipfile
import xml.etree.ElementTree as ET

docx_path = "Source/WP3:Sovereign AI_ Local LLM Implementation.docx"
NAMESPACES = {
    'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
}

with zipfile.ZipFile(docx_path) as z:
    xml_content = z.read('word/document.xml')

root = ET.fromstring(xml_content)
body = root.find('w:body', NAMESPACES)

found = False
count = 0

for child in body:
    # Get text
    text = ""
    for t in child.findall('.//w:t', NAMESPACES):
        if t.text:
            text += t.text
    
    if "Containerized Deployment Configuration" in text:
        found = True
        print(f"FOUND SECTION: {text}")
        continue
    
    if found and count < 10:
        print(f"\n--- Paragraph {count} ---")
        print(f"Text: {text[:50]}...")
        
        # Dump pPr
        pPr = child.find('w:pPr', NAMESPACES)
        if pPr is not None:
            pStyle = pPr.find('w:pStyle', NAMESPACES)
            if pStyle is not None:
                print(f"Style: {pStyle.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val')}")
            
            shd = pPr.find('w:shd', NAMESPACES)
            if shd is not None:
                print(f"Shading: {shd.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}fill')}")

        # Dump rPr of first run
        r = child.find('w:r', NAMESPACES)
        if r is not None:
            rPr = r.find('w:rPr', NAMESPACES)
            if rPr is not None:
                rFonts = rPr.find('w:rFonts', NAMESPACES)
                if rFonts is not None:
                     print(f"Font ASCII: {rFonts.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}ascii')}")
                     print(f"Font HAnsi: {rFonts.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}hAnsi')}")

        count += 1
