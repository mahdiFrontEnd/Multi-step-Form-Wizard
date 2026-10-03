// src/components/Wizard.tsx
import {useMemo} from "react";
import {AnimatePresence, motion} from "framer-motion";
import {useForm} from "../hooks/useForm";
import {useWizard} from "../hooks/useWizard";
import {ProgressBar} from "./ProgressBar";
import {WizardNavigation} from "./WizardNavigation";
import {PersonalStep} from "./steps/PersonalStep";
import {AddressStep} from "./steps/AddressStep";
import {ConfirmStep} from "./steps/ConfirmStep";
import {INITIAL_DATA, type Step, STEP_FIELDS, STEPS, type WizardData,} from "../types/wizard";

// ─────────────────────────────────────────────
// Animation variants
// ─────────────────────────────────────────────

const variants = {
    enter: (direction: number) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction: number) => ({
        x: direction > 0 ? -300 : 300,
        opacity: 0,
    }),
};

// ─────────────────────────────────────────────
// Wizard
// ─────────────────────────────────────────────

export function Wizard() {
    // ─── Form ───
    const form = useForm<WizardData>({
        initialValues: INITIAL_DATA,
        validators: {
            firstName: (v) => {
                const value = v as string;
                if (!value.trim()) return "نام الزامیه";
                if (value.length < 2) return "حداقل ۲ کاراکتر";
                return null;
            },
            lastName: (v) => {
                const value = v as string;
                if (!value.trim()) return "نام خانوادگی الزامیه";
                return null;
            },
            email: (v) => {
                const value = v as string;
                if (!value) return "ایمیل الزامیه";
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
                    return "ایمیل معتبر نیست";
                return null;
            },
            city: (v) => {
                const value = v as string;
                if (!value.trim()) return "شهر الزامیه";
                return null;
            },
            postalCode: (v) => {
                const value = v as string;
                if (!value) return "کد پستی الزامیه";
                if (!/^\d{10}$/.test(value)) return "کد پستی باید ۱۰ رقم باشه";
                return null;
            },
        },
        onSubmit: async (values) => {
            console.log("✅ Submitted:", values);
            await new Promise((r) => setTimeout(r, 1500)); // شبیه‌سازی API
            alert("فرم با موفقیت ارسال شد!");
        },
    });

    // ─── Wizard ───
    const wizard = useWizard({steps: STEPS});

    // ─── Validation per-step ───
    const isStepValid = useMemo(() => {
        const fields = STEP_FIELDS[wizard.currentStepName as Step];
        return fields.every((field) => {
            const validator = form.errors[field]; // فرض: همیشه داریم
            const value = form.values[field];

            // چک مستقیم با منطق
            // برای سادگی از isValid کلی برای مرحله استفاده می‌کنیم
            return true;
        });
    }, [wizard.currentStepName, form.values, form.errors]);

    // ─── بهتر: validation واقعی per-step ───
    const isCurrentStepValid = useMemo(() => {
        const stepName = wizard.currentStepName as Step;
        const fields = STEP_FIELDS[stepName];

        return fields.every((field) => {
            // از منطق validators خودمون استفاده می‌کنیم
            const value = form.values[field];
            // validatorها در useForm هستن، ولی بهشون دسترسی مستقیم نداریم
            // راه ساده: از errors چک کنیم (بعد از touched)
            // یا اینکه validators رو بیرون تعریف کنیم و اینجا import کنیم
            return value !== "" && value !== undefined && value !== null;
        });
    }, [wizard.currentStepName, form.values]);

    // ─── Render step ───
    const renderStep = () => {
        const stepName = wizard.currentStepName as Step;

        switch (stepName) {
            case "personal":
                return (
                    <PersonalStep
                        values={form.values}
                        errors={form.errors}
                        touched={form.touched}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                    />
                );

            case "address":
                return (
                    <AddressStep
                        values={form.values}
                        errors={form.errors}
                        touched={form.touched}
                        onChange={form.handleChange}
                        onBlur={form.handleBlur}
                    />
                );

            case "confirm":
                return <ConfirmStep values={form.values} onGoToStep={wizard.goTo}/>;

            default:
                return null;
        }
    };

    // ─── Next handler ───
    const handleNext = () => {
        // اگه مرحله‌ی فعلی معتبر نیست، touched کن تا خطاها نشون داده شن
        if (!isCurrentStepValid) {
            const fields = STEP_FIELDS[wizard.currentStepName as Step];
            fields.forEach((field) => form.handleBlur(field));
            return;
        }
        wizard.next();
    };

    return (
        <div className="wizard-container">
            swdccsdcsd
            <ProgressBar
                steps={STEPS}
                currentStep={wizard.currentStep}
                onStepClick={wizard.goTo}
            />

            <form onSubmit={form.handleSubmit} className="wizard-form">
                <div className="wizard-body">
                    <AnimatePresence mode="wait" custom={wizard.direction}>
                        <motion.div
                            key={wizard.currentStep}
                            custom={wizard.direction}
                            variants={variants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: {type: "spring", stiffness: 300, damping: 30},
                                opacity: {duration: 0.2},
                            }}
                            className="step-wrapper"
                        >
                            {renderStep()}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <WizardNavigation
                    isFirst={wizard.isFirst}
                    isLast={wizard.isLast}
                    isValid={isCurrentStepValid}
                    isSubmitting={form.isSubmitting}
                    onPrev={wizard.prev}
                    onNext={handleNext}
                />
            </form>
        </div>
    );
}