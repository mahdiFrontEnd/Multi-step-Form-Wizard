// src/components/WizardNavigation.tsx
import { motion } from "framer-motion";

type WizardNavigationProps = {
    isFirst: boolean;
    isLast: boolean;
    isValid: boolean;
    isSubmitting: boolean;
    onPrev: () => void;
    onNext: () => void;
};

export function WizardNavigation({
                                     isFirst,
                                     isLast,
                                     isValid,
                                     isSubmitting,
                                     onPrev,
                                     onNext,
                                 }: WizardNavigationProps) {
    return (
        <div className="wizard-navigation">
            <motion.button
                type="button"
                onClick={onPrev}
                disabled={isFirst}
                whileHover={!isFirst ? { scale: 1.03 } : {}}
                whileTap={!isFirst ? { scale: 0.97 } : {}}
                className="btn btn-secondary"
            >
                قبلی
            </motion.button>

            {!isLast ? (
                <motion.button
                    type="button"
                    onClick={onNext}
                    disabled={!isValid}
                    whileHover={isValid ? { scale: 1.03 } : {}}
                    whileTap={isValid ? { scale: 0.97 } : {}}
                    className="btn btn-primary"
                >
                    بعدی
                </motion.button>
            ) : (
                <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="btn btn-primary"
                >
                    {isSubmitting ? "در حال ارسال..." : "تأیید و ارسال"}
                </motion.button>
            )}
        </div>
    );
}