import AuthLayout from '@/layouts/auth-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function ConfirmPassword() {
    const { data, setData, post, processing, errors, reset } = useForm({
        password: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('password.confirm'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout>
            <Head title="Confirm Password" />

            <div className="space-y-6">
                <div>
                    <h1 className="font-serif text-3xl font-bold tracking-tight text-burgundy">Security Check</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        This is a secure area of the application. Please confirm your password before continuing.
                    </p>
                </div>

                <form onSubmit={submit} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-semibold uppercase tracking-wider text-burgundy opacity-80">
                            Password
                        </Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            className="block w-full border-burgundy/20 bg-cream/30 focus:border-burgundy focus:ring-burgundy"
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="text-xs font-medium text-destructive animate-in fade-in slide-in-from-top-1">{errors.password}</p>}
                    </div>

                    <Button 
                        disabled={processing} 
                        className="w-full bg-burgundy hover:bg-burgundy/90 text-white font-semibold py-6 shadow-lg shadow-burgundy/20 transition-all active:scale-[0.98]"
                    >
                        {processing ? 'Confirming...' : 'Confirm Registration'}
                    </Button>
                </form>
            </div>
        </AuthLayout>
    );
}
