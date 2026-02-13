
import {
    Zap,
    Activity,
    Shield,
    Cpu,
    Globe,
    BarChart3
} from "lucide-react";

export const energyData = {
    id: "energy",
    hero: {
        badge: "neural_grid_online", // Existing key
        headline: "energy_hero_headline",
        subhead: "energy_hero_desc",
        cta_primary: "energy_cta_audit",
        cta_secondary: "live_data_map" // Existing key
    },
    solutions: [
        {
            id: "vpp-01",
            title: "energy_sol_vpp_title",
            desc: "energy_sol_vpp_desc",
            icon: Zap,
            statLabel: "lbl_capacity",
            statValue: "1.2 GW",
            colorClass: "text-cyan-600",
            beamColor: "#06b6d4",
            status: "status_active",
            subStatus: "sub_uptime"
        },
        {
            id: "lb-02",
            title: "energy_sol_load_title",
            desc: "energy_sol_load_desc",
            icon: Activity,
            statLabel: "lbl_latency",
            statValue: "< 14ms",
            colorClass: "text-yellow-500",
            beamColor: "#eab308",
            status: "status_optimal",
            subStatus: "sub_jitter"
        },
        {
            id: "esg-03",
            title: "energy_sol_esg_title",
            desc: "energy_sol_esg_desc",
            icon: Shield,
            statLabel: "lbl_compliance",
            statValue: "CSRD/E1",
            colorClass: "text-green-600",
            beamColor: "#16a34a",
            status: "status_verified",
            subStatus: "sub_realtime"
        }
    ],
    capabilities: {
        title: "energy_cap_title",
        items: [
            {
                text: "energy_cap_1",
                icon: BarChart3
            },
            {
                text: "energy_cap_2",
                icon: Cpu
            },
            {
                text: "energy_cap_3",
                icon: Shield
            },
            {
                text: "energy_cap_4",
                icon: Globe
            }
        ]
    }
};
