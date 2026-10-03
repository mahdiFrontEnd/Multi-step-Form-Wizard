// src/components/steps/AddressStep.tsx
import type { WizardData } from "../../types/wizard";

type StepProps = {
    values: WizardData;
    errors: Partial<Record<keyof WizardData, string>>;
    touched: Partial<Record<keyof WizardData, boolean>>;
    onChange: <K extends keyof WizardData>(field: K, value: WizardData[K]) => void;
    onBlur: (field: keyof WizardData) => void;
};

export function AddressStep({ values, errors, touched, onChange, onBlur }: StepProps) {
    return (
        <div className="step-content">
            <h2>آدرس</h2>

            <div className="field">
                <label htmlFor="city">شهر</label>
                <input
                    id="city"
                    value={values.city}
                    onChange={(e) => onChange("city", e.target.value)}
                    onBlur={() => onBlur("city")}
                    placeholder="مثلاً تهران"
                />
                {touched.city && errors.city && (
                    <span className="error">{errors.city}</span>
                )}
            </div>

            <div className="field">
                <label htmlFor="postalCode">کد پستی</label>
                <input
                    id="postalCode"
                    value={values.postalCode}
                    onChange={(e) => onChange("postalCode", e.target.value)}
                    onBlur={() => onBlur("postalCode")}
                    placeholder="۱۰ رقم"
                    inputMode="numeric"
                    dir="ltr"
                />
                {touched.postalCode && errors.postalCode && (
                    <span className="error">{errors.postalCode}</span>
                )}
            </div>
        </div>
    );
}