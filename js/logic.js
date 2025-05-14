const htmlElements = {
  gold: document.querySelector('#gold'),
  weed: document.querySelector('#weed'),
  cash: document.querySelector('#cash'),
  cocaine: document.querySelector('#cocaine'),
  paintings: document.querySelector('#paintings'),
  amountOfPlayers: document.querySelector('#amountOfPlayers'),
  leaderCut: document.querySelector('#leaderCut'),
  member1Cut: document.querySelector('#member1Cut'),
  member2Cut: document.querySelector('#member2Cut'),
  member3Cut: document.querySelector('#member3Cut'),
};
Object.entries(htmlElements).forEach(([setting, elementHTML]) => {
  elementHTML.value = JSON.parse(Settings[setting]);
});
document.querySelector('#languageSwitch').value = Settings.languageSwitch;
document.querySelector('#infoDisplay').value = Settings.infoDisplay;
document.querySelector('#isHardMode').value = Settings.isHardMode;
document.querySelector('#isWithinCooldown').value = Settings.isWithinCooldown;
document.querySelector('#goldAlone').value = Settings.goldAlone;
document.querySelector('#primaryTarget').value = Settings.primaryTarget;
let bags = {};

const Counter = {
  targetsData: {},
  secondaryTargetsOrder: [],

  init: function() {
    return Loader.promises['targets'].execute(data => {
      Counter.targetsData = data;
      Counter.targetsData.targets.secondary.forEach(({ name, value, weight }) => {
        const profit = getAverage(value.min, value.max) / weight;
        Counter.secondaryTargetsOrder.push({ name, bagProfit: profit });
      });
      Counter.getLoot();
    });
  },
  getLoot: function() {
	updateLanguage(Settings.languageSwitch);
    const amounts = [];
    let bagsFill = 0;
    let emptySpace = Settings.amountOfPlayers;
    let totalMinValue = 0;
    let totalAvgValue = 0;
    let totalMaxValue = 0;
    const isHardMode = Settings.isHardMode ? 'hard' : 'standard';
    const withinCooldownSecondaryBonus = Settings.isWithinCooldown ?
      Counter.targetsData.targets.primary.find(({ name }) => name === Settings.primaryTarget).bonus_multiplier : 1;
    const players = Settings.amountOfPlayers;

    Counter.secondaryTargetsOrder.forEach(element => {
      if (emptySpace < 0.1) return;
      emptySpace = players - bagsFill;
      const obj = Counter.targetsData.targets.secondary.find(object => object.name === element.name);
      if (!Settings.goldAlone && +players === 1 && obj.name === 'gold') return;
      if (obj.name === 'paintings' && emptySpace < 0.5) return;
      const maxFill = (() => {
        let tempAmount = Settings[obj.name];
        if (obj.name === 'paintings') {
          while (tempAmount * obj.weight > emptySpace) {
            tempAmount--;
          }
        }
        return tempAmount * obj.weight;
      })();
      let realFill = maxFill >= players ? players : maxFill;
      bagsFill += +realFill;
      realFill = realFill > emptySpace ? emptySpace : realFill;
      if (realFill < 0.1) return;
      const clicks = (() => {
        const rest = Number((realFill / obj.weight - Math.floor(realFill / obj.weight)).toFixed(3));
        let value = Math.floor(realFill / obj.weight) * obj.pickup_steps.length + findClosestValue(rest % 1 * 100, obj.pickup_steps);
        if (value % 10 !== 0 && (['cocaine', 'cash'].includes(obj.name) || ['weed'].includes(obj.name) && players > 1)) {
          value += 1;
        }
        return obj.name === 'paintings' ? `${value * 4} ${langCayoPerico[Settings.languageSwitch].order_cuts}` : `${value} ${langCayoPerico[Settings.languageSwitch].order_clicks}`;
      })();

      amounts.push({ name: obj.name, amount: realFill, clicks: clicks });
	  
      totalMinValue += realFill * (obj.value.min * withinCooldownSecondaryBonus / obj.weight);
      totalAvgValue += realFill * (getAverage(obj.value.min, obj.value.max) * withinCooldownSecondaryBonus / obj.weight);
      totalMaxValue += realFill * (obj.value.max * withinCooldownSecondaryBonus / obj.weight);
    });
    const finalMinValue = totalMinValue + Counter.targetsData.targets.primary.find(({ name }) =>
      name === Settings.primaryTarget).value[isHardMode];
    const finalAvgValue = totalAvgValue + Counter.targetsData.targets.primary.find(({ name }) =>
      name === Settings.primaryTarget).value[isHardMode];
    const finalMaxValue = totalMaxValue + Counter.targetsData.targets.primary.find(({ name }) =>
      name === Settings.primaryTarget).value[isHardMode];

    Counter.updateWebsite(amounts, finalMinValue, finalAvgValue, finalMaxValue, withinCooldownSecondaryBonus);
  },
  updateWebsite: function(amounts, totalMinValue, totalAvgValue, totalMaxValue, withinCooldownSecondaryBonus) {

    document.querySelectorAll('.big').forEach(e => {
      e.parentElement.classList.add('hidden');
    });
    const officeSafe = Counter.targetsData.targets.office_safe;
	const eliteChallenge = Counter.targetsData.elite_challenge[Settings.isHardMode ? 'hard' : 'standard'];
	const inputs = document.querySelectorAll('.cuts input');
		
	switch ($("#infoDisplay").val()) {
		case 'min':
		    totalMinValue *= Counter.targetsData.events_multiplier;
			const fencingMinFee = totalMinValue * 0.1;
			const pavelMinFee = totalMinValue * 0.02;
			const finalMinValue = totalMinValue - fencingMinFee - pavelMinFee;
			document.querySelector('#fencing-fee').innerText = "$"+Math.round(fencingMinFee).toLocaleString();
			document.querySelector('#pavel-fee').innerText = "$"+Math.round(pavelMinFee).toLocaleString();
			document.querySelector('#fin-loot-value').innerText = Math.round(finalMinValue).toLocaleString();

			Counter.targetsData.targets.secondary.forEach(({ name, value: { min, max } }) => {
			  document.querySelector(`#${name}-stacks-value`).innerText = '$' + Math.round(min * withinCooldownSecondaryBonus).toLocaleString();
			});
			Counter.targetsData.targets.secondary.forEach(({ name, weight, value: { min, max } }) => {
			  document.querySelector(`#${name}-bags-value`).innerText = '$' + Math.round(min / weight).toLocaleString();
			});
			
			[...inputs].forEach(element => {
			  element.nextElementSibling.innerText = 
				Math.round(finalMinValue * Settings[element.id] / 100).toLocaleString();
			});

			
			bags = {
			  profit: Math.round(finalMinValue),
			};
			
			$("#office-safe").parent().hide();
			$("#elite-challenge").parent().hide();
		break;
		case 'avg':
			totalAvgValue *= Counter.targetsData.events_multiplier;
			const fencingAvgFee = totalAvgValue * 0.1;
			const pavelAvgFee = totalAvgValue * 0.02;
			const finalAvgValue = totalAvgValue - fencingAvgFee - pavelAvgFee + getAverage(officeSafe.min, officeSafe.max);
			document.querySelector('#fencing-fee').innerText = "$"+Math.round(fencingAvgFee).toLocaleString();
			document.querySelector('#pavel-fee').innerText = "$"+Math.round(pavelAvgFee).toLocaleString();
			document.querySelector('#office-safe').innerText = `$${getAverage(officeSafe.min, officeSafe.max).toLocaleString()}`;
			document.querySelector('#fin-loot-value').innerText = Math.round(finalAvgValue).toLocaleString();

			Counter.targetsData.targets.secondary.forEach(({ name, value: { min, max } }) => {
			  document.querySelector(`#${name}-stacks-value`).innerText = '$' + Math.round((min + max) * withinCooldownSecondaryBonus / 2).toLocaleString();
			});
			Counter.targetsData.targets.secondary.forEach(({ name, weight, value: { min, max } }) => {
			  const avg = (min + max) * withinCooldownSecondaryBonus / 2;
			  document.querySelector(`#${name}-bags-value`).innerText = '$' + Math.round(avg / weight).toLocaleString();
			});
			
			[...inputs].forEach(element => {
			  element.nextElementSibling.innerText = 
				Math.round(finalAvgValue * Settings[element.id] / 100).toLocaleString();
			});
			
			bags = {
			  profit: Math.round(finalAvgValue),
			};
			
			$("#office-safe").parent().show();
			$("#elite-challenge").parent().hide();
		break;
		case 'max':
			totalMaxValue *= Counter.targetsData.events_multiplier;
			const fencingMaxFee = totalMaxValue * 0.1;
			const pavelMaxFee = totalMaxValue * 0.02;
			const finalMaxValue = totalMaxValue - fencingMaxFee - pavelMaxFee + officeSafe.max + eliteChallenge * Settings.amountOfPlayers;
			document.querySelector('#fencing-fee').innerText = "$"+Math.round(fencingMaxFee).toLocaleString();
			document.querySelector('#pavel-fee').innerText = "$"+Math.round(pavelMaxFee).toLocaleString();
			document.querySelector('#office-safe').innerText = `$${officeSafe.max.toLocaleString()}`;
			document.querySelector('#elite-challenge').innerText = Math.round(eliteChallenge).toLocaleString();
			document.querySelector('#fin-loot-value').innerText = Math.round(finalMaxValue).toLocaleString();

			Counter.targetsData.targets.secondary.forEach(({ name, value: { min, max } }) => {
			  document.querySelector(`#${name}-stacks-value`).innerText = '$' + Math.round(max * withinCooldownSecondaryBonus).toLocaleString();
			});
			Counter.targetsData.targets.secondary.forEach(({ name, weight, value: { min, max } }) => {
			  document.querySelector(`#${name}-bags-value`).innerText = '$' + Math.round(max / weight).toLocaleString();
			});
			
			[...inputs].forEach(element => {
			  element.nextElementSibling.innerText = 
				Math.round(finalMaxValue * Settings[element.id] / 100).toLocaleString();
			});
			
			bags = {
			  profit: Math.round(finalMaxValue),
			};
			
			$("#office-safe").parent().show();
			$("#elite-challenge").parent().show();
		break;
	}
				Counter.targetsData.targets.secondary.forEach(({ name, bag_capacity_steps: bagCapacity }) => {
			  document.querySelector(`#${name}-bag-percent`).innerText = rounding([...bagCapacity].pop());
			});


    amounts.forEach(object => {
      const amount = rounding(Number(object.amount));
      const element = document.querySelector(`#${object.name}-bag`);
      if (amount !== 0) {
        element.innerHTML = `${amount} <span>${langCayoPerico[Settings.languageSwitch]["sele_" + object.name] + langCayoPerico[Settings.languageSwitch].order_bags} - ${object.clicks}</span>`;
        element.parentElement.classList.remove('hidden');
      }
      bags[object.name] = [Number(amount), Number(object.clicks.replace(/clicks|cuts/g, '')), Number(htmlElements[object.name].value)];
    });

    document.querySelector('#bags_fill').innerText = amounts.reduce((acc, obj) => acc + +rounding(+obj.amount), 0).toFixed(2);
  },
  activateHandlers: function() {

    document.querySelector('#languageSwitch').addEventListener('change', () => {
      Settings.languageSwitch = languageSwitch.value; // string
    });

    document.querySelector('#infoDisplay').addEventListener('change', () => {
      Settings.infoDisplay = infoDisplay.value; // string
    });

    document.querySelector('#isHardMode').addEventListener('change', () => {
      Settings.isHardMode = JSON.parse(isHardMode.value); // boolean
    });

    document.querySelector('#isWithinCooldown').addEventListener('change', () => {
      Settings.isWithinCooldown = JSON.parse(isWithinCooldown.value); // boolean
    });

    document.querySelector('#goldAlone').addEventListener('change', () => {
      Settings.goldAlone = JSON.parse(goldAlone.value); // boolean
    });

    document.querySelector('#primaryTarget').addEventListener('change', () => {
      Settings.primaryTarget = primaryTarget.value; // string
    });
	
    Object.values(htmlElements).forEach(element => {
      element.addEventListener('change', event => {
        Settings[event.currentTarget.id] = +event.target.value;
      });
    });

    document.querySelector('#link-settings').addEventListener('click', () => {
      if (window.event.ctrlKey) {
        const json = JSON.stringify({
          lang: Settings.languageSwitch,
          hard: Settings.isHardMode,
          withinCooldown: Settings.isWithinCooldown,
          target: Settings.primaryTarget,
          players: Settings.amountOfPlayers,
          info: Settings.infoDisplay,
          ...bags,
        });
        setClipboardText(`$loot ${json}`);
        return;
      }

      setClipboardText(SearchQuery.getUrl());
      alert('Link has been copied to clipboard!');
    });

    document.querySelector('#reset-settings').addEventListener('click', () => {
      document.querySelector('#languageSwitch').value = 'en_US';
      document.querySelector('#isHardMode').value = false;
      document.querySelector('#isWithinCooldown').value = false;
      document.querySelector('#primaryTarget').value = 'tequila';
      document.querySelector('#amountOfPlayers').value = 2;
      Settings.primaryTarget = 'tequila';
      ['gold', 'weed', 'cash', 'cocaine', 'paintings'].forEach(target => {
        Settings[target] = 0;
        htmlElements[target].value = 0;
      });
    });

    SettingProxy.addListener(Settings, 'languageSwitch infoDisplay gold weed cash cocaine paintings primaryTarget isHardMode isWithinCooldown goldAlone leaderCut member1Cut member2Cut member3Cut', Counter.getLoot);
    SettingProxy.addListener(Settings, 'amountOfPlayers', () => {
      document.querySelector('#goldAlone').parentElement.classList.toggle('hidden', Settings.amountOfPlayers !== 1);
      const inputs = document.querySelectorAll('.cuts input');
      [...inputs].forEach((element, index) => {
        element.parentElement.classList.toggle('hidden', Settings.amountOfPlayers <= index);
      });
      Counter.getLoot();
    })();
  },
};

