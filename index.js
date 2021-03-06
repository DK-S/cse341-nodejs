const express = require('express')
const path = require('path')
const { parse } = require('querystring')
const url = require('url')

const PORT = process.env.PORT || 5000

express()
  .use(express.urlencoded())
  .use(express.json())
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .post('/calc', (req, res) => {
    
    let weight = parseFloat(req.body.weight);
    let type = parseInt(req.body.mailType);
    if (weight>3.5 && type<2){type=2;}
    let rate = calculateRate(weight, type);
    let typeStr = "";
    switch (type){
      case 0: typeStr = "Letters (Stamped)"; break;
      case 1: typeStr = "Letters (Metered)"; break;
      case 2: typeStr = "Large Envelopes (Flats)"; break;
      case 3: typeStr = "First-Class Package Service—Retail"; break
      default: typeStr = "Unknown";
    }
    res.render('pages/rate', {
      weight:weight,
      type:typeStr,
      rate: "$" + rate.toFixed(2)
    });
    console.log(c)
  })
  
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))

  function calculateRate(weight, type){
    
    switch (type){
      case 0: rate = (0.2 * (Math.ceil(weight)-1)) + 0.55; break;
      case 1: rate = (0.2 * (Math.ceil(weight)-1)) + 0.51; break;
      case 2: rate = (0.2 * (Math.ceil(weight)-1)) + 1; break;
      case 3: 
        if (weight > 13){rate = 0;}
        else if (weight > 12){rate = 6.25;} 
        else if (weight > 8){rate = 5.50;} 
        else if (weight > 4){rate = 4.80;} 
        else { rate = 4;}
        break;
      default: rate =0;
    }
    return rate;
  };
