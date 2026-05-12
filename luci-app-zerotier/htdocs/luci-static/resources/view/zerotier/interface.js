/* SPDX-License-Identifier: GPL-3.0-only
 *
 * Copyright (C) 2022 ImmortalWrt.org
 */

'use strict';
'require fs';
'require ui';
'require view';
'require poll';
'require dom';

return view.extend({
	fetchData: function() {
		return fs.exec('/sbin/ifconfig').then(function(res) {
			if (res.code !== 0 || !res.stdout || res.stdout.trim() === '') {
				return [];
			}

			var interfaces = res.stdout.match(/zt[a-z0-9]+/g);
			if (!interfaces || interfaces.length === 0)
				return [];

			var promises = interfaces.map(function(name) {
				return fs.exec('/sbin/ifconfig', [name]);
			});

			return Promise.all(promises).then(function(results) {
				var data = results.map(function(res, index) {
					if (res.code !== 0 || !res.stdout || res.stdout.trim() === '') {
						return null;
					}
					return {
						name: interfaces[index],
						stdout: res.stdout.trim()
					};
				}).filter(Boolean);

				return data.map(function(info) {
					var lines = info.stdout.split('\n');
					var parsedInfo = {
						name: info.name,
						mac: '-',
						ipv4: '-',
						ipv6: '-',
						mtu: '-',
						rxBytes: '-',
						txBytes: '-'
					};

					lines.forEach(function(line) {
						if (line.includes('HWaddr')) {
							parsedInfo.mac = line.split('HWaddr')[1].trim().split(' ')[0];
						} else if (line.includes('inet addr:')) {
							parsedInfo.ipv4 = line.split('inet addr:')[1].trim().split(' ')[0];
						} else if (line.includes('inet6 addr:')) {
							parsedInfo.ipv6 = line.split('inet6 addr:')[1].trim().split('/')[0];
						} else if (line.includes('MTU:')) {
							parsedInfo.mtu = line.split('MTU:')[1].trim().split(' ')[0];
						} else if (line.includes('RX bytes:')) {
							var rxMatch = line.match(/RX bytes:\d+ \(([\d.]+\s*[a-zA-Z]+)\)/);
							if (rxMatch && rxMatch[1]) {
								parsedInfo.rxBytes = rxMatch[1];
							}
							var txMatch = line.match(/TX bytes:\d+ \(([\d.]+\s*[a-zA-Z]+)\)/);
							if (txMatch && txMatch[1]) {
								parsedInfo.txBytes = txMatch[1];
							}
						}
					});

					return parsedInfo;
				});
			});
		});
	},

	load: function() {
		return this.fetchData();
	},

	renderRows: function(data) {
		if (!Array.isArray(data) || data.length === 0) {
			return [
				E('tr', { class: 'tr' }, [
					E('td', { class: 'td', colspan: '2' }, _('No interface online.'))
				])
			];
		}

		return data.flatMap(function(interfaceData) {
			return [
				E('th', {class: 'th', colspan: '2'}, _('Network Interface Information')),
				E('tr', {class: 'tr'}, [
					E('td', {class: 'td left', width: '25%'}, _('Interface Name')),
					E('td', {class: 'td left', width: '25%'}, interfaceData.name)
				]),
				E('tr', {class: 'tr'}, [
					E('td', {class: 'td left', width: '25%'}, _('MAC Address')),
					E('td', {class: 'td left', width: '25%'}, interfaceData.mac)
				]),
				E('tr', {class: 'tr'}, [
					E('td', {class: 'td left', width: '25%'}, _('IPv4 Address')),
					E('td', {class: 'td left', width: '25%'}, interfaceData.ipv4)
				]),
				E('tr', {class: 'tr'}, [
					E('td', {class: 'td left', width: '25%'}, _('IPv6 Address')),
					E('td', {class: 'td left', width: '25%'}, interfaceData.ipv6)
				]),
				E('tr', {class: 'tr'}, [
					E('td', {class: 'td left', width: '25%'}, _('MTU')),
					E('td', {class: 'td left', width: '25%'}, interfaceData.mtu)
				]),
				E('tr', {class: 'tr'}, [
					E('td', {class: 'td left', width: '25%'}, _('Total Download')),
					E('td', {class: 'td left', width: '25%'}, interfaceData.rxBytes)
				]),
				E('tr', {class: 'tr'}, [
					E('td', {class: 'td left', width: '25%'}, _('Total Upload')),
					E('td', {class: 'td left', width: '25%'}, interfaceData.txBytes)
				])
			];
		});
	},

	render: function(data) {
		var title = E('h2', {class: 'content'}, _('ZeroTier'));
		var desc = E('div', {class: 'cbi-map-descr'}, _('ZeroTier is an open source, cross-platform and easy to use virtual LAN.'));

		var table = E('table', { 'class': 'table', 'id': 'zt_status_table' }, this.renderRows(data));

		poll.add(L.bind(function() {
			return this.fetchData().then(L.bind(function(newData) {
				dom.content(document.getElementById('zt_status_table'), this.renderRows(newData));
			}, this));
		}, this));

		return E('div', {}, [title, desc, table]);
	},

	handleSaveApply: null,
	handleSave: null,
	handleReset: null
});
