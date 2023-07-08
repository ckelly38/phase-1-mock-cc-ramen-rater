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

        debugger;
    }).catch(function(err){
        console.error("there was an error geting all of the ramens!");
        console.error(err);
    });
});
