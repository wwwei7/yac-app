const browser_version = (function(){
    let ua=navigator.userAgent,
        tem,
        M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
        return {name:'IE',version:(tem[1]||'')};
        }   
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR|Edge\/(\d+)/)
        if(tem!=null)   {return {name:'Opera', version:tem[1]};}
        }   
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return {
      name: M[0],
      version: M[1]
    };
})();

const createURL = function(text){
  var BOM = "\uFEFF";
  // Add BOM to text for open in excel correctly
  if (window.Blob && window.URL && window.URL.createObjectURL) {
    var csvData = new Blob([BOM + text], { type: 'text/csv' });
    return URL.createObjectURL(csvData);
  } else {
    return 'data:attachment/csv;charset=utf-8,' + BOM + encodeURIComponent(text);
  }
}

module.exports  = function(data, filename){
  let csvContent = '', dataString;
  data.forEach(function(infoArray, index){

    dataString = infoArray.join(",");
    csvContent += index < data.length ? dataString+ "\n" : dataString;

  });

  if(browser_version.name=='IE' && browser_version<10){
    let oWin = window.top.open("about:blank", "_blank");
    oWin.document.write('sep=,\r\n' + csvContent);
    oWin.document.close();
    oWin.document.execCommand('SaveAs', true, filename);
    oWin.close();
  }else if(browser_version.name == 'IE' && browser_version>9){
    navigator.msSaveBlob(createURL(csvContent), filename);
  }else{
    let link = document.createElement("a");
    link.setAttribute("href", createURL(csvContent));
    link.setAttribute("download", filename);
    if(browser_version.name=='Safari'){
      let click_ev = document.createEvent("MouseEvents");
      // # initialize the event
      click_ev.initEvent("click", true /* bubble */ , true /* cancelable */ );
      // # trigger the evevnt/
      link.dispatchEvent(click_ev);
    }else{
      document.body.appendChild(link); // Required for FF
      link.click();
    }
  }
}