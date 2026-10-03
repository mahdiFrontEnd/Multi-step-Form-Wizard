// src/components/steps/ConfirmStep.tsx
import type { WizardData } from "../../types/wizard";

type ConfirmStepProps = {
    values: WizardData;
    onGoToStep: (step: number) => void;
};

export function ConfirmStep({ values, onGoToStep }: ConfirmStepProps) {
    return (
        <div className="step-content">
            <h2>تأیید اطلاعات</h2>

            <div className="summary">
                <div className="summary-section">
                    <h3>اطلاعات شخصی</h3>
                    <dl>
                        <dt>نام:</dt>
                        <dd>
                            {values.firstName} {values.lastName}
                        </dd>
                        <dt>ایمیل:</dt>
                        <dd dir="ltr">{values.email}</dd>
                    </dl>
                    <button type="button" onClick={() => onGoToStep(0)}>
                        ویرایش
                    </button>
                </div>

                <div className="summary-section">
                    <h3>آدرس</h3>
                    <dl>
                        <dt>شهر:</dt>
                        <dd>{values.city}</dd>
                        <dt>کد پستی:</dt>
                        <dd dir="ltr">{values.postalCode}</dd>
                    </dl>
                    <button type="button" onClick={() => onGoToStep(1)}>
                        ویرایش
                    </button>
                </div>
            </div>
        </div>
    );
}