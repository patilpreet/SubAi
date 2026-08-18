import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { n as supabase, t as createSsrRpc } from "./createSsrRpc-D7Qz9ddr.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/authStore-0OVhq_th.js
var sendWelcomeEmail = createServerFn({ method: "POST" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload || typeof payload.email !== "string") throw new Error("email is required");
	return {
		email: payload.email,
		name: payload.name || "there"
	};
}).handler(createSsrRpc("a147262f7d8bff0566996274a8d381519f557d9bdf90a91291809184d4b4530a"));
createServerFn({ method: "POST" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload || typeof payload.email !== "string") throw new Error("email is required");
	return {
		email: payload.email,
		name: payload.name || "there"
	};
}).handler(createSsrRpc("0fcd7c59fb9dbafd8bac6460d9266399c12dc620e3e9bf0884d64e52d7fdaa97"));
createServerFn({ method: "POST" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload || typeof payload.email !== "string" || !payload.budgetData) throw new Error("email and budgetData are required");
	return {
		email: payload.email,
		name: payload.name || "there",
		budgetData: payload.budgetData
	};
}).handler(createSsrRpc("678becf78b64b91e0ed14096a87890e2afd868e8a7994bdb056ce7ea7c6097ea"));
/**
* Minimal auth store powered by Supabase.
* Keeps the current user / session in zustand so every component can read
* `useAuthStore(s => s.user)` without prop-drilling.
*/
var useAuthStore = create((set) => ({
	user: null,
	session: null,
	loading: true,
	_unsubscribe: null,
	/** Call once at app boot (e.g. in __root or a top-level effect). */
	init: async () => {
		try {
			const { data: { session } } = await supabase.auth.getSession();
			set({
				session,
				user: session?.user ?? null,
				loading: false
			});
		} catch (err) {
			console.error("authStore init error:", err);
			set({ loading: false });
		}
		const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
			set({
				session,
				user: session?.user ?? null
			});
			if (event === "SIGNED_IN" && session?.user) {
				const userId = session.user.id;
				if (!(typeof window !== "undefined" && localStorage.getItem(`welcome_sent_${userId}`))) {
					const email = session.user.email;
					const name = session.user.user_metadata?.full_name || email?.split("@")[0] || "there";
					if (email) sendWelcomeEmail({
						email,
						name
					}).then(() => {
						localStorage.setItem(`welcome_sent_${userId}`, "true");
					}).catch((err) => console.warn("Welcome email failed:", err));
				}
			}
		});
		set({ _unsubscribe: subscription.unsubscribe.bind(subscription) });
	},
	/** Sign up with email + password. Returns { data, error }. */
	signUp: async (email, password, fullName) => {
		const { data, error } = await supabase.auth.signUp({
			email,
			password,
			options: { data: { full_name: fullName } }
		});
		if (!error && data?.user && data?.session) set({
			user: data.user,
			session: data.session
		});
		return {
			data,
			error
		};
	},
	/** Email + password login. */
	signIn: async (email, password) => {
		const { data, error } = await supabase.auth.signInWithPassword({
			email,
			password
		});
		if (!error && data?.user) set({
			user: data.user,
			session: data.session
		});
		return {
			data,
			error
		};
	},
	/** Google OAuth – redirects the browser, returns { error } only on failure. */
	signInWithGoogle: async () => {
		const { error } = await supabase.auth.signInWithOAuth({
			provider: "google",
			options: { redirectTo: `${window.location.origin}/dashboard` }
		});
		return { error };
	},
	/**
	* Send a password-reset email.
	* The user will get a link that points to /reset-password?token=...
	*/
	sendPasswordReset: async (email) => {
		const { error } = await supabase.auth.resetPasswordForEmail(email, { redirectTo: `${window.location.origin}/reset-password` });
		return { error };
	},
	/**
	* Update the password once the user has clicked the reset link.
	* Must be called while the user has a valid recovery session.
	*/
	updatePassword: async (newPassword) => {
		const { error } = await supabase.auth.updateUser({ password: newPassword });
		return { error };
	},
	/** Sign out and clear state. */
	signOut: async () => {
		try {
			await supabase.auth.signOut();
		} catch (err) {
			console.error("authStore signOut error:", err);
		}
		set({
			user: null,
			session: null
		});
	}
}));
//#endregion
export { useAuthStore as n, sendWelcomeEmail as t };