const findError = callback => (...args) => callback(args).catch(console.log);

document.addEventListener('DOMContentLoaded', () => {
  try {
    Counter.init()
      .then(Counter.activateHandlers)
      .then(Loader.resolveContentLoaded);
  } catch (error) {
    console.log(error);
    alert(error);
  }
});

function rounding(value) {
  return (Math.round(value * 20) * 0.05).toFixed(2);
}

function getAverage(...args) {
  return args.reduce((acc, val) => acc + val, 0) / args.length;
}

function findClosestValue(value, array) {
  if (value === 0) return 0;
  return array
    .map(element => Math.abs(value - element))
    .reduce((acc, el, index, arr) => el < arr[acc] ? index : acc, 0) + 1;
}













// $("#infoDisplay").on('change', function(){
	// Counter.getLoot();
	// $('#amountOfPlayers')[0].dispatchEvent(eventChange);
// });

$("#amountOfPlayers").on('change', function(){
	var i = $(this).val();
	var maxCut = 100;
	var counts = 4;
	var minCut = 15;
	
	switch (i) {
		case "1":
			$(".custom-input-narrow input").attr('min', maxCut);
			$(".custom-input-narrow input").attr('max', maxCut);
			$("#leaderCut").val(maxCut);
			$("#leaderCut").attr("value", maxCut);
		break;
		case "2":
			$(".custom-input-narrow input").attr('min', minCut);
			$(".custom-input-narrow input").attr('max', maxCut - minCut * 1);
		break;
		case "3":
			$(".custom-input-narrow input").attr('min', minCut);
			$(".custom-input-narrow input").attr('max', maxCut - minCut * 2);
		break;
		case "4":
			$(".custom-input-narrow input").attr('min', minCut);
			$(".custom-input-narrow input").attr('max', maxCut - minCut * 3);
		break;
	}
	setTimeout(function(){
		$(".custom-input-narrow b").removeClass("dimmed");
		$(".custom-input-narrow").attr('isEnabled', "true");
		$(".custom-input-narrow input").prop('enabled');
			$(".custom-input-narrow:not(.hidden):last").attr('isEnabled', "false");
			$(".custom-input-narrow:not(.hidden):last input").prop('disabled', 'true');
			$(".custom-input-narrow:not(.hidden):last b").addClass("dimmed");
	}, 50);
});

