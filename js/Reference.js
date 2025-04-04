﻿/* ***************************************************************************/
/* Reference  ****************************************************************/
/* Description du langage et des fonctions                                   */
/* JSLint 20150609                                                           */
/* ***************************************************************************/
"use strict";

/* Messages d'erreurs */


function Reference() { /******************************************************/

    /* Procedures du langage */
    this.procedures = [];
    this.procedures_util = [];

    /* Libellés */

    this.libelle = {
        crayon: 'Lapiz :',
        encours: 'En marcha',
        enpause: 'Pausar.',
        pile   : 'Tamaño de la pila :',
        statut : 'Estado de la tortuga : '
    };

    /* Messages d'erreurs */
    this.les_messages = {
      crochet       : '"[" y "]" emparejadas.',
      inconnu       : 'Carácter desconocido en el lenguaje',
      nombre        : 'No se puede interpretar este número',
      type          : 'Tipo desconocido'
    };

    /* Nom des fonctions */
    this.les_fonctions = {
      ARRONDI : {std: ['redondea'] }, // Round
      ATTENDS : {std: ['espera'] },   // Wait
      AV : {std: ['avanza','av']},
      BC : {std: ['bajalapiz','bl']},
      BLANC : {std:['blanco']},
      BLEU : {std: ['azul']},
      BRUN : {std:['marron']},
      CACHETORTUE : {std:['ocultatortuga','ot']},
      CAP :{std:['rumbo']},     // heading
      CHOIX : {std:['elegir']},  // pick
      CHOSE : {std:['valor']},
      COMPTE:{std:['cuenta']},   // count
      COMPTEUR : {std: ['cuentarepite']}, // repcount
      COS : {std:['coseno','cos']}, // cos
      CYAN : {std:['cian']}, 
      DERNIER : {std:['ultimo','ul']}, // last
      DIFFERENCE : {std:['diferencia']},
      DONNE : {std:['haz']}, // make
      DONNELOCALE : {std:['hazlocal']}, // localmake
      EGALQ : {std:['iguales?','igual?']},
      ENLEVE : {std:['quita']},   // remove
      ENT : {std:['entero']}, // int
      ET : {std:['y']}, // and
      ETIQUETTE : {std:['rotula','ro']}, // label
      EXECUTE : {std:['ejecuta']},
      FAUX : {std:['falso']},
      FCC : {std:['poncolorlapiz','poncl']},
      FIN : {std:['fin']},
      FIXECAP : {std:['ponrumbo']},
      FIXEPOS : {std:['ponpos']},
      FIXEX : {std:['ponx']},
      FIXEXY : {std:['ponxy']},
      FIXEY : {std:['pony']},
      FTC : {std:['pongrosor','pong']},
      GRIS: {std:['gris']},
      HASARD : {std:['azar']},
      INIT : {std:['init!']},
      INVERSE : {std:['invierte']}, // reverse
      ITEM : {std:['elemento']}, // item
      JAUNE : {std:['amarillo']},
      JUSQUA : {std:['hasta']},
      LC : {std:['subelapiz','sl']},
      LISTE : {std:['lista']},
      LISTEQ : {std:['lista?']},
      LOCALE : {std:['local']},
      LOG10 : {std:['log10','lg']},
      MAGENTA : {std:['magenta']},
      MOINS : {std:['menos']}, // minus
      MELANGE : {std:['mezcla']},
      METSDERNIER : {std : ['ponultimo','pu']}, // lput
      METSPREMIER : {std : ['ponprimero','pp']}, // fput
      MONTRE : {std:['muestra']},
      MONTRETORTUE : {std:['muestratortuga','mt']},
      MOT  : {std:['palabra']}, // word
      MOTQ : {std:['palabra?']}, //word?
      MUR : {std:['pared&']},
      NETTOIE : {std:['limpia']}, // clean
      NOIR : {std:['negro']},
      NOMBREQ : {std:['numero?']}, // number?
      NON : {std:['no']},
      NONEQ : {std:['noigual?']}, 
      ORIGINE : {std:['centro']},
      OU : {std:['o']},
      PI : {std:['pi']},
      PHRASE : {std:['frase','fr']}, // sentence
      PLGRQ : {std:['mayorque?','mayor?']},
      PLPEQ : {std:['menorque?','menor?']},      
      POS: {std:['posicion','pos']},
      POUR: {std:['para']}, // to
      PREMIER: {std:['primero','pri']}, // first
      PRODUIT: {std:['producto']}, // product
      PUISSANCE: {std:['potencia']}, // power
      QUOTIENT: {std:['division']},
      RACINE: {std:['raizcuadrada','rc']}, // srqt
      RE : {std:['retrocede','re']}, // back
      REMPLIS : {std:['rellena']},  // fill
      REPETE : {std:['repite']}, // repeat
      REPETEPOUR : {std:['repitepara']},
      RESTE : {std:['resto']}, // remainder
      RETOURNE : {std:['devuelve','dev']}, // output
      ROUGE : {std:['rojo']},
      SD : {std:['menosultimo','mu']}, // butlast
      SI : {std:['si']}, // if
      SIN : {std:['seno','sen']},
      SINON : {std:['sisino']},
      SOMME : {std:['suma']},
      SP : {std:['menosprimero','mp']}, // butfirst
      STOP : {std:['alto']},
      TANTQUE: {std:['mientras']},
      TD : {std:['giraizquierda','gi']},
      TG : {std:['giraderecha','gd']},
      VE : {std:['borrapantalla', 'bp']}, // Clearscreen
      VERT : {std:['verde']},
      VIDEQ : {std:['vacio?']}, // empty?
      VRAI : {std:['verdadero','cierto']} // true
    };

    //      code,   mini_arg,   maxi_arg,   style,  ret,    priorite,   action           arguments attendus. *=nimp, n=nombre, b=booleen, l=liste, m=mot, w=mot ou liste, c=couleur

    this.add(   'AV',   1,          1,          'p',    1,      5,          f_tortue,       'n');
    this.add('ATTENDS', 1,          1,          'p',    1,      5,          f_tortue,       'n');
    this.add(   'BC',   0,          0,          'p',    1,      5,          f_tortue,       '*');
    this.add('CACHETORTUE',0,       0,          'p',    1,      5,          f_tortue,       '*');
    this.add(  'CAP',   0,          0,          'p',    1,     50,          f_tortue,       '*');
    this.add('ETIQUETTE',1,         1,          'p',    1,      5,          f_tortue,       '*');
    this.add( 'FCC',    1,          1,          'p',    1,      5,          f_tortue,       'l');
    this.add( 'FTC',    1,          1,          'p',    1,      5,          f_tortue,       'n');
    this.add( 'FIXECAP',1,          1,          'p',    1,      5,          f_tortue,       'n');
    this.add( 'FIXEPOS',1,          1,          'p',    1,      5,          f_tortue,       'l');
    this.add(   'FIXEX',1,          1,          'p',    1,      5,          f_tortue,       'n');
    this.add(  'FIXEXY',2,          2,          'p',    1,      5,          f_tortue,       'n');
    this.add(   'FIXEY',1,          1,          'p',    1,      5,          f_tortue,       'n');
    this.add(   'LC',   0,          0,          'p',    1,      5,          f_tortue,       '*');
    this.add('MONTRE',  1,      99999,          'p',    1,      5,          f_tortue,       '*');
    this.add('MONTRETORTUE',0,      0,          'p',    1,      5,          f_tortue,       '*');
    this.add('NETTOIE' ,0,          0,          'p',    1,      5,          f_tortue,       '*');
    this.add( 'ORIGINE',0,          0,          'p',    1,      5,          f_tortue,       '*');
    this.add(  'POS',   0,          0,          'p',    1,     50,          f_tortue,       '*');
    this.add('REMPLIS', 0,          0,          'p',    1,      5,          f_tortue,       '*');
    this.add(   'TD',   1,          1,          'p',    1,      5,          f_tortue,       'n');
    this.add(   'TG',   1,          1,          'p',    1,      5,          f_tortue,       'n');
    this.add(   'RE',   1,          1,          'p',    1,      5,          f_tortue,       'n');
    this.add(   'VE',   0,          0,          'p',    1,      5,          f_tortue,       '*');

    this.add('BLANC',   0,          0,          'p',    1,     50,          f_couleur,      'n');
    this.add('BLEU',    0,          0,          'p',    1,     50,          f_couleur,      'n');
    this.add('BRUN',    0,          0,          'p',    1,     50,          f_couleur,      'n');
    this.add('CYAN',    0,          0,          'p',    1,     50,          f_couleur,      'n');
    this.add('GRIS',    0,          0,          'p',    1,     50,          f_couleur,      'n');
    this.add('JAUNE',   0,          0,          'p',    1,     50,          f_couleur,      'n');
    this.add('MAGENTA', 0,          0,          'p',    1,     50,          f_couleur,      'n');
    this.add('NOIR',    0,          0,          'p',    1,     50,          f_couleur,      'n');
    this.add('ROUGE',   0,          0,          'p',    1,     50,          f_couleur,      'n');
    this.add('VERT',    0,          0,          'p',    1,     50,          f_couleur,      'n');

    this.add('ARRONDI', 1,          1,          'p',    1,     20,          f_math,         'n');
    this.add('HASARD',  1,          1,          'p',    1,     20,          f_math,         'n');
    this.add('SOMME',   2,      99999,          'p',    1,     20,          f_math,         'n');
    this.add('DIFFERENCE',2,    99999,          'p',    1,     10,          f_math,         'n');
    this.add('ENT',     1,          1,          'i',    1,     20,          f_math,         'n');
    this.add('MOINS',   1,          1,          'p',    1,     20,          f_math,         'n');
    this.add('PRODUIT', 2,      99999,          'p',    1,     20,          f_math,         'n');
    this.add('RESTE',   2,          2,          'p',    1,     20,          f_math,         'n');    
    this.add('RACINE',  1,          1,          'p',    1,     20,          f_math,         'n');
    this.add('PI',      0,          0,          'p',    1,     50,          f_math,         'n');
    this.add('PUISSANCE',2,     99999,          'p',    1,     20,          f_math,         'n');
    this.add('LOG10',   1,          1,          'p',    1,     20,          f_math,         'n');
    this.add('SIN',     1,          1,          'p',    1,     20,          f_math,         'n');
    this.add('COS',     1,          1,          'p',    1,     20,          f_math,         'n');
    this.add('QUOTIENT',2,      99999,          'p',    1,     20,          f_math,         'n');
    this.add('+',       2,          2,          'i',    1,     10,          f_math,         'n');
    this.add('*',       2,          2,          'i',    1,     20,          f_math,         'n');
    this.add('-',       2,          2,          'i',    1,     10,          f_math,         'n');
    this.add('/',       2,          2,          'i',    1,     20,          f_math,         'n');
    this.add('%',       2,          2,          'i',    1,     20,          f_math,         'n');
    this.add('^',       2,          2,          'i',    1,     20,          f_math,         'n');
    

    this.add('CHOIX',   1,          1,          'p',    1,      5,          f_liste,        'w');
    this.add('COMPTE',  1,          1,          'p',    1,     10,          f_liste,        'w');
    this.add('DERNIER', 1,          1,          'p',    1,     10,          f_liste,        'w');
    this.add('ENLEVE',  2,          2,          'p',    1,      5,          f_liste,       '*l');
    this.add('INVERSE', 1,          1,          'p',    1,      5,          f_liste,        'w');
    this.add('ITEM',    2,          2,          'p',    1,      5,          f_liste,       'nw');
    this.add('LISTE',   1,      99999,          'p',    1,     10,          f_liste,        '*');
    this.add('METSDERNIER', 2,      2,          'p',    1,     10,          f_liste,       '*l');
    this.add('METSPREMIER', 2,      2,          'p',    1,     10,          f_liste,       '*l');
    this.add('MELANGE', 1,      99999,          'p',    1,     10,          f_liste,        'l');
    this.add('MOT',     1,      99999,          'p',    1,     10,          f_liste,        '*');
    this.add('PHRASE',  1,      99999,          'p',    1,     10,          f_liste,        '*');
    this.add('PREMIER', 1,          1,          'p',    1,     10,          f_liste,        'w');
    this.add('SD',      1,          1,          'p',    1,     10,          f_liste,        'w');
    this.add('SP',      1,          1,          'p',    1,     10,          f_liste,        'w');
    this.add('VIDEQ',   1,          1,          'p',    1,     10,          f_liste,        'w');

    this.add('VRAI',    0,          0,          'p',    1,     50,          f_logique,      'b');
    this.add('FAUX',    0,          0,          'p',    1,     50,          f_logique,      'b');
    this.add('ET',      2,      99999,          'p',    1,     20,          f_logique,      'b');
    this.add('&',       2,          2,          'i',    1,     20,          f_logique,      'b');
    this.add('OU',      2,      99999,          'p',    1,     10,          f_logique,      'b');
    this.add('|',       2,          2,          'i',    1,     20,          f_logique,      'b');
    this.add('NON',     1,          1,          'p',    1,     10,          f_logique,      'b');

    this.add('=',       2,          2,          'i',    1,     10,          f_compare,      '*');
    this.add('>',       2,          2,          'i',    1,     10,          f_compare,      '*');
    this.add('<',       2,          2,          'i',    1,     10,          f_compare,      '*');
    this.add('<>',      2,          2,          'i',    1,     10,          f_compare,      '*');
    this.add('<=',      2,          2,          'i',    1,     10,          f_compare,      '*');
    this.add('>=',      2,          2,          'i',    1,     10,          f_compare,      '*');
    this.add('EGALQ',   2,          2,          'p',    1,     10,          f_compare,     '**');

    this.add('LISTEQ',  1,          1,          'p',    1,     20,          f_predicat,     '*');
    this.add('MOTQ',    1,          1,          'p',    1,     20,          f_predicat,     '*');
    this.add('NOMBREQ', 1,          1,          'p',    1,     20,          f_predicat,     '*');

    this.add('EXECUTE', 1,          1,          'p',    1,     10,          f_exec,          'l');
    this.add('JUSQUA',  2,          2,          'p',    0,     10,          f_exec,         'll');
    this.add('TANTQUE', 2,          2,          'p',    0,     10,          f_exec,         'll');
    this.add('REPETE',  2,          2,          'p',    0,     10,          f_exec,         'nl');
    this.add('REPETEPOUR', 2,       2,          'p',    0,     10,          f_exec,         'll');
    this.add('SI',      2,          2,          'p',    0,     10,          f_si,           'bl');
    this.add('SINON',   3,          3,          'p',    0,     10,          f_si,          'bll');
    this.add('COMPTEUR',0,          0,          'p',    1,     50,          f_compteur,      '*');
    this.add('CHOSE',   1,          1,          'p',    1,     50,          f_variable,      'm');
    this.add('DONNE',   2,          2,          'p',    0,      5,          f_variable,     'm*');
    this.add('DONNELOCALE',2,       2,          'p',    0,      5,          f_variable,     'm*');
    this.add('LOCALE',  1,      99999,          'p',    0,      5,          f_variable,      'm');
    this.add('(',       0,          0,          'i',    0,      0,          null,            '*');
    this.add( 'POUR',   0,          0,          'p',    0,     50,          null,            '*');
    this.add(  'FIN',   0,          0,          'p',    0,     50,          null,            '*');
    this.add( 'STOP',   0,          0,          'p',    0,     50,          f_stop,          '*');
    this.add('RETOURNE',1,          1,          'p',    0,      5,          f_stop,          '*');
    
    this.add('$EVT!',   0,          0,          'p',    0,     50,          f_evenement,     '*'); 
    this.add('MUR',     1,          1,          'p',    0,     50,          f_evenement,     'l');        
} // Reference

