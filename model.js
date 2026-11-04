export const defaults={service:{activityBasis:1,serviceReps:8,workingDays:21,crmUpdates:12,recordLookups:15,workflowActions:5,aiActivityShare:50,includeBaseline:1,includeImprovement:1,includeAI:1,includeInvestment:1,suitePlan:0,suiteUsers:8,suiteRate:35,volume:6500,minutes:12,labour:48,efficiency:30,agentShare:25,resolution:75,pricingModel:1,conversationRate:2.8,conversationsPerTicket:1,actionsPerInteraction:3,creditsPerAction:20,creditPackPrice:700,creditsPerPack:100000,aiUsers:5,employeeRate:175,userRate:7,employeeInteractions:1000,monthlyCost:1800,implementation:12000,ramp:2,realisation:20},sales:{activityBasis:1,serviceReps:8,workingDays:21,crmUpdates:10,recordLookups:8,workflowActions:4,aiActivityShare:50,includeBaseline:1,includeImprovement:1,includeAI:1,includeInvestment:1,suitePlan:0,suiteUsers:12,suiteRate:35,pricingModel:1,conversationRate:2.8,conversationsPerTicket:1,actionsPerInteraction:3,creditsPerAction:20,creditPackPrice:700,creditsPerPack:100000,aiUsers:12,employeeRate:175,userRate:7,employeeInteractions:1000,reps:12,hours:10,labour:65,efficiency:30,leads:240,conversion:18,uplift:3,deal:8500,margin:65,monthlyCost:2400,implementation:15000,ramp:2,realisation:0}};
export function calculate(product,v,scenario='base'){
 const baselineOn=v.includeBaseline!==0,improvementOn=v.includeImprovement!==0,aiOn=v.includeAI!==0,investmentOn=v.includeInvestment!==0;
 const factor={conservative:.65,base:1,optimistic:1.25}[scenario]??1;
 let hours=0,revenue=0,baseline=0,offered=0,resolved=0;
 if(product==='service'){
  offered=(baselineOn&&improvementOn&&aiOn?v.volume:0)*Math.min(100,v.agentShare*factor)/100;
  const autonomous=offered*v.resolution/100;
  resolved=autonomous;
  const assisted=(baselineOn?v.volume:0)-autonomous;
  hours=autonomous*v.minutes/60+assisted*v.minutes/60*Math.min(100,(improvementOn?v.efficiency:0)*factor)/100;

  baseline=baselineOn?v.volume*v.minutes/60*v.labour:0;
 }else{
  hours=(baselineOn?v.reps:0)*v.hours*52/12*Math.min(100,(improvementOn?v.efficiency:0)*factor)/100;
  revenue=(baselineOn&&improvementOn?v.leads:0)*Math.min(v.uplift*factor,100-v.conversion)/100*v.deal;
  baseline=baselineOn?v.reps*v.hours*52/12*v.labour:0;
 }
 const interactions=product==='service'?offered*v.conversationsPerTicket:v.employeeInteractions;
 const dailyActions=(v.crmUpdates||0)+(v.recordLookups||0)+(v.workflowActions||0);
 const activityActions=(product==='sales'?v.reps:v.serviceReps)*v.workingDays*dailyActions*v.aiActivityShare/100;
 const actions=aiOn?(v.activityBasis===1?activityActions:interactions*v.actionsPerInteraction):0;
 const credits=actions*v.creditsPerAction;
 const flexCost=v.creditsPerPack>0?credits*v.creditPackPrice/v.creditsPerPack:0;
 const consumption=!aiOn?0:v.pricingModel===0?interactions*v.conversationRate:[1,3,4].includes(v.pricingModel)?flexCost:0;
 const aiLicence=!aiOn?0:v.pricingModel===2?v.aiUsers*v.employeeRate:v.pricingModel===3?v.aiUsers*v.userRate:0;
 const coreCost=investmentOn?(v.suitePlan===1||v.suitePlan===2?v.suiteUsers*v.suiteRate:v.monthlyCost):0;
 const implementation=investmentOn?v.implementation:0;
 const ramp=investmentOn?v.ramp:0;
 const fixedCost=coreCost+aiLicence;
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
 const activeMonths=Math.max(0,12-ramp);
 const yearNet=net*activeMonths-fixedCost*ramp-implementation;
 const payback=net>0?ramp+(implementation+fixedCost*ramp)/net:null;
 return {coreCost,implementation,ramp,dailyActions,activityActions,interactions,actions,credits,aiLicence,aiCost,fixedCost,offered,resolved,escalated,costPerResolution,humanCostPerTicket,hours,revenue,consumption,baseline,capacity,cash,profit,benefit,recurring,net,yearNet,payback,delay:Math.max(0,net)*3};
}
