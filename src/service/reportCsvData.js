module.exports = (role, head, solutionName, time, chartOption) => {
  let i = 0, csv = [], row;
  const len = time.length;
  const show = chartOption.series[0].data, 
        click = chartOption.series[1].data,
        money = chartOption.series[2].data, 
        service = role == 'agency'? chartOption.series[3].data : null;
  if(role == 'agency')
    head.push('服务费');  
  csv.push(head)
  for(;i<len;i++){
    row = [];
    row = [time[i], solutionName, show[i], click[i], money[i]];
    if(service){
      row.push(service[i]);
    }
    csv.push(row)
  }
  return csv;
}