Reference.prototype.add = function (code,mini_arg,maxi_arg,style,ret,priorite,action,type_params) {
    var p;
    if (this.les_fonctions[code]) {
        p = new Procedure(code,
                          this.les_fonctions[code].std,
                          mini_arg,
                          maxi_arg,
                          style,
                          ret,
                          priorite,
                          action);
    } else {
        p = new Procedure(code,
                          [code],
                          mini_arg,
                          maxi_arg,
                          style,
                          ret,
                          priorite,
                          action);
    }    
    p.code=code;
    p.type_params = type_params;
    this.procedures.push(p);
}; // add

// Mise en forme de l'erreur pour affichage
Reference.prototype.erreur = function(token) { /******************************/
    var s='';
    if (token) {
            switch (token.origine) {
                case 'analyse' : s='<b>Error análisis léxico</b><br>';
                                 break;
                case 'interprete' :s='<b>Error de interpretación</b><br>';
                                 break;
                case 'eval' :    s='<b>Error de apreciación</b><br>';
                                 break;
                default :       s='<b>Error</b><br>';break;
            }
            if (token.ligne) {s=s+'Línea: '+token.ligne+' ';}
            if (token.colonne) {s=s+'Columna: '+token.colonne+'<br>';}
            switch (token.nom) {
                case 'analyse'        : s=s+'Código no para ser analizados.';break;
                case 'argument'     : s=s+'Los argumentos no corresponden a la orden <span class="valencia">'+token.valeur+'</span>';break;
                case 'booleen'      : s=s+'Tipo de parámetro < booleano> espera después <span class="valencia">'+token.valeur+'</span>';break;
                case 'caractere non reconnu' : s=s+'Carácter <span class="valencia">'+token.valeur+'</span> no reconocido';break;
                case 'couleur'      :  s=s+'Parámetro de tipo <color> ( 3 lista de números ) espera después<span class="valencia">'+token.valeur+'</span>';break;
                case 'crochet'      : s=s+'Los corchetes ([ -] ) no coinciden';break;
                case 'element vide' : s=s+'Error del sistema';break;
                case 'evaluation'   : s=s+'Problema durante la evaluación de <span class="valencia">'+token.valeur+'</span>';
                                      if (token.err) {s=s+'<br>'+token.err+'</br>';}
                                      break;
                case 'fin fonction' : s=s+'El final de la función <span class="valencia">'+token.valeur+'</span> no está indicado.';break;
                case 'format numerique' : s=s+'Formato incorrecto para el número <span class="valencia">'+token.valeur+'</span>';break;
                case 'inconnu'      : s=s+'No conozco <span class="valencia">'+token.valeur+'</span>';break;
                case 'init'         : s=s+'La llamada a <span class="valencia">'+token.valeur+'</span> ebe hacerse en una función de inicialización.';
                case 'liste'        : s=s+'Tipo de parámetro < lista> esperado después <span class="valencia">'+token.valeur+'</span>';break;
                case 'nombre'       : s=s+'Numero esparado en <span class="valencia">'+token.valeur+'</span>';break;
                case 'non trouve'   : s=s+'No conozco<em>'+token.valeur+'</em>';break;
                case 'nul'            : s=s+'Error del sistema. ';break;
                case 'parenthese'   : s=s+'Problema de paréntesis';break;
                case 'pile vide'    : s=s+'Error del sistema.';break;
                case 'procedure dupliquee' : s=s+'El procedimiento <span class="valencia">'+token.valeur+'</span> ya ha sido definido';break;
                case 'procedure imbriquee' : s=s+'Procedimientos definición anidado';break;
                case 'que faire'    : s=s+'¿ Qué hacer con <em>'+token.valeur+'</em> ?';break;
                case 'variable non trouve' : s=s+'Variable <em>'+token.valeur+'</em> no encontrada';break;
                default             : s=s+token.nom;break;
            }
    } else { s='Error desconocido'; }
    return s;
}; // erreur


