
import json

# Existing Metadata (from your previous turn)
base_data = [
    {
        "id": "wp-001",
        "category": "STRATEGY / SOVEREIGNTY",
        "title": "Strategic Enterprise Data Engineering: The European 'Third Way'",
        "date": "Jan 15, 2026",
        "readTime": "12 min read",
        "downloadSize": "2.4 MB",
        "summary": "A blueprint for the 'Third Way' architecture—converging engineering precision with rigorous digital sovereignty for the post-Schrems II era.",
        "coverImage": "/images/whitepapers/covers/wp-001-cover.jpg",
        "infographicImage": "/images/whitepapers/infographics/wp-001-info.jpg"
    },
    {
        "id": "wp-002",
        "category": "FINTECH / DORA",
        "title": "DORA Compliance as Code: Automating Resilience",
        "date": "Jan 20, 2026",
        "readTime": "15 min read",
        "downloadSize": "3.1 MB",
        "summary": "Replacing manual disaster recovery plans with immutable Infrastructure-as-Code (IaC) pipelines to meet EU Digital Operational Resilience Act requirements.",
        "coverImage": "/images/whitepapers/covers/wp-002-cover.jpg",
        "infographicImage": "/images/whitepapers/infographics/wp-002-info.jpg"
    },
    {
        "id": "wp-003",
        "category": "AI / PRIVACY",
        "title": "Sovereign AI: Local LLMs with Google Antigravity",
        "date": "Jan 22, 2026",
        "readTime": "10 min read",
        "downloadSize": "1.8 MB",
        "summary": "Deploying 'Sovereign RAG' architectures to run open-weight models within air-gapped European enclaves, preventing IP leakage.",
        "coverImage": "/images/whitepapers/covers/wp-003-cover.jpg",
        "infographicImage": "/images/whitepapers/infographics/wp-003-info.jpg"
    },
    {
        "id": "wp-004",
        "category": "MANUFACTURING / CATENA-X",
        "title": "Industrial Data Mesh: The Catena-X Standard",
        "date": "Jan 24, 2026",
        "readTime": "18 min read",
        "downloadSize": "4.5 MB",
        "summary": "A technical guide to implementing 'Sovereign Data Exchange' nodes for the automotive supply chain using the Eclipse Dataspace Protocol.",
        "coverImage": "/images/whitepapers/covers/wp-004-cover.jpg",
        "infographicImage": "/images/whitepapers/infographics/wp-004-info.jpg"
    },
    {
        "id": "wp-005",
        "category": "GDPR / AUTOMATION",
        "title": "The Ethics of Erasure: Automating the 'Right to be Forgotten'",
        "date": "Jan 25, 2026",
        "readTime": "8 min read",
        "downloadSize": "1.2 MB",
        "summary": "Introducing 'Cryptographic Erasure' reference architectures for orchestrating deletion requests across fragmented data silos.",
        "coverImage": "/images/whitepapers/covers/wp-005-cover.jpg",
        "infographicImage": "/images/whitepapers/infographics/wp-005-info.jpg"
    }
]

# Read extracted content
with open("whitepapers_content.json", "r") as f:
    extracted_content = json.load(f)

# Merge
final_whitepapers = []
for paper in base_data:
    paper_id = paper['id']
    if paper_id in extracted_content:
        # Get sections
        sections = extracted_content[paper_id]
        
        # Clean up sections: Remove sections with empty titles or content if needed
        # And specifically look for Abstract/Intro
        
        paper['content'] = sections 
        # Note: 'content' is now an array of {title, content: []}
        
    final_whitepapers.append(paper)

# Generate TS File Content
ts_content = "export const whitepapers = " + json.dumps(final_whitepapers, indent=4) + ";"

with open("utils/whitepapers.ts", "w") as f:
    f.write(ts_content)

print("utils/whitepapers.ts has been updated.")
