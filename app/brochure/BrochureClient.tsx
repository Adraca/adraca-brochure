"use client";
import AnimatedBackground from "@/components/ui/AnimatedBackground";
import { motion } from "framer-motion";
import BrochureCover from "@/components/brochure/BrochureCover";
import BrochureVision from "@/components/brochure/BrochureVision";
import BrochureProduct from "@/components/brochure/BrochureProduct";
import BrochureTechnical from "@/components/brochure/BrochureTechnical";
import BrochureDataStack from "@/components/brochure/BrochureDataStack";
import BrochureInfra from "@/components/brochure/BrochureInfra";
import BrochureLeadership from "@/components/brochure/BrochureLeadership";
import BrochureContact from "@/components/brochure/BrochureContact";
import BrochureDivider from "@/components/brochure/BrochureDivider";
import { useState, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function BrochureSlide({ children, index }: { children: React.ReactNode; index: number }) {
  return (
    <motion.section 
      data-index={index}
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen w-full flex items-center justify-center p-4 md:p-8 snap-start"
    >
      <div className="relative w-full max-w-7xl h-full min-h-[85vh] flex flex-col justify-center p-8 md:p-12 
                    rounded-[3rem] border border-slate-200/60 dark:border-slate-800/60 
                    bg-white/20 dark:bg-slate-900/20 backdrop-blur-xl 
                    shadow-[0_0_50px_-12px_rgba(0,0,0,0.05)] dark:shadow-[0_0_50px_-12px_rgba(0,0,0,0.3)]
                    overflow-hidden group"
      >
        {/* Decorative Corner Accents */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-blue-500/20 rounded-tl-[3rem] -translate-x-1 -translate-y-1" />
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-violet-500/20 rounded-br-[3rem] translate-x-1 translate-y-1" />
        
        {/* Inner Glow */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-violet-500/5 pointer-events-none" />

        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </div>
    </motion.section>
  );
}

export default function BrochureClient() {
  const [isGenerating, setIsGenerating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (isGenerating) return;
    setIsGenerating(true);
    
    // Apply export-safe styles to the whole page
    document.body.classList.add('is-pdf-export');

    try {
      const slides = document.querySelectorAll('.snap-start');
      if (slides.length === 0) throw new Error("No slides found to capture.");

      let pdf: jsPDF | null = null;
      
      for (let i = 0; i < slides.length; i++) {
        const slide = slides[i] as HTMLElement;
        
        // 1. Physically scroll to the slide to force render/animations
        slide.scrollIntoView({ behavior: 'auto', block: 'start' });
        
        // 2. Wait for rendering and all images to be decoded
        await new Promise(r => setTimeout(r, 800));
        const images = Array.from(slide.querySelectorAll('img'));
        await Promise.all(images.map(img => {
          if (img.complete) return img.decode().catch(() => {});
          return new Promise(resolve => {
            img.onload = () => (img as HTMLImageElement).decode().then(resolve).catch(resolve);
            img.onerror = resolve;
          });
        }));

        // 3. Capture with deep visibility forcing
        const canvas = await html2canvas(slide, {
          scale: 1.5, // Reduced from 2 to optimize file size
          useCORS: true,
          logging: false,
          backgroundColor: "#ffffff",
          windowWidth: 1440,
          onclone: (clonedDoc) => {
            const clonedSlide = clonedDoc.querySelector(`[data-index="${i}"]`) as HTMLElement;
            if (clonedSlide) {
              // Deep Visibility Force: Ensure everything is visible regardless of animation state
              const allElements = clonedSlide.querySelectorAll('*');
              allElements.forEach((el) => {
                const htmlEl = el as HTMLElement;
                const style = htmlEl.style;
                
                // Neutralize framer-motion / CSS visibility
                style.opacity = "1";
                style.visibility = "visible";
                style.transform = "none";
                style.animation = "none";
                style.transition = "none";

                // Fix text gradients which html2canvas fails to render (causes cyan blocks/missing text)
                if (window.getComputedStyle(htmlEl).webkitBackgroundClip === 'text' || htmlEl.classList.contains('text-transparent')) {
                  style.webkitBackgroundClip = 'initial';
                  style.webkitTextFillColor = 'initial';
                  style.color = '#3b82f6'; // Use primary Adraca blue for PDF readability
                  style.background = 'none';
                  style.backgroundImage = 'none';
                }
              });
            }
          }
        });

        // 4. Ensure fonts and images are ready
        await document.fonts.ready;
        await new Promise(r => setTimeout(r, 50)); 

        // Use JPEG with 75% quality instead of PNG for massive file size reduction
        const imgData = canvas.toDataURL('image/jpeg', 0.75);
        
        // 5. Dynamic Height Calculation
        const pdfWidth = 1280;
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        if (!pdf) {
          pdf = new jsPDF({
            orientation: pdfWidth > pdfHeight ? "l" : "p",
            unit: "px",
            format: [pdfWidth, pdfHeight],
            compress: true
          });
        } else {
          pdf.addPage([pdfWidth, pdfHeight], pdfWidth > pdfHeight ? "l" : "p");
        }
        
        // Use FAST compression for image embedding
        pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');
      }

      // 5. Save and Cleanup
      if (pdf) pdf.save("Adraca_Strategic_Brochure_2026.pdf");
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("PDF Generation failed:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      document.body.classList.remove('is-pdf-export');
      setIsGenerating(false);
    }
  };

  return (
    <div ref={containerRef} className="relative h-screen overflow-y-auto snap-y snap-mandatory scroll-smooth bg-white dark:bg-slate-950">
      <AnimatedBackground />

      <main className="relative z-10">
        <BrochureSlide index={0}>
          <BrochureCover />
        </BrochureSlide>

        <BrochureDivider />

        <BrochureSlide index={1}>
          <BrochureVision />
        </BrochureSlide>

        <BrochureDivider />

        {/* DPP Engine */}
        <BrochureSlide index={2}>
          <BrochureProduct
            tag="Circular Economy" tagColor="violet"
            title="Digital Product" titleAccent="Passport (DPP)" accentColor="hot"
            description="The DPP Engine provides immutable lifecycle tracking for industrial assets, ensuring compliance with the EU's Ecodesign for Sustainable Products Regulation (ESPR)."
            features={[
              { label: "Real-time Circularity Metrics", sub: "across the full value chain", color: "violet" },
              { label: "Multi-tier Supplier Traceability", sub: "with ZKP provenance", color: "violet" },
              { label: "Automated Regulatory Reporting", sub: "born ESPR-compliant", color: "violet" },
            ]}
            imageSrc="/assets/products/dpp/screenshots/dashboard.jpg" imageAlt="DPP Dashboard" imageLeft={true}
            code={`dpp.verify('product_id')\n  .zkp_attest()\n  .emit_compliance_report();`}
            laymanTitle="The Sustainability Passport"
            laymanSummary="Think of this as a digital 'birth certificate' and 'passport' for every product. It tracks where materials came from and how to recycle them, helping you meet environmental laws automatically without the paperwork headache."
          />
        </BrochureSlide>

        <BrochureDivider />

        <BrochureSlide index={3}>
          <BrochureTechnical
            tag="Technical Depth" tagColor="violet"
            title="Zero-Knowledge" titleAccent="Provenance" accentColor="hot"
            description="We utilise ZKP architectures to verify sustainability and compliance claims without exposing sensitive supplier pricing or trade secrets."
            imageSrc="/assets/products/dpp/screenshots/minting.jpg" imageAlt="DPP ZKP Technical"
            pillars={[
              { label: "ZKP Layer", color: "violet", desc: "Groth16 proofs verify compliance without data exposure." },
              { label: "Blockchain Anchor", color: "azure", desc: "Immutable audit trail anchored on-chain per ESPR mandate." },
              { label: "API Gateway", color: "emerald", desc: "REST + GraphQL endpoints for seamless ERP integration." },
            ]}
            laymanSummary="We prove your products are sustainable without revealing your secret recipes or supplier costs. It's 'Verification without Exposure' — keeping your competitive edge safe."
          />
        </BrochureSlide>

        <BrochureDivider />

        <BrochureSlide index={4}>
          <BrochureTechnical
            tag="DPP Ecosystem" tagColor="violet"
            title="Recycling" titleAccent="Intelligence" accentColor="hot"
            description="Closing the loop with automated material identification. The Recycler Engine maps individual components to recovery protocols in real time."
            imageSrc="/assets/products/dpp/screenshots/recycler.jpg" imageAlt="DPP Recycler"
            pillars={[
              { label: "Material Mapping", color: "violet", desc: "Automated identification of 200+ industrial materials." },
              { label: "Loop Analytics", color: "azure", desc: "Real-time visibility into circularity performance." },
              { label: "Recovery Logic", color: "emerald", desc: "Deterministic logic for asset second-life scheduling." },
            ]}
            laymanSummary="Automatically identifies materials in old products so they can be reused or recycled. This turns waste into value and proves your company's commitment to the circular economy."
          />
        </BrochureSlide>

        <BrochureDivider />

        {/* Sovereign Search */}
        <BrochureSlide index={5}>
          <BrochureProduct
            tag="Enterprise AI" tagColor="cyan"
            title="Sovereign" titleAccent="Search Engine" accentColor="primary"
            description="Our Hybrid Fusion Core merges traditional keyword relevance with advanced vector-based semantic discovery — running 100% within your perimeter."
            features={[
              { label: "100% Local Inference", sub: "Your data never leaves your perimeter.", color: "cyan" },
              { label: "Cross-Lingual Bridge", sub: "Seamless discovery across global documentation.", color: "cyan" },
              { label: "Privacy Gauntlet", sub: "Automatic PII redaction and security filtering.", color: "cyan" },
            ]}
            imageSrc="/assets/products/search/hero_demo.webp" imageAlt="Sovereign Search" imageLeft={false}
            stat={{ value: "10ms", label: "P99 Semantic Query Latency" }}
            laymanTitle="Intelligent Knowledge Discovery"
            laymanSummary="A search engine that understands your company's documents like a human expert. It finds exactly what you need even without 'perfect' keywords—and it stays 100% on your servers so your data never leaves the building."
          />
        </BrochureSlide>

        <BrochureDivider />

        <BrochureSlide index={6}>
          <BrochureTechnical
            tag="Cognitive Utility" tagColor="cyan"
            title="Cross-Lingual" titleAccent="Knowledge Discovery" accentColor="primary"
            description="Query in English, discover in Japanese. Our zero-data-leakage translation layer ensures global documentation is searchable without external API calls."
            imageSrc="/assets/products/search/screenshots/lingual.png" imageAlt="Cross-Lingual Discovery"
            pillars={[
              { label: "Semantic Mapping", color: "cyan", desc: "High-dimensional vector alignment across 50+ languages." },
              { label: "Zero-External LLM", color: "blue", desc: "Native on-prem translation models with no external dependencies." },
              { label: "Visual Reasoning", color: "violet", desc: "Searching through CAD designs and schematics visually." },
            ]}
            laymanSummary="Breaks language barriers across your global offices. Search in English to find results originally written in Japanese or German—instantly, without using risky external translation tools."
          />
        </BrochureSlide>

        <BrochureDivider />

        <BrochureSlide index={7}>
          <BrochureProduct
            tag="Administration" tagColor="blue"
            title="Strategic" titleAccent="Command Center" accentColor="primary"
            description="Complete control over your internal knowledge base. Administrators tune relevance, audit agentic trails, and monitor data health in real time."
            features={[
              { label: "Dynamic Relevance Tuning", color: "blue" },
              { label: "Agentic Discovery Audit Logs", color: "blue" },
              { label: "Per-User Access Granularity", color: "blue" },
            ]}
            imageSrc="/assets/products/search/screenshots/command.png" imageAlt="Search Command Center" imageLeft={true}
            pills={["RBAC", "Zero Trust", "E2E Encrypted"]}
            laymanSummary="Gives your team a simple control panel to manage how AI finds information. You can easily adjust what the AI prioritizes and see exactly who is accessing what data."
          />
        </BrochureSlide>

        <BrochureDivider />

        {/* Synthetic Patient AI */}
        <BrochureSlide index={8}>
          <BrochureProduct
            tag="HealthTech" tagColor="cyan"
            title="Synthetic" titleAccent="Patient AI" accentColor="primary"
            description="Accelerating clinical validation while preserving 100% data privacy. Our engine generates deterministic personas for medical system stress testing."
            features={[
              { label: "HIPAA & GDPR Compliant", sub: "by architecture, not policy", color: "cyan" },
              { label: "Deterministic Persona Generation", sub: "for reproducible trials", color: "cyan" },
              { label: "System Edge-Case Validation", sub: "at scale without real data", color: "cyan" },
            ]}
            imageSrc="/assets/products/synthetic/screenshots/dashboard.png" imageAlt="Synthetic Patient Dashboard" imageLeft={false}
            dualStats={[
              { value: "∞", label: "Synthetic Patients", color: "cyan" },
              { value: "0%", label: "Real PII Exposed", color: "emerald" },
            ]}
            laymanTitle="Safe Medical Testing"
            laymanSummary="We create 'digital twins' of patients that act like real people but contain zero private info. This lets medical companies test systems faster and cheaper with zero risk of leaking real patient data."
          />
        </BrochureSlide>

        <BrochureDivider />

        <BrochureSlide index={9}>
          <BrochureTechnical
            tag="Privacy Core" tagColor="cyan"
            title="Privacy" titleAccent="Perimeter Enforcement" accentColor="primary"
            description="Our Privacy Gauntlet ensures that not a single byte of real PII enters the synthetic generation loop. We utilise differential privacy at the edge."
            imageSrc="/assets/products/synthetic/screenshots/privacy.png" imageAlt="Privacy Perimeter"
            pillars={[
              { label: "Differential Privacy", color: "cyan", desc: "Mathematical proof of anonymity for all output data." },
              { label: "Identity Vault", color: "violet", desc: "Secure isolation of reference datasets within the DMZ." },
              { label: "Audit Pulse", color: "emerald", desc: "Real-time monitoring of data leakage risks." },
            ]}
            laymanSummary="An invisible shield that makes it mathematically impossible for real patient identities to be exposed. We use 'Differential Privacy' to ensure your data stays anonymous even during complex testing."
          />
        </BrochureSlide>

        <BrochureDivider />

        <BrochureSlide index={10}>
          <BrochureProduct
            tag="Analytics" tagColor="emerald"
            title="Clinical" titleAccent="Utility & ROI" accentColor="primary"
            description="Drastically reduce patient recruitment costs and data preparation cycles with real-time visibility into the value delivered across the trial lifecycle."
            features={[]}
            imageSrc="/assets/products/synthetic/screenshots/clinical.png" imageAlt="Patient ROI Dashboard" imageLeft={true}
            dualStats={[
              { value: "40%", label: "Avg. gain in trial readiness efficiency", color: "emerald" },
              { value: "60%", label: "Reduction in data preparation time", color: "blue" },
            ]}
            note="Benchmarked across 3 Phase II clinical trials. Results validated with independent biostatistics review."
            laymanSummary="Speeds up the time it takes to get new medical treatments ready for testing. By using AI patients first, you can find and fix problems early, saving millions in trial costs."
          />
        </BrochureSlide>

        <BrochureDivider />

        {/* Sovereign Validator */}
        <BrochureSlide index={11}>
          <BrochureProduct
            tag="Compliance" tagColor="blue"
            title="Sovereign" titleAccent="Validator" accentColor="primary"
            description="Engineered for the DORA era. Automate the verification of service availability and contract SLA compliance across your entire vendor ecosystem."
            features={[
              { label: "Automated Vendor Status Scraping", sub: "with real-time alerting", color: "blue" },
              { label: "PDF SLA Contract Parsing", sub: "using LLM-powered NLP", color: "violet" },
              { label: "Immutable Compliance Audit Trails", sub: "ready for regulator review", color: "violet" },
            ]}
            imageSrc="/assets/products/validator/hero_demo.webp" imageAlt="Sovereign Validator" imageLeft={false}
            code={`validator.scan('aws.com')\n  .parse_sla(contract.pdf)\n  .emit_audit_trail();`}
            laymanTitle="Automated Digital Guard"
            laymanSummary="A 24/7 watchdog for your business. It monitors tech suppliers (like Cloud providers) to ensure they deliver what they promised. It alerts you the moment a service fails, helping you avoid outages and stay compliant."
          />
        </BrochureSlide>

        <BrochureDivider />

        <BrochureSlide index={12}>
          <BrochureTechnical
            tag="DORA Readiness" tagColor="blue"
            title="Strategic" titleAccent="Risk Landscapes" accentColor="primary"
            description="Visualise vendor risk across your entire portfolio. Automatically detect SLA breaches before they impact your core operations."
            imageSrc="/assets/products/validator/screenshots/risk_map.png" imageAlt="Validator Risk Map"
            pillars={[
              { label: "SLA Vault", color: "blue", desc: "Unified repository for all parsed service level agreements." },
              { label: "Policy Gate", color: "violet", desc: "Automated enforcement of corporate risk policies." },
              { label: "Breach Alerting", color: "hot", desc: "Real-time notifications for critical service degradation." },
            ]}
            laymanSummary="A 'warning map' for your technical risks. See at a glance which parts of your business are vulnerable to supplier failures and get ahead of problems before they impact your customers."
          />
        </BrochureSlide>

        <BrochureDivider />

        <BrochureSlide index={13}>
          <BrochureInfra />
        </BrochureSlide>

        <BrochureDivider />

        <BrochureSlide index={14}>
          <BrochureDataStack />
        </BrochureSlide>

        <BrochureDivider />

        <BrochureSlide index={15}>
          <BrochureLeadership />
        </BrochureSlide>

        <BrochureDivider />

        <BrochureSlide index={16}>
          <BrochureContact />
        </BrochureSlide>
      </main>

      {/* PDF Generation Button */}
      <button 
        onClick={handleDownloadPDF}
        disabled={isGenerating}
        className={`fixed bottom-10 right-10 z-[100] p-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 
                   rounded-full shadow-2xl hover:scale-110 active:scale-95 transition-all group flex items-center
                   ${isGenerating ? 'opacity-80 cursor-wait' : ''}`}
        aria-label="Download PDF"
      >
        <div className={isGenerating ? 'animate-spin' : ''}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
        </div>
        <span className={`max-w-0 overflow-hidden group-hover:ml-3 transition-all duration-500 ease-in-out whitespace-nowrap font-bold text-sm tracking-tight
                         ${isGenerating ? 'max-w-[200px] ml-3' : 'group-hover:max-w-[200px]'}`}>
          {isGenerating ? 'GENERATING BROCHURE...' : 'DOWNLOAD PDF'}
        </span>
      </button>
    </div>
  );
}
