import AuthLayout from '@/layouts/auth-layout';
import { Button } from '@/components/ui/button';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function VerifyEmail({ status }: { status?: string }) {
    const { post, processing } = useForm({});

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <AuthLayout>
            <Head title="Email Verification" />

            <div className="space-y-6">
                <div>
                    <h1 className="font-serif text-3xl font-bold tracking-tight text-burgundy">Verify Email</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Thanks for signing up! Before getting started, could you verify your email address by clicking on the link we just emailed to you? If you didn't receive the email, we will gladly send you another.
                    </p>
                </div>

                {status === 'verification-link-sent' && (
                    <div className="rounded-md bg-green-50 p-4 text-sm font-medium text-green-700 shadow-sm transition-all animate-in fade-in">
                        A new verification link has been sent to the email address you provided during registration.
                    </div>
                )}

                <form onSubmit={submit} className="space-y-5">
                    <div className="flex flex-col space-y-4">
                        <Button 
                            disabled={processing} 
                            className="w-full bg-burgundy hover:bg-burgundy/90 text-white font-semibold py-6 shadow-lg shadow-burgundy/20 transition-all active:scale-[0.98]"
                        >
                            {processing ? 'Sending...' : 'Resend Verification Email'}
                        </Button>

                        <div className="flex items-center justify-center">
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="text-sm font-bold text-burgundy hover:underline underline-offset-4"
                            >
                                Log Out
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </AuthLayout>
    );
}
