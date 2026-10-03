// src/components/ProgressBar.tsx
import { motion } from "framer-motion";

type ProgressBarProps = {
    steps: readonly string[];
    currentStep: number;
    onStepClick?: (index: number) => void;
};

const LABELS: Record<string, string> = {
    personal: "اطلاعات شخصی",
    address: "آدرس",
    confirm: "تأیید",
};

export function ProgressBar({ steps, currentStep, onStepClick }: ProgressBarProps) {
    return (
        <div className="progress-bar">
            {steps.map((step, i) => {
                const isActive = i === currentStep;
                const isCompleted = i < currentStep;

                return (
                    <div key={step} className="progress-step">
                        <button
                            type="button"
                            className={`step-circle ${isActive ? "active" : ""} ${
                                isCompleted ? "completed" : ""
                            }`}
                            onClick={() => isCompleted && onStepClick?.(i)}
                            disabled={!isCompleted}
                            aria-label={`مرحله ${i + 1}: ${LABELS[step]}`}
                        >
                            {isCompleted ? "✓" : i + 1}
                        </button>

                        <span className={`step-label ${isActive ? "active" : ""}`}>
              {LABELS[step]}
            </span>

                        {i < steps.length - 1 && (
                            <div className="step-line-wrapper">
                                <motion.div
                                    className="step-line"
                                    initial={false}
                                    animate={{ scaleX: isCompleted ? 1 : 0 }}
                                    transition={{ duration: 0.4, ease: "easeInOut" }}
                                    style={{ originX: 0 }}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </div>
    );
}