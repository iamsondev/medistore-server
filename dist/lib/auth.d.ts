export declare const auth: import("better-auth/*").Auth<{
    database: (options: import("better-auth/*").BetterAuthOptions) => import("better-auth/*").DBAdapter<import("better-auth/*").BetterAuthOptions>;
    user: {
        additionalFields: {
            role: {
                type: "string";
                defaultValue: string;
            };
            status: {
                type: "string";
                defaultValue: string;
            };
        };
    };
    emailAndPassword: {
        enabled: true;
        autoSignIn: false;
        requireEmailVerification: true;
    };
    emailVerification: {
        sendOnSignIn: true;
        autoSignInAfterVerification: true;
        sendVerificationEmail: ({ user, token }: {
            user: import("better-auth/*").User;
            url: string;
            token: string;
        }) => Promise<void>;
    };
    socialProviders: {
        google: {
            prompt: "select_account consent";
            accessType: "offline";
            clientId: string;
            clientSecret: string;
        };
    };
    trustedOrigins: string[];
}>;
//# sourceMappingURL=auth.d.ts.map