
import Link from "next/link";
import { ArrowLeft, Clock, MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";

import { JOBS } from "@/utils/jobs";

export async function generateStaticParams() {
    return Object.keys(JOBS).map((slug) => ({
        slug: slug,
    }));
}

export default async function JobDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const job = JOBS[slug];

    if (!job) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-white dark:bg-slate-950 pt-32 pb-20">
            <div className="max-w-3xl mx-auto px-6">

                {/* Back Link */}
                <Link href="/careers" className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors mb-10 group">
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Careers
                </Link>

                {/* Header */}
                <div className="mb-12">
                    <div className="flex gap-3 mb-4 text-xs font-bold uppercase tracking-wider text-slate-400">
                        <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{job.department}</span>
                        <span className="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">{job.type}</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 leading-tight">
                        {job.title}
                    </h1>
                    <div className="flex flex-wrap gap-6 text-sm text-slate-600 dark:text-slate-400 font-mono">
                        <div className="flex items-center gap-2">
                            <MapPin size={16} /> {job.location}
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock size={16} /> {job.duration}
                        </div>
                    </div>
                </div>

                {/* Description */}
                <div className="prose prose-slate dark:prose-invert max-w-none mb-12">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">The Role</h3>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg mb-8">
                        {job.description}
                    </p>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">What You'll Do</h3>
                    <ul className="space-y-3 list-none pl-0">
                        {job.responsibilities.map((item: string, i: number) => (
                            <li key={i} className="flex gap-3 text-slate-600 dark:text-slate-300">
                                <CheckCircle2 size={20} className="text-blue-500 shrink-0 mt-0.5" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>

                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 mt-10">What We Need</h3>
                    <ul className="space-y-3 list-none pl-0">
                        {job.requirements.map((item: string, i: number) => (
                            <li key={i} className="flex gap-3 text-slate-600 dark:text-slate-300">
                                <CheckCircle2 size={20} className="text-indigo-500 shrink-0 mt-0.5" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* CTA */}
                <div className="border-t border-slate-200 dark:border-slate-800 pt-10">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Ready to ship?</h3>
                    <p className="text-slate-500 dark:text-slate-400 mb-6">
                        We don't do formal cover letters. Just tell us who you are and show us what you've built.
                    </p>
                    <a
                        href={`mailto:contact@adraca.io?subject=Application: ${job.title}&body=Hi Adraca Team,%0D%0A%0D%0AI'm interested in the ${job.title} role. Here is my portfolio/GitHub and why I think I'd be a good fit...`}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all hover:scale-105 shadow-lg shadow-blue-500/20"
                    >
                        Apply for this Role <ArrowRight size={18} />
                    </a>
                </div>

            </div>
        </div>
    );
}
