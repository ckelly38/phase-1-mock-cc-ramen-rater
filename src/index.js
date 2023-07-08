// write your code here
function getNewRamenDOMElements(ramenobj)
{
    //comment, id, image, name, rating, restaurant
    console.log("ramenobj.comment = " + ramenobj.comment);
    console.log("ramenobj.id = " + ramenobj.id);
    console.log("ramenobj.image = " + ramenobj.image);
    console.log("ramenobj.name = " + ramenobj.name);
    console.log("ramenobj.rating = " + ramenobj.rating);
    console.log("ramenobj.restaurant = " + ramenobj.restaurant);
    let myimg = document.createElement("img");
    myimg.id = ramenobj.id;
    myimg.src = ramenobj.image;
    return myimg;
}

function addDisplayInfoBoxListener(ramenobj)
{
    //comment, id, image, name, rating, restaurant
    console.log("ramenobj.comment = " + ramenobj.comment);
    console.log("ramenobj.id = " + ramenobj.id);
    console.log("ramenobj.image = " + ramenobj.image);
    console.log("ramenobj.name = " + ramenobj.name);
    console.log("ramenobj.rating = " + ramenobj.rating);
    console.log("ramenobj.restaurant = " + ramenobj.restaurant);
    let myimgbtn = document.getElementById(ramenobj.id);
    myimgbtn.addEventListener("click", function(event){
        console.log("clicked the image!");
        console.log("this.id = " + this.id);
        console.log("this.comment = " + this.comment);
        //console.log("this.id = " + this.id);
        console.log("this.image = " + this.image);
        console.log("this.name = " + this.name);
        console.log("this.rating = " + this.rating);
        console.log("this.restaurant = " + this.restaurant);
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
    console.log("successfully added the display info box listener!");
}

document.addEventListener("DOMContentLoaded", function(){
    //first load all of the ramens into the dom
    fetch("http://localhost:3000/ramens").then((response) => response.json()).
    then(function(response){
        console.log("response = " + response);
        let myramensarr = response;
        for (let n = 0; n < myramensarr.length; n++)
        {
            console.log("myramensarr[" + n + "] = " + myramensarr[n]);
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
            console.log("myramensarr[" + n + "] = " + myramensarr[n]);
            addDisplayInfoBoxListener(myramensarr[n]);
        }//end of n for loop

        document.getElementById(myramensarr[0].id).click();

        //image:
        //https://lh3.googleusercontent.com/p/AF1QipMyVvA590Z5Lt5ETrrauv5_6DSHz7BX4T4ItgLh=s680-w680-h510
        //restaurant: Katsu Ramen
        //name: Tonkotsu
        //rating: 6
        //comment: tastes better than it looks
        //

        let nwramenform = document.getElementById("new-ramen");
        nwramenform.addEventListener("submit", function(event){
            event.preventDefault();
            console.log("event.target = " + event.target);
            console.log("event.target[0].value = " + event.target[0].value);//name
            console.log("event.target[1].value = " + event.target[1].value);//restaurant
            console.log("event.target[2].value = " + event.target[2].value);//image
            console.log("event.target[3].value = " + event.target[3].value);//rating
            console.log("event.target[4].value = " + event.target[4].value);//comment
            let mynwramenobj = {
                name: ("" + event.target[0].value),
                restaurant: ("" + event.target[1].value),
                image: ("" + event.target[2].value),
                rating: ("" + event.target[3].value),
                comment: ("" + event.target[4].value)
            };
            document.getElementById("ramen-menu").appendChild(
                getNewRamenDOMElements(mynwramenobj));
            addDisplayInfoBoxListener(mynwramenobj);
            //clear the form
            let myinputs = nwramenform.getElementsByTagName("input");
            for (let n = 0; n < myinputs.length; n++)
            {
                console.log("myinputs[" + n + "].type = " + myinputs[n].type);
                if (myinputs[n].type === "submit") continue;
                else myinputs[n].value = "";
            }
            console.log("successfully added the new ramen menu item!");
            debugger;
        });
        console.log("set up the new ramen form!");
        debugger;
    }).catch(function(err){
        console.error("there was an error geting all of the ramens!");
        console.error(err);
    });
});
