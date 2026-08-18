import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/adminServer-EwiLiy8c.js
var ADMIN_EMAIL = () => process.env.VITE_ADMIN_EMAIL || "patilpreetviia@gmail.com";
async function requireAdmin(accessToken) {
	if (!accessToken) throw new Error("Unauthorized: no access token");
	const { data: { user }, error } = await createClient(process.env.VITE_SUPABASE_URL || "", process.env.VITE_SUPABASE_ANON_KEY || "").auth.getUser(accessToken);
	if (error || !user || user.email !== ADMIN_EMAIL()) throw new Error("Forbidden: admin access required");
	return user;
}
function getAdminClient() {
	const url = process.env.VITE_SUPABASE_URL;
	const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY;
	return createClient(url || "", key || "");
}
var getAdminStats_createServerFn_handler = createServerRpc({
	id: "8c25d2b25cfcecb6a671bbc3f19816ae47b258f855f994f3e59b239a760d5ce7",
	name: "getAdminStats",
	filename: "src/lib/adminServer.js"
}, (opts) => getAdminStats.__executeServer(opts));
var getAdminStats = createServerFn({ method: "GET" }).validator((input) => {
	const accessToken = input?.data?.accessToken || input?.accessToken;
	if (!accessToken) throw new Error("accessToken is required");
	return { accessToken };
}).handler(getAdminStats_createServerFn_handler, async ({ data }) => {
	await requireAdmin(data.accessToken);
	const sb = getAdminClient();
	const [usersRes, jobsRes, subsRes, storageRes] = await Promise.all([
		sb.auth.admin.listUsers(),
		sb.from("jobs").select("id, user_id, title, language, status, created_at, duration, thumb_color, ai_description", { count: "exact" }),
		sb.from("subtitles").select("id, job_id, start_sec, end_sec", { count: "exact" }),
		sb.storage.from("videos").list()
	]);
	const users = usersRes.data?.users || [];
	const jobs = jobsRes.data || [];
	const allSubtitles = subsRes.data || [];
	const subtitleCount = subsRes.count || 0;
	const storageFiles = storageRes.data || [];
	const jobsByStatus = {
		processing: 0,
		completed: 0
	};
	jobs.forEach((j) => {
		jobsByStatus[j.status] = (jobsByStatus[j.status] || 0) + 1;
	});
	const jobsByLanguage = {};
	jobs.forEach((j) => {
		const lang = j.language || "unknown";
		jobsByLanguage[lang] = (jobsByLanguage[lang] || 0) + 1;
	});
	const jobsByDate = {};
	const usersByDate = {};
	const jobsByWeekday = Array(7).fill(0);
	const jobsByHour = Array(24).fill(0);
	const weekdays = [
		"Sun",
		"Mon",
		"Tue",
		"Wed",
		"Thu",
		"Fri",
		"Sat"
	];
	jobs.forEach((j) => {
		if (!j.created_at) return;
		const d = new Date(j.created_at);
		const day = d.toISOString().slice(0, 10);
		jobsByDate[day] = (jobsByDate[day] || 0) + 1;
		jobsByWeekday[d.getUTCDay()]++;
		jobsByHour[d.getUTCHours()]++;
	});
	users.forEach((u) => {
		if (!u.created_at) return;
		const day = new Date(u.created_at).toISOString().slice(0, 10);
		usersByDate[day] = (usersByDate[day] || 0) + 1;
	});
	const jobsByDateArray = Object.entries(jobsByDate).map(([date, count]) => ({
		date,
		count
	})).sort((a, b) => a.date.localeCompare(b.date));
	const usersByDateArray = Object.entries(usersByDate).map(([date, count]) => ({
		date,
		count
	})).sort((a, b) => a.date.localeCompare(b.date));
	const langOverTime = {};
	jobs.forEach((j) => {
		if (!j.created_at || !j.language) return;
		const day = j.created_at.slice(0, 10);
		if (!langOverTime[day]) langOverTime[day] = {};
		langOverTime[day][j.language] = (langOverTime[day][j.language] || 0) + 1;
	});
	const allLangs = [...new Set(jobs.filter((j) => j.language).map((j) => j.language))];
	const langTrendData = Object.entries(langOverTime).sort((a, b) => a[0].localeCompare(b[0])).map(([date, langs]) => ({
		date,
		...Object.fromEntries(allLangs.map((l) => [l, langs[l] || 0]))
	}));
	const userJobCounts = {};
	const userSubtitleCounts = {};
	jobs.forEach((j) => {
		userJobCounts[j.user_id] = (userJobCounts[j.user_id] || 0) + 1;
	});
	allSubtitles.forEach((s) => {
		userSubtitleCounts[s.job_id] = (userSubtitleCounts[s.job_id] || 0) + 1;
	});
	const topUsers = Object.entries(userJobCounts).map(([userId, count]) => {
		const u = users.find((x) => x.id === userId);
		return {
			userId,
			email: u?.email || "unknown",
			name: u?.user_metadata?.full_name || "",
			count
		};
	}).sort((a, b) => b.count - a.count).slice(0, 10);
	const userList = users.map((u) => ({
		id: u.id,
		email: u.email,
		name: u.user_metadata?.full_name || "",
		createdAt: u.created_at,
		lastSignIn: u.last_sign_in_at,
		jobCount: userJobCounts[u.id] || 0
	}));
	const subDurationPerJob = {};
	allSubtitles.forEach((s) => {
		if (!subDurationPerJob[s.job_id]) subDurationPerJob[s.job_id] = 0;
		subDurationPerJob[s.job_id] += (s.end_sec || 0) - (s.start_sec || 0);
	});
	const avgSubDuration = allSubtitles.length > 0 ? Object.values(subDurationPerJob).reduce((a, b) => a + b, 0) / Object.keys(subDurationPerJob).length : 0;
	let totalCompletionMs = 0;
	let completionCount = 0;
	jobs.forEach((j) => {
		if (j.status === "completed" && j.created_at && j.completed_at) {
			const created = new Date(j.created_at).getTime();
			const completed = new Date(j.completed_at).getTime();
			if (completed > created) {
				totalCompletionMs += completed - created;
				completionCount++;
			}
		}
	});
	const avgCompletionMin = completionCount > 0 ? Math.round(totalCompletionMs / completionCount / 6e4) : "N/A";
	const now = Date.now();
	const day7 = now - 7 * 864e5;
	const day30 = now - 30 * 864e5;
	const active7 = /* @__PURE__ */ new Set();
	const active30 = /* @__PURE__ */ new Set();
	jobs.forEach((j) => {
		if (!j.created_at) return;
		const t = new Date(j.created_at).getTime();
		if (t >= day7) active7.add(j.user_id);
		if (t >= day30) active30.add(j.user_id);
	});
	const durationBuckets = {
		"<30s": 0,
		"30s-2m": 0,
		"2m-5m": 0,
		"5m-10m": 0,
		">10m": 0
	};
	jobs.forEach((j) => {
		const d = parseFloat(j.duration);
		if (isNaN(d)) return;
		if (d < 30) durationBuckets["<30s"]++;
		else if (d < 120) durationBuckets["30s-2m"]++;
		else if (d < 300) durationBuckets["2m-5m"]++;
		else if (d < 600) durationBuckets["5m-10m"]++;
		else durationBuckets[">10m"]++;
	});
	let cumJobs = 0;
	let cumUsers = 0;
	const cumulativeData = jobsByDateArray.map((d) => {
		cumJobs += d.count;
		const newUsersToday = usersByDateArray.find((u) => u.date === d.date)?.count || 0;
		cumUsers += newUsersToday;
		return {
			date: d.date,
			jobs: cumJobs,
			users: cumUsers
		};
	});
	const engagementBuckets = {
		"1 job": 0,
		"2-3 jobs": 0,
		"4-10 jobs": 0,
		">10 jobs": 0
	};
	Object.values(userJobCounts).forEach((c) => {
		if (c === 1) engagementBuckets["1 job"]++;
		else if (c <= 3) engagementBuckets["2-3 jobs"]++;
		else if (c <= 10) engagementBuckets["4-10 jobs"]++;
		else engagementBuckets[">10 jobs"]++;
	});
	return {
		totalUsers: users.length,
		totalJobs: jobs.length,
		totalSubtitles: subtitleCount,
		totalStorageFiles: storageFiles.length,
		jobsByStatus,
		jobsByLanguage,
		jobsByDate: jobsByDateArray,
		usersByDate: usersByDateArray,
		jobsByWeekday: weekdays.map((name, i) => ({
			name,
			count: jobsByWeekday[i]
		})),
		jobsByHour: Array.from({ length: 24 }, (_, i) => ({
			hour: `${i}:00`,
			count: jobsByHour[i]
		})),
		langTrendData,
		topUsers,
		userList,
		avgSubDuration: Math.round(avgSubDuration),
		avgCompletionMin,
		activeUsers7: active7.size,
		activeUsers30: active30.size,
		durationBuckets,
		cumulativeData,
		engagementBuckets,
		emailStats: {
			welcome: 0,
			test: 0,
			freeTierLimit: 0
		},
		jobs: jobs.map((j) => ({
			id: j.id,
			title: j.title,
			user_id: j.user_id,
			language: j.language,
			status: j.status,
			duration: j.duration,
			created_at: j.created_at,
			ai_description: j.ai_description,
			thumb_color: j.thumb_color,
			userEmail: users.find((u) => u.id === j.user_id)?.email || "unknown"
		}))
	};
});
var getAdminJobDetail_createServerFn_handler = createServerRpc({
	id: "8cf7ed54a55f51aee0bbb21f590cc8f1a00d8019282881c593e844bba7b32d24",
	name: "getAdminJobDetail",
	filename: "src/lib/adminServer.js"
}, (opts) => getAdminJobDetail.__executeServer(opts));
var getAdminJobDetail = createServerFn({ method: "GET" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload.jobId) throw new Error("jobId is required");
	if (!payload.accessToken) throw new Error("accessToken is required");
	return {
		jobId: payload.jobId,
		accessToken: payload.accessToken
	};
}).handler(getAdminJobDetail_createServerFn_handler, async ({ data }) => {
	await requireAdmin(data.accessToken);
	const sb = getAdminClient();
	const { data: job } = await sb.from("jobs").select("*").eq("id", data.jobId).single();
	if (!job) return null;
	const { data: subtitles } = await sb.from("subtitles").select("*").eq("job_id", data.jobId).order("sort_order");
	const { data: { users } } = await sb.auth.admin.listUsers();
	const user = users?.find((u) => u.id === job.user_id);
	return {
		...job,
		userEmail: user?.email || "unknown",
		userName: user?.user_metadata?.full_name || "",
		subtitles: subtitles || []
	};
});
var getAdminUsers_createServerFn_handler = createServerRpc({
	id: "4e1a323a87df3a85b9768af03093a56af96a870b8549fb908968764823ce4ae3",
	name: "getAdminUsers",
	filename: "src/lib/adminServer.js"
}, (opts) => getAdminUsers.__executeServer(opts));
var getAdminUsers = createServerFn({ method: "GET" }).validator((input) => {
	const accessToken = input?.data?.accessToken || input?.accessToken;
	if (!accessToken) throw new Error("accessToken is required");
	return { accessToken };
}).handler(getAdminUsers_createServerFn_handler, async ({ data }) => {
	await requireAdmin(data.accessToken);
	const sb = getAdminClient();
	const { data: { users } } = await sb.auth.admin.listUsers();
	const { data: jobs } = await sb.from("jobs").select("user_id, created_at, language");
	const { data: subs } = await sb.from("subtitles").select("user_id");
	const userJobCounts = {};
	const userLangCounts = {};
	jobs?.forEach((j) => {
		userJobCounts[j.user_id] = (userJobCounts[j.user_id] || 0) + 1;
		if (!userLangCounts[j.user_id]) userLangCounts[j.user_id] = {};
		userLangCounts[j.user_id][j.language || "unknown"] = (userLangCounts[j.user_id][j.language || "unknown"] || 0) + 1;
	});
	const userSubCounts = {};
	subs?.forEach((s) => {
		userSubCounts[s.user_id] = (userSubCounts[s.user_id] || 0) + 1;
	});
	const now = Date.now();
	const day7 = now - 7 * 864e5;
	const day30 = now - 30 * 864e5;
	const recentUserIds7 = /* @__PURE__ */ new Set();
	const recentUserIds30 = /* @__PURE__ */ new Set();
	jobs?.forEach((j) => {
		if (!j.created_at) return;
		const t = new Date(j.created_at).getTime();
		if (t >= day7) recentUserIds7.add(j.user_id);
		if (t >= day30) recentUserIds30.add(j.user_id);
	});
	return (users || []).map((u) => {
		const topLang = userLangCounts[u.id] ? Object.entries(userLangCounts[u.id]).sort((a, b) => b[1] - a[1])[0]?.[0] || "—" : "—";
		return {
			id: u.id,
			email: u.email,
			name: u.user_metadata?.full_name || "",
			createdAt: u.created_at,
			lastSignIn: u.last_sign_in_at,
			jobCount: userJobCounts[u.id] || 0,
			subCount: userSubCounts[u.id] || 0,
			topLanguage: topLang,
			active7: recentUserIds7.has(u.id),
			active30: recentUserIds30.has(u.id),
			banned: u.banned_until ? new Date(u.banned_until) > /* @__PURE__ */ new Date() : false,
			provider: u.app_metadata?.provider || "email"
		};
	});
});
var deleteAdminUser_createServerFn_handler = createServerRpc({
	id: "313c3a0d317fc3bef413585a8e0221fb235423b874bccddc599aeae08767523a",
	name: "deleteAdminUser",
	filename: "src/lib/adminServer.js"
}, (opts) => deleteAdminUser.__executeServer(opts));
var deleteAdminUser = createServerFn({ method: "POST" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload.accessToken) throw new Error("accessToken is required");
	if (!payload.userId) throw new Error("userId is required");
	return {
		accessToken: payload.accessToken,
		userId: payload.userId
	};
}).handler(deleteAdminUser_createServerFn_handler, async ({ data }) => {
	await requireAdmin(data.accessToken);
	const sb = getAdminClient();
	const { data: jobs } = await sb.from("jobs").select("id").eq("user_id", data.userId);
	if (jobs?.length) {
		const jobIds = jobs.map((j) => j.id);
		await sb.from("subtitles").delete().in("job_id", jobIds);
		await sb.from("jobs").delete().eq("user_id", data.userId);
	}
	const { error } = await sb.auth.admin.deleteUser(data.userId);
	if (error) throw new Error(error.message);
	return { success: true };
});
var banAdminUser_createServerFn_handler = createServerRpc({
	id: "44cf4c3b0a53149323179aafd39b9bc2c5607102f152c39e06067a9c8c00317b",
	name: "banAdminUser",
	filename: "src/lib/adminServer.js"
}, (opts) => banAdminUser.__executeServer(opts));
var banAdminUser = createServerFn({ method: "POST" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload.accessToken) throw new Error("accessToken is required");
	if (!payload.userId) throw new Error("userId is required");
	return {
		accessToken: payload.accessToken,
		userId: payload.userId,
		banned: payload.banned ?? true
	};
}).handler(banAdminUser_createServerFn_handler, async ({ data }) => {
	await requireAdmin(data.accessToken);
	const sb = getAdminClient();
	data.banned ? new Date(Date.now() + 100 * 365 * 24 * 60 * 60 * 1e3).toISOString() : (/* @__PURE__ */ new Date(0)).toISOString();
	const { error } = await sb.auth.admin.updateUserById(data.userId, { ban_duration: data.banned ? "876000h" : "none" });
	if (error) throw new Error(error.message);
	return { success: true };
});
var deleteAdminJob_createServerFn_handler = createServerRpc({
	id: "fb26625f0613e3a030370918aa5f0f79ff9c39b0524997d560c4ddccf39d2376",
	name: "deleteAdminJob",
	filename: "src/lib/adminServer.js"
}, (opts) => deleteAdminJob.__executeServer(opts));
var deleteAdminJob = createServerFn({ method: "POST" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload.accessToken) throw new Error("accessToken is required");
	if (!payload.jobId) throw new Error("jobId is required");
	return {
		accessToken: payload.accessToken,
		jobId: payload.jobId
	};
}).handler(deleteAdminJob_createServerFn_handler, async ({ data }) => {
	await requireAdmin(data.accessToken);
	const sb = getAdminClient();
	await sb.from("subtitles").delete().eq("job_id", data.jobId);
	const { error } = await sb.from("jobs").delete().eq("id", data.jobId);
	if (error) throw new Error(error.message);
	return { success: true };
});
var exportAdminData_createServerFn_handler = createServerRpc({
	id: "8d50a1524c992401f7983f9b593a10a33f18c3a9720f145259b4ed093afb6262",
	name: "exportAdminData",
	filename: "src/lib/adminServer.js"
}, (opts) => exportAdminData.__executeServer(opts));
var exportAdminData = createServerFn({ method: "POST" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload.accessToken) throw new Error("accessToken required");
	if (!payload.type) throw new Error("type required (users|jobs)");
	return {
		accessToken: payload.accessToken,
		type: payload.type
	};
}).handler(exportAdminData_createServerFn_handler, async ({ data }) => {
	await requireAdmin(data.accessToken);
	const sb = getAdminClient();
	if (data.type === "users") {
		const { data: { users } } = await sb.auth.admin.listUsers();
		return {
			csv: "id,email,name,created_at,last_sign_in\n" + (users || []).map((u) => `${u.id},${u.email},"${(u.user_metadata?.full_name || "").replace(/"/g, "\"\"")}",${u.created_at},${u.last_sign_in_at || ""}`).join("\n"),
			filename: "users-export.csv"
		};
	} else {
		const { data: jobs } = await sb.from("jobs").select("id,user_id,title,language,status,created_at,duration");
		return {
			csv: "id,user_id,title,language,status,created_at,duration\n" + (jobs || []).map((j) => `${j.id},${j.user_id},"${(j.title || "").replace(/"/g, "\"\"")}",${j.language},${j.status},${j.created_at},${j.duration || ""}`).join("\n"),
			filename: "jobs-export.csv"
		};
	}
});
var getStorageFiles_createServerFn_handler = createServerRpc({
	id: "ed7dc59a575bcfb42953349a54f1006806bf81668644cca8675e3cf5e08ad4d5",
	name: "getStorageFiles",
	filename: "src/lib/adminServer.js"
}, (opts) => getStorageFiles.__executeServer(opts));
var getStorageFiles = createServerFn({ method: "GET" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload.accessToken) throw new Error("accessToken required");
	return { accessToken: payload.accessToken };
}).handler(getStorageFiles_createServerFn_handler, async ({ data }) => {
	await requireAdmin(data.accessToken);
	const { data: files } = await getAdminClient().storage.from("videos").list("", {
		limit: 1e3,
		sortBy: {
			column: "created_at",
			order: "desc"
		}
	});
	return (files || []).map((f) => ({
		id: f.id,
		name: f.name,
		size: f.metadata?.size || 0,
		mimeType: f.metadata?.mimetype || "unknown",
		createdAt: f.created_at
	}));
});
var deleteStorageFile_createServerFn_handler = createServerRpc({
	id: "81ff8f931397ac08cc65a1de77edd377bd4e314b18354133a035acafa91a4dc7",
	name: "deleteStorageFile",
	filename: "src/lib/adminServer.js"
}, (opts) => deleteStorageFile.__executeServer(opts));
var deleteStorageFile = createServerFn({ method: "POST" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload.accessToken) throw new Error("accessToken required");
	if (!payload.path) throw new Error("path required");
	return {
		accessToken: payload.accessToken,
		path: payload.path
	};
}).handler(deleteStorageFile_createServerFn_handler, async ({ data }) => {
	await requireAdmin(data.accessToken);
	const { error } = await getAdminClient().storage.from("videos").remove([data.path]);
	if (error) throw new Error(error.message);
	return { success: true };
});
var getAuditLog_createServerFn_handler = createServerRpc({
	id: "3925418846ef5053a00a9c18ade67f44b28047875a3fe1fd97f5cffd911aa93b",
	name: "getAuditLog",
	filename: "src/lib/adminServer.js"
}, (opts) => getAuditLog.__executeServer(opts));
var getAuditLog = createServerFn({ method: "GET" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload.accessToken) throw new Error("accessToken required");
	return { accessToken: payload.accessToken };
}).handler(getAuditLog_createServerFn_handler, async ({ data }) => {
	await requireAdmin(data.accessToken);
	const { data: logs, error } = await getAdminClient().from("audit_log").select("*").order("created_at", { ascending: false }).limit(100);
	if (error) return [];
	return logs || [];
});
var getRevenueStats_createServerFn_handler = createServerRpc({
	id: "7d20f7ae4d1c8388f7baab463bab4eb16e8168945151a08a40c84e44ccce42d3",
	name: "getRevenueStats",
	filename: "src/lib/adminServer.js"
}, (opts) => getRevenueStats.__executeServer(opts));
var getRevenueStats = createServerFn({ method: "GET" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload.accessToken) throw new Error("accessToken required");
	return { accessToken: payload.accessToken };
}).handler(getRevenueStats_createServerFn_handler, async ({ data }) => {
	await requireAdmin(data.accessToken);
	const { data: jobs } = await getAdminClient().from("jobs").select("id,created_at,status");
	const totalJobs = (jobs || []).length;
	const completedJobs = (jobs || []).filter((j) => j.status === "completed").length;
	return {
		totalJobs,
		completedJobs,
		estimatedRevenue: completedJobs * 50,
		jobsThisMonth: (jobs || []).filter((j) => {
			const d = new Date(j.created_at);
			const now = /* @__PURE__ */ new Date();
			return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
		}).length
	};
});
//#endregion
export { banAdminUser_createServerFn_handler, deleteAdminJob_createServerFn_handler, deleteAdminUser_createServerFn_handler, deleteStorageFile_createServerFn_handler, exportAdminData_createServerFn_handler, getAdminJobDetail_createServerFn_handler, getAdminStats_createServerFn_handler, getAdminUsers_createServerFn_handler, getAuditLog_createServerFn_handler, getRevenueStats_createServerFn_handler, getStorageFiles_createServerFn_handler };
