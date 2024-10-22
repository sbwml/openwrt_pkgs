include $(TOPDIR)/rules.mk

PKG_NAME:=bash-completion
PKG_VERSION:=2.14.0
PKG_RELEASE:=1

PKG_SOURCE:=$(PKG_NAME)-$(PKG_VERSION).tar.xz
PKG_SOURCE_URL:=https://github.com/scop/bash-completion/releases/download/$(PKG_VERSION)
PKG_HASH:=5c7494f968280832d6adb5aa19f745a56f1a79df311e59338c5efa6f7285e168

PKG_MAINTAINER:=sbwml <admin@cooluc.com>
PKG_LICENSE:=GPL-2.0
PKG_LICENSE_FILES:=COPYING

PKG_INSTALL:=1
PKG_BUILD_PARALLEL:=1

include $(INCLUDE_DIR)/package.mk

define Package/bash-completion
  SECTION:=utils
  CATEGORY:=Utilities
  SUBMENU:=Shells
  TITLE:=Programmable completion functions for bash
  URL:=https://github.com/scop/bash-completion
  DEPENDS:=+bash
endef

define Package/bash-completion/description
  bash-completion is a collection of command line command completions for the Bash shell, 
  collection of helper functions to assist in creating new completions, 
  and set of facilities for loading completions automatically on demand, as well as installing them.
endef

define Package/bash-completion/install
	$(INSTALL_DIR) $(1)/etc/profile.d
	$(CP) $(PKG_INSTALL_DIR)/etc/profile.d/* $(1)/etc/profile.d/
	$(INSTALL_DIR) $(1)/usr/share/bash-completion
	$(CP) $(PKG_INSTALL_DIR)/usr/share/bash-completion/* $(1)/usr/share/bash-completion/
	$(INSTALL_DIR) $(1)/etc/bash_completion.d
endef

$(eval $(call BuildPackage,bash-completion))
