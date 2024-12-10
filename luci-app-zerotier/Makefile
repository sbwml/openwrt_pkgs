# SPDX-License-Identifier: GPL-3.0-only
#
# Copyright (C) 2022 ImmortalWrt.org

include $(TOPDIR)/rules.mk

LUCI_TITLE:=LuCI for Zerotier
LUCI_DEPENDS:=+zerotier +jsonfilter +ucode
LUCI_PKGARCH:=all

PKG_NAME:=luci-app-zerotier
PKG_VERSION:=1.0.0
PKG_RELEASE:=1

define Package/$(PKG_NAME)/conffiles
/etc/zerotier
endef

include $(TOPDIR)/feeds/luci/luci.mk

# call BuildPackage - OpenWrt buildroot signature


