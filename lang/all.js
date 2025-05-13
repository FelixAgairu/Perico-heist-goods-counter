var currLang = "en_US";
$("#languageSwitch").on("change", function() {
	currLang = $("#languageSwitch option")[$("#languageSwitch")[0].selectedIndex].value;
    $("body > div.credentials > h3").html(langCayoPerico[currLang].auth_name);
    $("body > div.credentials > h5:nth-child(2)").html(langCayoPerico[currLang].W_I_P);
    $("body > div.credentials > h5:nth-child(3)").html(langCayoPerico[currLang].report_issue);
    $("body > div.credentials > h5:nth-child(4)").html(langCayoPerico[currLang].support_dev);
    $("body > div.credentials > h5:nth-child(5)").html(langCayoPerico[currLang].and_others);
	
    $(".main-container [value='false']").html(langCayoPerico[currLang].sele_NO);
    $(".main-container [value='true']").html(langCayoPerico[currLang].sele_YES);
	
    $("#primaryTarget > option:nth-child(1)").html(langCayoPerico[currLang].main_tequ);
    $("#primaryTarget > option:nth-child(2)").html(langCayoPerico[currLang].main_ruby);
    $("#primaryTarget > option:nth-child(3)").html(langCayoPerico[currLang].main_bond);
    $("#primaryTarget > option:nth-child(4)").html(langCayoPerico[currLang].main_pink);
    $("#primaryTarget > option:nth-child(5)").html(langCayoPerico[currLang].main_tank);
	
    $("body > div.flex > div:nth-child(1) > div:nth-child(1) > label").html(langCayoPerico[currLang].sele_lang);
    $("body > div.flex > div:nth-child(1) > div:nth-child(2) > label").html(langCayoPerico[currLang].sele_hard);
    $("body > div.flex > div:nth-child(1) > div:nth-child(3) > label").html(langCayoPerico[currLang].sele_bonus);
    $("body > div.flex > div:nth-child(1) > div:nth-child(4) > label").html(langCayoPerico[currLang].sele_target);
    $("body > div.flex > div:nth-child(1) > div:nth-child(5) > label").html(langCayoPerico[currLang].sele_players);
    $("body > div.flex > div:nth-child(1) > div:nth-child(6) > label").html(langCayoPerico[currLang].sele_goldAlone);
	
    $("body > div.flex > div:nth-child(1) > div:nth-child(7) > label").html(langCayoPerico[currLang].sele_gold + langCayoPerico[currLang].secd_unit);
    $("body > div.flex > div:nth-child(1) > div:nth-child(8) > label").html(langCayoPerico[currLang].sele_cocaine + langCayoPerico[currLang].secd_unit);
    $("body > div.flex > div:nth-child(1) > div:nth-child(9) > label").html(langCayoPerico[currLang].sele_weed + langCayoPerico[currLang].secd_unit);
    $("body > div.flex > div:nth-child(1) > div:nth-child(10) > label").html(langCayoPerico[currLang].sele_paintings + langCayoPerico[currLang].secd_unit_paints);
    $("body > div.flex > div:nth-child(1) > div:nth-child(11) > label").html(langCayoPerico[currLang].sele_cash + langCayoPerico[currLang].secd_unit);
	
	$("body > div.flex > div:nth-child(1) > h4").html(langCayoPerico[currLang].secd_title);
	$(".targets-names > div:nth-child(1)").html(langCayoPerico[currLang].list_name_target);
		$(".targets-names > div:nth-child(2)").html(langCayoPerico[currLang].sele_gold);
		$(".targets-names > div:nth-child(3)").html(langCayoPerico[currLang].sele_cocaine);
		$(".targets-names > div:nth-child(4)").html(langCayoPerico[currLang].sele_weed);
		$(".targets-names > div:nth-child(5)").html(langCayoPerico[currLang].sele_paintings);
		$(".targets-names > div:nth-child(6)").html(langCayoPerico[currLang].sele_cash);
	$(".targets-stacks > div:nth-child(1)").html(langCayoPerico[currLang].list_name_stacks);
	$(".targets-bags:first > div:nth-child(1)").html(langCayoPerico[currLang].list_name_full_bags);
	$(".targets-bags:last > div:nth-child(1)").html(langCayoPerico[currLang].list_name_fill_bags);
	
	$(".main-container.right > div:nth-child(1)").html(langCayoPerico[currLang].info_safe);
	$(".main-container.right > div:nth-child(2)").html(langCayoPerico[currLang].info_fencing);
	$(".main-container.right > div:nth-child(3)").html(langCayoPerico[currLang].info_pavel);
	$(".main-container.right > div:nth-child(4)").html(langCayoPerico[currLang].info_challenge);
	$("div.main-container.right > div.cuts > div:nth-child(1) > label").html(langCayoPerico[currLang].mber_a);
	$("div.main-container.right > div.cuts > div:nth-child(2) > label").html(langCayoPerico[currLang].mber_b);
	$("div.main-container.right > div.cuts > div:nth-child(3) > label").html(langCayoPerico[currLang].mber_c);
	$("div.main-container.right > div.cuts > div:nth-child(4) > label").html(langCayoPerico[currLang].mber_d);
	
	$("#max-loot-value").parent().html(langCayoPerico[currLang].info_max);
	
	$("div.main-container.right > p").html(langCayoPerico[currLang].info_order);
		
	$("#bags_fill").parent().html(langCayoPerico[currLang].info_bags);
	
	$("#reset-settings").html(langCayoPerico[currLang].conf_reset);
	$("#link-settings").html(langCayoPerico[currLang].conf_share);
	
	$(".properties > p:nth-child(1)").html(langCayoPerico[currLang].note_a);
	$(".properties > p:nth-child(2)").html(langCayoPerico[currLang].note_b);
	
	Counter.getLoot();
})

