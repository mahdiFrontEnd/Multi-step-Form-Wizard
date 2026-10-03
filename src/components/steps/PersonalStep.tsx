// src/components/steps/PersonalStep.tsx
import type { WizardData } from "../../types/wizard";

type StepProps = {
    values: WizardData;
    errors: Partial<Record<keyof WizardData, string>>;
    touched: Partial<Record<keyof WizardData, boolean>>;
    onChange: <K extends keyof WizardData>(field: K, value: WizardData[K]) => void;
    onBlur: (field: keyof WizardData) => void;
};

export function PersonalStep({ values, errors, touched, onChange, onBlur }: StepProps) {
    return (
        <div className="step-content">
            <h2>اطلاعات شخصی</h2>

            <div className="field">
                <label htmlFor="firstName">نام</label>
                <input
                    id="firstName"
                    value={values.firstName}
                    onChange={(e) => onChange("firstName", e.target.value)}
                    onBlur={() => onBlur("firstName")}
                    placeholder="مثلاً علی"
                />
                {touched.firstName && errors.firstName && (
                    <span className="error">{errors.firstName}</span>
                )}
            </div>

            <div className="field">
                <label htmlFor="lastName">نام خانوادگی</label>
                <input
                    id="lastName"
                    value={values.lastName}
                    onChange={(e) => onChange("lastName", e.target.value)}
                    onBlur={() => onBlur("lastName")}
                    placeholder="مثلاً محمدی"
                />
                {touched.lastName && errors.lastName && (
                    <span className="error">{errors.lastName}</span>
                )}
            </div>

            <div className="field">
                <label htmlFor="email">ایمیل</label>
                <input
                    id="email"
                    type="email"
                    value={values.email}
                    onChange={(e) => onChange("email", e.target.value)}
                    onBlur={() => onBlur("email")}
                    placeholder="ali@example.com"
                    dir="ltr"
                />
                {touched.email && errors.email && (
                    <span className="error">{errors.email}</span>
                )}
            </div>
        </div>
    );
}