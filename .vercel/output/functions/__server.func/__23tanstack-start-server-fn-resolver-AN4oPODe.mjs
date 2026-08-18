//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-AN4oPODe.js
var manifest = {
	"0516e413e92ecc8c4b7fc994fe891b423cb4074da40fe137527401987960c961": {
		functionName: "transcribeWithSarvam_createServerFn_handler",
		importer: () => import("./_ssr/sarvamServer-BplFIDxU.mjs")
	},
	"0fcd7c59fb9dbafd8bac6460d9266399c12dc620e3e9bf0884d64e52d7fdaa97": {
		functionName: "sendTestEmail_createServerFn_handler",
		importer: () => import("./_ssr/resendEmail-Dix2TgpG.mjs")
	},
	"27286d7af3dc1deaa6a99a358bf8caea07d13e225c418c545a163a0e2aef4ef7": {
		functionName: "transcribeWithGemini_createServerFn_handler",
		importer: () => import("./_ssr/geminiServer-B1_pcS01.mjs")
	},
	"2bafcd55d3865cdd53ba0295e2a4ff69c4668c3bb1b504ebb049a5c37bad1744": {
		functionName: "transcribeVideo_createServerFn_handler",
		importer: () => import("./_ssr/grokServer-Q8Kp4tba.mjs")
	},
	"313c3a0d317fc3bef413585a8e0221fb235423b874bccddc599aeae08767523a": {
		functionName: "deleteAdminUser_createServerFn_handler",
		importer: () => import("./_ssr/adminServer-EwiLiy8c.mjs")
	},
	"3925418846ef5053a00a9c18ade67f44b28047875a3fe1fd97f5cffd911aa93b": {
		functionName: "getAuditLog_createServerFn_handler",
		importer: () => import("./_ssr/adminServer-EwiLiy8c.mjs")
	},
	"44cf4c3b0a53149323179aafd39b9bc2c5607102f152c39e06067a9c8c00317b": {
		functionName: "banAdminUser_createServerFn_handler",
		importer: () => import("./_ssr/adminServer-EwiLiy8c.mjs")
	},
	"4e1a323a87df3a85b9768af03093a56af96a870b8549fb908968764823ce4ae3": {
		functionName: "getAdminUsers_createServerFn_handler",
		importer: () => import("./_ssr/adminServer-EwiLiy8c.mjs")
	},
	"678becf78b64b91e0ed14096a87890e2afd868e8a7994bdb056ce7ea7c6097ea": {
		functionName: "sendBudgetAlertEmail_createServerFn_handler",
		importer: () => import("./_ssr/resendEmail-Dix2TgpG.mjs")
	},
	"767ed70a0d33bf315cbec519b4c39f18333e1f9813e140a9c543e79df987998f": {
		functionName: "convertToHinglishServer_createServerFn_handler",
		importer: () => import("./_ssr/grokServer-Q8Kp4tba.mjs")
	},
	"7d20f7ae4d1c8388f7baab463bab4eb16e8168945151a08a40c84e44ccce42d3": {
		functionName: "getRevenueStats_createServerFn_handler",
		importer: () => import("./_ssr/adminServer-EwiLiy8c.mjs")
	},
	"8048d600a677f47bc0bbdb9e2eae9d10af0f78e46377c42d3f262ce7a800fd6e": {
		functionName: "analyzeWithGrokServer_createServerFn_handler",
		importer: () => import("./_ssr/grokServer-Q8Kp4tba.mjs")
	},
	"81ff8f931397ac08cc65a1de77edd377bd4e314b18354133a035acafa91a4dc7": {
		functionName: "deleteStorageFile_createServerFn_handler",
		importer: () => import("./_ssr/adminServer-EwiLiy8c.mjs")
	},
	"8c25d2b25cfcecb6a671bbc3f19816ae47b258f855f994f3e59b239a760d5ce7": {
		functionName: "getAdminStats_createServerFn_handler",
		importer: () => import("./_ssr/adminServer-EwiLiy8c.mjs")
	},
	"8cf7ed54a55f51aee0bbb21f590cc8f1a00d8019282881c593e844bba7b32d24": {
		functionName: "getAdminJobDetail_createServerFn_handler",
		importer: () => import("./_ssr/adminServer-EwiLiy8c.mjs")
	},
	"8d50a1524c992401f7983f9b593a10a33f18c3a9720f145259b4ed093afb6262": {
		functionName: "exportAdminData_createServerFn_handler",
		importer: () => import("./_ssr/adminServer-EwiLiy8c.mjs")
	},
	"96e6da33d18257e08a7af7a3578ebf355aa590240497d7ce838ee1d6e63ff91d": {
		functionName: "transcribeFromStorage_createServerFn_handler",
		importer: () => import("./_ssr/grokServer-Q8Kp4tba.mjs")
	},
	"a147262f7d8bff0566996274a8d381519f557d9bdf90a91291809184d4b4530a": {
		functionName: "sendWelcomeEmail_createServerFn_handler",
		importer: () => import("./_ssr/resendEmail-Dix2TgpG.mjs")
	},
	"cf288efb0876832b1b0763ad95f241d1d3cb444ea93ed9287efe2cb4b7fb2110": {
		functionName: "generateHook_createServerFn_handler",
		importer: () => import("./_ssr/hooksServer-WuqL2pUg.mjs")
	},
	"ed7dc59a575bcfb42953349a54f1006806bf81668644cca8675e3cf5e08ad4d5": {
		functionName: "getStorageFiles_createServerFn_handler",
		importer: () => import("./_ssr/adminServer-EwiLiy8c.mjs")
	},
	"fb26625f0613e3a030370918aa5f0f79ff9c39b0524997d560c4ddccf39d2376": {
		functionName: "deleteAdminJob_createServerFn_handler",
		importer: () => import("./_ssr/adminServer-EwiLiy8c.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
