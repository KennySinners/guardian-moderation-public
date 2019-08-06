const fs = require('fs')

global.admin = '';
global.mod = '';
global.fun = '';
global.other = '';
global.eco = '';
global.util = '';
global.dev = '';

function Admin(path, client) {
    fs.readdir(path, (err, files) => {
        if (err) return console.log(err);
        let jsfile = files.filter(f => f.split('.').pop() === 'js')
        if (!jsfile || jsfile.length <= 0) {
            throw new error(`\n Cannot find files \n`)
        }
        let filesloaded = "\nCommands that were loaded: \n| ";

        jsfile.forEach((f, i) => {
            let file = require(`../${path}/${f}`)
            filesloaded += f + " | ";
            switch (file.help.group) {

                case 'admin':
                    admin += `**${file.help.dName}:** ${file.help.desc} | ` + '``' + file.help.usage + '``' + `\n`;
                    break;

                default:
                    console.log(`${f} does not have any help info`);
                    break;
            }
            client.commands.set(file.help.name, file);
        });

        if (admin === '') admin = 'None';
        console.log(`Administration: ${filesloaded} \n`);
    });
}

function Mod(path, client) {
    fs.readdir(path, (err, files) => {
        if (err) return console.log(err);
        let jsfile = files.filter(f => f.split('.').pop() === 'js')
        if (!jsfile || jsfile.length <= 0) {
            throw new error(`\n Cannot find files \n`)
        }
        let filesloaded = "\nCommands that were loaded: \n| ";

        jsfile.forEach((f, i) => {
            let file = require(`../${path}/${f}`)
            filesloaded += f + " | ";
            switch (file.help.group) {

                case 'mod':
                    mod += `**${file.help.dName}:** ${file.help.desc} | ` + '``' + file.help.usage + '``' + `\n`;
                    break;

                default:
                    console.log(`${f} does not have any help info`);
                    break;
            }
            client.commands.set(file.help.name, file);
        });

        if (mod === '') mod = 'None';
        console.log(`Moderation: ${filesloaded} \n`);
    });
}

function Other(path, client) {
    fs.readdir(path, (err, files) => {
        if (err) return console.log(err);
        let jsfile = files.filter(f => f.split('.').pop() === 'js')
        if (!jsfile || jsfile.length <= 0) {
            throw new error(`\n Cannot find files \n`)
        }
        let filesloaded = "\nCommands that were loaded: \n| ";

        jsfile.forEach((f, i) => {
            let file = require(`../${path}/${f}`)
            filesloaded += f + " | ";
            switch (file.help.group) {

                case 'other':
                    other += `**${file.help.dName}:** ${file.help.desc} | ` + '``' + file.help.usage + '``' + `\n`;
                    break;

                default:
                    console.log(`${f} does not have any help info`);
                    break;
            }
            client.commands.set(file.help.name, file);
        });

        if (other === '') other = 'None';
        console.log(`Other: ${filesloaded} \n`);
    });
}

function Eco(path, client) {
    fs.readdir(path, (err, files) => {
        if (err) return console.log(err);
        let jsfile = files.filter(f => f.split('.').pop() === 'js')
        if (!jsfile || jsfile.length <= 0) {
            throw new error(`\n Cannot find files \n`)
        }
        let filesloaded = "\nCommands that were loaded: \n| ";

        jsfile.forEach((f, i) => {
            let file = require(`../${path}/${f}`)
            filesloaded += f + " | ";
            switch (file.help.group) {

                case 'eco':
                    eco += `**${file.help.dName}:** ${file.help.desc} | ` + '``' + file.help.usage + '``' + `\n`;
                    break;

                default:
                    console.log(`${f} does not have any help info`);
                    break;
            }
            client.commands.set(file.help.name, file);
        });

        if (eco === '') eco = 'None';
        console.log(`Economy: ${filesloaded} \n`);
    });
}

function Fun(path, client) {
    fs.readdir(path, (err, files) => {
        if (err) return console.log(err);
        let jsfile = files.filter(f => f.split('.').pop() === 'js')
        if (!jsfile || jsfile.length <= 0) {
            throw new error(`\n Cannot find files \n`)
        }
        let filesloaded = "\nCommands that were loaded: \n| ";

        jsfile.forEach((f, i) => {
            let file = require(`../${path}/${f}`)
            filesloaded += f + " | ";
            switch (file.help.group) {

                case 'fun':
                    fun += `**${file.help.dName}:** ${file.help.desc} | ` + '``' + file.help.usage + '``' + `\n`;
                    break;

                default:
                    console.log(`${f} does not have any help info`);
                    break;
            }
            client.commands.set(file.help.name, file);
        });


        if (fun === '') fun = 'None';
        console.log(`Fun: ${filesloaded} \n`);
    });
}

function Util(path, client) {
    fs.readdir(path, (err, files) => {
        if (err) return console.log(err);
        let jsfile = files.filter(f => f.split('.').pop() === 'js')
        if (!jsfile || jsfile.length <= 0) {
            throw new error(`\n Cannot find files \n`)
        }
        let filesloaded = "\nCommands that were loaded: \n| ";

        jsfile.forEach((f, i) => {
            let file = require(`../${path}/${f}`)
            filesloaded += f + " | ";
            switch (file.help.group) {

                case 'util':
                    util += `**${file.help.dName}:** ${file.help.desc} | ` + '``' + file.help.usage + '``' + `\n`;
                    break;

                default:
                    console.log(`${f} does not have any help info`);
                    break;
            }
            client.commands.set(file.help.name, file);
        });

        if (util === '') util = 'None';
        console.log(`Utility: ${filesloaded} \n`);
    });
}

function Dev(path, client) {
    fs.readdir(path, (err, files) => {
        if (err) return console.log(err);
        let jsfile = files.filter(f => f.split('.').pop() === 'js')
        if (!jsfile || jsfile.length <= 0) {
            throw new error(`\n Cannot find files \n`)
        }
        let filesloaded = "\nCommands that were loaded: \n| ";

        jsfile.forEach((f, i) => {
            let file = require(`../${path}/${f}`)
            filesloaded += f + " | ";
            switch (file.help.group) {

                case 'dev':
                    dev += `**${file.help.dName}:** ${file.help.desc} | ` + '``' + file.help.usage + '``' + `\n`;
                   break;

                default:
                    console.log(`${f} does not have any help info`);
                    break;
            }
            client.commands.set(file.help.name, file);
        });

        if (dev === '') dev = 'None';
        console.log(`Developer: ${filesloaded} \n`);
    });
}


function Event(path, client) {


    fs.readdir(path, (err, files) => {
        if (err) return console.error(err);
        files.filter(file => {
            let eventFunction = require(`../${path}/${file}`);
            let eventName = file.split(".")[0];
            if (eventFunction.length <= 0) {
                console.log("No Events to load!")
                return
            }
            client.on(eventName, (...args) => eventFunction.run(client, ...args))
        });
        console.log(`[Events]\t Loaded a total amount of ${files.length} events!`);

    })

}


module.exports = {
    Admin,
    Mod,
    Util,
    Eco,
    Fun,
    Other,
    Dev,
    Event
}