/* ***************************************************************************/
/* Definition des fonctions **************************************************/
/* ***************************************************************************/

/* Fonctions de comparaison **************************************************/
function f_compare(interpreteur,token,params) { /*****************************/
    var ret,s,i,n;
    s=false;
    if (token.procedure.nbarg===0) {
        n = token.numero;
    }
    else {
        i=0;n=0;
        while (i<params.length) {
            if (params[i].numero>n) {n = params[i].numero;}
            try {
                switch (token.procedure.code) {
                    case '='    :   if (i==1) {s=params[0].valeur == params[1].valeur;}
                                   break;
                    case 'PLGRQ':
                    case '>'    :  if (i==1) {s=params[0].valeur > params[1].valeur;}
                                   break;
                    case 'PLPEQ':
                    case '<'    :   if (i==1) {s=params[0].valeur < params[1].valeur;}                    
                                    break;
                    case 'NONEQ':
                    case '<>'   :   if (i==1) {s=params[0].valeur != params[1].valeur;}
                                    break;
                    case '<='   :   if (i==1) {s=params[0].valeur <= params[1].valeur;}
                                    break;
                    case '>='   :   if (i==1) {s=params[0].valeur >= params[1].valeur;}
                                    break;
                    case 'EGALQ':   if (i==1) {s=params[0].valeur == params[1].valeur;}
                                    break;
                    default     :   ret = erreur(params[i],'evaluation',new Error().stack);
                                    ret.origine='eval';
                                    ret.cpl = interpreteur;
                                    return ret;
                }
            }
                        
            catch(err) {
                ret = erreur(params[i],'evaluation',new Error().stack);
                ret.origine='eval';
                ret.err = err;
                ret.cpl = interpreteur;
                return ret;
            }
            if (isNaN(s) || (! isFinite(s))) {
                ret = erreur(params[i],'evaluation',new Error().stack);
                ret.origine='eval';
                ret.cpl = interpreteur;
                return ret;
            }
            i++;
        }
    }
    ret = new Token('booleen',s,'!');
    ret.numero = n;
    ret.origine='eval';
    return ret;
} // f_compare

