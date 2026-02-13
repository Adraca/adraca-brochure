
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
            return {"error": "File not found"}
            
        with zipfile.ZipFile(docx_path) as z:
            xml_content = z.read('word/document.xml')
            
        root = ET.fromstring(xml_content)
        body = root.find('w:body', NAMESPACES)
        
        if body is None:
             return [{"title": "Error", "content": ["Could not find document body"]}]

        sections = []
        current_section = {"title": "Introduction", "content": []}
        

        # Helper to extract text from a paragraph element
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
            # Handle Paragraphs
            if tag_name.endswith('}p'):
                text = get_para_text(child).strip()
                if not text:
                    continue
                
                # Check Style
                style = "paragraph"
                is_code = False
                pPr = child.find('w:pPr', NAMESPACES)
                if pPr is not None:
                    pStyle = pPr.find('w:pStyle', NAMESPACES)
                    if pStyle is not None:
                        val = pStyle.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}val')
                        if val:
                            if 'Heading' in val:
                                style = val
                            if any(x in val.lower() for x in ['code', 'source', 'macro']):
                                is_code = True

                # Heuristics for Code
                if not is_code and not "Heading" in style:
                    # 1. Monospace Font Check
                    try:
                        r = child.find('w:r', NAMESPACES)
                        if r is not None:
                            rPr = r.find('w:rPr', NAMESPACES)
                            if rPr is not None:
                                rFonts = rPr.find('w:rFonts', NAMESPACES)
                                if rFonts is not None:
                                    ascii_font = rFonts.get('{http://schemas.openxmlformats.org/wordprocessingml/2006/main}ascii')
                                    if ascii_font and any(f in ascii_font for f in ['Courier', 'Consolas', 'Mono']):
                                        is_code = True
                    except:
                        pass
                    
                    # 2. Content Heuristics (YAML, Code patterns)
                    # If it has multiple lines (from w:br) and looks structured
                    if "\n" in text:
                        lines = text.split('\n')
                        if len(lines) > 1:
                            # Check for YAML/Code indicators
                            indicators = ["version:", "services:", "image:", "const ", "import ", "function ", "class ", "def ", "{", "}"]
                            if any(ind in text for ind in indicators):
                                is_code = True
                            # Check if lines look like key-value pairs
                            if KEY_VALUE_REGEX.match(lines[0].strip()):
                                is_code = True

                if "Heading" in style:
                    # New Section
                    if current_section["content"] or current_section["title"] != "Introduction":
                        sections.append(current_section)
                    current_section = {"title": text, "content": []}
                else:
                    # Add content item
                    if is_code:
                         current_section["content"].append({"type": "code", "text": text})
                    else:
                         current_section["content"].append({"type": "paragraph", "text": text})


            # Handle Tables
            elif tag_name.endswith('}tbl'):
                rows = []
                for tr in child.findall('w:tr', NAMESPACES):
                    row_data = []
                    for tc in tr.findall('w:tc', NAMESPACES):
                        # Extract all text from cell paragraphs
                        cell_text = ""
                        for p in tc.findall('w:p', NAMESPACES):
                            cell_text += get_para_text(p) + " "
                        row_data.append(cell_text.strip())
                    rows.append(row_data)
                
                if rows:
                    current_section["content"].append({"type": "table", "data": rows})

        # Append last section
        if current_section["content"] or current_section["title"]:
            sections.append(current_section)
            
        return sections

    except Exception as e:
        return [{"title": "Error", "content": [str(e)]}]

files = [
    {"id": "wp-001", "path": "Source/WP1:European Data Sovereignty.docx"},
    {"id": "wp-002", "path": "Source/WP2:DORA Compliance Automation Research.docx"},
    {"id": "wp-003", "path": "Source/WP3:Sovereign AI_ Local LLM Implementation.docx"},
    {"id": "wp-004", "path": "Source/WP4: Catena-X Data Mesh Whitepaper Outline.docx"},
    {"id": "wp-005", "path": "Source/WP5:Automating GDPR Article 17 Erasure.docx"}
]

results = {}
for f in files:
    results[f['id']] = extract_docx_content(f['path'])

with open("whitepapers_content.json", "w") as f:
    json.dump(results, f, indent=2)

print("Extraction complete. Saved to whitepapers_content.json")
