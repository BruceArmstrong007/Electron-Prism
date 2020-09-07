
const fs = require('fs');///file system module

const {dialog} = require('electron').remote//dialog module

var AsciiTable = require('ascii-table');

var $ = jQuery = require("jquery");

const readline = require('readline');

var department_table = new AsciiTable('Department Details');
department_table.setHeading('Department Name', 'Employee Name', 'Starting Date', 'Ending Date');

var dSearch_table = new AsciiTable('Department Search');
dSearch_table.setHeading('Department Name', 'Employee Name', 'Starting Date', 'Ending Date');

var employee_table = new AsciiTable('Employee Details');
employee_table.setHeading('Name', 'Phone Number', 'Age', 'City', 'State', 'Country' , 'Department', 'Date of Joining');

var counted = 0; 

var arr2 = [];//department


async function processLineByLine() {
    const fileStream = fs.createReadStream('dept.txt');
  
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity
    });
  
    for await (const line of rl) {
      counted++;
      for(let i=1;i < line.length;i++){
        if(line[i] === " "){
           if(line[i+1] ===" "){
             line[i+1] = "";
           }
        }
      }
      let temp = line.split("|");
    if(counted > 5){   
  if(temp[1] != temp[2] && temp[2] != temp[3] && temp[3] != temp[1] ){
      add(temp[1].toString().trim(),temp[2].toString().trim(),temp[3].toString().trim(),temp[4].toString().trim());
  }
     }
    }
    console.log(department_table.toString());
  }
  
  function add(a,b,c,d)
  {
  let a2 = []
  department_table.addRow(a,b,c,d);
  a2 = [a,b,c,d];
  arr2.push(a2); 
  for(let i = 0 ; i < arr2.length ; i++){
    for(let j = 0; j <= 3 ; j++){
        arr2[i][j] = arr2[i][j].toString().trim();  
      } 
  }
  
  }
  
processLineByLine();


  $(document).ready(function(){
    $("#sdate").change(function(){
      var end = $(this).val();
      $("#edate").attr('min',end);
    });
    $("#form1").submit(function(event){
      event.preventDefault(); 
      var form_data = $(this).serialize(); 
      if ($("#sdate").val() >= $("#edate").val()){
          alert("Starting date should not be Equal or higher than Ending Date");  
      }
      else{
        let a ="";
        var temp = [];
        var temp1 = [];
        let j = 2;
        temp1 = form_data.split('&');
        for(let i = 0; i < temp1.length; i++){
            temp.push(temp1[i].replace(",","=").split("="));
          } 
        let sdate = new Date(temp[0][1].toString().trim().split('-'));
        let edate = new Date(temp[1][1].toString().trim().split('-'));
        for(let i =0 ; i < arr2.length ; i++)
        {
          if(arr2[i][j].trim() == 'None'){
            break;
          }
          let tsdate = new Date(arr2[i][j].toString().trim().split('-')); 
           if(arr2[i][j+1].trim() != 'None'){
             let tedate = new Date(arr2[i][j+1].toString().trim().split('-')); 
             if(sdate > tedate || edate < tsdate){                   
              break;
             }
             else{
              a = a+"<tr><td>"+arr2[i][0]+"</td><td>"+arr2[i][1]+"</td><td>"+arr2[i][2]+"</td><td>"+arr2[i][3]+"</td><td>"+arr2[i][4]+"</td></tr>";
              dSearch_table.addRow(arr2[i][0].toString().trim(),arr2[i][1].toString().trim(),arr2[i][2].toString().trim(),arr2[i][3].toString().trim());
             }
            }
            else{      
              if(edate < tsdate){                   
                break;
              }
              else{
               a = a+"<tr><td>"+arr2[i][0]+"</td><td>"+arr2[i][1]+"</td><td>"+arr2[i][2]+"</td><td>"+arr2[i][3]+"</td></tr>";
               dSearch_table.addRow(arr2[i][0].toString().trim(),arr2[i][1].toString().trim(),arr2[i][2].toString().trim(),arr2[i][3].toString().trim());
              }
            }
            if(a == ""){
              alert("Record not found");
            }
        }
        document.getElementById("dept-search").innerHTML = a;
        console.log(dSearch_table.toString());
      fs.writeFile("dsearch.txt", dSearch_table.toString(), (err) => {
        if(err){
            alert("An error ocurred creating the file"+ err.message);
        }
        alert("The file has been succesfully saved");
    });
    dSearch_table.clearRows();
    }
});



  $("#form2").submit(function(event){
      event.preventDefault(); 
      var form_data = $(this).serialize(); //Encode form elements for submission
      var temp = [];
      var temp1 = [];
      let a = "";
      let b;
      temp1 = form_data.split('&');
      for(let i = 0; i < temp1.length; i++){
          temp.push(temp1[i].replace(",","=").split("="));
        }
        console.log(temp);
        console.log(arr2);
      for(let i = 0 ; i < arr2.length ; i++){
        if(temp[1][1].toString().trim() == ""){
          if(temp[0][1].toString().trim() == arr2[i][1].toString().trim() && arr2[i][3] =="None"){
            b = "<button class='w3-button w3-small w3-round-medium w3-green w3-hover-blue' value='"+arr2[i][1]+","+arr2[i][0]+"' onclick='swhfn(event, this)'>Switch</button>";
            a = a+"<tr><td>"+arr2[i][0]+"</td><td>"+b+"</td><td>"+arr2[i][1]+"</td><td>"+arr2[i][2]+"</td><td>"+arr2[i][3]+"</td></tr>";
          }
        }else{
          if(temp[1][1].toString().trim() == arr2[i][0].toString().trim() && temp[0][1].toString().trim() == arr2[i][1]){
            a = a+"<tr><td>"+arr2[i][0]+"</td><td>"+arr2[i][1]+"</td><td>"+arr2[i][2]+"</td><td>"+arr2[i][3]+"</td></tr>";
          }
        }    
      }
      if(a == ""){
        alert("Record not found");
      }  
      document.getElementById("swh-dept").innerHTML = a;
  }); 
  
});