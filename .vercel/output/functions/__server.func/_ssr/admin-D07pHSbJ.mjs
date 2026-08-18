import { i as __toESM } from "../_runtime.mjs";
import { c as require_react, s as require_jsx_runtime } from "../_libs/@remotion/player+[...].mjs";
import { _ as useNavigate, g as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D7Qz9ddr.mjs";
import { n as useAuthStore } from "./authStore-0OVhq_th.mjs";
import { a as YAxis, c as Line, d as Cell, f as ResponsiveContainer, i as LineChart, l as Bar, m as Legend, n as PieChart, o as XAxis, p as Tooltip, r as BarChart, s as Area, t as AreaChart, u as Pie } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-D07pHSbJ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Admin_module_default = {
	backBtn: "xXKnlq_backBtn",
	badge: "xXKnlq_badge",
	badgeGray: "xXKnlq_badgeGray",
	badgeGreen: "xXKnlq_badgeGreen",
	badgeRed: "xXKnlq_badgeRed",
	badgeYellow: "xXKnlq_badgeYellow",
	card: "xXKnlq_card",
	cardLabel: "xXKnlq_cardLabel",
	cardSub: "xXKnlq_cardSub",
	cardValue: "xXKnlq_cardValue",
	chartCard: "xXKnlq_chartCard",
	chartCardFull: "xXKnlq_chartCardFull",
	chartGrid: "xXKnlq_chartGrid",
	chartTitle: "xXKnlq_chartTitle",
	detailClose: "xXKnlq_detailClose",
	detailOverlay: "xXKnlq_detailOverlay",
	detailPanel: "xXKnlq_detailPanel",
	emptyState: "xXKnlq_emptyState",
	grid: "xXKnlq_grid",
	hamburger: "xXKnlq_hamburger",
	header: "xXKnlq_header",
	legend: "xXKnlq_legend",
	legendDot: "xXKnlq_legendDot",
	legendItem: "xXKnlq_legendItem",
	loadingState: "xXKnlq_loadingState",
	main: "xXKnlq_main",
	meta: "xXKnlq_meta",
	mobileClose: "xXKnlq_mobileClose",
	mobileOverlay: "xXKnlq_mobileOverlay",
	navItem: "xXKnlq_navItem",
	navItemActive: "xXKnlq_navItemActive",
	navSep: "xXKnlq_navSep",
	refreshBtn: "xXKnlq_refreshBtn",
	scrollArea: "xXKnlq_scrollArea",
	shell: "xXKnlq_shell",
	sidebar: "xXKnlq_sidebar",
	sidebarBrand: "xXKnlq_sidebarBrand",
	sidebarLogo: "xXKnlq_sidebarLogo",
	sidebarOpen: "xXKnlq_sidebarOpen",
	subtitleRow: "xXKnlq_subtitleRow",
	subtitleText: "xXKnlq_subtitleText",
	subtitleTime: "xXKnlq_subtitleTime",
	table: "xXKnlq_table",
	tableLink: "xXKnlq_tableLink",
	tableWrap: "xXKnlq_tableWrap"
};
var getAdminStats = createServerFn({ method: "GET" }).validator((input) => {
	const accessToken = input?.data?.accessToken || input?.accessToken;
	if (!accessToken) throw new Error("accessToken is required");
	return { accessToken };
}).handler(createSsrRpc("8c25d2b25cfcecb6a671bbc3f19816ae47b258f855f994f3e59b239a760d5ce7"));
createServerFn({ method: "GET" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload.jobId) throw new Error("jobId is required");
	if (!payload.accessToken) throw new Error("accessToken is required");
	return {
		jobId: payload.jobId,
		accessToken: payload.accessToken
	};
}).handler(createSsrRpc("8cf7ed54a55f51aee0bbb21f590cc8f1a00d8019282881c593e844bba7b32d24"));
var getAdminUsers = createServerFn({ method: "GET" }).validator((input) => {
	const accessToken = input?.data?.accessToken || input?.accessToken;
	if (!accessToken) throw new Error("accessToken is required");
	return { accessToken };
}).handler(createSsrRpc("4e1a323a87df3a85b9768af03093a56af96a870b8549fb908968764823ce4ae3"));
var deleteAdminUser = createServerFn({ method: "POST" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload.accessToken) throw new Error("accessToken is required");
	if (!payload.userId) throw new Error("userId is required");
	return {
		accessToken: payload.accessToken,
		userId: payload.userId
	};
}).handler(createSsrRpc("313c3a0d317fc3bef413585a8e0221fb235423b874bccddc599aeae08767523a"));
var banAdminUser = createServerFn({ method: "POST" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload.accessToken) throw new Error("accessToken is required");
	if (!payload.userId) throw new Error("userId is required");
	return {
		accessToken: payload.accessToken,
		userId: payload.userId,
		banned: payload.banned ?? true
	};
}).handler(createSsrRpc("44cf4c3b0a53149323179aafd39b9bc2c5607102f152c39e06067a9c8c00317b"));
var deleteAdminJob = createServerFn({ method: "POST" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload.accessToken) throw new Error("accessToken is required");
	if (!payload.jobId) throw new Error("jobId is required");
	return {
		accessToken: payload.accessToken,
		jobId: payload.jobId
	};
}).handler(createSsrRpc("fb26625f0613e3a030370918aa5f0f79ff9c39b0524997d560c4ddccf39d2376"));
var exportAdminData = createServerFn({ method: "POST" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload.accessToken) throw new Error("accessToken required");
	if (!payload.type) throw new Error("type required (users|jobs)");
	return {
		accessToken: payload.accessToken,
		type: payload.type
	};
}).handler(createSsrRpc("8d50a1524c992401f7983f9b593a10a33f18c3a9720f145259b4ed093afb6262"));
var getStorageFiles = createServerFn({ method: "GET" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload.accessToken) throw new Error("accessToken required");
	return { accessToken: payload.accessToken };
}).handler(createSsrRpc("ed7dc59a575bcfb42953349a54f1006806bf81668644cca8675e3cf5e08ad4d5"));
var deleteStorageFile = createServerFn({ method: "POST" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload.accessToken) throw new Error("accessToken required");
	if (!payload.path) throw new Error("path required");
	return {
		accessToken: payload.accessToken,
		path: payload.path
	};
}).handler(createSsrRpc("81ff8f931397ac08cc65a1de77edd377bd4e314b18354133a035acafa91a4dc7"));
var getAuditLog = createServerFn({ method: "GET" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload.accessToken) throw new Error("accessToken required");
	return { accessToken: payload.accessToken };
}).handler(createSsrRpc("3925418846ef5053a00a9c18ade67f44b28047875a3fe1fd97f5cffd911aa93b"));
var getRevenueStats = createServerFn({ method: "GET" }).validator((input) => {
	const payload = input?.data ? input.data : input;
	if (!payload.accessToken) throw new Error("accessToken required");
	return { accessToken: payload.accessToken };
}).handler(createSsrRpc("7d20f7ae4d1c8388f7baab463bab4eb16e8168945151a08a40c84e44ccce42d3"));
var ADMIN_EMAIL = "patilpreetviia@gmail.com";
var COLORS = [
	"#D97736",
	"#22c55e",
	"#ef4444",
	"#3b82f6",
	"#a855f7",
	"#ec4899",
	"#14b8a6",
	"#f97316"
];
function fmt(n) {
	return Number(n || 0).toLocaleString();
}
function fmtDate(s) {
	if (!s) return "—";
	return new Date(s).toLocaleDateString("en-IN", {
		day: "2-digit",
		month: "short",
		year: "numeric"
	});
}
function fmtAgo(s) {
	if (!s) return "—";
	const ms = Date.now() - new Date(s).getTime();
	const m = Math.floor(ms / 6e4);
	if (m < 60) return `${m}m ago`;
	const h = Math.floor(m / 60);
	if (h < 24) return `${h}h ago`;
	return `${Math.floor(h / 24)}d ago`;
}
function initials(name, email) {
	if (name) return name.split(" ").map((w) => w[0]).join("").toUpperCase().slice(0, 2);
	return (email?.[0] || "U").toUpperCase();
}
function StatCard({ label, value, icon, color = "#D97736", sub }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			background: "var(--bg-surface)",
			backdropFilter: "blur(24px)",
			WebkitBackdropFilter: "blur(24px)",
			border: "1px solid var(--border-base)",
			borderRadius: 16,
			padding: "20px 22px",
			display: "flex",
			flexDirection: "column",
			gap: 6,
			position: "relative",
			overflow: "hidden",
			boxShadow: "var(--shadow-card)",
			transition: "all 150ms ease"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					position: "absolute",
					top: 16,
					right: 16,
					width: 38,
					height: 38,
					borderRadius: 6,
					background: `${color}18`,
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					fontSize: 18
				},
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					fontSize: 11,
					color: "var(--text-secondary)",
					textTransform: "uppercase",
					letterSpacing: "0.06em",
					fontWeight: 600
				},
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					fontSize: 30,
					fontWeight: 800,
					color: "var(--text-primary)",
					lineHeight: 1
				},
				children: fmt(value)
			}),
			sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					fontSize: 12,
					color: "var(--text-secondary)"
				},
				children: sub
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
				position: "absolute",
				bottom: 0,
				left: 0,
				right: 0,
				height: 3,
				background: `${color}30`,
				borderRadius: "0 0 16px 16px"
			} })
		]
	});
}
function SectionHead({ title, action }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			alignItems: "center",
			justifyContent: "space-between",
			marginBottom: 16
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			style: {
				fontSize: 14,
				fontWeight: 700,
				color: "var(--text-primary)",
				margin: 0,
				letterSpacing: "-0.01em"
			},
			children: title
		}), action]
	});
}
function ConfirmDialog({ open, title, body, confirmLabel = "Confirm", danger = true, onConfirm, onCancel }) {
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			position: "fixed",
			inset: 0,
			background: "rgba(0,0,0,0.7)",
			zIndex: 1e3,
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			padding: 20
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				background: "var(--bg-surface)",
				backdropFilter: "blur(24px)",
				border: "1px solid var(--border-base)",
				borderRadius: 16,
				padding: 28,
				maxWidth: 400,
				width: "100%",
				boxShadow: "var(--shadow-elevated)"
			},
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					style: {
						fontSize: 16,
						fontWeight: 700,
						margin: "0 0 10px",
						color: "var(--text-primary)"
					},
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					style: {
						fontSize: 13,
						color: "var(--text-secondary)",
						margin: "0 0 24px",
						lineHeight: 1.5
					},
					children: body
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						gap: 10,
						justifyContent: "flex-end"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onCancel,
						style: {
							padding: "8px 18px",
							borderRadius: 9999,
							border: "1px solid var(--border-base)",
							background: "transparent",
							color: "var(--text-secondary)",
							cursor: "pointer",
							fontSize: 13,
							fontFamily: "inherit",
							transition: "all 150ms ease"
						},
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: onConfirm,
						style: {
							padding: "8px 18px",
							borderRadius: 9999,
							border: "none",
							background: danger ? "#ef4444" : "#22c55e",
							color: "#fff",
							cursor: "pointer",
							fontSize: 13,
							fontWeight: 600,
							fontFamily: "inherit",
							transition: "all 150ms ease"
						},
						children: confirmLabel
					})]
				})
			]
		})
	});
}
function useToast() {
	const [toasts, setToasts] = (0, import_react.useState)([]);
	const push = (msg, type = "success") => {
		const id = Math.random().toString(36).slice(2);
		setToasts((t) => [...t, {
			id,
			msg,
			type
		}]);
		setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3500);
	};
	const Toasts = () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		style: {
			position: "fixed",
			bottom: 24,
			right: 24,
			zIndex: 2e3,
			display: "flex",
			flexDirection: "column",
			gap: 8
		},
		children: toasts.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			style: {
				background: t.type === "error" ? "#451a1a" : "#14241a",
				border: `1px solid ${t.type === "error" ? "#ef444440" : "#22c55e40"}`,
				color: t.type === "error" ? "#f87171" : "#4ade80",
				padding: "10px 16px",
				borderRadius: 16,
				fontSize: 13,
				fontWeight: 500,
				animation: "slideInRight 0.25s ease-out",
				maxWidth: 320
			},
			children: t.msg
		}, t.id))
	});
	return {
		push,
		Toasts
	};
}
function NavBtn({ active, onClick, icon, label, badge }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick,
		style: {
			display: "flex",
			alignItems: "center",
			gap: 10,
			width: "100%",
			padding: "9px 14px",
			borderRadius: 16,
			border: "none",
			cursor: "pointer",
			background: active ? "var(--accent-dim)" : "transparent",
			color: active ? "var(--primary)" : "var(--text-secondary)",
			fontSize: 13,
			fontWeight: active ? 600 : 400,
			fontFamily: "inherit",
			textAlign: "left",
			transition: "all 150ms ease"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: { fontSize: 15 },
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: { flex: 1 },
				children: label
			}),
			badge > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: {
					background: "#ef4444",
					color: "#fff",
					fontSize: 10,
					fontWeight: 700,
					padding: "2px 6px",
					borderRadius: 9999,
					lineHeight: 1.5
				},
				children: badge
			})
		]
	});
}
function AdminPage() {
	const user = useAuthStore((s) => s.user);
	const loading = useAuthStore((s) => s.loading);
	const navigate = useNavigate();
	const { push, Toasts } = useToast();
	const [tab, setTab] = (0, import_react.useState)("overview");
	const [stats, setStats] = (0, import_react.useState)(null);
	const [users, setUsers] = (0, import_react.useState)(null);
	const [loadingData, setLoadingData] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [userSearch, setUserSearch] = (0, import_react.useState)("");
	const [jobSearch, setJobSearch] = (0, import_react.useState)("");
	const [jobStatusFilter, setJobStatusFilter] = (0, import_react.useState)("all");
	const [confirm, setConfirm] = (0, import_react.useState)(null);
	const [announcement, setAnnouncement] = (0, import_react.useState)("");
	const [announcements, setAnnouncements] = (0, import_react.useState)([]);
	const [expandedUser, setExpandedUser] = (0, import_react.useState)(null);
	const [storageFiles, setStorageFiles] = (0, import_react.useState)(null);
	const [storageLoading, setStorageLoading] = (0, import_react.useState)(false);
	const [auditLog, setAuditLog] = (0, import_react.useState)([]);
	const [revenue, setRevenue] = (0, import_react.useState)(null);
	const [featureFlags, setFeatureFlags] = (0, import_react.useState)({
		maintenanceMode: false,
		newSignupEnabled: true,
		emailNotifications: true,
		aiDescriptions: true,
		freeTierEnabled: true,
		proTierEnabled: true
	});
	const [emailFilter, setEmailFilter] = (0, import_react.useState)("all");
	const [bulkAction, setBulkAction] = (0, import_react.useState)(null);
	const [selectedUsers, setSelectedUsers] = (0, import_react.useState)(/* @__PURE__ */ new Set());
	const [sidebarOpen, setSidebarOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!loading && (!user || user.email !== ADMIN_EMAIL)) navigate({ to: "/dashboard" });
	}, [
		user,
		loading,
		navigate
	]);
	const token = useAuthStore.getState().session?.access_token;
	const loadAll = (0, import_react.useCallback)(async () => {
		if (!token) return;
		setLoadingData(true);
		setError(null);
		try {
			const [statsData, usersData] = await Promise.all([getAdminStats({ data: { accessToken: token } }), getAdminUsers({ data: { accessToken: token } })]);
			setStats(statsData);
			setUsers(usersData);
			getRevenueStats({ data: { accessToken: token } }).then(setRevenue).catch(() => {});
		} catch (e) {
			setError(e.message);
		} finally {
			setLoadingData(false);
		}
	}, [token]);
	(0, import_react.useEffect)(() => {
		if (user?.email === ADMIN_EMAIL) loadAll();
	}, [user, loadAll]);
	const handleDeleteUser = (u) => {
		setConfirm({
			title: `Delete "${u.email}"?`,
			body: `This will permanently delete the user and all their ${u.jobCount} jobs. This cannot be undone.`,
			confirmLabel: "Delete forever",
			danger: true,
			onConfirm: async () => {
				setConfirm(null);
				try {
					await deleteAdminUser({ data: {
						accessToken: token,
						userId: u.id
					} });
					setUsers((prev) => prev.filter((x) => x.id !== u.id));
					push(`Deleted ${u.email}`);
				} catch (e) {
					push(e.message, "error");
				}
			}
		});
	};
	const handleBanUser = async (u) => {
		try {
			await banAdminUser({ data: {
				accessToken: token,
				userId: u.id,
				banned: !u.banned
			} });
			setUsers((prev) => prev.map((x) => x.id === u.id ? {
				...x,
				banned: !u.banned
			} : x));
			push(`${u.banned ? "Unbanned" : "Banned"} ${u.email}`);
		} catch (e) {
			push(e.message, "error");
		}
	};
	const handleDeleteJob = (j) => {
		setConfirm({
			title: `Delete job "${j.title || j.id.slice(0, 8)}"?`,
			body: "This removes the job and all its subtitles permanently.",
			confirmLabel: "Delete job",
			danger: true,
			onConfirm: async () => {
				setConfirm(null);
				try {
					await deleteAdminJob({ data: {
						accessToken: token,
						jobId: j.id
					} });
					setStats((prev) => ({
						...prev,
						jobs: prev.jobs.filter((x) => x.id !== j.id),
						totalJobs: prev.totalJobs - 1
					}));
					push(`Job deleted`);
				} catch (e) {
					push(e.message, "error");
				}
			}
		});
	};
	const handleSendAnnouncement = () => {
		if (!announcement.trim()) return;
		setAnnouncements((prev) => [{
			id: Date.now(),
			msg: announcement,
			time: (/* @__PURE__ */ new Date()).toISOString()
		}, ...prev]);
		setAnnouncement("");
		push("Announcement posted (UI demo — wire to DB to persist)");
	};
	const filteredUsers = (0, import_react.useMemo)(() => {
		if (!users) return [];
		return users.filter((u) => u.email?.toLowerCase().includes(userSearch.toLowerCase()) || u.name?.toLowerCase().includes(userSearch.toLowerCase()));
	}, [users, userSearch]);
	const filteredJobs = (0, import_react.useMemo)(() => {
		if (!stats?.jobs) return [];
		return stats.jobs.filter((j) => {
			const matchSearch = !jobSearch || j.title?.toLowerCase().includes(jobSearch.toLowerCase()) || j.userEmail?.toLowerCase().includes(jobSearch.toLowerCase()) || j.language?.toLowerCase().includes(jobSearch.toLowerCase());
			const matchStatus = jobStatusFilter === "all" || j.status === jobStatusFilter;
			return matchSearch && matchStatus;
		});
	}, [
		stats,
		jobSearch,
		jobStatusFilter
	]);
	const churned = (0, import_react.useMemo)(() => {
		if (!users) return [];
		const day30 = Date.now() - 30 * 864e5;
		return users.filter((u) => {
			if (!u.lastSignIn) return true;
			return new Date(u.lastSignIn).getTime() < day30 && u.jobCount > 0;
		});
	}, [users]);
	const newSignups = (0, import_react.useMemo)(() => {
		if (!users) return [];
		const day7 = Date.now() - 7 * 864e5;
		return users.filter((u) => new Date(u.createdAt).getTime() > day7);
	}, [users]);
	if (loading || !user) return null;
	if (user.email !== ADMIN_EMAIL) return null;
	const langPie = stats ? Object.entries(stats.jobsByLanguage || {}).map(([name, value]) => ({
		name,
		value
	})) : [];
	const statusPie = stats ? Object.entries(stats.jobsByStatus || {}).map(([name, value]) => ({
		name,
		value
	})) : [];
	const durationPie = stats ? Object.entries(stats.durationBuckets || {}).map(([name, value]) => ({
		name,
		value
	})) : [];
	const sideItems = [
		{
			id: "overview",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				width: "15",
				height: "15",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "3",
						y: "3",
						width: "7",
						height: "7"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "14",
						y: "3",
						width: "7",
						height: "7"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "14",
						y: "14",
						width: "7",
						height: "7"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "3",
						y: "14",
						width: "7",
						height: "7"
					})
				]
			}),
			label: "Overview"
		},
		{
			id: "users",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				width: "15",
				height: "15",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "9",
						cy: "7",
						r: "4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M23 21v-2a4 4 0 0 0-3-3.87" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })
				]
			}),
			label: "Users",
			badge: users?.filter((u) => u.banned).length
		},
		{
			id: "jobs",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				width: "15",
				height: "15",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						x: "2",
						y: "2",
						width: "20",
						height: "20",
						rx: "2.18",
						ry: "2.18"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: "7",
						y1: "2",
						x2: "7",
						y2: "22"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: "17",
						y1: "2",
						x2: "17",
						y2: "22"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: "2",
						y1: "12",
						x2: "22",
						y2: "12"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: "2",
						y1: "7",
						x2: "7",
						y2: "7"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: "2",
						y1: "17",
						x2: "7",
						y2: "17"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: "17",
						y1: "17",
						x2: "22",
						y2: "17"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
						x1: "17",
						y1: "7",
						x2: "22",
						y2: "7"
					})
				]
			}),
			label: "Jobs"
		},
		{
			id: "analytics",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				width: "15",
				height: "15",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "23 6 13.5 15.5 8.5 10.5 1 18" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "17 6 23 6 23 12" })]
			}),
			label: "Analytics"
		},
		{
			id: "insights",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				width: "15",
				height: "15",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "3",
					y: "11",
					width: "18",
					height: "11",
					rx: "2",
					ry: "2"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })]
			}),
			label: "AI Insights"
		},
		{
			id: "revenue",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				width: "15",
				height: "15",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "12",
					y1: "1",
					x2: "12",
					y2: "23"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" })]
			}),
			label: "Revenue"
		},
		{
			id: "storage",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				width: "15",
				height: "15",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
						cx: "12",
						cy: "5",
						rx: "9",
						ry: "3"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" })
				]
			}),
			label: "Storage"
		},
		{
			id: "moderation",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				width: "15",
				height: "15",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" })
			}),
			label: "Moderation"
		},
		{
			id: "broadcast",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				width: "15",
				height: "15",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
			}),
			label: "Broadcast"
		},
		{
			id: "emails",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				width: "15",
				height: "15",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "22,6 12,13 2,6" })]
			}),
			label: "Email Logs"
		},
		{
			id: "flags",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				width: "15",
				height: "15",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: "4",
					y1: "22",
					x2: "4",
					y2: "15"
				})]
			}),
			label: "Feature Flags"
		},
		{
			id: "audit",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				width: "15",
				height: "15",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: "8",
					y: "2",
					width: "8",
					height: "4",
					rx: "1",
					ry: "1"
				})]
			}),
			label: "Audit Log"
		},
		{
			id: "bulk",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
				width: "15",
				height: "15",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" })
			}),
			label: "Bulk Ops"
		},
		{
			id: "system",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
				width: "15",
				height: "15",
				viewBox: "0 0 24 24",
				fill: "none",
				stroke: "currentColor",
				strokeWidth: "2",
				strokeLinecap: "round",
				strokeLinejoin: "round",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "12",
					cy: "12",
					r: "3"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" })]
			}),
			label: "System"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: Admin_module_default.shell,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        @keyframes slideInRight {
          from { opacity:0; transform:translateX(20px); }
          to   { opacity:1; transform:translateX(0); }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width:6px; height:6px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:var(--border-base); border-radius:3px; }
        input, textarea, button, select { font-family:inherit; }
        a { color:inherit; text-decoration:none; }
      ` }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: `${Admin_module_default.sidebar} ${sidebarOpen ? Admin_module_default.sidebarOpen : ""}`,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							display: "flex",
							alignItems: "center",
							gap: 10,
							padding: "6px 10px 20px"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								width: 30,
								height: 30,
								borderRadius: 6,
								overflow: "hidden",
								background: "var(--bg-base)",
								display: "flex",
								alignItems: "center",
								justifyContent: "center"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/subai-logo.png",
								alt: "SubAI",
								style: {
									height: 52,
									width: "auto",
									objectFit: "contain"
								}
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: 13,
								fontWeight: 700,
								color: "var(--text-primary)"
							},
							children: "SubAI Admin"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: 10,
								color: "var(--text-secondary)"
							},
							children: "Control Panel"
						})] })]
					}),
					sideItems.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavBtn, {
						active: tab === item.id,
						onClick: () => setTab(item.id),
						icon: item.icon,
						label: item.label,
						badge: item.badge
					}, item.id)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { flex: 1 } }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							borderTop: "1px solid var(--border-subtle)",
							paddingTop: 10,
							marginTop: 4
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavBtn, {
							active: false,
							onClick: () => navigate({ to: "/dashboard" }),
							icon: "←",
							label: "Back to App"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							margin: "10px 4px 0",
							padding: "10px 12px",
							background: "var(--accent-dim)",
							borderRadius: 16,
							border: "1px solid var(--primary)",
							transition: "all 150ms ease"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: 10,
								color: "var(--primary)",
								fontWeight: 700,
								marginBottom: 3
							},
							children: "ADMIN"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							style: {
								fontSize: 11,
								color: "var(--text-secondary)",
								wordBreak: "break-all"
							},
							children: user.email
						})]
					})
				]
			}),
			sidebarOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: Admin_module_default.mobileOverlay,
				onClick: () => setSidebarOpen(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: Admin_module_default.main,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: Admin_module_default.header,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								alignItems: "center",
								gap: 12
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setSidebarOpen(!sidebarOpen),
								className: Admin_module_default.hamburger,
								"aria-label": "Toggle sidebar",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									width: "18",
									height: "18",
									viewBox: "0 0 24 24",
									fill: "none",
									stroke: "currentColor",
									strokeWidth: "2",
									strokeLinecap: "round",
									strokeLinejoin: "round",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 5h16" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 12h16" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M4 19h16" })
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
								style: {
									fontSize: 16,
									fontWeight: 700,
									margin: 0,
									color: "var(--text-primary)"
								},
								children: [
									sideItems.find((s) => s.id === tab)?.icon,
									" ",
									sideItems.find((s) => s.id === tab)?.label
								]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: {
								display: "flex",
								gap: 8,
								alignItems: "center"
							},
							children: [loadingData && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: 11,
									color: "var(--text-secondary)"
								},
								children: "Loading…"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: loadAll,
								style: {
									padding: "7px 14px",
									borderRadius: 9999,
									border: "1px solid var(--border-base)",
									background: "transparent",
									color: "var(--text-secondary)",
									cursor: "pointer",
									fontSize: 12,
									display: "flex",
									alignItems: "center",
									gap: 6,
									transition: "all 150ms ease"
								},
								children: "↻ Refresh"
							})]
						})]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							margin: "16px 28px 0",
							padding: "12px 16px",
							background: "rgba(239,68,68,0.1)",
							border: "1px solid rgba(239,68,68,0.3)",
							borderRadius: 16,
							color: "#f87171",
							fontSize: 13
						},
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: Admin_module_default.scrollArea,
						children: [
							tab === "overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: Admin_module_default.grid,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
											label: "Total Users",
											value: stats?.totalUsers,
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
												width: "18",
												height: "18",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "12",
													cy: "7",
													r: "4"
												})]
											}),
											color: "#3b82f6",
											sub: `${fmt(newSignups.length)} new this week`
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
											label: "Total Jobs",
											value: stats?.totalJobs,
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
												width: "18",
												height: "18",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
														x: "2",
														y: "2",
														width: "20",
														height: "20",
														rx: "2.18",
														ry: "2.18"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
														x1: "7",
														y1: "2",
														x2: "7",
														y2: "22"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
														x1: "17",
														y1: "2",
														x2: "17",
														y2: "22"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
														x1: "2",
														y1: "12",
														x2: "22",
														y2: "12"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
														x1: "2",
														y1: "7",
														x2: "7",
														y2: "7"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
														x1: "2",
														y1: "17",
														x2: "7",
														y2: "17"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
														x1: "17",
														y1: "17",
														x2: "22",
														y2: "17"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
														x1: "17",
														y1: "7",
														x2: "22",
														y2: "7"
													})
												]
											}),
											color: "#D97736",
											sub: `${fmt(stats?.jobsByStatus?.completed || 0)} completed`
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
											label: "Total Subtitles",
											value: stats?.totalSubtitles,
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
												width: "18",
												height: "18",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "14 2 14 8 20 8" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
														x1: "16",
														y1: "13",
														x2: "8",
														y2: "13"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
														x1: "16",
														y1: "17",
														x2: "8",
														y2: "17"
													})
												]
											}),
											color: "#22c55e"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
											label: "Storage Files",
											value: stats?.totalStorageFiles,
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
												width: "18",
												height: "18",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
														cx: "12",
														cy: "5",
														rx: "9",
														ry: "3"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" })
												]
											}),
											color: "#a855f7"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
											label: "Active 7d",
											value: stats?.activeUsers7,
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
												width: "18",
												height: "18",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "2",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M13 2L3 14h9l-1 8 10-12h-9l1-8z" })
											}),
											color: "#f97316",
											sub: `${fmt(stats?.activeUsers30)} active 30d`
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
											label: "Banned Users",
											value: users?.filter((u) => u.banned).length,
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
												width: "18",
												height: "18",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													cx: "12",
													cy: "12",
													r: "10"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
													x1: "4.93",
													y1: "4.93",
													x2: "19.07",
													y2: "19.07"
												})]
											}),
											color: "#ef4444"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
											label: "Churned 30d",
											value: churned.length,
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
												width: "18",
												height: "18",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9.6 4.6A2 2 0 1 1 11 8H2" }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M12.6 19.4A2 2 0 1 0 14 16H2" })
												]
											}),
											color: "#6b7280"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
											label: "New Signups 7d",
											value: newSignups.length,
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
												width: "18",
												height: "18",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "2",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" })
											}),
											color: "#ec4899"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: Admin_module_default.chartCard,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: "Jobs Over Time" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
										width: "100%",
										height: 200,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
											data: stats?.jobsByDate || [],
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
													id: "gJobs",
													x1: "0",
													y1: "0",
													x2: "0",
													y2: "1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
														offset: "5%",
														stopColor: "#D97736",
														stopOpacity: .25
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
														offset: "95%",
														stopColor: "#D97736",
														stopOpacity: 0
													})]
												}) }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
													dataKey: "date",
													tick: {
														fontSize: 10,
														fill: "#6b7280"
													},
													tickLine: false,
													axisLine: false
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
													tick: {
														fontSize: 10,
														fill: "#6b7280"
													},
													tickLine: false,
													axisLine: false
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
													background: "rgba(10,10,10,0.9)",
													border: "1px solid rgba(255,255,255,0.1)",
													borderRadius: 6,
													fontSize: 12,
													boxShadow: "rgba(0,0,0,0.3) 0px 10px 30px -5px"
												} }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
													type: "monotone",
													dataKey: "count",
													stroke: "#D97736",
													strokeWidth: 2,
													fill: "url(#gJobs)",
													name: "Jobs"
												})
											]
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: Admin_module_default.chartGrid,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: Admin_module_default.card,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: "Language Split" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
											width: "100%",
											height: 180,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
												data: langPie,
												dataKey: "value",
												nameKey: "name",
												cx: "50%",
												cy: "50%",
												outerRadius: 70,
												label: ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`,
												labelLine: false,
												children: langPie.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: COLORS[i % COLORS.length] }, i))
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
												background: "#18181b",
												border: "1px solid rgba(255,255,255,0.1)",
												borderRadius: 6,
												fontSize: 12
											} })] })
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: Admin_module_default.chartCard,
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
											width: "100%",
											height: 180,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PieChart, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pie, {
												data: statusPie,
												dataKey: "value",
												nameKey: "name",
												cx: "50%",
												cy: "50%",
												outerRadius: 70,
												label: ({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`,
												labelLine: false,
												children: statusPie.map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cell, { fill: COLORS[i % COLORS.length] }, i))
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
												background: "#18181b",
												border: "1px solid rgba(255,255,255,0.1)",
												borderRadius: 6,
												fontSize: 12
											} })] })
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: Admin_module_default.card,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: "Top Users by Jobs" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											display: "flex",
											flexDirection: "column",
											gap: 10
										},
										children: (stats?.topUsers || []).slice(0, 6).map((u, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: {
												display: "flex",
												alignItems: "center",
												gap: 12,
												padding: "10px 14px",
												background: "rgba(255,255,255,0.03)",
												borderRadius: 16,
												border: "1px solid rgba(255,255,255,0.05)"
											},
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													style: {
														width: 28,
														height: 28,
														borderRadius: "50%",
														background: `${COLORS[i % COLORS.length]}30`,
														color: COLORS[i % COLORS.length],
														display: "flex",
														alignItems: "center",
														justifyContent: "center",
														fontSize: 11,
														fontWeight: 700,
														flexShrink: 0
													},
													children: i + 1
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													style: { flex: 1 },
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														style: {
															fontSize: 13,
															color: "#fff",
															fontWeight: 500
														},
														children: u.email
													}), u.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														style: {
															fontSize: 11,
															color: "#6b7280"
														},
														children: u.name
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													style: {
														padding: "3px 10px",
														borderRadius: 9999,
														background: `${COLORS[i % COLORS.length]}20`,
														color: COLORS[i % COLORS.length],
														fontSize: 12,
														fontWeight: 700
													},
													children: [u.count, " jobs"]
												})
											]
										}, u.userId))
									})]
								})
							] }),
							tab === "users" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										gap: 10,
										marginBottom: 18
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: userSearch,
										onChange: (e) => setUserSearch(e.target.value),
										placeholder: "🔍  Search by email or name…",
										style: {
											flex: 1,
											padding: "10px 14px",
											borderRadius: 16,
											border: "1px solid rgba(255,255,255,0.1)",
											background: "#0f0f12",
											color: "#fff",
											fontSize: 13,
											outline: "none"
										}
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											padding: "10px 16px",
											borderRadius: 16,
											background: "#0f0f12",
											border: "1px solid rgba(255,255,255,0.1)",
											fontSize: 13,
											color: "#6b7280",
											display: "flex",
											alignItems: "center"
										},
										children: [filteredUsers.length, " users"]
									})]
								}),
								selectedUsers.size > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										alignItems: "center",
										gap: 10,
										padding: "10px 14px",
										background: "rgba(217,119,6,0.08)",
										borderRadius: 16,
										marginBottom: 12,
										border: "1px solid rgba(217,119,6,0.15)",
										transition: "all 150ms ease"
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											style: {
												fontSize: 13,
												color: "#D97736",
												fontWeight: 600
											},
											children: [selectedUsers.size, " selected"]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => {
												setConfirm({
													title: `Ban ${selectedUsers.size} users?`,
													body: "Ban all selected users.",
													confirmLabel: "Ban selected",
													danger: true,
													onConfirm: async () => {
														setConfirm(null);
														for (const uid of selectedUsers) try {
															await banAdminUser({ data: {
																accessToken: token,
																userId: uid,
																banned: true
															} });
														} catch (e) {}
														push(`Banned ${selectedUsers.size} users`);
														setSelectedUsers(/* @__PURE__ */ new Set());
														loadAll();
													}
												});
											},
											style: {
												padding: "6px 12px",
												borderRadius: 9999,
												border: "none",
												background: "rgba(217,119,6,0.15)",
												color: "#FF9A4D",
												cursor: "pointer",
												fontSize: 12,
												transition: "all 150ms ease"
											},
											children: "Ban Selected"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => {
												setConfirm({
													title: `Delete ${selectedUsers.size} users?`,
													body: "Permanently delete all selected users.",
													confirmLabel: "Delete selected",
													danger: true,
													onConfirm: async () => {
														setConfirm(null);
														for (const uid of selectedUsers) try {
															await deleteAdminUser({ data: {
																accessToken: token,
																userId: uid
															} });
														} catch (e) {}
														push(`Deleted ${selectedUsers.size} users`);
														setSelectedUsers(/* @__PURE__ */ new Set());
														loadAll();
													}
												});
											},
											style: {
												padding: "6px 12px",
												borderRadius: 9999,
												border: "none",
												background: "rgba(239,68,68,0.12)",
												color: "#f87171",
												cursor: "pointer",
												fontSize: 12,
												transition: "all 150ms ease"
											},
											children: "Delete Selected"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setSelectedUsers(/* @__PURE__ */ new Set()),
											style: {
												padding: "6px 12px",
												borderRadius: 9999,
												border: "1px solid rgba(255,255,255,0.1)",
												background: "transparent",
												color: "#6b7280",
												cursor: "pointer",
												fontSize: 12,
												transition: "all 150ms ease"
											},
											children: "Clear"
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										display: "flex",
										flexDirection: "column",
										gap: 8
									},
									children: filteredUsers.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											background: "rgba(10,10,10,0.8)",
											backdropFilter: "blur(24px)",
											border: `1px solid ${u.banned ? "rgba(239,68,68,0.3)" : "rgba(255,255,255,0.08)"}`,
											borderRadius: 16,
											padding: "14px 16px",
											display: "flex",
											alignItems: "center",
											gap: 14,
											transition: "all 150ms ease"
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												type: "checkbox",
												checked: selectedUsers.has(u.id),
												onChange: (e) => {
													e.stopPropagation();
													setSelectedUsers((prev) => {
														const next = new Set(prev);
														if (next.has(u.id)) next.delete(u.id);
														else next.add(u.id);
														return next;
													});
												},
												style: {
													width: 16,
													height: 16,
													accentColor: "#D97736",
													cursor: "pointer",
													flexShrink: 0
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												style: {
													width: 38,
													height: 38,
													borderRadius: "50%",
													background: u.banned ? "#451a1a" : "linear-gradient(135deg,#D97736,#FF9A4D)",
													display: "flex",
													alignItems: "center",
													justifyContent: "center",
													fontSize: 13,
													fontWeight: 700,
													color: "#000",
													flexShrink: 0
												},
												children: initials(u.name, u.email)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													flex: 1,
													minWidth: 0
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													style: {
														display: "flex",
														alignItems: "center",
														gap: 8,
														flexWrap: "wrap"
													},
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															style: {
																fontSize: 13,
																fontWeight: 600,
																color: "#fff"
															},
															children: u.email
														}),
														u.banned && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															style: {
																padding: "2px 8px",
																borderRadius: 9999,
																background: "#451a1a",
																color: "#f87171",
																fontSize: 11,
																fontWeight: 700
															},
															children: "BANNED"
														}),
														u.active7 && !u.banned && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															style: {
																padding: "2px 8px",
																borderRadius: 9999,
																background: "rgba(34,197,94,0.1)",
																color: "#4ade80",
																fontSize: 11
															},
															children: "active"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															style: {
																padding: "2px 8px",
																borderRadius: 9999,
																background: "rgba(255,255,255,0.05)",
																color: "#6b7280",
																fontSize: 11
															},
															children: u.provider
														})
													]
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													style: {
														fontSize: 11,
														color: "#6b7280",
														marginTop: 3
													},
													children: [
														u.name && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															style: { marginRight: 10 },
															children: u.name
														}),
														"Joined ",
														fmtDate(u.createdAt),
														" · Last seen ",
														fmtAgo(u.lastSignIn),
														" ·",
														" ",
														u.jobCount,
														" jobs · ",
														u.topLanguage
													]
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													display: "flex",
													gap: 6,
													flexShrink: 0
												},
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => setExpandedUser(expandedUser === u.id ? null : u.id),
														style: {
															padding: "6px 12px",
															borderRadius: 9999,
															border: "1px solid rgba(255,255,255,0.1)",
															background: "transparent",
															color: "#9CA3AF",
															cursor: "pointer",
															fontSize: 12,
															transition: "all 150ms ease"
														},
														children: expandedUser === u.id ? "▲ Hide" : "▼ Jobs"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => handleBanUser(u),
														style: {
															padding: "6px 12px",
															borderRadius: 9999,
															border: "none",
															background: u.banned ? "rgba(34,197,94,0.15)" : "rgba(217,119,6,0.15)",
															color: u.banned ? "#4ade80" : "#FF9A4D",
															cursor: "pointer",
															fontSize: 12,
															fontWeight: 500,
															transition: "all 150ms ease"
														},
														children: u.banned ? "Unban" : "Ban"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														onClick: () => handleDeleteUser(u),
														style: {
															padding: "6px 12px",
															borderRadius: 9999,
															border: "none",
															background: "rgba(239,68,68,0.12)",
															color: "#f87171",
															cursor: "pointer",
															fontSize: 12,
															fontWeight: 500,
															transition: "all 150ms ease"
														},
														children: "Delete"
													})
												]
											})
										]
									}), expandedUser === u.id && stats?.jobs && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											margin: "4px 0 4px 52px",
											padding: "12px 14px",
											background: "#0f0f12",
											borderRadius: 16,
											border: "1px solid rgba(255,255,255,0.05)"
										},
										children: stats.jobs.filter((j) => j.user_id === u.id).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												fontSize: 12,
												color: "#6b7280"
											},
											children: "No jobs"
										}) : stats.jobs.filter((j) => j.user_id === u.id).map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: {
												display: "flex",
												alignItems: "center",
												gap: 10,
												padding: "6px 0",
												borderBottom: "1px solid rgba(255,255,255,0.04)"
											},
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													style: {
														fontSize: 12,
														color: "#9CA3AF",
														flex: 1
													},
													children: [
														j.title || j.id.slice(0, 10),
														" · ",
														j.language,
														" · ",
														j.status
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
													style: {
														fontSize: 11,
														color: "#6b7280"
													},
													children: fmtDate(j.created_at)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onClick: () => handleDeleteJob(j),
													style: {
														padding: "3px 8px",
														borderRadius: 9999,
														border: "none",
														background: "rgba(239,68,68,0.1)",
														color: "#f87171",
														cursor: "pointer",
														fontSize: 11,
														display: "inline-flex",
														alignItems: "center",
														gap: 4,
														transition: "all 150ms ease"
													},
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
														width: "12",
														height: "12",
														viewBox: "0 0 24 24",
														fill: "none",
														stroke: "currentColor",
														strokeWidth: "2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "3 6 5 6 21 6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" })]
													}), " Del"]
												})
											]
										}, j.id))
									})] }, u.id))
								})
							] }),
							tab === "jobs" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									gap: 10,
									marginBottom: 18,
									flexWrap: "wrap"
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										value: jobSearch,
										onChange: (e) => setJobSearch(e.target.value),
										placeholder: "🔍  Search jobs…",
										style: {
											flex: 1,
											minWidth: 200,
											padding: "10px 14px",
											borderRadius: 16,
											border: "1px solid rgba(255,255,255,0.1)",
											background: "#0f0f12",
											color: "#fff",
											fontSize: 13,
											outline: "none"
										}
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										value: jobStatusFilter,
										onChange: (e) => setJobStatusFilter(e.target.value),
										style: {
											padding: "10px 14px",
											borderRadius: 16,
											border: "1px solid rgba(255,255,255,0.1)",
											background: "#0f0f12",
											color: "#fff",
											fontSize: 13,
											outline: "none",
											cursor: "pointer"
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "all",
												children: "All Status"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "completed",
												children: "Completed"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "processing",
												children: "Processing"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											padding: "10px 16px",
											borderRadius: 16,
											background: "#0f0f12",
											border: "1px solid rgba(255,255,255,0.1)",
											fontSize: 13,
											color: "#6b7280",
											display: "flex",
											alignItems: "center"
										},
										children: [
											filteredJobs.length,
											" / ",
											stats?.totalJobs || 0
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									flexDirection: "column",
									gap: 6
								},
								children: [filteredJobs.slice(0, 100).map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										background: "#0f0f12",
										border: "1px solid rgba(255,255,255,0.08)",
										borderRadius: 16,
										padding: "12px 16px",
										display: "flex",
										alignItems: "center",
										gap: 12
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												width: 36,
												height: 36,
												borderRadius: 6,
												background: j.thumb_color || "#1a1a20",
												display: "flex",
												alignItems: "center",
												justifyContent: "center",
												fontSize: 16,
												flexShrink: 0
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
												width: "16",
												height: "16",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
														x: "2",
														y: "2",
														width: "20",
														height: "20",
														rx: "2.18",
														ry: "2.18"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
														x1: "7",
														y1: "2",
														x2: "7",
														y2: "22"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
														x1: "17",
														y1: "2",
														x2: "17",
														y2: "22"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
														x1: "2",
														y1: "12",
														x2: "22",
														y2: "12"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
														x1: "2",
														y1: "7",
														x2: "7",
														y2: "7"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
														x1: "2",
														y1: "17",
														x2: "7",
														y2: "17"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
														x1: "17",
														y1: "17",
														x2: "22",
														y2: "17"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
														x1: "17",
														y1: "7",
														x2: "22",
														y2: "7"
													})
												]
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: {
												flex: 1,
												minWidth: 0
											},
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													style: {
														fontSize: 13,
														fontWeight: 600,
														color: "#fff"
													},
													children: j.title || `Job ${j.id.slice(0, 8)}`
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													style: {
														fontSize: 11,
														color: "#6b7280",
														marginTop: 2
													},
													children: [
														j.userEmail,
														" · ",
														j.language,
														" · ",
														fmtDate(j.created_at)
													]
												}),
												j.ai_description && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													style: {
														fontSize: 11,
														color: "#6b7280",
														marginTop: 3,
														fontStyle: "italic"
													},
													children: [
														"\"",
														j.ai_description.slice(0, 80),
														"…\""
													]
												})
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: {
												padding: "3px 10px",
												borderRadius: 9999,
												fontSize: 11,
												fontWeight: 600,
												background: j.status === "completed" ? "rgba(34,197,94,0.1)" : "rgba(217,119,6,0.1)",
												color: j.status === "completed" ? "#4ade80" : "#D97736"
											},
											children: j.status
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											onClick: () => handleDeleteJob(j),
											style: {
												padding: "6px 12px",
												borderRadius: 9999,
												border: "none",
												background: "rgba(239,68,68,0.12)",
												color: "#f87171",
												cursor: "pointer",
												fontSize: 12,
												fontWeight: 500,
												display: "inline-flex",
												alignItems: "center",
												gap: 4,
												transition: "all 150ms ease"
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
												width: "12",
												height: "12",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "3 6 5 6 21 6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" })]
											}), " Delete"]
										})
									]
								}, j.id)), filteredJobs.length > 100 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										textAlign: "center",
										color: "#6b7280",
										fontSize: 12,
										padding: 12
									},
									children: [
										"Showing first 100 of ",
										filteredJobs.length,
										" results"
									]
								})]
							})] }),
							tab === "analytics" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									flexDirection: "column",
									gap: 18
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: Admin_module_default.card,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: "User Signups Over Time" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
											width: "100%",
											height: 200,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AreaChart, {
												data: stats?.usersByDate || [],
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
														id: "gUsers",
														x1: "0",
														y1: "0",
														x2: "0",
														y2: "1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
															offset: "5%",
															stopColor: "#3b82f6",
															stopOpacity: .25
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
															offset: "95%",
															stopColor: "#3b82f6",
															stopOpacity: 0
														})]
													}) }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
														dataKey: "date",
														tick: {
															fontSize: 10,
															fill: "#6b7280"
														},
														tickLine: false,
														axisLine: false
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
														tick: {
															fontSize: 10,
															fill: "#6b7280"
														},
														tickLine: false,
														axisLine: false
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
														background: "rgba(10,10,10,0.9)",
														border: "1px solid rgba(255,255,255,0.1)",
														borderRadius: 6,
														fontSize: 12,
														boxShadow: "rgba(0,0,0,0.3) 0px 10px 30px -5px"
													} }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
														type: "monotone",
														dataKey: "count",
														stroke: "#3b82f6",
														strokeWidth: 2,
														fill: "url(#gUsers)",
														name: "Signups"
													})
												]
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: Admin_module_default.card,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: "Cumulative Growth" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
											width: "100%",
											height: 200,
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(LineChart, {
												data: stats?.cumulativeData || [],
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
														dataKey: "date",
														tick: {
															fontSize: 10,
															fill: "#6b7280"
														},
														tickLine: false,
														axisLine: false
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
														tick: {
															fontSize: 10,
															fill: "#6b7280"
														},
														tickLine: false,
														axisLine: false
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
														background: "rgba(10,10,10,0.9)",
														border: "1px solid rgba(255,255,255,0.1)",
														borderRadius: 6,
														fontSize: 12,
														boxShadow: "rgba(0,0,0,0.3) 0px 10px 30px -5px"
													} }),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Legend, {}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
														type: "monotone",
														dataKey: "jobs",
														stroke: "#D97736",
														dot: false,
														name: "Jobs",
														strokeWidth: 2
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Line, {
														type: "monotone",
														dataKey: "users",
														stroke: "#3b82f6",
														dot: false,
														name: "Users",
														strokeWidth: 2
													})
												]
											})
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "grid",
											gridTemplateColumns: "1fr 1fr",
											gap: 14
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: Admin_module_default.card,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: "Jobs by Weekday" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
													width: "100%",
													height: 160,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
														data: stats?.jobsByWeekday || [],
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
																dataKey: "name",
																tick: {
																	fontSize: 10,
																	fill: "#6b7280"
																},
																tickLine: false,
																axisLine: false
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
																tick: {
																	fontSize: 10,
																	fill: "#6b7280"
																},
																tickLine: false,
																axisLine: false
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
																background: "#18181b",
																border: "1px solid rgba(255,255,255,0.1)",
																borderRadius: 6,
																fontSize: 12
															} }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
																dataKey: "count",
																fill: "#D97736",
																radius: [
																	4,
																	4,
																	0,
																	0
																],
																name: "Jobs"
															})
														]
													})
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: Admin_module_default.card,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: "Jobs by Hour (UTC)" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
													width: "100%",
													height: 160,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
														data: stats?.jobsByHour || [],
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
																dataKey: "hour",
																tick: {
																	fontSize: 9,
																	fill: "#6b7280"
																},
																tickLine: false,
																axisLine: false,
																interval: 3
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
																tick: {
																	fontSize: 10,
																	fill: "#6b7280"
																},
																tickLine: false,
																axisLine: false
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
																background: "#18181b",
																border: "1px solid rgba(255,255,255,0.1)",
																borderRadius: 6,
																fontSize: 12
															} }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
																dataKey: "count",
																fill: "#a855f7",
																radius: [
																	4,
																	4,
																	0,
																	0
																],
																name: "Jobs"
															})
														]
													})
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: Admin_module_default.card,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: "Video Duration Buckets" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
													width: "100%",
													height: 160,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
														data: durationPie,
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
																dataKey: "name",
																tick: {
																	fontSize: 10,
																	fill: "#6b7280"
																},
																tickLine: false,
																axisLine: false
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
																tick: {
																	fontSize: 10,
																	fill: "#6b7280"
																},
																tickLine: false,
																axisLine: false
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
																background: "#18181b",
																border: "1px solid rgba(255,255,255,0.1)",
																borderRadius: 6,
																fontSize: 12
															} }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
																dataKey: "value",
																fill: "#22c55e",
																radius: [
																	4,
																	4,
																	0,
																	0
																],
																name: "Videos"
															})
														]
													})
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: Admin_module_default.card,
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: "User Engagement" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
													width: "100%",
													height: 160,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
														data: Object.entries(stats?.engagementBuckets || {}).map(([name, value]) => ({
															name,
															value
														})),
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
																dataKey: "name",
																tick: {
																	fontSize: 10,
																	fill: "#6b7280"
																},
																tickLine: false,
																axisLine: false
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
																tick: {
																	fontSize: 10,
																	fill: "#6b7280"
																},
																tickLine: false,
																axisLine: false
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
																background: "#18181b",
																border: "1px solid rgba(255,255,255,0.1)",
																borderRadius: 6,
																fontSize: 12
															} }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
																dataKey: "value",
																fill: "#f97316",
																radius: [
																	4,
																	4,
																	0,
																	0
																],
																name: "Users"
															})
														]
													})
												})]
											})
										]
									})
								]
							}),
							tab === "insights" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									flexDirection: "column",
									gap: 18
								},
								children: [
									stats?.jobsByHour && (() => {
										const peak = stats.jobsByHour.reduce((a, b) => b.count > a.count ? b : a, { count: 0 });
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: {
												background: "linear-gradient(135deg,rgba(217,119,6,0.1),rgba(59,130,246,0.1))",
												border: "1px solid rgba(217,119,6,0.2)",
												borderRadius: 16,
												padding: 20,
												backdropFilter: "blur(24px)"
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													fontSize: 12,
													color: "#6b7280",
													marginBottom: 6
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
													width: "14",
													height: "14",
													viewBox: "0 0 24 24",
													fill: "none",
													stroke: "currentColor",
													strokeWidth: "2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
														x: "3",
														y: "11",
														width: "18",
														height: "11",
														rx: "2",
														ry: "2"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 11V7a5 5 0 0 1 10 0v4" })]
												}), " AI INSIGHT"]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													fontSize: 16,
													fontWeight: 600,
													color: "#fff"
												},
												children: [
													"Peak usage is at ",
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														style: { color: "#D97736" },
														children: peak.hour
													}),
													" UTC with ",
													peak.count,
													" jobs"
												]
											})]
										});
									})(),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: Admin_module_default.card,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: `Churned Users (${churned.length}) — No activity in 30 days` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: {
												display: "flex",
												flexDirection: "column",
												gap: 8
											},
											children: [churned.slice(0, 10).map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													display: "flex",
													alignItems: "center",
													gap: 12,
													padding: "8px 12px",
													background: "rgba(255,255,255,0.02)",
													borderRadius: 16
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													style: {
														width: 30,
														height: 30,
														borderRadius: "50%",
														background: "#1a1a20",
														display: "flex",
														alignItems: "center",
														justifyContent: "center",
														fontSize: 12,
														color: "#6b7280"
													},
													children: initials(u.name, u.email)
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													style: { flex: 1 },
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														style: {
															fontSize: 13,
															color: "#9CA3AF"
														},
														children: u.email
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														style: {
															fontSize: 11,
															color: "#6b7280"
														},
														children: [
															"Last seen ",
															fmtAgo(u.lastSignIn),
															" · ",
															u.jobCount,
															" total jobs"
														]
													})]
												})]
											}, u.id)), churned.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												style: {
													fontSize: 13,
													color: "#6b7280"
												},
												children: "No churned users — great retention!"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: Admin_module_default.card,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: `New Signups This Week (${newSignups.length})` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: {
												display: "flex",
												flexDirection: "column",
												gap: 8
											},
											children: [newSignups.slice(0, 10).map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													display: "flex",
													alignItems: "center",
													gap: 12,
													padding: "8px 12px",
													background: "rgba(34,197,94,0.04)",
													borderRadius: 16,
													border: "1px solid rgba(34,197,94,0.1)"
												},
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														style: {
															width: 30,
															height: 30,
															borderRadius: "50%",
															background: "rgba(34,197,94,0.15)",
															display: "flex",
															alignItems: "center",
															justifyContent: "center",
															fontSize: 12,
															color: "#4ade80"
														},
														children: initials(u.name, u.email)
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														style: { flex: 1 },
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															style: {
																fontSize: 13,
																color: "#fff"
															},
															children: u.email
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
															style: {
																fontSize: 11,
																color: "#6b7280"
															},
															children: [
																"Joined ",
																fmtAgo(u.createdAt),
																" · ",
																u.provider
															]
														})]
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														style: {
															fontSize: 11,
															color: "#4ade80"
														},
														children: "new"
													})
												]
											}, u.id)), newSignups.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												style: {
													fontSize: 13,
													color: "#6b7280"
												},
												children: "No new signups this week"
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: Admin_module_default.card,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: "Language Popularity Ranking" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												display: "flex",
												flexDirection: "column",
												gap: 10
											},
											children: Object.entries(stats?.jobsByLanguage || {}).sort((a, b) => b[1] - a[1]).map(([lang, count], i) => {
												const max = Math.max(...Object.values(stats?.jobsByLanguage || {}));
												return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													style: {
														display: "flex",
														alignItems: "center",
														gap: 12
													},
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															style: {
																width: 60,
																fontSize: 12,
																color: "#9CA3AF",
																textAlign: "right"
															},
															children: lang
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															style: {
																flex: 1,
																height: 8,
																background: "rgba(255,255,255,0.05)",
																borderRadius: 4,
																overflow: "hidden"
															},
															children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
																width: `${count / max * 100}%`,
																height: "100%",
																background: COLORS[i % COLORS.length],
																borderRadius: 4
															} })
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															style: {
																width: 30,
																fontSize: 12,
																color: "#6b7280"
															},
															children: count
														})
													]
												}, lang);
											})
										})]
									})
								]
							}),
							tab === "revenue" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									flexDirection: "column",
									gap: 18
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "grid",
										gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
										gap: 14
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
											label: "Total Jobs",
											value: revenue?.totalJobs || 0,
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
												width: "18",
												height: "18",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
														x: "2",
														y: "2",
														width: "20",
														height: "20",
														rx: "2.18",
														ry: "2.18"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
														x1: "7",
														y1: "2",
														x2: "7",
														y2: "22"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
														x1: "17",
														y1: "2",
														x2: "17",
														y2: "22"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
														x1: "2",
														y1: "12",
														x2: "22",
														y2: "12"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
														x1: "2",
														y1: "7",
														x2: "7",
														y2: "7"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
														x1: "2",
														y1: "17",
														x2: "7",
														y2: "17"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
														x1: "17",
														y1: "17",
														x2: "22",
														y2: "17"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
														x1: "17",
														y1: "7",
														x2: "22",
														y2: "7"
													})
												]
											}),
											color: "#D97736",
											sub: "All time"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
											label: "Completed",
											value: revenue?.completedJobs || 0,
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
												width: "18",
												height: "18",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "2",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "20 6 9 17 4 12" })
											}),
											color: "#22c55e",
											sub: "Successfully processed"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
											label: "This Month",
											value: revenue?.jobsThisMonth || 0,
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
												width: "18",
												height: "18",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "2",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
														x: "3",
														y: "4",
														width: "18",
														height: "18",
														rx: "2",
														ry: "2"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
														x1: "16",
														y1: "2",
														x2: "16",
														y2: "6"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
														x1: "8",
														y1: "2",
														x2: "8",
														y2: "6"
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
														x1: "3",
														y1: "10",
														x2: "21",
														y2: "10"
													})
												]
											}),
											color: "#3b82f6",
											sub: "Jobs this month"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
											label: "Est. Revenue",
											value: `₹${(revenue?.estimatedRevenue || 0).toLocaleString("en-IN")}`,
											icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
												width: "18",
												height: "18",
												viewBox: "0 0 24 24",
												fill: "none",
												stroke: "currentColor",
												strokeWidth: "2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
													x1: "12",
													y1: "1",
													x2: "12",
													y2: "23"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" })]
											}),
											color: "#22c55e",
											sub: "Based on completed jobs"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: Admin_module_default.card,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: "Revenue Breakdown" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											display: "flex",
											flexDirection: "column",
											gap: 12
										},
										children: [{
											label: "Completed Jobs",
											value: revenue?.completedJobs || 0,
											total: revenue?.totalJobs || 1,
											color: "#22c55e"
										}, {
											label: "Processing",
											value: (revenue?.totalJobs || 0) - (revenue?.completedJobs || 0),
											total: revenue?.totalJobs || 1,
											color: "#D97736"
										}].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: {
												display: "flex",
												alignItems: "center",
												gap: 12
											},
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													style: {
														width: 120,
														fontSize: 12,
														color: "#9CA3AF"
													},
													children: item.label
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													style: {
														flex: 1,
														height: 8,
														background: "rgba(255,255,255,0.05)",
														borderRadius: 4,
														overflow: "hidden"
													},
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
														width: `${item.value / item.total * 100}%`,
														height: "100%",
														background: item.color,
														borderRadius: 4
													} })
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													style: {
														width: 40,
														fontSize: 12,
														color: "#6b7280",
														textAlign: "right"
													},
													children: item.value
												})
											]
										}, item.label))
									})]
								})]
							}),
							tab === "storage" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									flexDirection: "column",
									gap: 18
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											justifyContent: "space-between",
											alignItems: "center"
										},
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: `Storage Files (${storageFiles?.length || 0})` }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: async () => {
												setStorageLoading(true);
												try {
													setStorageFiles(await getStorageFiles({ data: { accessToken: token } }));
												} catch (e) {
													push(e.message, "error");
												}
												setStorageLoading(false);
											},
											style: {
												padding: "7px 14px",
												borderRadius: 9999,
												border: "1px solid rgba(255,255,255,0.1)",
												background: "transparent",
												color: "#9CA3AF",
												cursor: "pointer",
												fontSize: 12,
												transition: "all 150ms ease"
											},
											children: "↻ Load Files"
										})]
									}),
									storageLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontSize: 13,
											color: "#6b7280"
										},
										children: "Loading storage files…"
									}),
									storageFiles && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											flexDirection: "column",
											gap: 6
										},
										children: [storageFiles.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: {
												background: "rgba(10,10,10,0.8)",
												backdropFilter: "blur(24px)",
												border: "1px solid rgba(255,255,255,0.08)",
												borderRadius: 16,
												padding: "12px 16px",
												display: "flex",
												alignItems: "center",
												gap: 12,
												transition: "all 150ms ease"
											},
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													style: {
														width: 36,
														height: 36,
														borderRadius: 6,
														background: "#1a1a20",
														display: "flex",
														alignItems: "center",
														justifyContent: "center",
														fontSize: 16
													},
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
														width: "16",
														height: "16",
														viewBox: "0 0 24 24",
														fill: "none",
														stroke: "currentColor",
														strokeWidth: "2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "23 7 16 12 23 17 23 7" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
															x: "1",
															y: "5",
															width: "15",
															height: "14",
															rx: "2",
															ry: "2"
														})]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													style: {
														flex: 1,
														minWidth: 0
													},
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														style: {
															fontSize: 13,
															fontWeight: 500,
															color: "#fff",
															overflow: "hidden",
															textOverflow: "ellipsis",
															whiteSpace: "nowrap"
														},
														children: f.name
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														style: {
															fontSize: 11,
															color: "#6b7280",
															marginTop: 2
														},
														children: [
															(f.size / 1024 / 1024).toFixed(1),
															" MB · ",
															f.mimeType,
															" ·",
															" ",
															fmtDate(f.createdAt)
														]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onClick: () => {
														setConfirm({
															title: `Delete "${f.name}"?`,
															body: "This permanently removes the file from storage.",
															confirmLabel: "Delete file",
															danger: true,
															onConfirm: async () => {
																setConfirm(null);
																try {
																	await deleteStorageFile({ data: {
																		accessToken: token,
																		path: f.name
																	} });
																	setStorageFiles((prev) => prev.filter((x) => x.id !== f.id));
																	push(`Deleted ${f.name}`);
																} catch (e) {
																	push(e.message, "error");
																}
															}
														});
													},
													style: {
														padding: "6px 12px",
														borderRadius: 9999,
														border: "none",
														background: "rgba(239,68,68,0.12)",
														color: "#f87171",
														cursor: "pointer",
														fontSize: 12,
														fontWeight: 500,
														display: "inline-flex",
														alignItems: "center",
														gap: 4,
														transition: "all 150ms ease"
													},
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
														width: "12",
														height: "12",
														viewBox: "0 0 24 24",
														fill: "none",
														stroke: "currentColor",
														strokeWidth: "2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "3 6 5 6 21 6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" })]
													}), " Delete"]
												})
											]
										}, f.id)), storageFiles.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												fontSize: 13,
												color: "#6b7280",
												textAlign: "center",
												padding: 40
											},
											children: "No storage files"
										})]
									}),
									!storageFiles && !storageLoading && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontSize: 13,
											color: "#6b7280"
										},
										children: "Click \"Load Files\" to view storage contents"
									})
								]
							}),
							tab === "emails" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									flexDirection: "column",
									gap: 18
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											display: "flex",
											gap: 10,
											marginBottom: 4
										},
										children: [
											"all",
											"welcome",
											"test",
											"limit"
										].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setEmailFilter(f),
											style: {
												padding: "6px 14px",
												borderRadius: 9999,
												border: "none",
												fontSize: 12,
												cursor: "pointer",
												background: emailFilter === f ? "rgba(217,119,6,0.15)" : "rgba(255,255,255,0.04)",
												color: emailFilter === f ? "#D97736" : "#6b7280",
												textTransform: "capitalize",
												transition: "all 150ms ease"
											},
											children: f
										}, f))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: Admin_module_default.card,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: "Email Statistics" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												display: "grid",
												gridTemplateColumns: "repeat(3,1fr)",
												gap: 12
											},
											children: [
												{
													label: "Welcome Emails",
													value: stats?.emailStats?.welcome || 0,
													icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
														width: "16",
														height: "16",
														viewBox: "0 0 24 24",
														fill: "none",
														stroke: "currentColor",
														strokeWidth: "2",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M7 11l.6-2.4A2 2 0 0 1 9.2 7h.2a2 2 0 0 1 2 1.7l.3 1.4a2 2 0 0 0 2 1.7h.4a2 2 0 0 1 2 1.9l-.2 2.3a2 2 0 0 1-1.5 1.8l-6.5 2.2" })
													}),
													color: "#22c55e"
												},
												{
													label: "Test Emails",
													value: stats?.emailStats?.test || 0,
													icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
														width: "16",
														height: "16",
														viewBox: "0 0 24 24",
														fill: "none",
														stroke: "currentColor",
														strokeWidth: "2",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 3h6" }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10 9V3" }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M14 9V3" }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M6 21h12" }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10 9l-4 8a2 2 0 0 0 1.8 2.9h8.4A2 2 0 0 0 18 17l-4-8" })
														]
													}),
													color: "#3b82f6"
												},
												{
													label: "Free Tier Alerts",
													value: stats?.emailStats?.freeTierLimit || 0,
													icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
														width: "16",
														height: "16",
														viewBox: "0 0 24 24",
														fill: "none",
														stroke: "currentColor",
														strokeWidth: "2",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" }),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
																x1: "12",
																y1: "9",
																x2: "12",
																y2: "13"
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
																x1: "12",
																y1: "17",
																x2: "12.01",
																y2: "17"
															})
														]
													}),
													color: "#D97736"
												}
											].map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													background: "rgba(255,255,255,0.02)",
													borderRadius: 16,
													padding: 16,
													textAlign: "center"
												},
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														style: {
															fontSize: 24,
															marginBottom: 6
														},
														children: e.icon
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														style: {
															fontSize: 24,
															fontWeight: 800,
															color: "#fff"
														},
														children: e.value
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														style: {
															fontSize: 11,
															color: "#6b7280",
															marginTop: 4
														},
														children: e.label
													})
												]
											}, e.label))
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: Admin_module_default.card,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: "Email Service Status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												display: "flex",
												flexDirection: "column",
												gap: 8
											},
											children: [
												[
													"Resend API",
													"Connected",
													"#22c55e"
												],
												[
													"Rate Limiting",
													"In-memory (resets on restart)",
													"#D97736"
												],
												[
													"Welcome Emails",
													"Sent on signup",
													"#22c55e"
												],
												[
													"Free Tier Alerts",
													"Sent at 80% usage",
													"#22c55e"
												]
											].map(([k, v, c]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													display: "flex",
													alignItems: "center",
													gap: 12,
													padding: "10px 14px",
													background: "rgba(255,255,255,0.02)",
													borderRadius: 16
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													style: {
														width: 140,
														fontSize: 12,
														color: "#6b7280"
													},
													children: k
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													style: {
														fontSize: 13,
														color: c
													},
													children: v
												})]
											}, k))
										})]
									})
								]
							}),
							tab === "flags" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									display: "flex",
									flexDirection: "column",
									gap: 18
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: Admin_module_default.card,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
										title: "Feature Flags",
										action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											style: {
												fontSize: 11,
												color: "#6b7280"
											},
											children: "Toggle features on/off (stored in state, wire to DB to persist)"
										})
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											display: "flex",
											flexDirection: "column",
											gap: 8
										},
										children: Object.entries(featureFlags).map(([key, val]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: {
												display: "flex",
												alignItems: "center",
												justifyContent: "space-between",
												padding: "12px 14px",
												background: "rgba(255,255,255,0.02)",
												borderRadius: 16
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												style: {
													fontSize: 13,
													color: "#fff",
													fontWeight: 500
												},
												children: key.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												style: {
													fontSize: 11,
													color: "#6b7280",
													marginTop: 2
												},
												children: val ? "Enabled" : "Disabled"
											})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												onClick: () => setFeatureFlags((prev) => ({
													...prev,
													[key]: !prev[key]
												})),
												style: {
													width: 44,
													height: 24,
													borderRadius: 9999,
													border: "none",
													cursor: "pointer",
													background: val ? "#D97736" : "rgba(255,255,255,0.1)",
													position: "relative",
													transition: "background 150ms ease",
													flexShrink: 0
												},
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
													width: 18,
													height: 18,
													borderRadius: "50%",
													background: "#fff",
													position: "absolute",
													top: 3,
													left: val ? 23 : 3,
													transition: "left 150ms ease"
												} })
											})]
										}, key))
									})]
								})
							}),
							tab === "audit" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									display: "flex",
									flexDirection: "column",
									gap: 18
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: Admin_module_default.card,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
										title: "Audit Log",
										action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: async () => {
												try {
													setAuditLog(await getAuditLog({ data: { accessToken: token } }));
												} catch (e) {
													push(e.message, "error");
												}
											},
											style: {
												padding: "6px 12px",
												borderRadius: 9999,
												border: "1px solid rgba(255,255,255,0.1)",
												background: "transparent",
												color: "#9CA3AF",
												cursor: "pointer",
												fontSize: 12,
												transition: "all 150ms ease"
											},
											children: "↻ Load"
										})
									}), auditLog.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontSize: 13,
											color: "#6b7280",
											textAlign: "center",
											padding: 30
										},
										children: "No audit logs yet. Create an \"audit_log\" table in Supabase to enable tracking."
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											display: "flex",
											flexDirection: "column",
											gap: 6
										},
										children: auditLog.map((log, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: {
												display: "flex",
												alignItems: "center",
												gap: 12,
												padding: "10px 14px",
												background: "rgba(255,255,255,0.02)",
												borderRadius: 16
											},
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													style: {
														fontSize: 11,
														color: "#6b7280",
														minWidth: 80
													},
													children: fmtDate(log.created_at)
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													style: {
														fontSize: 13,
														color: "#9CA3AF",
														flex: 1
													},
													children: [
														log.action,
														" — ",
														log.details || ""
													]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													style: {
														fontSize: 11,
														color: "#6b7280"
													},
													children: log.admin_email
												})
											]
										}, log.id || i))
									})]
								})
							}),
							tab === "bulk" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									display: "flex",
									flexDirection: "column",
									gap: 18
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: Admin_module_default.card,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: "Bulk Operations" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											display: "grid",
											gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
											gap: 12
										},
										children: [
											{
												label: "Export Users CSV",
												desc: "Download all user data as CSV",
												icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
													width: "16",
													height: "16",
													viewBox: "0 0 24 24",
													fill: "none",
													stroke: "currentColor",
													strokeWidth: "2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "7 10 12 15 17 10" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
															x1: "12",
															y1: "15",
															x2: "12",
															y2: "3"
														})
													]
												}),
												action: async () => {
													const res = await exportAdminData({ data: {
														accessToken: token,
														type: "users"
													} });
													const blob = new Blob([res.csv], { type: "text/csv" });
													const url = URL.createObjectURL(blob);
													const a = document.createElement("a");
													a.href = url;
													a.download = res.filename;
													a.click();
													URL.revokeObjectURL(url);
													push("Users exported!");
												}
											},
											{
												label: "Export Jobs CSV",
												desc: "Download all job data as CSV",
												icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
													width: "16",
													height: "16",
													viewBox: "0 0 24 24",
													fill: "none",
													stroke: "currentColor",
													strokeWidth: "2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "7 10 12 15 17 10" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
															x1: "12",
															y1: "15",
															x2: "12",
															y2: "3"
														})
													]
												}),
												action: async () => {
													const res = await exportAdminData({ data: {
														accessToken: token,
														type: "jobs"
													} });
													const blob = new Blob([res.csv], { type: "text/csv" });
													const url = URL.createObjectURL(blob);
													const a = document.createElement("a");
													a.href = url;
													a.download = res.filename;
													a.click();
													URL.revokeObjectURL(url);
													push("Jobs exported!");
												}
											},
											{
												label: "Delete All Banned",
												desc: "Remove all banned users permanently",
												icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
													width: "16",
													height: "16",
													viewBox: "0 0 24 24",
													fill: "none",
													stroke: "currentColor",
													strokeWidth: "2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "3 6 5 6 21 6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" })]
												}),
												action: () => {
													const banned = users?.filter((u) => u.banned) || [];
													if (banned.length === 0) {
														push("No banned users", "error");
														return;
													}
													setConfirm({
														title: `Delete ${banned.length} banned users?`,
														body: "This permanently deletes all banned users and their jobs.",
														confirmLabel: `Delete ${banned.length} users`,
														danger: true,
														onConfirm: async () => {
															setConfirm(null);
															for (const u of banned) try {
																await deleteAdminUser({ data: {
																	accessToken: token,
																	userId: u.id
																} });
															} catch (e) {}
															push(`Deleted ${banned.length} banned users`);
															loadAll();
														}
													});
												}
											},
											{
												label: "Purge Old Jobs",
												desc: "Delete jobs older than 90 days",
												icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
													width: "16",
													height: "16",
													viewBox: "0 0 24 24",
													fill: "none",
													stroke: "currentColor",
													strokeWidth: "2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "3 6 5 6 21 6" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" })]
												}),
												action: () => {
													const cutoff = Date.now() - 90 * 864e5;
													const old = stats?.jobs?.filter((j) => new Date(j.created_at).getTime() < cutoff) || [];
													if (old.length === 0) {
														push("No old jobs to purge", "error");
														return;
													}
													setConfirm({
														title: `Purge ${old.length} old jobs?`,
														body: "Delete all jobs created more than 90 days ago.",
														confirmLabel: `Purge ${old.length} jobs`,
														danger: true,
														onConfirm: async () => {
															setConfirm(null);
															for (const j of old) try {
																await deleteAdminJob({ data: {
																	accessToken: token,
																	jobId: j.id
																} });
															} catch (e) {}
															push(`Purged ${old.length} old jobs`);
															loadAll();
														}
													});
												}
											},
											{
												label: "Ban All Inactive 30d",
												desc: "Ban users with no activity in 30 days",
												icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
													width: "16",
													height: "16",
													viewBox: "0 0 24 24",
													fill: "none",
													stroke: "currentColor",
													strokeWidth: "2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
														cx: "12",
														cy: "12",
														r: "10"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
														x1: "4.93",
														y1: "4.93",
														x2: "19.07",
														y2: "19.07"
													})]
												}),
												action: () => {
													const inactive = users?.filter((u) => !u.active30 && !u.banned && u.jobCount > 0) || [];
													if (inactive.length === 0) {
														push("No inactive users", "error");
														return;
													}
													setConfirm({
														title: `Ban ${inactive.length} inactive users?`,
														body: "These users haven't been active in 30 days.",
														confirmLabel: `Ban ${inactive.length} users`,
														danger: true,
														onConfirm: async () => {
															setConfirm(null);
															for (const u of inactive) try {
																await banAdminUser({ data: {
																	accessToken: token,
																	userId: u.id,
																	banned: true
																} });
															} catch (e) {}
															push(`Banned ${inactive.length} inactive users`);
															loadAll();
														}
													});
												}
											},
											{
												label: "Refresh All Data",
												desc: "Force reload all admin data",
												icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
													width: "16",
													height: "16",
													viewBox: "0 0 24 24",
													fill: "none",
													stroke: "currentColor",
													strokeWidth: "2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "23 4 23 10 17 10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20.49 15a9 9 0 1 1-2.12-9.36L23 10" })]
												}),
												action: loadAll
											}
										].map((op) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: {
												background: "rgba(255,255,255,0.02)",
												border: "1px solid rgba(255,255,255,0.06)",
												borderRadius: 16,
												padding: 16,
												display: "flex",
												flexDirection: "column",
												gap: 8
											},
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													style: {
														display: "flex",
														alignItems: "center",
														gap: 10
													},
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														style: { fontSize: 20 },
														children: op.icon
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														style: {
															fontSize: 13,
															fontWeight: 600,
															color: "#fff"
														},
														children: op.label
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													style: {
														fontSize: 12,
														color: "#6b7280"
													},
													children: op.desc
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: op.action,
													style: {
														marginTop: 4,
														padding: "8px 16px",
														borderRadius: 9999,
														border: "1px solid rgba(255,255,255,0.1)",
														background: "transparent",
														color: "#9CA3AF",
														cursor: "pointer",
														fontSize: 12,
														fontWeight: 500,
														textAlign: "left",
														transition: "all 150ms ease"
													},
													children: "Execute →"
												})
											]
										}, op.label))
									})]
								})
							}),
							tab === "moderation" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									flexDirection: "column",
									gap: 18
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: Admin_module_default.card,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: "Currently Banned Users" }), users?.filter((u) => u.banned).length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											fontSize: 13,
											color: "#6b7280"
										},
										children: "No banned users currently"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											display: "flex",
											flexDirection: "column",
											gap: 8
										},
										children: users?.filter((u) => u.banned).map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: {
												display: "flex",
												alignItems: "center",
												gap: 12,
												padding: "10px 14px",
												background: "rgba(239,68,68,0.05)",
												borderRadius: 16,
												border: "1px solid rgba(239,68,68,0.2)"
											},
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													style: { flex: 1 },
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														style: {
															fontSize: 13,
															color: "#f87171",
															fontWeight: 500
														},
														children: u.email
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														style: {
															fontSize: 11,
															color: "#6b7280"
														},
														children: [
															"Banned · ",
															u.jobCount,
															" jobs"
														]
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => handleBanUser(u),
													style: {
														padding: "6px 14px",
														borderRadius: 9999,
														border: "none",
														background: "rgba(34,197,94,0.15)",
														color: "#4ade80",
														cursor: "pointer",
														fontSize: 12,
														fontWeight: 500,
														transition: "all 150ms ease"
													},
													children: "✓ Unban"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: () => handleDeleteUser(u),
													style: {
														padding: "6px 14px",
														borderRadius: 9999,
														border: "none",
														background: "rgba(239,68,68,0.12)",
														color: "#f87171",
														cursor: "pointer",
														fontSize: 12,
														transition: "all 150ms ease"
													},
													children: "Delete"
												})
											]
										}, u.id))
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: Admin_module_default.card,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: "Jobs with AI Descriptions" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "flex",
											flexDirection: "column",
											gap: 8
										},
										children: [(stats?.jobs || []).filter((j) => j.ai_description).slice(0, 15).map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: {
												padding: "10px 14px",
												background: "rgba(255,255,255,0.03)",
												borderRadius: 16
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													fontSize: 12,
													fontWeight: 600,
													color: "#9CA3AF",
													marginBottom: 4
												},
												children: [
													j.title || j.id.slice(0, 10),
													" · ",
													j.userEmail
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													fontSize: 12,
													color: "#6b7280",
													fontStyle: "italic",
													lineHeight: 1.5
												},
												children: [
													"\"",
													j.ai_description,
													"\""
												]
											})]
										}, j.id)), !(stats?.jobs || []).some((j) => j.ai_description) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												fontSize: 13,
												color: "#6b7280"
											},
											children: "No AI descriptions yet"
										})]
									})]
								})]
							}),
							tab === "broadcast" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									flexDirection: "column",
									gap: 18
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: Admin_module_default.card,
									style: { padding: 24 },
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: "Send Announcement" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											value: announcement,
											onChange: (e) => setAnnouncement(e.target.value),
											placeholder: "Type your announcement to all users…",
											rows: 5,
											style: {
												width: "100%",
												padding: "14px 16px",
												borderRadius: 16,
												border: "1px solid rgba(255,255,255,0.1)",
												background: "#0A0A0A",
												color: "#fff",
												fontSize: 13,
												outline: "none",
												resize: "vertical",
												lineHeight: 1.6
											}
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												display: "flex",
												justifyContent: "flex-end",
												marginTop: 12
											},
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
												onClick: handleSendAnnouncement,
												disabled: !announcement.trim(),
												style: {
													padding: "10px 24px",
													borderRadius: 9999,
													border: "none",
													background: announcement.trim() ? "#D97736" : "rgba(255,255,255,0.05)",
													color: announcement.trim() ? "#030303" : "#6b7280",
													cursor: announcement.trim() ? "pointer" : "not-allowed",
													fontSize: 13,
													fontWeight: 700,
													display: "inline-flex",
													alignItems: "center",
													gap: 8,
													transition: "all 150ms ease"
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
													width: "16",
													height: "16",
													viewBox: "0 0 24 24",
													fill: "none",
													stroke: "currentColor",
													strokeWidth: "2",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
												}), " Post Announcement"]
											})
										})
									]
								}), announcements.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: Admin_module_default.card,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: "Announcement History" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										style: {
											display: "flex",
											flexDirection: "column",
											gap: 10
										},
										children: announcements.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: {
												padding: "12px 14px",
												background: "rgba(217,119,6,0.05)",
												borderRadius: 16,
												border: "1px solid rgba(217,119,6,0.1)"
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												style: {
													fontSize: 13,
													color: "#fff",
													lineHeight: 1.5
												},
												children: a.msg
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												style: {
													fontSize: 11,
													color: "#6b7280",
													marginTop: 4
												},
												children: fmtDate(a.time)
											})]
										}, a.id))
									})]
								})]
							}),
							tab === "system" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									flexDirection: "column",
									gap: 18
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										style: {
											display: "grid",
											gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))",
											gap: 14
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
												label: "DB Users",
												value: stats?.totalUsers,
												icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
													width: "18",
													height: "18",
													viewBox: "0 0 24 24",
													fill: "none",
													stroke: "currentColor",
													strokeWidth: "2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
															cx: "12",
															cy: "5",
															rx: "9",
															ry: "3"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" })
													]
												}),
												color: "#3b82f6"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
												label: "DB Jobs",
												value: stats?.totalJobs,
												icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
													width: "18",
													height: "18",
													viewBox: "0 0 24 24",
													fill: "none",
													stroke: "currentColor",
													strokeWidth: "2",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" })
												}),
												color: "#D97736"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
												label: "DB Subtitles",
												value: stats?.totalSubtitles,
												icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
													width: "18",
													height: "18",
													viewBox: "0 0 24 24",
													fill: "none",
													stroke: "currentColor",
													strokeWidth: "2",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" })
												}),
												color: "#22c55e"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
												label: "Storage Files",
												value: stats?.totalStorageFiles,
												icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
													width: "18",
													height: "18",
													viewBox: "0 0 24 24",
													fill: "none",
													stroke: "currentColor",
													strokeWidth: "2",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ellipse", {
															cx: "12",
															cy: "5",
															rx: "9",
															ry: "3"
														}),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" })
													]
												}),
												color: "#a855f7"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
												label: "Avg Sub Duration",
												value: `${stats?.avgSubDuration || 0}s`,
												icon: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
													width: "18",
													height: "18",
													viewBox: "0 0 24 24",
													fill: "none",
													stroke: "currentColor",
													strokeWidth: "2",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
														cx: "12",
														cy: "12",
														r: "10"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "12 6 12 12 16 14" })]
												}),
												color: "#ec4899"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
												label: "Avg Completion",
												value: stats?.avgCompletionMin === "N/A" ? "N/A" : `${stats?.avgCompletionMin}m`,
												icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
													width: "18",
													height: "18",
													viewBox: "0 0 24 24",
													fill: "none",
													stroke: "currentColor",
													strokeWidth: "2",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("polygon", { points: "13 2 3 14 12 14 11 22 21 10 12 10 13 2" })
												}),
												color: "#f97316"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: Admin_module_default.card,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: "Admin Info" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											style: {
												display: "flex",
												flexDirection: "column",
												gap: 10
											},
											children: [
												["Admin Email", ADMIN_EMAIL],
												["Auth Status", user ? "Authenticated" : "Not authenticated"],
												["Session Valid", useAuthStore.getState().session ? "Active" : "No session"],
												["Supabase URL", "Set"],
												["Service Role Key", "Server-side only"]
											].map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												style: {
													display: "flex",
													alignItems: "center",
													gap: 12,
													padding: "10px 14px",
													background: "rgba(255,255,255,0.02)",
													borderRadius: 16
												},
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													style: {
														width: 180,
														fontSize: 12,
														color: "#6b7280"
													},
													children: k
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													style: {
														fontSize: 13,
														color: "#9CA3AF",
														fontFamily: "monospace"
													},
													children: v
												})]
											}, k))
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: Admin_module_default.card,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, { title: "Quick Actions" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											style: {
												display: "flex",
												gap: 10,
												flexWrap: "wrap"
											},
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
													onClick: loadAll,
													style: {
														padding: "10px 20px",
														borderRadius: 9999,
														border: "1px solid rgba(255,255,255,0.1)",
														background: "transparent",
														color: "#9CA3AF",
														cursor: "pointer",
														fontSize: 13,
														transition: "all 150ms ease"
													},
													children: "↻ Reload All Data"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
													onClick: () => {
														setStats(null);
														setUsers(null);
														loadAll();
													},
													style: {
														padding: "10px 20px",
														borderRadius: 9999,
														border: "1px solid #D97736",
														background: "transparent",
														color: "#D97736",
														cursor: "pointer",
														fontSize: 13,
														transition: "all 150ms ease"
													},
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
														width: "16",
														height: "16",
														viewBox: "0 0 24 24",
														fill: "none",
														stroke: "currentColor",
														strokeWidth: "2",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", { points: "23 4 23 10 17 10" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M20.49 15a9 9 0 1 1-2.12-9.36L23 10" })]
													}), " Hard Reset + Reload"]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
													to: "/dashboard",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
														style: {
															padding: "10px 20px",
															borderRadius: 9999,
															border: "1px solid rgba(255,255,255,0.1)",
															background: "transparent",
															color: "#9CA3AF",
															cursor: "pointer",
															fontSize: 13,
															transition: "all 150ms ease"
														},
														children: "← Go to App"
													})
												})
											]
										})]
									})
								]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConfirmDialog, {
				open: !!confirm,
				title: confirm?.title,
				body: confirm?.body,
				confirmLabel: confirm?.confirmLabel,
				danger: confirm?.danger,
				onConfirm: confirm?.onConfirm,
				onCancel: () => setConfirm(null)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toasts, {})
		]
	});
}
//#endregion
export { AdminPage as component };
