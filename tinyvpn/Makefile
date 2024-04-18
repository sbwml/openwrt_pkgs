#
# Copyright (C) 2015-2016 OpenWrt.org
#
# This is free software, licensed under the GNU General Public License v3.
#

include $(TOPDIR)/rules.mk

PKG_NAME:=tinyvpn
PKG_RELEASE:=1

PKG_SOURCE_PROTO:=git
PKG_SOURCE_URL:=https://github.com/wangyu-/tinyfecVPN.git
PKG_SOURCE_DATE:=2023-01-05
PKG_SOURCE_VERSION:=cbdf9beed3d03558b70d54e712453293f1d824f0
PKG_MIRROR_HASH:=9620be1c84d2e322ae1292f974a10ace9f68c7c2e6792ccae00523bdb4e82021

PKG_BUILD_PARALLEL:=1

PKG_LICENSE:=MIT
PKG_LICENSE_FILE:=LICENSE.md
PKG_MAINTAINER:=sbwml <admin@cooluc.com>

include $(INCLUDE_DIR)/package.mk

define Package/$(PKG_NAME)
  SECTION:=net
  CATEGORY:=Network
  TITLE:=tinyfecVPN
  URL:=https://github.com/wangyu-/tinyfecVPN
endef

define Package/$(PKG_NAME)/install
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/tinyvpn $(1)/usr/bin
endef

$(eval $(call BuildPackage,$(PKG_NAME)))
