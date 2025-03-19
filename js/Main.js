// main.js
var editor;
var reader;

function init_helper() {
    // Función de ayuda (puede ser eliminada si no se usa)
}

function charge(a) {
    $.ajax({
        url: a.trim() + ".logo",
        dataType: "text",
        success: function (b) {
            if ((b.indexOf("{") >= 0) && (b.indexOf("}") >= 0)) {
                b = logo.importe(b);
            }
            exeditor.setValue(b);
            exeditor.scrollToLine(1, true, true);
            exeditor.gotoLine(1, 0, false);
            exeditor.clearSelection();
            exeditor.focus();
        }
    });
}

function maj_him() {
    if (logo) {
        switch (logo.etat) {
            case "encours":
                $("#play").button({
                    label: "Pausar",
                    icons: {
                        primary: "ui-icon-pause"
                    }
                });
                $("#stop").button({
                    label: "Parar",
                    icons: {
                        primary: "ui-icon-stop"
                    }
                });
                break;
            case "pause":
                $("#play").button({
                    label: "Continuar",
                    icons: {
                        primary: "ui-icon-seek-next"
                    }
                });
                $("#stop").button({
                    label: "Parar",
                    icons: {
                        primary: "ui-icon-stop"
                    }
                });
                break;
            default:
                $("#play").button({
                    label: "Ejecutar",
                    icons: {
                        primary: "ui-icon-play"
                    }
                });
                $("#stop").button({
                    label: "Borrar pizarra",
                    icons: {
                        primary: "ui-icon-home"
                    }
                });
        }
    }
}

function prepare_download(a, d) {
    var c;
    if (d === "svg") {
        c = ace.edit("editor_es").getValue().trim();
        if (c.length > 0) {
            c = logo.exporte(c);
        }
        c = logo.tortues[0].dessin.toSVG(true, c);
        a.href = "data:text/plain;charset=utf-8," + encodeURIComponent(c);
        a.download = "LWlogo.svg";
    } else if (d === "png") {
        if (logo.troisD) {
            a.href = logo.troisD.renderer.domElement.toDataURL("image/png");
            a.download = "Logo3D.png";
        } else {
            var b = document.getElementById("dessin");
            a.href = b.toDataURL();
            a.download = "Logo2D.png";
        }
    }
}

