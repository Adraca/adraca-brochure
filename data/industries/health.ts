
import { translations } from '../../utils/translations';

export type TranslationKey = keyof typeof translations;

export interface HealthMetric {
    value: string;
    label: TranslationKey;
}

export interface HealthSolution {
    title: TranslationKey;
    description: TranslationKey;
    icon: string;
    metrics: HealthMetric[];
}

export interface HealthCapability {
    title: TranslationKey;
    description: TranslationKey;
}

export const healthcareData = {
    hero: {
        headline: "health_hero_headline" as TranslationKey,
        subhead: "health_hero_subhead" as TranslationKey,
    },
    solutions: [
        {
            title: "sol_confidential_compute" as TranslationKey,
            description: "sol_confidential_compute_desc" as TranslationKey,
            icon: "fa-solid fa-user-shield",
            metrics: [
                { value: "TEE", label: "lbl_hardware_isolation" as TranslationKey },
                { value: "AMD-SEV", label: "lbl_sev_snp" as TranslationKey }
            ]
        },
        {
            title: "sol_federated_learning" as TranslationKey,
            description: "sol_federated_learning_desc" as TranslationKey,
            icon: "fa-solid fa-network-wired",
            metrics: [
                { value: "EHDS", label: "lbl_compliance" as TranslationKey },
                { value: "0", label: "lbl_data_movement" as TranslationKey }
            ]
        },
        {
            title: "sol_synthetic_data" as TranslationKey,
            description: "sol_synthetic_data_desc" as TranslationKey,
            icon: "fa-solid fa-flask",
            metrics: [
                { value: "99.9%", label: "lbl_statistical_fidelity" as TranslationKey },
                { value: "GDPR", label: "lbl_privacy_safe" as TranslationKey }
            ]
        }
    ],
    capabilities: [
        {
            title: "cap_fhir_omop" as TranslationKey,
            description: "cap_fhir_omop_desc" as TranslationKey,
        },
        {
            title: "cap_homomorphic" as TranslationKey,
            description: "cap_homomorphic_desc" as TranslationKey,
        },
        {
            title: "cap_nvidia_flare" as TranslationKey,
            description: "cap_nvidia_flare_desc" as TranslationKey,
        },
        {
            title: "cap_gxp_mlops" as TranslationKey,
            description: "cap_gxp_mlops_desc" as TranslationKey,
        }
    ]
};
