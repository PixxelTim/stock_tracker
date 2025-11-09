'use client';

import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import InputField from "@/components/forms/InputField";
import SelectField from "@/components/forms/SelectField";
import { INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS } from "@/lib/constants";
import { CountrySelectField } from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";
import { signUpWithEmail } from "@/lib/actions/auth.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SignUp = () => {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            country: 'US',
            investmentGoals: 'Growth',
            riskTolerance: 'Medium',
            preferredIndustry: 'Technology'
        },
        mode: 'onBlur'
    });

    const onSubmit = async (data: SignUpFormData) => {
        try {
            const result = await signUpWithEmail(data);
            if (result.success) {
                toast.success('Registrierung erfolgreich!', {
                    description: 'Willkommen bei Signalist Stock Tracker'
                });
                router.push('/');
            } else {
                toast.error('Registrierung fehlgeschlagen', {
                    description: result.error || 'Ein unerwarteter Fehler ist aufgetreten.'
                });
            }
        } catch (e) {
            toast.error('Registrierung fehlgeschlagen', {
                description: e instanceof Error ? e.message : 'Fehler beim Erstellen des Kontos.'
            });
        }
    };

    return (
        <>
            <h1 className="form-title">Konto erstellen</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <InputField
                    name="fullName"
                    label="Vollständiger Name"
                    placeholder="Max Mustermann"
                    register={register}
                    error={errors.fullName}
                    validation={{
                        required: 'Vollständiger Name ist erforderlich',
                        minLength: { value: 2, message: 'Name muss mindestens 2 Zeichen lang sein' }
                    }}
                />

                <InputField
                    name="email"
                    label="E-Mail-Adresse"
                    placeholder="hello@example.com"
                    register={register}
                    error={errors.email}
                    validation={{
                        required: 'E-Mail-Adresse ist erforderlich',
                        pattern: { value: /^\S+@\S+\.\S+$/, message: 'Ungültige E-Mail-Adresse' }
                    }}
                />

                <InputField
                    name="password"
                    label="Passwort"
                    placeholder="Geben Sie ein sicheres Passwort ein"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{
                        required: 'Passwort ist erforderlich',
                        minLength: { value: 8, message: 'Passwort muss mindestens 8 Zeichen lang sein' }
                    }}
                />

                <CountrySelectField
                    name="country"
                    label="Land"
                    control={control}
                    error={errors.country}
                    required
                />

                <SelectField
                    name="investmentGoals"
                    label="Investmentziele"
                    placeholder="Wählen Sie Ihr Investmentziel"
                    options={INVESTMENT_GOALS}
                    control={control}
                    error={errors.investmentGoals}
                    required
                />

                <SelectField
                    name="riskTolerance"
                    label="Risikobereitschaft"
                    placeholder="Wählen Sie Ihr Risikoniveau"
                    options={RISK_TOLERANCE_OPTIONS}
                    control={control}
                    error={errors.riskTolerance}
                    required
                />

                <SelectField
                    name="preferredIndustry"
                    label="Bevorzugte Branche"
                    placeholder="Wählen Sie Ihre bevorzugte Branche"
                    options={PREFERRED_INDUSTRIES}
                    control={control}
                    error={errors.preferredIndustry}
                    required
                />

                <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                    {isSubmitting ? 'Konto wird erstellt...' : 'Starte Deine Investmentreise'}
                </Button>

                <FooterLink text="Bereits ein Konto?" linkText="Anmelden" href="/sign-in" />
            </form>
        </>
    );
};

export default SignUp;
