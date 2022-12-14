module("luci.controller.cpufreq", package.seeall)

function index()
	if not nixio.fs.access("/etc/config/cpufreq") then
		return
	end

	local page = entry({"admin", "system", "cpufreq"}, alias("admin", "system", "cpufreq", "cpufreq"), _("CPU Freq"), 90)
	page.dependent = true
	page.acl_depends = { "luci-app-cpufreq" }

	entry({"admin", "system", "cpufreq", "cpufreq"}, cbi("cpufreq/cpufreq"), _("CPU Setting"), 1).leaf = true
	entry({"admin", "system", "cpufreq", "cryptodev"}, cbi("cpufreq/cryptodev"), _("Devcrypto Setting"), 2).leaf = true

end
