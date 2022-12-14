mp = Map("cpufreq", translate("Cryptographic Hardware Accelerators"))
mp.description = translate("Enable devcrypto engine hardware encryption acceleration support.</br>For more information, visiting: https://openwrt.org/docs/techref/hardware/cryptographic.hardware.accelerators")

s = mp:section(NamedSection, "cpufreq", "settings")
s.anonymouse = true

o = s:option(Flag, "cryptodev_hw", translate("Hardware Accelerators"), translate("encryption test: openssl speed -elapsed -evp aes-128-cbc"))
o.rmempty = false

return mp
