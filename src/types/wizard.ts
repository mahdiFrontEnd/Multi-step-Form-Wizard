// src/types/wizard.ts
export const STEPS = ["personal", "address", "confirm"] as const;
export type Step = (typeof STEPS)[number];

export type WizardData = {
    firstName: string;
    lastName: string;
    email: string;
    city: string;
    postalCode: string;
};

export const INITIAL_DATA: WizardData = {
    firstName: "",
    lastName: "",
    email: "",
    city: "",
    postalCode: "",
};

// فیلدهای هر مرحله — برای validation per-step
export const STEP_FIELDS: Record<Step, (keyof WizardData)[]> = {
    personal: ["firstName", "lastName", "email"],
    address: ["city", "postalCode"],
    confirm: [],
};