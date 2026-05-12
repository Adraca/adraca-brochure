"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/ui/Navbar";
import Link from "next/link";
import {
    ArrowLeft, Play, Pause, RefreshCw, Activity,
    Server, Shield, Database, Zap, ChevronRight,
    Lock, FileKey, Dna, BarChart3, ScanLine,
    Box, Factory, Truck, Store, CheckCircle, Leaf,
    FileText, Cpu, Heart, ShoppingCart, User
} from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";

export default function UseCaseDashboardClient({ id }: { id?: string }) {
    const { t } = useLanguage();
    const [active, setActive] = useState(true);
    const [logs, setLogs] = useState<string[]>([]);

    // DORA Simulation State
    const [txCount, setTxCount] = useState(849201);
    const [carbonCount, setCarbonCount] = useState(1204);
    const [time, setTime] = useState('');
    const [auditStatus, setAuditStatus] = useState<'idle' | 'scanning' | 'verified'>('idle');

    // Audit Ledger Simulation State
    const [ledgerBlocks, setLedgerBlocks] = useState<{ id: string, hash: string, status: 'pending' | 'active' | 'verified' }[]>([
        { id: 'L01', hash: '0x8f...21', status: 'verified' },
        { id: 'L02', hash: '0x9a...b4', status: 'verified' },
        { id: 'L03', hash: 'Pending', status: 'pending' },
        { id: 'L04', hash: 'Pending', status: 'pending' },
        { id: 'L05', hash: 'Pending', status: 'pending' }
    ]);
    const [activeBlockIndex, setActiveBlockIndex] = useState(2); // Start at L03

    // Edge-Velocity State
    const [gridNodes, setGridNodes] = useState([
        { id: 1, x: 20, y: 20, type: 'shelf', status: 'idle' },
        { id: 2, x: 50, y: 20, type: 'shelf', status: 'idle' },
        { id: 3, x: 80, y: 20, type: 'shelf', status: 'idle' },
        { id: 4, x: 20, y: 50, type: 'shelf', status: 'idle' },
        { id: 5, x: 80, y: 50, type: 'shelf', status: 'idle' },
        { id: 6, x: 20, y: 80, type: 'shelf', status: 'idle' },
        { id: 7, x: 50, y: 80, type: 'shelf', status: 'idle' },
        { id: 8, x: 80, y: 80, type: 'shelf', status: 'idle' },
    ]);
    const [staffPos, setStaffPos] = useState({ x: 50, y: 50 }); // Start at center (Hub)
    const [retailEvent, setRetailEvent] = useState<{ nodeId: number | null, phase: 'detect' | 'dispatch' | 'resolve' }>({ nodeId: null, phase: 'detect' });

    // Catena-X State
    const [catenaState, setCatenaState] = useState({
        pulsePhase: 0, // 0: Idle, 1: Supplier->Hub, 2: Hub->OEM, 3: Shield/Toast
        showShield: false,
        pulsePos: 0 // 0 to 100% path
    });

    useEffect(() => {
        setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString('en-US', { hour12: false }));
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    // Simulation Loop
    useEffect(() => {
        if (!active) return;

        // TX Counter
        const countInterval = setInterval(() => {
            setTxCount(prev => prev + Math.floor(Math.random() * 5));
        }, 200);

        // Audit Pulse Logic (standard)
        const auditInterval = setInterval(() => {
            setAuditStatus('scanning');
            setTimeout(() => setAuditStatus('verified'), id === 'ehds-privacy' ? 2000 : 1500);
            setTimeout(() => setAuditStatus('idle'), id === 'ehds-privacy' ? 4500 : 3000);
        }, id === 'ehds-privacy' ? 6000 : 4000);

        return () => {
            clearInterval(countInterval);
            clearInterval(auditInterval);
        };
    }, [active, id]);

    // Carbon Counter Simulation (ESPR)
    useEffect(() => {
        if (!active || id !== 'espr-passport') return;
        const carbonInterval = setInterval(() => {
            setCarbonCount(prev => prev > 1000 ? prev - 1 : 1204);
        }, 1500);
        return () => clearInterval(carbonInterval);
    }, [active, id]);

    // Ledger Block Simulation (Audit Ledger)
    useEffect(() => {
        if (!active || id !== 'audit-ledger') return;

        const blockInterval = setInterval(() => {
            setActiveBlockIndex(prev => {
                const nextIndex = (prev + 1) % 5;

                // Reset Scenario Check
                if (prev === 4 && nextIndex === 0) {
                    setTimeout(() => {
                        setLedgerBlocks([
                            { id: 'L01', hash: 'Pending', status: 'active' },
                            { id: 'L02', hash: 'Pending', status: 'pending' },
                            { id: 'L03', hash: 'Pending', status: 'pending' },
                            { id: 'L04', hash: 'Pending', status: 'pending' },
                            { id: 'L05', hash: 'Pending', status: 'pending' }
                        ]);
                    }, 500);
                }

                setLedgerBlocks(currentBlocks => currentBlocks.map((block, idx) => {
                    if (idx === prev) return { ...block, status: 'verified', hash: `0x${Math.floor(Math.random() * 16777215).toString(16).substring(0, 4)}...` };
                    if (idx === nextIndex) return { ...block, status: 'active', hash: 'Signing...' };
                    if (idx === (nextIndex + 1) % 5) return { ...block, status: 'pending', hash: 'Pending' }; // Reset ahead
                    return block;
                }));
                return nextIndex;
            });
        }, 3000);

        return () => clearInterval(blockInterval);
    }, [active, id]);

    // Retail Velocity Simulation
    useEffect(() => {
        if (!active || id !== 'edge-velocity') return;

        const loop = setInterval(() => {
            // Pick Random Node
            const targetNodeIdx = Math.floor(Math.random() * gridNodes.length);
            const targetNode = gridNodes[targetNodeIdx];

            // 1. Detect Phase (Red Pulse)
            setRetailEvent({ nodeId: targetNode.id, phase: 'detect' });

            // 2. Dispatch Phase (Staff Move)
            setTimeout(() => {
                setRetailEvent({ nodeId: targetNode.id, phase: 'dispatch' });
                setStaffPos({ x: targetNode.x, y: targetNode.y });
            }, 1000);

            // 3. Resolve Phase (Green Resolving)
            setTimeout(() => {
                setRetailEvent({ nodeId: targetNode.id, phase: 'resolve' });
            }, 2500);

            // 4. Reset Staff to Center
            setTimeout(() => {
                setStaffPos({ x: 50, y: 50 }); // Back to Hub
                setRetailEvent({ nodeId: null, phase: 'detect' });
            }, 3500);

        }, 4000);

        return () => clearInterval(loop);
        return () => clearInterval(loop);
    }, [active, id, gridNodes]); // gridNodes dependency is static but clean for linting

    // Catena-X Simulation Loop
    useEffect(() => {
        if (!active || id !== 'catena-telemetry') return;

        const catenaLoop = setInterval(() => {
            // Cycle: 4s total
            // 0s: Start Pulse (Supplier)
            setCatenaState({ pulsePhase: 1, showShield: false, pulsePos: 0 });

            // 1.5s: Reach Hub (Validator)
            setTimeout(() => {
                setCatenaState(prev => ({ ...prev, pulsePhase: 2, showShield: true, pulsePos: 50 }));
            }, 1500);

            // 3s: Reach OEM
            setTimeout(() => {
                setCatenaState(prev => ({ ...prev, pulsePhase: 3, showShield: false, pulsePos: 100 }));
            }, 3000);

            // 4s: Reset called by next interval start
        }, 4500);

        return () => clearInterval(catenaLoop);
    }, [active, id]);


    const isPrivacy = id === 'ehds-privacy';
    const simConfig = isPrivacy ? {
        node1: { label: t('node_patient_records'), sub: 'HL7 / FHIR', icon: FileKey, color: 'text-rose-500' },
        node2: { label: t('node_sov_enclave'), sub: 'TEE Worker', icon: Shield, activeColor: 'text-emerald-600', idleColor: 'text-rose-600' },
        node3: { label: t('node_research_portal'), sub: 'Aggregated Data', icon: BarChart3, color: 'text-indigo-500' },
        node4: { label: '', sub: '', icon: Box, color: '' }, // Type padding
        toast: 'EHDS: k-Anonymity Verified',
        scanToast: 'Differential Privacy Engine: ACTIVE',
        counterLabel: 'Anonymized Insights',
        hudSub: 'UTC / EHDS_TEE_ENCLAVE'
    } : id === 'espr-passport' ? {
        node1: { label: t('node_raw_materials'), sub: 'Provenance: Verified', icon: Box, color: 'text-amber-600' },
        node2: { label: t('node_manufacturing'), sub: 'Scope 1 & 2', icon: Factory, color: 'text-slate-600' },
        node3: { label: t('node_distribution'), sub: 'Scope 3 Logistics', icon: Truck, color: 'text-blue-600' },
        node4: { label: t('node_retail_shelf'), sub: 'Consumer Access', icon: Store, color: 'text-teal-600' },
        toast: 'Product Passport: VERIFIED',
        scanToast: 'Sovereign Audit: ACTIVE',
        counterLabel: 'Carbon Footprint (kg)',
        hudSub: 'UTC / ESPR_LOOP_V1'
    } : id === 'audit-ledger' ? {
        node1: { label: t('node_event_stream'), sub: 'Ingest: Active', icon: Activity, color: 'text-violet-500' },
        node2: { label: t('node_validator'), sub: 'Signer Node', icon: Shield, activeColor: 'text-violet-600', idleColor: 'text-slate-400' },
        node3: { label: t('node_immutable_ledger'), sub: 'Finality: <1s', icon: Database, color: 'text-slate-600' },
        node4: { label: '', sub: '', icon: Box, color: '' }, // Type padding
        toast: 'Block Finalized: VALID',
        scanToast: 'Signature Verification',
        counterLabel: 'Blocks Validated',
        hudSub: 'UTC / LEDGER_CONSENSUS'
    } : id === 'edge-velocity' ? {
        node1: { label: t('node_shelf_sensor'), sub: 'Zone A4', icon: Box, color: 'text-amber-500' },
        node2: { label: t('node_edge_node'), sub: 'YOLO-v11', icon: Server, activeColor: 'text-blue-600', idleColor: 'text-slate-400' },
        node3: { label: t('node_cloud_sync'), sub: 'Inventory State', icon: Database, color: 'text-slate-500' },
        node4: { label: '', sub: '', icon: Box, color: '' }, // Type padding
        toast: 'Stock Re-allocated',
        scanToast: 'Scanning Shelf...',
        counterLabel: 'SKUs Monitored',
        hudSub: 'UTC / RETAIL_SYNC_V1'
    } : id === 'catena-telemetry' ? {
        node1: { label: t('node_tier1_hub'), sub: 'Parts Supplier', icon: Factory, color: 'text-orange-500' },
        node2: { label: t('node_edc'), sub: 'Sovereign Gate', icon: Server, activeColor: 'text-blue-600', idleColor: 'text-slate-400' },
        node3: { label: t('node_oem'), sub: 'Just-in-Time', icon: Truck, color: 'text-indigo-500' },
        node4: { label: '', sub: '', icon: Box, color: '' }, // Padding
        toast: 'Traceability: VERIFIED',
        scanToast: 'Validating Contract...',
        counterLabel: 'Parts Traced',
        hudSub: 'UTC / CX_DATASPACE'
    } : {
        node1: { label: t('node_event_stream'), sub: 'ISO 20022', icon: Activity, color: 'text-blue-500' },
        node2: { label: t('node_validator'), sub: 'Heuristic Analysis', icon: Shield, activeColor: 'text-emerald-600', idleColor: 'text-blue-600' },
        node3: { label: t('node_immutable_ledger'), sub: 'Immutable Ledger', icon: Database, color: 'text-slate-500' },
        node4: { label: '', sub: '', icon: Box, color: '' }, // Type padding
        toast: 'Art. 28 Verified',
        scanToast: 'Validator Scan: ACTIVE',
        counterLabel: 'Total Audited',
        hudSub: 'UTC / DORA_AUDIT_V2'
    };

    // Config Mapping
    const config: any = {
        'dora-fraud': {
            title: t('uc_dora_fraud_title'),
            subtitle: t('uc_dora_fraud_sub'),
            mission: [
                { label: 'Regulatory Compliance', val: '100%', sub: 'DORA Art. 28' },
                { label: 'Validation Latency', val: '< 10ms', sub: 'Optimized' },
                { label: 'Risk Mitigation', val: 'Critical', sub: 'Active' }
            ],
            stack: [
                { label: 'Sovereign Inference Engine', pct: 99 },
                { label: 'Hardened Kernel', pct: 100 },
                { label: 'Immutable Audit Ledger', pct: 100 }
            ],
            logs: [
                "INGEST: [Transaction_ID_X9Y] | Rate: 12k/sec",
                "VALIDATOR_CORE: Running Art. 6 Risk Heuristic...",
                "COMPLIANCE_CHECK: [DORA_Resilience] = PASS",
                "LATENCY_AUDIT: 8ms | Status: OPTIMAL",
                "CONSENSUS: Block #89201 Finalized",
                "THREAT_DETECT: Null-Routed IP 192.168.x.x"
            ]
        },
        'ehds-privacy': {
            title: t('uc_ehds_title'),
            subtitle: t('uc_ehds_sub'),
            mission: [
                { label: 'Anonymization Integrity', val: '100%', sub: 'Verified' },
                { label: 'K-Anonymity Score', val: 'k=25', sub: 'Optimal' },
                { label: 'PII Leakage Risk', val: 'Zero', sub: 'Secured' }
            ],
            stack: [
                { label: 'Confidential Computing (TEE)', pct: 100 },
                { label: 'Hardened Arch Linux Node', pct: 100 },
                { label: 'Zero-Knowledge Proof Engine', pct: 99 }
            ],
            logs: [
                "INGEST: HL7_v2_ENCRYPTED | Rate: 1.2k/sec",
                "VALIDATOR_CORE: Initializing Secure Enclave (TEE)...",
                "PRIVACY_CHECK: Differential Privacy Noise [ACTIVE]",
                "EGRESS_CONTROL: Blocked PII Export [PASS]",
                "TEE_ATTESTATION: Intel SGX Verified",
                "CONSENSUS: Proof Submitted to Ledger"
            ]
        },
        'espr-passport': {
            title: t('uc_espr_title'),
            subtitle: t('uc_espr_sub'),
            mission: [
                { label: 'Supply Chain Visibility', val: '100%', sub: 'Real-time' },
                { label: 'Audit Accuracy', val: 'High-Fidelity', sub: 'Verified' },
                { label: 'Regulatory Risk', val: 'Minimal', sub: 'Proactive' }
            ],
            stack: [
                { label: 'Graph-Lineage Engine', pct: 99 },
                { label: 'IoT Edge Ingestion', pct: 100 },
                { label: 'Immutable Material Ledger', pct: 100 }
            ],
            logs: [
                "TRACE: Batch_ID_4420 | Origin: Verified",
                "VALIDATOR_CORE: Mapping Scope 3 Emissions...",
                "COMPLIANCE_CHECK: ESPR Circularity [PASS]",
                "RECOVERY_LOG: Material Recyclability 92%",
                "SUPPLY_CHAIN: Tier-N Supplier Audit [OK]",
                "LIFECYCLE: EOL Recovery Scenario #4"
            ]
        },
        'audit-ledger': {
            title: t('uc_ledger_title'),
            subtitle: t('uc_ledger_sub'),
            mission: [
                { label: t('uc_ledger_m1_label'), val: '100%', sub: 'Verified' },
                { label: t('uc_ledger_m2_label'), val: '14ms', sub: 'Optimized' },
                { label: t('uc_ledger_m3_label'), val: 'Absolute', sub: 'Guaranteed' }
            ],
            stack: [
                { label: t('uc_ledger_s1'), pct: 100 },
                { label: t('uc_ledger_s2'), pct: 100 },
                { label: t('uc_ledger_s3'), pct: 100 }
            ],
            logs: [
                "HASH: 0x8f2...a93 | Protocol: RFC 3161",
                "LEDGER: Appending Decision_ID_8842...",
                "SIGNATURE: Verified by Validator_Node_7",
                "SYNC: Distributed Ledger Consensus [ACTIVE]",
                "INTEGRITY_CHECK: Merkle Root [MATCH]",
                "ARCHIVE: Block #9921 Committed"
            ]
        },
        'edge-velocity': {
            title: t('uc_velocity_title'),
            subtitle: t('uc_velocity_sub'),
            mission: [
                { label: t('uc_velocity_m1_label'), val: '15% Gain', sub: 'Actualized' },
                { label: t('uc_velocity_m2_label'), val: '99.2%', sub: 'Real-time' },
                { label: t('uc_velocity_m3_label'), val: 'Minimal', sub: 'Optimized' }
            ],
            stack: [
                { label: t('uc_velocity_s1'), pct: 100 },
                { label: t('uc_velocity_s2'), pct: 98 },
                { label: t('uc_velocity_s3'), pct: 100 }
            ],
            logs: [
                "EDGE_NODE: Shelf_Zone_A4 | Syncing...",
                "SKU_DETECT: Out-of-Stock detected [SKU_4402]",
                "ACTION: Real-time Staffing Re-allocation Triggered",
                "LATENCY: <100ms | Integrity: 100%",
                "INVENTORY: Update pushed to ERP",
                "VISION_MODEL: Confusion Matrix [OK]"
            ]
        },
        'catena-telemetry': {
            title: t('uc_catena_title'),
            subtitle: t('uc_catena_sub'),
            mission: [
                { label: t('uc_catena_m1_label'), val: '100%', sub: 'Verified' },
                { label: t('uc_catena_m2_label'), val: '90% Reduction', sub: 'Projected' },
                { label: t('uc_catena_m3_label'), val: 'Certified', sub: 'Active' }
            ],
            stack: [
                { label: t('uc_catena_s1'), pct: 100 },
                { label: t('uc_catena_s2'), pct: 98 },
                { label: t('uc_catena_s3'), pct: 100 }
            ],
            logs: [
                "EDC_CONNECTOR: Negotiating Contract... [OK]",
                "DATA_PLANE: Stream_ID_CX99 | Origin: Tier-1 Hub",
                "VALIDATOR_CORE: Verifying TISAX Level 2 Auth...",
                "TRACEABILITY: Parts_Lineage_Verified [CX-0146]",
                "POLICY: Usage Control Policy [ENFORCED]",
                "AUDIT: Transaction committed to Catena Ledger"
            ]
        },
        'default': {
            title: t('global_bank_api'),
            subtitle: 'Explore fully interactive simulations of Adraca\'s capabilities.',
            mission: [
                { label: t('latency'), val: '12ms', sub: t('global_avg') },
                { label: t('throughput'), val: '45,201', sub: t('tx_second') },
                { label: t('threats_blocked'), val: '0', sub: t('last_24h') }
            ],
            stack: [
                { label: 'US-East (N. Virginia)', pct: 98 },
                { label: 'EU-West (Frankfurt)', pct: 100 },
                { label: 'AP-South (Mumbai)', pct: 94 }
            ],
            logs: [
                "Packet verified: 0x8f...a2", "Latency: 12ms", "Optimizing route...",
                "Node synced: EU-West-1", "Throughput: 45k TPS", "Encryption: Lattice-256"
            ]
        }
    };

    const current = config[id || ''] || config['default'];

    // Fix Hydration Mismatch: Initialize with static 20%
    const [graphHeights, setGraphHeights] = useState<number[]>(Array(40).fill(20));

    // Update Graph Heights safely on client
    useEffect(() => {
        if (!active) return;
        const interval = setInterval(() => {
            setGraphHeights(Array.from({ length: 40 }).map(() => 20 + Math.random() * 60));
        }, 800);
        return () => clearInterval(interval);
    }, [active]);
    useEffect(() => {
        if (!active) return;
        const messages = current.logs || config['default'].logs;
        const interval = setInterval(() => {
            setLogs(prev => [messages[Math.floor(Math.random() * messages.length)], ...prev].slice(0, 6));
        }, 800);
        return () => clearInterval(interval);
    }, [active]);

    return (
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0B1221] text-slate-800 dark:text-slate-200 font-sans selection:bg-emerald-100 selection:text-emerald-900">

            {/* Background Grid */}
            <div className="fixed inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.08]"
                style={{ backgroundImage: 'linear-gradient(#64748b 1px, transparent 1px), linear-gradient(90deg, #64748b 1px, transparent 1px)', backgroundSize: '20px 20px' }}>
            </div>

            <div className="relative z-50">
                <Navbar />
            </div>

            <main className="pt-32 pb-20 max-w-7xl mx-auto px-6">

                {/* Header / Nav */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <Link href="/use-cases" className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors uppercase tracking-widest mb-4 group">
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> {t('exit_simulation')}
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">{current.title}</h1>
                        <p className="text-slate-500 dark:text-slate-400 mt-4 max-w-xl text-lg leading-relaxed">{current.subtitle || config['default'].subtitle}</p>
                        <div className="flex items-center gap-3 mt-4">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-sm font-mono text-emerald-600 font-bold">• Live Simulation</span>
                            <span className="text-slate-300">|</span>
                            <span className="text-sm text-slate-500">v2.4.0-stable</span>
                        </div>
                    </div>

                    <div className="flex gap-3">
                        <button onClick={() => setActive(!active)} className={`px-6 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-all ${active ? 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700' : 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-lg shadow-emerald-500/30'}`}>
                            {active ? <><Pause size={16} /> {t('pause_stream')}</> : <><Play size={16} /> {t('resume')}</>}
                        </button>
                        <button onClick={() => setLogs([])} className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-200 dark:hover:border-blue-500/30 transition-all">
                            <RefreshCw size={20} />
                        </button>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* COL 1: Metrics */}
                    <div className="space-y-6">
                        {(current.mission || config['default'].mission).map((m: any, i: number) => (
                            <StatCard key={i} icon={i === 0 ? <Shield /> : i === 1 ? <Activity /> : <Zap />} label={m.label} value={m.val} sub={m.sub} color={i === 0 ? 'blue' : i === 1 ? 'emerald' : 'slate'} />
                        ))}

                        {/* System Health / Stack */}
                        <div className="bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
                            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Protocol Stack</h3>
                            <div className="space-y-3">
                                {(current.stack || config['default'].stack).map((s: any, i: number) => (
                                    <HealthBar key={i} label={s.label} pct={s.pct} />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* COL 2 & 3: Main Viz */}
                    <div className="lg:col-span-2 flex flex-col gap-6">

                        {/* Graph Area */}
                        {/* Interactive DORA/EHDS Simulation */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl h-[400px] relative overflow-hidden flex flex-col shadow-2xl border border-slate-200 dark:border-slate-800">

                            {/* HUD Overlay */}
                            <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-start z-20 pointer-events-none">
                                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded-sm border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-500 shadow-sm">
                                    <span className={`w-2 h-2 rounded-full ${isPrivacy ? 'bg-rose-500' : id === 'espr-passport' ? 'bg-amber-500' : id === 'audit-ledger' ? 'bg-violet-500' : id === 'edge-velocity' ? 'bg-amber-500' : 'bg-emerald-500'} inline-block mr-2 animate-pulse`}></span>
                                    LIVE_NET
                                </div>
                                <div className="text-right space-y-1">
                                    <div className="text-4xl font-mono font-bold text-slate-900 dark:text-white tracking-tighter">{time}</div>
                                    <div className="text-xs font-mono text-slate-400 uppercase tracking-widest">{simConfig.hudSub}</div>
                                    <div className="mt-2 bg-slate-50 dark:bg-slate-800 px-3 py-2 rounded border border-slate-200 dark:border-slate-700 inline-block">
                                        <div className="text-[10px] text-slate-400 font-bold uppercase">{simConfig.counterLabel}</div>
                                        <div className={`text-lg font-mono font-bold ${isPrivacy ? 'text-indigo-600' : id === 'espr-passport' ? 'text-teal-600' : id === 'audit-ledger' ? 'text-violet-600' : id === 'edge-velocity' ? 'text-blue-600' : 'text-emerald-600'}`}>
                                            {id === 'espr-passport' ? carbonCount.toLocaleString() : '#' + txCount.toLocaleString()}
                                        </div>
                                    </div>
                                    {/* Audit Ledger Heartbeat Overlay */}
                                    {id === 'audit-ledger' && (
                                        <div className="mt-1 flex items-center justify-end gap-1 text-[10px] font-bold text-emerald-600 animate-pulse">
                                            <Heart size={10} className="fill-emerald-600" />
                                            LEDGER INTEGRITY: VERIFIED
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Node Graph Container */}
                            <div className="absolute inset-0 flex items-center justify-center z-10">

                                {/* 1. DORA/EHDS Lines Logic (Excluded if ESPR or LEDGER or EDGE) */}
                                {id !== 'espr-passport' && id !== 'audit-ledger' && id !== 'edge-velocity' && (
                                    <div className="absolute w-[60%] h-[2px] bg-slate-100 dark:bg-slate-800 overflow-visible">
                                        {/* Data Pulses / Icons */}
                                        {active && (
                                            <>
                                                {/* Standard Pulse for DORA */}
                                                {id !== 'ehds-privacy' && (
                                                    <>
                                                        <div className="absolute top-0 left-[-10%] w-[20%] h-full bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-[shimmer_2s_linear_infinite]"></div>
                                                        <div className="absolute top-0 left-[-10%] w-[20%] h-full bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-[shimmer_2s_linear_infinite_1s]"></div>
                                                    </>
                                                )}

                                                {/* Icon Logic for EHDS */}
                                                {isPrivacy && (
                                                    <>
                                                        <div className="absolute top-[-12px] left-0 animate-[flowRight_3s_linear_infinite]">
                                                            <div className="bg-white dark:bg-slate-800 p-1 rounded-full shadow-sm border border-rose-200 dark:border-rose-900">
                                                                <Lock size={12} className="text-rose-500" />
                                                            </div>
                                                        </div>
                                                        <div className="absolute top-[-12px] left-0 animate-[flowRight_3s_linear_infinite_1.5s]">
                                                            <div className="bg-white dark:bg-slate-800 p-1 rounded-full shadow-sm border border-rose-200 dark:border-rose-900">
                                                                <Lock size={12} className="text-rose-500" />
                                                            </div>
                                                        </div>
                                                        {/* Output Icons */}
                                                        <div className="absolute top-[-12px] left-1/2 animate-[flowOut_3s_linear_infinite_0.5s] opacity-0">
                                                            <div className="bg-white dark:bg-slate-800 p-1 rounded-full shadow-sm border border-indigo-200 dark:border-indigo-900">
                                                                <Dna size={12} className="text-indigo-500" />
                                                            </div>
                                                        </div>
                                                    </>
                                                )}
                                            </>
                                        )}
                                    </div>
                                )}


                                {/* 2. ESPR Simulation (4-Node) */}
                                {id === 'espr-passport' ? (
                                    <>
                                        {/* Connection Line */}
                                        <div className="absolute w-[80%] h-[2px] bg-slate-100 z-0"></div>
                                        {/* Supply Flow Icons */}
                                        <div className="absolute w-[80%] h-[2px] z-10 overflow-visible">
                                            <div className="absolute top-[-12px] left-[10%] animate-[supplyFlow_4s_linear_infinite]">
                                                <div className="bg-white p-1 rounded-full shadow-sm border border-amber-200">
                                                    <Box size={12} className="text-amber-500" />
                                                </div>
                                            </div>
                                            <div className="absolute top-[-12px] left-[10%] animate-[supplyFlow_4s_linear_infinite_2s]">
                                                <div className="bg-white p-1 rounded-full shadow-sm border border-amber-200">
                                                    <Box size={12} className="text-amber-500" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="flex justify-between w-[85%] relative z-20">
                                            {/* Node 1: Raw Materials */}
                                            <div className="relative group">
                                                <div className="w-16 h-16 rounded-full bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm border border-slate-200 dark:border-slate-700 shadow-md flex items-center justify-center relative z-20">
                                                    <simConfig.node1.icon className={simConfig.node1.color} size={24} />
                                                </div>
                                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center w-32">
                                                    <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase">{simConfig.node1.label}</div>
                                                </div>
                                            </div>

                                            {/* Node 2: Manufacturing (Audited) */}
                                            <div className="relative group">
                                                <div className="w-20 h-20 rounded-full bg-white dark:bg-slate-900 backdrop-blur-md border border-slate-300 dark:border-slate-600 shadow-lg flex items-center justify-center relative z-20">
                                                    <simConfig.node2.icon className={simConfig.node2.color} size={30} />
                                                </div>
                                                {/* Audit Lens */}
                                                {active && <div className="absolute -inset-4 rounded-full border border-teal-400/30 animate-[ping_2s_linear_infinite]"></div>}
                                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center w-32">
                                                    <div className="text-[10px] font-bold text-slate-600 dark:text-slate-400 uppercase">{simConfig.node2.label}</div>
                                                </div>
                                            </div>

                                            {/* Node 3: Distribution */}
                                            <div className="relative group">
                                                <div className="w-16 h-16 rounded-full bg-white/50 backdrop-blur-sm border border-slate-200 shadow-md flex items-center justify-center relative z-20">
                                                    <simConfig.node3.icon className={simConfig.node3.color} size={24} />
                                                </div>
                                                <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center w-32">
                                                    <div className="text-[10px] font-bold text-slate-600 uppercase">{simConfig.node3.label}</div>
                                                </div>
                                            </div>

                                            {/* Node 4: Retail Shelf */}
                                            <div className="relative group">
                                                <div className="w-16 h-16 rounded-full bg-white/50 backdrop-blur-sm border border-slate-200 shadow-md flex items-center justify-center relative z-20">
                                                    <simConfig.node4.icon className={simConfig.node4.color} size={24} />
                                                </div>
                                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-center w-32">
                                                    <div className="text-[10px] font-bold text-slate-600 uppercase">{simConfig.node4.label}</div>
                                                    {/* Success Toast */}
                                                    {auditStatus === 'scanning' && (
                                                        <div className="mt-2 bg-teal-50 border border-teal-100 text-teal-700 text-[10px] px-2 py-1 rounded shadow-sm whitespace-nowrap animate-in slide-in-from-bottom-2 fade-in">
                                                            <CheckCircle className="inline-block mr-1 w-3 h-3" />
                                                            {simConfig.toast}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ) : id === 'audit-ledger' ? (
                                    /* 3. AUDIT LEDGER SIMULATION */
                                    <div className="w-full h-full relative flex flex-col items-center justify-center px-12">

                                        {/* Vertical Data Streams Entering Core */}
                                        <div className="absolute top-0 w-full h-1/2 overflow-hidden pointer-events-none">
                                            {/* Stream 1 */}
                                            <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 animate-[streamDown_2s_linear_infinite]">
                                                <FileText size={16} className="text-violet-300 opacity-70" />
                                            </div>
                                            <div className="absolute top-[-50px] left-[52%] animate-[streamDown_2.5s_linear_infinite_1s]">
                                                <Activity size={14} className="text-blue-300 opacity-60" />
                                            </div>
                                        </div>

                                        {/* Validator Core */}
                                        <div className="relative z-20 mb-16">
                                            <div className="relative">
                                                {/* Core Pulse */}
                                                <div className="absolute -inset-8 bg-violet-500/10 rounded-full blur-xl animate-pulse"></div>
                                                <div className={`w-24 h-24 rounded-full bg-white backdrop-blur-xl border-2 border-violet-200 shadow-[0_0_40px_rgba(139,92,246,0.3)] flex items-center justify-center relative z-30 transition-all duration-300 ${activeBlockIndex % 1 === 0 ? 'scale-105 border-violet-400' : ''}`}>
                                                    <Cpu size={40} className="text-violet-600" />
                                                </div>
                                                {/* Core Label */}
                                                <div className="absolute -right-32 top-1/2 -translate-y-1/2 text-left">
                                                    <div className="text-sm font-bold text-violet-900 uppercase tracking-wider">Validator Core</div>
                                                    <div className="text-[10px] text-violet-400 font-mono">Signer_Node_01</div>
                                                </div>
                                            </div>

                                            {/* Laser Beam Logic: Should point to active block */}
                                            {/* We can simplify by having a beam shoot down to the container of blocks */}
                                            {active && (
                                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[2px] h-16 bg-gradient-to-b from-violet-500 to-transparent animate-[laserShot_0.5s_ease-out_infinite]"></div>
                                            )}
                                        </div>

                                        {/* Horizontal Ledger Block Row */}
                                        <div className="flex items-center gap-4 relative z-20 perspective-[1000px]">
                                            {ledgerBlocks.map((block, idx) => (
                                                <div key={block.id} className={`
                                                    relative w-24 h-24 rounded-xl border flex flex-col items-center justify-center transition-all duration-500 transform
                                                    ${block.status === 'verified'
                                                        ? 'bg-emerald-50 border-emerald-300 scale-100 shadow-lg'
                                                        : block.status === 'active'
                                                            ? 'bg-violet-50 border-violet-400 scale-110 shadow-[0_0_20px_rgba(139,92,246,0.2)]'
                                                            : 'bg-white/40 border-slate-200 scale-95 opacity-60'}
                                                `}>
                                                    <div className="text-xs font-bold text-slate-500 mb-1">{block.id}</div>
                                                    {block.status === 'verified' ? (
                                                        <CheckCircle size={20} className="text-emerald-500" />
                                                    ) : block.status === 'active' ? (
                                                        <div className="w-5 h-5 rounded-full border-2 border-violet-500 border-t-transparent animate-spin"></div>
                                                    ) : (
                                                        <Box size={20} className="text-slate-300" />
                                                    )}

                                                    {/* Hash Display */}
                                                    <div className="absolute bottom-2 text-[8px] font-mono text-slate-400 w-full text-center px-1 truncate">
                                                        {block.hash}
                                                    </div>

                                                    {/* Active Toast for Block */}
                                                    {block.status === 'active' && (
                                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-violet-900 text-white text-[10px] px-2 py-1 rounded shadow-lg whitespace-nowrap animate-[fadeInUp_0.3s_ease-out]">
                                                            DECISION SIGNED
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                            {/* Arrow indicating endless chain */}
                                            <div className="text-slate-300">
                                                <ChevronRight size={20} />
                                            </div>
                                        </div>

                                    </div>
                                ) : id === 'edge-velocity' ? (
                                    /* 4. EDGE-VELOCITY RETAIL GRID */
                                    <div className="w-full h-full relative z-20 bg-slate-50/50">

                                        {/* Floor Plan Grid */}
                                        {gridNodes.map((node) => (
                                            <div
                                                key={node.id}
                                                className="absolute w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 transform -translate-x-1/2 -translate-y-1/2"
                                                style={{ left: `${node.x}%`, top: `${node.y}%` }}
                                            >
                                                <div className={`
                                                    w-full h-full rounded-full flex items-center justify-center shadow-lg border-2 
                                                    ${retailEvent.nodeId === node.id && retailEvent.phase === 'detect' ? 'bg-red-50 border-red-500 animate-pulse' :
                                                        retailEvent.nodeId === node.id && retailEvent.phase === 'resolve' ? 'bg-emerald-50 border-emerald-500' : 'bg-white border-slate-200'}
                                                `}>
                                                    {retailEvent.nodeId === node.id && retailEvent.phase === 'resolve' ? (
                                                        <CheckCircle size={20} className="text-emerald-500" />
                                                    ) : (
                                                        <Box size={20} className={retailEvent.nodeId === node.id && retailEvent.phase === 'detect' ? 'text-red-500' : 'text-slate-400'} />
                                                    )}
                                                </div>

                                                {/* Out of Stock Alert */}
                                                {retailEvent.nodeId === node.id && retailEvent.phase === 'detect' && (
                                                    <div className="absolute -top-8 bg-red-500 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm whitespace-nowrap animate-bounce">
                                                        OUT OF STOCK
                                                    </div>
                                                )}
                                            </div>
                                        ))}

                                        {/* Central Validator Hub */}
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full border-2 border-blue-500 shadow-xl flex flex-col items-center justify-center z-10">
                                            <div className="absolute -inset-4 bg-blue-500/10 rounded-full animate-ping"></div>
                                            <Shield size={24} className="text-blue-600 mb-1" />
                                            <div className="text-[8px] font-bold uppercase text-slate-500">Validator</div>
                                        </div>

                                        {/* Staff Member */}
                                        <div
                                            className="absolute w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg transition-all duration-[1000ms] ease-in-out z-20"
                                            style={{ left: `${staffPos.x}%`, top: `${staffPos.y}%`, transform: 'translate(-50%, -50%)' }}
                                        >
                                            <User size={20} className="text-white" />
                                            {/* Velocity Sync Toast */}
                                            {retailEvent.phase === 'resolve' && (
                                                <div className="absolute bottom-full mb-2 bg-emerald-600 text-white text-[10px] px-3 py-1.5 rounded-lg shadow-xl whitespace-nowrap animate-in fade-in zoom-in">
                                                    Velocity Sync: Staff Optimization +15%
                                                </div>
                                            )}
                                        </div>

                                        {/* Signal Lines (SVG Overlay) */}
                                        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                                            {/* Line from Hub to Active Node */}
                                            {retailEvent.nodeId && (
                                                <line
                                                    x1="50%" y1="50%"
                                                    x2={`${gridNodes.find(n => n.id === retailEvent.nodeId)?.x}%`}
                                                    y2={`${gridNodes.find(n => n.id === retailEvent.nodeId)?.y}%`}
                                                    stroke={retailEvent.phase === 'detect' ? '#ef4444' : '#10b981'}
                                                    strokeWidth="2"
                                                    strokeDasharray="5"
                                                    className="opacity-50 animate-pulse"
                                                />
                                            )}
                                        </svg>

                                    </div>
                                ) : id === 'catena-telemetry' ? (
                                    /* 5. CATENA-X DATA SPACE RING */
                                    <div className="w-full h-full relative flex items-center justify-center">

                                        {/* Digital Twin 3D Wireframe Overlay */}
                                        <div className="absolute top-4 right-4 z-30 bg-white/90 backdrop-blur border border-slate-200 p-3 rounded-xl shadow-lg flex flex-col items-center">
                                            <div className="text-[9px] font-bold text-slate-400 mb-2 tracking-widest uppercase">Digital Twin Sync: ACTIVE</div>
                                            <div className="relative w-16 h-10 perspective-[200px]">
                                                {/* Simulated 3D Rotating Chassis */}
                                                <div className="w-full h-full border-2 border-blue-400 rounded-lg animate-[spinY_4s_linear_infinite] opacity-80 flex items-center justify-center">
                                                    <div className="w-10 h-1 bg-blue-200"></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Data Space Ring */}
                                        <div className="relative w-[300px] h-[300px] border-[3px] border-slate-100 rounded-full flex items-center justify-center">

                                            {/* Ring Label */}
                                            <div className="absolute -top-6 text-xs font-bold text-slate-400 tracking-[0.2em] uppercase">Catena-X Data Space</div>

                                            {/* Central Validator (EDC) */}
                                            <div className="relative z-20 w-24 h-24 bg-white rounded-full border-2 border-blue-100 shadow-xl flex flex-col items-center justify-center">
                                                {/* Shield Effect */}
                                                {catenaState.showShield && (
                                                    <div className="absolute inset-[-20px] rounded-full border-2 border-blue-400/50 animate-ping opacity-50"></div>
                                                )}
                                                {catenaState.showShield && (
                                                    <div className="absolute -top-12 bg-blue-600 text-white text-[10px] px-3 py-1 rounded shadow-lg whitespace-nowrap animate-[fadeInUp_0.5s_ease-out]">
                                                        Contract Negotiated: CX-Saturn Release Compliant
                                                    </div>
                                                )}

                                                <Shield size={32} className={`transition-colors duration-300 ${catenaState.showShield ? 'text-blue-600' : 'text-slate-400'}`} />
                                                <div className="text-[10px] font-bold text-slate-500 mt-1">Sovereign Validator</div>
                                                <div className="text-[8px] font-mono text-slate-300">EDC Connector</div>
                                            </div>

                                            {/* Node 1: Tier-1 Supplier (Left) */}
                                            <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-xl border border-orange-200 shadow-md flex flex-col items-center justify-center z-20">
                                                <Factory size={20} className="text-orange-500 mb-1" />
                                                <div className="text-[8px] font-bold text-slate-600 text-center leading-tight">Tier-1<br />Supplier</div>
                                            </div>

                                            {/* Node 2: OEM (Right) */}
                                            <div className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-white rounded-xl border border-indigo-200 shadow-md flex flex-col items-center justify-center z-20">
                                                <Truck size={20} className="text-indigo-500 mb-1" />
                                                <div className="text-[8px] font-bold text-slate-600 text-center leading-tight">OEM<br />(BMW/VW)</div>
                                            </div>

                                            {/* Node 3: Logistics (Bottom) */}
                                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-14 h-14 bg-white rounded-full border border-slate-200 shadow-sm flex flex-col items-center justify-center z-20">
                                                <Box size={16} className="text-slate-400" />
                                                <div className="text-[7px] font-bold text-slate-400 mt-1">Logistics</div>
                                            </div>

                                            {/* Telemetry Pulse Animation */}
                                            {/* We simulate a path from Left (Supplier) -> Center (Hub) -> Right (OEM) */}
                                            {/* Coordinates: Left (-150px), Center (0), Right (150px) relative to center */}
                                            {catenaState.pulsePhase > 0 && (
                                                <div
                                                    className="absolute w-8 h-8 rounded-full bg-blue-500/20 backdrop-blur border border-blue-400 flex items-center justify-center z-10 transition-all duration-[1500ms] ease-linear"
                                                    style={{
                                                        // Simple linear interpolation based on phase
                                                        transform: `translate(${catenaState.pulsePhase === 1 ? '-75px' : catenaState.pulsePhase === 2 ? '0px' : '75px'}, 0px)`,
                                                        left: '50%',
                                                        top: '50%',
                                                        marginLeft: '-16px', // Center the generic div
                                                        marginTop: '-16px',
                                                        opacity: catenaState.pulsePhase === 3 ? 0 : 1
                                                    }}
                                                >
                                                    <Database size={12} className="text-blue-600" />
                                                </div>
                                            )}

                                        </div>

                                    </div>
                                ) : (
                                    /* 5. DORA / EHDS Standard 3-Node Graph */
                                    <div className="flex justify-between w-[70%] relative">
                                        {/* Node 1: Ingest */}
                                        <div className="relative group">
                                            <div className="w-24 h-24 rounded-full bg-white/50 backdrop-blur-sm border border-slate-200 shadow-lg flex items-center justify-center relative z-20">
                                                <simConfig.node1.icon className={simConfig.node1.color} size={32} />
                                            </div>
                                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center w-32">
                                                <div className="text-xs font-bold text-slate-600 uppercase">{simConfig.node1.label}</div>
                                                <div className="text-[10px] text-slate-400 font-mono">{simConfig.node1.sub}</div>
                                            </div>
                                        </div>

                                        {/* Node 2: Core / Enclave */}
                                        <div className="relative group">
                                            {/* Outer Ring Animation */}
                                            <div className={`absolute -inset-4 rounded-full border border-dashed border-slate-300 ${active ? 'animate-[spin_4s_linear_infinite]' : ''}`}></div>

                                            {/* Scanner Effector for Privacy */}
                                            {isPrivacy && auditStatus === 'scanning' && (
                                                <div className="absolute -inset-8 rounded-full border border-rose-400 opacity-50 animate-ping"></div>
                                            )}

                                            <div className={`w-32 h-32 rounded-full backdrop-blur-md border-2 shadow-xl flex items-center justify-center relative z-20 transition-all duration-500 ${auditStatus === 'verified' ? 'bg-emerald-50/80 border-emerald-400 shadow-emerald-200' : `bg-white/80 border-${isPrivacy ? 'rose' : 'blue'}-400 shadow-${isPrivacy ? 'rose' : 'blue'}-100`}`}>
                                                <simConfig.node2.icon className={`transition-colors duration-500 ${auditStatus === 'verified' ? simConfig.node2.activeColor : simConfig.node2.idleColor}`} size={40} />
                                            </div>

                                            {/* Status Tag */}
                                            <div className={`absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-bold text-white shadow-lg transition-all duration-300 transform whitespace-nowrap ${auditStatus === 'verified' ? 'bg-emerald-500 scale-100 opacity-100' : 'bg-slate-400 scale-90 opacity-0'}`}>
                                                {simConfig.toast}
                                            </div>

                                            {/* Scan Toast for Privacy */}
                                            {isPrivacy && auditStatus === 'scanning' && (
                                                <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-bold text-rose-600 bg-rose-50 border border-rose-200 shadow-sm animate-bounce whitespace-nowrap">
                                                    {simConfig.scanToast}
                                                </div>
                                            )}

                                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center w-40">
                                                <div className="text-sm font-bold text-slate-900 uppercase">{simConfig.node2.label}</div>
                                                <div className="text-[10px] text-slate-400 font-mono">{simConfig.node2.sub}</div>
                                            </div>
                                        </div>

                                        {/* Node 3: Settlement / Research */}
                                        <div className="relative group">
                                            <div className="w-24 h-24 rounded-full bg-white/50 backdrop-blur-sm border border-slate-200 shadow-lg flex items-center justify-center relative z-20">
                                                <simConfig.node3.icon className={simConfig.node3.color} size={32} />
                                            </div>
                                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-center w-32">
                                                <div className="text-xs font-bold text-slate-600 uppercase">{simConfig.node3.label}</div>
                                                <div className="text-[10px] text-slate-400 font-mono">{simConfig.node3.sub}</div>
                                            </div>
                                        </div>
                                    </div>

                                )}
                            </div>

                            {/* Background Grid */}
                            <div className="absolute inset-0 opacity-[0.4]"
                                style={{ backgroundImage: 'linear-gradient(#cbd5e1 1px, transparent 1px), linear-gradient(90deg, #cbd5e1 1px, transparent 1px)', backgroundSize: '40px 40px' }}>
                            </div>

                            {/* Global Keyframes for Icons */}
                            <style jsx>{`
                                @keyframes flowRight {
                                    0% { left: 0%; opacity: 0; transform: scale(0.5); }
                                    10% { opacity: 1; transform: scale(1); }
                                    45% { left: 50%; opacity: 1; transform: scale(1); }
                                    50% { left: 50%; opacity: 0; transform: scale(0); }
                                    100% { left: 50%; opacity: 0; }
                                }
                                @keyframes flowOut {
                                    0% { left: 50%; opacity: 0; transform: scale(0); }
                                    5% { left: 50%; opacity: 1; transform: scale(1); }
                                    90% { left: 100%; opacity: 1; transform: scale(1); }
                                    100% { left: 100%; opacity: 0; transform: scale(0.5); }
                                }
                                @keyframes supplyFlow {
                                    0% { left: 0%; opacity: 0; }
                                    10% { opacity: 1; }
                                    90% { left: 90%; opacity: 1; }
                                    100% { left: 90%; opacity: 0; }
                                }
                                @keyframes streamDown {
                                    0% { top: -20px; opacity: 0; }
                                    20% { opacity: 1; }
                                    90% { top: 100%; opacity: 1; }
                                    100% { top: 100%; opacity: 0; }
                                }
                                @keyframes laserShot {
                                    0% { height: 0; opacity: 0; }
                                    10% { height: 60px; opacity: 1; }
                                    90% { height: 60px; opacity: 1; }
                                    100% { height: 0; opacity: 0; }
                                }
                                @keyframes fadeInUp {
                                    0% { opacity: 0; transform: translate(-50%, 10px); }
                                    100% { opacity: 1; transform: translate(-50%, 0); }
                                }
                                @keyframes spinY {
                                    0% { transform: rotateY(0deg); }
                                    100% { transform: rotateY(360deg); }
                                }
                            `}</style>

                        </div>

                        {/* Live Terminal Logs */}
                        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm font-mono text-xs overflow-hidden max-h-[200px] relative group">
                            <div className="absolute top-4 right-4 text-[10px] text-slate-400 dark:text-slate-500 flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                                {t('live_ledger_output')}
                            </div>
                            <div className="space-y-2 mt-4">
                                {logs.map((log, i) => (
                                    <div key={i} className={`flex gap-3 pb-2 border-b border-slate-50 dark:border-white/5 last:border-0 ${i === 0 ? 'text-slate-900 dark:text-emerald-400 font-bold' : 'text-slate-400 dark:text-slate-500'}`}>
                                        <span className="text-slate-300 dark:text-slate-600 select-none">{new Date().toLocaleTimeString()}</span>
                                        <span className={log.includes("ERR") ? "text-rose-500" : log.includes("WARN") ? "text-amber-500" : ""}>{log}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-white dark:from-slate-900 to-transparent pointer-events-none"></div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

// Sub-components
const StatCard = ({ icon, label, value, sub, color }: any) => (
    <div className="bg-white dark:bg-slate-900/50 p-6 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm hover:shadow-md transition-shadow group">
        <div className="flex items-start justify-between mb-4">
            <div className={`p-3 rounded-xl bg-slate-50 dark:bg-slate-800 text-${color}-600 group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            {color === 'emerald' && <span className="flex h-2 w-2 rounded-full bg-emerald-500"></span>}
        </div>
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</div>
        <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1">{value}</div>
        <div className={`text-xs font-mono font-medium ${color === 'emerald' ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'}`}>{sub}</div>
    </div>
);

const HealthBar = ({ label, pct }: any) => (
    <div className="group">
        <div className="flex justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400 mb-1">
            <span>{label}</span>
            <span className="text-emerald-600 dark:text-emerald-400">{pct}%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
            <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-1000 group-hover:bg-emerald-400"
                style={{ width: `${pct}%` }}
            ></div>
        </div>
    </div>
);
function TerminalIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
    );
}
