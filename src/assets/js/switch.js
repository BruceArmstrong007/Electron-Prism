
$(document).ready(function(){
    $("#form3").submit(function(event){
     event.preventDefault(); 
     var form_data = $(this).serialize(); 
     var temp = [];
     var temp1 = [];
     temp1 = form_data.split('&');
     for(let i = 0; i < temp1.length; i++){
         temp.push(temp1[i].replace(",","=").split("="));
       } 
      let t = []; 
     console.log(temp);  
     for(let i = 0;i < arr2.length;i++){
       if(temp[0][1].toString().trim() == arr2[i][1].toString().trim() && temp[1][1].toString().trim() == arr2[i][0].toString().trim()){
        t = temp[3][1].toString().trim().split("-");
        arr2[i][3] = t[1]+"-"+t[2]+"-"+t[0];
        console.log(arr2[i][3]);
        console.log(arr2)
        department_table.clearRows();
        for(let j =0;j < arr2.length;j++){
        department_table.addRow(arr2[j][0].toString().trim(),arr2[j][1].toString().trim(),arr2[j][2].toString().trim(),arr2[j][3].toString().trim());
        }
        department_table.addRow(temp[2][1].toString().trim(),temp[0][1].toString().trim(),temp[3][1].toString().trim(),'None');
       }
     }
     fs.writeFile("dept.txt", department_table.toString(), (err) => {
      if(err){
          alert("An error ocurred creating the file"+ err.message);
      }
      alert("The file has been succesfully saved");
  });
  console.log(department_table.toString());
  alert("Switched Department");
  location.reload();
   });   
 });   