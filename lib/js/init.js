//Delay function
function sleep(ms)
{
  return new Promise(resolve => setTimeout(resolve, ms));
}

//Calls imageDelay() after 3s
setTimeout('imageDelay()', 3000);

//Calls Redirect() after 9s
setTimeout('Redirect()', 9000);

//Display all 35 images at specified interval points
async function imageDelay()
{
  for(var i=1; i<=35; i++)
  {
    //Sets time delay between images
    var time;
    if(i<=6)
      time=400;
    else if(i>6 && i<=12)
      time=300;
    else if (i>12 && i<=18)
      time=150;
    else if (i>18 && i<=24)
      time=75;
    else if (i>24 && i<=28)
      time=50;
    else if (i>28)
      time=20;

    //Enables visibility for the specified id
    var x = "p" + i;
    document.getElementById(x).style.visibility = "visible";
    await sleep(time);
  }
}

//Redirects init page to map
function Redirect()
{
  window.location = "https://snazzymaps.com/embed/82684";
}
