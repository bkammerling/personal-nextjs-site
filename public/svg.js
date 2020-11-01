document.addEventListener("DOMContentLoaded", function(event){

  var precision = 6;
  var easing = KUTE.Easing.easingSinusoidalInOut;
  var svgElements = ['#blob1', '#blob2' ]

  svgElements.map((svg, index) => {
    var tween1 = KUTE.to(svg, { path: blob2 }, { morphPrecision: precision, easing: easing, duration: 7000} );
    var tween2 = KUTE.to(svg, { path: blob3 }, { morphPrecision: precision, easing: easing, duration: 14000} );
    var tween3 = KUTE.to(svg, { path: blob4 }, { morphPrecision: precision, easing: easing, duration: 8000} );
    var tween4 = KUTE.to(svg, { path: blob5 }, { morphPrecision: precision, easing: easing, duration: 4000} );
    var tween5 = KUTE.to(svg, { path: blob6 }, { morphPrecision: precision, easing: easing, duration: 7000} );
    var tween6 = KUTE.to(svg, { path: blob1 }, { morphPrecision: precision, easing: easing, duration: 9000} );
    console.log(index);
    if(index <= 0) {
      tween1.chain(tween2);
      tween2.chain(tween3);
      tween3.chain(tween4);
      tween4.chain(tween5);
      tween5.chain(tween6);
      tween6.chain(tween1);
      tween1.start();
    } else {
      tween1.chain(tween6);
      tween2.chain(tween1);
      tween3.chain(tween2);
      tween4.chain(tween3);
      tween5.chain(tween4);
      tween6.chain(tween5);
      tween4.start();
    }
  })

});


var blob1 = "M25.2,-42.5C33.3,-34.1,40.7,-28.1,51.5,-19.2C62.3,-10.3,76.4,1.3,77.7,13.1C79,24.8,67.5,36.7,54.5,41.8C41.6,46.9,27.2,45.3,14,50.6C0.7,55.9,-11.4,68,-23.5,69.3C-35.6,70.7,-47.6,61.2,-53,49.2C-58.4,37.2,-57.2,22.6,-55.7,10.1C-54.3,-2.4,-52.6,-12.8,-50.8,-25.9C-49,-38.9,-47.1,-54.6,-38.6,-62.8C-30.1,-71,-15.1,-71.8,-3.2,-66.7C8.6,-61.7,17.2,-50.9,25.2,-42.5Z"
var blob2 = "M31.6,-54.3C39.2,-44.2,42.6,-32.6,46,-22C49.3,-11.3,52.7,-1.6,57.4,12.6C62.1,26.8,68.1,45.6,60.8,50.9C53.4,56.3,32.6,48.3,17.6,46.8C2.5,45.3,-6.9,50.3,-20.3,53.5C-33.7,56.7,-51.3,58.2,-58.1,50.3C-64.9,42.5,-61.1,25.3,-63.1,9.3C-65.1,-6.8,-72.9,-21.8,-70.8,-34.8C-68.7,-47.8,-56.8,-58.7,-43.3,-66.1C-29.9,-73.5,-14.9,-77.4,-1.5,-75.1C12,-72.8,23.9,-64.3,31.6,-54.3Z"
var blob3 = "M54.8,-11.7C63.2,7.9,56.7,38.5,40.1,49C23.6,59.6,-3,50.1,-20.2,35.7C-37.5,21.3,-45.5,2,-40.6,-12.9C-35.7,-27.8,-17.8,-38.3,2.7,-39.1C23.2,-40,46.4,-31.3,54.8,-11.7Z"
var blob4 = "M35.5,-4.3C43.8,13.9,46.7,41.2,35.6,49.3C24.5,57.4,-0.6,46.4,-21.3,31C-42,15.5,-58.3,-4.4,-54.1,-17.1C-49.8,-29.8,-24.9,-35.4,-5.6,-33.6C13.6,-31.8,27.2,-22.5,35.5,-4.3Z"
var blob5 = "M32.7,-8.4C39.6,10.7,40.5,33.9,25,48.6C9.4,63.2,-22.7,69.4,-36.3,57.7C-49.8,46,-44.8,16.6,-35.6,-5.6C-26.5,-27.7,-13.3,-42.5,-0.2,-42.4C12.9,-42.3,25.8,-27.4,32.7,-8.4Z"
var blob6 = "M58.3,-22.6C65.4,2.9,53.9,30.7,31.7,47.9C9.4,65.1,-23.7,71.7,-44.6,57.5C-65.5,43.2,-74.2,8.1,-64.7,-20.6C-55.3,-49.3,-27.6,-71.7,-1,-71.4C25.6,-71,51.2,-48,58.3,-22.6Z"