function SaveToDisk(b, e) {
    if (!window.ActiveXObject) {
        var c = document.createElement("a");
        c.href = b;
        c.target = "_blank";
        c.download = e || b;
        var a = document.createEvent("MouseEvents");
        a.initMouseEvent("click", true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
        c.dispatchEvent(a);
        (window.URL || window.webkitURL).revokeObjectURL(c.href);
    } else if (!!window.ActiveXObject && document.execCommand) {
        var d = window.open(b, "_blank");
        d.document.close();
        d.document.execCommand("SaveAs", true, e || b);
        d.close();
    }
}

$(function () {
    $(document).ready(function () {
        exeditor = ace.edit("exeditor_es");
        editor = ace.edit("editor_es");
        logo = new LWLogo();
        logo.editeur = editor;
        $("#tabs").tabs();
        $("#play").button({
            text: true,
            disabled: false,
            label: "Ejecutar",
            icons: {
                primary: "ui-icon-play"
            }
        }).click(function () {
            switch (logo.etat) {
                case "pause":
                case "encours":
                    logo.pause();
                    break;
                default:
                    var g = [];
                    g[0] = "code";
                    g[1] = editor.getValue();
                    try {
                        sessionStorage.setItem("LW-logo", g[1]);
                    } catch (h) {
                        console.log(h);
                    } finally {
                        logo.run(g[1]);
                    }
            }
            maj_him();
        });
        $("#stop").button({
            text: true,
            disabled: false,
            label: "Parar",
            icons: {
                primary: "ui-icon-stop"
            }
        }).click(function () {
            switch (logo.etat) {
                case "pause":
                case "encours":
                    logo.stop();
                    break;
                default:
                    logo.reinitialise();
                    break;
            }
            maj_him();
        });
        $("#charger").button({
            text: true,
            disabled: false,
            label: "Cargar",
        }).click(function () {

            var seleccionado = $("#files :selected").val();
            var codigoLogoEjemplo;

            switch (seleccionado) {
                case "bases":
                    codigoLogoEjemplo = "BORRAPANTALLA \n" +
                        "MUESTRA [ quelques dessins avec les fonctions de base ] \n" +
                        "SUBELAPIZ \n" +
                        "PONPOS [ -300 20 ] PONRUMBO 0 \n" +
                        "BAJALAPIZ \n" +
                        "PONCOLORLAPIZ NEGRO \n" +
                        "PONGROSOR 3 \n" +
                        "AVANZA 80 GIRAIZQUIERDA 90 AVANZA 80 GIRAIZQUIERDA 90 AVANZA 80 GIRAIZQUIERDA 90 AVANZA 80 \n" +
                        "ESPERA 20 \n" +
                        "SUBELAPIZ \n" +
                        "PONPOS [ -200 20 ] PONRUMBO 0 \n" +
                        "BAJALAPIZ \n" +
                        "PONCOLORLAPIZ ROJO \n" +
                        "REPITE 4 [ AVANZA 80 GIRAIZQUIERDA 90 ] \n" +
                        "ESPERA 20 \n" +
                        "SUBELAPIZ \n" +
                        "PONPOS [ -100 20 ] PONRUMBO 0 \n" +
                        "BAJALAPIZ \n" +
                        "REPITE 4 [ REPITE 4 \n" +
                        "[ PONCOLORLAPIZ [ ( AZAR 255 ) ( AZAR 255 ) ( AZAR 255 ) ] \n" +
                        "REPITE 4 [ AVANZA 80 - CUENTAREPITE \n" +
                        "GIRAIZQUIERDA 90 ] ] ] \n" +
                        "ESPERA 20 \n" +
                        "SUBELAPIZ \n" +
                        "PONPOS [ 0 20 ] PONRUMBO 0 \n" +
                        "BAJALAPIZ \n" +
                        "PONCOLORLAPIZ AZUL \n" +
                        "PONGROSOR 4 \n" +
                        "GIRAIZQUIERDA 30 AVANZA 100 GIRAIZQUIERDA 120 AVANZA 100 GIRAIZQUIERDA 120 AVANZA 100 \n" +
                        "ESPERA 20 \n" +
                        "SUBELAPIZ \n" +
                        "PONPOS [ 120 70 ] PONRUMBO 0 \n" +
                        "BAJALAPIZ \n" +
                        "PONCOLORLAPIZ AMARILLO \n" +
                        "PONGROSOR 5 \n" +
                        "REPITE 36 [ AVANZA 10 GIRAIZQUIERDA 10 ] \n" +
                        "ESPERA 20 \n" +
                        "SUBELAPIZ \n" +
                        "PONPOS [ -300 -110 ] PONRUMBO 0 \n" +
                        "BAJALAPIZ \n" +
                        "PONCOLORLAPIZ NEGRO \n" +
                        "PONGROSOR 5 \n" +
                        "REPITE 6 [ AVANZA 40 GIRAIZQUIERDA 60 ] \n" +
                        "ESPERA 20 \n" +
                        "SUBELAPIZ \n" +
                        "PONPOS [ -200 -110 ] PONRUMBO 0 \n" +
                        "BAJALAPIZ \n" +
                        "PONCOLORLAPIZ CIAN \n" +
                        "PONGROSOR 7 \n" +
                        "REPITE 5 [ AVANZA 50 GIRAIZQUIERDA 360 / 5 ] \n" +
                        "ESPERA 20 \n" +
                        "SUBELAPIZ \n" +
                        "PONPOS [ -100 -130 ] \n" +
                        "BAJALAPIZ \n" +
                        "PONCOLORLAPIZ CIAN \n" +
                        "PONGROSOR 5 \n" +
                        "REPITE 7 [ SUBELAPIZ \n" +
                        "PONRUMBO -19 \n" +
                        "PONX 5 * CUENTAREPITE - 100 \n" +
                        "PONY 5 * CUENTAREPITE - 130 \n" +
                        "BAJALAPIZ \n" +
                        "HAZ \"taille 80 - 10 * CUENTAREPITE \n" +
                        "PONCOLORLAPIZ [ ( AZAR 255 ) ( AZAR 255 ) ( AZAR 255 ) ] \n" +
                        "REPITE 5 [ AVANZA :TAILLE GIRAIZQUIERDA 360 / 5 ] ] \n" +
                        "ESPERA 20 \n" +
                        "REPITE 8 [ SUBELAPIZ \n" +
                        "PONX 20 \n" +
                        "PONY CUENTAREPITE * -15 \n" +
                        "BAJALAPIZ \n" +
                        "PONGROSOR AZAR 10 \n" +
                        "PONCOLORLAPIZ [ ( AZAR 255 ) ( AZAR 255 ) ( AZAR 255 ) ] \n" +
                        "PONRUMBO 90 \n" +
                        "AVANZA 200 ] \n" +
                        "ESPERA 20 \n" +
                        "SUBELAPIZ \n" +
                        "PONPOS [ 300 -200 ] \n" +
                        "PONRUMBO -90 \n" +
                        "BAJALAPIZ \n" +
                        "REPITE 2 [ REPITE 67 [ PONGROSOR AZAR 10 \n" +
                        "PONCOLORLAPIZ [ ( AZAR 255 ) ( AZAR 255 ) ( AZAR 255 ) ] \n" +
                        "AVANZA 10 ] GIRAIZQUIERDA 90 \n" +
                        "REPITE 40 [ PONGROSOR AZAR 20 \n" +
                        "PONCOLORLAPIZ [ ( AZAR 255 ) ( AZAR 255 ) ( AZAR 255 ) ] \n" +
                        "AVANZA 10 ] GIRAIZQUIERDA 90 ] \n" +
                        "SUBELAPIZ \n" +
                        "PONPOS [ 0 0 ] \n" +
                        "PONRUMBO 0 \n" +
                        "ESPERA 20 \n" +
                        "MUESTRA [ termine! ] ";
                    break;
                case "dessin":
                    codigoLogoEjemplo = "; From http://zhihua-lai.com/?do=Software.Logo#examples \n" +
                        "; hello, world \n" +
                        "PARA helloworld \n" +
                        "    AVANZA 20 GIRADERECHA 180 \n" +
                        "    AVANZA 40 GIRADERECHA 180 \n" +
                        "    AVANZA 20 GIRAIZQUIERDA 90 \n" +
                        "    AVANZA 20 GIRADERECHA 90 \n" +
                        "    AVANZA 20 GIRADERECHA 180 \n" +
                        "    AVANZA 40 GIRADERECHA 90 \n" +
                        "    AVANZA 20 GIRADERECHA 90 \n" +
                        "    AVANZA 20 GIRAIZQUIERDA 90 \n" +
                        "    AVANZA 20 GIRAIZQUIERDA 90 \n" +
                        "    AVANZA 10 GIRAIZQUIERDA 90 \n" +
                        "    AVANZA 20 GIRADERECHA 90 \n" +
                        "    AVANZA 10 GIRADERECHA 90 \n" +
                        "    AVANZA 30 GIRADERECHA 90 \n" +
                        "    AVANZA 40 GIRADERECHA 180 \n" +
                        "    AVANZA 40 GIRADERECHA 90 \n" +
                        "    AVANZA 20 GIRADERECHA 90 \n" +
                        "    AVANZA 40 GIRADERECHA 180 \n" +
                        "    AVANZA 40 GIRADERECHA 90 \n" +
                        "    AVANZA 40 GIRADERECHA 90 \n" +
                        "    AVANZA 20 GIRADERECHA 90 \n" +
                        "    AVANZA 20 GIRADERECHA 90 \n" +
                        "    AVANZA 20 GIRADERECHA 90 \n" +
                        "    AVANZA 60 GIRADERECHA 90 \n" +
                        "    AVANZA 40 GIRADERECHA 180 \n" +
                        "    AVANZA 40 GIRADERECHA 90 \n" +
                        "    AVANZA 20 GIRADERECHA 90 \n" +
                        "    AVANZA 20 GIRADERECHA 180 \n" +
                        "    AVANZA 20 GIRADERECHA 90 \n" +
                        "    AVANZA 20 GIRADERECHA 90 \n" +
                        "    AVANZA 40 GIRADERECHA 180 \n" +
                        "    AVANZA 40 GIRADERECHA 90 \n" +
                        "    AVANZA 40 GIRADERECHA 90 \n" +
                        "    AVANZA 20 GIRADERECHA 90 \n" +
                        "    AVANZA 20 GIRADERECHA 90 \n" +
                        "    AVANZA 20 GIRADERECHA 90 \n" +
                        "    AVANZA 40 GIRADERECHA 90 \n" +
                        "    AVANZA 20 GIRAIZQUIERDA 90 \n" +
                        "    AVANZA 20 GIRAIZQUIERDA 90 \n" +
                        "    AVANZA 5 GIRADERECHA 90 \n" +
                        "    AVANZA 5 GIRADERECHA 90 \n" +
                        "    AVANZA 25 GIRADERECHA 180 \n" +
                        "    AVANZA 40 GIRADERECHA 90 \n" +
                        "    AVANZA 40 GIRADERECHA 90 \n" +
                        "    AVANZA 20 GIRADERECHA 90 \n" +
                        "    AVANZA 20 GIRADERECHA 90 \n" +
                        "    AVANZA 20 GIRADERECHA 90 \n" +
                        "    AVANZA 20 GIRADERECHA 90 \n" +
                        "    AVANZA 40 GIRADERECHA 180 \n" +
                        "    AVANZA 40 \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "GIRADERECHA 90 SUBELAPIZ AVANZA 200 BAJALAPIZ GIRAIZQUIERDA 90 helloworld \n" +
                        "PONRUMBO 180 \n" +
                        "SUBELAPIZ AVANZA 100 \n" +
                        "MUESTRA [ hello world! ] \n" +
                        "; Olivier Schmidt-Chevalier \n" +
                        "; http://Olivier.sc.free.fr/ \n" +
                        "PARA diag :DIM \n" +
                        "    REPITE 4 [ AVANZA :DIM GIRAIZQUIERDA 90 ] \n" +
                        "    GIRAIZQUIERDA 45 \n" +
                        "    AVANZA :DIM * 1.41 \n" +
                        "    GIRADERECHA 45 RETROCEDE :DIM GIRADERECHA 45 \n" +
                        "    AVANZA :DIM * 1.41 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA corrigarc :DIM :QUANT \n" +
                        "    AVANZA :DIM * :QUANT \n" +
                        "    GIRAIZQUIERDA :QUANT \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA arcd :DIM :DEG \n" +
                        "    REPITE ( DIVISION :DEG 10 ) [ AVANZA :DIM * 10 GIRAIZQUIERDA 10 ] \n" +
                        "    corrigarc :DIM ( RESTO :DEG 10 ) \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA arcdroit :RAYON :DEG \n" +
                        "    GIRAIZQUIERDA 5 \n" +
                        "    arcd :RAYON * 0.0174 :DEG \n" +
                        "    GIRADERECHA 5 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA arcgauche :RAYON :DEG \n" +
                        "    GIRADERECHA 5 \n" +
                        "    arcd :RAYON * 0.0174 :DEG \n" +
                        "    GIRAIZQUIERDA 5 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA rayon :DIM \n" +
                        "    arcgauche :DIM 90 \n" +
                        "    arcdroit :DIM 90 \n" +
                        "    arcgauche :DIM 90 \n" +
                        "    arcdroit :DIM 90 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA bosol :DIM \n" +
                        "    REPITE 20 [ rayon :DIM GIRAIZQUIERDA 170 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "PONCOLORLAPIZ ROJO PONGROSOR 2 \n" +
                        "bosol 70 \n" +
                        "OCULTATORTUGA \n" +
                        "; Periskopov RACEK / Ferdinand and LOGO \n" +
                        "; (http://vlado.fmf.uni-lj.si/educa/logo/goto.htm) \n" +
                        "; (c)1991,1996 V. Batagelj \n" +
                        "; Letter step by step (Eulerian path) \n" +
                        "PARA lettre \n" +
                        "    BORRAPANTALLA SUBELAPIZ PONPOS [ -200 -120 ] BAJALAPIZ OCULTATORTUGA \n" +
                        "    PONGROSOR 5 PONCOLORLAPIZ [ 0 0 255 ] \n" +
                        "    PONPOS [ 0 -40 ] ESPERA 100 PONPOS [ -200 40 ] ESPERA 100 \n" +
                        "    PONPOS [ 0 120 ] ESPERA 100 PONPOS [ 200 40 ] ESPERA 100 \n" +
                        "    PONPOS [ 200 -120 ] ESPERA 100 PONPOS [ -200 -120 ] ESPERA 100 \n" +
                        "    PONPOS [ -200 40 ] ESPERA 100 PONPOS [ 200 40 ] ESPERA 100 \n" +
                        "    PONPOS [ 0 -40 ] ESPERA 100 PONPOS [ 200 -120 ] \n" +
                        "    PONCOLORLAPIZ [ 0 0 0 ] PONGROSOR 1 \n" +
                        "    SUBELAPIZ \n" +
                        "    CENTRO \n" +
                        "    BAJALAPIZ \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "lettre \n" +
                        "PARA skip :SIZE \n" +
                        "    SUBELAPIZ AVANZA :SIZE * 1.5 BAJALAPIZ \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA parallel :SIZE \n" +
                        "    REPITE 2 [ AVANZA :SIZE GIRAIZQUIERDA 120 AVANZA :SIZE / 2 GIRAIZQUIERDA 60 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA tri :SIZE \n" +
                        "    REPITE 3 [ parallel :SIZE GIRAIZQUIERDA 120 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA return :SIZE :LENGTH \n" +
                        "    REPITE :LENGTH [ tri :SIZE GIRADERECHA 60 skip :SIZE GIRAIZQUIERDA 60 ] \n" +
                        "    tri :SIZE \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA along :SIZE :LENGTH \n" +
                        "    REPITE :LENGTH [ tri :SIZE GIRAIZQUIERDA 120 skip :SIZE GIRADERECHA 120 ] \n" +
                        "    tri :SIZE \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA pattern1 :SIZE :LENGTH \n" +
                        "    along :SIZE :LENGTH \n" +
                        "    skip :SIZE return :SIZE :LENGTH \n" +
                        "    skip :SIZE \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA lattice :SIZE :LENGTH :DEPTH \n" +
                        "    SUBELAPIZ PONPOS [ -100 ( -75 ) ] GIRADERECHA 30 BAJALAPIZ \n" +
                        "    REPITE :DEPTH [ pattern1 :SIZE :LENGTH ] \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "MUESTRATORTUGA \n" +
                        "lattice 30 8 4 \n" +
                        "; Le dessin d'un chateau-fort \n" +
                        "; Le dessin de la tour \n" +
                        "PARA tour \n" +
                        "    PONRUMBO 0 \n" +
                        "    BAJALAPIZ \n" +
                        "    AVANZA 200 \n" +
                        "    REPITE 4 [ GIRAIZQUIERDA 90 AVANZA 10 GIRAIZQUIERDA 90 AVANZA 20 GIRADERECHA 90 AVANZA 10 GIRADERECHA 90 AVANZA 20 ] \n" +
                        "    GIRAIZQUIERDA 90 AVANZA 10 PONRUMBO 0 RETROCEDE 200 \n" +
                        "FIN\n" +
                        "\n" +
                        "; Le dessin des créneaux \n" +
                        "PARA creneaux \n" +
                        "    REPITE 4 [ GIRAIZQUIERDA 90 AVANZA 10 GIRAIZQUIERDA 90 AVANZA 20 GIRADERECHA 90 AVANZA 10 GIRADERECHA 90 AVANZA 20 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "; Le dessin du chateau \n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "SUBELAPIZ \n" +
                        "PONPOS [ -100 0 ] \n" +
                        "BAJALAPIZ \n" +
                        "tour AVANZA 100 creneaux RETROCEDE 100 tour \n" +
                        "GIRADERECHA 90 AVANZA 260 \n" +
                        "GIRAIZQUIERDA 90 \n" +
                        "; Escargot \n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "PONCOLORLAPIZ AZUL PONGROSOR 2 \n" +
                        "HAZ \"CPT 1 \n" +
                        "REPITE 550 \n" +
                        "[ AVANZA 0.01 * :CPT GIRAIZQUIERDA 3 HAZ \"CPT :CPT + 1 ] \n" +
                        "GIRADERECHA 120 AVANZA 70 \n" +
                        "GIRADERECHA 20 AVANZA 20 \n" +
                        "REPITE 3 [ GIRAIZQUIERDA 30 AVANZA 10 \n" +
                        "GIRAIZQUIERDA 30 AVANZA 10 ] \n" +
                        "GIRAIZQUIERDA 20 \n" +
                        "AVANZA 170 \n" +
                        "SUBELAPIZ \n" +
                        "RETROCEDE 175 \n" +
                        "GIRAIZQUIERDA 90 \n" +
                        "AVANZA 37 \n" +
                        "BAJALAPIZ \n" +
                        "GIRAIZQUIERDA 30 AVANZA 30 RETROCEDE 30 \n" +
                        "GIRAIZQUIERDA 15 AVANZA 30 \n" +
                        "PARA starmove :SIZE \n" +
                        "    AVANZA :SIZE * 1.618 \n" +
                        "    GIRAIZQUIERDA 36 \n" +
                        "    AVANZA :SIZE * 1.618 \n" +
                        "    GIRAIZQUIERDA 180 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA rt_dart :SIDE \n" +
                        "    AVANZA :SIDE * 1.616 \n" +
                        "    GIRAIZQUIERDA 108 AVANZA :SIDE * 1.618 \n" +
                        "    GIRAIZQUIERDA 144 AVANZA :SIDE \n" +
                        "    GIRADERECHA 36 AVANZA :SIDE \n" +
                        "    GIRAIZQUIERDA 144 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA lt_kite :SIDE \n" +
                        "    AVANZA :SIDE * 1.618 GIRADERECHA 108 \n" +
                        "    AVANZA :SIDE * 1.618 GIRADERECHA 108 \n" +
                        "    AVANZA :SIDE GIRADERECHA 36 \n" +
                        "    AVANZA :SIDE GIRADERECHA 108 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA rt_kite :SIDE \n" +
                        "    AVANZA :SIDE * 1.618 GIRAIZQUIERDA 108 \n" +
                        "    AVANZA :SIDE * 1.618 GIRAIZQUIERDA 108 \n" +
                        "    AVANZA :SIDE GIRAIZQUIERDA 36 \n" +
                        "    AVANZA :SIDE GIRAIZQUIERDA 108 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA big_kite :SIZE \n" +
                        "    AVANZA :SIZE * 1.618 \n" +
                        "    GIRAIZQUIERDA 144 AVANZA :SIZE GIRADERECHA 108 \n" +
                        "    lt_kite :SIZE \n" +
                        "    rt_kite :SIZE \n" +
                        "    GIRAIZQUIERDA 72 AVANZA :SIZE GIRAIZQUIERDA 144 \n" +
                        "    rt_dart :SIZE \n" +
                        "    AVANZA :SIZE * 1.618 \n" +
                        "    GIRAIZQUIERDA 108 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA star :SIZE :SEGMENTS \n" +
                        "    REPITE :SEGMENTS [ big_kite :SIZE GIRAIZQUIERDA 72 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA expand :SIZE \n" +
                        "    star :SIZE 5 \n" +
                        "    AVANZA :SIZE + :SIZE * 1.618 GIRADERECHA 108 \n" +
                        "    REPITE 5 [ star :SIZE 3 starmove :SIZE ] \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "MUESTRATORTUGA \n" +
                        "PONCOLORLAPIZ ROJO \n" +
                        "expand 25 \n" +
                        "; ; Olivier Schmidt-Chevalier (http://Olivier.sc.free.fr/) \n" +
                        "PARA mur :T \n" +
                        "    REPITE 4 [ AVANZA :T GIRAIZQUIERDA 90 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA toit :T \n" +
                        "    REPITE 3 [ AVANZA :T GIRAIZQUIERDA 120 ] \n" +
                        "    GIRAIZQUIERDA 30 SUBELAPIZ AVANZA 10 BAJALAPIZ SUBELAPIZ RETROCEDE 10 GIRADERECHA 30 BAJALAPIZ \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA maison :T \n" +
                        "    mur :T AVANZA :T GIRAIZQUIERDA 30 PONCOLORLAPIZ [ 255 0 0 ] toit :T \n" +
                        "    SUBELAPIZ GIRADERECHA 30 RETROCEDE :T GIRAIZQUIERDA 90 AVANZA :T GIRADERECHA 90 BAJALAPIZ \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA rue \n" +
                        "    SUBELAPIZ GIRAIZQUIERDA 90 AVANZA 10 GIRADERECHA 90 BAJALAPIZ \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA tronc \n" +
                        "    REPITE 15 [ AVANZA 200 RETROCEDE 200 GIRAIZQUIERDA 90 AVANZA 1 GIRADERECHA 90 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA feuil \n" +
                        "    REPITE 360 [ AVANZA 50 RETROCEDE 50 GIRAIZQUIERDA 1 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA arbre \n" +
                        "    PONCOLORLAPIZ [ 153 151 0 ] tronc AVANZA 180 GIRADERECHA 90 AVANZA 8 GIRAIZQUIERDA 45 PONCOLORLAPIZ [ 0 153 0 ] feuil \n" +
                        "    SUBELAPIZ PONRUMBO 0 RETROCEDE 180 GIRAIZQUIERDA 90 AVANZA 8 GIRADERECHA 90 BAJALAPIZ \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA soleil \n" +
                        "    PONCOLORLAPIZ [ 255 255 0 ] \n" +
                        "    REPITE 360 [ BAJALAPIZ AVANZA 40 BAJALAPIZ AVANZA 1 SUBELAPIZ RETROCEDE 41 GIRAIZQUIERDA 1 BAJALAPIZ ] \n" +
                        "    REPITE 60 [ SUBELAPIZ AVANZA 40 BAJALAPIZ AVANZA 35 SUBELAPIZ RETROCEDE 75 GIRAIZQUIERDA 6 BAJALAPIZ ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA vilag \n" +
                        "    GIRADERECHA 90 AVANZA 318 RETROCEDE 637 GIRAIZQUIERDA 45 SUBELAPIZ AVANZA 15 PONCOLORLAPIZ [ 204 153 32 ] BAJALAPIZ \n" +
                        "    SUBELAPIZ RETROCEDE 15 GIRADERECHA 45 BAJALAPIZ SUBELAPIZ GIRADERECHA 45 AVANZA 15 PONCOLORLAPIZ [ 64 128 64 ] RETROCEDE 15 \n" +
                        "    GIRAIZQUIERDA 45 BAJALAPIZ SUBELAPIZ PONPOS [ 0 0 ] PONRUMBO 0 GIRADERECHA 90 AVANZA 260 GIRAIZQUIERDA 90 RETROCEDE 140 BAJALAPIZ \n" +
                        "    PONCOLORLAPIZ [ 64 64 64 ] maison 65 rue PONCOLORLAPIZ [ 10 11 12 ] maison 45 rue rue \n" +
                        "    PONCOLORLAPIZ [ 64 64 64 ] maison 55 rue PONCOLORLAPIZ [ 11 12 13 ] maison 35 rue \n" +
                        "    PONCOLORLAPIZ [ 64 64 64 ] maison 75 REPITE 6 [ rue ] arbre \n" +
                        "    REPITE 11 [ rue ] arbre \n" +
                        "    SUBELAPIZ PONPOS [ 0 0 ] PONRUMBO 0 GIRADERECHA 90 AVANZA 160 GIRAIZQUIERDA 90 AVANZA 90 BAJALAPIZ soleil \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "MUESTRATORTUGA \n" +
                        "vilag \n" +
                        "OCULTATORTUGA \n" +
                        "; Etoiles \n" +
                        "PARA etoile \n" +
                        "    AVANZA 200 \n" +
                        "    GIRAIZQUIERDA 45 \n" +
                        "    AVANZA 50 \n" +
                        "    GIRAIZQUIERDA 124 \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "PONPOS [ 0 -100 ] \n" +
                        "REPITE 100 [ etoile ] \n" +
                        "; Jean-Louis Noel (Communauté scolaire St Benoit) \n" +
                        "; http://www.stben.net/logo/math.html \n" +
                        "PARA spirale :W :A :X :C :WW \n" +
                        "    SI :C = 0 [ ALTO ] \n" +
                        "    PONGROSOR :WW \n" +
                        "    PONCOLORLAPIZ [ ( 255 - :W * 2 ) 0 ( :W * 2 ) ] \n" +
                        "    GIRADERECHA :X \n" +
                        "    AVANZA :W \n" +
                        "    SUBELAPIZ \n" +
                        "    RETROCEDE :W \n" +
                        "    GIRAIZQUIERDA :X \n" +
                        "    AVANZA :W \n" +
                        "    BAJALAPIZ \n" +
                        "    GIRAIZQUIERDA :A \n" +
                        "    spirale :W + 1 :A :X + 0.7 :C - 1 :WW + 0.1 \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "spirale 1 30 10 90 1 \n" +
                        "; D'après Periskopov RACEK / Ferdinand and LOGO \n" +
                        "; (http://vlado.fmf.uni-lj.si/educa/logo/goto.htm) \n" +
                        "; \n" +
                        "; Olympic circles (idea Urska Lesjak). \n" +
                        "; 1991,1996 V. Batagelj \n" +
                        "PARA krog \n" +
                        "    REPITE 360 [ AVANZA 70 BAJALAPIZ AVANZA 7 SUBELAPIZ RETROCEDE 77 GIRADERECHA 1 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA olymp \n" +
                        "    BORRAPANTALLA \n" +
                        "    PONGROSOR 2 \n" +
                        "    SUBELAPIZ AVANZA 50 GIRAIZQUIERDA 90 \n" +
                        "    AVANZA 165 GIRADERECHA 90 PONCOLORLAPIZ [ 255 0 0 ] krog \n" +
                        "    GIRADERECHA 90 PONCOLORLAPIZ [ 180 180 180 ] AVANZA 165 krog \n" +
                        "    PONCOLORLAPIZ [ 0 0 255 ] AVANZA 165 krog \n" +
                        "    PONCOLORLAPIZ [ 255 255 0 ] GIRAIZQUIERDA 40 RETROCEDE 110 GIRAIZQUIERDA 140 krog \n" +
                        "    AVANZA 165 PONCOLORLAPIZ [ 0 255 0 ] krog \n" +
                        "    PONCOLORLAPIZ [ 0 0 0 ] PONGROSOR 1 SUBELAPIZ \n" +
                        "    CENTRO BAJALAPIZ \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "MUESTRATORTUGA \n" +
                        "olymp ";
                    break;
                case "rudge":
                    codigoLogoEjemplo = "; From \"Introductory Programming Using Logo\" by Simone Rudge. \n" +
                        "; \n" +
                        "PARA border \n" +
                        "    BORRAPANTALLA OCULTATORTUGA \n" +
                        "    SUBELAPIZ GIRADERECHA 90 AVANZA 200 GIRADERECHA 90 AVANZA 100 GIRADERECHA 180 BAJALAPIZ \n" +
                        "    braid \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA braid \n" +
                        "    HAZ \"SQR2 1.4 ; square root of 2 \n" +
                        "    HAZ \"HFSQ2 0.7 ; half the square root of 2 \n" +
                        "    HAZ \"s2 8.5 ; square root of 2 * 6 \n" +
                        "    HAZ \"h2 4.2 ; half the square root of 2 * 6 \n" +
                        "    HAZ \"s2h2 12.7 ; s2 + h2 \n" +
                        "    SUBELAPIZ AVANZA 24 GIRAIZQUIERDA 45 AVANZA 4.2 PONRUMBO 0 BAJALAPIZ \n" +
                        "    REPITE 2 [ strip 20 corner strip 30 corner ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA corner \n" +
                        "    GIRADERECHA 45 AVANZA :H2 GIRAIZQUIERDA 45 AVANZA 6 \n" +
                        "    GIRAIZQUIERDA 45 AVANZA :S2 GIRAIZQUIERDA 45 AVANZA 18 \n" +
                        "    GIRAIZQUIERDA 45 AVANZA :S2H2 SUBELAPIZ \n" +
                        "    GIRAIZQUIERDA 90 AVANZA :H2 BAJALAPIZ GIRAIZQUIERDA 90 AVANZA :S2 \n" +
                        "    GIRADERECHA 45 AVANZA 18 GIRADERECHA 90 AVANZA 6 SUBELAPIZ \n" +
                        "    GIRADERECHA 45 AVANZA :S2 BAJALAPIZ GIRADERECHA 90 AVANZA 17 SUBELAPIZ \n" +
                        "    GIRAIZQUIERDA 90 AVANZA :H2 BAJALAPIZ GIRAIZQUIERDA 90 AVANZA 17 SUBELAPIZ \n" +
                        "    GIRAIZQUIERDA 45 AVANZA 6 GIRAIZQUIERDA 90 AVANZA 12 BAJALAPIZ \n" +
                        "    GIRAIZQUIERDA 45 AVANZA :H2 GIRAIZQUIERDA 45 AVANZA 6 \n" +
                        "    GIRAIZQUIERDA 45 AVANZA :H2 SUBELAPIZ GIRAIZQUIERDA 90 AVANZA :H2 BAJALAPIZ \n" +
                        "    GIRAIZQUIERDA 45 AVANZA 6 SUBELAPIZ RETROCEDE 15 GIRAIZQUIERDA 90 AVANZA 9 GIRAIZQUIERDA 90 BAJALAPIZ \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA start \n" +
                        "    ; Here's a simple procedure that puts a braided border \n" +
                        "    ; around the edge of the screen. You can change the size \n" +
                        "    ; of the border by changing the variable used by strip \n" +
                        "    border \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA strip :N \n" +
                        "    REPITE :N \n" +
                        "    [ GIRADERECHA 45 AVANZA :H2 GIRAIZQUIERDA 45 AVANZA 6 GIRAIZQUIERDA 45 AVANZA :S2H2 \n" +
                        "    SUBELAPIZ GIRAIZQUIERDA 90 AVANZA :H2 BAJALAPIZ GIRAIZQUIERDA 90 AVANZA :S2 GIRADERECHA 45 AVANZA 6 SUBELAPIZ \n" +
                        "    GIRADERECHA 45 AVANZA :S2H2 BAJALAPIZ GIRADERECHA 90 AVANZA :H2 GIRADERECHA 45 \n" +
                        "    AVANZA 6 GIRADERECHA 45 AVANZA :S2H2 SUBELAPIZ GIRADERECHA 90 AVANZA :H2 BAJALAPIZ GIRADERECHA 90 \n" +
                        "    AVANZA :S2 GIRAIZQUIERDA 45 AVANZA 6 SUBELAPIZ GIRAIZQUIERDA 135 AVANZA :S2H2 GIRAIZQUIERDA 45 \n" +
                        "    AVANZA 6 BAJALAPIZ ] \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "start \n" +
                        "; ********************************************************************** \n" +
                        "PARA border1 \n" +
                        "    SUBELAPIZ RETROCEDE 160 GIRAIZQUIERDA 90 GIRADERECHA 90 BAJALAPIZ \n" +
                        "    REPITE 2 [ REPITE 6 [ pattern ] SUBELAPIZ AVANZA 30 BAJALAPIZ GIRADERECHA 90 ] \n" +
                        "    REPITE 12 [ pattern ] SUBELAPIZ AVANZA 30 BAJALAPIZ GIRADERECHA 90 \n" +
                        "    REPITE 2 [ REPITE 6 [ pattern ] SUBELAPIZ AVANZA 30 BAJALAPIZ GIRADERECHA 90 ] \n" +
                        "    AVANZA 330 GIRAIZQUIERDA 90 AVANZA 300 GIRAIZQUIERDA 90 AVANZA 630 GIRAIZQUIERDA 90 \n" +
                        "    REPITE 2 [ AVANZA 300 GIRAIZQUIERDA 90 ] \n" +
                        "    RETROCEDE 30 GIRADERECHA 90 \n" +
                        "    REPITE 2 [ AVANZA 360 GIRAIZQUIERDA 90 ] AVANZA 690 GIRAIZQUIERDA 90 \n" +
                        "    REPITE 2 [ AVANZA 360 GIRAIZQUIERDA 90 ] \n" +
                        "    SUBELAPIZ AVANZA 160 BAJALAPIZ \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA pattern \n" +
                        "    REPITE 3 [ AVANZA 30 GIRAIZQUIERDA 90 ] GIRAIZQUIERDA 90 REPITE 3 [ AVANZA 17 GIRAIZQUIERDA 90 ] \n" +
                        "    GIRAIZQUIERDA 90 REPITE 3 [ AVANZA 8 GIRAIZQUIERDA 90 ] GIRAIZQUIERDA 90 \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "border1 \n" +
                        "; ********************************************************************** \n" +
                        "PARA border3 \n" +
                        "    SUBELAPIZ PONPOS [ 300 -150 ] BAJALAPIZ \n" +
                        "    spistring 25 \n" +
                        "    SUBELAPIZ PONPOS [ 300 150 ] BAJALAPIZ \n" +
                        "    spistring 25 \n" +
                        "    PONRUMBO 270 \n" +
                        "    SUBELAPIZ PONPOS [ 310 -140 ] BAJALAPIZ AVANZA 600 \n" +
                        "    SUBELAPIZ PONPOS [ 310 -162 ] BAJALAPIZ AVANZA 600 \n" +
                        "    SUBELAPIZ PONPOS [ 310 140 ] BAJALAPIZ AVANZA 600 \n" +
                        "    SUBELAPIZ PONPOS [ 310 162 ] BAJALAPIZ AVANZA 600 \n" +
                        "    PONGROSOR 2 \n" +
                        "    SUBELAPIZ PONPOS [ 310 -151 ] BAJALAPIZ AVANZA 600 \n" +
                        "    SUBELAPIZ PONPOS [ 310 151 ] BAJALAPIZ AVANZA 600 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA spiral \n" +
                        "    REPITE 120 [ AVANZA 0.01 * CUENTAREPITE GIRADERECHA 4.75 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA spistring :NUMBER \n" +
                        "    PONRUMBO 0 \n" +
                        "    REPITE :NUMBER [ spiral SUBELAPIZ PONRUMBO 129 RETROCEDE 15 BAJALAPIZ PONRUMBO 0 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "border3 \n" +
                        "; ********************************************************************** \n" +
                        "PARA ccircle :D \n" +
                        "    ; draws a circle of a given diameter \n" +
                        "    ; around a central point \n" +
                        "    SUBELAPIZ AVANZA :D * 0.5 GIRAIZQUIERDA 90 BAJALAPIZ \n" +
                        "    REPITE 36 [ AVANZA PI * :D / 36 GIRAIZQUIERDA 10 ] \n" +
                        "    SUBELAPIZ GIRADERECHA 90 RETROCEDE :D * 0.5 BAJALAPIZ \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA circle :D \n" +
                        "    ; draws a circle of a given diameter \n" +
                        "    REPITE 36 [ AVANZA PI * :D / 36 GIRAIZQUIERDA 10 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "PONCOLORLAPIZ ROJO \n" +
                        "circle 100 \n" +
                        "PONCOLORLAPIZ AZUL \n" +
                        "ccircle 150 \n" +
                        "; ********************************************************************** \n" +
                        "PARA chimney \n" +
                        "    RETROCEDE 60 GIRADERECHA 120 AVANZA 30 GIRADERECHA 90 AVANZA 20 GIRADERECHA 90 AVANZA 18 \n" +
                        "    RETROCEDE 18 GIRADERECHA 90 AVANZA 20 GIRAIZQUIERDA 90 AVANZA 30 GIRADERECHA 60 AVANZA 60 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA door \n" +
                        "    GIRAIZQUIERDA 90 AVANZA 85 GIRADERECHA 90 AVANZA 5 GIRAIZQUIERDA 90 AVANZA 30 RETROCEDE 25 \n" +
                        "    GIRADERECHA 90 AVANZA 35 GIRAIZQUIERDA 90 AVANZA 20 GIRAIZQUIERDA 90 AVANZA 35 GIRADERECHA 90 \n" +
                        "    AVANZA 5 GIRAIZQUIERDA 90 AVANZA 5 GIRAIZQUIERDA 90 AVANZA 115 GIRAIZQUIERDA 90 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA garage \n" +
                        "    GIRAIZQUIERDA 90 AVANZA 290 RETROCEDE 20 REPITE 4 [ GIRADERECHA 90 AVANZA 50 ] \n" +
                        "    AVANZA 20 REPITE 4 [ GIRADERECHA 90 AVANZA 90 ] RETROCEDE 290 GIRADERECHA 90 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA house \n" +
                        "    setup \n" +
                        "    walls \n" +
                        "    roof \n" +
                        "    chimney \n" +
                        "    door \n" +
                        "    windows \n" +
                        "    garage \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA move1 \n" +
                        "    SUBELAPIZ GIRAIZQUIERDA 90 AVANZA 30 GIRADERECHA 90 BAJALAPIZ \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA move2 \n" +
                        "    SUBELAPIZ GIRADERECHA 90 AVANZA 30 GIRAIZQUIERDA 90 BAJALAPIZ \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA panes \n" +
                        "    REPITE 4 [ AVANZA 20 GIRAIZQUIERDA 90 REPITE 4 [ AVANZA 10 GIRAIZQUIERDA 90 ] ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA roof \n" +
                        "    AVANZA 160 GIRADERECHA 90 \n" +
                        "    AVANZA 20 GIRAIZQUIERDA 150 AVANZA RAIZCUADRADA ( 120 * 120 + 70 * 70 ) \n" +
                        "    GIRAIZQUIERDA 60 AVANZA RAIZCUADRADA ( 120 * 120 + 70 * 70 ) \n" +
                        "    chimney GIRAIZQUIERDA 150 AVANZA 20 \n" +
                        "    GIRADERECHA 90 AVANZA 160 GIRAIZQUIERDA 90 AVANZA 200 GIRAIZQUIERDA 90 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA setup \n" +
                        "    SUBELAPIZ RETROCEDE 50 GIRADERECHA 90 AVANZA 200 GIRAIZQUIERDA 90 BAJALAPIZ \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA w_panes \n" +
                        "    REPITE 2 [ AVANZA 20 GIRAIZQUIERDA 90 REPITE 2 [ AVANZA 20 GIRAIZQUIERDA 90 AVANZA 10 GIRAIZQUIERDA 90 ] \n" +
                        "    AVANZA 40 GIRAIZQUIERDA 90 REPITE 2 [ AVANZA 10 GIRAIZQUIERDA 90 AVANZA 20 GIRAIZQUIERDA 90 ] ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA walls \n" +
                        "    REPITE 2 [ AVANZA 160 GIRAIZQUIERDA 90 AVANZA 200 GIRAIZQUIERDA 90 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA windows \n" +
                        "    SUBELAPIZ AVANZA 80 GIRAIZQUIERDA 90 AVANZA 15 GIRADERECHA 90 BAJALAPIZ \n" +
                        "    REPITE 6 [ panes move1 ] \n" +
                        "    SUBELAPIZ AVANZA 40 move2 BAJALAPIZ \n" +
                        "    REPITE 6 [ panes move2 ] \n" +
                        "    SUBELAPIZ RETROCEDE 90 move1 BAJALAPIZ \n" +
                        "    w_panes \n" +
                        "    SUBELAPIZ GIRAIZQUIERDA 90 AVANZA 130 GIRADERECHA 90 BAJALAPIZ \n" +
                        "    w_panes \n" +
                        "    SUBELAPIZ RETROCEDE 10 GIRAIZQUIERDA 90 AVANZA 80 GIRADERECHA 90 BAJALAPIZ \n" +
                        "    w_panes \n" +
                        "    SUBELAPIZ RETROCEDE 20 GIRADERECHA 90 AVANZA 225 GIRAIZQUIERDA 90 BAJALAPIZ \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "house \n" +
                        "; ********************************************************************** \n" +
                        "PARA ltlgtriangle :SIZE \n" +
                        "    AVANZA :SIZE \n" +
                        "    GIRADERECHA 135 \n" +
                        "    AVANZA :SIZE / RAIZCUADRADA 2 \n" +
                        "    GIRADERECHA 90 \n" +
                        "    AVANZA :SIZE / RAIZCUADRADA 2 \n" +
                        "    GIRADERECHA 135 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA ltmedtriangle :SIZE \n" +
                        "    AVANZA :SIZE / RAIZCUADRADA 2 \n" +
                        "    GIRADERECHA 135 \n" +
                        "    AVANZA :SIZE / 2 \n" +
                        "    GIRADERECHA 90 \n" +
                        "    AVANZA :SIZE / 2 \n" +
                        "    GIRADERECHA 135 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA ltpara :SIZE \n" +
                        "    REPITE 2 [ AVANZA :SIZE / 2 GIRADERECHA 45 AVANZA ( :SIZE / RAIZCUADRADA 2 ) / 2 GIRADERECHA 135 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA ltsmtriangle :SIZE \n" +
                        "    AVANZA :SIZE / 2 \n" +
                        "    GIRADERECHA 135 \n" +
                        "    AVANZA ( :SIZE / RAIZCUADRADA 2 ) / 2 \n" +
                        "    GIRADERECHA 90 \n" +
                        "    AVANZA ( :SIZE / RAIZCUADRADA 2 ) / 2 \n" +
                        "    GIRADERECHA 135 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA ltsquare :SIZE \n" +
                        "    REPITE 4 [ AVANZA ( :SIZE / RAIZCUADRADA 2 ) / 2 GIRADERECHA 90 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA rtlgtriangle :SIZE \n" +
                        "    AVANZA :SIZE \n" +
                        "    GIRAIZQUIERDA 135 \n" +
                        "    AVANZA :SIZE / RAIZCUADRADA 2 \n" +
                        "    GIRAIZQUIERDA 90 \n" +
                        "    AVANZA :SIZE / RAIZCUADRADA 2 \n" +
                        "    GIRAIZQUIERDA 135 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA rtmedtriangle :SIZE \n" +
                        "    AVANZA :SIZE / RAIZCUADRADA 2 \n" +
                        "    GIRAIZQUIERDA 135 \n" +
                        "    AVANZA :SIZE / 2 \n" +
                        "    GIRAIZQUIERDA 90 \n" +
                        "    AVANZA :SIZE / 2 \n" +
                        "    GIRAIZQUIERDA 135 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA rtpara :SIZE \n" +
                        "    REPITE 2 [ AVANZA :SIZE / 2 GIRAIZQUIERDA 45 AVANZA ( :SIZE / RAIZCUADRADA 2 ) / 2 GIRAIZQUIERDA 135 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA rtsmtriangle :SIZE \n" +
                        "    AVANZA :SIZE / 2 \n" +
                        "    GIRAIZQUIERDA 135 \n" +
                        "    AVANZA ( :SIZE / RAIZCUADRADA 2 ) / 2 \n" +
                        "    GIRAIZQUIERDA 90 \n" +
                        "    AVANZA ( :SIZE / RAIZCUADRADA 2 ) / 2 \n" +
                        "    GIRAIZQUIERDA 135 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA rtsquare :SIZE \n" +
                        "    REPITE 4 [ AVANZA ( :SIZE / RAIZCUADRADA 2 ) / 2 GIRAIZQUIERDA 90 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA tanswan :SIZE \n" +
                        "    SUBELAPIZ RETROCEDE 150 BAJALAPIZ \n" +
                        "    GIRADERECHA 45 ltlgtriangle :SIZE \n" +
                        "    AVANZA :SIZE GIRAIZQUIERDA 135 rtlgtriangle :SIZE \n" +
                        "    GIRAIZQUIERDA 90 rtmedtriangle :SIZE \n" +
                        "    GIRAIZQUIERDA 45 AVANZA :SIZE / 2 GIRAIZQUIERDA 135 \n" +
                        "    rtsmtriangle :SIZE \n" +
                        "    AVANZA :SIZE / 2 GIRAIZQUIERDA 45 rtsquare :SIZE \n" +
                        "    AVANZA ( :SIZE / RAIZCUADRADA 2 ) / 2 GIRADERECHA 45 \n" +
                        "    AVANZA :SIZE / 2 GIRAIZQUIERDA 180 ltpara :SIZE \n" +
                        "    GIRAIZQUIERDA 45 ltsmtriangle :SIZE \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "HAZ \"x -200 \n" +
                        "REPITE 4 [ SUBELAPIZ \n" +
                        "PONXY :X 100 \n" +
                        "PONRUMBO 0 \n" +
                        "BAJALAPIZ \n" +
                        "tanswan 100 \n" +
                        "HAZ \"x :X + 150 ] \n" +
                        "; ********************************************************************** \n" +
                        "PARA branch :SIZE \n" +
                        "    GIRAIZQUIERDA 45 AVANZA :SIZE RETROCEDE :SIZE \n" +
                        "    GIRADERECHA 90 AVANZA :SIZE RETROCEDE :SIZE \n" +
                        "    GIRAIZQUIERDA 45 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA flake :SIZE \n" +
                        "    PONGROSOR 1 \n" +
                        "    SUBELAPIZ AVANZA :SIZE / 5 BAJALAPIZ \n" +
                        "    GIRADERECHA 10 AVANZA :SIZE / 5 GIRAIZQUIERDA 10 \n" +
                        "    REPITE 10 [ AVANZA :SIZE * 0.01 GIRAIZQUIERDA 18 ] \n" +
                        "    GIRAIZQUIERDA 10 AVANZA :SIZE / 5 GIRADERECHA 10 \n" +
                        "    SUBELAPIZ RETROCEDE :SIZE / 5 AVANZA :SIZE / 5 * 2 GIRAIZQUIERDA 180 BAJALAPIZ \n" +
                        "    ; donne outer edge \n" +
                        "    PONGROSOR 2 \n" +
                        "    SUBELAPIZ GIRADERECHA 30 AVANZA :SIZE / 15 * 2 BAJALAPIZ \n" +
                        "    GIRAIZQUIERDA 7.5 AVANZA :SIZE / 3 GIRAIZQUIERDA 80 AVANZA :SIZE / 15 * 2 GIRADERECHA 100 \n" +
                        "    REPITE 27 [ AVANZA :SIZE * 0.02 GIRAIZQUIERDA 10 ] GIRADERECHA 100 \n" +
                        "    AVANZA :SIZE / 15 * 2 GIRAIZQUIERDA 80 AVANZA :SIZE / 3 GIRAIZQUIERDA 7.5 \n" +
                        "    SUBELAPIZ AVANZA :SIZE / 15 * 2 GIRAIZQUIERDA 145 BAJALAPIZ \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA part :SZ \n" +
                        "    AVANZA :SZ / 3 branch :SZ / 3 \n" +
                        "    AVANZA :SZ / 3 branch :SZ / 5 \n" +
                        "    AVANZA :SZ / 3 branch :SZ / 7 \n" +
                        "    RETROCEDE :SZ \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA part2 :SZ \n" +
                        "    AVANZA :SZ / 3 branch :SZ / 3 \n" +
                        "    AVANZA :SZ / 3 branch :SZ / 5 \n" +
                        "    AVANZA :SZ / 3 RETROCEDE :SZ \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA snow :SIZE \n" +
                        "    PONCOLORLAPIZ [ 0 0 255 ] \n" +
                        "    REPITE 6 [ flake :SIZE GIRAIZQUIERDA 60 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA snow2 :SIZE \n" +
                        "    PONGROSOR 1 \n" +
                        "    PONCOLORLAPIZ [ 20 20 128 ] \n" +
                        "    REPITE 6 [ part :SIZE GIRAIZQUIERDA 60 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA snow3 :SIZE \n" +
                        "    PONGROSOR 1 \n" +
                        "    PONCOLORLAPIZ CIAN \n" +
                        "    REPITE 6 [ part2 :SIZE GIRAIZQUIERDA 60 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "SUBELAPIZ PONXY -250 0 BAJALAPIZ snow 100 \n" +
                        "SUBELAPIZ PONXY -50 0 BAJALAPIZ snow2 100 \n" +
                        "SUBELAPIZ PONXY 200 0 BAJALAPIZ snow3 100 \n" +
                        "; ***************************************************************************** \n" +
                        "PARA e :SZ \n" +
                        "    REPITE 7 [ sq :SZ AVANZA :SZ ] \n" +
                        "    GIRAIZQUIERDA 90 \n" +
                        "    REPITE 4 [ sq :SZ AVANZA :SZ ] \n" +
                        "    RETROCEDE 4 * :SZ GIRADERECHA 90 RETROCEDE 3 * :SZ GIRAIZQUIERDA 90 \n" +
                        "    REPITE 3 [ sq :SZ AVANZA :SZ ] \n" +
                        "    RETROCEDE 3 * :SZ GIRADERECHA 90 RETROCEDE 3 * :SZ GIRAIZQUIERDA 90 \n" +
                        "    REPITE 4 [ sq :SZ AVANZA :SZ ] \n" +
                        "    SUBELAPIZ AVANZA :SZ GIRADERECHA 90 RETROCEDE :SZ BAJALAPIZ \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA i :SZ \n" +
                        "    sq :SZ \n" +
                        "    GIRAIZQUIERDA 90 AVANZA :SZ GIRADERECHA 90 \n" +
                        "    REPITE 7 [ sq :SZ AVANZA :SZ ] \n" +
                        "    GIRAIZQUIERDA 90 RETROCEDE :SZ \n" +
                        "    REPITE 3 [ sq :SZ AVANZA :SZ ] \n" +
                        "    GIRAIZQUIERDA 90 \n" +
                        "    SUBELAPIZ AVANZA 7 * :SZ BAJALAPIZ \n" +
                        "    GIRAIZQUIERDA 90 sq :SZ \n" +
                        "    SUBELAPIZ RETROCEDE :SZ BAJALAPIZ GIRAIZQUIERDA 90 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA m :SZ \n" +
                        "    REPITE 6 [ sq :SZ AVANZA :SZ ] \n" +
                        "    GIRAIZQUIERDA 90 AVANZA :SZ GIRADERECHA 90 AVANZA :SZ GIRAIZQUIERDA 90 \n" +
                        "    REPITE 2 [ sq :SZ AVANZA :SZ ] \n" +
                        "    GIRAIZQUIERDA 90 AVANZA :SZ GIRADERECHA 90 AVANZA :SZ GIRAIZQUIERDA 90 \n" +
                        "    REPITE 6 [ sq :SZ AVANZA :SZ ] \n" +
                        "    RETROCEDE 7 * :SZ GIRADERECHA 90 \n" +
                        "    REPITE 2 [ sq :SZ AVANZA :SZ ] \n" +
                        "    GIRAIZQUIERDA 90 AVANZA :SZ GIRADERECHA 90 AVANZA :SZ GIRAIZQUIERDA 90 \n" +
                        "    REPITE 6 [ sq :SZ AVANZA :SZ ] \n" +
                        "    SUBELAPIZ GIRADERECHA 90 AVANZA :SZ GIRADERECHA 90 BAJALAPIZ \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA n :SZ \n" +
                        "    REPITE 7 [ sq :SZ AVANZA :SZ ] \n" +
                        "    GIRAIZQUIERDA 90 \n" +
                        "    REPITE 2 [ sq :SZ AVANZA :SZ ] \n" +
                        "    GIRAIZQUIERDA 90 AVANZA :SZ GIRADERECHA 90 AVANZA :SZ GIRAIZQUIERDA 90 \n" +
                        "    REPITE 5 [ sq :SZ AVANZA :SZ ] \n" +
                        "    GIRADERECHA 90 \n" +
                        "    REPITE 2 [ sq :SZ AVANZA :SZ ] \n" +
                        "    RETROCEDE :SZ GIRADERECHA 90 \n" +
                        "    REPITE 6 [ sq :SZ AVANZA :SZ ] \n" +
                        "    SUBELAPIZ RETROCEDE 7 * :SZ \n" +
                        "    GIRAIZQUIERDA 90 AVANZA 2 * :SZ GIRADERECHA 90 BAJALAPIZ \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA name :SIZE \n" +
                        "    BORRAPANTALLA \n" +
                        "    SUBELAPIZ GIRADERECHA 90 AVANZA 16 * :SIZE GIRAIZQUIERDA 90 BAJALAPIZ \n" +
                        "    s :SIZE i :SIZE m :SIZE o :SIZE n :SIZE e :SIZE \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA o :SZ \n" +
                        "    REPITE 2 [ REPITE 7 [ sq :SZ AVANZA :SZ ] GIRAIZQUIERDA 90 REPITE 4 [ sq :SZ AVANZA :SZ ] GIRAIZQUIERDA 90 ] \n" +
                        "    GIRADERECHA 90 SUBELAPIZ RETROCEDE 5 * :SZ GIRAIZQUIERDA 90 BAJALAPIZ \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA s :SZ \n" +
                        "    REPITE 2 [ sq :SZ AVANZA :SZ ] RETROCEDE :SZ \n" +
                        "    GIRAIZQUIERDA 90 \n" +
                        "    REPITE 4 [ sq :SZ AVANZA :SZ ] RETROCEDE :SZ \n" +
                        "    GIRADERECHA 90 \n" +
                        "    REPITE 3 [ sq :SZ AVANZA :SZ ] RETROCEDE :SZ \n" +
                        "    GIRADERECHA 90 \n" +
                        "    REPITE 3 [ sq :SZ AVANZA :SZ ] \n" +
                        "    GIRAIZQUIERDA 90 \n" +
                        "    REPITE 4 [ sq :SZ AVANZA :SZ ] \n" +
                        "    GIRAIZQUIERDA 90 \n" +
                        "    REPITE 4 [ sq :SZ AVANZA :SZ ] \n" +
                        "    GIRAIZQUIERDA 90 \n" +
                        "    REPITE 2 [ sq :SZ AVANZA :SZ ] \n" +
                        "    SUBELAPIZ AVANZA 5 * :SZ GIRADERECHA 90 AVANZA :SZ GIRADERECHA 90 BAJALAPIZ \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA sq :SZ \n" +
                        "    REPITE 4 [ AVANZA :SZ GIRAIZQUIERDA 90 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA squiggle :SZ \n" +
                        "    REPITE 25 [ AVANZA 5 * :SZ GIRAIZQUIERDA 30 RETROCEDE 4 * :SZ GIRADERECHA 20 RETROCEDE :SZ GIRAIZQUIERDA 30 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "name 20 ";
                    break;
                case "xlogo":
                    codigoLogoEjemplo = "; http://xlogo.tuxfamily.org/sp/curso/curso.html \n" +
                        "; Comando de Inicio: rana 10 \n" +
                        "PARA rana :C \n" +
                        "    BORRAPANTALLA PONGROSOR 3 \n" +
                        "    AVANZA 2 * :C GIRADERECHA 90 AVANZA 5 * :C GIRAIZQUIERDA 90 \n" +
                        "    AVANZA 4 * :C GIRAIZQUIERDA 90 AVANZA 7 * :C GIRADERECHA 90 \n" +
                        "    AVANZA 7 * :C GIRADERECHA 90 AVANZA 21 * :C GIRADERECHA 90 \n" +
                        "    AVANZA 2 * :C GIRAIZQUIERDA 90 AVANZA 2 * :C GIRADERECHA 90 \n" +
                        "    AVANZA 9 * :C GIRADERECHA 90 AVANZA 2 * :C GIRAIZQUIERDA 90 \n" +
                        "    AVANZA 2 * :C GIRADERECHA 90 AVANZA 9 * :C GIRADERECHA 90 \n" +
                        "    AVANZA 2 * :C GIRADERECHA 90 AVANZA 7 * :C \n" +
                        "    RETROCEDE 5 * :C GIRAIZQUIERDA 90 AVANZA 4 * :C GIRADERECHA 90 \n" +
                        "    AVANZA 4 * :C RETROCEDE 4 * :C GIRAIZQUIERDA 90 \n" +
                        "    RETROCEDE 2 * :C GIRAIZQUIERDA 90 AVANZA 5 * :C GIRAIZQUIERDA 90 \n" +
                        "    AVANZA 4 * :C GIRADERECHA 90 AVANZA 7 * :C GIRADERECHA 90 \n" +
                        "    SUBELAPIZ AVANZA 9 * :C BAJALAPIZ \n" +
                        "    REPITE 4 [ AVANZA 2 * :C GIRADERECHA 90 ] \n" +
                        "    SUBELAPIZ GIRAIZQUIERDA 90 AVANZA 5 \n" +
                        "    BAJALAPIZ PONCOLORLAPIZ VERDE \n" +
                        "    RELLENA \n" +
                        "FIN\n" +
                        "\n" +
                        "rana 10 \n" +
                        "PARA robot :C \n" +
                        "    BORRAPANTALLA PONGROSOR 3 \n" +
                        "    ; El cuerpo \n" +
                        "    rec 4 * :C 28 * :C \n" +
                        "    ; Las piernas \n" +
                        "    GIRADERECHA 90 AVANZA 2 * :C \n" +
                        "    piernas :C AVANZA 4 * :C \n" +
                        "    piernas :C AVANZA 14 * :C \n" +
                        "    piernas :C AVANZA 4 * :C \n" +
                        "    piernas :C \n" +
                        "    ; La cola \n" +
                        "    SUBELAPIZ GIRAIZQUIERDA 90 AVANZA 4 * :C BAJALAPIZ \n" +
                        "    GIRADERECHA 45 AVANZA 11 * :C RETROCEDE 11 * :C GIRAIZQUIERDA 135 \n" +
                        "    ; el cuello y la cabeza \n" +
                        "    AVANZA 18 * :C cuadrado :C \n" +
                        "    AVANZA 3 * :C cuadrado :C \n" +
                        "    GIRADERECHA 90 AVANZA :C GIRAIZQUIERDA 90 AVANZA 3 * :C GIRADERECHA 90 \n" +
                        "    cuadrado 8 * :C \n" +
                        "    ; Orejas \n" +
                        "    AVANZA 4 * :C GIRAIZQUIERDA 60 tri 3 * :C \n" +
                        "    SUBELAPIZ GIRADERECHA 150 AVANZA 8 * :C GIRAIZQUIERDA 90 BAJALAPIZ tri 3 * :C \n" +
                        "    ; Las antenas \n" +
                        "    AVANZA 4 * :C GIRAIZQUIERDA 90 AVANZA 2 * :C GIRADERECHA 90 antenas :C \n" +
                        "    GIRAIZQUIERDA 90 AVANZA 4 * :C GIRADERECHA 90 antenas :C \n" +
                        "    ; los ojos \n" +
                        "    SUBELAPIZ RETROCEDE 3 * :C BAJALAPIZ cuadrado :C \n" +
                        "    GIRADERECHA 90 SUBELAPIZ AVANZA 3 * :C BAJALAPIZ GIRAIZQUIERDA 90 cuadrado :C \n" +
                        "    ; La boca \n" +
                        "    SUBELAPIZ RETROCEDE 3 * :C GIRAIZQUIERDA 90 AVANZA 3 * :C GIRADERECHA 90 BAJALAPIZ rec :C 4 * :C \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA rec :ALTO :ANCHO \n" +
                        "    ; dibuja un rectangulo de altura :alto y anchura :ancho \n" +
                        "    REPITE 2 [ AVANZA :ALTO GIRADERECHA 90 AVANZA :ANCHO GIRADERECHA 90 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA cuadrado :C \n" +
                        "    ; dibuja una cuadrado de lado :c \n" +
                        "    REPITE 4 [ AVANZA :C GIRADERECHA 90 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA tri :C \n" +
                        "    ; dibuja un triangulo equilatero de lado :c \n" +
                        "    REPITE 3 [ AVANZA :C GIRADERECHA 120 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA piernas :C \n" +
                        "    rec 2 * :C 3 * :C \n" +
                        "    cuadrado 2 * :C \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA antenas :C \n" +
                        "    AVANZA 3 * :C GIRAIZQUIERDA 90 AVANZA :C GIRADERECHA 90 cuadrado 2 * :C \n" +
                        "    SUBELAPIZ \n" +
                        "    RETROCEDE 3 * :C GIRADERECHA 90 AVANZA :C GIRAIZQUIERDA 90 \n" +
                        "    BAJALAPIZ \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "robot 10 \n" +
                        "PARA piramides :C \n" +
                        "    BORRAPANTALLA PONGROSOR 3 \n" +
                        "    HAZ \"x ( -12 * :C ) \n" +
                        "    REPITE 3 \n" +
                        "    [ SUBELAPIZ PONX :X BAJALAPIZ \n" +
                        "    PONX ( 6 * :C + :X ) \n" +
                        "    PONXY ( 3 * :C + :X ) ( 3 * :C ) \n" +
                        "    PONXY :X 0 \n" +
                        "    PONXY ( SUMA -1.5 * :C :X ) ( 1.5 * :C ) \n" +
                        "    PONXY ( 3 * :C + :X ) ( 3 * :C ) \n" +
                        "    PONXY :X 0 \n" +
                        "    HAZ \"x :X + 9 * :C ] \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "piramides 30 \n" +
                        "; Un lindo medallón \n" +
                        "PARA roset \n" +
                        "    PONGROSOR 2 \n" +
                        "    REPITE 6 [ REPITE 60 \n" +
                        "    [ AVANZA 2 GIRADERECHA 1 ] \n" +
                        "    GIRADERECHA 60 \n" +
                        "    REPITE 120 \n" +
                        "    [ AVANZA 2 GIRADERECHA 1 ] \n" +
                        "    GIRADERECHA 60 ] \n" +
                        "    PONGROSOR 1 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA roseton \n" +
                        "    roset \n" +
                        "    REPITE 30 \n" +
                        "    [ AVANZA 2 GIRADERECHA 1 ] \n" +
                        "    roset \n" +
                        "    REPITE 15 \n" +
                        "    [ AVANZA 2 GIRADERECHA 1 ] \n" +
                        "    roset \n" +
                        "    REPITE 30 \n" +
                        "    [ AVANZA 2 GIRADERECHA 1 ] \n" +
                        "    roset \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "roseton ";
                    break;
                case "triangle":
                    codigoLogoEjemplo = "; D'après http://utdallas.edu/~veerasam/logo/ \n" +
                        "PARA triangle1 :SIZE \n" +
                        "    REPITE 3 [ AVANZA :SIZE GIRAIZQUIERDA 120 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "PONGROSOR 2 \n" +
                        "PONCOLORLAPIZ ROJO \n" +
                        "SUBELAPIZ \n" +
                        "PONXY 25 0 \n" +
                        "BAJALAPIZ \n" +
                        "HAZ \"size 200 \n" +
                        "MIENTRAS [ :SIZE > 0 ] [ triangle1 :SIZE GIRAIZQUIERDA 10 HAZ \"size :SIZE - 20 ] \n" +
                        "SUBELAPIZ CENTRO PONXY -25 0 BAJALAPIZ \n" +
                        "GIRADERECHA 60 \n" +
                        "HAZ \"size 200 \n" +
                        "MIENTRAS [ :SIZE > 0 ] [ triangle1 :SIZE GIRADERECHA 10 HAZ \"size :SIZE - 20 ] \n" +
                        "; triangle \n" +
                        "PARA tri :N \n" +
                        "    SI :N < 4 [ ALTO ] \n" +
                        "    PONCOLORLAPIZ [ ( AZAR 255 ) ( AZAR 255 ) ( AZAR 255 ) ] \n" +
                        "    REPITE 3 [ AVANZA :N GIRAIZQUIERDA 120 ] \n" +
                        "    HAZ \"t :T + 1 \n" +
                        "    tri :N / 2 \n" +
                        "    SUBELAPIZ AVANZA :N / 2 BAJALAPIZ \n" +
                        "    tri :N / 2 \n" +
                        "    SUBELAPIZ GIRAIZQUIERDA 120 AVANZA :N / 2 GIRADERECHA 120 BAJALAPIZ \n" +
                        "    tri :N / 2 \n" +
                        "    SUBELAPIZ GIRAIZQUIERDA 240 AVANZA :N / 2 GIRAIZQUIERDA 120 BAJALAPIZ \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "HAZ \"t 0 \n" +
                        "BORRAPANTALLA \n" +
                        "PONRUMBO 0 \n" +
                        "SUBELAPIZ PONPOS [ -100 -200 ] \n" +
                        "BAJALAPIZ MUESTRATORTUGA \n" +
                        "GIRAIZQUIERDA 30 \n" +
                        "tri 384 \n" +
                        "OCULTATORTUGA ";
                    break;
                case "dragon":
                    codigoLogoEjemplo = "; Periskopov RACEK / Ferdinand and LOGO \n" +
                        "; Example: Dragon \n" +
                        "; \n" +
                        "; Dragon Curve (recursive curve). \n" +
                        "; \n" +
                        "; (c)1991,1996 V. Batagelj \n" +
                        "PARA drag :N :A :H \n" +
                        "    SI :N < 1 [ AVANZA :H ALTO ] \n" +
                        "    drag ( :N - 1 ) 90 :H GIRAIZQUIERDA :A drag ( :N - 1 ) -90 :H \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA dragon \n" +
                        "    PONCOLORLAPIZ [ 0 0 0 ] PONGROSOR 2 \n" +
                        "    BORRAPANTALLA SUBELAPIZ PONPOS [ -80 60 ] BAJALAPIZ drag 11 90 7 \n" +
                        "    SUBELAPIZ CENTRO \n" +
                        "FIN\n" +
                        "\n" +
                        "dragon ";
                    break;
                case "arbre":
                    codigoLogoEjemplo = "PARA arbre1 :L :A :O :F1 :F2 \n" +
                        "    SISINO :O = 0 [ ALTO ] \n" +
                        "    [ GIRADERECHA :A AVANZA :L \n" +
                        "    arbre1 :L * :F1 :A :O - 1 :F1 :F2 \n" +
                        "    SUBELAPIZ RETROCEDE :L GIRAIZQUIERDA 2 * :A BAJALAPIZ \n" +
                        "    AVANZA :L * :F2 \n" +
                        "    arbre1 :L * :F1 :A :O - 1 :F1 :F2 \n" +
                        "    SUBELAPIZ RETROCEDE :L * :F2 GIRADERECHA :A BAJALAPIZ ] \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "PONCOLORLAPIZ [ 128 0 0 ] \n" +
                        "arbre1 15 15 8 1 2 \n" +
                        "PARA arbre2 :G :L \n" +
                        "    SI IGUALES? :G 0 [ ALTO ] \n" +
                        "    AVANZA :L \n" +
                        "    GIRAIZQUIERDA 35 arbre2 :G - 1 :L / 1.3 \n" +
                        "    GIRADERECHA 95 arbre2 :G - 1 :L / 1.1 \n" +
                        "    GIRAIZQUIERDA 60 RETROCEDE :L \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "MUESTRATORTUGA \n" +
                        "arbre2 6 40 \n" +
                        "; D apres Joshua Bell \n" +
                        "; http://www.calormen.com/jslogo/# \n" +
                        "PARA arbre :SIZE \n" +
                        "    SI :SIZE < 5 [ AVANZA :SIZE RETROCEDE :SIZE ALTO ] \n" +
                        "    AVANZA :SIZE / 3 \n" +
                        "    GIRADERECHA 30 arbre :SIZE * 2 / 3 GIRAIZQUIERDA 30 \n" +
                        "    AVANZA :SIZE / 6 \n" +
                        "    GIRAIZQUIERDA 25 arbre :SIZE / 2 GIRADERECHA 25 \n" +
                        "    AVANZA :SIZE / 3 \n" +
                        "    GIRAIZQUIERDA 25 arbre :SIZE / 2 GIRADERECHA 25 \n" +
                        "    AVANZA :SIZE / 6 \n" +
                        "    RETROCEDE :SIZE \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "MUESTRA [ ] \n" +
                        "BORRAPANTALLA \n" +
                        "arbre 150 \n" +
                        "PARA fougere :TAILLE :SIGN \n" +
                        "    SI :TAILLE < 1 [ ALTO ] \n" +
                        "    AVANZA :TAILLE \n" +
                        "    GIRAIZQUIERDA 70 * :SIGN fougere :TAILLE * 0.5 :SIGN * -1 GIRADERECHA 70 * :SIGN \n" +
                        "    AVANZA :TAILLE \n" +
                        "    GIRADERECHA 70 * :SIGN fougere :TAILLE * 0.5 :SIGN GIRAIZQUIERDA 70 * :SIGN \n" +
                        "    GIRAIZQUIERDA 7 * :SIGN fougere :TAILLE - 1 :SIGN GIRADERECHA 7 * :SIGN \n" +
                        "    RETROCEDE :TAILLE * 2 \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "MUESTRA [ ] \n" +
                        "BORRAPANTALLA \n" +
                        "SUBELAPIZ RETROCEDE 230 BAJALAPIZ \n" +
                        "fougere 25 1 \n" +
                        "; D'après http://utdallas.edu/~veerasam/logo/ \n" +
                        "HAZ \"angle1 15 \n" +
                        "HAZ \"angle2 30 \n" +
                        "HAZ \"factor1 0.9 \n" +
                        "HAZ \"factor2 0.8 \n" +
                        "PARA tree :LEVEL :SIZE \n" +
                        "    SI :LEVEL > 0 [ PONGROSOR 1 + :LEVEL / 3 \n" +
                        "    SI :LEVEL < 3 [ PONCOLORLAPIZ VERDE ] \n" +
                        "    SI :LEVEL >= 3 [ PONCOLORLAPIZ MARRON ] \n" +
                        "    AVANZA :SIZE \n" +
                        "    GIRADERECHA :ANGLE1 \n" +
                        "    tree :LEVEL - 1 :SIZE * :FACTOR1 \n" +
                        "    GIRAIZQUIERDA :ANGLE1 \n" +
                        "    GIRAIZQUIERDA :ANGLE2 \n" +
                        "    tree :LEVEL - 1 :SIZE * :FACTOR2 \n" +
                        "    GIRADERECHA :ANGLE2 \n" +
                        "    SUBELAPIZ RETROCEDE :SIZE BAJALAPIZ ] \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "SUBELAPIZ PONXY 0 -220 BAJALAPIZ \n" +
                        "tree 13 70 ";
                    break;
                case "courbes":
                    codigoLogoEjemplo = "; D'après V. Batagelj \n" +
                        "; La courbe de Hilbert est une courbe fractale continue remplissant le plan. Elle a été décrite pour la première fois par le mathématicien allemand David Hilbert \n" +
                        "PARA hilb :N :A :H \n" +
                        "    SI :N = 0 [ ALTO ] \n" +
                        "    GIRAIZQUIERDA :A hilb ( :N - 1 ) MENOS :A :H AVANZA :H GIRADERECHA :A hilb ( :N - 1 ) :A :H AVANZA :H \n" +
                        "    hilb ( :N - 1 ) :A :H GIRADERECHA :A AVANZA :H hilb ( :N - 1 ) MENOS :A :H GIRAIZQUIERDA :A \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "SUBELAPIZ \n" +
                        "PONPOS [ -200 -100 ] BAJALAPIZ PONCOLORLAPIZ [ 0 0 255 ] \n" +
                        "hilb 5 90 10 \n" +
                        "PARA knu :N :A :T :H \n" +
                        "    SI :N = 0 [ GIRAIZQUIERDA 45 + :T AVANZA :H GIRADERECHA 45 + :T ALTO ] \n" +
                        "    GIRAIZQUIERDA 2 * :T + :A knu ( :N - 1 ) ( 2 * :T ) MENOS :T :H \n" +
                        "    GIRAIZQUIERDA 45 - 3 * :T - :A AVANZA :H GIRADERECHA 45 - :T + :A \n" +
                        "    knu ( :N - 1 ) 0 ( MENOS :T ) :H GIRAIZQUIERDA :A \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "SUBELAPIZ \n" +
                        "PONPOS [ 250 -130 ] BAJALAPIZ GIRADERECHA 90 \n" +
                        "PONCOLORLAPIZ [ 255 0 255 ] \n" +
                        "knu 9 -90 45 8 \n" +
                        "; Courbe de Giuseppe Peano. Courbe continue qui tricote sur le plan et finit par le recouvrir entièrement. \n" +
                        "PARA pean :N :A :H \n" +
                        "    SI :N = 0 [ ALTO ] \n" +
                        "    GIRAIZQUIERDA :A pean ( :N - 1 ) ( MENOS :A ) :H AVANZA :H pean ( :N - 1 ) :A :H \n" +
                        "    AVANZA :H pean ( :N - 1 ) ( MENOS :A ) :H GIRADERECHA :A \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "SUBELAPIZ \n" +
                        "PONPOS [ -150 -160 ] BAJALAPIZ PONCOLORLAPIZ [ 255 0 0 ] \n" +
                        "pean 6 90 12 \n" +
                        "PARA sierpinski :N :A :H :K \n" +
                        "    SI :N = 0 [ AVANZA :K ALTO ] \n" +
                        "    GIRAIZQUIERDA :A sierpinski ( :N - 1 ) ( MENOS :A ) :H :K GIRADERECHA :A AVANZA :H \n" +
                        "    GIRADERECHA :A sierpinski ( :N - 1 ) ( MENOS :A ) :H :K GIRAIZQUIERDA :A \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "SUBELAPIZ \n" +
                        "PONGROSOR 2 \n" +
                        "PONPOS [ -160 -170 ] BAJALAPIZ PONCOLORLAPIZ [ 200 0 200 ] \n" +
                        "REPITE 4 [ sierpinski 7 45 12 / ( RAIZCUADRADA 2 ) 10 GIRAIZQUIERDA 45 AVANZA 12 / ( RAIZCUADRADA 2 ) GIRAIZQUIERDA 45 ] \n" +
                        "PARA tr :N :H :Q \n" +
                        "    SI :N = 0 [ ALTO ] \n" +
                        "    AVANZA :H GIRADERECHA 90 tr :N - 1 :Q * :H :Q GIRADERECHA 90 AVANZA 2 * :H GIRADERECHA 90 \n" +
                        "    tr :N - 1 :Q * :H :Q GIRADERECHA 90 AVANZA :H \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "GIRAIZQUIERDA 90 PONCOLORLAPIZ [ 0 0 0 ] \n" +
                        "tr 10 120 1 / ( RAIZCUADRADA 2 ) \n" +
                        "PARA wi :N :A :H :K \n" +
                        "    SI :N = 0 [ AVANZA :H ALTO ] \n" +
                        "    GIRAIZQUIERDA :A iw :N ( MENOS :A ) :H :K GIRADERECHA :A AVANZA :H \n" +
                        "    GIRADERECHA :A iw :N ( MENOS :A ) :H :K GIRAIZQUIERDA :A \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA iw :N :A :H :K \n" +
                        "    GIRAIZQUIERDA :A wi ( :N - 1 ) ( MENOS :A ) :H :K AVANZA :K GIRADERECHA 2 * :A \n" +
                        "    AVANZA :K wi ( :N - 1 ) ( MENOS :A ) :H :K GIRAIZQUIERDA :A \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "SUBELAPIZ \n" +
                        "PONPOS [ -155 -153 ] BAJALAPIZ PONCOLORLAPIZ [ 0 128 0 ] \n" +
                        "REPITE 4 [ wi 4 45 7 3 AVANZA 3 GIRAIZQUIERDA 90 AVANZA 3 ] SUBELAPIZ \n" +
                        "PARA two :A :C :W \n" +
                        "    SI :C < 1 [ ALTO ] \n" +
                        "    GIRAIZQUIERDA :A AVANZA 1 GIRAIZQUIERDA :A AVANZA :W GIRADERECHA :A SI :C > 1 [ AVANZA 1 ] \n" +
                        "    GIRADERECHA :A AVANZA :W two :A ( :C - 2 ) :W \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA square :A :H :W \n" +
                        "    PONCOLORLAPIZ [ ( AZAR 255 ) ( AZAR 255 ) ( AZAR 255 ) ] \n" +
                        "    AVANZA :W two :A ( :H - 1 ) :W \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA cag :N :A :W :H \n" +
                        "    SI :N = 0 [ square :A :H :W ALTO ] \n" +
                        "    GIRAIZQUIERDA :A cag ( :N - 1 ) ( MENOS :A ) :H / 4 :W AVANZA :H / 8 \n" +
                        "    cag ( :N - 1 ) :A :H / 4 :W AVANZA :H / 8 \n" +
                        "    cag ( :N - 1 ) ( MENOS :A ) :H / 4 :W GIRADERECHA :A \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "SUBELAPIZ \n" +
                        "PONPOS [ -160 -150 ] BAJALAPIZ \n" +
                        "PONCOLORLAPIZ [ 128 0 128 ] \n" +
                        "cag 4 90 320 320 \n" +
                        "PARA leaf \n" +
                        "    GIRAIZQUIERDA 30 AVANZA :D GIRADERECHA 120 AVANZA :D GIRADERECHA 120 AVANZA :D GIRADERECHA 150 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA treeb :N :A \n" +
                        "    SI :N < 1 [ AVANZA ( :A / 4 ) PONCOLORLAPIZ :L leaf PONCOLORLAPIZ :T SUBELAPIZ RETROCEDE ( :A / 4 ) BAJALAPIZ ALTO ] \n" +
                        "    treea ( :A / 3 ) ( 0.75 * :A ) 30 :N \n" +
                        "    treea ( :A / 3 ) ( 0.65 * :A ) ( -35 ) :N \n" +
                        "    treea ( :A / 3 ) ( 0.5 * :A ) 45 :N \n" +
                        "    SUBELAPIZ RETROCEDE :A BAJALAPIZ \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA treea :S :A :R :N \n" +
                        "    AVANZA :S GIRAIZQUIERDA :R \n" +
                        "    SISINO :Q < AZAR 10 [ HAZ \"k 2 ] [ HAZ \"k 1 ] \n" +
                        "    MUESTRA :K \n" +
                        "    treeb ( :N - :K ) :A \n" +
                        "    GIRADERECHA :R \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "HAZ \"q 8 \n" +
                        "MUESTRATORTUGA \n" +
                        "PONGROSOR 3 \n" +
                        "HAZ \"l [ 32 255 0 ] HAZ \"t [ 102 0 102 ] HAZ \"d 6 PONCOLORLAPIZ :T \n" +
                        "SUBELAPIZ PONPOS [ -190 -160 ] BAJALAPIZ PONRUMBO 0 treeb 5 190 \n" +
                        "HAZ \"l [ 255 0 255 ] HAZ \"t [ 102 51 51 ] HAZ \"d 8 PONCOLORLAPIZ :T PONGROSOR 2 \n" +
                        "SUBELAPIZ PONPOS [ 180 -100 ] BAJALAPIZ PONRUMBO 0 treeb 3 100 \n" +
                        "; D'après http://utdallas.edu/~veerasam/logo/ \n" +
                        "HAZ \"angle1 15 \n" +
                        "HAZ \"angle2 30 \n" +
                        "HAZ \"factor1 0.9 \n" +
                        "HAZ \"factor2 0.8 \n" +
                        "PARA tree :LEVEL :SIZE \n" +
                        "    SI :LEVEL > 0 [ PONGROSOR 1 + :LEVEL / 3 \n" +
                        "    SI :LEVEL < 3 [ PONCOLORLAPIZ VERDE ] \n" +
                        "    SI :LEVEL >= 3 [ PONCOLORLAPIZ MARRON ] \n" +
                        "    AVANZA :SIZE \n" +
                        "    GIRADERECHA :ANGLE1 \n" +
                        "    tree :LEVEL - 1 :SIZE * :FACTOR1 \n" +
                        "    GIRAIZQUIERDA :ANGLE1 \n" +
                        "    GIRAIZQUIERDA :ANGLE2 \n" +
                        "    tree :LEVEL - 1 :SIZE * :FACTOR2 \n" +
                        "    GIRADERECHA :ANGLE2 \n" +
                        "    SUBELAPIZ RETROCEDE :SIZE BAJALAPIZ ] \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "SUBELAPIZ PONXY 0 -200 BAJALAPIZ \n" +
                        "tree 13 70 \n" +
                        "PARA recsquare :LEVEL :SIZE \n" +
                        "    SI :LEVEL < 1 [ ALTO ] \n" +
                        "    REPITE 4 [ SI :LEVEL = 5 [ PONCOLORLAPIZ VERDE ] \n" +
                        "    SI :LEVEL = 4 [ PONCOLORLAPIZ MARRON ] \n" +
                        "    SI :LEVEL = 3 [ PONCOLORLAPIZ AZUL ] \n" +
                        "    SI :LEVEL = 2 [ PONCOLORLAPIZ ROJO ] \n" +
                        "    SI :LEVEL = 1 [ PONCOLORLAPIZ CIAN ] \n" +
                        "    AVANZA :SIZE \n" +
                        "    recsquare :LEVEL - 1 :SIZE / 2 \n" +
                        "    GIRAIZQUIERDA 90 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "recsquare 5 70 \n" +
                        "PARA kochcurve :LEVEL :SIZE \n" +
                        "    SI :LEVEL < 1 [ AVANZA :SIZE ALTO ] \n" +
                        "    kochcurve :LEVEL - 1 :SIZE / 3 \n" +
                        "    GIRADERECHA 60 \n" +
                        "    kochcurve :LEVEL - 1 :SIZE / 3 \n" +
                        "    GIRAIZQUIERDA 120 \n" +
                        "    kochcurve :LEVEL - 1 :SIZE / 3 \n" +
                        "    GIRADERECHA 60 \n" +
                        "    kochcurve :LEVEL - 1 :SIZE / 3 \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "SUBELAPIZ PONXY 0 -100 BAJALAPIZ PONCOLORLAPIZ NEGRO kochcurve 1 300 ESPERA 50 \n" +
                        "SUBELAPIZ PONXY 0 -100 BAJALAPIZ PONCOLORLAPIZ VERDE kochcurve 2 300 ESPERA 50 \n" +
                        "SUBELAPIZ PONXY 0 -100 BAJALAPIZ PONCOLORLAPIZ AZUL kochcurve 3 300 ESPERA 50 \n" +
                        "SUBELAPIZ PONXY 0 -100 BAJALAPIZ PONCOLORLAPIZ ROJO kochcurve 4 300 ESPERA 50 ";
                    break;
                case "data":
                    codigoLogoEjemplo = "; Dessins géométriques à partir de données \n" +
                        "; D'après \"Dessins géométriques et artistiques avec votre micro-ordinateur\" \n" +
                        "; Jean-Paul Delahaye éditions Eyrolles 1985 \n" +
                        "PARA int2 :ECHELLE :PX :PY :L2 \n" +
                        "    HAZ \"cpt2 CUENTA :L2 \n" +
                        "    HAZ \"i2 1 \n" +
                        "    MIENTRAS [ :I2 <= :CPT2 ] [ HAZ \"x ELEMENTO :I2 :L2 \n" +
                        "    HAZ \"y ELEMENTO :I2 + 1 :L2 \n" +
                        "    PONPOS [ ( :PX + ( :X * :ECHELLE ) ) ( ( :Y * :ECHELLE ) + :PY ) ] \n" +
                        "    HAZ :I2 :I2 + 2 \n" +
                        "    BAJALAPIZ ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA int1 :ECHELLE :PX :PY :L1 \n" +
                        "    HAZ \"cpt1 CUENTA :L1 \n" +
                        "    HAZ \"i1 1 \n" +
                        "    MIENTRAS [ :I1 <= :CPT1 ] [ HAZ \"p1 ELEMENTO :I1 :L1 \n" +
                        "    SUBELAPIZ \n" +
                        "    int2 :ECHELLE :PX :PY :P1 \n" +
                        "    HAZ :I1 :I1 + 1 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "int1 20 -100 -100 [ [ 2 4 14 4 13 2 4 2 2 4 ] [ 7 4 7 13 11 11 14 5 2 5 7 13 ] ] \n" +
                        "HAZ \"cheval [ [ 10 10 8 12 9 16 12 17 13 18 14 20 ] [ 13 18 12 19 9 21 9 20 10 19 9 17 7 20 8 22 12 22 ] \n" +
                        "[ 12 20 12 22 13 26 16 31 18 31 19 32 ] [ 16 31 14 31 14 32 ] [ 14 31 10 30 12 31 10 32 10 34 11 34 11 33 10 33 ] \n" +
                        "[ 12 32 13 31 ] [ 10 34 16 36 ] [ 16 35 16 37 18 35 17 34 ] [ 17 36 20 36 22 32 19 26 ] [ 20 36 22 36 22 34 \n" +
                        "24 32 24 30 19 26 18 23 21 22 21 24 30 30 34 31 36 31 33 26 32 22 28 22 27 20 29 17 30 19 29 20 \n" +
                        "29 21 32 19 33 18 32 17 29 16 28 12 30 10 21 4 21 2 18 3 19 6 24 10 24 12 22 14 22 16 23 17 ] \n" +
                        "[ 22 16 17 16 16 17 17 18 ] [ 16 17 16 16 10 14 10 12 12 11 10 10 ] [ 21 21 22 24 30 30 ] [ 24 24 34 28 ] \n" +
                        "[ 25 23 33 26 ] [ 25 21 27 20 ] [ 23 21 24 19 ] [ 27 20 22 19 22 21 ] [ 22 19 21 20 ] [ 13 34 15 35 16 34 16 33 ] \n" +
                        "[ 15 35 15 34 16 34 15 34 15 35 ] [ 24 12 26 10 19 5 19 3 ] [ 28 22 25 22 ] ] \n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "; Cheval de Maurits Cornelis Escher \n" +
                        "int1 12 -200 -250 :CHEVAL \n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "PONGROSOR 2 \n" +
                        "HAZ \"posy 30 \n" +
                        "REPITE 3 [ HAZ \"posx -300 \n" +
                        "REPITE 4 [ PONCOLORLAPIZ [ ( AZAR 255 ) ( AZAR 255 ) ( AZAR 255 ) ] \n" +
                        "int1 5 :POSX :POSY :CHEVAL \n" +
                        "HAZ :POSX :POSX + 100 ] \n" +
                        "HAZ :POSY :POSY - 100 ] \n" +
                        "HAZ \"poisson [ [ 0 0 2 0 4 1 4 2 3 2 2 3 4 5 4 6 2 5 2 6 -1 5 -2 3 -1 2 -2 2 -3 3 -4 3 \n" +
                        "-5 2 -4 2 0 0 ] [ -5 2 -5 1 -7 -1 -6 -2 -5 -2 -5 -3 -2 -2 -2 -3 0 -2 1 -1 2 -1 3 -2 4 -2 3 -1 4 1 ] \n" +
                        "[ 2 5 0 4 0 2 ] [ -2 1 -5 1 -4 -1 -3 0 -3 -1 -4 -1 -5 -2 0 -2 ] [ -7 -1 -6 -1 ] [ -4 2.5 -4 2.8 -4.3 2.8 \n" +
                        "-4.3 2.8 -4.3 2.5 -4 2.5 ] [ -5 0 -5.5 0 -5.5 0.5 -5 0.5 -5 0 ] ] \n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "PONGROSOR 2 \n" +
                        "PONCOLORLAPIZ AZUL \n" +
                        "; Oiseaux-possions de Maurits Cornelis Escher \n" +
                        "int1 30 0 0 :POISSON \n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "PONGROSOR 2 \n" +
                        "PONCOLORLAPIZ AZUL \n" +
                        "HAZ \"posx -200 \n" +
                        "HAZ \"posy -60 \n" +
                        "REPITE 4 [ HAZ :POSY ( :POSY + 200.5 ) \n" +
                        "HAZ :POSX ( :POSX - 109 ) \n" +
                        "REPITE 5 [ HAZ \"couleur ( LISTA AZAR 255 AZAR 128 AZAR 64 ) \n" +
                        "PONCOLORLAPIZ :COULEUR \n" +
                        "int1 10 :POSX :POSY :POISSON \n" +
                        "HAZ :POSX :POSX + 50 \n" +
                        "HAZ :POSY :POSY - 40 ] ] \n" +
                        "HAZ \"lion [ [ -2.5 0 -2 1 -1 2 0 7 1 7 2 8 2 11 3 14 3.5 13.5 2.5 11 2.5 9 ] \n" +
                        "[ 3.5 13.5 4 13 3 11 3 9 3 11 4 13 5 12 3.5 11 3.5 9 ] [ 3.5 11 5 12 5 11 4 10 4 9 8 9 7 11 8 13 \n" +
                        "10 14 12 13 13 11 12 11 11 10 12 8 13 7 14 2 15 2 16 1 16 0 12 0 12 2 11 5 11.5 6 11 5 9 3 \n" +
                        "9 2 10 1 10 0 6 0 7 2 8 6 7 2 6 4 4 5 5 7 4 8 5 7 4 5 2 4 1 2 2 2 3 1 2.5 0 -2.5 0 ] \n" +
                        "[ 6 4 7.5 3.5 ] [ 12 11 10 10.5 9 10.5 ] [ 12.5 12 12 12 11 11.5 12 12 12 12.5 11.5 12.5 10.5 13 ] \n" +
                        "[ 10 13 10 13.5 10.5 13.5 10.5 13 11.5 12.5 12 12.5 12 13 ] \n" +
                        "[ 7.5 12 8.5 12 8.5 11.5 ] ] \n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "PONGROSOR 2 \n" +
                        "PONCOLORLAPIZ ROJO \n" +
                        "; Lion de Maurits Cornelis Escher \n" +
                        "int1 20 -100 -100 :LION \n" +
                        "OCULTATORTUGA ";
                    break;
                case "hasard":
                    codigoLogoEjemplo = "; Trace des lignes au hasard. A chaque fois que la tortue se cogne contre \n" +
                        "; un mur, elle change de direction \n" +
                        "PARA toujours \n" +
                        "    HAZ \"dist AZAR 30 \n" +
                        "    HAZ \"dir AZAR 10 \n" +
                        "    SISINO :DIR < 5 [ GIRAIZQUIERDA 2 ] [ GIRADERECHA 2 ] \n" +
                        "    HAZ \"p AVANZA :DIST \n" +
                        "    SI :P < :DIST [ RETROCEDE AZAR 100 \n" +
                        "    GIRAIZQUIERDA 10 + AZAR 90 \n" +
                        "    HAZ \"coul ( LISTA AZAR 255 AZAR 255 AZAR 255 ) \n" +
                        "    PONCOLORLAPIZ :COUL \n" +
                        "    PONGROSOR AZAR 5 ] \n" +
                        "    HAZ \"cpt :CPT + 1 \n" +
                        "    SI :CPT > 1000 [ ALTO ] \n" +
                        "    toujours \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "HAZ \"cpt 0 \n" +
                        "PONRUMBO AZAR 360 \n" +
                        "PONCOLORLAPIZ [ 255 153 51 ] \n" +
                        "toujours \n" +
                        "; Programmation par événenement. Dès que la tortue rencontre un obstacle, \n" +
                        "; la procédure collision est appelée par le système \n" +
                        "PARA collision \n" +
                        "    PONCOLORLAPIZ LISTA ( AZAR 255 ) ( AZAR 255 ) ( AZAR 255 ) \n" +
                        "    RETROCEDE 5 \n" +
                        "    GIRAIZQUIERDA 90 - AZAR 180 \n" +
                        "    HAZ \"cpt :CPT + 1 \n" +
                        "FIN\n" +
                        "\n" +
                        "HAZ \"cpt 0 \n" +
                        "PARA toujours1 \n" +
                        "    AVANZA 5 \n" +
                        "    GIRAIZQUIERDA ( AZAR 6 ) - 3 \n" +
                        "    SI :CPT > 200 [ ALTO ] \n" +
                        "    toujours1 \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "BORRAPANTALLA \n" +
                        "PONGROSOR 5 \n" +
                        "toujours1 ";
                    break;
                case "evenements":
                    codigoLogoEjemplo = "; La procédure init! - si elle existe - est toujours appelée au démarrage \n" +
                        "; du programme. Les procédures se terminant par \"!\" sont des événements. \n" +
                        "PARA init! \n" +
                        "    BORRAPANTALLA \n" +
                        "    MUESTRA FRASE \"En \"avant \"let's \"go \n" +
                        "    PONCOLORLAPIZ LISTA ( AZAR 255 ) ( AZAR 128 ) ( AZAR 64 ) \n" +
                        "    PONRUMBO AZAR 360 \n" +
                        "    HAZLOCAL \"x 0 \n" +
                        "    HAZLOCAL \"y 0 \n" +
                        "    REPITE 3 [ REPITE 3 [ SI ( :X <> 1 ) | ( :Y <> 1 ) [ PARED& [ ( :X * 260 - 280 ) ( 180 - :Y * 150 ) 50 50 ] ] HAZ \"x :X + 1 ] \n" +
                        "    HAZ \"y :Y + 1 \n" +
                        "    HAZ \"x 0 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "; La procédure collision! - si elle existe - est appelée à chaque fois que \n" +
                        "; la tortue heurte un obstacle. \n" +
                        "; La présence de cette procédure est optionnelle \n" +
                        "PARA collision! \n" +
                        "    RETROCEDE 2 \n" +
                        "    HAZLOCAL \"r AZAR 360 \n" +
                        "    HAZLOCAL \"res GIRAIZQUIERDA :R \n" +
                        "    SI :RES < :R [ RETROCEDE 5 GIRADERECHA AZAR 180 ] \n" +
                        "    PONCOLORLAPIZ LISTA AZAR 64 AZAR 128 AZAR 255 \n" +
                        "FIN\n" +
                        "\n" +
                        "; Boucle sans fin \n" +
                        "PARA toujours \n" +
                        "    AVANZA 100 \n" +
                        "    toujours \n" +
                        "FIN\n" +
                        "\n" +
                        "PONGROSOR 1 \n" +
                        "toujours ";
                    break;
                case "test":
                    codigoLogoEjemplo = "; Test des instructions de base \n" +
                        "BORRAPANTALLA \n" +
                        "AVANZA 10 \n" +
                        "RETROCEDE 10 \n" +
                        "GIRAIZQUIERDA 90 \n" +
                        "GIRADERECHA 20 \n" +
                        "BAJALAPIZ \n" +
                        "SUBELAPIZ \n" +
                        "AVANZA 10 \n" +
                        "AVANZA ( 10 + 3 ) * ( 2 + 1 ) \n" +
                        "HAZ \"longueur AVANZA 10 \n" +
                        "GIRAIZQUIERDA 90 \n" +
                        "GIRAIZQUIERDA 360 / 2 \n" +
                        "HAZ \"rotation GIRAIZQUIERDA 180 \n" +
                        "PONRUMBO 90 \n" +
                        "HAZ \"rotation PONRUMBO 180 \n" +
                        "PONPOS [ 30 20 ] \n" +
                        "HAZ \"Deplacement PONPOS [ 0 0 ] \n" +
                        "PONX 90 \n" +
                        "HAZ \"Deplacement PONX 10 \n" +
                        "PONXY 0 0 \n" +
                        "HAZ \"Deplacement PONXY 10 * 3 50 + 2 \n" +
                        "PONY 90 \n" +
                        "HAZ \"Deplacement PONY 10 \n" +
                        "GIRADERECHA 30 \n" +
                        "GIRADERECHA 360 / 60 \n" +
                        "HAZ \"rotation GIRADERECHA 120 \n" +
                        "CENTRO \n" +
                        "RETROCEDE 30 \n" +
                        "RETROCEDE 60 / 10 \n" +
                        "HAZ \"rotation RETROCEDE 120 \n" +
                        "OCULTATORTUGA \n" +
                        "HAZ \"etat OCULTATORTUGA \n" +
                        "MUESTRATORTUGA \n" +
                        "HAZ \"etat MUESTRATORTUGA \n" +
                        "LIMPIA \n" +
                        "BORRAPANTALLA \n" +
                        "SI RUMBO = 0 [ GIRAIZQUIERDA 90 ] \n" +
                        "MUESTRA RUMBO \n" +
                        "MUESTRA POSICION \n" +
                        "SISINO ( PRIMERO POSICION ) < 10 [ AVANZA 10 ] [ GIRAIZQUIERDA 90 RETROCEDE 10 ] \n" +
                        "BAJALAPIZ \n" +
                        "HAZ \"etat BAJALAPIZ \n" +
                        "PONCOLORLAPIZ [ 255 0 255 ] \n" +
                        "PONCOLORLAPIZ VERDE \n" +
                        "PONCOLORLAPIZ ( LISTA AZAR 256 AZAR 256 AZAR 256 ) \n" +
                        "PONCOLORLAPIZ ( MEZCLA ROJO VERDE BLANCO ) \n" +
                        "PONCOLORLAPIZ MEZCLA ROJO [ 255 255 0 ] [ 64 64 64 ] \n" +
                        "PONGROSOR 10 \n" +
                        "PONGROSOR 5 * 3 \n" +
                        "SUBELAPIZ \n" +
                        "HAZ \"etat SUBELAPIZ \n" +
                        "RETROCEDE REDONDEA 10.3 \n" +
                        "RETROCEDE REDONDEA 10.6 \n" +
                        "GIRAIZQUIERDA COSENO 60 \n" +
                        "AVANZA DIFERENCIA 100 20 30 \n" +
                        "GIRAIZQUIERDA ( DIFERENCIA 10 2 3 4 ) \n" +
                        "AVANZA 100 - 20 - 30 \n" +
                        "AVANZA LOG10 1000 \n" +
                        "AVANZA MENOS 100 \n" +
                        "GIRAIZQUIERDA -90 \n" +
                        "GIRAIZQUIERDA MENOS SUMA 1 2 3 4 \n" +
                        "GIRAIZQUIERDA ( - SUMA 1 2 3 4 ) \n" +
                        "AVANZA PRODUCTO 10 2 2 3 \n" +
                        "RETROCEDE 10 * 2 \n" +
                        "AVANZA POTENCIA 10 2 \n" +
                        "RETROCEDE 10 ^ 2 \n" +
                        "RETROCEDE POTENCIA 0.5 -1 \n" +
                        "AVANZA 25 ^ 0.5 \n" +
                        "AVANZA DIVISION 100 2 \n" +
                        "GIRAIZQUIERDA ( DIVISION 100 2 2 ) \n" +
                        "GIRAIZQUIERDA 100 / 2 / 2 \n" +
                        "AVANZA RAIZCUADRADA 100 \n" +
                        "GIRAIZQUIERDA RAIZCUADRADA MENOS -9 \n" +
                        "GIRAIZQUIERDA RAIZCUADRADA 5 * 5 \n" +
                        "GIRAIZQUIERDA RESTO 10 3 \n" +
                        "GIRAIZQUIERDA 100 % 30 \n" +
                        "GIRAIZQUIERDA SENO 90 \n" +
                        "AVANZA SUMA 10 20 30 \n" +
                        "GIRAIZQUIERDA ( SUMA 1 2 3 4 5 ) \n" +
                        "AVANZA 10 + 20 + 30 \n" +
                        "SI ( O ( 1 < 2 ) VERDADERO ( 5 < 2 * 3 ) ) [ AVANZA 100 ] \n" +
                        "SI ( ( 1 < 10 ) | ( 5 < 2 ) ) [ GIRAIZQUIERDA 120 ] \n" +
                        "SI ( Y ( 1 < 2 ) VERDADERO ( 5 < 2 * 3 ) ) [ AVANZA 100 ] \n" +
                        "SI ( ( 1 < 10 ) & ( 5 > 2 ) ) [ AVANZA 10 ] \n" +
                        "; Test caractères accentuées + formes longues \n" +
                        "BORRAPANTALLA \n" +
                        "AVANZA 10 \n" +
                        "RETROCEDE 10 \n" +
                        "GIRAIZQUIERDA 90 \n" +
                        "GIRADERECHA 20 \n" +
                        "SUBELAPIZ \n" +
                        "BAJALAPIZ \n" +
                        "; Test expressions arithmétiques \n" +
                        "AVANZA ( 5 + 3 ) * ( 6 + 4 ) / ( 2 + 2 ) \n" +
                        "GIRAIZQUIERDA 90 / 3 + 2 \n" +
                        "GIRADERECHA ( 40 + 50 ) * ( ( 1 + 1 ) * 2 + 1 ) ; commentaire fin de ligne \n" +
                        "RETROCEDE 1 * 2 * 3 * 4 * 5 * 6 * 7 * 8 * 9 * 10 \n" +
                        "AVANZA ( SUMA 1 2 3 4 5 6 7 8 9 10 ) \n" +
                        "GIRAIZQUIERDA ( PRODUCTO 1 2 3 4 5 ) \n" +
                        "BORRAPANTALLA \n" +
                        "; Test repete \n" +
                        "BAJALAPIZ \n" +
                        "REPITE ( 2 + 1 ) [ AVANZA 5 GIRAIZQUIERDA 90 ] \n" +
                        "REPITE ( 3 * ( 1 + 1 ) ) [ BORRAPANTALLA REPITE ( 1 + 1 ) [ AVANZA 5 ] ] AVANZA 10 \n" +
                        "BORRAPANTALLA \n" +
                        "REPITE ( 2 + 1 ) [ AVANZA 5 ] \n" +
                        "REPITE 2 + 1 [ AVANZA 5 ] \n" +
                        "REPITE 3 + 1 [ BORRAPANTALLA REPITE 2 + 1 [ AVANZA 5 REPITE 2 * 1 [ SUBELAPIZ BAJALAPIZ ] GIRAIZQUIERDA 90 ] ] \n" +
                        "BORRAPANTALLA \n" +
                        "REPITE 2 + 2 [ AVANZA CUENTAREPITE * 2 REPITE 2 [ GIRAIZQUIERDA CUENTAREPITE * 4 GIRADERECHA CUENTAREPITE ] ] ; utilisation de compteur.r \n" +
                        "BORRAPANTALLA \n" +
                        "REPITE 215 [ AVANZA CUENTAREPITE GIRAIZQUIERDA 70 ] \n" +
                        "BORRAPANTALLA \n" +
                        "REPITE 20 [ REPITE 4 [ AVANZA 120 GIRAIZQUIERDA 90 ] GIRAIZQUIERDA 18 ] \n" +
                        "BORRAPANTALLA \n" +
                        "REPITE 5 [ AVANZA 150 GIRAIZQUIERDA 360 / 2.5 ] \n" +
                        "BORRAPANTALLA \n" +
                        "REPITE 4 [ REPITE 8 [ REPITE 4 [ GIRAIZQUIERDA 90 AVANZA 70.7 ] RETROCEDE 70.7 GIRADERECHA 45 ] GIRADERECHA 90 ] \n" +
                        "BORRAPANTALLA \n" +
                        "REPITE 100 [ GIRADERECHA AZAR 360 AVANZA AZAR 160 GIRADERECHA AZAR 40 AVANZA AZAR 60 CENTRO ] \n" +
                        "BORRAPANTALLA \n" +
                        "REPITE 3600 [ AVANZA 10 GIRAIZQUIERDA CUENTAREPITE + 0.2 ] \n" +
                        "BORRAPANTALLA \n" +
                        "REPITE 12 [ REPITE 30 [ AVANZA 100 GIRAIZQUIERDA 168 ] GIRAIZQUIERDA 30 ] \n" +
                        "PARA coulhasard \n" +
                        "    DEVUELVE LISTA ( AZAR 255 ) ( AZAR 255 ) ( AZAR 255 ) \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "REPITEPARA [ cpt 1 200 1 ] [ PONCOLORLAPIZ coulhasard AVANZA :CPT GIRAIZQUIERDA :CPT RETROCEDE :CPT ] \n" +
                        "; fonction hasard \n" +
                        "REPITE 20 [ AVANZA ( AZAR 10 ) * 2 GIRAIZQUIERDA AZAR 180 * 2 ] \n" +
                        "; sin et cos \n" +
                        "BORRAPANTALLA \n" +
                        "SUBELAPIZ \n" +
                        "PONCOLORLAPIZ ROJO \n" +
                        "PONGROSOR 3 \n" +
                        "REPITE 360 [ PONX ( 150 * SENO CUENTAREPITE ) PONY ( 60 * COSENO CUENTAREPITE ) BAJALAPIZ ] \n" +
                        "; union jack \n" +
                        "PARA rectangle :LONGUEUR :LARGEUR :COULEUR \n" +
                        "    PONCOLORLAPIZ :COULEUR \n" +
                        "    PONGROSOR 1 \n" +
                        "    BAJALAPIZ \n" +
                        "    REPITE :LARGEUR / 2 [ AVANZA :LONGUEUR GIRAIZQUIERDA 90 AVANZA 1 GIRAIZQUIERDA 90 AVANZA :LONGUEUR GIRADERECHA 90 AVANZA 1 GIRADERECHA 90 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "SUBELAPIZ \n" +
                        "PONPOS [ -200 100 ] \n" +
                        "; dessin du fond \n" +
                        "PONRUMBO 90 \n" +
                        "rectangle 400 200 AZUL \n" +
                        "SUBELAPIZ \n" +
                        "GIRADERECHA 90 \n" +
                        "AVANZA 120 \n" +
                        "GIRAIZQUIERDA 90 \n" +
                        "rectangle 400 50 BLANCO \n" +
                        "SUBELAPIZ \n" +
                        "GIRADERECHA 90 \n" +
                        "AVANZA 130 \n" +
                        "GIRAIZQUIERDA 90 AVANZA 175 \n" +
                        "rectangle 50 200 BLANCO \n" +
                        "AVANZA 10 \n" +
                        "GIRADERECHA 90 AVANZA 200 GIRAIZQUIERDA 90 \n" +
                        "rectangle 30 200 ROJO \n" +
                        "SUBELAPIZ \n" +
                        "GIRADERECHA 90 AVANZA 110 GIRADERECHA 90 AVANZA 185 PONRUMBO 90 \n" +
                        "rectangle 400 30 ROJO \n" +
                        "; test exec \n" +
                        "BORRAPANTALLA \n" +
                        "HAZ \"M [ AVANZA 10 GIRAIZQUIERDA 90 AVANZA 10 GIRAIZQUIERDA 90 AVANZA 10 GIRADERECHA 90 ] \n" +
                        "REPITE 4 [ EJECUTA :M ] \n" +
                        "BORRAPANTALLA \n" +
                        "EJECUTA [ REPITE 4 :M ] \n" +
                        "BORRAPANTALLA \n" +
                        "REPITE 4 :M \n" +
                        "OCULTATORTUGA \n" +
                        "; Procedures sans arguments \n" +
                        "PARA lettre \n" +
                        "    AVANZA 8 GIRAIZQUIERDA 90 AVANZA 24 GIRADERECHA 90 \n" +
                        "    AVANZA 8 GIRADERECHA 90 AVANZA 32 GIRADERECHA 90 \n" +
                        "    AVANZA 16 GIRADERECHA 90 AVANZA 8 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA motif \n" +
                        "    lettre \n" +
                        "    lettre \n" +
                        "    lettre \n" +
                        "    lettre \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "motif \n" +
                        "PARA hexagone \n" +
                        "    AVANZA 10 GIRAIZQUIERDA 60 \n" +
                        "    SISINO RUMBO = 0 [ ALTO ] [ hexagone ] \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "BAJALAPIZ \n" +
                        "MUESTRATORTUGA \n" +
                        "PONRUMBO 0 \n" +
                        "hexagone \n" +
                        "; Procedure avec arguments \n" +
                        "PARA rectangle1 :LONGUEUR :LARGEUR \n" +
                        "    AVANZA :LONGUEUR GIRAIZQUIERDA 90 \n" +
                        "    AVANZA :LARGEUR GIRAIZQUIERDA 90 \n" +
                        "    AVANZA :LONGUEUR GIRAIZQUIERDA 90 \n" +
                        "    AVANZA :LARGEUR GIRAIZQUIERDA 90 \n" +
                        "FIN\n" +
                        "\n" +
                        "rectangle1 20 10 \n" +
                        "PARA carre :C \n" +
                        "    REPITE 4 [ AVANZA :C GIRAIZQUIERDA 90 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "carre 100 carre 50 carre 30 carre 20 carre 1 \n" +
                        "PARA rec :LO :LA \n" +
                        "    REPITE 2 [ AVANZA :LO GIRAIZQUIERDA 90 AVANZA :LA GIRAIZQUIERDA 90 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "rec 200 100 rec 100 300 rec 50 150 rec 1 20 rec 100 2 \n" +
                        "PARA forme :NB :LONG \n" +
                        "    REPITE :NB [ AVANZA :LONG GIRADERECHA 360 / :NB ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA dessine :NB :LONG \n" +
                        "    forme :NB :LONG \n" +
                        "    SI :NB < 12 [ dessine :NB + 1 :LONG ] \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "PONRUMBO 90 \n" +
                        "SUBELAPIZ \n" +
                        "PONPOS [ -50 -200 ] \n" +
                        "BAJALAPIZ \n" +
                        "dessine 3 100 \n" +
                        "BORRAPANTALLA \n" +
                        "PARA dowhile :COND :SEQ \n" +
                        "    SISINO ( EJECUTA :COND ) [ EJECUTA :SEQ ] [ ALTO ] \n" +
                        "    dowhile :COND :SEQ \n" +
                        "FIN\n" +
                        "\n" +
                        "HAZ \"cpt 1 \n" +
                        "dowhile [ :CPT < 100 ] [ AVANZA 10 GIRAIZQUIERDA :CPT HAZ :CPT :CPT + 1 ] \n" +
                        "PARA repeatuntil :COND :SEQ \n" +
                        "    EJECUTA :SEQ \n" +
                        "    SI EJECUTA :COND [ ALTO ] \n" +
                        "    repeatuntil :COND :SEQ \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "HAZ \"cpt 1 \n" +
                        "repeatuntil [ :CPT > 50 ] [ AVANZA 10 GIRADERECHA :CPT HAZ :CPT :CPT + 1 ] \n" +
                        "PARA bras :LON \n" +
                        "    SISINO :LON < 10 [ ALTO ] [ AVANZA :LON GIRAIZQUIERDA 90 bras :LON - 2 ] \n" +
                        "    PONCOLORLAPIZ ROJO AVANZA :LON GIRADERECHA 90 \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "PONCOLORLAPIZ VERDE \n" +
                        "bras 200 \n" +
                        "PARA stopper :EMO \n" +
                        "    SI VACIO? :EMO [ ALTO ] \n" +
                        "    SI IGUALES? PRIMERO :EMO \"A [ AVANZA 100 stopper MENOSPRIMERO :EMO ] \n" +
                        "    GIRAIZQUIERDA 45 stopper MENOSPRIMERO :EMO \n" +
                        "    GIRADERECHA 90 AVANZA 200 \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "stopper \"ALMA \n" +
                        "; spirales récursives et conditionnelles \n" +
                        "PARA spire1 :COTE :ANGLE \n" +
                        "    AVANZA :COTE GIRAIZQUIERDA :ANGLE \n" +
                        "    SI :COTE < 100 [ spire1 :COTE + 2 :ANGLE ] \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "spire1 2 185 \n" +
                        "BORRAPANTALLA \n" +
                        "spire1 2 90 \n" +
                        "PARA spire2 :COTE :ANGLE :INC \n" +
                        "    AVANZA :COTE GIRAIZQUIERDA :ANGLE \n" +
                        "    SI :COTE < 100 [ spire2 :COTE + :INC :ANGLE :INC ] \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "spire2 2 45 1 \n" +
                        "BORRAPANTALLA \n" +
                        "spire2 2 120 4 \n" +
                        "BORRAPANTALLA \n" +
                        "spire2 1 150 4 \n" +
                        "PARA spire3 :COTE :ANGLE :INC :ETAPE \n" +
                        "    AVANZA :COTE GIRAIZQUIERDA :ANGLE \n" +
                        "    SI :ETAPE < 400 [ spire3 :COTE :ANGLE + :INC :INC :ETAPE + 1 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "spire3 10 10 2 0 \n" +
                        "; rose \n" +
                        "PARA starmove :SIZE \n" +
                        "    AVANZA :SIZE * 1.618 \n" +
                        "    GIRAIZQUIERDA 36 \n" +
                        "    AVANZA :SIZE * 1.618 \n" +
                        "    GIRAIZQUIERDA 180 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA rt_dart :SIDE \n" +
                        "    AVANZA :SIDE * 1.616 \n" +
                        "    GIRAIZQUIERDA 108 AVANZA :SIDE * 1.618 \n" +
                        "    GIRAIZQUIERDA 144 AVANZA :SIDE \n" +
                        "    GIRADERECHA 36 AVANZA :SIDE \n" +
                        "    GIRAIZQUIERDA 144 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA lt_kite :SIDE \n" +
                        "    AVANZA :SIDE * 1.618 GIRADERECHA 108 \n" +
                        "    AVANZA :SIDE * 1.618 GIRADERECHA 108 \n" +
                        "    AVANZA :SIDE GIRADERECHA 36 \n" +
                        "    AVANZA :SIDE GIRADERECHA 108 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA rt_kite :SIDE \n" +
                        "    AVANZA :SIDE * 1.618 GIRAIZQUIERDA 108 \n" +
                        "    AVANZA :SIDE * 1.618 GIRAIZQUIERDA 108 \n" +
                        "    AVANZA :SIDE GIRAIZQUIERDA 36 \n" +
                        "    AVANZA :SIDE GIRAIZQUIERDA 108 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA big_kite :SIZE \n" +
                        "    AVANZA :SIZE * 1.618 \n" +
                        "    GIRAIZQUIERDA 144 AVANZA :SIZE GIRADERECHA 108 \n" +
                        "    lt_kite :SIZE \n" +
                        "    rt_kite :SIZE \n" +
                        "    GIRAIZQUIERDA 72 AVANZA :SIZE GIRAIZQUIERDA 144 \n" +
                        "    rt_dart :SIZE \n" +
                        "    AVANZA :SIZE * 1.618 \n" +
                        "    GIRAIZQUIERDA 108 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA star :SIZE :SEGMENTS \n" +
                        "    REPITE :SEGMENTS [ big_kite :SIZE GIRAIZQUIERDA 72 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA expand :SIZE \n" +
                        "    star :SIZE 5 \n" +
                        "    AVANZA :SIZE + :SIZE * 1.618 GIRADERECHA 108 \n" +
                        "    REPITE 5 [ star :SIZE 3 starmove :SIZE ] \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "MUESTRATORTUGA \n" +
                        "expand 25 \n" +
                        "OCULTATORTUGA \n" +
                        "PARA carrem :T \n" +
                        "    REPITE 4 [ AVANZA :T GIRAIZQUIERDA 90 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA carrepg :T \n" +
                        "    SI :T <= 200 [ carrem :T carrepg :T + 10 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA carrepp :T \n" +
                        "    SI ( :T > 10 ) [ carrem :T carrepp ( :T - 10 ) ] \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "carrepp 200 \n" +
                        "carrepg 10 \n" +
                        "; escargot \n" +
                        "BORRAPANTALLA \n" +
                        "HAZ \"CPT 1 \n" +
                        "REPITE 550 [ AVANZA 0.01 * :CPT GIRAIZQUIERDA 3 HAZ \"CPT :CPT + 1 ] \n" +
                        "GIRADERECHA 120 AVANZA 70 \n" +
                        "GIRADERECHA 20 AVANZA 20 \n" +
                        "REPITE 3 [ GIRAIZQUIERDA 30 AVANZA 10 \n" +
                        "GIRAIZQUIERDA 30 AVANZA 10 ] \n" +
                        "GIRAIZQUIERDA 20 \n" +
                        "AVANZA 170 \n" +
                        "SUBELAPIZ \n" +
                        "RETROCEDE 175 \n" +
                        "GIRAIZQUIERDA 90 \n" +
                        "AVANZA 37 \n" +
                        "BAJALAPIZ \n" +
                        "GIRAIZQUIERDA 30 AVANZA 30 RETROCEDE 30 \n" +
                        "GIRAIZQUIERDA 15 AVANZA 30 \n" +
                        "OCULTATORTUGA \n" +
                        "; arbre \n" +
                        "PARA arbre1 :L :A :O :F1 :F2 \n" +
                        "    SISINO :O = 0 [ ALTO ] \n" +
                        "    [ GIRADERECHA :A AVANZA :L \n" +
                        "    arbre1 :L * :F1 :A :O - 1 :F1 :F2 \n" +
                        "    SUBELAPIZ RETROCEDE :L GIRAIZQUIERDA 2 * :A BAJALAPIZ \n" +
                        "    AVANZA :L * :F2 \n" +
                        "    arbre1 :L * :F1 :A :O - 1 :F1 :F2 \n" +
                        "    SUBELAPIZ RETROCEDE :L * :F2 GIRADERECHA :A BAJALAPIZ ] \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "PONCOLORLAPIZ [ 128 0 0 ] \n" +
                        "arbre1 15 15 8 1 2 \n" +
                        "PARA arbre2 :G :L \n" +
                        "    SI IGUALES? :G 0 [ ALTO ] \n" +
                        "    AVANZA :L \n" +
                        "    GIRAIZQUIERDA 35 arbre2 :G - 1 :L / 1.3 \n" +
                        "    GIRADERECHA 95 arbre2 :G - 1 :L / 1.1 \n" +
                        "    GIRAIZQUIERDA 60 RETROCEDE :L \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "MUESTRATORTUGA \n" +
                        "arbre2 6 40 \n" +
                        "PARA losange :COTE :ANGLE \n" +
                        "    PONCOLORLAPIZ [ ( AZAR 256 ) ( AZAR 256 ) ( AZAR 256 ) ] \n" +
                        "    REPITE 2 [ AVANZA :COTE GIRAIZQUIERDA :ANGLE AVANZA :COTE GIRAIZQUIERDA 180 - :ANGLE ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA spirelo :COTE :ANGLE \n" +
                        "    losange :COTE :ANGLE \n" +
                        "    GIRAIZQUIERDA :ANGLE / 5 \n" +
                        "    SI IGUALES? RUMBO 0 [ ALTO ] \n" +
                        "    spirelo ( :COTE + 1 ) :ANGLE \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "BAJALAPIZ \n" +
                        "MUESTRATORTUGA \n" +
                        "spirelo 10 60 \n" +
                        "; variables locales \n" +
                        "PARA ellipses \n" +
                        "    LOCAL \"a \"b \n" +
                        "    HAZ \"a 20 HAZ \"b 60 \n" +
                        "    PONGROSOR 5 \n" +
                        "    REPITE 8 [ SUBELAPIZ \n" +
                        "    PONCOLORLAPIZ LISTA ( AZAR 255 ) ( AZAR 255 ) ( AZAR 255 ) \n" +
                        "    REPITE 360 [ PONXY ( :A * SENO CUENTAREPITE ) ( :B * COSENO CUENTAREPITE ) BAJALAPIZ ] \n" +
                        "    HAZLOCAL \"c :A \n" +
                        "    HAZ \"a VALOR \"b + 20 \n" +
                        "    HAZ \"b :C + 10 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "ellipses \n" +
                        "PARA test01 \n" +
                        "    HAZLOCAL \"essai 100 \n" +
                        "    MUESTRA :ESSAI \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "HAZ \"essai 0 \n" +
                        "MUESTRA :ESSAI \n" +
                        "ESPERA 100 \n" +
                        "test01 \n" +
                        "ESPERA 100 \n" +
                        "MUESTRA :ESSAI \n" +
                        "; fonctions récursives \n" +
                        "PARA factorielle :N \n" +
                        "    SI :N = 0 [ DEVUELVE 1 ] \n" +
                        "    DEVUELVE ( factorielle :N - 1 ) * :N \n" +
                        "FIN\n" +
                        "\n" +
                        "MUESTRA factorielle 20 \n" +
                        "; Le dessin d'un chateau-fort \n" +
                        "; Le dessin de la tour \n" +
                        "PARA tour \n" +
                        "    PONRUMBO 0 \n" +
                        "    BAJALAPIZ \n" +
                        "    AVANZA 200 \n" +
                        "    REPITE 4 [ GIRAIZQUIERDA 90 AVANZA 10 GIRAIZQUIERDA 90 AVANZA 20 GIRADERECHA 90 AVANZA 10 GIRADERECHA 90 AVANZA 20 ] \n" +
                        "    GIRAIZQUIERDA 90 AVANZA 10 GIRADERECHA 90 RETROCEDE 200 \n" +
                        "FIN\n" +
                        "\n" +
                        "; Le dessin des créneaux \n" +
                        "PARA creneaux \n" +
                        "    REPITE 4 [ GIRAIZQUIERDA 90 AVANZA 10 GIRAIZQUIERDA 90 AVANZA 20 GIRADERECHA 90 AVANZA 10 GIRADERECHA 90 AVANZA 20 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "; Le dessin du chateau \n" +
                        "BORRAPANTALLA \n" +
                        "SUBELAPIZ \n" +
                        "CENTRO \n" +
                        "GIRADERECHA 90 AVANZA 200 GIRAIZQUIERDA 90 RETROCEDE 100 \n" +
                        "BAJALAPIZ \n" +
                        "PONCOLORLAPIZ [ 0 0 128 ] \n" +
                        "tour \n" +
                        "AVANZA 100 \n" +
                        "REPITE 2 [ creneaux ] \n" +
                        "RETROCEDE 100 \n" +
                        "tour \n" +
                        "GIRADERECHA 90 \n" +
                        "AVANZA 340 \n" +
                        "OCULTATORTUGA \n" +
                        "PARA sommer :N :RES \n" +
                        "    SI :N = 0 [ MUESTRA :RES ALTO ] \n" +
                        "    sommer :N - 1 :RES + :N \n" +
                        "FIN\n" +
                        "\n" +
                        "sommer 20 0 \n" +
                        "PARA feston \n" +
                        "    SISINO IGUALES? RUMBO 0 [ REPITE 60 [ AVANZA 1 GIRAIZQUIERDA 3 ] ] [ REPITE 60 [ AVANZA 1 GIRADERECHA 3 ] ] \n" +
                        "    GIRAIZQUIERDA 270 \n" +
                        "    HAZ \"d AVANZA 10 \n" +
                        "    SI :D <> 0 [ ALTO ] \n" +
                        "    feston \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "PONRUMBO 360 \n" +
                        "; feston \n" +
                        "; dessin village \n" +
                        "PARA mur :T \n" +
                        "    REPITE 4 [ AVANZA :T GIRAIZQUIERDA 90 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA toit :T \n" +
                        "    REPITE 3 [ AVANZA :T GIRAIZQUIERDA 120 ] \n" +
                        "    GIRAIZQUIERDA 30 SUBELAPIZ AVANZA 10 BAJALAPIZ SUBELAPIZ RETROCEDE 10 GIRADERECHA 30 BAJALAPIZ \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA maison :T \n" +
                        "    mur :T AVANZA :T GIRAIZQUIERDA 30 PONCOLORLAPIZ [ 255 0 0 ] toit :T \n" +
                        "    SUBELAPIZ GIRADERECHA 30 RETROCEDE :T GIRAIZQUIERDA 90 AVANZA :T GIRADERECHA 90 BAJALAPIZ \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA rue \n" +
                        "    SUBELAPIZ GIRAIZQUIERDA 90 AVANZA 10 GIRADERECHA 90 BAJALAPIZ \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA tronc \n" +
                        "    REPITE 15 [ AVANZA 200 RETROCEDE 200 GIRAIZQUIERDA 90 AVANZA 1 GIRADERECHA 90 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA feuil \n" +
                        "    REPITE 360 [ AVANZA 50 RETROCEDE 50 GIRAIZQUIERDA 1 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA arbre \n" +
                        "    PONCOLORLAPIZ [ 153 151 0 ] tronc AVANZA 180 GIRADERECHA 90 AVANZA 8 GIRAIZQUIERDA 45 PONCOLORLAPIZ [ 0 153 0 ] feuil \n" +
                        "    SUBELAPIZ PONRUMBO 0 RETROCEDE 180 GIRAIZQUIERDA 90 AVANZA 8 GIRADERECHA 90 BAJALAPIZ \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA soleil \n" +
                        "    PONCOLORLAPIZ [ 255 255 0 ] \n" +
                        "    REPITE 360 [ BAJALAPIZ AVANZA 40 BAJALAPIZ AVANZA 1 SUBELAPIZ RETROCEDE 41 GIRAIZQUIERDA 1 BAJALAPIZ ] \n" +
                        "    REPITE 60 [ SUBELAPIZ AVANZA 40 BAJALAPIZ AVANZA 35 SUBELAPIZ RETROCEDE 75 GIRAIZQUIERDA 6 BAJALAPIZ ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA vilag \n" +
                        "    GIRADERECHA 90 AVANZA 318 RETROCEDE 637 GIRAIZQUIERDA 45 SUBELAPIZ AVANZA 15 PONCOLORLAPIZ [ 204 153 32 ] BAJALAPIZ \n" +
                        "    SUBELAPIZ RETROCEDE 15 GIRADERECHA 45 BAJALAPIZ SUBELAPIZ GIRADERECHA 45 AVANZA 15 PONCOLORLAPIZ [ 64 128 64 ] RETROCEDE 15 \n" +
                        "    GIRAIZQUIERDA 45 BAJALAPIZ SUBELAPIZ PONPOS [ 0 0 ] PONRUMBO 0 GIRADERECHA 90 AVANZA 260 GIRAIZQUIERDA 90 RETROCEDE 140 BAJALAPIZ \n" +
                        "    PONCOLORLAPIZ [ 64 64 64 ] maison 65 rue PONCOLORLAPIZ [ 10 11 12 ] maison 45 rue rue \n" +
                        "    PONCOLORLAPIZ [ 64 64 64 ] maison 55 rue PONCOLORLAPIZ [ 11 12 13 ] maison 35 rue \n" +
                        "    PONCOLORLAPIZ [ 64 64 64 ] maison 75 REPITE 6 [ rue ] arbre \n" +
                        "    REPITE 11 [ rue ] arbre \n" +
                        "    SUBELAPIZ PONPOS [ 0 0 ] PONRUMBO 0 GIRADERECHA 90 AVANZA 160 GIRAIZQUIERDA 90 AVANZA 90 BAJALAPIZ soleil \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "MUESTRATORTUGA \n" +
                        "vilag \n" +
                        "OCULTATORTUGA \n" +
                        "; Quart de cercle \n" +
                        "PARA qcercle \n" +
                        "    REPITE 45 [ AVANZA 2 GIRAIZQUIERDA 2 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "; Pétale = 2 quarts de cercle \n" +
                        "PARA petale \n" +
                        "    REPITE 2 [ qcercle GIRAIZQUIERDA 90 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "; Fleur = 10 pétales \n" +
                        "PARA fleur \n" +
                        "    REPITE 10 [ petale GIRAIZQUIERDA 360 / 10 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "; Plante = fleur + tige + pétale + tige \n" +
                        "PARA plante \n" +
                        "    PONCOLORLAPIZ [ 128 0 0 ] ; Rouge \n" +
                        "    fleur \n" +
                        "    PONCOLORLAPIZ [ 0 64 0 ] ; Vert \n" +
                        "    RETROCEDE 130 \n" +
                        "    petale \n" +
                        "    RETROCEDE 70 \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "SUBELAPIZ \n" +
                        "PONRUMBO 0 \n" +
                        "PONPOS [ ( 0 - 250 ) ( 0 - 40 ) ] \n" +
                        "BAJALAPIZ \n" +
                        "REPITE 4 [ plante SUBELAPIZ AVANZA 200 GIRAIZQUIERDA 90 AVANZA 150 GIRADERECHA 90 BAJALAPIZ ] \n" +
                        "OCULTATORTUGA \n" +
                        "PARA khor :L :G \n" +
                        "    PONCOLORLAPIZ [ ( AZAR 255 ) ( AZAR 255 ) ( AZAR 255 ) ] \n" +
                        "    SI IGUALES? :G 0 [ AVANZA :L ALTO ] \n" +
                        "    khor :L / 3 :G - 1 GIRADERECHA 60 \n" +
                        "    khor :L / 3 :G - 1 GIRAIZQUIERDA 120 \n" +
                        "    khor :L / 3 :G - 1 GIRADERECHA 60 \n" +
                        "    khor :L / 3 :G - 1 \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "REPITE 3 [ khor 120 3 GIRAIZQUIERDA 120 ] \n" +
                        "OCULTATORTUGA \n" +
                        "PARA maniv :L \n" +
                        "    SI :L < 5 [ AVANZA :L ALTO ] \n" +
                        "    maniv :L / 4 GIRADERECHA 90 \n" +
                        "    REPITE 2 [ maniv :L / 4 GIRAIZQUIERDA 90 ] \n" +
                        "    maniv :L / 4 \n" +
                        "    REPITE 2 [ maniv :L / 4 GIRADERECHA 90 ] \n" +
                        "    maniv :L / 4 GIRAIZQUIERDA 90 \n" +
                        "    maniv :L / 4 \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "REPITE 6 [ maniv 80 GIRAIZQUIERDA 60 ] \n" +
                        "BORRAPANTALLA \n" +
                        "REPITE 4 [ AVANZA 100 GIRADERECHA 120 AVANZA 100 GIRADERECHA 120 AVANZA 100 GIRADERECHA 120 AVANZA 100 GIRAIZQUIERDA 90 ] \n" +
                        "BORRAPANTALLA \n" +
                        "REPITE 30 [ AVANZA AZAR 200 GIRAIZQUIERDA 90 ] \n" +
                        "BORRAPANTALLA \n" +
                        "PONGROSOR 2 \n" +
                        "HAZ \"angle 0 \n" +
                        "REPITE 500 [ AVANZA 10 GIRAIZQUIERDA :ANGLE HAZ \"angle :ANGLE + 7 ] \n" +
                        "BORRAPANTALLA \n" +
                        "HAZ \"l [ 2 4 14 4 13 2 4 2 2 4 ] \n" +
                        "HAZ \"cpt CUENTA :L \n" +
                        "HAZ \"i 1 \n" +
                        "SUBELAPIZ \n" +
                        "MIENTRAS [ :I < :CPT ] [ HAZ \"a ELEMENTO :I :L \n" +
                        "HAZ \"b ELEMENTO :I + 1 :L \n" +
                        "PONPOS [ ( :A * 10 ) ( :B * 10 ) ] \n" +
                        "HAZ :I :I + 2 \n" +
                        "BAJALAPIZ ] \n" +
                        "HAZ \"l [ 7 4 7 13 11 11 14 5 2 5 7 13 ] \n" +
                        "HAZ \"cpt CUENTA :L \n" +
                        "HAZ \"i 1 \n" +
                        "SUBELAPIZ \n" +
                        "MIENTRAS [ :I < :CPT ] [ HAZ \"a ELEMENTO :I :L \n" +
                        "HAZ \"b ELEMENTO :I + 1 :L \n" +
                        "PONPOS [ ( :A * 10 ) ( :B * 10 ) ] \n" +
                        "HAZ :I :I + 2 \n" +
                        "BAJALAPIZ ] \n" +
                        "PARA corner :SIZE \n" +
                        "    GIRAIZQUIERDA 45 \n" +
                        "    AVANZA :SIZE \n" +
                        "    GIRAIZQUIERDA 45 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA one_side :SIZE :DIAG :LEVEL \n" +
                        "    SI :LEVEL = 0 [ ALTO ] \n" +
                        "    one_side :SIZE :DIAG :LEVEL - 1 \n" +
                        "    GIRAIZQUIERDA 45 AVANZA :DIAG GIRAIZQUIERDA 45 \n" +
                        "    one_side :SIZE :DIAG :LEVEL - 1 \n" +
                        "    GIRADERECHA 90 AVANZA :SIZE GIRADERECHA 90 \n" +
                        "    one_side :SIZE :DIAG :LEVEL - 1 \n" +
                        "    GIRAIZQUIERDA 45 AVANZA :DIAG GIRAIZQUIERDA 45 \n" +
                        "    one_side :SIZE :DIAG :LEVEL - 1 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA sierp :SIZE :LEVEL \n" +
                        "    HAZ \"DIAG :SIZE / ( RAIZCUADRADA 2 ) \n" +
                        "    REPITE 4 [ one_side :SIZE :DIAG :LEVEL corner :DIAG ] \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "sierp 5 4 \n" +
                        "PARA randomwalk \n" +
                        "    REPITE 100 [ HAZ \"r AZAR 3 \n" +
                        "    SI :R = 0 [ AVANZA 20 ] \n" +
                        "    SI :R = 1 [ GIRAIZQUIERDA 90 AVANZA 20 ] \n" +
                        "    SI :R = 2 [ GIRADERECHA 90 AVANZA 20 ] ] \n" +
                        "FIN\n" +
                        "\n" +
                        "randomwalk \n" +
                        "PARA spiralr :N \n" +
                        "    SI :N < 1 [ ALTO ] \n" +
                        "    AVANZA :N \n" +
                        "    GIRAIZQUIERDA 20 \n" +
                        "    spiralr 0.95 * :N \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "spiralr 50 \n" +
                        "PARA spiral :D :S :A \n" +
                        "    BORRAPANTALLA OCULTATORTUGA BAJALAPIZ \n" +
                        "    HAZ \"x :D \n" +
                        "    REPITE REDONDEA 350 / :S [ AVANZA :X GIRAIZQUIERDA :A HAZ \"x :X + :S ] \n" +
                        "    ESPERA 100 \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA spirals \n" +
                        "    ; setpensize [3 3] \n" +
                        "    PONCOLORLAPIZ [ 255 0 0 ] spiral 0 1.2 53 \n" +
                        "    PONCOLORLAPIZ [ 0 255 0 ] spiral 0 4 90 \n" +
                        "    PONCOLORLAPIZ [ 0 0 255 ] spiral 0 3 178 \n" +
                        "    PONCOLORLAPIZ [ 0 0 0 ] \n" +
                        "    ; SETPENSIZE [1 1] \n" +
                        "    SUBELAPIZ \n" +
                        "    CENTRO \n" +
                        "    BAJALAPIZ \n" +
                        "FIN\n" +
                        "\n" +
                        "spirals \n" +
                        "PARA tap :L :G \n" +
                        "    SISINO :G = 0 [ AVANZA :L ALTO ] \n" +
                        "    [ tap :L / 5 :G - 1 \n" +
                        "    GIRADERECHA 90 SUBELAPIZ AVANZA :L / 5 BAJALAPIZ \n" +
                        "    REPITE 4 [ tap :L / 5 :G - 1 GIRAIZQUIERDA 90 ] \n" +
                        "    SUBELAPIZ RETROCEDE :L / 5 GIRAIZQUIERDA 90 AVANZA :L / 5 BAJALAPIZ \n" +
                        "    tap :L / 5 :G - 1 \n" +
                        "    GIRAIZQUIERDA 90 SUBELAPIZ AVANZA :L / 5 BAJALAPIZ \n" +
                        "    tap :L / 5 :G - 1 \n" +
                        "    REPITE 4 [ tap :L / 5 :G - 1 GIRADERECHA 90 ] \n" +
                        "    SUBELAPIZ RETROCEDE :L / 5 GIRADERECHA 90 AVANZA :L / 5 BAJALAPIZ \n" +
                        "    tap :L / 5 :G - 1 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA tapis :G :L \n" +
                        "    REPITE 8 [ tap :G :L GIRAIZQUIERDA 45 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "tapis 80 3 \n" +
                        "BORRAPANTALLA \n" +
                        "HAZ \"size 10 \n" +
                        "REPITE 60 [ AVANZA :SIZE GIRAIZQUIERDA 120 HAZ \"size :SIZE + 7 ] \n" +
                        "PARA square :SIZE \n" +
                        "    REPITE 4 [ AVANZA :SIZE GIRAIZQUIERDA 90 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "REPITE 20 [ square 100 GIRAIZQUIERDA 20 ] \n" +
                        "BORRAPANTALLA \n" +
                        "REPITE 36 [ square 100 GIRAIZQUIERDA 10 ] \n" +
                        "BORRAPANTALLA \n" +
                        "HAZ \"size 200 \n" +
                        "REPITE 36 [ square :SIZE GIRAIZQUIERDA 10 HAZ \"size :SIZE - 5 ] \n" +
                        "BORRAPANTALLA \n" +
                        "HAZ \"size 200 \n" +
                        "PONGROSOR 2 \n" +
                        "REPITE 36 [ PONCOLORLAPIZ LISTA ( AZAR 255 ) ( AZAR 255 ) ( AZAR 255 ) \n" +
                        "square :SIZE GIRAIZQUIERDA 10 HAZ \"size :SIZE - 5 ] \n" +
                        "BORRAPANTALLA \n" +
                        "HAZ \"size 180 \n" +
                        "PONGROSOR 2 \n" +
                        "PONCOLORLAPIZ LISTA AZAR 128 AZAR 255 AZAR 64 \n" +
                        "MIENTRAS [ :SIZE > 0 ] [ square :SIZE GIRAIZQUIERDA 10 HAZ \"size :SIZE - 2 ] \n" +
                        "PARA star1 :SIZE \n" +
                        "    REPITE 5 [ AVANZA :SIZE GIRAIZQUIERDA 144 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "CENTRO \n" +
                        "HAZ \"size 40 \n" +
                        "MIENTRAS [ :SIZE > 1 ] [ SUBELAPIZ PONPOS LISTA ( ( AZAR 700 ) - 350 ) ( ( AZAR 400 ) - 200 ) \n" +
                        "BAJALAPIZ \n" +
                        "PONCOLORLAPIZ LISTA AZAR 255 AZAR 255 AZAR 255 \n" +
                        "star1 :SIZE \n" +
                        "HAZ \"size :SIZE - 0.5 ] \n" +
                        "; D'après TER Interpréteur Logo (ALLIER Simon – GROLLEMUND Naïtan – LALLUQUE Renaud - DELFOUR Kevin ) \n" +
                        "; http://naitan.free.fr/logo/ \n" +
                        "PARA ccurve :LONG :PROFONDEUR \n" +
                        "    SISINO :PROFONDEUR < -1 [ AVANZA REDONDEA :LONG ] [ GIRADERECHA 45 ccurve :LONG / 1.41421 :PROFONDEUR - 1 \n" +
                        "    GIRAIZQUIERDA 45 ccurve :LONG / 1.41421 :PROFONDEUR - 1 \n" +
                        "    GIRADERECHA 45 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA ro :X \n" +
                        "    PONCOLORLAPIZ AZUL \n" +
                        "    SUBELAPIZ PONXY -50 50 BAJALAPIZ \n" +
                        "    REPITE :X [ ccurve 100 8 GIRAIZQUIERDA 360 / :X ] \n" +
                        "FIN\n" +
                        "\n" +
                        "BORRAPANTALLA \n" +
                        "ro 6 \n" +
                        "PARA manpower \n" +
                        "    MUESTRATORTUGA \n" +
                        "    SUBELAPIZ \n" +
                        "    PONPOS [ 40 40 ] \n" +
                        "    BAJALAPIZ \n" +
                        "    PONPOS [ 40 ( -40 ) ] PONPOS [ -40 ( -40 ) ] PONPOS [ -40 40 ] \n" +
                        "    PONPOS [ 40 40 ] PONPOS [ -40 ( -40 ) ] \n" +
                        "    PONPOS [ 0 40 ] PONPOS [ 40 0 ] PONPOS [ 40 40 ] \n" +
                        "    PONPOS [ -40 0 ] PONPOS [ 40 0 ] \n" +
                        "    PONPOS [ -40 40 ] PONPOS [ 0 ( -40 ) ] \n" +
                        "    PONPOS [ -40 0 ] PONPOS [ 40 0 ] PONPOS [ -40 40 ] \n" +
                        "    PONPOS [ 40 ( -40 ) ] PONPOS [ -40 0 ] \n" +
                        "    PONPOS [ -40 ( -40 ) ] PONPOS [ 40 0 ] \n" +
                        "    PONPOS [ 0 40 ] PONPOS [ 40 ( -40 ) ] \n" +
                        "    PONPOS [ 0 ( -40 ) ] PONPOS [ -40 40 ] \n" +
                        "    PONPOS [ 0 40 ] PONPOS [ 0 ( -40 ) ] PONPOS [ 40 0 ] \n" +
                        "    PONPOS [ 40 40 ] PONPOS [ 0 ( -40 ) ] PONPOS [ 0 40 ] \n" +
                        "    PONPOS [ -40 0 ] \n" +
                        "    CENTRO \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "manpower \n" +
                        "PARA soleil1 \n" +
                        "    REPITE 360 [ AVANZA 58 RETROCEDE 58 GIRAIZQUIERDA 1 ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA couronne \n" +
                        "    REPITE 360 [ SUBELAPIZ AVANZA 68 BAJALAPIZ AVANZA 6 SUBELAPIZ RETROCEDE 74 BAJALAPIZ GIRAIZQUIERDA 1 PONCOLORLAPIZ ROJO ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA satellite \n" +
                        "    REPITE 14 [ SUBELAPIZ AVANZA 92 BAJALAPIZ REPITE 360 [ AVANZA 12 RETROCEDE 12 GIRAIZQUIERDA 1 ] SUBELAPIZ RETROCEDE 92 GIRAIZQUIERDA 360 / 14 BAJALAPIZ PONCOLORLAPIZ VERDE ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA satellite2 \n" +
                        "    REPITE 14 [ SUBELAPIZ AVANZA 112 BAJALAPIZ REPITE 360 [ AVANZA 8 RETROCEDE 8 GIRAIZQUIERDA 1 ] SUBELAPIZ RETROCEDE 112 GIRAIZQUIERDA 360 / 14 BAJALAPIZ PONCOLORLAPIZ ROJO ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA satellite3 \n" +
                        "    REPITE 2 [ REPITE 14 [ SUBELAPIZ AVANZA 136 BAJALAPIZ REPITE 360 [ AVANZA 8 RETROCEDE 8 GIRAIZQUIERDA 1 ] SUBELAPIZ RETROCEDE 136 GIRAIZQUIERDA 360 / 28 BAJALAPIZ AZUL ] PONCOLORLAPIZ ROJO ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA couronne2 \n" +
                        "    REPITE 3600 [ SUBELAPIZ AVANZA 154 BAJALAPIZ AVANZA 4 SUBELAPIZ RETROCEDE 158 BAJALAPIZ GIRAIZQUIERDA 0.1 PONCOLORLAPIZ ROJO ] \n" +
                        "FIN\n" +
                        "\n" +
                        "PARA systeme \n" +
                        "    BORRAPANTALLA \n" +
                        "    PONCOLORLAPIZ AMARILLO soleil1 \n" +
                        "    PONCOLORLAPIZ AZUL couronne \n" +
                        "    PONCOLORLAPIZ AZUL satellite \n" +
                        "    PONCOLORLAPIZ AZUL GIRAIZQUIERDA 12 satellite2 \n" +
                        "    PONCOLORLAPIZ AZUL fcap 0 satellite3 \n" +
                        "    couronne \n" +
                        "FIN\n" +
                        "\n" +
                        "ESPERA 300 \n" +
                        "systeme ";
                    break;
                default:
                    codigoLogoEjemplo = "Selecciona una de las opciones por favor";
            }
            exeditor.clearSelection();
            exeditor.setValue(codigoLogoEjemplo);
            editor.setValue(codigoLogoEjemplo);
            editor.scrollToLine(1, true, true);
            editor.gotoLine(1, 0, false);
            editor.clearSelection();
            editor.focus();
            $("#tabs").tabs("option", "active", 0);
        });
        $("#err_dialog").dialog({
            autoOpen: false,
            show: {
                effect: "bounce",
                duration: 500
            },
            hide: {
                effect: "fade",
                duration: 500
            }
        });
        $("#files").selectmenu({
            change: function (g, h) {
                charge(h.item.value);
            }
        });
        $("#vitesse").change(function () {
            logo.vitesse(this.value);
        });
        logo.vitesse($("#vitesse").value);
        $("#seltortue").selectmenu({
            change: function (g, h) {
                logo.sel_tortue(h.item.index);
            }
        });
        logo.sel_tortue($("#seltortue")[0].selectedIndex);
        $("#selfond").selectmenu({
            change: function (g, h) {
                logo.sel_fond(h.item.index);
            }
        });
        logo.sel_fond($("#selfond")[0].selectedIndex);
        $("#affichage").selectmenu({
            change: function (g, h) {
                logo.affichage(h.item.index);
                logo.sel_tortue($("#seltortue")[0].selectedIndex);
            }
        });
        logo.affichage($("#affichage")[0].selectedIndex);
        $("#debug").change(function () {
            debug = this.checked;
        });
        logo.vitesse($("#vitesse").val());
        debug = $("#debug").is(":checked");
        editor.setTheme("ace/theme/chrome");
        editor.getSession().setMode("ace/mode/logoes");
        editor.getSession().setFoldStyle("markbeginend");
        editor.setFontSize(20);
        editor.setBehavioursEnabled(true);
        editor.setOptions({
            enableBasicAutocompletion: true,
            enableSnippets: true,
            $blockScrolling: Infinity,
            enableLiveAutocompletion: false
        });
        editor.setFontSize(20);
        editor.setBehavioursEnabled(true);
        var b = ace.require("ace/ext/language_tools");
        exeditor.setTheme("ace/theme/chrome");
        exeditor.getSession().setMode("ace/mode/logoes");
        exeditor.setFontSize(12);
        exeditor.setReadOnly(true);
        document.getElementById("linkpng").onclick = function (g) {
            prepare_download(this, "png");
        };
        document.getElementById("linksvg").onclick = function (g) {
            prepare_download(this, "svg");
        };
        editor.on("guttermousedown", function (k) {
            var j = k.domEvent.target, h;
            if (j.className.indexOf("ace_gutter-cell") == -1) {
                return;
            }
            if (!editor.isFocused()) {
                return;
            }
            if (k.clientX > 25 + j.getBoundingClientRect().left) {
                return;
            }
            var g = editor.session.getBreakpoints();
            var l = k.getDocumentPosition().row;
            if (g[l]) {
                k.editor.session.clearBreakpoint(l);
            } else {
                k.editor.session.setBreakpoint(l, "break");
            }
            k.stop();
        });
        var e = sessionStorage.getItem("LW-logo");
        if (!e) {
            e = localStorage.getItem("LW-logo");
        }
        if (e) {
            editor.setValue(e);
        }
        editor.clearSelection();
        editor.focus();
        var e = $("#files")[0].value;
        setTimeout(function () {
            charge(e);
        }, 2000);
        maj_him();
        e = decodeURI(location);
        if (e.indexOf("?") > 0) {
            var d = e.indexOf("?");
            var f = e.substring(d + 1).split("&");
            var a = f[0].split("=");
            if ((a.length > 0) && (a[0] === "svg") && (a[1]) && (a[1].length > 2)) {
                var c = "";
                $.ajax({
                    type: "GET",
                    url: a[1],
                    dataType: "xml",
                    success: function (g) {
                        c = $(g).find("desc").text();
                        if (c) {
                            c = logo.importe(c);
                            editor.setValue(c);
                            editor.scrollToLine(1, true, true);
                            editor.gotoLine(1, 0, false);
                            editor.clearSelection();
                            editor.focus();
                        }
                    }
                });
            }
        }
    });
});