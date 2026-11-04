export const defaults={service:{volume:6500,minutes:12,labour:48,efficiency:30,agentShare:25,resolution:75,unitCost:2,monthlyCost:1800,implementation:12000,ramp:2,realisation:20},sales:{reps:12,hours:10,labour:65,efficiency:30,leads:240,conversion:18,uplift:3,deal:8500,margin:65,monthlyCost:2400,implementation:15000,ramp:2,realisation:0}};
export function calculate(product,v,scenario='base'){
 const factor={conservative:.65,base:1,optimistic:1.25}[scenario]??1;
 let hours=0,revenue=0,consumption=0,baseline=0;
 if(product==='service'){
  const autonomous=v.volume*Math.min(100,v.agentShare*factor)/100*v.resolution/100;
  const assisted=v.volume-autonomous;
  hours=autonomous*v.minutes/60+assisted*v.minutes/60*Math.min(100,v.efficiency*factor)/100;
  consumption=autonomous*v.unitCost;
  baseline=v.volume*v.minutes/60*v.labour;
 }else{
  hours=v.reps*v.hours*52/12*Math.min(100,v.efficiency*factor)/100;
  revenue=v.leads*Math.min(v.uplift*factor,100-v.conversion)/100*v.deal;
  baseline=v.reps*v.hours*52/12*v.labour;
 }
 const capacity=hours*v.labour;
 const cash=capacity*v.realisation/100;
 const profit=revenue*(v.margin||0)/100;
 const benefit=cash+profit;
 const recurring=v.monthlyCost+consumption;
 const net=benefit-recurring;
 const activeMonths=Math.max(0,12-v.ramp);
 const yearNet=net*activeMonths-v.monthlyCost*v.ramp-v.implementation;
 const payback=net>0?v.ramp+(v.implementation+v.monthlyCost*v.ramp)/net:null;
 return {hours,revenue,consumption,baseline,capacity,cash,profit,benefit,recurring,net,yearNet,payback,delay:Math.max(0,net)*3};
}
