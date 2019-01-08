const mongoose = require("mongoose");

const Sensor = mongoose.model("sensors");

module.exports = app => {
  app.post("/api/iot/receiver", (req, res) => {
    const data = req.body.DevEUI_uplink;

    if (!data) {
      return res.send("No DATA");
    }

    new Sensor({
      Time: data.Time,
      DevEUI: data.DevEUI,
      DevAddr: data.DevAddr,
      FPort: data.FPort,
      FCntUp: data.FCntUp,
      ADRbit: data.ADRbit,
      MType: data.MType,
      FCntDn: data.FCntDn,
      payload_hex: data.payload_hex,
      mic_hex: data.mic_hex,
      Lrcid: data.Lrcid,
      LrrRSSI: data.LrrRSSI,
      LrrSNR: data.LrrSNR,
      SpFact: data.SpFact,
      SubBand: data.SubBand,
      Channel: data.Channel,
      DevLrrCnt: data.DevLrrCnt,
      Lrrid: data.Lrrid,
      Late: data.Late,
      LrrLAT: data.LrrLAT,
      LrrLON: data.LrrLON,
      Lrrs: JSON.stringify(data.Lrrs),
      CustomerID: data.CustomerID,
      CustomerData: JSON.stringify(data.CustomerData),
      ModelCfg: data.ModelCfg,
      InstantPER: data.InstantPER,
      MeanPER: data.MeanPER
    })
      .save()
      .then(() => {
        return res.send("IoT Received..");
      });
  });
};
