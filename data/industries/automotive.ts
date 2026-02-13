import { Share2, Battery, Cloud, Shield, Database, Radio, Activity, Workflow } from "lucide-react";

export const automotiveData = {
    hero: {
        headline: "auto_hero_headline",
        subhead: "auto_hero_subhead",
        cta_primary: "auto_hero_cta_primary",
        cta_secondary: "auto_hero_cta_secondary",
    },
    solutions: [
        {
            id: "catena-x",
            title: "sol_catena_title",
            desc: "sol_catena_desc",
            icon: Share2,
            statLabel: "sol_catena_stat_label",
            statValue: "100%",
            colorClass: "text-amber-500 bg-amber-500/10",
        },
        {
            id: "battery-passport",
            title: "sol_battery_title",
            desc: "sol_battery_desc",
            icon: Battery,
            statLabel: "sol_battery_stat_label",
            statValue: "EU-2027",
            colorClass: "text-emerald-500 bg-emerald-500/10",
        },
        {
            id: "sdv-infra",
            title: "sol_sdv_title",
            desc: "sol_sdv_desc",
            icon: Cloud,
            statLabel: "sol_sdv_stat_label",
            statValue: "<10ms",
            colorClass: "text-blue-500 bg-blue-500/10",
        }
    ],
    capabilities: {
        title: "cap_title",
        items: [
            { text: "cap_edc", icon: Database },
            { text: "cap_vss", icon: Activity },
            { text: "cap_adas", icon: Radio },
            { text: "cap_ota", icon: Shield },
        ]
    }
};