/* Compteur pour l'instruction repete ****************************************/
function f_compteur(interpreteur,token,params) {
    var t = new Token('variable',':$-compteur');
    var ret;
    ret = interpreteur.get(t);
    ret.numero = token.numero;
    ret.exdata='!';
    return ret;
} // f_compteur

/* Constantes de couleurs ****************************************************/
function f_couleur(interpreteur,token,params) { /*****************************/
    var ret,s,i,n;
    i=0;s=0;n=token.numero;
    if (token.procedure.nbarg===0) {
        switch (token.procedure.code) {
            case 'BLANC'    : s='255 255 255';
                              break;
            case 'BLEU'     : s='0 0 255';
                              break;
            case 'BRUN'     : s='91 60 17';
                              break;
            case 'CYAN'     : s='0 255 255';
                              break;
            case 'GRIS'     : s='175 175 175';
                              break;
            case 'JAUNE'    : s='255 255 0';
                              break;
            case 'MAGENTA'  : s='255 0 255';
                              break;
            case 'NOIR'     : s='0 0 0';
                              break;
            case 'ROUGE'    : s='255 0 0';
                              break;
            case 'VERT'     : s='0 255 0';
                              break;
            default         : s='0 0 0';
                            break;
        }
    }
    ret = new Token('liste',s,'!');
    ret.numero = n;
    ret.origine='eval';
    return ret;
} // f_compteur

// Réponse aux évenements survenus à la tortue *******************************/
// Fonctions liées aux évenements ********************************************/
function f_evenement(interpreteur,token,params) { /***************************/
    var i,j,t,e;
    
    
    switch (token.procedure.code) {
    
    case '$EVT!' :  j=interpreteur.LWlogo.reference.procedures_util.length;
                    for (i=0;i<j;i++) {
                        if (interpreteur.LWlogo.reference.procedures_util[i].code === token.nom)  {
                            t=new Token('mot',token.nom);
                            t.procedure = interpreteur.LWlogo.reference.procedures_util[i];
                            break;
                        }
                    }
                    if (t) {
                        e = interpreteur;
                        while (e) { // Pas d'appel récursif pour les événements.
                            if ((e.fonction) && (e.fonction.procedure.code===t.nom)) { return null; }
                            e = e.parent;
                        }
                        return f_procedure(interpreteur,t,params);
                    }
                    return null;
                    break;
    case 'MUR' :    e = interpreteur;
                    var v=[];
                    // L'appel doit obligatoirement se faire depuis une fonction "init!"
                    while ((e.parent) && (! e.fonction)) e=e.parent;
                    t = interpreteur.LWlogo.reference.les_fonctions['INIT'].std[0];
                    if ((! t) || (!e.fonction) || (t!==e.fonction.procedure.code)) {
                        t = erreur(token,'init',new Error().stack);
                        t.origine='eval';
                        t.cpl = interpreteur;
                        return t;                   
                    }
                    // Seule la première tortue peut appeler cette fonction
                    while (e.parent) e=e.parent;
                    if (e.ID !== 0) { return; }
                    e = new Interpreteur(interpreteur.ID,interpreteur.LWlogo,interpreteur);
                    t = e.interpreter(params[0].valeur,params[0].ligne,params[0].colonne);
                    if ((t) && (t.type=='erreur')) {
                        return ret;
                    }                    
                    while (! e.termine) {
                        t = e.interprete();
                        if ((t) && (t.type=='erreur')) {
                            return t;
                        }
                    }
                    i = 0;
                    while ((i<4) && (e.pile_arg.length>0)) {
                        t = e.pile_arg.pop();
                        if (t) {
                            if (t.type=='erreur') {return t;}
                            if (t.est_nombre()) {
                                v[3-i] = t.valeur;
                                i++;
                            }
                        }
                    }
                    if  (i<4) {
                            r = erreur(token,'evaluation',new Error().stack,params);
                            r.origine='eval';
                            r.cpl = interpreteur;
                            return r;
                    }                                         
                    interpreteur.LWlogo.moonde.mur(v);  
                    break;
                    
    }
} // f_evenement

