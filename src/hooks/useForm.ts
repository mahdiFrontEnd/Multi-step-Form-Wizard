// src/hooks/useForm.ts
import {useCallback, useMemo, useState} from "react";

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

type Validator<T> = (value: T[keyof T]) => string | null;

export type FormConfig<T extends Record<string, unknown>> = {
    initialValues: T;
    validators?: Partial<Record<keyof T, Validator<T>>>;
    onSubmit: (values: T) => void | Promise<void>;
};

export type FormReturn<T extends Record<string, unknown>> = {
    values: T;
    errors: Partial<Record<keyof T, string>>;
    touched: Partial<Record<keyof T, boolean>>;
    isSubmitting: boolean;
    isValid: boolean;
    handleChange: <K extends keyof T>(field: K, value: T[K]) => void;
    handleBlur: (field: keyof T) => void;
    handleSubmit: (e: React.FormEvent) => Promise<void>;
    reset: () => void;
};

// ─────────────────────────────────────────────
// Hook
// ─────────────────────────────────────────────

export function useForm<T extends Record<string, unknown>>(
    config: FormConfig<T>
): FormReturn<T> {
    const {initialValues, validators = {}, onSubmit} = config;

    // ─── State ها ───
    const [values, setValues] = useState<T>(initialValues);
    const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
    const [touched, setTouched] = useState<Partial<Record<keyof T, boolean>>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ─── اعتبارسنجی یک فیلد ───
    const validateField = useCallback(
        <K extends keyof T>(field: K, value: T[K]): string | null => {
            const validator = validators[field];
            return validator ? validator(value) : null;
        },
        [validators]
    );

    // ─── handleChange ───
    const handleChange = useCallback(
        <K extends keyof T>(field: K, value: T[K]) => {
            setValues((prev) => ({...prev, [field]: value}));

            // اگه فیلد قبلاً touched شده، همون لحظه validate کن
            if (touched[field]) {
                const error = validateField(field, value);
                setErrors((prev) => ({...prev, [field]: error ?? undefined}));
            }
        },
        [touched, validateField]
    );

    // ─── handleBlur (برای touched) ───
    const handleBlur = useCallback(
        (field: keyof T) => {
            setTouched((prev) => ({...prev, [field]: true}));

            const error = validateField(field, values[field]);
            setErrors((prev) => ({...prev, [field]: error ?? undefined}));
        },
        [values, validateField]
    );

    // ─── isValid (با useMemo) ───
    const isValid = useMemo(() => {
        return (Object.keys(values) as Array<keyof T>).every((field) => {
            const validator = validators[field];
            if (!validator) return true;
            return validator(values[field]) === null;
        });
    }, [values, validators]);

    // ─── handleSubmit ───
    const handleSubmit = useCallback(
        async (e: React.FormEvent) => {
            e.preventDefault();

            // همه‌ی فیلدها رو validate کن
            const newErrors: Partial<Record<keyof T, string>> = {};
            let hasError = false;

            (Object.keys(values) as Array<keyof T>).forEach((field) => {
                const error = validateField(field, values[field]);
                if (error) {
                    newErrors[field] = error;
                    hasError = true;
                }
            });

            // همه رو touched کن
            const allTouched = (Object.keys(values) as Array<keyof T>).reduce(
                (acc, field) => {
                    acc[field] = true;
                    return acc;
                },
                {} as Partial<Record<keyof T, boolean>>
            );
            setTouched(allTouched);

            setErrors(newErrors);

            if (hasError) return;

            // Submit
            setIsSubmitting(true);
            try {
                await onSubmit(values);
            } catch (error) {
                console.error("Submit error:", error);
            } finally {
                setIsSubmitting(false);
            }
        },
        [values, validateField, onSubmit]
    );

    // ─── reset ───
    const reset = useCallback(() => {
        setValues(initialValues);
        setErrors({});
        setTouched({});
        setIsSubmitting(false);
    }, [initialValues]);

    return {
        values,
        errors,
        touched,
        isSubmitting,
        isValid,
        handleChange,
        handleBlur,
        handleSubmit,
        reset,
    };
}