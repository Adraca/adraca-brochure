"use client";
interface GlassInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

export function GlassInput({ label, ...props }: GlassInputProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider pl-4">
                {label}
            </label>
            <input
                {...props}
                className="bg-white/5 backdrop-blur-sm border border-slate-300/30 rounded-2xl px-6 py-4 text-obsidian placeholder:text-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white/20 transition-all shadow-sm"
            />
        </div>
    );
}

interface GlassTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label: string;
}

export function GlassTextArea({ label, ...props }: GlassTextAreaProps) {
    return (
        <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider pl-4">
                {label}
            </label>
            <textarea
                {...props}
                rows={5}
                className="bg-white/5 backdrop-blur-sm border border-slate-300/30 rounded-2xl px-6 py-4 text-obsidian placeholder:text-slate-400 focus:outline-none focus:border-slate-400 focus:bg-white/20 transition-all shadow-sm resize-none"
            />
        </div>
    );
}
