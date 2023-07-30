module("luci.controller.release_ram",package.seeall)

function index()
	entry({"admin", "status", "release_ram"}, call("release_ram"), _("Freeping Memory Cache"), 9999)
end

function release_ram()
	luci.sys.call("sync && sysctl -w vm.drop_caches=3")
	luci.http.redirect(luci.dispatcher.build_url("admin/status"))
end
