import AuthLayout from '@/layouts/auth-layout';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Login({ status, canResetPassword }: { status?: string; canResetPassword?: boolean }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <AuthLayout>
            <Head title="Log in" />

            <div className="space-y-6">
                <div>
                    <h1 className="font-serif text-3xl font-bold tracking-tight text-burgundy">Welcome Back</h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Please enter your details to sign in to your account.
                    </p>
                </div>

                {status && (
                    <div className="rounded-md bg-green-50 p-4 text-sm font-medium text-green-700 shadow-sm transition-all animate-in fade-in">
                        {status}
                    </div>
                )}

                <form onSubmit={submit} className="space-y-5">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-semibold uppercase tracking-wider text-burgundy opacity-80">
                            Email Address
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            className="block w-full border-burgundy/20 bg-cream/30 focus:border-burgundy focus:ring-burgundy"
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            placeholder="you@example.com"
                        />
                        {errors.email && <p className="text-xs font-medium text-destructive animate-in fade-in slide-in-from-top-1">{errors.email}</p>}
                    </div>
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
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            placeholder="••••••••"
                        />
                        {errors.password && <p className="text-xs font-medium text-destructive animate-in fade-in slide-in-from-top-1">{errors.password}</p>}
                    </div>

                    <div className="flex items-center space-x-2">
                        <Checkbox
                            id="remember"
                            name="remember"
                            checked={data.remember}
                            onCheckedChange={(checked) => setData('remember', checked as boolean)}
                            className="border-burgundy/40 data-[state=checked]:bg-burgundy dark:border-burgundy"
                        />
                        <Label
                            htmlFor="remember"
                            className="text-xs font-medium leading-none text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Keep me signed in
                        </Label>
                    </div>

                    <Button 
                        disabled={processing} 
                        className="w-full bg-burgundy hover:bg-burgundy/90 text-white font-semibold py-6 shadow-lg shadow-burgundy/20 transition-all active:scale-[0.98]"
                    >
                        {processing ? 'Signing in...' : 'Sign In'}
                    </Button>
                </form>


            </div>
        </AuthLayout>
    );
}
