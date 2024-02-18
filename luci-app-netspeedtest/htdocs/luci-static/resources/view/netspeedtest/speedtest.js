'use strict';
'require view';
'require poll';
'require dom';
'require fs';
'require rpc';
'require uci';
'require ui';
'require form';

var TestTimeout = 240 * 1000; // 4 Minutes

return view.extend({
//	handleSaveApply: null,
//	handleSave: null,
//	handleReset: null,

	load: function() {
	return Promise.all([
		L.resolveDefault(fs.stat('/usr/libexec/netspeedtest/speedtest'), {}),
		L.resolveDefault(fs.read('/var/speedtest_result'), null),
		L.resolveDefault(fs.stat('/var/speedtest_result'), {}),
		uci.load('netspeedtest')
	]);
	},

	poll_status: function(nodes, res) {
		if (result_content.length) {
			if (result_content[0] == 'Testing') {
				result_stat.innerHTML = "<span style='color:green;font-weight:bold'>" +
					"<img src='" + L.resource(['icons/loading.gif']) + "' height='20' style='vertical-align:middle'>" +
					_('Testing in progress...') +
				"</span>";
			};
			if (result_content[0].match(/https?:\S+/)) {
				result_stat.innerHTML = "<div style='max-width:500px'><a href='" + result_content[0] + "' target='_blank'><img src='" + result_content[0] + '.png' + "' style='max-width:100%;max-height:100%;vertical-align:middle'></a></div>";
			};
			if (result_content[0] == 'Test failed') {
				result_stat.innerHTML = "<span style='color:red;font-weight:bold'>" + _('Test failed.') + "</span>";
			}
		} else {
			result_stat.innerHTML = "<span style='color:red;font-weight:bold;display:none'>" + _('No result.') + "</span>";
		};
		return;
	},

	render: function(res) {
		var has_ookla = res[0].path,
			result_content = res[1] ? res[1].trim().split("\n") : [],
			result_mtime = res[2] ? res[2].mtime * 1000 : 0,
			date = new Date();

		var m, s, o;

		m = new form.Map('netspeedtest', _('Speedtest by Ookla'));

		s = m.section(form.TypedSection, '_result');
		s.anonymous = true;
		s.render = function (section_id) {
			if (result_content.length) {
				if (result_content[0] == 'Testing') {
					return E('div', { 'id': 'speedtest_result' }, [ E('span', { 'style': 'color:yellow;font-weight:bold' }, [
						E('img', { 'src': L.resource(['icons/loading.gif']), 'height': '20', 'style': 'vertical-align:middle' }, []),
						_('Testing in progress...')
					]) ])
				};
				if (result_content[0].match(/https?:\S+/)) {
					return E('div', { 'id': 'speedtest_result' }, [ E('div', { 'style': 'max-width:500px' }, [
						E('a', { 'href': result_content[0], 'target': '_blank' }, [
							E('img', { 'src': result_content[0] + '.png', 'style': 'max-width:100%;max-height:100%;vertical-align:middle' }, [])
					]) ]) ])
				};
				if (result_content[0] == 'Test failed') {
					return E('div', { 'id': 'speedtest_result' }, [ E('span', { 'style': 'color:red;font-weight:bold' }, [ _('Test failed.') ]) ])
				}
			} else {
				return E('div', { 'id': 'speedtest_result' }, [ E('span', { 'style': 'color:red;font-weight:bold;display:none' }, [ _('No result.') ]) ])
			}
		};

		s = m.section(form.NamedSection, 'config', 'netspeedtest');
		s.anonymous = true;

		o = s.option(form.Button, '_start', _('Start Test'));
		o.inputtitle = _('Start Test');
		o.inputstyle = 'apply';
		if (result_content.length && result_content[0] == 'Testing' && (date.getTime() - result_mtime) < TestTimeout)
			o.readonly = true;
		o.onclick = function() {
			return fs.exec_direct('/usr/lib/netspeedtest/speedtest')
				.then(function(res) { return window.location = window.location.href.split('#')[0] })
				.catch(function(e) { ui.addNotification(null, E('p', e.message), 'error') });
		};

		return m.render()
		.then(L.bind(function(m, nodes) {
			poll.add(L.bind(function() {
				return Promise.all([
					L.resolveDefault(fs.stat('/usr/libexec/netspeedtest/speedtest'), {}),
					L.resolveDefault(fs.read('/var/speedtest_result'), null)
				]).then(L.bind(this.poll_status, this, nodes));
			}, this), 5);
			return nodes;
		}, this, m));
	}
});
