#
# Copyright (C) 2015-2016 OpenWrt.org
#
# This is free software, licensed under the GNU General Public License v3.
#

include $(TOPDIR)/rules.mk

PKG_NAME:=expect
PKG_VERSION:=5.45.4
PKG_RELEASE:=1

PKG_BUILD_FLAGS:=no-mold no-lto
PKG_BUILD_PARALLEL:=1
PKG_MAINTAINER:=sbwml <admin@cooluc.com>

PKG_SOURCE:=$(PKG_NAME)$(PKG_VERSION).tar.gz
PKG_SOURCE_URL:=@SF/expect
PKG_HASH:=49a7da83b0bdd9f46d04a04deec19c7767bb9a323e40c4781f89caf760b92c34

PKG_BUILD_DIR:=$(BUILD_DIR)/$(PKG_NAME)$(PKG_VERSION)

include $(INCLUDE_DIR)/package.mk

define Package/expect
  SECTION:=utils
  CATEGORY:=Utilities
  DEPENDS:=+tcl
  TITLE:=A Tool for Automating Interactive Programs
  URL:=https://expect.sourceforge.net
endef

define Package/expect/description
  Expect is a tcl extension for automating interactive applications such
  as telnet, ftp, passwd, fsck, rlogin, tip, etc.  Expect is also useful
  for testing the named applications.  Expect makes it easy for a script
  to control another program and interact with it.
endef

define Package/expect/install
	$(INSTALL_DIR) $(1)/usr/bin $(1)/usr/lib
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/expect $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/libexpect$(PKG_VERSION).so $(1)/usr/lib
endef

$(eval $(call BuildPackage,expect))
