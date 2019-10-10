// alert("connecte to me");
$(document).ready(()=>{
    const cTable = $(".currentTable");
    $.ajax({
        url: "/api/tables",
        method : "GET"
    }).then((res,err)=>{
        for(let i=0; i<res.length; i++){
            const nameDiv = $("<div>");
            nameDiv.html("<h6>"+(i+1)+")<strong> Name:</strong> "+(res[i].name)+", <strong>Ph:</strong> "+(res[i].contact)+", <strong> Email:</strong> "+(res[i].email)+"</h6>");
            nameDiv.addClass("customer");
            cTable.append(nameDiv);
        }
    });
    const wTable = $(".waitingList");
    $.ajax({
        url: "/api/waiting",
        method : "GET"
    }).then((res,err)=>{
        for(let i=0; i<res.length; i++){
            const nameDiv = $("<div>");
            nameDiv.html("<h6>"+(i+1)+")<strong> Name:</strong> "+(res[i].name)+", <strong>Ph:</strong> "+(res[i].contact)+", <strong> Email:</strong> "+(res[i].email)+"</h6>");
            nameDiv.addClass("customer");
            wTable.append(nameDiv);
        }
    });

    $("#formSubmit").on("click",(event)=>{
        event.preventDefault();
        const newCustomer = {
            "name" : (`${$("#fName").val()} ${$("#lName").val()}`),
            "email" : $("#exampleInputEmail1").val(),
            "contact" : $("#phoneNum").val()
        };
        $.post("/api/addNew", newCustomer, (data)=>{
           console.log(data);
           // If a table is available... tell user they are booked.
          if (data) {
            alert("Yay! You are officially booked!");
          }

          // If a table is available... tell user they on the waiting list.
          else {
            alert("Sorry you are on the wait list");
          };

          $("#fName").val("");
          $("#lName").val("");
          $("#exampleInputEmail1").val("");
          $("#phoneNum").val("");
       });
    });
});