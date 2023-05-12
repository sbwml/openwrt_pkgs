#
# Copyright (C) 2015-2016 OpenWrt.org
#
# This is free software, licensed under the GNU General Public License v3.
#

include $(TOPDIR)/rules.mk

PKG_NAME:=rtl_fm_streamer
PKG_RELEASE:=1

PKG_SOURCE_PROTO:=git
PKG_SOURCE_URL:=https://github.com/AlbrechtL/rtl_fm_streamer.git
PKG_SOURCE_DATE:=2021-06-07
PKG_SOURCE_VERSION:=ceb2bf06883f986ed01aa57c84989ba35b6b9a27
PKG_MIRROR_HASH:=5e47bd1d895755248a7fe6ab0bc67d28c2d0c1048d2c9ac3ad16b9e83164101c

PKG_BUILD_PARALLEL:=1

PKG_LICENSE:=GPL-2.0
PKG_LICENSE_FILE:=COPYING
PKG_MAINTAINER:=sbwml <admin@cooluc.com>

include $(INCLUDE_DIR)/package.mk
include $(INCLUDE_DIR)/cmake.mk

define Package/$(PKG_NAME)
  SECTION:=net
  CATEGORY:=Network
  TITLE:=RTL SDR FM Streamer
  URL:=https://github.com/AlbrechtL/rtl_fm_streamer
  DEPENDS:=+libev +librtlsdr +libusb-1.0
endef

define Package/$(PKG_NAME)/install
	$(INSTALL_DIR) $(1)/usr/sbin
	$(INSTALL_BIN) $(PKG_INSTALL_DIR)/usr/bin/rtl_fm_streamer $(1)/usr/sbin/rtl_fm_streamer
endef

$(eval $(call BuildPackage,$(PKG_NAME)))