/* Fonction exec, jusqu'a, tant que*******************************************/
function f_exec(interpreteur,token,params) { /********************************/
    var ret,exp,i,j,v,p,inter;
    switch (token.procedure.code) {
        case 'EXECUTE': interpreteur.enfant = new Interpreteur(interpreteur.ID,interpreteur.LWlogo,interpreteur);
                        ret = interpreteur.enfant.interpreter(params[0].valeur,params[0].ligne,params[0].colonne,token);
                        break;
        case 'REPETE' : p=params[0].clone();
                        p.valeur = Math.floor(params[0].valeur);
                        if ((! p.exdata) || (p.exdata=='!')) {p.exdata=0;}
                        if (p.valeur>0) {
                            p.exdata++;
                            interpreteur.enfant = new Interpreteur(interpreteur.ID,interpreteur.LWlogo,interpreteur);
                            v = new Token('variable',':$-compteur');
                            v.valeur = p.exdata;
                            v.exdata=='ignore';
                            ret = interpreteur.enfant.interpreter(params[1].valeur,params[1].ligne,params[1].colonne,params[1]);
                            if ((ret) && (ret.type=='erreur')) {
                                return ret;
                            }
                            interpreteur.enfant.contexte.ajoute(v);
                            if (p.valeur>1) {
                                    p.valeur = p.valeur - 1;
                                    if (interpreteur.dernier_token.type!=='eop') {
                                        if (! interpreteur.analyseur_lexical.fin_analyse) {interpreteur.analyseur_lexical.back(1);}
                                    }
                                    interpreteur.dernier_token = new Token('eop','');
                                    interpreteur.pile_op.push(token);
                                    interpreteur.pile_arg.push(p);
                                    interpreteur.pile_arg.push(params[1]);
                            }
                        }
                        break;
        case 'REPETEPOUR':
                        p = params[0].split();
                        if ((p.length>=3) && (p.length<5)) {
                            v = new Token('variable',':'+p[0]);
                            for (i=1;i<p.length;i++) {
                                if (! isNumber(p[i])) {
                                    ret=erreur(token,'nombre',new Error().stack,params);
                                    ret.origine='eval';
                                    ret.cpl = interpreteur;
                                    return ret;
                                }
                                p[i]=parseFloat(p[i]);
                            }
                            v.valeur = p[1];
                            if (v.valeur <= p[2]) {
                                    interpreteur.enfant = new Interpreteur(interpreteur.ID,interpreteur.LWlogo,interpreteur);
                                    ret = interpreteur.enfant.interpreter(params[1].valeur,params[1].ligne,params[1].colonne,params[1]);
                                    interpreteur.enfant.contexte.ajoute(v);
                                    if ((ret) && (ret.type=='erreur')) {
                                        return ret;
                                    }
                                    if (p.length==4) {
                                        p[1] = p[1] + p[3];
                                    }  else {
                                        p[1] = p[1] + 1;
                                    }
                                    v = params[0].clone();
                                    v.valeur = ' ';
                                    for (i=0;i<p.length;i++) {
                                        v.valeur=v.valeur+p[i]+' ';
                                    }
                                    v.valeur=v.valeur.trim();
                                    if (interpreteur.dernier_token.type!=='eop') {
                                        if (! interpreteur.analyseur_lexical.fin_analyse) {interpreteur.analyseur_lexical.back(1);}
                                    }
                                    interpreteur.dernier_token = new Token('eop','');
                                    interpreteur.pile_op.push(token);
                                    interpreteur.pile_arg.push(v);
                                    interpreteur.pile_arg.push(params[1]);
                            }
                        } else {
                            ret=erreur(token,'liste',new Error().stack,params);
                            ret.origine='eval';
                            ret.cpl = interpreteur;
                            return ret;
                        }
                        break;
        case 'JUSQUA' :
        case 'TANTQUE': inter = new Interpreteur(interpreteur.ID,interpreteur.LWlogo,interpreteur);
                        ret = inter.interpreter(params[0].valeur,params[0].ligne,params[0].colonne,params[0]);
                        if ((ret) && (ret == erreur)) {return ret;}
                        while (! inter.termine) {
                            ret = inter.interprete();
                            if ((ret) && (ret.type=='erreur')) {
                                return ret;
                            }
                        }
                        v=null;
                        while ((!v) && (inter.pile_arg.length>0)) {
                            ret = inter.pile_arg.pop();
                            if (ret.est_booleen) {v=ret;}
                        }
                        if (!v) {ret = erreur(params[i],'evaluation',new Error().stack);}
                        if (token.procedure.code=='JUSQUA') {v.valeur = !v.valeur;}
                        if (v.valeur) {
                            interpreteur.enfant = new Interpreteur(interpreteur.ID,interpreteur.LWlogo,interpreteur);
                            ret = interpreteur.enfant.interpreter(params[1].valeur,params[1].ligne,params[1].colonne,params[1]);
                            if (interpreteur.dernier_token.type!=='eop') {
                                if (! interpreteur.analyseur_lexical.fin_analyse) {interpreteur.analyseur_lexical.back(1);}
                            }
                            interpreteur.dernier_token = new Token('eop','');
                            interpreteur.pile_op.push(token);
                            interpreteur.pile_arg.push(params[0]);
                            interpreteur.pile_arg.push(params[1]);
                        }
                        break;
            default :   break;

    }
    if ((ret) && (ret.type=='erreur')) {
        return ret;
    }
} // f_exec

