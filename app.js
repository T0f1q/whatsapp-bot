const express = require('express');
const fs = require("fs")
const app = express();
const port = 2023;

let kode_qr = "";

const {
    Client,
    NoAuth
} = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new NoAuth()
});

client.initialize();

client.on("qr", qr => {
    kode_qr = qr;
    console.log("Scan kode QR");
})

client.on('ready', () => {
    console.log("ready to message")
    kode_qr = "tersambung";
});
client.on('disconnected', (ression) => {
    console.log("Disconnected");
    client.initialize();

})

client.on('message', message => {
    if (message.body === 'ping') {
        message.reply(kode_qr);
    }
});

app.get('/', (req, res) => {
    res.send(
        '<html lang="en">' +
        '<head>' +
        '    <meta charset="UTF-8">' +
        '    <meta name="viewport" content="width=device-width, initial-scale=1.0">' +
        '    <title>Web Getway CBG</title>' +
        '    <!-- Bootstrap -->' +
        '    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/css/bootstrap.min.css" rel="stylesheet"' +
        '        integrity="sha384-4bw+/aepP/YC94hEpVNVgiZdgIC5+VKNBQNGCHeKRQN+PtmoHDEXuppvnDJzQIu9" crossorigin="anonymous">' +
        '    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.bundle.min.js"' +
        '        integrity="sha384-HwwvtgBNo3bZJJLYd8oVXjrBZt8cqVSpeBNS5n7C8IVInixGAoxmnlMuBnhbgrkm" crossorigin="anonymous">' +
        '    </script>' +
        '    <!-- Font Awesome -->' +
        '    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" integrity="sha512-z3gLpd7yknf1YoNbCzqRKc4qyor8gaKU1qmn+CShxbuBusANI9QpRohGBreCFkKxLhei6S9CQXFEbbKuqLg0DA==" crossorigin="anonymous" referrerpolicy="no-referrer" />' +
        '   <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/js/all.min.js" integrity="sha512-uKQ39gEGiyUJl4AI6L+ekBdGKpGw4xJ55+xyJG7YFlJokPNYegn9KwQ3P8A7aFQAUtUsAQHep+d/lrGqrbPIDQ==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>' +
        '    <style>' +
        '        .custom-loader {' +
        '            width: 50px;' +
        '            height: 50px;' +
        '            border-radius: 50%;' +
        '            background: conic-gradient(#0000 10%, #6df46d);' +
        '            -webkit-mask: radial-gradient(farthest-side, #0000 calc(100% - 8px), #000 0);' +
        '            animation: s3 1s infinite linear;' +
        '        }' +
        '        @keyframes s3 {' +
        '            to {' +
        '                transform: rotate(1turn)' +
        '            }' +
        '        }' +
        '    </style>' +
        '</head>' +
        '<body style="overflow: hidden;">' +
        '    <div class="w-100 bg-success" style="height: 200px;">' +
        '    </div>' +
        '    <div class="w-100 bg-dark" style="height: 100vh">' +
        '    </div>' +
        '    <p class="brand fs-3 fw-bolder text-white position-absolute" style="left: 10%; top: 5%;"><i' +
        '            class="fa-brands fa-whatsapp"></i> WHATSAPP BOT</p>' +
        '    <div class="position-fixed start-50 translate-middle w-75 bg-light rounded-4 shadow-lg border-1 p-5 row"' +
        '        style="height: 500px; top: 50%;">' +
        '        <div class="col-8">' +
        '            <h3 class="fw-light" style="margin-top: 3%; margin-left: 3%;">Gunakan Whatsapp untuk Web CBG</h3>' +
        '            <ol style="margin-top: 3%; margin-left: 3%;">' +
        '                <li>Buka whatsapp di telepon anda</li>' +
        '                <li>Ketuk <b><i class="fa-solid fa-ellipsis-vertical btn btn-secondary"></i> Menu</b> atau <b><i' +
        '                            class="fa-solid fa-gear btn btn-secondary"></i>' +
        '                        Setelan</b> dan pilih' +
        '                    <b>Perangkat Tertaut</b></li>' +
        '                <li>Ketuk <b>Tautkan perangkat</b></li>' +
        '                <li>Arahkan ponsel anda ke layar ini untuk memindai kode QR</li>' +
        '            </ol>' +
        '        </div>' +
        '        <div class="col-4">' +
        '            <div id="qrcode">' +
        '                <div align="center" id="loader">' +
        '                    <div class="custom-loader" style="margin-top: 30%;"></div>' +
        '                </div>' +
        '            </div>' +
        '        </div>' +
        '    </div>' +
        '    <script src="//cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>' +
        '    <script src="https://cdn.rawgit.com/davidshimjs/qrcodejs/gh-pages/qrcode.min.js"></script>' +
        '    <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js"' +
        '        integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous">' +
        '    </script>' +
        '    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.1/dist/js/bootstrap.min.js"' +
        '        integrity="sha384-Rx+T1VzGupg4BHQYs2gCW9It+akI2MM/mndMCy36UVfodzcJcF0GGLxZIzObiEfa" crossorigin="anonymous">' +
        '    </script>' +
        '    <script>' +
        '        var canvas = document.getElementById("qrcode");' +
        '        if ("' + kode_qr + '" != "") {' +
        '            document.getElementById("loader").setAttribute("hidden", "");' +
        '        }' +
        '       if("' + kode_qr + '" != "tersambung"){new QRCode(canvas, "' + kode_qr + '");} ' +
        '   else { canvas.innerHTML = "<p class=\'fw-bolder text-nowrap bg-success-subtle rounded-4\' style= \'text-align:center; margin-top:30%; \' >Perangkat sudah tersambung</p>" }' +
        'setInterval(() => {window.location.reload()}, 5000);' +
        '    </script>' +
        '</body>' +

        '</html>'

    );
})

app.get('/api', async (req, res) => {
    let nomer = req.query.nomer;
    let message = req.query.message;
    nomer = nomer + '@c.us'
    let statusKirim = false;

    client.sendMessage(nomer, message).then(() => {
        statusKirim = true;
    })

    setTimeout(() => {
        if (statusKirim == true) {
            res.send('<script>window.close()</script>')
        } else {
            res.json({
                StatusKirim: statusKirim,
                Tujuan: nomer,
                Pesan: message
            })
        }
    }, 3000);
})

app.listen(port, () => {
    console.log("Anda berjalan di port " + port);
})