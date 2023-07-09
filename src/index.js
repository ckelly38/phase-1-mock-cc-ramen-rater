// write your code here
function getNewRamenDOMElements(ramenobj)
{
    //comment, id, image, name, rating, restaurant
    //console.log("ramenobj.comment = " + ramenobj.comment);
    //console.log("ramenobj.id = " + ramenobj.id);
    //console.log("ramenobj.image = " + ramenobj.image);
    //console.log("ramenobj.name = " + ramenobj.name);
    //console.log("ramenobj.rating = " + ramenobj.rating);
    //console.log("ramenobj.restaurant = " + ramenobj.restaurant);
    let myimg = document.createElement("img");
    myimg.id = ramenobj.id;
    myimg.src = ramenobj.image;
    return myimg;
}

function getRamenObjectForDisplayId(dispid, ramenobjarr)
{
    if (ramenobjarr == undefined || ramenobjarr == null || ramenobjarr.length < 1)
    {
        return null;
    }
    //else;//do nothing

    if (dispid == undefined || dispid == null || isNaN(dispid)) return null;
    //else;//do nothing

    if (dispid < 0 || dispid > ramenobjarr.length) return null;
    //else;//do nothing

    for (let n = 0; n < ramenobjarr.length; n++)
    {
        if (ramenobjarr[n].id === dispid) return ramenobjarr[n];
        //else;//do nothing
    }

    throw "the object should have been found because the id was valid, but it was not!";
}

let mydisplayid = -1;
function addDisplayInfoBoxListener(ramenobj)
{
    //comment, id, image, name, rating, restaurant
    //console.log("ramenobj.comment = " + ramenobj.comment);
    //console.log("ramenobj.id = " + ramenobj.id);
    //console.log("ramenobj.image = " + ramenobj.image);
    //console.log("ramenobj.name = " + ramenobj.name);
    //console.log("ramenobj.rating = " + ramenobj.rating);
    //console.log("ramenobj.restaurant = " + ramenobj.restaurant);
    let myimgbtn = document.getElementById(ramenobj.id);
    myimgbtn.addEventListener("click", function(event){
        //console.log("clicked the image!");
        //console.log("this.id = " + this.id);
        //console.log("this.comment = " + this.comment);
        //console.log("this.id = " + this.id);
        mydisplayid = this.id;
        //console.log("this.image = " + this.image);
        //console.log("this.name = " + this.name);
        //console.log("this.rating = " + this.rating);
        //console.log("this.restaurant = " + this.restaurant);
        //console.log("NEW mydisplayid = " + mydisplayid);
        let myimg = document.getElementById("ramen-detail").getElementsByTagName("img")[0];
        myimg.alt = this.name;
        myimg.src = this.image;
        let myrestname = document.getElementById("ramen-detail").getElementsByTagName("h3")[0];
        let myitemname = document.getElementById("ramen-detail").getElementsByTagName("h2")[0];
        myrestname.textContent = "" + this.restaurant;
        myitemname.textContent = "" + this.name;
        document.getElementById("rating-display").textContent = "" + this.rating;
        document.getElementById("comment-display").textContent = "" + this.comment;
        //debugger;
    }.bind(ramenobj));
    //console.log("successfully added the display info box listener!");
}