/* Fonctions sur les listes **************************************************/
function f_liste(interpreteur,token,params) { /*******************************/
    var ret,s,i,j,n,t,t1,tr,analyseur;
    i=0;s='';n=0;
    tr='?';
    while (i<params.length) {
        if (params[i].numero>n) {n = params[i].numero;}
        try {
            switch (token.procedure.code) {
                case 'CHOIX':   t = params[0].split();
                                if (t.length>0) {
                                    j = Math.floor(Math.random()*t.length);
                                    s = t[j];
                                } else {
                                    ret = erreur(token,'evaluation',new Error().stack,params);
                                    ret.origine='eval';
                                    ret.cpl = interpreteur;
                                    return ret;
                                }
                                break;
                case 'COMPTE':  t = params[0].split();
                                s=t.length;
                                tr='nombre';
                                break;
                case 'DERNIER': t = params[0].split();
                                if (t.length>0) {
                                    s = t[t.length - 1];
                                } else {
                                    ret = erreur(token,'evaluation',new Error().stack,params);
                                    ret.origine='eval';
                                    ret.cpl = interpreteur;
                                    return ret;
                                }
                                break;
                case 'ENLEVE':  if (i==1) {
                                    if (params[1].est_liste()) {
                                        t = params[1].split();
                                        tr='liste';
                                    } else {t = params[1].split();}
                                    if (t.length>0) {
                                        s='';
                                        for (i=0;i<t.length;i++) {
                                            if (t[i] != params[0].valeur) {
                                                s=s+t[i];
                                                if (tr=='liste') {s=s+' ';}
                                            }
                                        }
                                        s=s.trim();
                                    } else {
                                        ret = erreur(token,'evaluation',new Error().stack,params);
                                        ret.origine='eval';
                                        ret.cpl = interpreteur;
                                        return ret;
                                    }
                                }
                                break;
                case 'INVERSE': t = params[0].split();
                                tr=params[0].type;
                                s=''                                
                                for (i=t.length;i>0;i--) {
                                    s=s+t[i - 1];
                                    if (tr==='liste') {s=s+' ';}
                                }
                                s=s.trim(); 
                                break;
                case 'ITEM':    if (i==1) {
                                    t = params[1].split();
                                    params[0].valeur = Math.floor(params[0].valeur - 1);
                                    if ((params[0].valeur>=0) && (t.length>params[0].valeur)) {
                                        s = t[params[0].valeur];
                                    } else {
                                        ret = erreur(token,'evaluation',new Error().stack,params);
                                        ret.origine='eval';
                                        ret.cpl = interpreteur;
                                        return ret;
                                    }
                                }
                                break;
                case 'PHRASE':
                case 'LISTE':   tr='liste';
                                switch(params[i].type) {
                                    case 'cont'       : break;
                                    case 'eof'        : break;
                                    case 'eol'        : break;
                                    case 'eop'        : break;
                                    case 'erreur'     : break;
                                    case 'liste'      : if (token.procedure.code==='LISTE') {
                                                            s=s+' ['+params[i].valeur+']';
                                                        } else {
                                                            s=s+' '+params[i].valeur;
                                                        }
                                                        break;
                                    case 'mot'        : s=s+' '+params[i].toText();break;
                                    case 'nombre'     : s=s+' '+params[i].toText();break;
                                    case 'booleen'    : if (params[i].valeur) {s=s+' VRAI';} else {s=s+' FAUX';} break;
                                    case 'operateur'  : s=s+' '+params[i].nom;break;
                                    case 'parenthese' : s=s+' '+params[i].nom;break;
                                    case 'symbole'    : s=s+' '+params[i].toText();break;
                                    case 'variable'   : s=s+' '+params[i].toText();break;
                                    default           : break;
                                }
                                break;
                case 'MELANGE':
                              tr='liste';
                              t=params[i].split();
                              if (i===0) {
                                t1=t;
                              } else {
                                for (j=0;j<3;j++) {
                                    var a = parseFloat(t1[j]);
                                    var b = parseFloat(t[j]);
                                    t1[j]=Math.sqrt(0.5*Math.pow(a,2)+0.5*Math.pow(b,2));
                                    if (t1[j]<0) {t1[j]=0;}
                                    if (t1[j]>255) {t1[j]=255;}
                                    t1[j] = Math.round(t1[j]);
                                }
                              }
                              if (i==params.length-1) {
                                s='';
                                for (j=0;j<3;j++) {s=s+' '+t1[j];}
                                s=s.trim();
                              }
                              break;
                case 'METSPREMIER' :
                                if (i==1) {
                                    s=params[0].toText()+' '+params[1].valeur;
                                    tr='liste';
                                }
                                break;
                case 'METSDERNIER' :
                                if (i==1) {
                                    s=params[1].valeur+' '+params[0].toText();
                                    tr='liste';
                                }
                                break;
                case 'MOT':   tr='mot';
                                switch(params[i].type) {
                                    case 'cont'       : break;
                                    case 'eof'        : break;
                                    case 'eol'        : break;
                                    case 'eop'        : break;
                                    case 'erreur'     : break;
                                    case 'liste'      : s=s+params[i].valeur;break;
                                    case 'mot'        : s=s+params[i].valeur;break;
                                    case 'nombre'     : s=s+params[i].valeur;break;
                                    case 'booleen'    : if (params[i].valeur) {s=s+'VRAI';} else {s=s+'FAUX';} break;
                                    case 'operateur'  : s=s+params[i].nom;break;
                                    case 'parenthese' : s=s+params[i].nom;break;
                                    case 'symbole'    : s=s+params[i].valeur;break;
                                    case 'variable'   : s=s+params[i].valeur;break;
                                    default           : break;
                                }
                                break;
                case 'PREMIER': t = params[0].split();
                                if (t.length>0) {
                                    s = t[0];
                                } else {
                                    ret = erreur(token,'evaluation',new Error().stack,params);
                                    ret.origine='eval';
                                    ret.cpl = interpreteur;
                                    return ret;
                                }
                                break;
                case 'SP':      if (params[0].est_liste()) {
                                    t = params[0].split();
                                    tr='liste';
                                } else {t = params[0].split();}
                                if (t.length>0) {
                                    s='';
                                    for (i=1;i<t.length;i++) {
                                        s=s+t[i];
                                        if (tr=='liste') {s=s+' ';}
                                    }
                                    s=s.trim();
                                } else {
                                    ret = erreur(token,'evaluation',new Error().stack,params);
                                    ret.origine='eval';
                                    ret.cpl = interpreteur;
                                    return ret;
                                }
                                break;
                case 'SD':      if (params[0].est_liste()) {
                                    t = params[0].split();
                                    tr='liste';
                                } else {t = params[0].split();}
                                if (t.length>0) {
                                    s='';
                                    for (i=0;i<t.length-1;i++) {
                                        s=s+t[i];
                                        if (tr=='liste') {s=s+' ';}
                                    }
                                    s=s.trim();
                                } else {
                                    ret = erreur(token,'evaluation',new Error().stack,params);
                                    ret.origine='eval';
                                    ret.cpl = interpreteur;
                                    return ret;
                                }
                                break;
                case 'VIDEQ':   t = params[0].split();
                                s=(t.length===0);
                                tr='booleen';
                                break;
                default     :   ret = erreur(token,'evaluation',new Error().stack,params);
                                ret.origine='eval';
                                ret.cpl = interpreteur;
                                return ret;
            }
        }
        catch(err) {
            ret = erreur(token,'evaluation',new Error().stack,params);
            ret.origine='eval';
            ret.err = err;
            ret.cpl = interpreteur;
            return ret;
        }
        i++;
    }
    ret = new Token(tr,s,'!');
    ret.numero = n;
    ret.origine='eval';
    return ret;
} // f_liste

