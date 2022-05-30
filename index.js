const logger = new NIL.Logger(`test`);
const request = require(`sync-request`);
const path = require(`path`);

const config = JSON.parse(NIL.IO.readFrom(path.join(__dirname, `config.json`)));
const cmd = config.cmd;


function GET_Request(){
    const api = `https://v1.hitokoto.cn`;
    let obj = request(`GET`,api);
    let data = JSON.parse(obj.getBody(`utf8`));
    return data
}

class MagicHitokoto extends NIL.ModuleBase{
    onStart(api){
        logger.setTitle(`MagicHotokoto`);
        logger.info(`MagicHotokoto loaded!`);
        api.listen(`onMainMessageReceived`, (e) => {
            if (e.raw_message == cmd){
                let data = GET_Request();
                let hitokoto = `${data.hitokoto}`;
                let creator = `${data.creator}`;
                e.reply(`「` + hitokoto + `」\n———` + creator);
            }
        })
    }
}

module.exports = new MagicHitokoto