var langCayoPerico = {
	en_US: {
		auth_name: "Created by: <a href='https://github.com/MichalD96' target='_blank'>Michal__d</a>",
		W_I_P: "Site build in progress ;)",
		report_issue: "Report all issues <a target='_blank' href='https://github.com/MichalD96/Perico-heist-goods-counter/issues/'>Here (GitHub)</a>",
		support_dev: "Support the project <a target='_blank' href='https://www.paypal.com/paypalme/Michald96'>Here (PayPal)</a>",
		and_others: "Translation+Tweaking: <a href='https://github.com/FelixAgairu' target='_blank'>FelixAgairu</a>",
		
		sele_NO: "No",
		sele_YES: "Yes",
		
		main_tequ: "Tequila",
		main_ruby: "Ruby Necklace",
		main_bond: "Bearer Bonds",
		main_pink: "Pink Diamond",
		main_tank: "Panther Statue",
		
		sele_lang: "Language:",
		sele_hard: "Hard Mode:",
		sele_bonus: "Within 72h Honus:",
		sele_target: "Main Target:",
		sele_players: "Amount Of Players:",
		sele_goldAlone: "Collect Gold Alone?",
		
		sele_gold: "Gold",
		sele_cocaine: "Cocaine",
		sele_weed: "Weed",
		sele_paintings: "Paintings",
		sele_cash: "Cash Stacks",
		
		secd_unit: " Stacks:",
		secd_unit_paints: " Frames:",
		
		secd_title: "Secondary targets average values:",
		list_name_target: "Target",
		list_name_stacks: "Stack Value",
		list_name_full_bags: "Full Bag",
		list_name_fill_bags: "Bag Fill %",
		
		info_safe: '+ Office safe: <span id="office-safe"></span>',
		info_fencing: '- Fencing fee (10%): <span id="fencing-fee"></span>',
		info_pavel: '- Pavel fee (2%): <span id="pavel-fee"></span>',
		info_challenge: '+ Elite Challenge: <span id="elite-challenge"></span> for every player*',
		mber_a: "Leader",
		mber_b: "Member 1",
		mber_c: "Member 2",
		mber_d: "Member 3",
		
		info_max: 'Max possible profit: <span id="max-loot-value">1,417,853</span>',
		
		info_order: 'You can take (in profit order):',
		order_bags: " bag(s)",
		order_cuts: " cuts",
		order_clicks: " clicks",
		
		info_bags: 'Bags sum: <span id="bags_fill"></span>**',
		
		conf_reset: "Reset settings to default",
		conf_share: "Copy link with settings",
				
		note_a: "* - not included to current final value",
		note_b: "** - value over amount of players is not a bug, in some specific cases you can pick up more than your bags capacity"
	},
	zh_CN: {
		auth_name: "作者：<a href='https://github.com/MichalD96' target='_blank'>Michal__d</a>",
		W_I_P: "网站正在建设中 ;)",
		report_issue: "<a target='_blank' href='https://github.com/MichalD96/Perico-heist-goods-counter/issues/'>在此处（GitHub）</a>报告问题",
		support_dev: "<a target='_blank' href='https://www.paypal.com/paypalme/Michald96'>在此处（PayPal）</a>支持开发者",
		and_others: "翻译+调整：<a href='https://github.com/FelixAgairu' target='_blank'>FelixAgairu</a>",
		
		sele_NO: "否",
		sele_YES: "是",
		
		main_tequ: "西西米托龙舌兰酒",
		main_ruby: "红宝石项链",
		main_bond: "不记名债券",
		main_pink: "粉钻",
		main_tank: "黑豹雕像",
		
		sele_lang: "语言：",
		sele_hard: "困难模式：",
		sele_bonus: "72小时奖励：",
		sele_target: "主要目标：",
		sele_players: "玩家数量：",
		sele_goldAlone: "独自收黄金？",
		
		sele_gold: "黄金",
		sele_cocaine: "普洱茶",
		sele_weed: "绿茶",
		sele_paintings: "画",
		sele_cash: "现金",
		
		secd_unit: "（堆）：",
		secd_unit_paints: "（幅）：",
		
		secd_title: "次要目标平均价值：",
		list_name_target: "目标",
		list_name_stacks: "堆/幅 价值",
		list_name_full_bags: "装满整包",
		list_name_fill_bags: "包填充率",
		
		info_safe: '+ 办公室保险柜：<span id="office-safe"></span>',
		info_fencing: '- 倒卖费用：<span id="fencing-fee"></span>',
		info_pavel: '- 帕维尔费用：<span id="pavel-fee"></span>',
		info_challenge: '+ 精英挑战：<span id="elite-challenge"></span>每位玩家*',
		mber_a: "队长",
		mber_b: "成员1",
		mber_c: "成员2",
		mber_d: "成员3",
		
		info_max: '最大可收益：<span id="max-loot-value"></span>',
		
		info_order: '可以拾取（按收益排序)：',
		order_bags: "包",
		order_cuts: "切割",
		order_clicks: "点击",
		
		info_bags: '战利品包数：<span id="bags_fill"></span>**',
		
		conf_reset: "恢复默认设置",
		conf_share: "复制带设置的链接",
		
		note_a: "* - 未包含在最终价值内",
		note_b: "** - 价值超过玩家数量不是一个BUG，特定情况下，你可以拾取超过你背包容量的东西"
	}
}
