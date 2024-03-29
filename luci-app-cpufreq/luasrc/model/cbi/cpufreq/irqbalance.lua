-- Copyright 2022 wulishui <wulishui@gmail.com>
-- Licensed to the public under the Apache License 2.0.
local utl = require "luci.util"
local sys = require "luci.sys"
local m, s
local button = ""

if luci.sys.call("pidof irqbalance >/dev/null") == 0 then
	status = translate("<b><font color=\"green\">RUNNING</font></b>")
else
	status = translate("<b><font color=\"red\">NOT RUNNING</font></b>")
end

m = Map("irqbalance", translate("Irqbalance"), translatef("Irqbalance is a Linux daemon that distributes interrupts over multiple logical CPUs. This design intent being to improve overall performance which can result in a balanced load and power consumption.</br>For more information, visiting: https://openwrt.org/docs/guide-user/services/irqbalance") .. button .. "<br /><br />" .. translate("Running Status").. " : "  .. status .. "<br />")

s = m:section(TypedSection, "irqbalance", translate("Settings"))
s.anonymous = true

enabled = s:option(Flag, "enabled", translate("Enable"))
enabled.rmempty = false

deepestcache = s:option(Value, "deepestcache", translate("Level at which irqbalance partitions cache domains"))
deepestcache.placeholder='2'
deepestcache.rmempty = true

interval = s:option(Value, "interval", translate("Interval (Seconds)"))
interval.placeholder='10'
interval.rmempty = true

banirq = s:option(DynamicList, "banirq", translate("Ignore (ID of irq)"))
banirq.rmempty = true

m:section(SimpleSection).template = "cpufreq/irq_status"

return m
