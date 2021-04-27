const fetch = require("node-fetch");

const Discord = require("discord.js");

module.exports = {
  name: "corona",
  description: "Track a country or worldwide COVID-19 cases",
  aliases: ["covid-19", "covid"],
  async run(bot, message, args) {

    let countries = args.join(" ");

    const noArgs = new Discord.MessageEmbed()
      .setTitle("Missing arguments")
      .setColor(0xff0000)
      .setDescription("Please do >corona all or >corona <country name>")
      .setTimestamp();

    if (!args[0]) return message.channel.send(noArgs);

    if (args[0] === "all") {
      fetch(`https://covid19.mathdro.id/api`)
        .then(response => response.json())
        .then(data => {
          let confirmed = data.confirmed.value.toLocaleString();
          let recovered = data.recovered.value.toLocaleString();
          let deaths = data.deaths.value.toLocaleString();

          const embed = new Discord.MessageEmbed()
            .setTitle(`Worldwide COVID-19 Stats`)
            .addField("Confirmed Cases", confirmed)
            .addField("Recovered", recovered)
            .addField("Deaths", deaths)
            .setTimestamp()
            .setColor('RANDOM');
          message.channel.send(embed);
        });
    } else {
      let countries = args[0] // Your/someone countries prefix.
    
    fetch(`https://corona.lmao.ninja/v2/countries/${countries}`)
    .then(res => res.json())
    .then(data => {
      let country = data.country;
      let flag = data.countryInfo.flag; // Turns out -> Link.
      let confirmed = data.cases.toLocaleString();
      let todayconfirmed = data.todayCases.toLocaleString();
      let deaths = data.deaths.toLocaleString();
      let todaydeaths = data.todayDeaths.toLocaleString();
      let recovered = data.recovered.toLocaleString();
      let critical = data.critical.toLocaleString();
      let active = data.active.toLocaleString();
      // Add .toLocaleString() if you wanna separate 3 numbers with commas.
      
      const embed = new Discord.MessageEmbed()
      .setColor(0x1d1d1d)
      .setTimestamp(new Date())
      .setAuthor(`Covid-19 Stats for ${country}`, flag)
      .setDescription(`Confirmed: (Total: **${confirmed}** | Daily: **${todayconfirmed}**) \nDeaths*: (Total: **${deaths}** | Daily: **${todaydeaths}**) \nRecovered: **${recovered}** \nCritical: **${critical}** \nActive: **${data.active}**`) // Sorry a little bit more complex.
      
      message.channel.send(embed);
      // Let's test it out!
    })
        .catch(e => {
          return message.channel.send("Invalid country provided");
        });
    }
  }
};