$(".cutsGain").on('click', function name(params) {
	if ($(this).parent().attr('isEnabled') === "true") {
		var obj = $(this).parent().find("input");
		var oldValue = parseInt(obj.attr("value"));
		var newValue = Math.min(oldValue + 5, 100);
		obj.val(newValue);
		obj.attr("value", newValue);
		// obj[0].dispatchEvent(new Event('change'));
		updateValues();
	}
});

$(".cutsLoss").on('click', function name(params) {
	if ($(this).parent().attr('isEnabled') === "true") {
		var obj = $(this).parent().find("input");
		var oldValue = parseInt(obj.attr("value"));
		var newValue = Math.max(oldValue - 5, 15);
		obj.val(newValue);
		obj.attr("value", newValue);
		// obj[0].dispatchEvent(new Event('change'));
		updateValues();
	}
});

function updateValues() {
	var i = $("#amountOfPlayers").val();
	var maxCut = 100;
	var counts = 4;
	var minCut = 15;
	
	var leader = $($(".custom-input-narrow input")[0]);
	var mb1 = $($(".custom-input-narrow input")[1]);
	var mb2 = $($(".custom-input-narrow input")[2]);
	var mb3 = $($(".custom-input-narrow input")[3]);
	
	switch (i) {
		case "2":
			if (leader.val() > maxCut - minCut * 1) {
				leader.attr("value", maxCut - minCut * 1);
				leader.val(maxCut - minCut * 1);
			}
			mb1.val(
				Math.min(Math.max(minCut, maxCut - leader.val()), maxCut)
			);
			mb1.attr("value", 
				Math.min(Math.max(minCut, maxCut - leader.val()), maxCut)
			);
		break;
		case "3":
			leaderVal = Math.min(Math.max(15, leader.val()), 70);
			mb1Val = Math.max(15, Math.min(mb1.val(), 85 - leaderVal));
			mb2Val = Math.max(15, 100 - (leaderVal + mb1Val));
			mb1Val = 100 - (leaderVal + mb2Val);
			
			leader.attr("value", leaderVal);
			leader.val(leaderVal);
			mb1.attr("value", mb1Val);
			mb1.val(mb1Val);
			mb2.attr("value", mb2Val);
			mb2.val(mb2Val);
		break;
		case "4":
			leaderVal = Math.min(Math.max(15, leader.val()), 55);
			mb1Val = Math.max(15, Math.min(mb1.val(), 70 - leaderVal));
			mb2Val = Math.max(15, Math.min(mb2.val(), 85 - mb1Val));
			mb3Val = 100 - (leaderVal + mb1Val + mb2Val); // Ensure total is exactly 100%

			// If mb3Val < 15, adjust mb2Val to keep minimum limits
			if (mb3Val < 15) {
				mb2Val = Math.max(15, 100 - (leaderVal + mb1Val + 15));
				mb3Val = 100 - (leaderVal + mb1Val + mb2Val);
			}
			
			leader.attr("value", leaderVal);
			leader.val(leaderVal);
			mb1.attr("value", mb1Val);
			mb1.val(mb1Val);
			mb2.attr("value", mb2Val);
			mb2.val(mb2Val);
			mb3.attr("value", mb3Val);
			mb3.val(mb3Val);
		break;
	}
	
	$(".custom-input-narrow input")[0].dispatchEvent(new Event('change'));
	$(".custom-input-narrow input")[1].dispatchEvent(new Event('change'));
	$(".custom-input-narrow input")[2].dispatchEvent(new Event('change'));
	$(".custom-input-narrow input")[3].dispatchEvent(new Event('change'));

}

$(".custom-input-narrow input").on('change', function(){
});

setTimeout(function(){
	$("#amountOfPlayers")[0].dispatchEvent(new Event('change'));
	$('#gold')[0].dispatchEvent(new Event('change'));
}, 50);