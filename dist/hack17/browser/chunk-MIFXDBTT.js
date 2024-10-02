import"./chunk-SEBF2BU2.js";import"./chunk-226KYS73.js";import"./chunk-36MGJEOV.js";import{a as E}from"./chunk-R7DZLFCY.js";import{C as z,D as k,i as y,j as b,m as w,n as I,r as D}from"./chunk-7LRRDA6O.js";import{$ as f,Db as u,Eb as c,Fb as l,Gb as g,Mb as M,Na as a,Oa as p,Tb as P,Vb as v,Wb as O,db as s,eb as x,fb as m,jb as r,kb as i,mb as h,nb as _,ub as C}from"./chunk-LJKVXSQR.js";function j(o,d){if(o&1&&(r(0,"li"),c(1),i()),o&2){let n=d.$implicit,e=d.index;x("key",e),a(),g(" ",n.name," ")}}function F(o,d){if(o&1&&(h(0),r(1,"ul"),s(2,j,2,2,"li",10),i(),_()),o&2){let n=C();a(2),m("ngForOf",n.donativo==null?null:n.donativo.medications)}}function L(o,d){o&1&&c(0,"No hay medicinas asignadas")}var G=(()=>{class o{constructor(n,e){this.route=n,this.http=e,this.donativoId=null,this.donativo=null,this.medicationList=[]}ngOnInit(){this.route.paramMap.subscribe(n=>{let e=n.get("id");this.donativoId=e?+e:null,this.donativoId&&this.loadDonationsData(this.donativoId)})}loadDonationsData(n){let{headers:e}=k();this.http.get(`${z.apiUrl}donation/getById/${n}`,{headers:e}).subscribe(t=>{console.log(t),this.donativo=t.data.Donation,console.log("Datos del donativo:",this.donativo),this.extractMedications()},t=>{console.error("Error al obtener los datos del donativo:",t)})}extractMedications(){this.donativo&&this.donativo.medications?this.medicationList=this.donativo.medications.map(n=>n.name):this.medicationList=[]}static{this.\u0275fac=function(e){return new(e||o)(p(E),p(D))}}static{this.\u0275cmp=f({type:o,selectors:[["app-perfil-entrega"]],standalone:!0,features:[M],decls:23,vars:9,consts:[["noMedication",""],[1,"container"],[1,"patient-card"],[1,"patient-card-header"],[1,"id-card"],[1,"patient-card-body"],[1,"contact-info"],[1,"info_flex"],[1,"pathologies"],[4,"ngIf","ngIfElse"],[4,"ngFor","ngForOf"]],template:function(e,t){if(e&1&&(r(0,"div",1)(1,"section",2)(2,"div",3)(3,"h2"),c(4),i(),r(5,"p",4)(6,"span"),c(7),P(8,"date"),i()(),r(9,"p",4),c(10),i()(),r(11,"div",5)(12,"div",6)(13,"div",7)(14,"p")(15,"span"),c(16),i()()()(),r(17,"div",8)(18,"h3"),c(19,"Medicinas"),i(),s(20,F,3,1,"ng-container",9)(21,L,1,0,"ng-template",null,0,O),i()()()()),e&2){let S=u(22);a(4),l(t.donativo==null||t.donativo.charity==null?null:t.donativo.charity.razon_social),a(3),g("Creado: ",v(8,6,t.donativo==null?null:t.donativo.createdAt,"yyyy-MM-dd"),""),a(3),l(t.donativo==null||t.donativo.category==null?null:t.donativo.category.name),a(6),l(t.donativo==null?null:t.donativo.description),a(4),m("ngIf",t.medicationList.length>0)("ngIfElse",S)}},dependencies:[I,y,b,w],styles:["hr[_ngcontent-%COMP%]{color:#1e90ff;width:1px;height:1px}.patient-card[_ngcontent-%COMP%]{width:85%;min-height:400px;margin:7rem auto 3rem;background-color:#fff;border-radius:8px;overflow:hidden;box-shadow:0 4px 6px #0000001a;transition:all .3s ease;text-transform:capitalize}.patient-card[_ngcontent-%COMP%]:hover{transform:scale(1.02);box-shadow:0 8px 12px #00000026}.patient-card-header[_ngcontent-%COMP%]{background-color:#1e90ff;padding:15px;color:#fff}.patient-card-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0;font-size:1.7em;font-weight:700}.patient-card-header[_ngcontent-%COMP%]   .id-card[_ngcontent-%COMP%]{margin:5px 0 0;font-size:1.1em;opacity:.9}.patient-card-body[_ngcontent-%COMP%]{padding:15px}.contact-info[_ngcontent-%COMP%]{margin-bottom:15px;font-size:1.1em;color:#333;display:flex;justify-content:space-evenly}.info_flex[_ngcontent-%COMP%]{display:flex;flex-direction:column}.contact-info[_ngcontent-%COMP%]{flex-direction:column;justify-content:center;text-align:center;gap:6px}.info_flex[_ngcontent-%COMP%]{display:flex}.contact-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:5px 0;display:flex;flex-direction:column;font-weight:500;gap:5px}.contact-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-weight:400}.contact-info[_ngcontent-%COMP%]   i[_ngcontent-%COMP%]{margin-right:8px;color:#1e90ff}.pathologies[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center}.pathologies[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:1.2em;color:#1e90ff;margin:0 0 10px}.pathologies[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{list-style-type:none;padding:0;margin:0;font-size:.8em}.pathologies[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{background-color:#f0f8ff;border-radius:4px;padding:5px 8px;margin-bottom:5px;display:inline-block;margin-right:5px}@media (width < 768px){.patient-card[_ngcontent-%COMP%]{width:95%;min-width:none;margin:9rem auto}}.treatments[_ngcontent-%COMP%]{display:flex;gap:1rem;flex-wrap:wrap;width:85%;margin:0 auto;justify-content:center}.treatments[_ngcontent-%COMP%]:last-child{margin-bottom:2rem}.treatment-card[_ngcontent-%COMP%]{width:100%;min-height:250px;background-color:#fff;border-radius:8px;overflow:hidden;box-shadow:0 4px 6px #0000001a;transition:all .3s ease;text-transform:capitalize;text-overflow:ellipsis}.treatment-card[_ngcontent-%COMP%]:hover{transform:scale(1.02);box-shadow:0 8px 12px #00000026}.treatment-card-header[_ngcontent-%COMP%]{background-color:#1e90ff;padding:15px;color:#fff}.treatment-card-header[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin:0;font-size:1em;font-weight:700}.treatment-card-body[_ngcontent-%COMP%]{padding:15px}.treatment-info[_ngcontent-%COMP%]{margin-bottom:15px;font-size:.8em;color:#333}.treatment-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:5px 0;font-weight:600;gap:5px}.treatment-info[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]   span[_ngcontent-%COMP%]{font-weight:500}.treatment-medications[_ngcontent-%COMP%]{display:flex;flex-direction:column}.treatment-medications[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{font-size:1.2em;color:#1e90ff;margin:0 0 10px}.treatment-medications[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%]{list-style-type:none;padding:0;margin:0;font-size:.8em}.treatment-medications[_ngcontent-%COMP%]   li[_ngcontent-%COMP%]{background-color:#f0f8ff;border-radius:4px;padding:5px 8px;margin-bottom:5px;display:inline-block;margin-right:5px}.treatment-item[_ngcontent-%COMP%]{margin:1rem}.item-container[_ngcontent-%COMP%]{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}"]})}}return o})();export{G as default};
