const fs = require('fs');///file system module

const {dialog} = require('electron').remote//dialog module

var AsciiTable = require('ascii-table');

var $ = jQuery = require("jquery");

const readline = require('readline');


var count = 0;

var counted = 0;

var arr = [];//employee

var eSearch_table = new AsciiTable('Employee Search');
eSearch_table.setHeading('Name', 'Phone Number', 'Age', 'City', 'State', 'Country' , 'Department', 'Date of Joining');

var employee_table = new AsciiTable('Employee Details');
employee_table.setHeading('Name', 'Phone Number', 'Age', 'City', 'State', 'Country' , 'Department', 'Date of Joining');


var department_table = new AsciiTable('Department Details');
department_table.setHeading('Department Name', 'Employee Name', 'Starting Date', 'Ending Date');


async function processLineByLineE() {
  const fileStream = fs.createReadStream('emp.txt');
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    count++;
    if(line == ""){
      break;
    }
    for(let i=1;i < line.length;i++){
      if(line[i] === " "){
         if(line[i+1] ===" "){
           line[i+1] = "";
         }
      }
    }
    let temp = line.split("|");
   if(count > 5){   
    if(temp[1] != temp[2] && temp[2] != temp[3] && temp[3] != temp[1] ){
     add(temp[1].toString().trim(),temp[2].toString().trim(),temp[3].toString().trim(),temp[4].toString().trim(),temp[5].toString().trim(),temp[6].toString().trim(),temp[7].toString().trim(),temp[8].toString().trim()); 
    }
   }
  }
console.log(arr);
}

function add(a,b,c,d,e,f,g,h)
{
let a2 = [];
employee_table.addRow(a,b,c,d,e,f,g,h);
a2 = [a,b,c,d,e,f,g,h];
arr.push(a2);
for(let i = 0 ; i < arr.length ; i++){
  for(let j = 0; j <= 7 ; j++){
      arr[i][j] = arr[i][j].toString().trim();  
    } 
}
}
processLineByLineE();

function writetxt(temp){
  employee_table.addRow(temp[0][1].toString().trim(),temp[1][1].toString().trim(),temp[2][1].toString().trim(),temp[3][1].toString().trim(),temp[4][1].toString().trim(),temp[5][1].toString().trim(),temp[6][1].toString().trim(),temp[7][1].toString().trim());
  alert("Successfully Added!");
  console.log(employee_table.toString());
  fs.writeFile("emp.txt",employee_table.toString(),(err)=>{
    if(err){
      console.log("error writing Employee Details");
    }
    console.log("Saved in Employee Txt");
  });
  department_table.addRow(temp[6][1].toString().trim(),temp[0][1].toString().trim(),temp[7][1].toString().trim(),'None');
  fs.writeFile("dept.txt",department_table,(err)=>{
    if(err){
      console.log("error writing Department Details");
    }
    console.log("Saved in Department txt");
  });
}

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
department_table.addRow(temp[1].toString().trim(),temp[2].toString().trim(),temp[3].toString().trim(),temp[4].toString().trim());
}
 }
}
console.log(department_table.toString());
}


processLineByLine();
  

$(document).ready(function () {
      $("#title").change(function(){
        var next = $(this).val();
        if(next == 'age'){
           $("#search").attr('type','number');
           $("#search").attr('max','65');
           $("#search").attr('min','18');
           $("#search").attr('placeholder','Enter Age between 18 to 65..');
        }
        else if (next == 'phone'){
            $("#search").attr('type','number');
           $("#search").attr('max','9999999999');
           $("#search").attr('placeholder','Enter Phone Number in 10 digits..');
        }
        else if (next == 'doj'){
          $("#search").attr('type','date');
        }
        else{
            $("#search").attr('type','text');
           $("#search").attr('maxlength','40');
           $("#search").attr('placeholder','Enter to Search..');
        }
    });      
      $("#form1").submit(function(event){
            event.preventDefault(); 
            var form_data = $(this).serialize(); //Encode form elements for submission 
            if ($("#phone").val().length < 10){
                alert("Phone Number should be 10 Digits");  
            }
            else{
              var temp = [];
              var temp1 = [];
              var counts = 0;
              temp1 = form_data.split('&');
              for(let i = 0; i < temp1.length; i++){
                  temp.push(temp1[i].replace(",","=").split("="));
                }
                console.log(temp);
                var date = new Date(temp[7][1]);
                temp[7][1] = ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '-' + ((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '-' + date.getFullYear();
                console.log("arr"+arr.length);
                for(let j=0;j < arr.length;j++){
                    if(temp[1][1].toString().trim() == arr[j][1].toString().trim()){
                      console.log(temp[1][1],arr[j][1]);
                      alert("Record already Exist");
                      counts++;
                      break;
                    }
                }
                if(counts <= 0 || arr.length < 0 || typeof arr === 'undefined'){
                  writetxt(temp);
                  location.reload(); 
                }
              }

          });

      $("#form2").submit(function(event){
            event.preventDefault(); 
            var form_data = $(this).serialize();
            if ($("#title").val() == 'phone' && $("#search").val().length < 10){
                alert("Phone Number should be 10 Digits");  
            }
            else{
              var temp = [];
              var temp1 = [];
              let j;
              let a= "";
              temp1 = form_data.split('&');
              for(let i = 0; i < temp1.length; i++){
                  temp.push(temp1[i].replace(",","=").split("=")); //'Name', 'Phone Number', 'Age', 'City', 'State', 'Country' , 'Department', 'Date of Joining'
              }
              console.log(temp);
              switch (temp[0][1]) {
                case "Name":
                  j = 0;
                  break;
                case "Phone_Number":
                  j = 1;
                  break;
                case "Age":
                  j = 2;
                  break;
                case "City":
                  j = 3;
                  break;
                case "State":
                  j = 4;
                  break;
                case "Country":
                  j = 5;
                  break;
                case "Department":
                  j = 6;
                  break;
                case "Date_of_Joining":
                  j = 7;
                  break;
              }
              console.log(arr , arr.length)
              for(let i = 0 ; i <= arr.length-1 ; i++)
              {  
                console.log(arr[i][j].length,temp[1][1].length,arr[i][j],temp[1][1]);
                if(arr[i][j].toString().trim() == temp[1][1].toString().trim()){  
                  console.log(j,arr[i][j],temp[1][1],'found');           
                  eSearch_table.addRow(arr[i][0].toString().trim(),arr[i][1].toString().trim(),arr[i][2].toString().trim(),arr[i][3].toString().trim(),arr[i][4].toString().trim(),arr[i][5].toString().trim(),arr[i][6].toString().trim(),arr[i][7].toString().trim());
                  a = a+"<tr><td>"+arr[i][0]+"</td><td>"+arr[i][1]+"</td><td>"+arr[i][2]+"</td><td>"+arr[i][3]+"</td><td>"+arr[i][4]+"</td><td>"+arr[i][5]+"</td><td>"+arr[i][6]+"</td><td>"+arr[i][7]+"</td></tr>";
                }
              }
              if(a == ""){
                alert("Record not found");
              }
              document.getElementById("emp-search").innerHTML = a;
              fs.writeFile("esearch.txt",eSearch_table.toString(),(err)=>{
                if(err){
                  console.log("error writing Employee Details");
                }
                console.log("written");
              });
              eSearch_table.clearRows();
          }
          });
        });