/* Setting things up. */
const express = require('express');
const app = express();
const CronJob = require('cron').CronJob;
const fetch = require('node-fetch');

/* Support Functions */
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

(new CronJob('30 * * * *', function() {
  /* cron magic code */

  // Creo la fecha
  var d = new Date();
  var curr_date = d.getDate();
  var curr_month = d.getMonth();
  var curr_year = d.getFullYear();
  var full_date = curr_year + "-" + addZero(curr_month) + "-" + addZero(curr_date) + ' ' + addZero(d.getUTCHours())


  // Fetcheo el api de prices

  fetch("https://criptoya.com/api/btc/ars/0.1", {
    "headers": {
      "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "accept-language": "es-ES,es;q=0.9",
      "cache-control": "max-age=0",
      "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
      "sec-ch-ua-mobile": "?0",
      "sec-fetch-dest": "document",
      "sec-fetch-mode": "navigate",
      "sec-fetch-site": "none",
      "sec-fetch-user": "?1",
      "upgrade-insecure-requests": "1",
      "cookie": "__cfduid=d4a87df695e3fab96b1e190cdfd39906c1615809051; PHPSESSID=b6ivhoiq0hpnffe9u2vmegi3pl"
    },
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors"
  }).then(res => res.json())
    .then(function(json) {
      let ripio = json.ripio;
      let buenbit = json.buenbit;
      let lemon = json.lemoncash;
      console.log("El precio de compra en Ripio es de: " + formatter.format(ripio.totalAsk));
      console.log("El precio de compra en Buenbit es de: " + formatter.format(buenbit.totalAsk));
      console.log("El precio de compra en Lemon es de: " + formatter.format(lemon.totalAsk));


      let new_object = {
        "Ripio": ripio.totalAsk,
        "Lemon": lemon.totalAsk,
        "Buenbit": buenbit.totalAsk
      }

      db.set(full_date, new_object).then(() => {});

    }
    );








  /* cron ends here */
})).start();



fetch("https://criptoya.com/api/btc/ars/0.1", {
  "headers": {
    "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
    "accept-language": "es-ES,es;q=0.9",
    "cache-control": "max-age=0",
    "sec-ch-ua": "\"Google Chrome\";v=\"89\", \"Chromium\";v=\"89\", \";Not A Brand\";v=\"99\"",
    "sec-ch-ua-mobile": "?0",
    "sec-fetch-dest": "document",
    "sec-fetch-mode": "navigate",
    "sec-fetch-site": "none",
    "sec-fetch-user": "?1",
    "upgrade-insecure-requests": "1",
    "cookie": "__cfduid=d4a87df695e3fab96b1e190cdfd39906c1615809051; PHPSESSID=b6ivhoiq0hpnffe9u2vmegi3pl"
  },
  "referrerPolicy": "strict-origin-when-cross-origin",
  "body": null,
  "method": "GET",
  "mode": "cors"
}).then(res => res.json())
  .then(function(json) {
    let ripio = json.ripio;
    let buenbit = json.buenbit;
    let lemon = json.lemoncash;
    console.log("El precio de compra en Ripio es de: " + formatter.format(ripio.totalAsk));
    console.log("El precio de compra en Buenbit es de: " + formatter.format(buenbit.totalAsk));
    console.log("El precio de compra en Lemon es de: " + formatter.format(lemon.totalAsk));

  }
  );