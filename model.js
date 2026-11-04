export const defaults={service:{includeInternal:1,internalModel:0,coworkerUsdRate:50,audPerUsd:1.5,internalExtraUsage:0,activityBasis:1,serviceReps:8,workingDays:21,crmUpdates:12,recordLookups:15,workflowActions:5,aiActivityShare:50,includeBaseline:1,includeImprovement:1,includeAI:1,includeInvestment:1,suitePlan:0,suiteUsers:8,suiteRate:35,volume:6500,minutes:12,labour:48,efficiency:30,agentShare:25,resolution:75,pricingModel:1,conversationRate:2.8,conversationsPerTicket:1,actionsPerInteraction:3,creditsPerAction:20,creditPackPrice:700,creditsPerPack:100000,aiUsers:5,employeeRate:175,userRate:7,employeeInteractions:1000,monthlyCost:1800,implementation:12000,ramp:2,realisation:20},sales:{activityBasis:1,serviceReps:8,workingDays:21,crmUpdates:10,recordLookups:8,workflowActions:4,aiActivityShare:50,includeBaseline:1,includeImprovement:1,includeAI:1,includeInvestment:1,suitePlan:0,suiteUsers:12,suiteRate:35,pricingModel:1,conversationRate:2.8,conversationsPerTicket:1,actionsPerInteraction:3,creditsPerAction:20,creditPackPrice:700,creditsPerPack:100000,aiUsers:12,employeeRate:175,userRate:7,employeeInteractions:1000,reps:12,hours:10,labour:65,efficiency:30,leads:240,conversion:18,uplift:3,deal:8500,margin:65,monthlyCost:2400,implementation:15000,ramp:2,realisation:0}};
export function calculate(product,v,scenario='base'){
 const baselineOn=v.includeBaseline!==0,improvementOn=v.includeImprovement!==0,aiOn=v.includeAI!==0,investmentOn=v.includeInvestment!==0;
 const factor={conservative:.65,base:1,optimistic:1.25}[scenario]??1;
 let hours=0,revenue=0,baseline=0,offered=0,resolved=0;
 if(product==='service'){
  offered=(baselineOn&&aiOn?v.volume:0)*Math.min(100,v.agentShare*factor)/100;
  const autonomous=improvementOn?offered*v.resolution/100:0;
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
 let actions=aiOn?(v.activityBasis===1?activityActions:interactions*v.actionsPerInteraction):0;
 let credits=actions*v.creditsPerAction;
 const flexCost=v.creditsPerPack>0?credits*v.creditPackPrice/v.creditsPerPack:0;
 let consumption=!aiOn?0:v.pricingModel===0?interactions*v.conversationRate:[1,3,4].includes(v.pricingModel)?flexCost:0;
 let aiLicence=!aiOn?0:v.pricingModel===2?v.aiUsers*v.employeeRate:v.pricingModel===3?v.aiUsers*v.userRate:0;
 let customerCost=0,internalLicence=0,internalUsage=0,internalActions=0,internalCredits=0;
 if(product==='service'){
  customerCost=aiOn?interactions*v.conversationRate:0;
  const internalOn=v.includeInternal!==0;
  internalActions=internalOn&&v.internalModel===0?activityActions:0;
  internalCredits=internalActions*v.creditsPerAction;
  internalLicence=!internalOn?0:v.internalModel===1?v.aiUsers*v.employeeRate:v.internalModel===2?v.aiUsers*v.coworkerUsdRate*v.audPerUsd:v.aiUsers*v.userRate;
  internalUsage=!internalOn?0:v.internalModel===0?(v.creditsPerPack>0?internalCredits*v.creditPackPrice/v.creditsPerPack:0):v.internalExtraUsage;
  actions=internalActions;credits=internalCredits;
  aiLicence=internalLicence;consumption=customerCost+internalUsage;
 }
 const coreCost=investmentOn?(v.suitePlan===1||v.suitePlan===2?v.suiteUsers*v.suiteRate:v.monthlyCost):0;
 const implementation=investmentOn?v.implementation:0;
 const ramp=investmentOn?v.ramp:0;
 const fixedCost=coreCost+aiLicence;
 const aiCost=consumption+aiLicence;
 const escalated=offered-resolved;
 const costPerResolution=resolved>0?(product==='service'?customerCost:aiCost)/resolved:null;
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
 return {customerCost,internalLicence,internalUsage,internalActions,internalCredits,coreCost,implementation,ramp,dailyActions,activityActions,interactions,actions,credits,aiLicence,aiCost,fixedCost,offered,resolved,escalated,costPerResolution,humanCostPerTicket,hours,revenue,consumption,baseline,capacity,cash,profit,benefit,recurring,net,yearNet,payback,delay:Math.max(0,net)*3};
}

// One commercial investment, two independently measured value streams.
export const sharedDefaults={includeSuite:1,suitePlan:1,suiteUsers:20,suiteRate:35,monthlyCost:1800,implementation:15000,ramp:2,includeCustomer:1,conversationRate:2.8,includeInternal:1,internalModel:0,aiUsers:20,userRate:7,employeeRate:175,coworkerUsdRate:50,audPerUsd:1.5,internalExtraUsage:0,creditsPerAction:20,creditPackPrice:700,creditsPerPack:100000,includeSales:1,includeService:1,allocationMethod:0,salesAllocation:60,overlapBenefit:0,overlapHours:0,overlapReviewed:0};
export function calculateCase(values,s,scenario='base'){
 const enabled={sales:s.includeSales!==0,service:s.includeService!==0};
 const streams={};
 for(const p of ['sales','service']){
  const v={...values[p],includeInvestment:0,includeInternal:0,includeAI:p==='service'&&s.includeCustomer!==0?1:0,conversationRate:s.conversationRate};
  const r=calculate(p,v,scenario);
  streams[p]=enabled[p]?r:{...r,hours:0,capacity:0,cash:0,profit:0,benefit:0,revenue:0,customerCost:0,offered:0,resolved:0,interactions:0,activityActions:0};
 }
 const rawBenefit=streams.sales.benefit+streams.service.benefit;
 const overlapBenefit=Math.min(rawBenefit,s.overlapBenefit);
 const hours=Math.max(0,streams.sales.hours+streams.service.hours-s.overlapHours);
 const benefit=rawBenefit-overlapBenefit;
 const customerCost=streams.service.customerCost;
 const actions=s.includeInternal!==0&&s.internalModel===0?streams.sales.activityActions+streams.service.activityActions:0;
 const credits=actions*s.creditsPerAction;
 const internalUsage=s.includeInternal===0?0:s.internalModel===0?(s.creditsPerPack>0?credits*s.creditPackPrice/s.creditsPerPack:0):s.internalExtraUsage;
 const internalLicence=s.includeInternal===0?0:s.aiUsers*(s.internalModel===1?s.employeeRate:s.internalModel===2?s.coworkerUsdRate*s.audPerUsd:s.userRate);
 const coreCost=s.includeSuite===0?0:s.suitePlan===0?s.monthlyCost:s.suiteUsers*s.suiteRate;
 const implementation=s.includeSuite===0?0:s.implementation;
 const ramp=s.includeSuite===0?0:s.ramp;
 const fixedCost=coreCost+internalLicence;
 const usage=customerCost+internalUsage;
 const recurring=fixedCost+usage;
 const net=benefit-recurring;
 const yearNet=net*Math.max(0,12-ramp)-fixedCost*ramp-implementation;
 const payback=net>0?ramp+(implementation+fixedCost*ramp)/net:null;
 let salesShare=0;
 if(enabled.sales&&!enabled.service)salesShare=1;
 else if(enabled.sales&&enabled.service){const headcount=values.sales.reps+values.service.serviceReps;salesShare=s.allocationMethod===1?s.salesAllocation/100:headcount>0?values.sales.reps/headcount:.5;}
 const shares={sales:salesShare,service:enabled.service?1-salesShare:0};
 for(const p of ['sales','service']){
  const r=streams[p];r.allocatedCost=recurring*shares[p];
  r.overlapAdjustment=rawBenefit>0?overlapBenefit*r.benefit/rawBenefit:0;
  r.adjustedBenefit=r.benefit-r.overlapAdjustment;
  r.allocatedNet=r.adjustedBenefit-r.allocatedCost;
  r.share=shares[p];
 }
 return {streams,enabled,rawBenefit,overlapBenefit,hours,benefit,customerCost,actions,credits,internalUsage,internalLicence,coreCost,implementation,ramp,fixedCost,usage,recurring,net,yearNet,payback,delay:Math.max(0,net)*3};
}