/* Fonctions logiques : ET, OU... ********************************************/
function f_logique(interpreteur,token,params) { /*****************************/
    var ret,s,i,n;

    s=false;
    if (token.procedure.nbarg===0) {
        n = token.numero;
        switch (token.procedure.code) {
            case 'VRAI' : s = true;break;
            case 'FAUX' : s = false;break;
            default     : s = false;break;
        }
    }
    else {
        i=0;n=0;
        while (i<params.length) {
            if ((! params[i]) || (! params[i].est_booleen)) {
                ret = erreur(token,'booleen',new Error().stack,params);
                ret.origine='eval';
                ret.cpl = interpreteur;
                return ret;
            }
            if (params[i].numero>n) {n = params[i].numero;}
            try {
                switch (token.procedure.code) {
                    case '&'    :
                    case 'ET'   :   if (i===0) {s=params[0].valeur;} else { s = s && params[i].valeur;}
                                    break;
                    case 'NON'  :   s = ! params[i].valeur;
                                    break;
                    case '|'    :
                    case 'OU'   :   if (i===0) {s=params[0].valeur;} else {s = s || params[i].valeur;}
                                    break;
                    default     :   ret = erreur(token,'evaluation',new Error().stack,params);
                                    ret.origine='eval';
                                    ret.cpl = interpreteur;
                                    return ret;
                }
            }
            catch(err) {
                ret = erreur(params[i],'evaluation',new Error().stack);
                ret.origine='eval';
                ret.err = err;
                ret.cpl = interpreteur;
                return ret;
            }
            if (isNaN(s) || (! isFinite(s))) {
                ret = erreur(params[i],'evaluation',new Error().stack);
                ret.origine='eval';
                ret.cpl = interpreteur;
                return ret;
            }
            i++;
        }
    }
    ret = new Token('booleen',s,'!');
    ret.numero = n;
    ret.origine='eval';
    return ret;
} // f_logique

/* Fonctions mathematiques ***************************************************/
function f_math(interpreteur,token,params) { /********************************/
    var ret,s,i,n,tr;
    i=0;s=0;n=token.numero;tr='nombre';
    
    if (token.procedure.nbarg===0) {
        switch (token.procedure.code) {
            case 'PI'       : s=Math.PI;
                              break;
            default         : break;
        }
    } else {
        while (i<params.length) {
            if (params[i].numero>n) {n = params[i].numero;}
            try {
                switch (token.procedure.code) {
                    case 'ARRONDI': s = Math.round(params[i].valeur);
                                    break;
                    case 'DIFFERENCE':
                    case '-'    :   if (i===0) {s=params[i].valeur;} else {s = s - params[i].valeur;}
                                    break;
                    case 'ENT'  :   s = Math.trunc(params[i].valeur);
                                    break;                                    
                    case 'HASARD':  s=Math.round(params[i].valeur*Math.random());
                                    break;
                    case 'SIN'  :   s = Math.sin(params[i].valeur*Math.PI/180);
                                    break;
                    case 'COS'  :   s = Math.cos(params[i].valeur*Math.PI/180);
                                    break;
                    case 'LOG10':   s = Math.log10(params[i].valeur);
                                    break;
                    case 'MOINS':   s = 0-params[i].valeur;
                                    break;
                    case 'PRODUIT':
                    case '*'    :   if (i===0) {s=params[i].valeur;} else {s = s * params[i].valeur;}
                                    break;
                    case 'PUISSANCE':
                    case '^'    :   if (i===0) {s=params[i].valeur;} else {s = Math.pow(s,params[i].valeur);}
                                    break;
                    case 'QUOTIENT':
                    case '/'    :   if (i===0) {s=params[i].valeur;} else { s = s / params[i].valeur;}
                                    break;
                    case 'RACINE':  s= Math.sqrt(params[i].valeur);
                                    break;
                    case '%'    :
                    case 'RESTE':   if (i===1) {s=params[0].valeur % params[1].valeur;} else {s=params[i].valeur;}
                                    break;
                    case '+'    :
                    case 'SOMME' :  s = s+params[i].valeur;
                                    break;
                    default     :   ret = erreur(token,'evaluation',new Error().stack,params);
                                    ret.origine='eval';
                                    ret.cpl = interpreteur;
                                    return ret;
                }
            }
            catch(err) {
                ret = erreur(token,'evaluation',new Error().stack,params);
                ret.origine='eval';
                ret.err = err;
                ret.cpl = interpreteur;
                return ret;
            }
            i++;
        }
    }
    if ( (tr=='nombre') && (isNaN(s) || (! isFinite(s)))) {
        ret = erreur(token,'evaluation',new Error().stack,params);
        ret.origine='eval';
        ret.cpl = interpreteur;
        return ret;
    }
    ret = new Token(tr,s,'!');
    ret.numero = n;
    ret.origine='eval';
    return ret;
} // f_math

function f_predicat(interpreteur,token,params) { /****************************/
    var ret,s,i,n;
    n = token.numero;
    s=false;
    i=0;
    while (i<params.length) {
        if (params[i].numero>n) {n = params[i].numero;}
        switch (token.procedure.code) {
            case 'LISTEQ':  s = params[i].est_liste();
                            break;
            case 'MOTQ':    s= params[i].est_mot();
                            break;
            case 'NOMBREQ' :  s = params[i].est_nombre;
                            break;
            default         : break;
        }
        i++;
    }
    ret = new Token('booleen',s,'!');
    ret.numero = n;
    ret.origine='eval';
    return ret;
} // f_predicat

/* Procedure utilisateur *****************************************************/
function f_procedure(interpreteur,token,params) { /***************************/
    var i,it;
    if ( /*interpreteur.pile_op.length==0 &&*/ interpreteur.parent && interpreteur.dernier_token.est_blanc() && interpreteur.analyseur_lexical.est_termine() ) {
        // Récursivité terminale => récupère de la place sur la pile
        interpreteur.analyseur_lexical.reset();
        interpreteur.analyseur_lexical.tokens = token.procedure.tokens.slice(0);
        interpreteur.analyseur_lexical.fin_analyse=false;
        interpreteur.pile_arg = [];
        interpreteur.fonction = token;
        interpreteur.contexte = new Contexte(interpreteur); 
        it = interpreteur;
    } else {
        interpreteur.enfant = new Interpreteur(interpreteur.ID,interpreteur.LWlogo,interpreteur);
        interpreteur.enfant.fonction = token;
        interpreteur.enfant.analyseur_lexical.tokens = token.procedure.tokens.slice(0);
        it = interpreteur.enfant;
    }

    for (i=0;i<token.procedure.maxiarg;i++) {
        var v = token.procedure.args[i].clone();
        if (i<params.length) {
            if (params[i]) {
                v.valeur = params[i].valeur;
                v.src = params[i];
            }
        }
        it.contexte.ajoute(v);
    }
} // f_procedure

/* Fonctions si, sinon *******************************************************/
function f_si(interpreteur,token,params) { /**********************************/
    var ret,exp,i;

    if (params[0].valeur) {
        interpreteur.enfant = new Interpreteur(interpreteur.ID,interpreteur.LWlogo,interpreteur);
        ret = interpreteur.enfant.interpreter(params[1].valeur,params[1].ligne,params[1].colonne);
        if ((ret) && (ret.type=='erreur')) {
            return ret;
        }
        if (interpreteur.dernier_token.type!=='eop') {
            if (! interpreteur.analyseur_lexical.fin_analyse) { interpreteur.analyseur_lexical.back(1); }
        }
        interpreteur.dernier_token = new Token('eop','');
    } else if (token.procedure.code=='SINON') {
        interpreteur.enfant = new Interpreteur(interpreteur.ID,interpreteur.LWlogo,interpreteur);
        ret=interpreteur.enfant.interpreter(params[2].valeur,params[2].ligne,params[2].colonne);
        if ((ret) && (ret.type=='erreur')) {
            return ret;
        }

        if (interpreteur.dernier_token.type!=='eop') {
            if (! interpreteur.analyseur_lexical.fin_analyse) {interpreteur.analyseur_lexical.back(1);}
        }

        interpreteur.dernier_token = new Token('eop','');
    }
    return null;
} // f_si

/*****************************************************************************/
function f_stop(interpreteur,token,params) { /********************************/
    var e = interpreteur,c;

    while ((e.parent) && (! e.fonction)) {
        e = e.parent;
    }

    if (e) {
        e.enfant = null;
        e.dernier_token = null;
        e.contexte=null;
        e.analyseur_lexical.reset();
        if (e.fonction) {c=e.fonction.numero;} else {c=token.numero;}
        if (token.procedure.code==='RETOURNE') {
            if (e.fonction) {
                if (e.fonction.procedure.code[0]==='$') return
            }
            if (e.parent) {e=e.parent;}
            if ((params.length>0) && (params[0])) {
                params[0].numero = c;
                e.pile_arg.push(params[0]);
            }
        }
    }
} // f_stop

/* Ordres pour la tortue *****************************************************/
function f_tortue(interpreteur,token,params) { /******************************/

    var v=[],i,j,ret;
    var inter;
    interpreteur.ordre_tortue = true;

    switch (token.procedure.code) {
        case 'MONTRE'   :   for (i=0;i<params.length;i++) {
                                if (params[i]) {v[i] = params[i].toText();}
                            }
                            break;
        case 'FIXEPOS'  :
        case 'FCC'      :   j=2;
                            if (token.procedure.code=='FCC') {j=3;}
                            inter = new Interpreteur(interpreteur.ID,interpreteur.LWlogo,interpreteur);
                            ret = inter.interpreter(params[0].valeur,params[0].ligne,params[0].colonne);
                            if ((ret) && (ret.type=='erreur')) {
                                return ret;
                            }
                            while (! inter.termine) {
                                ret = inter.interprete();
                                if ((ret) && (ret.type=='erreur')) {
                                    return ret;
                                }
                            }
                            i = 0;
                            while ((i<j) && (inter.pile_arg.length>0)) {
                                ret = inter.pile_arg.pop();
                                if (ret) {
                                    if (ret.type=='erreur') {return ret;}
                                    if (ret.est_nombre()) {
                                        v[i] = ret.valeur;
                                        i++;
                                    }
                                }
                            }
                            if  (i<j) {
                                ret = erreur(token,'evaluation',new Error().stack,params);
                                ret.origine='eval';
                                ret.cpl = interpreteur;
                                return ret;
                            }
                            break;
        default         :   if (params) {
                                for (i=0;i<params.length;i++) {
                                    if (params[i]) {v[i] = params[i].valeur;}
                                }
                            }
                            break;
    }

    interpreteur.LWlogo.commande(interpreteur,token,v);
    return null;
} // f_tortue

/* Création de variables globales et locales *********************************/
function f_variable(interpreteur,token,params) { /****************************/
    var i,ret,interp;
    i=0;
    while (i<params.length) {
        switch (token.procedure.code) {
            case 'CHOSE':   ret=new Token('variable',':'+params[0].nom);
                            ret = interpreteur.valorise(ret);
                            ret.numero = token.numero;
                            return ret;
                            break;
            case 'DONNE':   if (i==1) { // Création d'une variable globale
                                ret=new Token('variable',':'+params[0].nom);
                                // On vérifie d'abord qu'aucune variable locale du même nom existe
                                ret = interpreteur.valorise(ret,'L',params[1]);
                                if (ret.type != 'erreur') {
                                    ret.valeur=params[1].valeur;
                                    ret.src =  params[1];
                                    ret.numero = token.numero;
                                } else {
                                    // Si pas de variable locale, on la créé en globale
                                    interp = interpreteur;
                                    while (interp.parent) {interp=interp.parent;}
                                    if (interp) {
                                        ret = new Token('variable',':'+params[0].nom,params[0].valeur,token.ligne,token.colonne);
                                        ret.valeur = params[1].valeur;
                                        ret.src =  params[1];
                                        ret.numero = token.numero;
                                        interp.contexte.ajoute(ret);
                                    }
                                }
                            }
                            break;
            case 'DONNELOCALE':
                            if (i==1) {
                                ret = new Token('variable',':'+params[0].nom,params[0].valeur,token.ligne,token.colonne);
                                ret.valeur = params[1].valeur;
                                ret.src =  params[1];
                                ret.numero = token.numero;
                                interp = interpreteur;
                                while ((interp.parent) && (!interp.fonction)) {interp=interp.parent;}
                                interpreteur.contexte.ajoute(ret);
                            }
                            break;
            case 'LOCALE':  ret = new Token('variable',':'+params[i].nom,params[i].valeur,token.ligne,token.colonne);
                            ret.valeur = '';
                            ret.numero = token.numero;
                            interp = interpreteur;
                            while ((interp.parent) && (!interp.fonction))  {interp=interp.parent;}
                            break;
            default :       break;
        }
        i++;
    }
    return null;
} // f_variable


