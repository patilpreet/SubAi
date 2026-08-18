import { i as TSS_SERVER_FUNCTION } from "./esm-Dova13aH.mjs";
import { t as getServerFnById } from "../__23tanstack-start-server-fn-resolver-AN4oPODe.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/createSsrRpc-D7Qz9ddr.js
var supabase = createClient("https://hxotnizcvmajjdvvevee.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh4b3RuaXpjdm1hampkdnZldmVlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MzIxMTIyMywiZXhwIjoyMDk4Nzg3MjIzfQ.VjOMJRCkaH3PK5Hn-9WyuP0wC498hLiKMrcMosErFCI");
var createSsrRpc = (functionId) => {
	const url = "/_serverFn/" + functionId;
	const serverFnMeta = { id: functionId };
	const fn = async (...args) => {
		return (await getServerFnById(functionId, { origin: "server" }))(...args);
	};
	return Object.assign(fn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
//#endregion
export { supabase as n, createSsrRpc as t };