document.addEventListener("DOMContentLoaded", function(){
    //first load all of the ramens into the dom
    fetch("http://localhost:3000/ramens").then((response) => response.json()).
    then(function(response){
        //console.log("response = " + response);
        let myramensarr = response;
        for (let n = 0; n < myramensarr.length; n++)
        {
            //console.log("myramensarr[" + n + "] = " + myramensarr[n]);
            //comment, id, image, name, rating, restaurant
            //console.log("myramensarr[" + n + "].comment = " + myramensarr[n].comment);
            //console.log("myramensarr[" + n + "].id = " + myramensarr[n].id);
            //console.log("myramensarr[" + n + "].image = " + myramensarr[n].image);
            //console.log("myramensarr[" + n + "].name = " + myramensarr[n].name);
            //console.log("myramensarr[" + n + "].rating = " + myramensarr[n].rating);
            //console.log("myramensarr[" + n + "].restaurant = " + myramensarr[n].restaurant);
            document.getElementById("ramen-menu").appendChild(
                getNewRamenDOMElements(myramensarr[n]));
        }//end of n for loop
        
        //hook up the image buttons here...
        for (let n = 0; n < myramensarr.length; n++)
        {
            //console.log("myramensarr[" + n + "] = " + myramensarr[n]);
            addDisplayInfoBoxListener(myramensarr[n]);
        }//end of n for loop

        document.getElementById(myramensarr[0].id).click();

        let myeditbtn = document.createElement("button");
        myeditbtn.id = "editbtn";
        myeditbtn.textContent = "Edit";
        let mydelbtn = document.createElement("button");
        mydelbtn.textContent = "Delete";
        mydelbtn.id = "delbtn";
        let mymodifybtnsdiv = document.createElement("div");
        mymodifybtnsdiv.appendChild(myeditbtn);
        mymodifybtnsdiv.appendChild(mydelbtn);
        
        //create an edit ramen form
        let myupdatefrm = document.createElement("form");
        myupdatefrm.id = "edit-ramen";
        myupdatefrm.style.display = "none";
        let mynameoffrm = document.createElement("h4");
        mynameoffrm.textContent = "Update the Featured Ramen";
        let myratinginput = document.createElement("input");
        myratinginput.placeholder = "rating #";
        myratinginput.name = "urating";
        myratinginput.type = "number";
        let mycommenttxtbox = document.createElement("textarea");
        mycommenttxtbox.placeholder = "comment";
        mycommenttxtbox.name = "ucomment";
        let mysubmitbtn = document.createElement("input");
        mysubmitbtn.type = "submit";
        mysubmitbtn.value = "Update";
        myupdatefrm.appendChild(mynameoffrm);
        myupdatefrm.appendChild(myratinginput);
        myupdatefrm.appendChild(mycommenttxtbox);
        myupdatefrm.appendChild(mysubmitbtn);
        
        let nwramenform = document.getElementById("new-ramen");

        document.body.insertBefore(myupdatefrm, nwramenform);
        document.body.insertBefore(mymodifybtnsdiv, myupdatefrm);

        document.getElementById("editbtn").addEventListener("click", function(event){
            //console.log("edit button was clicked!");
            //console.log("mydisplayid = " + mydisplayid);
            let myramenobj = getRamenObjectForDisplayId(mydisplayid, myramensarr);
            let myoupdatefrm = document.getElementById("edit-ramen");
            
            //show the edit form
            //load in the values
            myoupdatefrm.style.display = "block";
            myoupdatefrm.getElementsByTagName("input")[0].value = myramenobj.rating;
            myoupdatefrm.getElementsByTagName("textarea")[0].value = myramenobj.comment;
            //console.log("successfully loaded in the values into the edit form!");
            //debugger;
        });
        //console.log("successfully hooked up the edit button!");
        
        document.getElementById("delbtn").addEventListener("click", function(event){
            //console.log("delete button was clicked!");
            //console.log("mydisplayid = " + mydisplayid);
            let myramenobj = getRamenObjectForDisplayId(mydisplayid, myramensarr);
            let myconfigobj = {
                method: "DELETE",
                headers: {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                }
            };
            fetch("http://localhost:3000/ramens/" + myramenobj.id, myconfigobj).
            then((oresponse) => oresponse.json()).
            then(function(oresponse){
                //console.log("oresponse = " + oresponse);
                //console.log("OLD mydisplayid = " + mydisplayid);
                //reset the dom to original contents
                //remove it from the DOM
                //remove it from the array
                let oldidfnd = false;
                for (let k = 0; k < myramensarr.length; k++)
                {
                    if (myramensarr[k].id === mydisplayid)
                    {
                        let mynwarr = new Array();
                        for (let c = 0; c < myramensarr.length; c++)
                        {
                            if (c == k);
                            else mynwarr.push(myramensarr[c]);
                        }
                        oldidfnd = true;
                        myramensarr = mynwarr;
                        break;
                    }
                    //else;//do nothing
                }
                //console.log("oldidfnd = " + oldidfnd);

                if (oldidfnd);
                else throw "the old ID should have been on the array still!";
                //remove from DOM now
                document.getElementById(mydisplayid).remove();

                //reset DOM contents to originals
                let myimg = document.getElementById("ramen-detail").getElementsByTagName("img")[0];
                myimg.alt = "Insert Name Here";
                myimg.src = "./assets/image-placeholder.jpg";
                let myrestname = document.getElementById("ramen-detail").getElementsByTagName("h3")[0];
                let myitemname = document.getElementById("ramen-detail").getElementsByTagName("h2")[0];
                myrestname.textContent = "Insert Restaurant Here";
                myitemname.textContent = "Insert Name Here";
                document.getElementById("comment-display").textContent = "Insert comment here";
                document.getElementById("rating-display").textContent = "Insert rating here";
                mydisplayid = -1;
                //console.log("NEW mydisplayid = " + mydisplayid);
                //console.log("Successfully removed the ramen!");
                
                if (myramensarr.length > 0)
                {
                    document.getElementById(myramensarr[0].id).click();
                    //console.log("Displayed another after deletion successfully!");
                }
                //else;//do nothing
                
                //debugger;
            }).catch(function(err){
                console.error("there was an error updating the ratings and the comments!");
                console.error(err);
            });
            //debugger;
        });
        //console.log("successfully hooked up the delete button!");

        let myoupdatefrm = document.getElementById("edit-ramen");
        myoupdatefrm.addEventListener("submit", function(event){
            event.preventDefault();
            //console.log("event.target = " + event.target);
            //console.log("event.target[0].value = " + event.target[0].value);//rating
            //console.log("event.target[1].value = " + event.target[1].value);//comment
            //console.log("mydisplayid = " + mydisplayid);
            let myramenobj = getRamenObjectForDisplayId(mydisplayid, myramensarr);
            
            //comment, id, image, name, rating, restaurant
            //console.log("myramenobj.comment = " + myramenobj.comment);
            //console.log("myramenobj.id = " + myramenobj.id);
            //console.log("myramenobj.image = " + myramenobj.image);
            //console.log("myramenobj.name = " + myramenobj.name);
            //console.log("myramenobj.rating = " + myramenobj.rating);
            //console.log("myramenobj.restaurant = " + myramenobj.restaurant);
            
            let mytmprmobj = {
                comment: "" + event.target[1].value,
                id: myramenobj.id,
                image: myramenobj.image,
                name: myramenobj.name,
                rating: event.target[0].value,
                restaurant: myramenobj.restaurant
            };
            let myconfigobj = {
                method: "PATCH",
                headers: {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                },
                body: JSON.stringify(mytmprmobj)
            };
            fetch("http://localhost:3000/ramens/" + myramenobj.id, myconfigobj).
            then((oresponse) => oresponse.json()).
            then(function(oresponse){
                //console.log("oresponse = " + oresponse);
                
                //update the rating and comment on the DOM and hide the form
                let mynwramenobj = oresponse;
                //console.log("mynwramenobj.comment = " + mynwramenobj.comment);
                //console.log("mynwramenobj.id = " + mynwramenobj.id);
                //console.log("mynwramenobj.image = " + mynwramenobj.image);
                //console.log("mynwramenobj.name = " + mynwramenobj.name);
                //console.log("mynwramenobj.rating = " + mynwramenobj.rating);
                //console.log("mynwramenobj.restaurant = " + mynwramenobj.restaurant);
                
                myramenobj.rating = mynwramenobj.rating;
                myramenobj.comment = mynwramenobj.comment;
                document.getElementById("comment-display").textContent = mynwramenobj.comment;
                document.getElementById("rating-display").textContent = "" + mynwramenobj.rating;
                myoupdatefrm.getElementsByTagName("input")[0].value = "";
                myoupdatefrm.getElementsByTagName("textarea")[0].value = "";
                myoupdatefrm.style.display = "none";
                //console.log("sucessfully updated the ramen!");
                //debugger;
            }).catch(function(err){
                console.error("there was an error updating the ratings and the comments!");
                console.error(err);
            });
            //debugger;
        });
        //console.log("successfully hooked up the update form button!");


        //image:
        //https://lh3.googleusercontent.com/p/AF1QipMyVvA590Z5Lt5ETrrauv5_6DSHz7BX4T4ItgLh=s680-w680-h510
        //restaurant: Katsu Ramen
        //name: Tonkotsu
        //rating: 6
        //comment: tastes better than it looks
        //
        nwramenform.addEventListener("submit", function(event){
            event.preventDefault();
            //console.log("event.target = " + event.target);
            //console.log("event.target[0].value = " + event.target[0].value);//name
            //console.log("event.target[1].value = " + event.target[1].value);//restaurant
            //console.log("event.target[2].value = " + event.target[2].value);//image
            //console.log("event.target[3].value = " + event.target[3].value);//rating
            //console.log("event.target[4].value = " + event.target[4].value);//comment
            let mynwramenobj = {
                name: ("" + event.target[0].value),
                restaurant: ("" + event.target[1].value),
                image: ("" + event.target[2].value),
                rating: ("" + event.target[3].value),
                comment: ("" + event.target[4].value)
            };
            
            let myconfigobj = {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    "Accept" : "application/json"
                },
                body: JSON.stringify(mynwramenobj)
            };
            fetch("http://localhost:3000/ramens", myconfigobj).then((oresponse) => oresponse.json()).
            then(function(oresponse){
                //console.log("oresponse = " + oresponse);
                let myresnwramenobj = oresponse;
                //console.log("myresnwramenobj.id = " + myresnwramenobj.id);
                document.getElementById("ramen-menu").appendChild(
                    getNewRamenDOMElements(myresnwramenobj));
                addDisplayInfoBoxListener(myresnwramenobj);
                myramensarr.push(myresnwramenobj);
                //clear the form
                let myinputs = nwramenform.getElementsByTagName("input");
                for (let n = 0; n < myinputs.length; n++)
                {
                    //console.log("myinputs[" + n + "].type = " + myinputs[n].type);
                    if (myinputs[n].type === "submit") continue;
                    else myinputs[n].value = "";
                }
                let mycmtonfrm = nwramenform.getElementsByTagName("textarea")[0];
                mycmtonfrm.value = "";
                //console.log("successfully added the new ramen menu item!");
                //debugger;
            }).catch(function(err){
                console.error("there was an error adding the new menu item!");
                console.error(err);
            });
            //debugger;
        });
        //console.log("set up the new ramen form!");
        //debugger;
    }).catch(function(err){
        console.error("there was an error geting all of the ramens!");
        console.error(err);
    });
});
