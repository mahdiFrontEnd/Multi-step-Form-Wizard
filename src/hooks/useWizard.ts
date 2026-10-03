// src/hooks/useWizard.ts
import { useCallback, useState } from "react";

type UseWizardOptions = {
    steps: readonly string[];
    initialStep?: number;
};

export function useWizard({ steps, initialStep = 0 }: UseWizardOptions) {
    const [currentStep, setCurrentStep] = useState(initialStep);
    const [direction, setDirection] = useState<1 | -1>(1);

    const next = useCallback(() => {
        setDirection(1);
        setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
    }, [steps.length]);

    const prev = useCallback(() => {
        setDirection(-1);
        setCurrentStep((s) => Math.max(s - 1, 0));
    }, []);

    const goTo = useCallback(
        (step: number) => {
            setDirection(step > currentStep ? 1 : -1);
            setCurrentStep(step);
        },
        [currentStep]
    );

    const reset = useCallback(() => {
        setDirection(1);
        setCurrentStep(initialStep);
    }, [initialStep]);

    return {
        currentStep,
        currentStepName: steps[currentStep],
        direction,
        isFirst: currentStep === 0,
        isLast: currentStep === steps.length - 1,
        next,
        prev,
        goTo,
        reset,
    };
}