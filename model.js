export const defaults={service:{volume:6500,minutes:12,labour:48,efficiency:30,agentShare:25,resolution:75,pricingModel:0,conversationRate:2.8,conversationsPerTicket:1,actionsPerInteraction:3,creditsPerAction:20,creditPackPrice:700,creditsPerPack:100000,aiUsers:5,employeeRate:175,userRate:7,employeeInteractions:1000,monthlyCost:1800,implementation:12000,ramp:2,realisation:20},sales:{pricingModel:2,conversationRate:2.8,conversationsPerTicket:1,actionsPerInteraction:3,creditsPerAction:20,creditPackPrice:700,creditsPerPack:100000,aiUsers:12,employeeRate:175,userRate:7,employeeInteractions:1000,reps:12,hours:10,labour:65,efficiency:30,leads:240,conversion:18,uplift:3,deal:8500,margin:65,monthlyCost:2400,implementation:15000,ramp:2,realisation:0}};
export function calculate(product,v,scenario='base'){
 const factor={conservative:.65,base:1,optimistic:1.25}[scenario]??1;
 let hours=0,revenue=0,baseline=0,offered=0,resolved=0;
 if(product==='service'){
  offered=v.volume*Math.min(100,v.agentShare*factor)/100;
  const autonomous=offered*v.resolution/100;
  resolved=autonomous;
  const assisted=v.volume-autonomous;
  hours=autonomous*v.minutes/60+assisted*v.minutes/60*Math.min(100,v.efficiency*factor)/100;

  baseline=v.volume*v.minutes/60*v.labour;
 }else{
  hours=v.reps*v.hours*52/12*Math.min(100,v.efficiency*factor)/100;
  revenue=v.leads*Math.min(v.uplift*factor,100-v.conversion)/100*v.deal;
  baseline=v.reps*v.hours*52/12*v.labour;
 }
 const interactions=product==='service'?offered*v.conversationsPerTicket:v.employeeInteractions;
 const actions=interactions*v.actionsPerInteraction;
 const credits=actions*v.creditsPerAction;
 const flexCost=v.creditsPerPack>0?credits*v.creditPackPrice/v.creditsPerPack:0;
 const consumption=v.pricingModel===0?interactions*v.conversationRate:[1,3,4].includes(v.pricingModel)?flexCost:0;
 const aiLicence=v.pricingModel===2?v.aiUsers*v.employeeRate:v.pricingModel===3?v.aiUsers*v.userRate:0;
 const fixedCost=v.monthlyCost+aiLicence;
 const aiCost=consumption+aiLicence;
 const escalated=offered-resolved;
 const costPerResolution=resolved>0?aiCost/resolved:null;
 const humanCostPerTicket=product==='service'?v.minutes/60*v.labour:null;
 const capacity=hours*v.labour;
 const cash=capacity*v.realisation/100;
 const profit=revenue*(v.margin||0)/100;
 const benefit=cash+profit;
 const recurring=fixedCost+consumption;
 const net=benefit-recurring;
 const activeMonths=Math.max(0,12-v.ramp);
 const yearNet=net*activeMonths-fixedCost*v.ramp-v.implementation;
 const payback=net>0?v.ramp+(v.implementation+fixedCost*v.ramp)/net:null;
 return {interactions,actions,credits,aiLicence,aiCost,fixedCost,offered,resolved,escalated,costPerResolution,humanCostPerTicket,hours,revenue,consumption,baseline,capacity,cash,profit,benefit,recurring,net,yearNet,payback,delay:Math.max(0,net)*3};
}
