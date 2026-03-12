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
  DEPENDS:=+tcl +coreutils-stty
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
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/expect $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/example/autoexpect $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/example/dislocate $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/example/ftp-rfc $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/example/kibitz $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/example/lpunlock $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/example/mkpasswd $(1)/usr/bin/mkpasswd-expect
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/example/passmass $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/example/rftp $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/example/rlogin-cwd $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/example/timed-read $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/example/timed-run $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/example/unbuffer $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/example/weather $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/example/xkibitz $(1)/usr/bin

	$(INSTALL_DIR) $(1)/usr/lib/tcl8.6/expect$(PKG_VERSION)
	$(INSTALL_DATA) $(PKG_BUILD_DIR)/pkgIndex.tcl $(1)/usr/lib/tcl8.6/expect$(PKG_VERSION)

	$(INSTALL_DIR) $(1)/usr/lib
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/libexpect$(PKG_VERSION).so $(1)/usr/lib
endef

$(eval $(call BuildPackage,expect))
