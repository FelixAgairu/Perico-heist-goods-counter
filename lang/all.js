$("#languageSwitch").on("input", function() {
	var currLang = $("#languageSwitch option")[$("#languageSwitch")[0].selectedIndex].value;
    $("body > div.credentials > h3").html(langCayoPerico[currLang].auth_name);
    $("body > div.credentials > h5:nth-child(2)").html(langCayoPerico[currLang].W_I_P);
    $("body > div.credentials > h5:nth-child(3)").html(langCayoPerico[currLang].report_issue);
    $("body > div.credentials > h5:nth-child(4)").html(langCayoPerico[currLang].support_dev);
	
    $(".main-container [value='false']").html(langCayoPerico[currLang].sele_NO);
    $(".main-container [value='true']").html(langCayoPerico[currLang].sele_YES);
    $("body > div.flex > div:nth-child(1) > div:nth-child(1) > label").html(langCayoPerico[currLang].sele_lang);
    $("body > div.flex > div:nth-child(1) > div:nth-child(2) > label").html(langCayoPerico[currLang].sele_hard);
})

var langCayoPerico = {
	en_US: {
		auth_name: "Created by: <a href='https://github.com/MichalD96' target='_blank'>Michal__d</a>",
		W_I_P: "Site build in progress ;)",
		report_issue: "Report all issues <a target='_blank' href='https://github.com/MichalD96/Perico-heist-goods-counter/issues/'>Here (GitHub)</a>",
		support_dev: "Support the project <a target='_blank' href='https://www.paypal.com/paypalme/Michald96'>Here (PayPal)</a>",
		
		sele_NO: "No",
		sele_YES: "Yes",
		sele_lang: "Language:",
		sele_hard: "Hard mode:",
	},
	zh_CN: {
		auth_name: "作者：<a href='https://github.com/MichalD96' target='_blank'>Michal__d</a>",
		W_I_P: "网站正在建设中 ;)",
		report_issue: "<a target='_blank' href='https://github.com/MichalD96/Perico-heist-goods-counter/issues/'>在此处（GitHub）</a>报告问题",
		support_dev: "<a target='_blank' href='https://www.paypal.com/paypalme/Michald96'>在此处（PayPal）</a>支持开发者",
		
		sele_NO: "否",
		sele_YES: "是",
		sele_lang: "语言：",
		sele_hard: "困难模式：",
	}
}
