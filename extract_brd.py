import zipfile
import xml.etree.ElementTree as ET
import json
import os
import re

NAMESPACES = {
    'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'
}

KEY_VALUE_REGEX = re.compile(r'^[\w\-\_]+:\s+.*')

def extract_docx_content(docx_path):
    try:
        if not os.path.exists(docx_path):
            return [{"title": "Error", "content": [f"File not found: {docx_path}"]}]
            
        with zipfile.ZipFile(docx_path) as z:
            xml_content = z.read('word/document.xml')
            
        root = ET.fromstring(xml_content)
        body = root.find('w:body', NAMESPACES)
        
        if body is None:
             return [{"title": "Error", "content": ["Could not find document body"]}]

        sections = []
        current_section = {"title": "Introduction", "content": []}
        

        def get_para_text(p_elem):
            text_parts = []
            for child in p_elem.iter():
                if child.tag.endswith('}t'):
                    if child.text:
                        text_parts.append(child.text)
                elif child.tag.endswith('}br'):
                    text_parts.append("\n")
                elif child.tag.endswith('}tab'):
                    text_parts.append("\t")
            return "".join(text_parts)

        for child in body:
            tag_name = child.tag
            if tag_name.endswith('}p'):
                text = get_para_text(child).strip()
                if not text:
                    continue
                
                style = "paragraph"
                is_code = False
                pPr = child.find('w:pPr', NAMESPACES)
                if pPr is not None:
                    pStyle = pPr.find('w:pStyle', NAMESPACES)
                    if pStyle is not None:
                        val = pStyle.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val')
                        if val:
                             if 'Heading' in val: style = val

                if "Heading" in style:
                    if current_section["content"] or current_section["title"] != "Introduction":
                        sections.append(current_section)
                    current_section = {"title": text, "content": []}
                else:
                    if isinstance(current_section["content"], list):
                         current_section["content"].append(text)

            elif tag_name.endswith('}tbl'):
                rows = []
                for tr in child.findall('w:tr', NAMESPACES):
                    row_data = []
                    for tc in tr.findall('w:tc', NAMESPACES):
                        cell_text = ""
                        for p in tc.findall('w:p', NAMESPACES):
                            cell_text += get_para_text(p) + " "
                        row_data.append(cell_text.strip())
                    rows.append(row_data)
                if rows:
                    if isinstance(current_section["content"], list):
                         current_section["content"].append({"type": "table", "data": rows})

        if current_section["content"] or current_section["title"]:
            sections.append(current_section)
        return sections
    except Exception as e:
        return [{"title": "Error", "content": [str(e)]}]

brd_dir = "/home/abhishek/Desktop/Adraca Overall/Product Documentation/Adraca Sovereign Validator"
files = [
    "DORA_GDPR Cloud Compliance BRD.docx",
    "Financial Services Security Design Document.docx"
]

results = {}
for f in files:
    path = os.path.join(brd_dir, f)
    results[f] = extract_docx_content(path)

output_path = "/home/abhishek/Ventures/adraca.io/brd_content.json"
with open(output_path, "w") as f:
    json.dump(results, f, indent=2)

print(f"Extraction complete. Saved to {output_path}")
