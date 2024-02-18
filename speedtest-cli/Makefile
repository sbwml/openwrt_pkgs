include $(TOPDIR)/rules.mk

PKG_NAME:=speedtest-cli
PKG_VERSION:=1.2.0
PKG_RELEASE:=1

PKG_SOURCE:=ookla-speedtest-$(PKG_VERSION)-linux-$(ARCH).tgz
PKG_SOURCE_URL:=https://install.speedtest.net/app/cli

ifeq ($(ARCH),aarch64)
  PKG_HASH:=3953d231da3783e2bf8904b6dd72767c5c6e533e163d3742fd0437affa431bd3
else ifeq ($(ARCH),x86_64)
  PKG_HASH:=5690596c54ff9bed63fa3732f818a05dbc2db19ad36ed68f21ca5f64d5cfeeb7
endif

PKG_BUILD_DIR:=$(BUILD_DIR)/$(PKG_NAME)-$(PKG_VERSION)

PKG_MAINTAINER:=sbwml <admin@cooluc.com>

include $(INCLUDE_DIR)/package.mk

define Package/$(PKG_NAME)
	SECTION:=net
	CATEGORY:=Network
	TITLE:=Speedtest CLI by Ookla
	DEPENDS:=@(aarch64||x86_64) +ca-certificates
	URL:=https://www.speedtest.net/
endef

define Package/$(PKG_NAME)/description
  The Global Broadband Speed Test
endef

define Build/Prepare
	( \
		pushd $(PKG_BUILD_DIR) ; \
			$(TAR) -zxf $(DL_DIR)/ookla-speedtest-$(PKG_VERSION)-linux-$(ARCH).tgz -C . ; \
		popd ; \
	)
endef

define Build/Compile
endef

define Package/$(PKG_NAME)/install
	$(INSTALL_DIR) $(1)/usr/bin
	$(INSTALL_BIN) $(PKG_BUILD_DIR)/speedtest $(1)/usr/bin
endef

$(eval $(call BuildPackage,$(PKG_NAME)))
