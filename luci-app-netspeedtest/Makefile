include $(TOPDIR)/rules.mk

LUCI_NAME:=luci-app-netspeedtest
PKG_VERSION:=1.0

LUCI_TITLE:=LuCI Net Speedtest
LUCI_DEPENDS:=+iperf3 +speedtest-cli

define Package/$(LUCI_NAME)/conffiles
/etc/config/netspeedtest
endef

include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature
