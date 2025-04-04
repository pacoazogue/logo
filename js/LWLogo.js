"use strict";

var numero_ordre = 0;
var debug=false;   



/* Initialisation de l'interpreteur ******************************************/
function LWLogo(canvas_dessin, canvas_tortue, canvas_monde) {  
    var canvas, ctx;   
    if (! canvas_dessin)  { canvas_dessin='dessin'; }
    if (! canvas_tortue) { canvas_tortue='tortue'; }
    if (! canvas_monde) { canvas_monde='monde'; } 
    this.etat='';
    this.en_pause = false;    
    this.reference = new Reference();
    this.horloge = new Horloge(this);
    this.interpretes = [];
    this.interpretes[0] = new Interpreteur(0,this,null);
    this.en_cours = false;
    this.tortues = [];    
    this.monde = new Monde(this,canvas_monde);
    this.tortues[0] = new Tortue(0,canvas_tortue,canvas_dessin,this);
    this.editeur = null;
    this.vitesse(50);
    this.nligne = -1;
    canvas = document.getElementById(canvas_dessin);
    if (this.canvas) {
        ctx=canvas.getContext("2d");   
        ctx.fillStyle="rgba(255,255,255,0.1)";   
        ctx.clearRect ( 0 , 0 , canvas.width,canvas.height );    
        ctx.fillRect ( 0 , 0 , canvas.width,canvas.height );           
        this.draw_info();
    }
    this.troisD=null;
} // LWLogo(canvas_dessin, canvas_tortue, canvas_monde)

LWLogo.prototype.exporte = function (code) { /********************************/
    if (!code) { return; }  
    code = code.rtrim();
    if (code.length<1) { return; }
    var s = this.interpretes[0].exporte(code);
    return s;
}; // LWLogo.exporte()

LWLogo.prototype.importe = function (code) { /********************************/
    if (!code) { return; } 
    code = code.rtrim();
    if (code.length<1) { return; }
    var s = this.interpretes[0].importe(code);
    return s;
}; // LWLogo.importe()

/* Lancement ****************************************************************/

LWLogo.prototype.run = function (code) {
  var r,t,j;
  this.monde.reset();
  if (!code) { return; }  
  code = code.rtrim();
  if (code.length<1) { return; }
  this.reference.procedures_util=[];
  this.en_pause=false;
  this.nligne = -1;
  this.etat='encours';
  for (r=0;r<this.tortues.length;r++) {
      if (this.tortues[r]) { this.tortues[r].reset(); }
  }
  this.interpretes[0].err=null;
  r = this.interpretes[0].interpreter(code);
  if ((r) && (r.type === 'erreur')) {
      this.erreur(r);
  } else {
    for (r=0;r<this.tortues.length;r++) {
        if (this.tortues[r]) {
            this.tortues[r].vitesse = (this.ma_vitesse + 1);
        }
    }
    
    // Ajout de l'événement init
    t = this.reference.les_fonctions['INIT'].std[0];
    if (t) {
        t=new Token('evenement',t);
        j=this.reference.procedures.length;
        while ((j>0) && (!t.procedure)) {
            j--;
            if (this.reference.procedures[j].code==='$EVT!') {
                t.procedure = this.reference.procedures[j];
            }
        }
    }
	this.interpretes[0].pile_op.push(t);        
    this.horloge.start();
  }
   maj_him();
}; // LWLogo.run(code)

LWLogo.prototype.stop = function() {
    var i;
    this.horloge.stop();
    this.etat='';
    this.nligne = -1;
    for (i=0;i<this.interpretes.length;i++) {
        this.interpretes[i].pile_nb=[];
        this.interpretes[i].pile_op=[];
    }    
    maj_him();
}; // LWLogo.stop()

LWLogo.prototype.ligne = function(interp,elt,arg) {
    if ((this.ma_vitesse<100) && (elt) && (elt.ligne) && (elt.ligne !== this.nligne)) {
		if  ((this.editeur) && (this.editeur.scrollToLine)) {
                this.editeur.scrollToLine(elt.ligne,true,true);
                this.editeur.gotoLine(elt.ligne,0,false); 
                this.nligne = elt.ligne;
        }    
    }
}; // LWLogo.ligne(interp,elt,arg)

LWLogo.prototype.pause = function() {
    this.en_pause = ! this.en_pause;
    if (this.en_pause) {
        this.etat='pause';
    } else {
        this.etat='encours';
    }
    maj_him();
}; // LWLogo.pause()

LWLogo.prototype.vitesse = function(v) {  
    var i;  
    v = parseFloat(v);    
    if (v>100) { v=100; }
    if (v<1) { v=1; }
    this.ma_vitesse = v;    
    for (i=0;i<this.tortues.length;i++) {
        if (this.tortues[i]) {
            this.tortues[i].vitesse = v;
        }
    }    
}; // LWLogo.vitesse(v)


LWLogo.prototype.draw_info = function () {
    var canvas = document.getElementById('etat'), ntortue, i, c, w,
	x, y, j, a, sin, cos, arg, op, h, ctx;
    if (canvas) {
        ntortue = 0;
        w = canvas.width; h = canvas.height; ctx=canvas.getContext("2d");
        x = 400;y=120;
        ctx.clearRect(0,0,w,h);
        
        // Orientation de la tortue
        ctx.beginPath();
        ctx.strokeStyle="#0000FF";
        ctx.moveTo(x,y-90);
        ctx.lineTo(x,y+90);
        ctx.moveTo(x-90,y);
        ctx.lineTo(x+90,y);
        ctx.arc(x,y,75,0,2*Math.PI);
        ctx.stroke();
        ctx.beginPath();
        ctx.textAlign="center"; 
        ctx.fillStyle="#000000";
        ctx.strokeStyle="#FF0000";
        a=Math.PI + Math.PI/12;
        j=-30;
        for (i=1;i<=12;i++) {
            a = a+ Math.PI/6;
            sin = Math.sin(a);
            cos = Math.cos(a);
            ctx.moveTo(x + 60*cos - 60*sin, y+ 60*sin +60*cos);
            ctx.lineTo(x+ 50*cos - 50*sin, y+ 50*sin +50*cos);
            j=(j+30) % 360;            
            ctx.fillText(j+'°',x + 70*cos - 70*sin, y+ 70*sin +70*cos);
        }
        ctx.stroke();
        ctx.fillText(Math.round(this.tortues[ntortue].cap)+'°',x,y+120);    
         
        // Position de la tortue
        ctx.beginPath();
        ctx.strokeStyle="#0000FF";
        ctx.fillText('0',x+255,y-5);
        ctx.moveTo(x+250,y-100);
        ctx.lineTo(x+250,y+100);
        ctx.moveTo(x+250-100,y);
        ctx.lineTo(x+250+100,y);        
        ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle="#FF0000";
        a = 200/this.monde.largeur; 
        a = this.tortues[ntortue].posx*a;
        a=a+x+250;
        ctx.moveTo(a,y-100);ctx.lineTo(a,y+100);
        ctx.fillText(Math.round(this.tortues[ntortue].posx),a,y+120);
        a = 200/this.monde.hauteur; 
        a = this.tortues[ntortue].posy*a;
        a=y-a;   
        ctx.moveTo(x+250-100,a);ctx.lineTo(x+250+100,a);  
        ctx.fillText(Math.round(this.tortues[ntortue].posy),x+360,a);        
        ctx.stroke();
        
        // Etat tortue (occupée, libre )
        ctx.fillStyle="#000000";
        ctx.textAlign="start"; 
        ctx.fillText(this.reference.libelle.statut,5,20);
        //if (this.en_pause) ctx.fillText(this.reference.libelle.enpause,5,40); else ctx.fillText(this.reference.libelle.encours,5,40);
        ctx.strokeStyle="#000000";
        if (this.tortues[ntortue].en_cours) { ctx.fillStyle="#FF0000"; }
        else { ctx.fillStyle='#00FF00'; }
        ctx.beginPath();
        ctx.arc(120,15,10,0,2*Math.PI);
        ctx.fill();
        ctx.stroke();                  
        // Etat du crayon
        ctx.fillStyle="#000000";
        ctx.fillText(this.reference.libelle.crayon,5,50); 
        ctx.strokeStyle="#000000";
        ctx.fillStyle=this.tortues[ntortue].couleur_crayon;
        ctx.beginPath();
        ctx.moveTo(110,55);ctx.lineTo(130,55);
        ctx.stroke();
        if (this.tortues[ntortue].crayon_baisse) { a = 55; } else {a = 50;}
        ctx.beginPath();
        ctx.moveTo(120,a);ctx.lineTo(115,a-5);ctx.lineTo(115,a-20);ctx.lineTo(125,a-20);ctx.lineTo(125,a-5);ctx.lineTo(120,a);
        ctx.stroke();
        ctx.fill();
        
        
        ctx.fillStyle="#000000";
        arg=0; op = 0; i=0;
        c=this.interpretes[ntortue];        
        while (c) {
            i++;
            arg+=c.pile_arg.length;
            op+=c.pile_op.length;
            c=c.enfant;
        }
        i--;
        ctx.fillText(this.reference.libelle.pile,5,210);ctx.fillText(i,100,210);       
        ctx.fillText("arguments : ",5,230);ctx.fillText(arg,100,230);
        ctx.fillText("operateurs : ",5,250);ctx.fillText(op,100,250);
               
        ctx.save();
        ctx.translate(x,y);
        ctx.rotate(this.tortues[ntortue].cap*Math.PI/180);          
        this.tortues[ntortue].dessin_tortue(ctx);              
        ctx.fillStyle="#ff0000"; 
        for (i=0;i<this.tortues[ntortue].points.length;i++) {           
            ctx.fillRect(this.tortues[ntortue].points[i].x-2,this.tortues[ntortue].points[i].y-2,4,4);
        }
        ctx.rotate(-this.tortues[ntortue].cap*Math.PI/180);
        
        ctx.translate(-x,-y);                                
        ctx.restore();        
        
        // Rectangle pour les collisions

        
    }
}; // LWLogo.draw_info()

LWLogo.prototype.draw_debug = function () {
    var i,d, e, canvas = document.getElementById('etat'), ou,
    w = canvas.width, h = canvas.height, ctx=canvas.getContext("2d");
    ctx.fillStyle="rgba(255,255,255,1)";     
    ctx.clearRect ( 0 , 0 , w,h );
    ctx.fillStyle="rgb(0,0,0)";
    ctx.strokeStyle="rgb(64,0,0)";
    d=0;
    ou = this.interpretes[0];
    while ((ou) && (d<3)) {
        for (i=0;i<ou.pile_arg.length;i++) {
            e = ou.pile_arg[i];
            ctx.strokeRect(15+(d*250),h-20-(i*20),100,20); 
            ctx.fillText(e.valeur,20+(d*250),h - 10 - (i*20)); 
        }
        for (i=0;i<ou.pile_op.length;i++) {
            e = ou.pile_op[i];
            ctx.strokeRect(150+(d*250),h-20-(i*20),100,20); 
            ctx.fillText(e.nom,150+(d*250),h - 10 - (i*20)); 
        } 
        ou = ou.enfant;
        d++;
    }    
}; // LWLogo.draw_debug()

/* Envoie une commande à la tortue */
LWLogo.prototype.commande = function(emetteur,cmd,param) {    
    var s, i;
    if (emetteur) {
        emetteur.ordre_tortue = true;
        if ((emetteur.ID>=0) && (emetteur.ID<=this.tortues.length)) {
            if (this.tortues[emetteur.ID]) { this.tortues[emetteur.ID].commande(cmd,param); }
            if (debug) {
                s = cmd; i=0;
                s=s+' [';
                for (i=0;i<param.length;i++) {
                    if (i === 0) { s=s+' '; } else { s=s+', '; }
                    s = s+param[i];
                }
            }
        }
    }
}; // LWLogo.commande(emetteur, cmd, param)

LWLogo.prototype.reinitialise = function() {
	var i;
    this.horloge.stop();
    this.etat='';
    this.reference.procedures_util=[];
    this.en_pause=false;    
    for (i=0;i<this.interpretes.length;i++) {    
        if (this.tortues[i])  {            
            this.tortues[i].posx = 0;
            this.tortues[i].posy = 0;
            this.tortues[i].cap = 0;                                    
            this.tortues[i].crayon_baisse = true;
            this.tortues[i].taille_crayon = 1;
            this.tortues[i].couleur_crayon = "#000000";
            this.tortues[i].font = "Verdana";
            this.tortues[i].fontsize = 30; 
            this.tortues[i].reset(); 
            this.tortues[i].draw();      
            this.tortues[i].videecran();                  
        }
        if (this.interpretes[i]) {
            this.interpretes[i].termine = true;
            this.interpretes[i].enfant = null;
            this.interpretes[i].pile_arg = [];                                                            
            this.interpretes[i].ordre_tortue = false;
            this.interpretes[i].dernier_token=null;
        }
    }  
    maj_him();
    this.draw_info();
}; // LWLogo.reinitialise()

/* Retour d'un ordre à la tortue */
LWLogo.prototype.retour_tortue = function(emetteur,token,etats) { 
    var e,t,i,j=-1;
    if (emetteur) {
        if ((emetteur.ID>=0) && (emetteur.ID<this.interpretes.length)) {
            if (this.interpretes[emetteur.ID]) {
                e = this.interpretes[emetteur.ID];
                while (e.enfant) { e =e.enfant; }
                if (debug) { console.log('Retour '+token.valeur); }
                e.pile_arg.push(token);
				if (etats) {
					for (i=0;i<etats.length;i++) {
						if (etats[i]) {
							t=new Token('evenement',etats[i]);
							if (j<0) {
								j=this.reference.procedures.length;
								while ((j>0) && (!t.procedure)) {
									j--;
									if (this.reference.procedures[j].code === '$EVT!') {
										t.procedure = this.reference.procedures[j];
									}
								}
							} else { t.procedure = this.reference.procedures[j]; }
							e.pile_op.push(t);
						}
					}
				}
            }
        }
    }
}; // LWLogo.retour_tortue(emetteur,token, etats)


LWLogo.prototype.tick = function (that) {

    var t,i,termine;
    
    if (this.en_cours) { return; }
    
    if (this.ma_vitesse<100) { this.draw_info(); }
    
    if (this.troidD) {
        this.troisD.render();
    }
    
    if (this.en_pause) { return; }
    this.en_cours = true;
    termine = false;
    
    
    for (i=0;i<this.interpretes.length;i++) {
    
        if ((this.tortues[i]) && (this.tortues[i].en_cours)) {
            this.tortues[i].tick();
            continue;
        } else {

            if (this.interpretes[i].termine) {
                termine = true;
            } else {
                t = this.interpretes[i].interprete();
                if ((t) && (t.type === 'erreur')) {                    
                    termine = true;                    
                    this.erreur(t);
                    break;
                }
            }
           
        }    
    }
    
    if (termine) {
        this.horloge.stop();
        this.etat='';
        maj_him();                
    }
    
    if (this.troidD) {
        this.troisD.render();
    }    
    
    this.en_cours = false;
    
}; // LWLogo.tick(that)


LWLogo.prototype.sel_tortue = function(nr) {
    var i;    
    for (i=0;i<this.tortues.length;i++) {
        if (this.tortues[i]) {
            this.tortues[i].set_tortue(nr);
            if (this.troisD) {                
                this.troisD.change_tortue(nr);
			}
        }
    }
}; //LWLogo.sel_tortue(nr)

LWLogo.prototype.sel_fond = function(nr) {
    this.monde.quadrillage=nr;
    this.monde.draw();
    if (this.troisD) { this.troisD.update_fond(); }
}; // LWLogo.sel_fond(nr)

LWLogo.prototype.erreur = function(token) {
    var l=1,c=1,lg=0,s='';
    
    if (token) {
        if (token.ligne) { l = token.ligne; }
        if (token.colonne) { c = token.colonne; }
        lg = token.valeur.length;
    }
    
    if (debug) {
        if (!token) {
            console.log('erreur inconnue');
        } else  {            
            switch (token.origine) {
                case 'analyse' : console.log('Erreur lors de l analyse');
                                 console.log('Ligne: '+token.ligne+' Colonne: '+token.colonne);
                                 console.log(token.nom);
                                 console.log(token.exdata);
                                 console.log(token);
                                 break;
                case 'interprete' : console.log('Erreur lors de l interpretation');
                                 console.log('Ligne: '+token.ligne+' Colonne: '+token.colonne);
                                 console.log(token.nom+' '+token.valeur);
                                 console.log(token.exdata);
                                 console.log(token);
                                 break;
                case 'eval' :    console.log('Erreur lors de l evaluation');
                                 console.log('Ligne: '+token.ligne+' Colonne: '+token.colonne);
                                 console.log(token.s);
                                 console.log('pile nb ');
                                 console.log(token.exdata);
								 break;
                default :        console.log('Erreur origine inconnue');                             
                                 console.log('Ligne: '+token.ligne+' Colonne: '+token.colonne);
                                 console.log(token.nom);
                                 console.log(token);
								 break;
            }        
        }    
    }
    
    if (this.editeur) {
        if (c>1) { c--; }
        this.editeur.scrollToLine(l,true,true);
        this.editeur.gotoLine(l,c,true); 
        this.editeur.focus();
        if (lg>0) {
            var Range = require("ace/range").Range;            
            this.editeur.selection.setRange(new Range(l-1, c-1, l-1, c+lg));
        }        
    } 

      
    if (typeof jQuery === 'undefined') {
        s = token.toString();
        console.log('Ligne: '+token.ligne+' Colonne: '+token.colonne);
        console.log(token.nom);
        console.log(token.exdata);
        console.log(token);        
        window.alert(s);
    } else {  
        s=this.reference.erreur(token);
        $( "#err_dialog" ).html(s);
        $( "#err_dialog" ).dialog( "open" );
    }
    
    
}; //LWLogo.erreur(token)

LWLogo.prototype.affichage = function (n) {    
    switch(n) {
        case 0 :    this.close_3d('WebGLCanvas');
                    break;
        case 1 :    this.init_3d('WebGLCanvas');
                    break;
    }
}; //LWLogo.affichage(n)

LWLogo.prototype.close_3d = function (obj) {
    if (this.troisD) {
        this.troisD.close();             
    }        
    this.troisD = null;
    if (typeof jQuery !== 'undefined') {
        $('#dessin').show();
        $('#tortue').show();
        $('#monde').show();    
    }
}; //LWLogo.close_3D(obj)

LWLogo.prototype.init_3d = function (obj) {
     
    if (this.troisD) { return; }
    
    $('#dessin').hide();
    $('#tortue').hide();
    $('#monde').hide();

    this.troisD = new Logo3D(this,obj);
    this.troisD.init();  
    this.troisD.change_tortue(this.tortues[0].style);   
}; //LWLogo.init_3d(obj)

 
/* Horloge**************** ******************************************/
function Horloge(parent) {
    this.logo = parent;    
    this.timer = null;
    this.demarree = false;
} 

Horloge.prototype.start = function() {
    if (this.demarree) { this.stop(); }
    this.timer = setInterval(function () {this.logo.tick(this.logo);},0);
    this.demarree = true;
}; //Horloge.start()

Horloge.prototype.stop = function() {
    clearInterval(this.timer);
    this.demarree = false;
    this.logo.en_cours = false;
    if (debug) { console.log('stop horloge'); }
}; //Horloge.stop()


