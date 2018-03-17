"use strict"
function mathimul(a,b){return a * b;}
var aSlot=null;var nullArray=[null];var nullObj={d:nullArray,o:0};
function ay(z,x){
var label=0;
var h=aSlot=new Int32Array(18);
var d=(x.i0>>0);
z.i0=(d>>0);
z.i2=(0>>0);
z.i1=(0>>0);
var a=(x.d1);
var o=((a<0)?-2147483648:0);
var f=(x.d2);
var m=((f<0)?-2147483648:0);
var f=Math.abs(f);
var f=(f+-1.0E-10);
var a=Math.abs(a);
var a=(a+-1.0E-10);
L17:do{
if(((d>>0)<(10>>0))){
var q=((9-d)>>0);
var d=((32-d)>>0);
h[0>>0]=(((f>>0)>>>q)>>0);
K(h,0,d>>0);
var u=(h[0>>0]>>0);
var m=(u|m);
h[1>>0]=(((a>>0)>>>q)>>0);
K(h,1,d>>0);
var d=(h[1>>0]>>0);
var o=(d|o);
}else{
if(((d>>0)<(16>>0))){
var q=(f>>0);
var u=(a>>0);
h[2>>0]=(q>>0);
K(h,2,23>>0);
var F=(h[2>>0]>>0);
h[3>>0]=(u>>0);
K(h,3,23>>0);
var H=(h[3>>0]>>0);
var C=((15-d)>>0);
var d=((32-d)>>0);
h[4>>0]=(((((f-(+(q>>0)))*60)>>0)>>C)>>0);
K(h,4,d>>0);
var q=(h[4>>0]>>0);
var m=((F|m)|q);
h[5>>0]=(((((a-(+(u>>0)))*60)>>0)>>C)>>0);
K(h,5,d>>0);
var d=(h[5>>0]>>0);
var o=((H|o)|d);
break;
}
if(((d>>0)<(22>>0))){
var q=(f>>0);
var u=(a>>0);
h[6>>0]=(q>>0);
K(h,6,23>>0);
var F=(h[6>>0]>>0);
h[7>>0]=(u>>0);
K(h,7,23>>0);
var H=(h[7>>0]>>0);
var f=((f-(+(q>>0)))*60);
var a=((a-(+(u>>0)))*60);
var q=(f>>0);
var u=(a>>0);
h[8>>0]=(q>>0);
K(h,8,17>>0);
var C=(h[8>>0]>>0);
h[9>>0]=(u>>0);
K(h,9,17>>0);
var R=(h[9>>0]>>0);
var M=((21-d)>>0);
var d=((32-d)>>0);
h[10>>0]=(((((f-(+(q>>0)))*60)>>0)>>M)>>0);
K(h,10,d>>0);
var q=(h[10>>0]>>0);
var m=(((F|m)|C)|q);
h[11>>0]=(((((a-(+(u>>0)))*60)>>0)>>M)>>0);
K(h,11,d>>0);
var d=(h[11>>0]>>0);
var o=(((H|o)|R)|d);
break;
}
h[12>>0]=((f>>0)>>0);
K(h,12,23>>0);
var q=(h[12>>0]>>0);
h[13>>0]=((a>>0)>>0);
K(h,13,23>>0);
var u=(h[13>>0]>>0);
var f=((f-(+((f>>0)>>0)))*60);
var a=((a-(+((a>>0)>>0)))*60);
h[14>>0]=((f>>0)>>0);
K(h,14,17>>0);
var F=(h[14>>0]>>0);
h[15>>0]=((a>>0)>>0);
K(h,15,17>>0);
var H=(h[15>>0]>>0);
var I=((f-(+((f>>0)>>0)))*60);
var a=((a-(+((a>>0)>>0)))*60);
h[16>>0]=((I>>0)>>0);
K(h,16,11>>0);
var C=(h[16>>0]>>0);
var m=(((q|m)|F)|C);
h[17>>0]=((a>>0)>>0);
K(h,17,11>>0);
var q=(h[17>>0]>>0);
var o=(((u|o)|H)|q);
var q=((d>>0)+(-21>>0)>>0);
if(!(((q>>0)>(0>>0)))){
break;
}
var f=(a-(+((a>>0)>>0)));
var a=(I-(+((I>>0)>>0)));
var d=0;
while(1){
var u=(1<<((10-d)>>0));
var a=(a*2);
if((((a>>0)>>0)===(0>>0))){
var m=(m&(u^-1));
}else{
var m=(u|m);
}
var f=(f*2);
if((((f>>0)>>0)===(0>>0))){
var o=(o&(u^-1));
}else{
var o=(u|o);
}
var a=(a-(+((a>>0)>>0)));
var f=(f-(+((f>>0)>>0)));
var d=((d>>0)+(1>>0)>>0);
if(((d>>0)<(q>>0))){
}else{
break L17;
}
}
}
}while(0);
z.i2=(m>>0);
z.i1=(o>>0);
return ;
}
function d5(V,U){
var label=0;
var a=aSlot=new Int32Array(32);
var d=(U.i0>>0);
V.i0=(d>>0);
V.d2=0;
V.d1=0;
var f=(U.i2>>0);
var q=(U.i1>>0);
var h=(((f>>0)<(0>>0))?(f&2147483647):f);
var M=(((f>>0)<(0>>0))?-1:1);
var f=(((q>>0)<(0>>0))?(q&2147483647):q);
var R=(((q>>0)<(0>>0))?-1:1);
do{
if(((d>>0)<(10>>0))){
var q=((32-d)>>0);
a[0>>0]=(h>>0);
S(a,0,q>>0);
var h=(a[0>>0]>>0);
a[1>>0]=(f>>0);
S(a,1,q>>0);
var f=(a[1>>0]>>0);
var d=((9-d)>>0);
var o=(+((h<<d)>>0));
V.d2=o;
var m=(+((f<<d)>>0));
V.d1=m;
}else{
if(((d>>0)<(16>>0))){
a[2>>0]=(h>>0);
S(a,2,23>>0);
var q=(a[2>>0]>>0);
a[3>>0]=(f>>0);
S(a,3,23>>0);
var C=(a[3>>0]>>0);
a[4>>0]=(h>>0);
K(a,4,9>>0);
var h=((41-d)>>0);
a[5>>0]=((a[4>>0]>>0)>>0);
S(a,5,h>>0);
var d=((15-d)>>0);
a[6>>0]=((a[5>>0]>>0)>>0);
K(a,6,d>>0);
var u=(a[6>>0]>>0);
a[7>>0]=(f>>0);
K(a,7,9>>0);
a[8>>0]=((a[7>>0]>>0)>>0);
S(a,8,h>>0);
a[9>>0]=((a[8>>0]>>0)>>0);
K(a,9,d>>0);
var d=(a[9>>0]>>0);
var o=((+(q>>0))+(((u>>0)>(60>>0))?1:((+(u>>0))/60)));
V.d2=o;
var m=((+(C>>0))+(((d>>0)>(60>>0))?1:((+(d>>0))/60)));
V.d1=m;
break;
}
if(((d>>0)<(22>>0))){
a[10>>0]=(h>>0);
S(a,10,23>>0);
var q=(a[10>>0]>>0);
a[11>>0]=(f>>0);
S(a,11,23>>0);
var C=(a[11>>0]>>0);
a[12>>0]=(h>>0);
K(a,12,9>>0);
a[13>>0]=((a[12>>0]>>0)>>0);
S(a,13,26>>0);
var u=(a[13>>0]>>0);
a[14>>0]=(f>>0);
K(a,14,9>>0);
a[15>>0]=((a[14>>0]>>0)>>0);
S(a,15,26>>0);
var x=(a[15>>0]>>0);
a[16>>0]=(h>>0);
K(a,16,15>>0);
var h=((47-d)>>0);
a[17>>0]=((a[16>>0]>>0)>>0);
S(a,17,h>>0);
var d=((21-d)>>0);
a[18>>0]=((a[17>>0]>>0)>>0);
K(a,18,d>>0);
var z=(a[18>>0]>>0);
a[19>>0]=(f>>0);
K(a,19,15>>0);
a[20>>0]=((a[19>>0]>>0)>>0);
S(a,20,h>>0);
a[21>>0]=((a[20>>0]>>0)>>0);
K(a,21,d>>0);
var d=(a[21>>0]>>0);
var o=(((+(q>>0))+(((u>>0)>(59>>0))?1:((+(u>>0))/60)))+(((u>>0)>(59>>0))?0:(((z>>0)>(60>>0))?0.016666666666666666:((+(z>>0))/3600))));
V.d2=o;
var m=(((+(C>>0))+(((x>>0)>(59>>0))?1:((+(x>>0))/60)))+(((x>>0)>(59>>0))?0:(((d>>0)>(60>>0))?0.016666666666666666:((+(d>>0))/3600))));
V.d1=m;
break;
}
a[22>>0]=(h>>0);
S(a,22,23>>0);
var q=(a[22>>0]>>0);
a[23>>0]=(f>>0);
S(a,23,23>>0);
var C=(a[23>>0]>>0);
a[24>>0]=(h>>0);
K(a,24,9>>0);
a[25>>0]=((a[24>>0]>>0)>>0);
S(a,25,26>>0);
var u=(a[25>>0]>>0);
a[26>>0]=(f>>0);
K(a,26,9>>0);
a[27>>0]=((a[26>>0]>>0)>>0);
S(a,27,26>>0);
var x=(a[27>>0]>>0);
a[28>>0]=(h>>0);
K(a,28,15>>0);
a[29>>0]=((a[28>>0]>>0)>>0);
S(a,29,26>>0);
var z=(a[29>>0]>>0);
a[30>>0]=(f>>0);
K(a,30,15>>0);
a[31>>0]=((a[30>>0]>>0)>>0);
S(a,31,26>>0);
var T=(a[31>>0]>>0);
var I=((d>>0)+(-21>>0)>>0);
L20:do{
if(((I>>0)>(0>>0))){
var o=0;
var m=0;
var d=0;
while(1){
var H=(1<<((10-d)>>0));
var d=((d>>0)+(1>>0)>>0);
var F=aO(1,d>>0);
var o=(o+((+(((((H&h)>>0)!==(0>>0))?1:0)&1))/F));
var F=aO(1,d>>0);
var m=(m+((+(((((H&f)>>0)!==(0>>0))?1:0)&1))/F));
if(((d>>0)<(I>>0))){
}else{
break L20;
}
}
}else{
var o=0;
var m=0;
}
}while(0);
var d=(((u>>0)>(59>>0))?0:z);
var f=(((x>>0)>(59>>0))?0:T);
var o=((((((d>>0)>(59>>0))?60:(+(d>>0)))+(((d>>0)>(59>>0))?0:(((u>>0)>(59>>0))?0:o)))/3600)+((+(q>>0))+(((u>>0)>(59>>0))?1:((+(u>>0))/60))));
V.d2=o;
var m=((((((f>>0)>(59>>0))?60:(+(f>>0)))+(((f>>0)>(59>>0))?0:(((x>>0)>(59>>0))?0:m)))/3600)+((+(C>>0))+(((x>>0)>(59>>0))?1:((+(x>>0))/60))));
V.d1=m;
}
}while(0);
V.d2=(M*(o+1.0E-10));
V.d1=(R*(m+1.0E-10));
return ;
}
function a3(z,C,D,u,v,x,y,q,r){
var label=0;
var m=z;
var f=(m.a0);
q[r>>0]=(f[0>>0].d0);
u[v>>0]=(f[0>>0].d0);
x[y>>0]=(f[0>>0].d1);
C[D>>0]=(f[0>>0].d1);
var m=(m.a1);
var d=1;
var o=((((((m.o)-(0))>>0)>>0)/(d>>0))>>0);
if(((o>>0)>(1>>0))){
var d=1;
}else{
return ;
}
while(1){
if(!(((o>>>0)>(d>>>0)))){
label=2;
break;
}
var h=(q[r>>0]);
var a=(f[(0>>0)+(d>>0)>>0].d0);
if((h<a)){
q[r>>0]=a;
}
var h=(u[v>>0]);
var a=(f[(0>>0)+(d>>0)>>0].d0);
if((h>a)){
u[v>>0]=a;
}
var h=(x[y>>0]);
var a=(f[(0>>0)+(d>>0)>>0].d1);
if((h<a)){
x[y>>0]=a;
}
var h=(C[D>>0]);
var a=(f[(0>>0)+(d>>0)>>0].d1);
if((h>a)){
C[D>>0]=a;
}
var d=((d>>0)+(1>>0)>>0);
if(((d>>0)<(o>>0))){
}else{
label=14;
break;
}
}
if(label===2){
J(z);
}
else if(label===14){
return ;
}
}
function b_(I,M,H,F,R){
var label=0;
var d=aSlot={i0:0,i1:0,i2:0};
var h=aSlot={i0:0,d1:0,d2:0};
var r=aSlot={i0:0,i1:0,i2:0};
var m=aSlot={i0:0,d1:0,d2:0};
var f=aSlot={i0:0,d1:0,d2:0};
var D=(H+1.0E-8);
var z=(R+1.0E-8);
h.i0=(32>>0);
h.d1=(F+-1.0E-8);
h.d2=(M+-1.0E-8);
ay(d,h);
m.i0=(32>>0);
m.d1=z;
m.d2=D;
ay(r,m);
var o=(d.i2>>0);
var a=(r.i2>>0);
if(((o>>0)===(((((a>>0)!==(0>>0))?1:0)?1:0)>>0))){
var o=32;
}else{
var y=Math.log((+((a^o)>>>0)));
var o=((31-((y/0.69314718055994529)>>0))>>0);
}
var a=(d.i1>>0);
var v=(r.i1>>0);
if(((a>>0)===(((((v>>0)!==(0>>0))?1:0)?1:0)>>0))){
var a=32;
}else{
var y=Math.log((+((v^a)>>>0)));
var a=((31-((y/0.69314718055994529)>>0))>>0);
}
f.i0=((((a>>0)<(o>>0))?a:o)>>0);
f.d1=z;
f.d2=D;
ay(d,f);
I.i0=((d.i0>>0)>>0);
I.i1=((d.i1>>0)>>0);
I.i2=((d.i2>>0)>>0);
return ;
}
function b9(v,y,r){
var label=0;
var h=v.a0;
var o=(h.a1);
var h=(h.a0);
var a=1;
var d=((((((o.o)-(0))>>0)>>0)/(a>>0))>>0);
L16:do{
if(((d>>0)>(0>>0))){
var a=0;
while(1){
if(!(((d>>>0)>(a>>>0)))){
break;
}
var m=(h[(0>>0)+(a>>0)>>0].d0);
var f=((a>>0)+(1>>0)>>0);
if(!((m===y))){
break L16;
}
if(((f>>0)<(d>>0))){
var a=f;
}else{
var a=f;
break L16;
}
}
J(v.a0);
}else{
var a=0;
}
}while(0);
if(((a>>0)===(d>>0))){
var a=1;
return (a>>0)>>0;
}
L26:do{
if(((d>>0)>(0>>0))){
var a=0;
while(1){
if(!(((d>>>0)>(a>>>0)))){
break;
}
var m=(h[(0>>0)+(a>>0)>>0].d1);
var f=((a>>0)+(1>>0)>>0);
if(!((m===r))){
break L26;
}
if(((f>>0)<(d>>0))){
var a=f;
}else{
var a=f;
break L26;
}
}
J(v.a0);
}else{
var a=0;
}
}while(0);
var a=((a>>0)===(d>>0))?1:0;
return (a>>0)>>0;
}
function b8(aL,aA,at,az){
var label=0;
var r=aSlot=[{a0:{a0:nullArray,a1:nullObj,a2:r={a0:nullObj}},i1:0,a2:r={i0:0,i1:0,i2:0}},r={a0:{a0:nullArray,a1:nullObj,a2:r={a0:nullObj}},i1:0,a2:r={i0:0,i1:0,i2:0}},r={a0:{a0:nullArray,a1:nullObj,a2:r={a0:nullObj}},i1:0,a2:r={i0:0,i1:0,i2:0}},r={a0:{a0:nullArray,a1:nullObj,a2:r={a0:nullObj}},i1:0,a2:r={i0:0,i1:0,i2:0}},r={a0:{a0:nullArray,a1:nullObj,a2:r={a0:nullObj}},i1:0,a2:r={i0:0,i1:0,i2:0}},r={a0:{a0:nullArray,a1:nullObj,a2:r={a0:nullObj}},i1:0,a2:r={i0:0,i1:0,i2:0}}];
var o=aSlot={d0:0,d1:0};
var H=aSlot=new Int32Array(4);
var ai=r[0>>0].a0;
ai.a0=nullArray;
ai.a1=nullObj;
ai.a2.a0=nullObj;
var ag=r[(0>>0)+(1>>0)>>0].a0;
ag.a0=nullArray;
ag.a1=nullObj;
ag.a2.a0=nullObj;
var M=aL.a0;
var d=(M.a1);
var a=(M.a0);
var z=1;
do{
if(((((((((((d.o)-(0))>>0)>>0)/(z>>0))>>0)>>0)+(-1>>0)>>0)>>0)>(0>>0))){
var F=0;
var h=0;
var f=0;
L172:while(1){
if(!(((((((((d.o)-(0))>>0)>>0)/(z>>0))>>0)>>>0)>(f>>>0)))){
label=3;
break;
}
var m=(a[(0>>0)+(f>>0)>>0].d1);
do{
if((m<at)){
var d=(ai.a1);
var R=(ai.a2.a0);
if((d.d.length===R.d.length && d.d===R.d && d.o===R.o)){
Qa(r[0>>0].a0,a[(0>>0)+(f>>0)>>0]);
}else{
d.d[d.o>>0].d0=(a[(0>>0)+(f>>0)>>0].d0);
d.d[d.o>>0].d1=(a[(0>>0)+(f>>0)>>0].d1);
var a=(ai.a1);
ai.a1={d:a.d,o:a.o+1>>0};
}
var y=((f>>0)+(1>>0)>>0);
var a=(M.a1);
var d=(M.a0);
var D=((((((a.o)-(0))>>0)>>0)/(z>>0))>>0);
if(!(((D>>>0)>(y>>>0)))){
label=9;
break L172;
}
var X=((h>>0)+(1>>0)>>0);
var v=(d[(0>>0)+(y>>0)>>0].d1);
if(!((v>at))){
var h=X;
var f=y;
break;
}
if(!(((D>>>0)>(f>>>0)))){
label=12;
break L172;
}
var I=(d[(0>>0)+(f>>0)>>0].d0);
var m=(d[(0>>0)+(f>>0)>>0].d1);
if((m!==v)){
var V=(d[(0>>0)+(y>>0)>>0].d0);
var v=((I-V)/(m-v));
var m=((v*at)+(I-(m*v)));
}else{
}
o.d0=m;
o.d1=at;
var a=(ai.a1);
var d=(ai.a2.a0);
if((a.d.length===d.d.length && a.d===d.d && a.o===d.o)){
Qa(r[0>>0].a0,o);
}else{
a.d[a.o>>0].d0=m;
a.d[a.o>>0].d1=at;
var a=(ai.a1);
ai.a1={d:a.d,o:a.o+1>>0};
}
var a=(ag.a1);
var d=(ag.a2.a0);
if((a.d.length===d.d.length && a.d===d.d && a.o===d.o)){
Qa(r[(0>>0)+(1>>0)>>0].a0,o);
}else{
a.d[a.o>>0].d0=m;
a.d[a.o>>0].d1=at;
var a=(ag.a1);
ag.a1={d:a.d,o:a.o+1>>0};
}
var F=((F>>0)+(1>>0)>>0);
var h=((h>>0)+(2>>0)>>0);
var f=y;
}else{
if(!((m>at))){
var d=(ai.a1);
var R=(ai.a2.a0);
if((d.d.length===R.d.length && d.d===R.d && d.o===R.o)){
Qa(r[0>>0].a0,a[(0>>0)+(f>>0)>>0]);
}else{
d.d[d.o>>0].d0=(a[(0>>0)+(f>>0)>>0].d0);
d.d[d.o>>0].d1=(a[(0>>0)+(f>>0)>>0].d1);
var a=(ai.a1);
ai.a1={d:a.d,o:a.o+1>>0};
}
var a=(M.a1);
var d=(M.a0);
if(!(((((((((a.o)-(0))>>0)>>0)/(z>>0))>>0)>>>0)>(f>>>0)))){
label=44;
break L172;
}
var a=(ag.a1);
var R=(ag.a2.a0);
if((a.d.length===R.d.length && a.d===R.d && a.o===R.o)){
Qa(r[(0>>0)+(1>>0)>>0].a0,d[(0>>0)+(f>>0)>>0]);
}else{
a.d[a.o>>0].d0=(d[(0>>0)+(f>>0)>>0].d0);
a.d[a.o>>0].d1=(d[(0>>0)+(f>>0)>>0].d1);
var a=(ag.a1);
ag.a1={d:a.d,o:a.o+1>>0};
}
var F=((F>>0)+(1>>0)>>0);
var h=((h>>0)+(1>>0)>>0);
var f=((f>>0)+(1>>0)>>0);
break;
}
var d=(ag.a1);
var R=(ag.a2.a0);
if((d.d.length===R.d.length && d.d===R.d && d.o===R.o)){
Qa(r[(0>>0)+(1>>0)>>0].a0,a[(0>>0)+(f>>0)>>0]);
}else{
d.d[d.o>>0].d0=(a[(0>>0)+(f>>0)>>0].d0);
d.d[d.o>>0].d1=(a[(0>>0)+(f>>0)>>0].d1);
var a=(ag.a1);
ag.a1={d:a.d,o:a.o+1>>0};
}
var y=((f>>0)+(1>>0)>>0);
var a=(M.a1);
var d=(M.a0);
var D=((((((a.o)-(0))>>0)>>0)/(z>>0))>>0);
if(!(((D>>>0)>(y>>>0)))){
label=27;
break L172;
}
var X=((F>>0)+(1>>0)>>0);
var v=(d[(0>>0)+(y>>0)>>0].d1);
if(!((v<at))){
var F=X;
var f=y;
break;
}
if(!(((D>>>0)>(f>>>0)))){
label=30;
break L172;
}
var I=(d[(0>>0)+(f>>0)>>0].d0);
var m=(d[(0>>0)+(f>>0)>>0].d1);
if((m!==v)){
var V=(d[(0>>0)+(y>>0)>>0].d0);
var v=((I-V)/(m-v));
var m=((v*at)+(I-(m*v)));
}else{
}
o.d0=m;
o.d1=at;
var a=(ai.a1);
var d=(ai.a2.a0);
if((a.d.length===d.d.length && a.d===d.d && a.o===d.o)){
Qa(r[0>>0].a0,o);
}else{
a.d[a.o>>0].d0=m;
a.d[a.o>>0].d1=at;
var a=(ai.a1);
ai.a1={d:a.d,o:a.o+1>>0};
}
var a=(ag.a1);
var d=(ag.a2.a0);
if((a.d.length===d.d.length && a.d===d.d && a.o===d.o)){
Qa(r[(0>>0)+(1>>0)>>0].a0,o);
}else{
a.d[a.o>>0].d0=m;
a.d[a.o>>0].d1=at;
var a=(ag.a1);
ag.a1={d:a.d,o:a.o+1>>0};
}
var F=((F>>0)+(2>>0)>>0);
var h=((h>>0)+(1>>0)>>0);
var f=y;
}
}while(0);
var d=(M.a1);
var a=(M.a0);
if(((f>>0)<(((((((((d.o)-(0))>>0)>>0)/(z>>0))>>0)>>0)+(-1>>0)>>0)>>0))){
}else{
label=50;
break;
}
}
if(label===3){
J(aL.a0);
}
else if(label===9){
J(aL.a0);
}
else if(label===12){
J(aL.a0);
}
else if(label===27){
J(aL.a0);
}
else if(label===30){
J(aL.a0);
}
else if(label===44){
J(aL.a0);
}
else if(label===50){
do{
if(((h>>0)>(0>>0))){
var a=(ai.a1);
var d=(ai.a0);
if(((((((((a.o)-(0))>>0)>>0)/(z>>0))>>0)>>0)===(0>>0))){
J(r[0>>0].a0);
}
var M=(ai.a2.a0);
if((a.d.length===M.d.length && a.d===M.d && a.o===M.o)){
Qa(r[0>>0].a0,d[0>>0]);
break;
}else{
a.d[a.o>>0].d0=(d[0>>0].d0);
a.d[a.o>>0].d1=(d[0>>0].d1);
var a=(ai.a1);
ai.a1={d:a.d,o:a.o+1>>0};
break;
}
}
}while(0);
if(!(((F>>0)>(0>>0)))){
break;
}
var a=(ag.a1);
var d=(ag.a0);
if(((((((((a.o)-(0))>>0)>>0)/(z>>0))>>0)>>0)===(0>>0))){
J(r[(0>>0)+(1>>0)>>0].a0);
}
var M=(ag.a2.a0);
if((a.d.length===M.d.length && a.d===M.d && a.o===M.o)){
Qa(r[(0>>0)+(1>>0)>>0].a0,d[0>>0]);
break;
}else{
a.d[a.o>>0].d0=(d[0>>0].d0);
a.d[a.o>>0].d1=(d[0>>0].d1);
var a=(ag.a1);
ag.a1={d:a.d,o:a.o+1>>0};
break;
}
}
}
}while(0);
var M=r[2>>0].a0;
M.a0=nullArray;
M.a1=nullObj;
M.a2.a0=nullObj;
var R=r[(2>>0)+(1>>0)>>0].a0;
R.a0=nullArray;
R.a1=nullObj;
R.a2.a0=nullObj;
var ae=r[(2>>0)+(2>>0)>>0].a0;
ae.a0=nullArray;
ae.a1=nullObj;
ae.a2.a0=nullObj;
var af=r[(2>>0)+(3>>0)>>0].a0;
af.a0=nullArray;
af.a1=nullObj;
af.a2.a0=nullObj;
H[0>>0]=(0>>0);
H[1>>0]=(0>>0);
H[2>>0]=(0>>0);
H[3>>0]=(0>>0);
var f=0;
L252:while(1){
var U=r[(0>>0)+(f>>0)>>0].a0;
var d=(U.a1);
var a=(U.a0);
L254:do{
if(((((((((((d.o)-(0))>>0)>>0)/(z>>0))>>0)>>0)+(-1>>0)>>0)>>0)>(0>>0))){
var F=((f>>0)+(2>>0)>>0);
var T=r[(2>>0)+(f>>0)>>0].a0;
var ak=r[(2>>0)+(F>>0)>>0].a0;
var h=0;
while(1){
if(!(((((((((d.o)-(0))>>0)>>0)/(z>>0))>>0)>>>0)>(h>>>0)))){
label=66;
break L252;
}
var m=(a[(0>>0)+(h>>0)>>0].d0);
do{
if((m<aA)){
var d=(T.a1);
var aa=(T.a2.a0);
if((d.d.length===aa.d.length && d.d===aa.d && d.o===aa.o)){
Qa(r[(2>>0)+(f>>0)>>0].a0,a[(0>>0)+(h>>0)>>0]);
}else{
d.d[d.o>>0].d0=m;
d.d[d.o>>0].d1=(a[(0>>0)+(h>>0)>>0].d1);
var a=(T.a1);
T.a1={d:a.d,o:a.o+1>>0};
}
var y=(H[f>>0]>>0);
H[f>>0]=(((y>>0)+(1>>0)>>0)>>0);
var D=((h>>0)+(1>>0)>>0);
var a=(U.a1);
var d=(U.a0);
var X=((((((a.o)-(0))>>0)>>0)/(z>>0))>>0);
if(!(((X>>>0)>(D>>>0)))){
label=72;
break L252;
}
var v=(d[(0>>0)+(D>>0)>>0].d0);
if(!((v>aA))){
var h=D;
break;
}
if(!(((X>>>0)>(h>>>0)))){
label=75;
break L252;
}
var I=(d[(0>>0)+(h>>0)>>0].d0);
var m=(d[(0>>0)+(h>>0)>>0].d1);
var V=(d[(0>>0)+(D>>0)>>0].d1);
if((m!==V)){
var v=((I-v)/(m-V));
var m=((aA-(I-(m*v)))/v);
}else{
}
o.d1=m;
o.d0=aA;
var a=(T.a1);
var d=(T.a2.a0);
if((a.d.length===d.d.length && a.d===d.d && a.o===d.o)){
Qa(r[(2>>0)+(f>>0)>>0].a0,o);
}else{
a.d[a.o>>0].d0=aA;
a.d[a.o>>0].d1=m;
var a=(T.a1);
T.a1={d:a.d,o:a.o+1>>0};
}
var a=(ak.a1);
var d=(ak.a2.a0);
if((a.d.length===d.d.length && a.d===d.d && a.o===d.o)){
Qa(r[(2>>0)+(F>>0)>>0].a0,o);
}else{
a.d[a.o>>0].d0=aA;
a.d[a.o>>0].d1=m;
var a=(ak.a1);
ak.a1={d:a.d,o:a.o+1>>0};
}
H[f>>0]=(((y>>0)+(2>>0)>>0)>>0);
var h=(H[F>>0]>>0);
H[F>>0]=(((h>>0)+(1>>0)>>0)>>0);
var h=D;
}else{
if(!((m>aA))){
var d=(T.a1);
var aa=(T.a2.a0);
if((d.d.length===aa.d.length && d.d===aa.d && d.o===aa.o)){
Qa(r[(2>>0)+(f>>0)>>0].a0,a[(0>>0)+(h>>0)>>0]);
}else{
d.d[d.o>>0].d0=m;
d.d[d.o>>0].d1=(a[(0>>0)+(h>>0)>>0].d1);
var a=(T.a1);
T.a1={d:a.d,o:a.o+1>>0};
}
var a=(U.a1);
var d=(U.a0);
if(!(((((((((a.o)-(0))>>0)>>0)/(z>>0))>>0)>>>0)>(h>>>0)))){
label=107;
break L252;
}
var a=(ak.a1);
var aa=(ak.a2.a0);
if((a.d.length===aa.d.length && a.d===aa.d && a.o===aa.o)){
Qa(r[(2>>0)+(F>>0)>>0].a0,d[(0>>0)+(h>>0)>>0]);
}else{
a.d[a.o>>0].d0=(d[(0>>0)+(h>>0)>>0].d0);
a.d[a.o>>0].d1=(d[(0>>0)+(h>>0)>>0].d1);
var a=(ak.a1);
ak.a1={d:a.d,o:a.o+1>>0};
}
var y=(H[f>>0]>>0);
H[f>>0]=(((y>>0)+(1>>0)>>0)>>0);
var y=(H[F>>0]>>0);
H[F>>0]=(((y>>0)+(1>>0)>>0)>>0);
var h=((h>>0)+(1>>0)>>0);
break;
}
var d=(ak.a1);
var aa=(ak.a2.a0);
if((d.d.length===aa.d.length && d.d===aa.d && d.o===aa.o)){
Qa(r[(2>>0)+(F>>0)>>0].a0,a[(0>>0)+(h>>0)>>0]);
}else{
d.d[d.o>>0].d0=m;
d.d[d.o>>0].d1=(a[(0>>0)+(h>>0)>>0].d1);
var a=(ak.a1);
ak.a1={d:a.d,o:a.o+1>>0};
}
var y=(H[F>>0]>>0);
H[F>>0]=(((y>>0)+(1>>0)>>0)>>0);
var D=((h>>0)+(1>>0)>>0);
var a=(U.a1);
var d=(U.a0);
var X=((((((a.o)-(0))>>0)>>0)/(z>>0))>>0);
if(!(((X>>>0)>(D>>>0)))){
label=90;
break L252;
}
var v=(d[(0>>0)+(D>>0)>>0].d0);
if(!((v<aA))){
var h=D;
break;
}
if(!(((X>>>0)>(h>>>0)))){
label=93;
break L252;
}
var I=(d[(0>>0)+(h>>0)>>0].d0);
var m=(d[(0>>0)+(h>>0)>>0].d1);
var V=(d[(0>>0)+(D>>0)>>0].d1);
if((m!==V)){
var v=((I-v)/(m-V));
var m=((aA-(I-(m*v)))/v);
}else{
}
o.d1=m;
o.d0=aA;
var a=(T.a1);
var d=(T.a2.a0);
if((a.d.length===d.d.length && a.d===d.d && a.o===d.o)){
Qa(r[(2>>0)+(f>>0)>>0].a0,o);
}else{
a.d[a.o>>0].d0=aA;
a.d[a.o>>0].d1=m;
var a=(T.a1);
T.a1={d:a.d,o:a.o+1>>0};
}
var a=(ak.a1);
var d=(ak.a2.a0);
if((a.d.length===d.d.length && a.d===d.d && a.o===d.o)){
Qa(r[(2>>0)+(F>>0)>>0].a0,o);
}else{
a.d[a.o>>0].d0=aA;
a.d[a.o>>0].d1=m;
var a=(ak.a1);
ak.a1={d:a.d,o:a.o+1>>0};
}
var h=(H[f>>0]>>0);
H[f>>0]=(((h>>0)+(1>>0)>>0)>>0);
H[F>>0]=(((y>>0)+(2>>0)>>0)>>0);
var h=D;
}
}while(0);
var d=(U.a1);
var a=(U.a0);
if(((h>>0)<(((((((((d.o)-(0))>>0)>>0)/(z>>0))>>0)>>0)+(-1>>0)>>0)>>0))){
}else{
break L254;
}
}
}
}while(0);
var f=((f>>0)+(1>>0)>>0);
if(((f>>0)<(2>>0))){
}else{
var f=0;
label=114;
break;
}
}
if(label===66){
J(r[(0>>0)+(f>>0)>>0].a0);
}
else if(label===72){
J(r[(0>>0)+(f>>0)>>0].a0);
}
else if(label===75){
J(r[(0>>0)+(f>>0)>>0].a0);
}
else if(label===90){
J(r[(0>>0)+(f>>0)>>0].a0);
}
else if(label===93){
J(r[(0>>0)+(f>>0)>>0].a0);
}
else if(label===107){
J(r[(0>>0)+(f>>0)>>0].a0);
}
else if(label===114){
while(1){
label=0;
var h=(H[f>>0]>>0);
if(((h>>0)>(0>>0))){
var a=r[(2>>0)+(f>>0)>>0].a0;
var d=(a.a1);
var o=(a.a0);
if(((((((((d.o)-(0))>>0)>>0)/(z>>0))>>0)>>0)===(0>>0))){
label=116;
break;
}
var U=(a.a2.a0);
if((d.d.length===U.d.length && d.d===U.d && d.o===U.o)){
Qa(r[(2>>0)+(f>>0)>>0].a0,o[0>>0]);
}else{
d.d[d.o>>0].d0=(o[0>>0].d0);
d.d[d.o>>0].d1=(o[0>>0].d1);
var d=(a.a1);
a.a1={d:d.d,o:d.o+1>>0};
}
H[f>>0]=(((h>>0)+(1>>0)>>0)>>0);
}
var f=((f>>0)+(1>>0)>>0);
if(((f>>0)<(4>>0))){
label=114;
}else{
break;
}
}
if(label===116){
J(r[(2>>0)+(f>>0)>>0].a0);
}
var a=az;
var f=0;
L332:while(1){
var d=(a.a1);
var o=(a.a2.a0);
if((d.d.length===o.d.length && d.d===o.d && d.o===o.o)){
aw(az,r[(2>>0)+(f>>0)>>0]);
}else{
ed(d.d[d.o>>0].a0,r[(2>>0)+(f>>0)>>0].a0);
d.d[d.o>>0].i1=((r[(2>>0)+(f>>0)>>0].i1>>0)>>0);
d.d[d.o>>0].a2.i0=((r[(2>>0)+(f>>0)>>0].a2.i0>>0)>>0);
d.d[d.o>>0].a2.i1=((r[(2>>0)+(f>>0)>>0].a2.i1>>0)>>0);
d.d[d.o>>0].a2.i2=((r[(2>>0)+(f>>0)>>0].a2.i2>>0)>>0);
var d=(a.a1);
a.a1={d:d.d,o:d.o+1>>0};
}
var F=(H[f>>0]>>0);
L338:do{
if(((F>>0)>(0>>0))){
var y=1;
var d=r[(2>>0)+(f>>0)>>0].a0;
var h=0;
while(1){
var o=(a.a1);
var U=(a.a0);
if(!(((((((((o.o)-(U.o))>>0)>>0)/(y>>0))>>0)>>>0)>(f>>>0)))){
label=130;
break L332;
}
var o=U.d[(U.o>>0)+(f>>0)>>0].a0;
var T=(o.a1);
var o=(o.a0);
if(!(((((((((T.o)-(0))>>0)>>0)/(z>>0))>>0)>>>0)>(h>>>0)))){
label=132;
break L332;
}
var U=(d.a1);
var T=(d.a0);
if(!(((((((((U.o)-(0))>>0)>>0)/(z>>0))>>0)>>>0)>(h>>>0)))){
label=134;
break L332;
}
o[(0>>0)+(h>>0)>>0].d0=(T[(0>>0)+(h>>0)>>0].d0);
o[(0>>0)+(h>>0)>>0].d1=(T[(0>>0)+(h>>0)>>0].d1);
var h=((h>>0)+(1>>0)>>0);
if(((h>>0)<(F>>0))){
}else{
break L338;
}
}
}
}while(0);
var f=((f>>0)+(1>>0)>>0);
if(((f>>0)<(4>>0))){
}else{
label=123;
break;
}
}
if(label===123){
var a=(af.a0);
if(!((a.length===1 && a===nullArray && 0===0))){
var d=(af.a1);
if(!((d.d.length===a.length && d.d===a && d.o===0))){
var f=0;
while(1){
var f=((f>>0)+(-1>>0)>>0);
if((d.d[(d.o>>0)+(f>>0)>>0]===a[0>>0])){
break;
}else{
}
}
af.a1={d:a,o:0};
}
}
var a=(ae.a0);
if(!((a.length===1 && a===nullArray && 0===0))){
var d=(ae.a1);
if(!((d.d.length===a.length && d.d===a && d.o===0))){
var f=0;
while(1){
var f=((f>>0)+(-1>>0)>>0);
if((d.d[(d.o>>0)+(f>>0)>>0]===a[0>>0])){
break;
}else{
}
}
ae.a1={d:a,o:0};
}
}
var a=(R.a0);
if(!((a.length===1 && a===nullArray && 0===0))){
var d=(R.a1);
if(!((d.d.length===a.length && d.d===a && d.o===0))){
var f=0;
while(1){
var f=((f>>0)+(-1>>0)>>0);
if((d.d[(d.o>>0)+(f>>0)>>0]===a[0>>0])){
break;
}else{
}
}
R.a1={d:a,o:0};
}
}
var a=(M.a0);
if(!((a.length===1 && a===nullArray && 0===0))){
var d=(M.a1);
if(!((d.d.length===a.length && d.d===a && d.o===0))){
var f=0;
while(1){
var f=((f>>0)+(-1>>0)>>0);
if((d.d[(d.o>>0)+(f>>0)>>0]===a[0>>0])){
break;
}else{
}
}
M.a1={d:a,o:0};
}
}
var a=(ag.a0);
if(!((a.length===1 && a===nullArray && 0===0))){
var d=(ag.a1);
if(!((d.d.length===a.length && d.d===a && d.o===0))){
var f=0;
while(1){
var f=((f>>0)+(-1>>0)>>0);
if((d.d[(d.o>>0)+(f>>0)>>0]===a[0>>0])){
break;
}else{
}
}
ag.a1={d:a,o:0};
}
}
var a=(ai.a0);
if((a.length===1 && a===nullArray && 0===0)){
return ;
}
var d=(ai.a1);
if(!((d.d.length===a.length && d.d===a && d.o===0))){
var f=0;
while(1){
var f=((f>>0)+(-1>>0)>>0);
if((d.d[(d.o>>0)+(f>>0)>>0]===a[0>>0])){
break;
}else{
}
}
ai.a1={d:a,o:0};
}
return ;
}
else if(label===130){
J(az);
}
else if(label===132){
J(U.d[(U.o>>0)+(f>>0)>>0].a0);
}
else if(label===134){
J(r[(2>>0)+(f>>0)>>0].a0);
}
}
}
function b7(cA,cw,cz,cx,cy){
var label=0;
var r=aSlot=[0,0,0,0];
var v=aSlot={i0:0,d1:0,d2:0};
var o=aSlot={i0:0,i1:0,i2:0};
var a=aSlot={a0:nullArray,a1:nullObj,a2:{a0:nullObj}};
var aA=aSlot={a0:nullArray,a1:nullObj,a2:{a0:nullObj}};
var V=aSlot={a0:nullObj,a1:nullObj,a2:{a0:nullObj}};
var ai=aSlot={a0:nullObj,a1:nullObj,a2:{a0:nullObj}};
var U=aSlot={a0:nullObj,a1:nullObj,a2:{a0:nullObj}};
var T=aSlot={a0:{a0:nullArray,a1:nullObj,a2:T={a0:nullObj}},i1:0,a2:T={i0:0,i1:0,i2:0}};
var I=aSlot={a0:{a0:nullArray,a1:nullObj,a2:I={a0:nullObj}},i1:0,a2:I={i0:0,i1:0,i2:0}};
var ag=aSlot={a0:nullArray,a1:nullObj,a2:{a0:nullObj}};
var at=aSlot={i0:0,i1:0,i2:0};
cx[cy>>0]=(0>>0);
r[0>>0]=0;
r[1>>0]=0;
r[2>>0]=0;
r[3>>0]=0;
ed(a,cA.a0);
a3(a,r,2,r,0,r,3,r,1);
var ae=a;
var R=(ae.a0);
if(!((R.length===1 && R===nullArray && 0===0))){
var X=(ae.a1);
if(!((X.d.length===R.length && X.d===R && X.o===0))){
var f=0;
while(1){
var f=((f>>0)+(-1>>0)>>0);
if((X.d[(X.o>>0)+(f>>0)>>0]===R[0>>0])){
break;
}else{
}
}
ae.a1={d:R,o:0};
}
}
var aa=(r[1>>0]);
var af=(r[0>>0]);
var az=(r[3>>0]);
var bb=(r[2>>0]);
b_(o,aa,af,az,bb);
var f=(o.i0>>0);
if(!(((f>>0)<(cw>>0)))){
var f=(o.i1>>0);
var H=(o.i2>>0);
o.i0=(cw>>0);
var h=((32-cw)>>0);
var H=((H>>>h)<<h);
o.i2=(H>>0);
var f=((f>>>h)<<h);
o.i1=(f>>0);
var a=cz;
var r=(a.a1);
var v=(a.a2.a0);
if((r.o<v.o)){
r.d[r.o>>0].i0=(cw>>0);
r.d[r.o>>0].i1=(f>>0);
r.d[r.o>>0].i2=(H>>0);
var r=(a.a1);
a.a1={d:r.d,o:r.o+1>>0};
}else{
bV(cz,o);
}
cx[cy>>0]=(1>>0);
return ;
}
var ae=aA;
ae.a0=nullArray;
ae.a1=nullObj;
ae.a2.a0=nullObj;
var R=V;
R.a0=nullObj;
R.a1=nullObj;
R.a2.a0=nullObj;
var X=ai;
X.a0=nullObj;
X.a1=nullObj;
X.a2.a0=nullObj;
aw(V,cA);
var a=(R.a1);
var M=(R.a0);
var F=1;
if(((((((((a.o)-(M.o))>>0)>>0)/(F>>0))>>0)>>0)===(0>>0))){
J(V);
}
M.d[M.o>>0].a2.i0=(f>>0);
M.d[M.o>>0].a2.i1=((o.i1>>0)>>0);
M.d[M.o>>0].a2.i2=((o.i2>>0)>>0);
var M=U;
M.a0=nullObj;
M.a1=nullObj;
M.a2.a0=nullObj;
var a_=T.a0;
var ba=I.a0;
var a9=ag;
var H=1;
L168:while(1){
var d=(X.a0);
var a=(X.a1);
L170:do{
if(!((a.d.length===d.d.length && a.d===d.d && a.o===d.o))){
while(1){
X.a1={d:a.d,o:a.o+-1>>0};
var z=a.d[(a.o>>0)+(-1>>0)>>0].a0;
var y=(z.a0);
if((y.length===1 && y===nullArray && 0===0)){
var a=aSlot={d:a.d,o:a.o+-1>>0};
}else{
var a=(z.a1);
if(!((a.d.length===y.length && a.d===y && a.o===0))){
var h=0;
while(1){
var h=((h>>0)+(-1>>0)>>0);
if((a.d[(a.o>>0)+(h>>0)>>0]===y[0>>0])){
break;
}else{
}
}
z.a1={d:y,o:0};
}
var a=(X.a1);
}
if((a.d.length===d.d.length && a.d===d.d && a.o===d.o)){
break L170;
}else{
}
}
}
}while(0);
var a=(ae.a0);
var d=(ae.a1);
if(!((d.d.length===a.length && d.d===a && d.o===0))){
var h=0;
while(1){
var h=((h>>0)+(-1>>0)>>0);
if((d.d[(d.o>>0)+(h>>0)>>0]===a[0>>0])){
break;
}else{
}
}
ae.a1={d:a,o:0};
}
L187:do{
if(((H>>0)>(0>>0))){
var h=0;
while(1){
var a=(R.a1);
var d=(R.a0);
if(!(((((((((a.o)-(d.o))>>0)>>0)/(F>>0))>>0)>>>0)>(h>>>0)))){
label=27;
break L168;
}
var a=(X.a1);
var z=(X.a2.a0);
if((a.d.length===z.d.length && a.d===z.d && a.o===z.o)){
aw(ai,d.d[(d.o>>0)+(h>>0)>>0]);
var a=(X.a1);
}else{
ed(a.d[a.o>>0].a0,d.d[(d.o>>0)+(h>>0)>>0].a0);
a.d[a.o>>0].i1=((d.d[(d.o>>0)+(h>>0)>>0].i1>>0)>>0);
a.d[a.o>>0].a2.i0=((d.d[(d.o>>0)+(h>>0)>>0].a2.i0>>0)>>0);
a.d[a.o>>0].a2.i1=((d.d[(d.o>>0)+(h>>0)>>0].a2.i1>>0)>>0);
a.d[a.o>>0].a2.i2=((d.d[(d.o>>0)+(h>>0)>>0].a2.i2>>0)>>0);
var a=(X.a1);
X.a1={d:a.d,o:a.o+1>>0};
var a=aSlot={d:a.d,o:a.o+1>>0};
}
var d=(X.a0);
if(!(((((((((a.o)-(d.o))>>0)>>0)/(F>>0))>>0)>>>0)>(h>>>0)))){
label=32;
break L168;
}
var a=d.d[(d.o>>0)+(h>>0)>>0].a0;
var z=(a.a1);
var y=(a.a0);
var m=1;
var m=((((((z.o)-(0))>>0)>>0)/(m>>0))>>0);
var D=((m>>0)+(-1>>0)>>0);
if(((m>>0)===(0>>0))){
label=34;
break L168;
}
var aa=(y[0>>0].d0);
var af=(y[(0>>0)+(D>>0)>>0].d0);
do{
if((aa!==af)){
label=37;
}else{
var af=(y[0>>0].d1);
var az=(y[(0>>0)+(D>>0)>>0].d1);
if((af!==az)){
label=37;
break;
}else{
break;
}
}
}while(0);
do{
if(label===37){
label=0;
var cs=(a.a2.a0);
if((z.d.length===cs.d.length && z.d===cs.d && z.o===cs.o)){
Qa(d.d[(d.o>>0)+(h>>0)>>0].a0,y[0>>0]);
break;
}else{
z.d[z.o>>0].d0=aa;
z.d[z.o>>0].d1=(y[0>>0].d1);
var d=(a.a1);
a.a1={d:d.d,o:d.o+1>>0};
break;
}
}
}while(0);
var a=(X.a1);
var d=(X.a0);
if(!(((((((((a.o)-(d.o))>>0)>>0)/(F>>0))>>0)>>>0)>(h>>>0)))){
label=41;
break L168;
}
var a=(ae.a1);
var z=(ae.a2.a0);
if((a.d.length===z.d.length && a.d===z.d && a.o===z.o)){
aZ(aA,d.d[(d.o>>0)+(h>>0)>>0].a2);
}else{
a.d[a.o>>0].i0=((d.d[(d.o>>0)+(h>>0)>>0].a2.i0>>0)>>0);
a.d[a.o>>0].i1=((d.d[(d.o>>0)+(h>>0)>>0].a2.i1>>0)>>0);
a.d[a.o>>0].i2=((d.d[(d.o>>0)+(h>>0)>>0].a2.i2>>0)>>0);
var a=(ae.a1);
ae.a1={d:a.d,o:a.o+1>>0};
}
var h=((h>>0)+(1>>0)>>0);
if(((h>>0)<(H>>0))){
}else{
break L187;
}
}
}
}while(0);
var d=(R.a0);
var a=(R.a1);
L211:do{
if(!((a.d.length===d.d.length && a.d===d.d && a.o===d.o))){
while(1){
R.a1={d:a.d,o:a.o+-1>>0};
var z=a.d[(a.o>>0)+(-1>>0)>>0].a0;
var y=(z.a0);
if((y.length===1 && y===nullArray && 0===0)){
var a=aSlot={d:a.d,o:a.o+-1>>0};
}else{
var a=(z.a1);
if(!((a.d.length===y.length && a.d===y && a.o===0))){
var h=0;
while(1){
var h=((h>>0)+(-1>>0)>>0);
if((a.d[(a.o>>0)+(h>>0)>>0]===y[0>>0])){
break;
}else{
}
}
z.a1={d:y,o:0};
}
var a=(R.a1);
}
if((a.d.length===d.d.length && a.d===d.d && a.o===d.o)){
break L211;
}else{
}
}
}
}while(0);
L223:do{
if(((H>>0)>(0>>0))){
var cv=1;
var aL=((f>>0)+(1>>0)>>0);
var h=0;
var f=0;
while(1){
var a=(ae.a1);
var d=(ae.a0);
if(!(((((((((a.o)-(0))>>0)>>0)/(cv>>0))>>0)>>>0)>(f>>>0)))){
label=57;
break L168;
}
var m=(d[(0>>0)+(f>>0)>>0].i0>>0);
var D=(d[(0>>0)+(f>>0)>>0].i1>>0);
var a8=(d[(0>>0)+(f>>0)>>0].i2>>0);
var ak=((31-m)>>0);
o.i0=(((m>>0)+(1>>0)>>0)>>0);
o.i1=(((((D>>>ak)>>0)+(1>>0)>>0)<<ak)>>0);
o.i2=(((((a8>>>ak)>>0)+(1>>0)>>0)<<ak)>>0);
d5(v,o);
var aa=(v.d2);
var af=(v.d1);
var d=(M.a0);
var a=(M.a1);
L229:do{
if(!((a.d.length===d.d.length && a.d===d.d && a.o===d.o))){
while(1){
M.a1={d:a.d,o:a.o+-1>>0};
var z=a.d[(a.o>>0)+(-1>>0)>>0].a0;
var y=(z.a0);
if((y.length===1 && y===nullArray && 0===0)){
var a=aSlot={d:a.d,o:a.o+-1>>0};
}else{
var a=(z.a1);
if(!((a.d.length===y.length && a.d===y && a.o===0))){
var m=0;
while(1){
var m=((m>>0)+(-1>>0)>>0);
if((a.d[(a.o>>0)+(m>>0)>>0]===y[0>>0])){
break;
}else{
}
}
z.a1={d:y,o:0};
}
var a=(M.a1);
}
if((a.d.length===d.d.length && a.d===d.d && a.o===d.o)){
break L229;
}else{
}
}
}
}while(0);
var a=(X.a1);
var d=(X.a0);
if(!(((((((((a.o)-(d.o))>>0)>>0)/(F>>0))>>0)>>>0)>(f>>>0)))){
label=66;
break L168;
}
ed(T.a0,d.d[(d.o>>0)+(f>>0)>>0].a0);
T.i1=((d.d[(d.o>>0)+(f>>0)>>0].i1>>0)>>0);
T.a2.i0=((d.d[(d.o>>0)+(f>>0)>>0].a2.i0>>0)>>0);
T.a2.i1=((d.d[(d.o>>0)+(f>>0)>>0].a2.i1>>0)>>0);
T.a2.i2=((d.d[(d.o>>0)+(f>>0)>>0].a2.i2>>0)>>0);
b8(T,aa,af,U);
var a=(a_.a0);
do{
if((a.length===1 && a===nullArray && 0===0)){
var m=0;
}else{
var d=(a_.a1);
if(!((d.d.length===a.length && d.d===a && d.o===0))){
var m=0;
while(1){
var m=((m>>0)+(-1>>0)>>0);
if((d.d[(d.o>>0)+(m>>0)>>0]===a[0>>0])){
break;
}else{
}
}
a_.a1={d:a,o:0};
}
var m=0;
break;
}
}while(0);
while(1){
var a=(M.a1);
var d=(M.a0);
if(!(((((((((a.o)-(d.o))>>0)>>0)/(F>>0))>>0)>>>0)>(m>>>0)))){
label=73;
break L168;
}
var a=d.d[(d.o>>0)+(m>>0)>>0].a0;
var z=(a.a1);
var a=(a.a0);
var D=1;
do{
if(((((((((z.o)-(0))>>0)>>0)/(D>>0))>>0)>>0)===(0>>0))){
}else{
ed(I.a0,d.d[(d.o>>0)+(m>>0)>>0].a0);
I.i1=((d.d[(d.o>>0)+(m>>0)>>0].i1>>0)>>0);
I.a2.i0=((d.d[(d.o>>0)+(m>>0)>>0].a2.i0>>0)>>0);
I.a2.i1=((d.d[(d.o>>0)+(m>>0)>>0].a2.i1>>0)>>0);
I.a2.i2=((d.d[(d.o>>0)+(m>>0)>>0].a2.i2>>0)>>0);
var a8=b9(I,aa,af);
var a=(ba.a0);
if(!((a.length===1 && a===nullArray && 0===0))){
var d=(ba.a1);
if(!((d.d.length===a.length && d.d===a && d.o===0))){
var D=0;
while(1){
var D=((D>>0)+(-1>>0)>>0);
if((d.d[(d.o>>0)+(D>>0)>>0]===a[0>>0])){
break;
}else{
}
}
ba.a1={d:a,o:0};
}
}
if((a8>>0)){
break;
}
r[0>>0]=0;
r[1>>0]=0;
r[2>>0]=0;
r[3>>0]=0;
var a=(M.a1);
var d=(M.a0);
if(!(((((((((a.o)-(d.o))>>0)>>0)/(F>>0))>>0)>>>0)>(m>>>0)))){
label=82;
break L168;
}
ed(ag,d.d[(d.o>>0)+(m>>0)>>0].a0);
a3(ag,r,0,r,1,r,2,r,3);
var a=(a9.a0);
if(!((a.length===1 && a===nullArray && 0===0))){
var d=(a9.a1);
if(!((d.d.length===a.length && d.d===a && d.o===0))){
var D=0;
while(1){
var D=((D>>0)+(-1>>0)>>0);
if((d.d[(d.o>>0)+(D>>0)>>0]===a[0>>0])){
break;
}else{
}
}
a9.a1={d:a,o:0};
}
}
var a=(M.a1);
var d=(M.a0);
if(!(((((((((a.o)-(d.o))>>0)>>0)/(F>>0))>>0)>>>0)>(m>>>0)))){
label=89;
break L168;
}
var az=(r[0>>0]);
var bb=(r[2>>0]);
var ct=(r[1>>0]);
var cu=(r[3>>0]);
v.i0=(aL>>0);
v.d1=((az+bb)*0.5);
v.d2=((ct+cu)*0.5);
ay(at,v);
d.d[(d.o>>0)+(m>>0)>>0].a2.i0=((at.i0>>0)>>0);
d.d[(d.o>>0)+(m>>0)>>0].a2.i1=((at.i1>>0)>>0);
d.d[(d.o>>0)+(m>>0)>>0].a2.i2=((at.i2>>0)>>0);
var a=(M.a1);
var d=(M.a0);
if(!(((((((((a.o)-(d.o))>>0)>>0)/(F>>0))>>0)>>>0)>(m>>>0)))){
label=91;
break L168;
}
var a=(R.a1);
var z=(R.a2.a0);
if((a.d.length===z.d.length && a.d===z.d && a.o===z.o)){
aw(V,d.d[(d.o>>0)+(m>>0)>>0]);
var a=(R.a1);
}else{
ed(a.d[a.o>>0].a0,d.d[(d.o>>0)+(m>>0)>>0].a0);
a.d[a.o>>0].i1=((d.d[(d.o>>0)+(m>>0)>>0].i1>>0)>>0);
a.d[a.o>>0].a2.i0=((d.d[(d.o>>0)+(m>>0)>>0].a2.i0>>0)>>0);
a.d[a.o>>0].a2.i1=((d.d[(d.o>>0)+(m>>0)>>0].a2.i1>>0)>>0);
a.d[a.o>>0].a2.i2=((d.d[(d.o>>0)+(m>>0)>>0].a2.i2>>0)>>0);
var a=(R.a1);
R.a1={d:a.d,o:a.o+1>>0};
var a=aSlot={d:a.d,o:a.o+1>>0};
}
var d=(R.a0);
if(!(((((((((a.o)-(d.o))>>0)>>0)/(F>>0))>>0)>>>0)>(h>>>0)))){
label=96;
break L168;
}
var a=(M.a1);
var z=(M.a0);
if(!(((((((((a.o)-(z.o))>>0)>>0)/(F>>0))>>0)>>>0)>(m>>>0)))){
label=98;
break L168;
}
d.d[(d.o>>0)+(h>>0)>>0].a2.i0=((z.d[(z.o>>0)+(m>>0)>>0].a2.i0>>0)>>0);
d.d[(d.o>>0)+(h>>0)>>0].a2.i1=((z.d[(z.o>>0)+(m>>0)>>0].a2.i1>>0)>>0);
d.d[(d.o>>0)+(h>>0)>>0].a2.i2=((z.d[(z.o>>0)+(m>>0)>>0].a2.i2>>0)>>0);
var h=((h>>0)+(1>>0)>>0);
}
}while(0);
var m=((m>>0)+(1>>0)>>0);
if(((m>>0)<(4>>0))){
}else{
break;
}
}
var f=((f>>0)+(1>>0)>>0);
if(((f>>0)<(H>>0))){
}else{
var H=h;
var f=aL;
break L223;
}
}
}else{
var f=((f>>0)+(1>>0)>>0);
var H=0;
}
}while(0);
if(((f>>0)<(cw>>0))){
}else{
label=13;
break;
}
}
if(label===13){
L285:do{
if(((H>>0)>(0>>0))){
var a=cz;
var f=0;
while(1){
var r=(R.a1);
var v=(R.a0);
if(!(((((((((r.o)-(v.o))>>0)>>0)/(F>>0))>>0)>>>0)>(f>>>0)))){
break;
}
var r=(a.a1);
var o=(a.a2.a0);
if((r.d.length===o.d.length && r.d===o.d && r.o===o.o)){
aZ(cz,v.d[(v.o>>0)+(f>>0)>>0].a2);
}else{
r.d[r.o>>0].i0=((v.d[(v.o>>0)+(f>>0)>>0].a2.i0>>0)>>0);
r.d[r.o>>0].i1=((v.d[(v.o>>0)+(f>>0)>>0].a2.i1>>0)>>0);
r.d[r.o>>0].i2=((v.d[(v.o>>0)+(f>>0)>>0].a2.i2>>0)>>0);
var r=(a.a1);
a.a1={d:r.d,o:r.o+1>>0};
}
var f=((f>>0)+(1>>0)>>0);
if(((f>>0)<(H>>0))){
}else{
break L285;
}
}
J(V);
}
}while(0);
cx[cy>>0]=(H>>0);
var r=(M.a0);
do{
if(!((r.d.length===1 && r.d===nullArray && r.o===0))){
var a=(M.a1);
if(!((a.d.length===r.d.length && a.d===r.d && a.o===r.o))){
while(1){
M.a1={d:a.d,o:a.o+-1>>0};
var v=a.d[(a.o>>0)+(-1>>0)>>0].a0;
var o=(v.a0);
if((o.length===1 && o===nullArray && 0===0)){
var a=aSlot={d:a.d,o:a.o+-1>>0};
}else{
var a=(v.a1);
if(!((a.d.length===o.length && a.d===o && a.o===0))){
var f=0;
while(1){
var f=((f>>0)+(-1>>0)>>0);
if((a.d[(a.o>>0)+(f>>0)>>0]===o[0>>0])){
break;
}else{
}
}
v.a1={d:o,o:0};
}
var a=(M.a1);
}
if((a.d.length===r.d.length && a.d===r.d && a.o===r.o)){
break;
}else{
}
}
var a=(M.a0);
if((a.d.length===1 && a.d===nullArray && a.o===0)){
break;
}
}
}
}while(0);
var r=(X.a0);
do{
if(!((r.d.length===1 && r.d===nullArray && r.o===0))){
var a=(X.a1);
if(!((a.d.length===r.d.length && a.d===r.d && a.o===r.o))){
while(1){
X.a1={d:a.d,o:a.o+-1>>0};
var v=a.d[(a.o>>0)+(-1>>0)>>0].a0;
var o=(v.a0);
if((o.length===1 && o===nullArray && 0===0)){
var a=aSlot={d:a.d,o:a.o+-1>>0};
}else{
var a=(v.a1);
if(!((a.d.length===o.length && a.d===o && a.o===0))){
var f=0;
while(1){
var f=((f>>0)+(-1>>0)>>0);
if((a.d[(a.o>>0)+(f>>0)>>0]===o[0>>0])){
break;
}else{
}
}
v.a1={d:o,o:0};
}
var a=(X.a1);
}
if((a.d.length===r.d.length && a.d===r.d && a.o===r.o)){
break;
}else{
}
}
var a=(X.a0);
if((a.d.length===1 && a.d===nullArray && a.o===0)){
break;
}
}
}
}while(0);
var r=(R.a0);
do{
if(!((r.d.length===1 && r.d===nullArray && r.o===0))){
var a=(R.a1);
if(!((a.d.length===r.d.length && a.d===r.d && a.o===r.o))){
while(1){
R.a1={d:a.d,o:a.o+-1>>0};
var v=a.d[(a.o>>0)+(-1>>0)>>0].a0;
var o=(v.a0);
if((o.length===1 && o===nullArray && 0===0)){
var a=aSlot={d:a.d,o:a.o+-1>>0};
}else{
var a=(v.a1);
if(!((a.d.length===o.length && a.d===o && a.o===0))){
var f=0;
while(1){
var f=((f>>0)+(-1>>0)>>0);
if((a.d[(a.o>>0)+(f>>0)>>0]===o[0>>0])){
break;
}else{
}
}
v.a1={d:o,o:0};
}
var a=(R.a1);
}
if((a.d.length===r.d.length && a.d===r.d && a.o===r.o)){
break;
}else{
}
}
var a=(R.a0);
if((a.d.length===1 && a.d===nullArray && a.o===0)){
break;
}
}
}
}while(0);
var a=(ae.a0);
if((a.length===1 && a===nullArray && 0===0)){
return ;
}
var r=(ae.a1);
if(!((r.d.length===a.length && r.d===a && r.o===0))){
var f=0;
while(1){
var f=((f>>0)+(-1>>0)>>0);
if((r.d[(r.o>>0)+(f>>0)>>0]===a[0>>0])){
break;
}else{
}
}
ae.a1={d:a,o:0};
}
return ;
}
else if(label===27){
J(V);
}
else if(label===32){
J(ai);
}
else if(label===34){
J(d.d[(d.o>>0)+(h>>0)>>0].a0);
}
else if(label===41){
J(ai);
}
else if(label===57){
J(aA);
}
else if(label===66){
J(ai);
}
else if(label===73){
J(U);
}
else if(label===82){
J(U);
}
else if(label===89){
J(U);
}
else if(label===91){
J(U);
}
else if(label===96){
J(V);
}
else if(label===98){
J(U);
}
}
function ed(f,d){
var label=0;
var r=f;
r.a0=nullArray;
r.a1=nullObj;
r.a2.a0=nullObj;
var o=d;
var h=(o.a1);
var m=(o.a0);
var a=1;
var a=((((((h.o)-(0))>>0)>>0)/(a>>0))>>0);
if(((a>>0)===(0>>0))){
return ;
}
if(((a>>>0)>(268435455>>>0))){
aj(f);
}
var h=createArray_struct$p_Z6CPoint([],0,(a<<4)/16);
r.a1={d:h,o:0};
r.a0=h;
r.a2.a0={d:h,o:0+a>>0};
var m=(o.a0);
var o=(o.a1);
if((m.length===o.d.length && m===o.d && 0===o.o)){
return ;
}else{
var a=0;
var h=h[0>>0];
}
while(1){
h.d0=(m[(0>>0)+(a>>0)>>0].d0);
h.d1=(m[(0>>0)+(a>>0)>>0].d1);
var h=(r.a1);
r.a1={d:h.d,o:h.o+1>>0};
var a=((a>>0)+(1>>0)>>0);
if((m[(0>>0)+(a>>0)>>0]===o.d[o.o>>0])){
break;
}else{
var h=h.d[(h.o>>0)+(1>>0)>>0];
}
}
return ;
}
function dZ(oo,ll,ff,FF){
var label=0;
var f=aSlot={a0:nullArray,a1:nullObj,a2:{a0:nullObj}};
var m=aSlot={a0:nullArray,a1:nullObj,a2:{a0:nullObj}};
var a=aSlot={d0:0,d1:0};
var h=aSlot={d0:0,d1:0};
var D=aSlot={d0:0,d1:0};
var z=aSlot={d0:0,d1:0};
var r=aSlot={a0:{a0:nullArray,a1:nullObj,a2:r={a0:nullObj}},i1:0,a2:r={i0:0,i1:0,i2:0}};
var F=aSlot=[0];
var o=aSlot={a0:{a0:nullArray,a1:nullObj,a2:o={a0:nullObj}},i1:0,a2:o={i0:0,i1:0,i2:0}};
//e2(a7,cm,0,7>>0);
var v=f;
v.a0=nullArray;
v.a1=nullObj;
v.a2.a0=nullObj;
var y=m;
y.a0=nullArray;
y.a1=nullObj;
y.a2.a0=nullObj;
a.d1=119.40000000000001;
a.d0=39.200000000000003;
h.d1=119.90000000000001;
h.d0=39.299999999999997;
D.d1=119.8;
D.d0=38.5;
z.d1=119.2;
z.d0=38.399999999999999;
Qa(m,a);
var a=(y.a1);
var H=(y.a2.a0);
if((a.d.length===H.d.length && a.d===H.d && a.o===H.o)){
Qa(m,h);
var a=(y.a1);
var a=a.d[a.o>>0];
}else{
a.d[a.o>>0].d0=39.299999999999997;
a.d[a.o>>0].d1=119.90000000000001;
var a=(y.a1);
y.a1={d:a.d,o:a.o+1>>0};
var a=a.d[(a.o>>0)+(1>>0)>>0];
}
var h=(y.a2.a0);
if((a===h.d[h.o>>0])){
Qa(m,D);
var a=(y.a1);
var a=a.d[a.o>>0];
}else{
a.d0=38.5;
a.d1=119.8;
var a=(y.a1);
y.a1={d:a.d,o:a.o+1>>0};
var a=a.d[(a.o>>0)+(1>>0)>>0];
}
var h=(y.a2.a0);
if((a===h.d[h.o>>0])){
Qa(m,z);
var a=(y.a1);
}else{
a.d0=38.399999999999999;
a.d1=119.2;
var a=(y.a1);
y.a1={d:a.d,o:a.o+1>>0};
var a=aSlot={d:a.d,o:a.o+1>>0};
}
var m=r.a0;
m.a0=nullArray;
m.a1=nullObj;
m.a2.a0=nullObj;
var h=(y.a0);
dX(r.a0,h,0,a.d,a.o);
r.i1=(4>>0);
r.a2.i0=(0>>0);
r.a2.i1=(0>>0);
r.a2.i2=(0>>0);
F[0>>0]=(4>>0);
ed(o.a0,r.a0);
o.i1=((r.i1>>0)>>0);
o.a2.i0=((r.a2.i0>>0)>>0);
o.a2.i1=((r.a2.i1>>0)>>0);
o.a2.i2=((r.a2.i2>>0)>>0);
b7(o,9>>0,f,F,0);
var a=o.a0;
var f=(a.a0);
if(!((f.length===1 && f===nullArray && 0===0))){
var h=(a.a1);
if(!((h.d.length===f.length && h.d===f && h.o===0))){
var d=0;
while(1){
var d=((d>>0)+(-1>>0)>>0);
if((h.d[(h.o>>0)+(d>>0)>>0]===f[0>>0])){
break;
}else{
}
}
a.a1={d:f,o:0};
}
}
//e2(a7,cl,0,8>>0);
var a=(m.a0);
if(!((a.length===1 && a===nullArray && 0===0))){
var f=(m.a1);
if(!((f.d.length===a.length && f.d===a && f.o===0))){
var d=0;
while(1){
var d=((d>>0)+(-1>>0)>>0);
if((f.d[(f.o>>0)+(d>>0)>>0]===a[0>>0])){
break;
}else{
}
}
m.a1={d:a,o:0};
}
}
var a=(y.a0);
if(!((a.length===1 && a===nullArray && 0===0))){
var f=(y.a1);
if(!((f.d.length===a.length && f.d===a && f.o===0))){
var d=0;
while(1){
var d=((d>>0)+(-1>>0)>>0);
if((f.d[(f.o>>0)+(d>>0)>>0]===a[0>>0])){
break;
}else{
}
}
y.a1={d:a,o:0};
}
}
var a=(v.a0);
if((a.length===1 && a===nullArray && 0===0)){
return ;
}
var f=(v.a1);
if(!((f.d.length===a.length && f.d===a && f.o===0))){
var d=0;
while(1){
var d=((d>>0)+(-1>>0)>>0);
if((f.d[(f.o>>0)+(d>>0)>>0]===a[0>>0])){
break;
}else{
}
}
v.a1={d:a,o:0};
}
return ;
}
function dX(y,z,A,v,w){
var label=0;
var h=(A);
var m=1;
var o=((((((w)-h)>>0)>>0)/(m>>0))>>0);
var r=y;
var d=(r.a2.a0);
var f=(r.a0);
var a=(0);
if(((o>>>0)>(((((((d.o)-a)>>0)>>0)/(m>>0))>>0)>>>0))){
if((f.length===1 && f===nullArray && 0===0)){
}else{
var d=(r.a1);
if(!((d.d.length===f.length && d.d===f && d.o===0))){
var a=0;
while(1){
var a=((a>>0)+(-1>>0)>>0);
if((d.d[(d.o>>0)+(a>>0)>>0]===f[0>>0])){
break;
}else{
}
}
r.a1={d:f,o:0};
}
r.a2.a0=nullObj;
r.a1=nullObj;
r.a0=nullArray;
var d=aSlot=nullObj;
}
if(((o>>>0)>(268435455>>>0))){
aj(y);
}
var a=((((d.o)>>0)/(m>>0))>>0);
do{
if(((a>>>0)<(134217727>>>0))){
var a=(a<<1);
var a=(((a>>>0)<(o>>>0))?o:a);
if(!(((a>>>0)>(268435455>>>0)))){
break;
}
aj(y);
}else{
var a=268435455;
}
}while(0);
var d=createArray_struct$p_Z6CPoint([],0,(a<<4)/16);
r.a1={d:d,o:0};
r.a0=d;
r.a2.a0={d:d,o:0+a>>0};
if((z.length===v.length && z===v && A===w)){
return ;
}else{
var a=0;
var d=d[0>>0];
}
while(1){
d.d0=(z[(A>>0)+(a>>0)>>0].d0);
d.d1=(z[(A>>0)+(a>>0)>>0].d1);
var d=(r.a1);
r.a1={d:d.d,o:d.o+1>>0};
var a=((a>>0)+(1>>0)>>0);
if((z[(A>>0)+(a>>0)>>0]===v[w>>0])){
break;
}else{
var d=d.d[(d.o>>0)+(1>>0)>>0];
}
}
return ;
}
var d=(r.a1);
var a=((((((d.o)-a)>>0)>>0)/(m>>0))>>0);
if(((o>>>0)>(a>>>0))){
var d=aSlot={d:z,o:A+a>>0};
var a=0;
}else{
var a=1;
var d=aSlot={d:v,o:w};
}
var o=((((((d.o)-h)>>0)>>0)/(m>>0))>>0);
var h=(o&268435455);
L60:do{
if(!(((h>>0)===(0>>0)))){
if((0>A)){
while(1){
var h=((h>>0)+(-1>>0)>>0);
f[(0>>0)+(h>>0)>>0].d0=(z[(A>>0)+(h>>0)>>0].d0);
f[(0>>0)+(h>>0)>>0].d1=(z[(A>>0)+(h>>0)>>0].d1);
if(((h>>0)===(0>>0))){
break L60;
}else{
}
}
}else{
var m=0;
while(1){
f[(0>>0)+(m>>0)>>0].d0=(z[(A>>0)+(m>>0)>>0].d0);
f[(0>>0)+(m>>0)>>0].d1=(z[(A>>0)+(m>>0)>>0].d1);
var m=((m>>0)+(1>>0)>>0);
if(((h>>0)===(m>>0))){
break L60;
}else{
}
}
}
}
}while(0);
if((a>>0)){
var d=(r.a1);
if((d.d.length===f.length && d.d===f && d.o===0+o)){
return ;
}else{
var a=0;
}
while(1){
var a=((a>>0)+(-1>>0)>>0);
if((d.d[(d.o>>0)+(a>>0)>>0]===f[(0>>0)+(o>>0)>>0])){
break;
}else{
}
}
r.a1={d:f,o:0+o>>0};
return ;
}else{
if((d.d.length===v.length && d.d===v && d.o===w)){
return ;
}
var f=(r.a1);
var Z=d;
var d=f.d[f.o>>0];
var f=aSlot=Z;
while(1){
d.d0=(f.d[f.o>>0].d0);
d.d1=(f.d[f.o>>0].d1);
var d=(r.a1);
r.a1={d:d.d,o:d.o+1>>0};
if((f.d.length===v.length && f.d===v && f.o+1===w)){
break;
}else{
var f=aSlot={d:f.d,o:f.o+1>>0};
var d=d.d[(d.o>>0)+(1>>0)>>0];
}
}
return ;
}
}
function aj(a){
eT(ck,0,307>>0,cp,0,cq,0);
}
function e2(H,F,G,D){
var label=0;
var a=aSlot={a0:null};
var m=aSlot={a0:null};
var A=aSlot={a0:null};
var d=H;
var f=(d.i4>>0);
do{
if(((f>>0)===(0>>0))){
var y=H;
var h=(y.a18);
if(!((h===null))){
a1(h);
}
var h=(d.a6);
var h=h.d[h.o>>0];
m.a0=h;
var f=(d.i1>>0);
if((((f&176)>>0)===(32>>0))){
var f=D;
}else{
var f=0;
}
var w=(y.i19>>0);
var o=(w&255);
if(((w>>0)===(-1>>0))){
b4(a,d);
var h=b1(a,cj);
var h=h;
var r=(h.a0);
var r=(r.d[(r.o>>0)+(9>>0)>>0]);
var o=r(h,32>>0);
b2(a);
y.i19=(((o<<24)>>24)>>0);
}else{
}
d3(A,m,F,G,F,G+f,F,G+D,d,o>>0);
var a=(A.a0);
if(!((a===null))){
break;
}
var f=(d.i4>>0);
ax(d,(f|5)>>0);
}
}while(0);
var a=(d.a6);
if((a.d.length===1 && a.d===nullArray && a.o===0)){
return H;
}
var f=(d.i4>>0);
if(!(((f>>0)===(0>>0)))){
return H;
}
var f=(d.i1>>0);
if((((f&8192)>>0)===(0>>0))){
return H;
}
var a=a.d[a.o>>0];
var m=(a.a0);
var m=(m.d[(m.o>>0)+(8>>0)>>0]);
var f=m(a);
if(!(((f>>0)===(-1>>0)))){
return H;
}
var f=(d.i4>>0);
ax(d,(f|1)>>0);
return H;
}
function d3(H,G,A,B,D,E,M,N,I,y){
var label=0;
var f=(G.a0);
if((f===null)){
H.a0=null;
return ;
}
var o=(N);
var a=(B);
var d=((o-a)>>0);
var m=(I.i3>>0);
var d=(((m>>0)>(d>>0))?((m-d)>>0):0);
var m=(E);
var a=((m-a)>>0);
do{
if(((a>>0)>(0>>0))){
var h=(f.a0);
var h=(h.d[(h.o>>0)+(14>>0)>>0]);
var w=h(f,A,B,a>>0);
if(((w>>0)===(a>>0))){
break;
}
G.a0=null;
H.a0=null;
return ;
}
}while(0);
do{
if(((d>>0)>(0>>0))){
if(((d>>>0)<(11>>>0))){
var a=11;
}else{
var a=(((d>>0)+(16>>0)>>0)&-16);
}
var h=new Uint8Array(a/1);
L38:do{
if(!(((d>>0)===(0>>0)))){
var a=0;
while(1){
h[(0>>0)+(a>>0)>>0]=y;
var a=((a>>0)+(1>>0)>>0);
if(((a>>0)===(d>>0))){
break L38;
}else{
}
}
}
}while(0);
h[(0>>0)+(d>>0)>>0]=0;
var r=(f.a0);
var r=(r.d[(r.o>>0)+(14>>0)>>0]);
var a=r(f,h,0,d>>0);
if(((a>>0)===(d>>0))){
break;
}
G.a0=null;
H.a0=null;
return ;
}
}while(0);
var a=((o-m)>>0);
do{
if(((a>>0)>(0>>0))){
var h=(f.a0);
var h=(h.d[(h.o>>0)+(14>>0)>>0]);
var o=h(f,D,E,a>>0);
if(((o>>0)===(a>>0))){
break;
}
G.a0=null;
H.a0=null;
return ;
}
}while(0);
I.i3=(0>>0);
H.a0=f;
return ;
}
function a1(m){
var label=0;
var h=m;
var a=(h.a6);
if((a.d.length===1 && a.d===nullArray && a.o===0)){
return m;
}
var d=(h.i4>>0);
do{
if(((d>>0)===(0>>0))){
var f=(m.a18);
if((f===null)){
}else{
a1(f);
var a=(h.a6);
}
var a=a.d[a.o>>0];
var f=(a.a0);
var f=(f.d[(f.o>>0)+(8>>0)>>0]);
var d=f(a);
if(!(((d>>0)===(-1>>0)))){
break;
}
var d=(h.i4>>0);
ax(h,(d|1)>>0);
}
}while(0);
var a=(h.a6);
if((a.d.length===1 && a.d===nullArray && a.o===0)){
return m;
}
var d=(h.i4>>0);
if(!(((d>>0)===(0>>0)))){
return m;
}
var d=(h.i1>>0);
if((((d&8192)>>0)===(0>>0))){
return m;
}
var a=a.d[a.o>>0];
var f=(a.a0);
var f=(f.d[(f.o>>0)+(8>>0)>>0]);
var d=f(a);
if(!(((d>>0)===(-1>>0)))){
return m;
}
var d=(h.i4>>0);
ax(h,(d|1)>>0);
return m;
}
function J(a){
eT(ck,0,318>>0,co,0,ci,0);
}
function aZ(w,y){
var label=0;
var r=w;
var d=(r.a1);
var m=(r.a0);
var f=(0);
var a=1;
var h=((((((d.o)-f)>>0)>>0)/(a>>0))>>0);
var o=((h>>0)+(1>>0)>>0);
if(((o>>>0)>(357913941>>>0))){
aj(w);
}
var d=(r.a2.a0);
var f=((((((d.o)-f)>>0)>>0)/(a>>0))>>0);
if(((f>>>0)<(178956970>>>0))){
var f=(f<<1);
var f=(((f>>>0)<(o>>>0))?o:f);
}else{
var f=357913941;
}
var d=createArray_struct$p_Z12CBinary2Code([],0,(mathimul(f,12)>>0)/12);
d[(0>>0)+(h>>0)>>0].i0=((y.i0>>0)>>0);
d[(0>>0)+(h>>0)>>0].i1=((y.i1>>0)>>0);
d[(0>>0)+(h>>0)>>0].i2=((y.i2>>0)>>0);
var a=(mathimul(h,12)>>0);
var h=(((a>>>0)/(12>>>0))>>0);
L18:do{
if(!(((a>>>0)<(12>>>0)))){
var a=0;
while(1){
d[(0>>0)+(a>>0)>>0].i0=((m[(0>>0)+(a>>0)>>0].i0>>0)>>0);
d[(0>>0)+(a>>0)>>0].i1=((m[(0>>0)+(a>>0)>>0].i1>>0)>>0);
d[(0>>0)+(a>>0)>>0].i2=((m[(0>>0)+(a>>0)>>0].i2>>0)>>0);
var a=((a>>0)+(1>>0)>>0);
if(((h>>0)===(a>>0))){
break L18;
}else{
}
}
}
}while(0);
r.a0=d;
r.a1={d:d,o:0+o>>0};
r.a2.a0={d:d,o:0+f>>0};
if((m.length===1 && m===nullArray && 0===0)){
return ;
}
return ;
}
function bV(w,y){
var label=0;
var r=w;
var d=(r.a1);
var m=(r.a0);
var f=(0);
var a=1;
var h=((((((d.o)-f)>>0)>>0)/(a>>0))>>0);
var o=((h>>0)+(1>>0)>>0);
if(((o>>>0)>(357913941>>>0))){
aj(w);
}
var d=(r.a2.a0);
var f=((((((d.o)-f)>>0)>>0)/(a>>0))>>0);
if(((f>>>0)<(178956970>>>0))){
var f=(f<<1);
var f=(((f>>>0)<(o>>>0))?o:f);
}else{
var f=357913941;
}
var d=createArray_struct$p_Z12CBinary2Code([],0,(mathimul(f,12)>>0)/12);
d[(0>>0)+(h>>0)>>0].i0=((y.i0>>0)>>0);
d[(0>>0)+(h>>0)>>0].i1=((y.i1>>0)>>0);
d[(0>>0)+(h>>0)>>0].i2=((y.i2>>0)>>0);
var a=(mathimul(h,12)>>0);
var h=(((a>>>0)/(12>>>0))>>0);
L18:do{
if(!(((a>>>0)<(12>>>0)))){
var a=0;
while(1){
d[(0>>0)+(a>>0)>>0].i0=((m[(0>>0)+(a>>0)>>0].i0>>0)>>0);
d[(0>>0)+(a>>0)>>0].i1=((m[(0>>0)+(a>>0)>>0].i1>>0)>>0);
d[(0>>0)+(a>>0)>>0].i2=((m[(0>>0)+(a>>0)>>0].i2>>0)>>0);
var a=((a>>0)+(1>>0)>>0);
if(((h>>0)===(a>>0))){
break L18;
}else{
}
}
}
}while(0);
r.a0=d;
r.a1={d:d,o:0+o>>0};
r.a2.a0={d:d,o:0+f>>0};
if((m.length===1 && m===nullArray && 0===0)){
return ;
}
return ;
}
function aw(w,y){
var label=0;
var o=aSlot={a0:null,a1:nullObj,a2:nullObj,a3:{a0:nullObj,a1:null}};
var a=w;
var h=(a.a1);
var G=(a.a0);
var d=(G.o);
var m=1;
var f=((((((h.o)-d)>>0)>>0)/(m>>0))>>0);
var B=((f>>0)+(1>>0)>>0);
if(((B>>>0)>(153391689>>>0))){
aj(w);
}
var h=(a.a2.a0);
var d=((((((h.o)-d)>>0)>>0)/(m>>0))>>0);
if(((d>>>0)<(76695844>>>0))){
var d=(d<<1);
var d=(((d>>>0)<(B>>>0))?B:d);
}else{
var d=153391689;
}
var h=o.a3;
h.a0=nullObj;
h.a1=a.a2;
if(((d>>0)===(0>>0))){
var a=nullArray;
}else{
var a=createArray_struct$p_Z5CArea([],0,(mathimul(d,28)>>0)/28);
}
o.a0=a[0>>0];
o.a1={d:a,o:0+f>>0};
h.a0={d:a,o:0+d>>0};
ed(a[(0>>0)+(f>>0)>>0].a0,y.a0);
a[(0>>0)+(f>>0)>>0].i1=((y.i1>>0)>>0);
a[(0>>0)+(f>>0)>>0].a2.i0=((y.a2.i0>>0)>>0);
a[(0>>0)+(f>>0)>>0].a2.i1=((y.a2.i1>>0)>>0);
a[(0>>0)+(f>>0)>>0].a2.i2=((y.a2.i2>>0)>>0);
o.a2={d:a,o:0+((f>>0)+(1>>0)>>0)>>0};
dY(w,o);
var a=(o.a1);
var h=(o.a2);
if(!((h.d.length===a.d.length && h.d===a.d && h.o===a.o))){
var d=0;
while(1){
var d=((d>>0)+(-1>>0)>>0);
var G=h.d[(h.o>>0)+(d>>0)>>0].a0;
var r=(G.a0);
if(!((r.length===1 && r===nullArray && 0===0))){
var E=(G.a1);
if(!((E.d.length===r.length && E.d===r && E.o===0))){
var m=0;
while(1){
var m=((m>>0)+(-1>>0)>>0);
if((E.d[(E.o>>0)+(m>>0)>>0]===r[0>>0])){
break;
}else{
}
}
G.a1={d:r,o:0};
}
}
if((h.d[(h.o>>0)+(d>>0)>>0]===a.d[a.o>>0])){
break;
}else{
}
}
o.a2=a;
}
var a=(o.a0);
if((a===null)){
return ;
}
return ;
}
function dY(y,B){
var label=0;
var m=y;
var d=(m.a0);
var h=(m.a1);
var a=(B.a1);
if((h.d.length===d.d.length && h.d===d.d && h.o===d.o)){
}else{
var r=0;
while(1){
var w=((r>>0)+(-1>>0)>>0);
var o=a.d[(a.o>>0)+(-1>>0)>>0].a0;
o.a0=nullArray;
o.a1=nullObj;
o.a2.a0=nullObj;
var f=h.d[(h.o>>0)+(w>>0)>>0].a0;
o.a0=(f.a0);
o.a1=(f.a1);
o.a2.a0=(f.a2.a0);
f.a2.a0=nullObj;
f.a1=nullObj;
f.a0=nullArray;
a.d[(a.o>>0)+(-1>>0)>>0].i1=((h.d[(h.o+r>>0)+(-1>>0)>>0].i1>>0)>>0);
a.d[(a.o>>0)+(-1>>0)>>0].a2.i0=((h.d[(h.o+r>>0)+(-1>>0)>>0].a2.i0>>0)>>0);
a.d[(a.o>>0)+(-1>>0)>>0].a2.i1=((h.d[(h.o+r>>0)+(-1>>0)>>0].a2.i1>>0)>>0);
a.d[(a.o>>0)+(-1>>0)>>0].a2.i2=((h.d[(h.o+r>>0)+(-1>>0)>>0].a2.i2>>0)>>0);
var a=(B.a1);
B.a1={d:a.d,o:a.o+-1>>0};
if((h.d[(h.o>>0)+(w>>0)>>0]===d.d[d.o>>0])){
break;
}else{
var r=w;
var a=aSlot={d:a.d,o:a.o+-1>>0};
}
}
var d=(m.a0);
var a=aSlot={d:a.d,o:a.o+-1>>0};
}
m.a0=a;
B.a1=d;
var a=(m.a1);
m.a1=(B.a2);
B.a2=a;
var a=(m.a2.a0);
m.a2.a0=(B.a3.a0);
B.a3.a0=a;
var a=(B.a1);
B.a0=a.d[a.o>>0];
return ;
}
function Qa(d,a){
var label=0;
var y=d;
var h=(y.a1);
var w=(y.a0);
var f=(0);
var m=1;
var o=((((((h.o)-f)>>0)>>0)/(m>>0))>>0);
var r=((o>>0)+(1>>0)>>0);
if(((r>>>0)>(268435455>>>0))){
aj(d);
}
var h=(y.a2.a0);
var f=((((((h.o)-f)>>0)>>0)/(m>>0))>>0);
if(((f>>>0)<(134217727>>>0))){
var f=(f<<1);
var f=(((f>>>0)<(r>>>0))?r:f);
}else{
var f=268435455;
}
var h=createArray_struct$p_Z6CPoint([],0,(f<<4)/16);
h[(0>>0)+(o>>0)>>0].d0=(a.d0);
h[(0>>0)+(o>>0)>>0].d1=(a.d1);
var o=(o&268435455);
L18:do{
if(!(((o>>0)===(0>>0)))){
var m=0;
while(1){
h[(0>>0)+(m>>0)>>0].d0=(w[(0>>0)+(m>>0)>>0].d0);
h[(0>>0)+(m>>0)>>0].d1=(w[(0>>0)+(m>>0)>>0].d1);
var m=((m>>0)+(1>>0)>>0);
if(((o>>0)===(m>>0))){
break L18;
}else{
}
}
}
}while(0);
y.a0=h;
y.a1={d:h,o:0+r>>0};
y.a2.a0={d:h,o:0+f>>0};
if((w.length===1 && w===nullArray && 0===0)){
return ;
}
return ;
}
function S(a,b,d){
var label=0;
var G=aSlot={a0:nullObj,i1:0};
var y=aSlot={a0:nullObj,i1:0};
var w=aSlot={a0:nullObj,i1:0};
var E=aSlot={a0:nullObj,i1:0};
var B=aSlot={a0:nullObj,i1:0};
var r=aSlot={a0:nullObj,i1:0};
var I=aSlot={a0:nullObj,i1:0};
var f=(((d>>>0)>(32>>>0))?32:d);
var m=(f&31);
if(((m>>0)===(0>>0))){
G.a0={d:a,o:b+(f>>>5)>>0};
G.i1=(0>>0);
y.a0={d:a,o:b+1>>0};
y.i1=(0>>0);
w.a0={d:a,o:b};
w.i1=(0>>0);
bU(I,G,y,w);
}else{
E.a0={d:a,o:b+(f>>>5)>>0};
E.i1=(m>>0);
B.a0={d:a,o:b+1>>0};
B.i1=(0>>0);
r.a0={d:a,o:b};
r.i1=(0>>0);
bP(I,E,B,r);
}
var h=((32-f)>>0);
var m=(h>>>5);
var h=(h&31);
if(((f>>0)===(0>>0))){
return aSlot={d:a,o:b};
}
if(((h>>0)===(0>>0))){
}else{
var o=((32-h)>>0);
var H=(((o>>>0)>(f>>>0))?f:o);
var N=(a[(b>>0)+(m>>0)>>0]>>0);
a[(b>>0)+(m>>0)>>0]=((N&(((-1>>>((o-H)>>0))&(-1<<h))^-1))>>0);
var f=((f-H)>>0);
var m=((m>>0)+(1>>0)>>0);
}
var o=(f>>>5);
L25:do{
if(!(((o>>0)===(0>>0)))){
var h=0;
while(1){
a[(b+m>>0)+(h>>0)>>0]=(0>>0);
var h=((h>>0)+(1>>0)>>0);
if(((o>>0)===(h>>0))){
break L25;
}else{
}
}
}
}while(0);
var h=(o<<5);
if(((h>>0)===(f>>0))){
return aSlot={d:a,o:b};
}
var H=(a[(b+m>>0)+(o>>0)>>0]>>0);
a[(b+m>>0)+(o>>0)>>0]=((H&((-1>>>((((32-f)>>0)>>0)+(h>>0)>>0))^-1))>>0);
return aSlot={d:a,o:b};
}
function bU(w,E,y,B){
var label=0;
var o=(y.a0);
var d=(E.a0);
var h=1;
var b=(y.i1>>0);
var f=(E.i1>>0);
var h=(((((((((((o.o)-(d.o))>>0)>>0)/(h>>0))>>0)<<5)>>0)+(b>>0)>>0)-f)>>0);
do{
if(((h>>0)>(0>>0))){
if(((f>>0)===(0>>0))){
}else{
var b=((32-f)>>0);
var m=(((h>>0)<(b>>0))?h:b);
var h=((h-m)>>0);
var b=((-1>>>((b-m)>>0))&(-1<<f));
var f=(d.d[d.o>>0]>>0);
var d=(B.a0);
var r=(d.d[d.o>>0]>>0);
d.d[d.o>>0]=(((r&(b^-1))|(f&b))>>0);
var b=(B.i1>>0);
var b=((b>>0)+(m>>0)>>0);
B.a0={d:d.d,o:d.o+(b>>>5)>>0};
B.i1=((b&31)>>0);
var d=(E.a0);
E.a0={d:d.d,o:d.o+1>>0};
var d=aSlot={d:d.d,o:d.o+1>>0};
}
var f=(h>>>5);
var o=(B.a0);
L18:do{
if(!(((f>>0)===(0>>0)))){
if((d.o<o.o)){
var b=f;
while(1){
var b=((b>>0)+(-1>>0)>>0);
o.d[(o.o>>0)+(b>>0)>>0]=((d.d[(d.o>>0)+(b>>0)>>0]>>0)>>0);
if(((b>>0)===(0>>0))){
break L18;
}else{
}
}
}else{
var b=0;
while(1){
o.d[(o.o>>0)+(b>>0)>>0]=((d.d[(d.o>>0)+(b>>0)>>0]>>0)>>0);
var b=((b>>0)+(1>>0)>>0);
if(((f>>0)===(b>>0))){
break L18;
}else{
}
}
}
}
}while(0);
var h=((h-(f<<5))>>0);
var d=(B.a0);
B.a0={d:d.d,o:d.o+f>>0};
if(!(((h>>0)>(0>>0)))){
var d=aSlot={d:d.d,o:d.o+f>>0};
break;
}
var d=(E.a0);
E.a0={d:d.d,o:d.o+f>>0};
var b=(-1>>>((32-h)>>0));
var f=(d.d[(d.o>>0)+(f>>0)>>0]>>0);
var d=(B.a0);
var m=(d.d[d.o>>0]>>0);
d.d[d.o>>0]=(((m&(b^-1))|(f&b))>>0);
B.i1=(h>>0);
}else{
var d=(B.a0);
}
}while(0);
w.a0=d;
w.i1=((B.i1>>0)>>0);
return ;
}
function bP(N,H,G,I){
var label=0;
var E=(G.a0);
var f=(H.a0);
var d=1;
var b=(G.i1>>0);
var h=(H.i1>>0);
var d=(((((((((((E.o)-(f.o))>>0)>>0)/(d>>0))>>0)<<5)>>0)+(b>>0)>>0)-h)>>0);
do{
if(((d>>0)>(0>>0))){
if(((h>>0)===(0>>0))){
var b=(I.i1>>0);
}else{
var b=((32-h)>>0);
var m=(((d>>0)<(b>>0))?d:b);
var d=((d-m)>>0);
var o=(f.d[f.o>>0]>>0);
var h=(((-1>>>((b-m)>>0))&(-1<<h))&o);
var b=(I.i1>>0);
var o=((32-b)>>0);
var w=(((o>>>0)<(m>>>0))?o:m);
var f=(I.a0);
var r=(f.d[f.o>>0]>>0);
var o=(r&(((-1>>>((o-w)>>0))&(-1<<b))^-1));
f.d[f.o>>0]=(o>>0);
var b=(I.i1>>0);
var r=(H.i1>>0);
if(((b>>>0)>(r>>>0))){
var b=(h<<((b-r)>>0));
}else{
var b=(h>>>((r-b)>>0));
}
f.d[f.o>>0]=((b|o)>>0);
var b=(I.i1>>0);
var o=((b>>0)+(w>>0)>>0);
I.a0={d:f.d,o:f.o+(o>>>5)>>0};
var r=(o&31);
I.i1=(r>>0);
var b=((m-w)>>0);
if(((b>>0)>(0>>0))){
var m=(f.d[(f.o>>0)+((o>>>5)>>0)>>0]>>0);
var m=(m&((-1>>>((32-b)>>0))^-1));
f.d[(f.o>>0)+((o>>>5)>>0)>>0]=(m>>0);
var r=(H.i1>>0);
f.d[(f.o>>0)+((o>>>5)>>0)>>0]=(((h>>>((r>>0)+(w>>0)>>0))|m)>>0);
I.i1=(b>>0);
}else{
var b=r;
}
var f=(H.a0);
H.a0={d:f.d,o:f.o+1>>0};
var f=aSlot={d:f.d,o:f.o+1>>0};
}
var h=((32-b)>>0);
var m=(-1<<b);
if(((d>>>0)>(31>>>0))){
var o=(m^-1);
var b=((31-d)>>0);
var w=(((((b>>>0)>(-32>>>0))?b:-32)>>0)+(d>>0)>>0);
var b=d;
while(1){
var r=(f.d[f.o>>0]>>0);
var f=(I.a0);
var y=(f.d[f.o>>0]>>0);
var y=(y&o);
f.d[f.o>>0]=(y>>0);
var B=(I.i1>>0);
f.d[f.o>>0]=(((r<<B)|y)>>0);
I.a0={d:f.d,o:f.o+1>>0};
var y=(f.d[(f.o>>0)+(1>>0)>>0]>>0);
f.d[(f.o>>0)+(1>>0)>>0]=(((y&m)|(r>>>h))>>0);
var b=((b>>0)+(-32>>0)>>0);
var f=(H.a0);
H.a0={d:f.d,o:f.o+1>>0};
if(((b>>>0)>(31>>>0))){
var f=aSlot={d:f.d,o:f.o+1>>0};
}else{
break;
}
}
var d=((((d>>0)+(-32>>0)>>0)-(w&-32))>>0);
var f=aSlot={d:f.d,o:f.o+1>>0};
}else{
}
if(!(((d>>0)>(0>>0)))){
break;
}
var b=(f.d[f.o>>0]>>0);
var b=(b&(-1>>>((32-d)>>0)));
var m=(((h>>0)<(d>>0))?h:d);
var o=(I.i1>>0);
var f=(I.a0);
var w=(f.d[f.o>>0]>>0);
var h=(w&(((-1<<o)&(-1>>>((h-m)>>0)))^-1));
f.d[f.o>>0]=(h>>0);
var o=(I.i1>>0);
f.d[f.o>>0]=(((b<<o)|h)>>0);
var h=(I.i1>>0);
var h=((h>>0)+(m>>0)>>0);
I.a0={d:f.d,o:f.o+(h>>>5)>>0};
I.i1=((h&31)>>0);
var d=((d-m)>>0);
if(!(((d>>0)>(0>>0)))){
break;
}
var o=(f.d[(f.o>>0)+((h>>>5)>>0)>>0]>>0);
f.d[(f.o>>0)+((h>>>5)>>0)>>0]=(((o&((-1>>>((32-d)>>0))^-1))|(b>>>m))>>0);
I.i1=(d>>0);
}
}while(0);
N.a0=(I.a0);
N.i1=((I.i1>>0)>>0);
return ;
}
function K(b,c,d){
var label=0;
var y=aSlot={a0:nullObj,i1:0};
var m=aSlot={a0:nullObj,i1:0};
var h=aSlot={a0:nullObj,i1:0};
var w=aSlot={a0:nullObj,i1:0};
var r=aSlot={a0:nullObj,i1:0};
var o=aSlot={a0:nullObj,i1:0};
var H=aSlot={a0:nullObj,i1:0};
var B=(((d>>>0)>(32>>>0))?32:d);
var G=((32-B)>>0);
var f=(G&31);
if(((f>>0)===(0>>0))){
y.a0={d:b,o:c};
y.i1=(0>>0);
m.a0={d:b,o:c+(G>>>5)>>0};
m.i1=(0>>0);
h.a0={d:b,o:c+1>>0};
h.i1=(0>>0);
dO(H,y,m,h);
}else{
w.a0={d:b,o:c};
w.i1=(0>>0);
r.a0={d:b,o:c+(G>>>5)>>0};
r.i1=(f>>0);
o.a0={d:b,o:c+1>>0};
o.i1=(0>>0);
dN(H,w,r,o);
}
if(((B>>0)===(0>>0))){
return aSlot={d:b,o:c};
}
var E=(B>>>5);
L20:do{
if(!(((E>>0)===(0>>0)))){
var f=0;
while(1){
b[(c>>0)+(f>>0)>>0]=(0>>0);
var f=((f>>0)+(1>>0)>>0);
if(((E>>0)===(f>>0))){
break L20;
}else{
}
}
}
}while(0);
var f=(E<<5);
if(((f>>0)===(B>>0))){
return aSlot={d:b,o:c};
}
var B=(b[(c>>0)+(E>>0)>>0]>>0);
b[(c>>0)+(E>>0)>>0]=((B&((-1>>>((f>>0)+(G>>0)>>0))^-1))>>0);
return aSlot={d:b,o:c};
}
function dO(B,E,y,w){
var label=0;
var d=(y.a0);
var m=(E.a0);
var h=1;
var c=(y.i1>>0);
var f=(E.i1>>0);
var h=(((((((((((d.o)-(m.o))>>0)>>0)/(h>>0))>>0)<<5)>>0)+(c>>0)>>0)-f)>>0);
do{
if(((h>>0)>(0>>0))){
if(((c>>0)===(0>>0))){
var d=(w.a0);
}else{
var f=(((h>>0)<(c>>0))?h:c);
var h=((h-f)>>0);
var c=((-1<<((c-f)>>0))&(-1>>>((32-c)>>0)));
var o=(d.d[d.o>>0]>>0);
var d=(w.a0);
var r=(d.d[d.o>>0]>>0);
d.d[d.o>>0]=(((r&(c^-1))|(o&c))>>0);
var c=(w.i1>>0);
w.i1=((((c-f)>>0)&31)>>0);
}
var f=(h>>>5);
var c=((0-f)>>0);
w.a0={d:d.d,o:d.o+c>>0};
var d=(y.a0);
y.a0={d:d.d,o:d.o+c>>0};
var m=(w.a0);
L18:do{
if(!(((f>>0)===(0>>0)))){
if((d.o+c<m.o)){
var c=f;
while(1){
var c=((c>>0)+(-1>>0)>>0);
m.d[(m.o>>0)+(c>>0)>>0]=((d.d[(d.o>>0)+(((c-f)>>0)>>0)>>0]>>0)>>0);
if(((c>>0)===(0>>0))){
break L18;
}else{
}
}
}else{
var c=0;
while(1){
m.d[(m.o>>0)+(c>>0)>>0]=((d.d[(d.o>>0)+(((c-f)>>0)>>0)>>0]>>0)>>0);
var c=((c>>0)+(1>>0)>>0);
if(((f>>0)===(c>>0))){
break L18;
}else{
}
}
}
}
}while(0);
var h=((h-(f<<5))>>0);
if(!(((h>>0)>(0>>0)))){
break;
}
var c=(-1<<((32-h)>>0));
var d=(y.a0);
y.a0={d:d.d,o:d.o+-1>>0};
var f=(d.d[(d.o>>0)+(-1>>0)>>0]>>0);
var d=(w.a0);
w.a0={d:d.d,o:d.o+-1>>0};
var o=(d.d[(d.o>>0)+(-1>>0)>>0]>>0);
d.d[(d.o>>0)+(-1>>0)>>0]=(((o&(c^-1))|(f&c))>>0);
w.i1=((((0-h)>>0)&31)>>0);
}
}while(0);
B.a0=(w.a0);
B.i1=((w.i1>>0)>>0);
return ;
}
function dN(G,H,E,B){
var label=0;
var h=(E.a0);
var N=(H.a0);
var f=1;
var c=(E.i1>>0);
var d=(H.i1>>0);
var f=(((((((((((h.o)-(N.o))>>0)>>0)/(f>>0))>>0)<<5)>>0)+(c>>0)>>0)-d)>>0);
do{
if(((f>>0)>(0>>0))){
do{
if(((c>>0)===(0>>0))){
}else{
var d=(((f>>0)<(c>>0))?f:c);
var f=((f-d)>>0);
var m=(h.d[h.o>>0]>>0);
var m=(((-1<<((c-d)>>0))&(-1>>>((32-c)>>0)))&m);
var c=(B.i1>>0);
var o=(((c>>0)<(d>>0))?c:d);
if(((o>>0)===(0>>0))){
}else{
var h=(B.a0);
var r=(h.d[h.o>>0]>>0);
var r=(r&(((-1<<((c-o)>>0))&(-1>>>((32-c)>>0)))^-1));
h.d[h.o>>0]=(r>>0);
var c=(B.i1>>0);
var w=(E.i1>>0);
if(((c>>>0)>(w>>>0))){
var c=(m<<((c-w)>>0));
}else{
var c=(m>>>((w-c)>>0));
}
h.d[h.o>>0]=((c|r)>>0);
var c=(B.i1>>0);
B.i1=((((c-o)>>0)&31)>>0);
var d=((d-o)>>0);
}
if(!(((d>>0)>(0>>0)))){
break;
}
var h=(B.a0);
B.a0={d:h.d,o:h.o+-1>>0};
var c=(((0-d)>>0)&31);
B.i1=(c>>0);
var r=(h.d[(h.o>>0)+(-1>>0)>>0]>>0);
h.d[(h.o>>0)+(-1>>0)>>0]=((r&((-1<<c)^-1))>>0);
var c=(E.i1>>0);
var d=((c-((d>>0)+(o>>0)>>0))>>0);
E.i1=(d>>0);
var c=(B.i1>>0);
var o=(h.d[(h.o>>0)+(-1>>0)>>0]>>0);
h.d[(h.o>>0)+(-1>>0)>>0]=(((m<<((c-d)>>0))|o)>>0);
}
}while(0);
var d=(B.i1>>0);
var c=((32-d)>>0);
var m=(-1>>>c);
if(((f>>>0)>(31>>>0))){
var o=(m^-1);
var d=((31-f)>>0);
var r=(((((d>>>0)>(-32>>>0))?d:-32)>>0)+(f>>0)>>0);
var d=f;
while(1){
var h=(E.a0);
E.a0={d:h.d,o:h.o+-1>>0};
var w=(h.d[(h.o>>0)+(-1>>0)>>0]>>0);
var h=(B.a0);
var y=(h.d[h.o>>0]>>0);
h.d[h.o>>0]=(((y&o)|(w>>>c))>>0);
B.a0={d:h.d,o:h.o+-1>>0};
var y=(h.d[(h.o>>0)+(-1>>0)>>0]>>0);
var y=(y&m);
h.d[(h.o>>0)+(-1>>0)>>0]=(y>>0);
var I=(B.i1>>0);
h.d[(h.o>>0)+(-1>>0)>>0]=(((w<<I)|y)>>0);
var d=((d>>0)+(-32>>0)>>0);
if(((d>>>0)>(31>>>0))){
}else{
break;
}
}
var f=((((f>>0)+(-32>>0)>>0)-(r&-32))>>0);
}else{
}
if(!(((f>>0)>(0>>0)))){
break;
}
var h=(E.a0);
E.a0={d:h.d,o:h.o+-1>>0};
var d=(h.d[(h.o>>0)+(-1>>0)>>0]>>0);
var d=(d&(-1<<((32-f)>>0)));
var c=(B.i1>>0);
var m=(((c>>0)<(f>>0))?c:f);
var h=(B.a0);
var o=(h.d[h.o>>0]>>0);
var c=(o&(((-1<<((c-m)>>0))&(-1>>>((32-c)>>0)))^-1));
h.d[h.o>>0]=(c>>0);
var o=(B.i1>>0);
h.d[h.o>>0]=((c|(d>>>((32-o)>>0)))>>0);
var c=(B.i1>>0);
B.i1=((((c-m)>>0)&31)>>0);
var c=((f-m)>>0);
if(!(((c>>0)>(0>>0)))){
break;
}
B.a0={d:h.d,o:h.o+-1>>0};
var c=(((0-c)>>0)&31);
B.i1=(c>>0);
var m=(h.d[(h.o>>0)+(-1>>0)>>0]>>0);
var c=(m&((-1<<c)^-1));
h.d[(h.o>>0)+(-1>>0)>>0]=(c>>0);
var m=(B.i1>>0);
h.d[(h.o>>0)+(-1>>0)>>0]=(((d<<((((f>>0)+(-32>>0)>>0)>>0)+(m>>0)>>0))|c)>>0);
}
}while(0);
G.a0=(B.a0);
G.i1=((B.i1>>0)>>0);
return ;
}
function dR(){
dk(6>>0);
bQ(1>>0);
}
function eT(h,i,f,d,e,m,n){
var c=(ac);
var c=(c.a3);
dq(c.d[c.o>>0],cn,0,{d:m,o:n},{d:h,o:i},f>>0,((d.length!==1 || d!==nullArray || e!==0)?{d:cr,o:0>>0}:{d:cb,o:0>>0}),((d.length===1 && d===nullArray && e===0)?{d:cb,o:0>>0}:{d:d,o:e}));
dR();
}
function eF(n,i,j,r,s,o){
var label=0;
var c=String();
var e=(r[s>>0]&255);
L4:do{
if(((e&255)===(0&255))){
}else{
var f=0;
while(1){
var w=String.fromCharCode(((e<<24)>>24)>>0);
var c=c.concat(w);
var f=((f>>0)+(1>>0)>>0);
var e=(r[(s>>0)+(f>>0)>>0]&255);
if(((e&255)===(0&255))){
break L4;
}else{
}
}
}
}while(0);
var c=String(c);
var e=((o>>0)+(-1>>0)>>0);
var f=c.charCodeAt(e>>0);
var c=c.substr(0>>0,(((f>>0)===(10>>0))?e:o)>>0);
console.log(c);
return o>>0;
}
function dv(s,o){
var label=0;
if((o===null)){
var e=0;
return e>>0;
}
do{
if(!((s===null))){
var e=(s.i6>>0);
if(!(((e>>0)===(0>>0)))){
break;
}
au(s);
}
}while(0);
do{
if((o===ar.d[ar.o>>0])){
var c=(s.a1);
var c=c.d[c.o>>0];
}else{
if((o===aq.d[aq.o>>0])){
var c=(s.a2);
var c=c.d[c.o>>0];
break;
}
if(!((o===as.d[as.o>>0]))){
var c=o;
break;
}
var c=(s.a3);
var c=c.d[c.o>>0];
}
}while(0);
var e=(c.i3&65535);
if(((e&65535)===(0&65535))){
var e=0;
return e>>0;
}
var e=al(s,c);
var f=(c.a12);
if((f===null)){
}else{
var n=(c.a8);
var j=f(s,n.d,n.o);
var e=(((j>>0)<(0>>0))?-1:e);
}
var j=(c.i3&65535);
if(!((((j&128)&65535)===(0&65535)))){
}
var f=(c.a13.a0);
if(!((f.d.length===1 && f.d===nullArray && f.o===0))){
if(!((f.d.length===c.a16.length && f.d===c.a16 && f.o===0))){
}
c.a13.a0=nullObj;
}
var f=(c.a17.a0);
if(!((f.d.length===1 && f.d===nullArray && f.o===0))){
c.a17.a0=nullObj;
}
du();
c.i3=0;
dp();
return e>>0;
}
function bx(e){
var c=(ac);
return dv(c,e)>>0;
}
function dt(w,s){
var label=0;
var c=(s.i3&65535);
var j=((c<<16)>>16);
if(!((((j&8)>>0)===(0>>0)))){
var f=(s.a5.a0);
if((f.d.length===1 && f.d===nullArray && f.o===0)){
var c=0;
return c>>0;
}
var n=(s.a0);
var e=(((n.o)-(f.o))>>0);
s.a0=f;
if((((j&3)>>0)===(0>>0))){
var c=(s.a5.i1>>0);
}else{
var c=0;
}
s.i2=(c>>0);
if(!(((e>>0)>(0>>0)))){
var c=0;
return c>>0;
}
var c=e;
var j=0;
while(1){
var n=(s.a10);
var o=(s.a8);
var e=n(w,o.d,o.o,f.d,f.o+j,c>>0);
if(((e>>0)<(1>>0))){
break;
}
var j=((j>>0)+(e>>0)>>0);
var c=((c-e)>>0);
if(((c>>0)>(0>>0))){
}else{
var c=0;
label=43;
break;
}
}
if(label===43){
return c>>0;
}
var c=(s.i3&65535);
s.i3=(c|64);
var c=-1;
return c>>0;
}
s.i3=(c|2048);
var j=(s.i1>>0);
do{
if(!(((j>>0)>(0>>0)))){
var j=(s.i15>>0);
if(((j>>0)>(0>>0))){
break;
}else{
var c=0;
}
return c>>0;
}
}while(0);
var f=(s.a11);
if((f===null)){
var c=0;
return c>>0;
}
var j=(w.i0>>0);
w.i0=(0>>0);
do{
if((((c&4096)&65535)===(0&65535))){
var n=(s.a8);
var c=f(w,n.d,n.o,0>>0,1>>0);
if(!(((c>>0)===(-1>>0)))){
break;
}
var c=(w.i0>>0);
if((c>>0)===(29>>0)||((c>>0)===(22>>0))){
w.i0=(j>>0);
var c=0;
return c>>0;
}else if((c>>0)===(0>>0)){
var c=-1;
break;
}else{
var c=(s.i3&65535);
s.i3=(c|64);
var c=-1;
return c>>0;
}
}else{
var c=(s.i19>>0);
}
}while(0);
var e=(s.i3&65535);
do{
if((((e&4)&65535)===(0&65535))){
}else{
var e=(s.i1>>0);
var c=((c-e)>>0);
var f=(s.a13.a0);
if((f.d.length===1 && f.d===nullArray && f.o===0)){
break;
}
var e=(s.i15>>0);
var c=((c-e)>>0);
}
}while(0);
var f=(s.a11);
var n=(s.a8);
var c=f(w,n.d,n.o,c>>0,0>>0);
do{
if(((c>>0)===(-1>>0))){
var e=(w.i0>>0);
if((e>>0)===(0>>0)||((e>>0)===(29>>0))||((e>>0)===(22>>0))){
break;
}
var c=(s.i3&65535);
s.i3=(c|64);
var c=-1;
return c>>0;
}
}while(0);
var e=(s.i3&65535);
s.i3=(e&-2049);
s.i1=(0>>0);
var f=(s.a5.a0);
s.a0=f;
do{
if(!((((e&4096)&65535)===(0&65535)))){
if(((c>>0)===(-1>>0))){
var e=(w.i0>>0);
if(!(((e>>0)===(0>>0)))){
break;
}
}
s.i19=(c>>0);
}
}while(0);
w.i0=(j>>0);
var f=(s.a13.a0);
if((f.d.length===1 && f.d===nullArray && f.o===0)){
var c=0;
return c>>0;
}
if(!((f.d.length===s.a16.length && f.d===s.a16 && f.o===0))){
}
s.a13.a0=nullObj;
var c=0;
return c>>0;
}
function al(f,e){
var label=0;
var c=(e.a5.a0);
if((c.d.length===1 && c.d===nullArray && c.o===0)){
var j=0;
return j>>0;
}
do{
if(!((f===null))){
var j=(f.i6>>0);
if(!(((j>>0)===(0>>0)))){
break;
}
au(f);
}
}while(0);
do{
if((e===ar.d[ar.o>>0])){
var c=(f.a1);
var c=c.d[c.o>>0];
}else{
if((e===aq.d[aq.o>>0])){
var c=(f.a2);
var c=c.d[c.o>>0];
break;
}
if(!((e===as.d[as.o>>0]))){
var c=e;
break;
}
var c=(f.a3);
var c=c.d[c.o>>0];
}
}while(0);
var j=(c.i3&65535);
if(((j&65535)===(0&65535))){
var j=0;
return j>>0;
}
var j=dt(f,c);
return j>>0;
}
function du(){
return ;
}
function dp(){
return ;
}
function ds(c){
dF(c,bx);
return ;
}
function dr(){
return ;
}
function aS(){
return ;
}
function dq(f,j,k){
var c=aSlot=[nullObj];
c[0>>0]={d:arguments,o:dq.length};
var o=(ac);
var n=(c[0>>0]);
var e=eQ(o,f,j,k,n.d,n.o);
c[0>>0]=null;
return e>>0;
}
function dG(I,N,H){
var label=0;
var o=(H.i2>>0);
if(((o>>0)===(0>>0))){
var o=0;
return o>>0;
}
var o=(N.i3&65535);
do{
if((((o&8)&65535)===(0&65535))){
label=3;
}else{
var k=(N.a5.a0);
if((k.d.length===1 && k.d===nullArray && k.o===0)){
label=3;
break;
}else{
break;
}
}
}while(0);
do{
if(label===3){
var o=eP(I,N);
if(((o>>0)===(0>>0))){
var o=(N.i3&65535);
break;
}else{
var o=-1;
return o>>0;
}
}
}while(0);
var E=(H.a0);
L88:do{
if((((o&2)&65535)===(0&65535))){
if(!((((o&1)&65535)===(0&65535)))){
var c=0;
var f=0;
var k=aSlot=nullObj;
var o=0;
L101:while(1){
var n=0;
while(1){
if(((f>>0)===(0>>0))){
break;
}
do{
if(((n>>0)===(0>>0))){
var e=aR(k.d,k.o,10>>0,f>>0);
if((e.d.length===1 && e.d===nullArray && e.o===0)){
var y=((f>>0)+(1>>0)>>0);
var n=1;
break;
}else{
var y=(((e.o+1)-(k.o))>>0);
var n=1;
break;
}
}else{
var y=c;
}
}while(0);
var w=(((f>>>0)<(y>>>0))?f:y);
var c=(N.i2>>0);
var G=(N.a5.i1>>0);
var s=((G>>0)+(c>>0)>>0);
var e=(N.a0);
var B=(N.a5.a0);
do{
if(((e.o>B.o)&&((w>>0)>(s>>0)))){
L114:do{
if(!(((s>>0)===(0>>0)))){
if((k.o<e.o)){
var c=s;
while(1){
var c=((c>>0)+(-1>>0)>>0);
e.d[(e.o>>0)+(c>>0)>>0]=(k.d[(k.o>>0)+(c>>0)>>0]&255);
if(((c>>0)===(0>>0))){
break L114;
}else{
}
}
}else{
var c=0;
while(1){
e.d[(e.o>>0)+(c>>0)>>0]=(k.d[(k.o>>0)+(c>>0)>>0]&255);
var c=((c>>0)+(1>>0)>>0);
if(((s>>0)===(c>>0))){
break L114;
}else{
}
}
}
}
}while(0);
var e=(N.a0);
N.a0={d:e.d,o:e.o+s>>0};
var c=al(I,N);
if(((c>>0)===(0>>0))){
}else{
break L88;
}
}else{
if(!(((w>>0)<(G>>0)))){
var e=(N.a10);
var B=(N.a8);
var s=e(I,B.d,B.o,k.d,k.o,G>>0);
if(((s>>0)<(1>>0))){
break L88;
}else{
break;
}
}
L126:do{
if(!(((w>>0)===(0>>0)))){
if((k.o<e.o)){
var c=w;
while(1){
var c=((c>>0)+(-1>>0)>>0);
e.d[(e.o>>0)+(c>>0)>>0]=(k.d[(k.o>>0)+(c>>0)>>0]&255);
if(((c>>0)===(0>>0))){
break L126;
}else{
}
}
}else{
var c=0;
while(1){
e.d[(e.o>>0)+(c>>0)>>0]=(k.d[(k.o>>0)+(c>>0)>>0]&255);
var c=((c>>0)+(1>>0)>>0);
if(((w>>0)===(c>>0))){
break L126;
}else{
}
}
}
}
}while(0);
var c=(N.i2>>0);
N.i2=(((c-w)>>0)>>0);
var e=(N.a0);
N.a0={d:e.d,o:e.o+w>>0};
var s=w;
}
}while(0);
var c=((y-s)>>0);
if(((y>>0)===(s>>0))){
var n=al(I,N);
if(((n>>0)===(0>>0))){
var n=0;
}else{
break L88;
}
}else{
}
var f=((f-s)>>0);
var y=(H.i2>>0);
H.i2=(((y-s)>>0)>>0);
if(((y>>0)===(s>>0))){
var o=0;
break L101;
}else{
var k=aSlot={d:k.d,o:k.o+s>>0};
}
}
var k=(E[(0>>0)+(o>>0)>>0].a0);
var f=(E[(0>>0)+(o>>0)>>0].a1[0]>>0);
var o=((o>>0)+(1>>0)>>0);
}
return o>>0;
}
var f=0;
var k=aSlot=nullObj;
var o=0;
L141:while(1){
while(1){
if(((f>>0)===(0>>0))){
break;
}
var c=(N.i2>>0);
var n=(N.i3&65535);
do{
if((((n&512)&65535)===(0&65535))){
var e=(N.a0);
var B=(N.a5.a0);
if(((e.o>B.o)&&((f>>>0)>(c>>>0)))){
L170:do{
if(!(((c>>0)===(0>>0)))){
if((k.o<e.o)){
var n=c;
while(1){
var n=((n>>0)+(-1>>0)>>0);
e.d[(e.o>>0)+(n>>0)>>0]=(k.d[(k.o>>0)+(n>>0)>>0]&255);
if(((n>>0)===(0>>0))){
break L170;
}else{
}
}
}else{
var n=0;
while(1){
e.d[(e.o>>0)+(n>>0)>>0]=(k.d[(k.o>>0)+(n>>0)>>0]&255);
var n=((n>>0)+(1>>0)>>0);
if(((c>>0)===(n>>0))){
break L170;
}else{
}
}
}
}
}while(0);
var e=(N.a0);
N.a0={d:e.d,o:e.o+c>>0};
var n=al(I,N);
if(((n>>0)===(0>>0))){
break;
}else{
break L88;
}
}
var c=(N.a5.i1>>0);
if(!(((f>>>0)<(c>>>0)))){
var e=(N.a10);
var B=(N.a8);
var c=e(I,B.d,B.o,k.d,k.o,c>>0);
if(((c>>0)<(1>>0))){
break L88;
}else{
break;
}
}
L182:do{
if((k.o<e.o)){
var c=f;
while(1){
var c=((c>>0)+(-1>>0)>>0);
e.d[(e.o>>0)+(c>>0)>>0]=(k.d[(k.o>>0)+(c>>0)>>0]&255);
if(((c>>0)===(0>>0))){
break L182;
}else{
}
}
}else{
var c=0;
while(1){
e.d[(e.o>>0)+(c>>0)>>0]=(k.d[(k.o>>0)+(c>>0)>>0]&255);
var c=((c>>0)+(1>>0)>>0);
if(((f>>0)===(c>>0))){
break L182;
}else{
}
}
}
}while(0);
var c=(N.i2>>0);
N.i2=(((c-f)>>0)>>0);
var e=(N.a0);
N.a0={d:e.d,o:e.o+f>>0};
var c=f;
}else{
var e=(N.a0);
if((((f>>>0)<(c>>>0))||(((n&1152)&65535)===(0&65535)))){
}else{
var B=(N.a5.a0);
var c=(e.o);
var y=(B.o);
var s=((c-y)>>0);
var w=(N.a5.i1>>0);
var w=((((mathimul(w,3)>>0)>>0)/(2>>0))>>0);
var G=((((f>>0)+(1>>0)>>0)>>0)+(s>>0)>>0);
var w=(((w>>>0)<(G>>>0))?G:w);
if((((n&1024)&65535)===(0&65535))){
var e=(function(){var __old__=B.d;
var __ret__=new Uint8Array(w/1);
__ret__.set(__old__.subarray(0, Math.min(__ret__.length,__old__.length)));
return __ret__;})();
if((e.length===1 && e===nullArray && 0===0)){
label=24;
break L141;
}else{
}
}else{
var e=new Uint8Array(w/1);
var B=(N.a5.a0);
L152:do{
if(!(((c>>0)===(y>>0)))){
var c=0;
while(1){
e[(0>>0)+(c>>0)>>0]=(B.d[(B.o>>0)+(c>>0)>>0]&255);
var c=((c>>0)+(1>>0)>>0);
if(((s>>0)===(c>>0))){
break L152;
}else{
}
}
}
}while(0);
var c=(N.i3&65535);
N.i3=((c&-1153)|128);
}
N.a5.a0={d:e,o:0};
N.a0={d:e,o:0+s>>0};
N.a5.i1=(w>>0);
N.i2=(((w-s)>>0)>>0);
var e=aSlot={d:e,o:0+s>>0};
var c=f;
}
var n=(((f>>>0)<(c>>>0))?f:c);
L159:do{
if(!(((n>>0)===(0>>0)))){
if((k.o<e.o)){
var c=n;
while(1){
var c=((c>>0)+(-1>>0)>>0);
e.d[(e.o>>0)+(c>>0)>>0]=(k.d[(k.o>>0)+(c>>0)>>0]&255);
if(((c>>0)===(0>>0))){
break L159;
}else{
}
}
}else{
var c=0;
while(1){
e.d[(e.o>>0)+(c>>0)>>0]=(k.d[(k.o>>0)+(c>>0)>>0]&255);
var c=((c>>0)+(1>>0)>>0);
if(((n>>0)===(c>>0))){
break L159;
}else{
}
}
}
}
}while(0);
var c=(N.i2>>0);
N.i2=(((c-n)>>0)>>0);
var e=(N.a0);
N.a0={d:e.d,o:e.o+n>>0};
var c=f;
}
}while(0);
var f=((f-c)>>0);
var n=(H.i2>>0);
H.i2=(((n-c)>>0)>>0);
if(((n>>0)===(c>>0))){
var o=0;
label=73;
break L141;
}else{
var k=aSlot={d:k.d,o:k.o+c>>0};
}
}
var k=(E[(0>>0)+(o>>0)>>0].a0);
var f=(E[(0>>0)+(o>>0)>>0].a1[0]>>0);
var o=((o>>0)+(1>>0)>>0);
}
if(label===24){
var o=(N.i3&65535);
N.i3=(o&-129);
I.i0=(12>>0);
break;
}
else if(label===73){
return o>>0;
}
}else{
var f=0;
var k=aSlot=nullObj;
var o=0;
L90:while(1){
while(1){
if(((f>>0)===(0>>0))){
break;
}
var e=(N.a10);
var B=(N.a8);
var c=e(I,B.d,B.o,k.d,k.o,(((f>>>0)<(1024>>>0))?f:1024)>>0);
if(((c>>0)<(1>>0))){
break L88;
}
var f=((f-c)>>0);
var n=(H.i2>>0);
H.i2=(((n-c)>>0)>>0);
if(((n>>0)===(c>>0))){
var o=0;
break L90;
}else{
var k=aSlot={d:k.d,o:k.o+c>>0};
}
}
var k=(E[(0>>0)+(o>>0)>>0].a0);
var f=(E[(0>>0)+(o>>0)>>0].a1[0]>>0);
var o=((o>>0)+(1>>0)>>0);
}
return o>>0;
}
}while(0);
var o=(N.i3&65535);
N.i3=(o|64);
var o=-1;
return o>>0;
}
function dF(w,s){
var label=0;
var c=0;
var k=w.a20;
while(1){
var e=(k.i1>>0);
L12:do{
if(((e>>0)>(0>>0))){
var o=(k.a2);
var f=c;
var c=e;
var e=0;
while(1){
var c=((c>>0)+(-1>>0)>>0);
var n=(o[(0>>0)+(e>>0)>>0].i3&65535);
do{
if(((n&65535)<(2&65535))){
}else{
var n=(o[(0>>0)+(e>>0)>>0].i4&65535);
if(((n&65535)===(-1&65535))){
break;
}
var n=s(o[(0>>0)+(e>>0)>>0]);
var f=(n|f);
}
}while(0);
var e=((e>>0)+(1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
var c=f;
break L12;
}
}
}else{
}
}while(0);
var k=(k.a0);
if((k===null)){
break;
}else{
var k=k;
}
}
return c>>0;
}
function dm(s,o){
var label=0;
var f=aSlot={i0:0,i1:0,i2:0,i3:0,i4:0,i5:0,i6:0,i7:0,i8:0,i9:0,i10:0,i11:0,i12:0,i13:0,i14:0,i15:0,a16:new Int32Array(2)};
var c=(o.i3&65535);
if(!((((c&2)&65535)===(0&65535)))){
o.a0={d:o.a16,o:3};
o.a5.a0={d:o.a16,o:3};
o.a5.i1=(1>>0);
return ;
}
var e=(o.i4&65535);
L23:do{
if((((e<<16)>>16)<((0<<16)>>16))){
label=5;
}else{
var c=bJ(((e<<16)>>16)>>0,f);
if(((c>>0)<(0>>0))){
var c=(o.i3&65535);
label=5;
break;
}
var c=(f.i2>>0);
var e=(c&61440);
var c=((((e>>0)===(8192>>0))?1:0)?1:0);
do{
if(((e>>0)===(32768>>0))){
var k=(o.a11);
if(!((k===bw))){
break;
}
var e=(o.i3&65535);
o.i3=(e|1024);
o.i18=(1024>>0);
var e=1024;
break L23;
}
}while(0);
var e=(o.i3&65535);
o.i3=(e|2048);
var e=1024;
break;
}
}while(0);
if(label===5){
var e=((((c&128)&65535)===(0&65535))?1024:64);
o.i3=(c|2048);
var c=0;
}
var k=new Uint8Array(e/1);
s.a10=ds;
var n=(o.i3&65535);
o.i3=(n|128);
o.a0={d:k,o:0};
o.a5.a0={d:k,o:0};
o.a5.i1=(e>>0);
if(((c>>0)===(0>>0))){
return ;
}
var c=(o.i4&65535);
var c=bn(((c<<16)>>16)>>0);
if(((c>>0)===(0>>0))){
return ;
}
var c=(o.i3&65535);
o.i3=(c|1);
return ;
}
function aR(f,g,n,k){
var label=0;
var s=(n&255);
if(((k>>0)===(0>>0))){
return aSlot=nullObj;
}else{
var c=0;
var e=k;
}
while(1){
var e=((e>>0)+(-1>>0)>>0);
var o=(f[(g>>0)+(c>>0)>>0]&255);
if(((o&255)===(s&255))){
label=3;
break;
}
var c=((c>>0)+(1>>0)>>0);
if(((e>>0)===(0>>0))){
label=4;
break;
}else{
}
}
if(label===3){
return aSlot={d:f,o:g+c>>0};
}
else if(label===4){
return aSlot=nullObj;
}
}
function dk(e){
var c=(ac);
return dj(c,e>>0)>>0;
}
function dj(e,g){
var c=1;
return bl(c>>0,g>>0)>>0;
}
function au(e){
var label=0;
dr();
var g=(e.i6>>0);
if(!(((g>>0)===(0>>0)))){
aS();
return ;
}
e.a20.a0=null;
e.a20.i1=(0>>0);
e.a20.a2=nullArray;
if((e===ap)){
e.i6=(1>>0);
}
var c=[{a0:nullObj,i1:0,i2:0,i3:0,i4:0,a5:c={a0:nullObj,i1:0},i6:0,a7:null,a8:nullObj,a9:null,a10:null,a11:null,a12:null,a13:c={a0:nullObj,i1:0},a14:nullObj,i15:0,a16:new Uint8Array(4),a17:c={a0:nullObj,i1:0},i18:0,i19:0,i20:0,a21:c={i0:0,a1:new DataView(new ArrayBuffer(8))},i22:0}];
c[0>>0].i4=-1;
c[0>>0].i3=1;
c[0>>0].i22=(0>>0);
c[0>>0].a0=nullObj;
c[0>>0].i2=(0>>0);
c[0>>0].i1=(0>>0);
c[0>>0].a5.a0=nullObj;
c[0>>0].a5.i1=(0>>0);
c[0>>0].i6=(0>>0);
c[0>>0].a21.i0=(0>>0);
c[0>>0].a21.a1.setInt32(0+0,0,true);
c[0>>0].a21.a1.setInt8(4+0*1+0,0);
c[0>>0].a21.a1.setInt8(4+1*1+0,0);
c[0>>0].a21.a1.setInt8(4+2*1+0,0);
c[0>>0].a21.a1.setInt8(4+3*1+0,0);
c[0>>0].a13.a0=nullObj;
c[0>>0].a13.i1=(0>>0);
c[0>>0].a17.a0=nullObj;
c[0>>0].a17.i1=(0>>0);
e.a1={d:c,o:0};
var c=[{a0:nullObj,i1:0,i2:0,i3:0,i4:0,a5:c={a0:nullObj,i1:0},i6:0,a7:null,a8:nullObj,a9:null,a10:null,a11:null,a12:null,a13:c={a0:nullObj,i1:0},a14:nullObj,i15:0,a16:new Uint8Array(4),a17:c={a0:nullObj,i1:0},i18:0,i19:0,i20:0,a21:c={i0:0,a1:new DataView(new ArrayBuffer(8))},i22:0}];
c[0>>0].i4=-1;
c[0>>0].i3=1;
c[0>>0].i22=(0>>0);
c[0>>0].a0=nullObj;
c[0>>0].i2=(0>>0);
c[0>>0].i1=(0>>0);
c[0>>0].a5.a0=nullObj;
c[0>>0].a5.i1=(0>>0);
c[0>>0].i6=(0>>0);
c[0>>0].a21.i0=(0>>0);
c[0>>0].a21.a1.setInt32(0+0,0,true);
c[0>>0].a21.a1.setInt8(4+0*1+0,0);
c[0>>0].a21.a1.setInt8(4+1*1+0,0);
c[0>>0].a21.a1.setInt8(4+2*1+0,0);
c[0>>0].a21.a1.setInt8(4+3*1+0,0);
c[0>>0].a13.a0=nullObj;
c[0>>0].a13.i1=(0>>0);
c[0>>0].a17.a0=nullObj;
c[0>>0].a17.i1=(0>>0);
e.a2={d:c,o:0};
var c=[{a0:nullObj,i1:0,i2:0,i3:0,i4:0,a5:c={a0:nullObj,i1:0},i6:0,a7:null,a8:nullObj,a9:null,a10:null,a11:null,a12:null,a13:c={a0:nullObj,i1:0},a14:nullObj,i15:0,a16:new Uint8Array(4),a17:c={a0:nullObj,i1:0},i18:0,i19:0,i20:0,a21:c={i0:0,a1:new DataView(new ArrayBuffer(8))},i22:0}];
c[0>>0].i4=-1;
c[0>>0].i3=1;
c[0>>0].i22=(0>>0);
c[0>>0].a0=nullObj;
c[0>>0].i2=(0>>0);
c[0>>0].i1=(0>>0);
c[0>>0].a5.a0=nullObj;
c[0>>0].a5.i1=(0>>0);
c[0>>0].i6=(0>>0);
c[0>>0].a21.i0=(0>>0);
c[0>>0].a21.a1.setInt32(0+0,0,true);
c[0>>0].a21.a1.setInt8(4+0*1+0,0);
c[0>>0].a21.a1.setInt8(4+1*1+0,0);
c[0>>0].a21.a1.setInt8(4+2*1+0,0);
c[0>>0].a21.a1.setInt8(4+3*1+0,0);
c[0>>0].a13.a0=nullObj;
c[0>>0].a13.i1=(0>>0);
c[0>>0].a17.a0=nullObj;
c[0>>0].a17.i1=(0>>0);
e.a3={d:c,o:0};
var c=(e.a1);
c.d[c.o>>0].a0=nullObj;
c.d[c.o>>0].i1=(0>>0);
c.d[c.o>>0].i2=(0>>0);
c.d[c.o>>0].i3=4;
c.d[c.o>>0].i22=(0>>0);
c.d[c.o>>0].i4=-1;
c.d[c.o>>0].a5.a0=nullObj;
c.d[c.o>>0].a5.i1=(0>>0);
c.d[c.o>>0].i6=(0>>0);
c.d[c.o>>0].a21.i0=(0>>0);
c.d[c.o>>0].a21.a1.setInt32(0+0,0,true);
c.d[c.o>>0].a21.a1.setInt8(4+0*1+0,0);
c.d[c.o>>0].a21.a1.setInt8(4+1*1+0,0);
c.d[c.o>>0].a21.a1.setInt8(4+2*1+0,0);
c.d[c.o>>0].a21.a1.setInt8(4+3*1+0,0);
c.d[c.o>>0].a8=c;
c.d[c.o>>0].a10=eF;
var c=(e.a2);
c.d[c.o>>0].a0=nullObj;
c.d[c.o>>0].i1=(0>>0);
c.d[c.o>>0].i2=(0>>0);
c.d[c.o>>0].i3=9;
c.d[c.o>>0].i22=(0>>0);
c.d[c.o>>0].i4=-2;
c.d[c.o>>0].a5.a0=nullObj;
c.d[c.o>>0].a5.i1=(0>>0);
c.d[c.o>>0].i6=(0>>0);
c.d[c.o>>0].a21.i0=(0>>0);
c.d[c.o>>0].a21.a1.setInt32(0+0,0,true);
c.d[c.o>>0].a21.a1.setInt8(4+0*1+0,0);
c.d[c.o>>0].a21.a1.setInt8(4+1*1+0,0);
c.d[c.o>>0].a21.a1.setInt8(4+2*1+0,0);
c.d[c.o>>0].a21.a1.setInt8(4+3*1+0,0);
c.d[c.o>>0].a8=c;
c.d[c.o>>0].a10=eF;
var c=(e.a3);
c.d[c.o>>0].a0=nullObj;
c.d[c.o>>0].i1=(0>>0);
c.d[c.o>>0].i2=(0>>0);
c.d[c.o>>0].i3=9;
c.d[c.o>>0].i22=(0>>0);
c.d[c.o>>0].i4=-2;
c.d[c.o>>0].a5.a0=nullObj;
c.d[c.o>>0].a5.i1=(0>>0);
c.d[c.o>>0].i6=(0>>0);
c.d[c.o>>0].a21.i0=(0>>0);
c.d[c.o>>0].a21.a1.setInt32(0+0,0,true);
c.d[c.o>>0].a21.a1.setInt8(4+0*1+0,0);
c.d[c.o>>0].a21.a1.setInt8(4+1*1+0,0);
c.d[c.o>>0].a21.a1.setInt8(4+2*1+0,0);
c.d[c.o>>0].a21.a1.setInt8(4+3*1+0,0);
c.d[c.o>>0].a8=c;
c.d[c.o>>0].a10=eF;
e.i6=(1>>0);
aS();
return ;
}
function di(k,l){
var c=0;
while(1){
var g=(k[(l>>0)+(c>>0)>>0]&255);
var e=((c>>0)+(1>>0)>>0);
if(((g&255)===(0&255))){
break;
}else{
var c=e;
}
}
return (((l+c)-(l))>>0)>>0;
}
function W(e,c,g){
var label=0;
var l=(g.i2>>0);
if(((l>>0)===(0>>0))){
g.i1=(0>>0);
var l=0;
return l>>0;
}else{
var l=dG(e,c,g);
g.i2=(0>>0);
g.i1=(0>>0);
return l>>0;
}
}
function eQ(V,U,aa,ab,X,Y){
var label=0;
var R=aSlot=new Uint8Array(43);
var ae=aSlot=[nullObj];
var E=aSlot={a0:nullArray,i1:0,i2:0};
var ag=aSlot=[{a0:nullObj,a1:[0]},{a0:nullObj,a1:[0]},{a0:nullObj,a1:[0]},ag={a0:nullObj,a1:[0]},ag={a0:nullObj,a1:[0]},ag={a0:nullObj,a1:[0]},ag={a0:nullObj,a1:[0]},ag={a0:nullObj,a1:[0]}];
ae[0>>0]={d:X,o:Y};
do{
if(!((V===null))){
var g=(V.i6>>0);
if(!(((g>>0)===(0>>0)))){
break;
}
au(V);
}
}while(0);
do{
if((U===ar.d[ar.o>>0])){
var y=(V.a1);
var y=y.d[y.o>>0];
}else{
if((U===aq.d[aq.o>>0])){
var y=(V.a2);
var y=y.d[y.o>>0];
break;
}
if(!((U===as.d[as.o>>0]))){
var y=U;
break;
}
var y=(V.a3);
var y=y.d[y.o>>0];
}
}while(0);
var g=(y.i3&65535);
if((((g&8192)&65535)===(0&65535))){
var g=(g|8192);
y.i3=g;
var c=(y.i22>>0);
y.i22=((c&-8193)>>0);
}else{
}
do{
if((((g&8)&65535)===(0&65535))){
label=13;
}else{
var B=(y.a5.a0);
if((B.d.length===1 && B.d===nullArray && B.o===0)){
label=13;
break;
}else{
label=15;
break;
}
}
}while(0);
do{
if(label===13){
var g=eP(V,y);
if(!(((g>>0)===(0>>0)))){
var g=-1;
break;
}
var g=(y.i3&65535);
label=15;
break;
}
}while(0);
L165:do{
if(label===15){
do{
if((((g&26)&65535)===(10&65535))){
var g=(y.i4&65535);
if(!((((g<<16)>>16)>((-1<<16)>>16)))){
break;
}
var g=dh(V,y,aa,ab,X,Y);
break L165;
}
}while(0);
E.a0=ag;
E.i2=(0>>0);
E.i1=(0>>0);
var af=(1+40);
var B=nullArray;
var c=0;
var g=0;
L171:while(1){
var s=c;
var c=0;
L173:while(1){
var e=g;
while(1){
var n=(aa[(ab>>0)+(e>>0)>>0]&255);
if((n&255)===(37&255)||((n&255)===(0&255))){
break;
}
var e=((e>>0)+(1>>0)>>0);
}
var w=(ab+e);
var o=(ab+g);
var l=((w-o)>>0);
if(((w>>0)===(o>>0))){
var g=n;
}else{
ag[(0>>0)+(c>>0)>>0].a0={d:aa,o:ab+g>>0};
ag[(0>>0)+(c>>0)>>0].a1[0]=(l>>0);
var g=(E.i2>>0);
E.i2=(((g>>0)+(l>>0)>>0)>>0);
var c=((c>>0)+(1>>0)>>0);
var g=(E.i1>>0);
E.i1=(((g>>0)+(1>>0)>>0)>>0);
if(((g>>0)>(6>>0))){
var g=W(V,y,E);
if(((g>>0)===(0>>0))){
var c=0;
}else{
break L171;
}
}else{
}
var s=((l>>0)+(s>>0)>>0);
var g=(aa[(ab>>0)+(e>>0)>>0]&255);
}
if(((g&255)===(0&255))){
label=139;
break L171;
}
var g=((e>>0)+(1>>0)>>0);
R[0>>0]=0;
var o=-1;
var w=0;
var n=0;
var e=0;
L186:while(1){
var l=((g>>0)+(1>>0)>>0);
var g=(aa[(ab>>0)+(g>>0)>>0]&255);
var g=((g<<24)>>24);
var Z=g;
var g=l;
var l=o;
var o=Z;
L188:while(1){
var Z=o;
var o=l;
var l=Z;
while(1){
if((l>>0)===(32>>0)){
label=32;
break L188;
}else if((l>>0)===(35>>0)){
label=34;
break L188;
}else if((l>>0)===(42>>0)){
label=35;
break L188;
}else if((l>>0)===(45>>0)){
break L188;
}else if((l>>0)===(43>>0)){
label=38;
break L188;
}else if((l>>0)===(48>>0)){
label=44;
break L188;
}else if((l>>0)===(49>>0)||((l>>0)===(50>>0))||((l>>0)===(51>>0))||((l>>0)===(52>>0))||((l>>0)===(53>>0))||((l>>0)===(54>>0))||((l>>0)===(55>>0))||((l>>0)===(56>>0))||((l>>0)===(57>>0))){
var Z=g;
var g=l;
var l=Z;
var w=0;
break;
}else if((l>>0)===(104>>0)){
label=46;
break L188;
}else if((l>>0)===(108>>0)){
label=47;
break L188;
}else if((l>>0)===(113>>0)){
label=48;
break L188;
}else if((l>>0)===(99>>0)){
label=49;
break L173;
}else if((l>>0)===(68>>0)){
label=50;
break L173;
}else if((l>>0)===(100>>0)||((l>>0)===(105>>0))){
label=51;
break L173;
}else if((l>>0)===(110>>0)){
break L186;
}else if((l>>0)===(79>>0)){
label=62;
break L173;
}else if((l>>0)===(111>>0)){
label=63;
break L173;
}else if((l>>0)===(112>>0)){
label=66;
break L173;
}else if((l>>0)===(115>>0)){
label=67;
break L173;
}else if((l>>0)===(85>>0)){
label=73;
break L173;
}else if((l>>0)===(117>>0)){
label=74;
break L173;
}else if((l>>0)===(120>>0)){
label=77;
break L173;
}else if((l>>0)===(88>>0)){
var B=cf;
var e=88;
label=78;
break L173;
}else if((l>>0)===(0>>0)){
label=139;
break L171;
}else if(!((l>>0)===(46>>0))){
label=96;
break L173;
}
var H=((g>>0)+(1>>0)>>0);
var g=(aa[(ab>>0)+(g>>0)>>0]&255);
if(((g&255)===(42&255))){
label=41;
break L188;
}
var l=((g<<24)>>24);
var g=((l>>0)+(-48>>0)>>0);
L194:do{
if(((g>>>0)<(10>>>0))){
var l=0;
var o=0;
while(1){
var o=(((mathimul(o,10)>>0)>>0)+(g>>0)>>0);
var I=((l>>0)+(1>>0)>>0);
var g=(aa[(ab+H>>0)+(l>>0)>>0]&255);
var l=((g<<24)>>24);
var g=((l>>0)+(-48>>0)>>0);
if(((g>>>0)<(10>>>0))){
var l=I;
}else{
var g=I;
break L194;
}
}
}else{
var g=0;
var o=0;
}
}while(0);
var g=((H>>0)+(g>>0)>>0);
var o=(((o>>0)>(-1>>0))?o:-1);
}
while(1){
var w=((((g>>0)+(-48>>0)>>0)>>0)+((mathimul(w,10)>>0)>>0)>>0);
var g=((l>>0)+(1>>0)>>0);
var l=(aa[(ab>>0)+(l>>0)>>0]&255);
var l=((l<<24)>>24);
if(((((l>>0)+(-48>>0)>>0)>>>0)<(10>>>0))){
var Z=g;
var g=l;
var l=Z;
}else{
var Z=o;
var o=l;
var l=Z;
continue L188;
}
}
}
if(label===32){
label=0;
if(!(((e&255)===(0&255)))){
continue;
}
R[0>>0]=32;
var e=32;
continue;
}
else if(label===34){
label=0;
var n=(n|1);
continue;
}
else if(label===35){
label=0;
var w=handleVAArg(ae[0>>0]);
if(((w>>0)>(-1>>0))){
continue;
}
var w=((0-w)>>0);
}
else if(label===38){
label=0;
R[0>>0]=43;
var e=43;
continue;
}
else if(label===41){
label=0;
var g=handleVAArg(ae[0>>0]);
var o=(((g>>0)>(-1>>0))?g:-1);
var g=H;
continue;
}
else if(label===44){
label=0;
var n=(n|128);
continue;
}
else if(label===46){
label=0;
var n=(n|64);
continue;
}
else if(label===47){
label=0;
var n=(n|16);
continue;
}
else if(label===48){
label=0;
var n=(n|16);
continue;
}
var n=(n|4);
}
if(!((((n&16)>>0)===(0>>0)))){
var G=handleVAArg(ae[0>>0]);
G.d[G.o>>0]=(s>>0);
continue;
}
if((((n&64)>>0)===(0>>0))){
var G=handleVAArg(ae[0>>0]);
G.d[G.o>>0]=(s>>0);
continue;
}else{
var G=handleVAArg(ae[0>>0]);
G.d[G.o>>0]=(s&65535);
continue;
}
}
do{
if(label===49){
label=0;
var e=handleVAArg(ae[0>>0]);
R[1>>0]=(e&255);
R[0>>0]=0;
var G=aSlot={d:R,o:1>>0};
var l=1;
var o=0;
var e=0;
break;
}
else if(label===50){
label=0;
var n=(n|16);
label=51;
break;
}
else if(label===62){
label=0;
var n=(n|16);
label=63;
break;
}
else if(label===66){
label=0;
var B=handleVAArg(ae[0>>0]);
var l=(B.o);
var n=(n|2);
R[41>>0]=48;
R[(41>>0)+(1>>0)>>0]=120;
var B=ed;
var H=2;
label=83;
break;
}
else if(label===67){
label=0;
var G=handleVAArg(ae[0>>0]);
R[0>>0]=0;
if((G.d.length===1 && G.d===nullArray && G.o===0)){
var l=(((o>>>0)>(6>>>0))?6:o);
var o=0;
var G=aSlot={d:ch,o:0};
var e=0;
break;
}
if(!(((o>>0)>(-1>>0)))){
var l=di(G.d,G.o);
var o=0;
var e=0;
break;
}
var N=aR(G.d,G.o,0>>0,o>>0);
if((N.d.length===1 && N.d===nullArray && N.o===0)){
var l=o;
var o=0;
var e=0;
break;
}
var e=(((N.o)-(G.o))>>0);
var l=(((e>>0)>(o>>0))?o:e);
var o=0;
var e=0;
break;
}
else if(label===73){
label=0;
var n=(n|16);
label=74;
break;
}
else if(label===77){
label=0;
var B=ed;
var e=120;
label=78;
break;
}
else if(label===96){
label=0;
R[1>>0]=(l&255);
R[0>>0]=0;
var G=aSlot={d:R,o:1>>0};
var l=1;
var o=0;
var e=0;
break;
}
}while(0);
do{
if(label===51){
label=0;
do{
if((((n&16)>>0)===(0>>0))){
var l=handleVAArg(ae[0>>0]);
if((((n&64)>>0)===(0>>0))){
break;
}
var l=((l<<16)>>16);
}else{
var l=handleVAArg(ae[0>>0]);
}
}while(0);
if(!(((l>>0)<(0>>0)))){
var H=1;
label=84;
break;
}
var l=((0-l)>>0);
R[0>>0]=45;
var H=1;
var e=45;
label=84;
break;
}
else if(label===63){
label=0;
if((((n&16)>>0)===(0>>0))){
var e=handleVAArg(ae[0>>0]);
var l=((((n&64)>>0)===(0>>0))?e:(e&65535));
var H=0;
label=83;
break;
}else{
var l=handleVAArg(ae[0>>0]);
var H=0;
label=83;
break;
}
}
else if(label===74){
label=0;
if((((n&16)>>0)===(0>>0))){
var e=handleVAArg(ae[0>>0]);
var l=((((n&64)>>0)===(0>>0))?e:(e&65535));
var H=1;
label=83;
break;
}else{
var l=handleVAArg(ae[0>>0]);
var H=1;
label=83;
break;
}
}
else if(label===78){
label=0;
if((((n&16)>>0)===(0>>0))){
var l=handleVAArg(ae[0>>0]);
var l=((((n&64)>>0)===(0>>0))?l:(l&65535));
}else{
var l=handleVAArg(ae[0>>0]);
}
if(((((n&1)>>0)===(0>>0))||((l>>0)===(0>>0)))){
var H=2;
label=83;
break;
}
R[41>>0]=48;
R[(41>>0)+(1>>0)>>0]=e;
var n=(n|2);
var H=2;
label=83;
break;
}
}while(0);
do{
if(label===83){
label=0;
R[0>>0]=0;
var e=0;
label=84;
break;
}
}while(0);
L260:do{
if(label===84){
label=0;
var n=(((o>>0)>(-1>>0))?(n&-129):n);
L262:do{
if((((l|o)>>0)===(0>>0))){
if((((H&255)!==(0&255))||(((n&1)>>0)===(0>>0)))){
var G=aSlot={d:R,o:1+40>>0};
break;
}
R[(1>>0)+(39>>0)>>0]=48;
var G=aSlot={d:R,o:1+39>>0};
}else{
if(((H&255)>>0)===(0>>0)){
var e=0;
while(1){
var H=(((l&7)|48)&255);
var I=((e>>0)+(-1>>0)>>0);
R[(1+40>>0)+(I>>0)>>0]=H;
var l=(l>>>3);
if(((l>>0)===(0>>0))){
break;
}else{
var e=I;
}
}
if(((((n&1)>>0)===(0>>0))||((H&255)===(48&255)))){
var G=aSlot={d:R,o:1+40+I>>0};
break;
}
R[(1+40+e>>0)+(-2>>0)>>0]=48;
var G=aSlot={d:R,o:1+40+e+-2>>0};
break;
}else if(((H&255)>>0)===(1>>0)){
if(((l>>>0)<(10>>>0))){
R[(1>>0)+(39>>0)>>0]=(((l>>0)+(48>>0)>>0)&255);
var G=aSlot={d:R,o:1+39>>0};
break;
}else{
var e=0;
while(1){
var e=((e>>0)+(-1>>0)>>0);
R[(1+40>>0)+(e>>0)>>0]=(((((l>>>0)%(10>>>0))>>0)|48)&255);
if(((l>>>0)<(10>>>0))){
var G=aSlot={d:R,o:1+40+e>>0};
break L262;
}else{
var l=(((l>>>0)/(10>>>0))>>0);
}
}
}
}else if(((H&255)>>0)===(2>>0)){
var e=0;
while(1){
var H=(B[(0>>0)+((l&15)>>0)>>0]&255);
var e=((e>>0)+(-1>>0)>>0);
R[(1+40>>0)+(e>>0)>>0]=H;
var l=(l>>>4);
if(((l>>0)===(0>>0))){
var G=aSlot={d:R,o:1+40+e>>0};
break L262;
}else{
}
}
}else{
var l=25;
var G=aSlot={d:ce,o:0};
break L260;
}
}
}while(0);
var l=((af-(G.o))>>0);
var e=(R[0>>0]&255);
}
}while(0);
var e=(((((o>>0)>(l>>0))?o:l)>>0)+(((((e&255)!==(0&255))?1:0)?1:0)>>0)>>0);
var H=((((n&2)>>0)===(0>>0))?e:((e>>0)+(2>>0)>>0));
var I=(n&132);
do{
if(((I>>0)===(0>>0))){
var e=((w-H)>>0);
if(!(((e>>0)>(0>>0)))){
break;
}
ag[(0>>0)+(c>>0)>>0].a0={d:cc,o:0};
L283:do{
if(((e>>0)>(16>>0))){
var N=aSlot={d:ag[(0>>0)+(c>>0)>>0].a1,o:0>>0};
while(1){
N.d[N.o>>0]=(16>>0);
var T=(E.i2>>0);
E.i2=(((T>>0)+(16>>0)>>0)>>0);
var c=((c>>0)+(1>>0)>>0);
var T=(E.i1>>0);
E.i1=(((T>>0)+(1>>0)>>0)>>0);
if(((T>>0)>(6>>0))){
var c=W(V,y,E);
if(((c>>0)===(0>>0))){
var c=0;
}else{
break L171;
}
}else{
}
var e=((e>>0)+(-16>>0)>>0);
ag[(0>>0)+(c>>0)>>0].a0={d:cc,o:0};
if(((e>>0)>(16>>0))){
var N=aSlot={d:ag[(0>>0)+(c>>0)>>0].a1,o:0>>0};
}else{
var N=aSlot={d:ag[(0>>0)+(c>>0)>>0].a1,o:0>>0};
break L283;
}
}
}else{
var N=aSlot={d:ag[(0>>0)+(c>>0)>>0].a1,o:0>>0};
}
}while(0);
N.d[N.o>>0]=(e>>0);
var T=(E.i2>>0);
E.i2=(((T>>0)+(e>>0)>>0)>>0);
var c=((c>>0)+(1>>0)>>0);
var e=(E.i1>>0);
E.i1=(((e>>0)+(1>>0)>>0)>>0);
if(!(((e>>0)>(6>>0)))){
break;
}
var c=W(V,y,E);
if(((c>>0)===(0>>0))){
var c=0;
}else{
break L171;
}
}else{
}
}while(0);
var e=(R[0>>0]&255);
do{
if(((e&255)===(0&255))){
}else{
ag[(0>>0)+(c>>0)>>0].a0={d:R,o:0>>0};
ag[(0>>0)+(c>>0)>>0].a1[0]=(1>>0);
var e=(E.i2>>0);
E.i2=(((e>>0)+(1>>0)>>0)>>0);
var c=((c>>0)+(1>>0)>>0);
var e=(E.i1>>0);
E.i1=(((e>>0)+(1>>0)>>0)>>0);
if(!(((e>>0)>(6>>0)))){
break;
}
var c=W(V,y,E);
if(((c>>0)===(0>>0))){
var c=0;
}else{
break L171;
}
}
}while(0);
do{
if((((n&2)>>0)===(0>>0))){
}else{
ag[(0>>0)+(c>>0)>>0].a0={d:R,o:41>>0};
ag[(0>>0)+(c>>0)>>0].a1[0]=(2>>0);
var e=(E.i2>>0);
E.i2=(((e>>0)+(2>>0)>>0)>>0);
var c=((c>>0)+(1>>0)>>0);
var e=(E.i1>>0);
E.i1=(((e>>0)+(1>>0)>>0)>>0);
if(!(((e>>0)>(6>>0)))){
break;
}
var c=W(V,y,E);
if(((c>>0)===(0>>0))){
var c=0;
}else{
break L171;
}
}
}while(0);
do{
if(((I>>0)===(128>>0))){
var e=((w-H)>>0);
if(!(((e>>0)>(0>>0)))){
break;
}
ag[(0>>0)+(c>>0)>>0].a0={d:cg,o:0};
L303:do{
if(((e>>0)>(16>>0))){
var N=aSlot={d:ag[(0>>0)+(c>>0)>>0].a1,o:0>>0};
while(1){
N.d[N.o>>0]=(16>>0);
var I=(E.i2>>0);
E.i2=(((I>>0)+(16>>0)>>0)>>0);
var c=((c>>0)+(1>>0)>>0);
var I=(E.i1>>0);
E.i1=(((I>>0)+(1>>0)>>0)>>0);
if(((I>>0)>(6>>0))){
var c=W(V,y,E);
if(((c>>0)===(0>>0))){
var c=0;
}else{
break L171;
}
}else{
}
var e=((e>>0)+(-16>>0)>>0);
ag[(0>>0)+(c>>0)>>0].a0={d:cg,o:0};
if(((e>>0)>(16>>0))){
var N=aSlot={d:ag[(0>>0)+(c>>0)>>0].a1,o:0>>0};
}else{
var N=aSlot={d:ag[(0>>0)+(c>>0)>>0].a1,o:0>>0};
break L303;
}
}
}else{
var N=aSlot={d:ag[(0>>0)+(c>>0)>>0].a1,o:0>>0};
}
}while(0);
N.d[N.o>>0]=(e>>0);
var I=(E.i2>>0);
E.i2=(((I>>0)+(e>>0)>>0)>>0);
var c=((c>>0)+(1>>0)>>0);
var e=(E.i1>>0);
E.i1=(((e>>0)+(1>>0)>>0)>>0);
if(!(((e>>0)>(6>>0)))){
break;
}
var c=W(V,y,E);
if(((c>>0)===(0>>0))){
var c=0;
}else{
break L171;
}
}else{
}
}while(0);
var e=((o-l)>>0);
do{
if(((e>>0)>(0>>0))){
ag[(0>>0)+(c>>0)>>0].a0={d:cg,o:0};
L314:do{
if(((e>>0)>(16>>0))){
var N=aSlot={d:ag[(0>>0)+(c>>0)>>0].a1,o:0>>0};
while(1){
N.d[N.o>>0]=(16>>0);
var o=(E.i2>>0);
E.i2=(((o>>0)+(16>>0)>>0)>>0);
var c=((c>>0)+(1>>0)>>0);
var o=(E.i1>>0);
E.i1=(((o>>0)+(1>>0)>>0)>>0);
if(((o>>0)>(6>>0))){
var c=W(V,y,E);
if(((c>>0)===(0>>0))){
var c=0;
}else{
break L171;
}
}else{
}
var e=((e>>0)+(-16>>0)>>0);
ag[(0>>0)+(c>>0)>>0].a0={d:cg,o:0};
if(((e>>0)>(16>>0))){
var N=aSlot={d:ag[(0>>0)+(c>>0)>>0].a1,o:0>>0};
}else{
var N=aSlot={d:ag[(0>>0)+(c>>0)>>0].a1,o:0>>0};
break L314;
}
}
}else{
var N=aSlot={d:ag[(0>>0)+(c>>0)>>0].a1,o:0>>0};
}
}while(0);
N.d[N.o>>0]=(e>>0);
var o=(E.i2>>0);
E.i2=(((o>>0)+(e>>0)>>0)>>0);
var c=((c>>0)+(1>>0)>>0);
var e=(E.i1>>0);
E.i1=(((e>>0)+(1>>0)>>0)>>0);
if(!(((e>>0)>(6>>0)))){
break;
}
var c=W(V,y,E);
if(((c>>0)===(0>>0))){
var c=0;
}else{
break L171;
}
}else{
}
}while(0);
ag[(0>>0)+(c>>0)>>0].a0=G;
ag[(0>>0)+(c>>0)>>0].a1[0]=(l>>0);
var e=(E.i2>>0);
E.i2=(((e>>0)+(l>>0)>>0)>>0);
var c=((c>>0)+(1>>0)>>0);
var e=(E.i1>>0);
E.i1=(((e>>0)+(1>>0)>>0)>>0);
if(((e>>0)>(6>>0))){
var c=W(V,y,E);
if(((c>>0)===(0>>0))){
var c=0;
}else{
break;
}
}else{
}
do{
if(!((((n&4)>>0)===(0>>0)))){
var e=((w-H)>>0);
if(!(((e>>0)>(0>>0)))){
break;
}
ag[(0>>0)+(c>>0)>>0].a0={d:cc,o:0};
L329:do{
if(((e>>0)>(16>>0))){
var G=aSlot={d:ag[(0>>0)+(c>>0)>>0].a1,o:0>>0};
while(1){
G.d[G.o>>0]=(16>>0);
var n=(E.i2>>0);
E.i2=(((n>>0)+(16>>0)>>0)>>0);
var c=((c>>0)+(1>>0)>>0);
var n=(E.i1>>0);
E.i1=(((n>>0)+(1>>0)>>0)>>0);
if(((n>>0)>(6>>0))){
var c=W(V,y,E);
if(((c>>0)===(0>>0))){
var c=0;
}else{
break L171;
}
}else{
}
var e=((e>>0)+(-16>>0)>>0);
ag[(0>>0)+(c>>0)>>0].a0={d:cc,o:0};
if(((e>>0)>(16>>0))){
var G=aSlot={d:ag[(0>>0)+(c>>0)>>0].a1,o:0>>0};
}else{
var G=aSlot={d:ag[(0>>0)+(c>>0)>>0].a1,o:0>>0};
break L329;
}
}
}else{
var G=aSlot={d:ag[(0>>0)+(c>>0)>>0].a1,o:0>>0};
}
}while(0);
G.d[G.o>>0]=(e>>0);
var c=(E.i2>>0);
E.i2=(((c>>0)+(e>>0)>>0)>>0);
var c=(E.i1>>0);
E.i1=(((c>>0)+(1>>0)>>0)>>0);
if(!(((c>>0)>(6>>0)))){
break;
}
var c=W(V,y,E);
if(!(((c>>0)===(0>>0)))){
break L171;
}
}
}while(0);
var c=(((((w>>0)>(H>>0))?w:H)>>0)+(s>>0)>>0);
var s=(E.i2>>0);
if(!(((s>>0)===(0>>0)))){
var s=W(V,y,E);
if(!(((s>>0)===(0>>0)))){
var s=c;
break;
}
}
E.i1=(0>>0);
}
do{
if(label===139){
var g=(E.i2>>0);
if(!(((g>>0)===(0>>0)))){
var g=W(V,y,E);
if(!(((g>>0)===(0>>0)))){
break;
}
}
E.i1=(0>>0);
}
}while(0);
var g=(y.i3&65535);
var g=((((g&64)&65535)===(0&65535))?s:-1);
}
}while(0);
return g>>0;
}
function eP(o,n){
var label=0;
var e=(ac);
do{
if(!((e===null))){
var c=(e.i6>>0);
if(!(((c>>0)===(0>>0)))){
break;
}
au(e);
}
}while(0);
do{
if((n===ar.d[ar.o>>0])){
var e=(ac);
var e=(e.a1);
var e=e.d[e.o>>0];
}else{
if((n===aq.d[aq.o>>0])){
var e=(ac);
var e=(e.a2);
var e=e.d[e.o>>0];
break;
}
if(!((n===as.d[as.o>>0]))){
var e=n;
break;
}
var e=(ac);
var e=(e.a3);
var e=e.d[e.o>>0];
}
}while(0);
var c=(e.i3&65535);
if((((c&8)&65535)===(0&65535))){
if((((c&16)&65535)===(0&65535))){
o.i0=(9>>0);
e.i3=(c|64);
var c=-1;
return c>>0;
}
if((((c&4)&65535)===(0&65535))){
}else{
var g=(e.a13.a0);
if((g.d.length===1 && g.d===nullArray && g.o===0)){
}else{
if((g.d.length===e.a16.length && g.d===e.a16 && g.o===0)){
}else{
var c=(e.i3&65535);
}
e.a13.a0=nullObj;
}
var c=(c&-37);
e.i3=c;
e.i1=(0>>0);
var g=(e.a5.a0);
e.a0=g;
}
var c=(c|8);
e.i3=c;
}else{
}
var g=(e.a5.a0);
if(((g.d.length!==1 || g.d!==nullArray || g.o!==0)||(((c&640)&65535)===(512&65535)))){
}else{
dm(o,e);
var c=(e.i3&65535);
}
if((((c&1)&65535)===(0&65535))){
if((((c&2)&65535)===(0&65535))){
var l=(e.a5.i1>>0);
}else{
var l=0;
}
e.i2=(l>>0);
}else{
e.i2=(0>>0);
var l=(e.a5.i1>>0);
e.i6=(((0-l)>>0)>>0);
}
var g=(e.a5.a0);
if(((g.d.length!==1 || g.d!==nullArray || g.o!==0)||(((c&128)&65535)===(0&65535)))){
var c=0;
return c>>0;
}
e.i3=(c|64);
var c=-1;
return c>>0;
}
function dh(y,w,s,t,o,p){
var label=0;
var c=aSlot={a0:nullObj,i1:0,i2:0,i3:0,i4:0,a5:c={a0:nullObj,i1:0},i6:0,a7:null,a8:nullObj,a9:null,a10:null,a11:null,a12:null,a13:c={a0:nullObj,i1:0},a14:nullObj,i15:0,a16:new Uint8Array(4),a17:c={a0:nullObj,i1:0},i18:0,i19:0,i20:0,a21:c={i0:0,a1:new DataView(new ArrayBuffer(8))},i22:0};
var n=aSlot=new Uint8Array(1024);
var e=(w.i3&65535);
c.i3=(e&-3);
var e=(w.i22>>0);
c.i22=(e>>0);
var e=(w.i4&65535);
c.i4=e;
var l=(w.a8);
c.a8=l;
var l=(w.a10);
c.a10=l;
c.a0={d:n,o:0};
c.a5.a0={d:n,o:0};
c.i2=(1024>>0);
c.a5.i1=(1024>>0);
c.i6=(0>>0);
var e=eQ(y,c,s,t,o,p);
if(((e>>0)>(-1>>0))){
var g=al(y,c);
var e=(((g>>0)===(0>>0))?e:-1);
}else{
}
var g=(c.i3&65535);
if(!((((g&64)&65535)===(0&65535)))){
var g=(w.i3&65535);
w.i3=(g|64);
}
return e>>0;
}
function dg(B){
var label=0;
var E=aSlot=[new DataView(new ArrayBuffer(8))];
E[0>>0].setFloat64(0,B,true);
var l=(E[0>>0].getInt32(1*4+0,true)>>0);
do{
if(((l>>0)<(1048576>>0))){
var g=(E[0>>0].getInt32(0,true)>>0);
if((((g|(l&2147483647))>>0)===(0>>0))){
var c=-Infinity;
return c;
}
if(!(((l>>0)<(0>>0)))){
var c=(B*18014398509481984);
E[0>>0].setFloat64(0,c,true);
var l=(E[0>>0].getInt32(1*4+0,true)>>0);
var g=-1077;
break;
}
var c=((B-B)/0);
return c;
}else{
var c=B;
var g=-1023;
}
}while(0);
if(((l>>0)>(2146435071>>0))){
var c=(c+c);
return c;
}
var w=(l&1048575);
var y=(((w>>0)+(614244>>0)>>0)&1048576);
E[0>>0].setFloat64(0,c,true);
E[0>>0].setInt32(1*4+0,((y|w)^1072693248),true);
var c=(E[0>>0].getFloat64(0,true));
var g=(((((l>>20)>>0)+(g>>0)>>0)>>0)+((y>>>20)>>0)>>0);
var c=(c+-1);
if((((((l>>0)+(2>>0)>>0)&1048575)>>>0)<(3>>>0))){
if((c===0)){
if(((g>>0)===(0>>0))){
var c=0;
return c;
}
var c=(+(g>>0));
var c=((c*0.69314718036912382)+(c*1.9082149292705877E-10));
return c;
}
var n=((c*c)*(0.5-(c*0.33333333333333331)));
if(((g>>0)===(0>>0))){
var c=(c-n);
return c;
}else{
var t=(+(g>>0));
var c=((t*0.69314718036912382)-((n-(t*1.9082149292705877E-10))-c));
return c;
}
}
var n=(c/(c+2));
var t=(+(g>>0));
var p=(n*n);
var e=(p*p);
var p=((e*((e*((e*0.15313837699209373)+0.22222198432149784))+0.39999999999409419))+(p*((e*((e*((e*0.14798198605116586)+0.1818357216161805))+0.28571428743662391))+0.66666666666667351)));
if((((((w>>0)+(-398458>>0)>>0)|((440401-w)>>0))>>0)>(0>>0))){
var e=(c*(c*0.5));
if(((g>>0)===(0>>0))){
var c=(c-(e-(n*(e+p))));
return c;
}else{
var c=((t*0.69314718036912382)-((e-((t*1.9082149292705877E-10)+(n*(e+p))))-c));
return c;
}
}else{
if(((g>>0)===(0>>0))){
var c=(c-(n*(c-p)));
return c;
}else{
var c=((t*0.69314718036912382)-(((n*(c-p))-(t*1.9082149292705877E-10))-c));
return c;
}
}
}
function aB(e,c){
var n=aSlot=[new DataView(new ArrayBuffer(8))];
n[0>>0].setFloat64(0,e,true);
var l=(n[0>>0].getInt32(1*4+0,true)>>0);
n[0>>0].setFloat64(0,c,true);
var g=(n[0>>0].getInt32(1*4+0,true)>>0);
n[0>>0].setFloat64(0,e,true);
n[0>>0].setInt32(1*4+0,((g&-2147483648)|(l&2147483647)),true);
return (n[0>>0].getFloat64(0,true));
}
function aN(c){
var g=aSlot=[new DataView(new ArrayBuffer(8))];
g[0>>0].setFloat64(0,c,true);
var e=(g[0>>0].getInt32(1*4+0,true)>>0);
g[0>>0].setFloat64(0,c,true);
g[0>>0].setInt32(1*4+0,(e&2147483647),true);
return (g[0>>0].getFloat64(0,true));
}
function df(g){
var label=0;
var l=aSlot=[new DataView(new ArrayBuffer(8))];
l[0>>0].setFloat64(0,g,true);
var c=(l[0>>0].getInt32(1*4+0,true)>>0);
var e=(l[0>>0].getInt32(0,true)>>0);
if(((((e|c)>>0)===(0>>0))||(((c>>0)===(-2147483648>>0))&&((e>>0)===(0>>0))))){
var c=2;
return c>>0;
}
if((((((c>>0)+(-1048576>>0)>>0)>>>0)<(2145386496>>>0))||((((c>>0)+(2146435072>>0)>>0)>>>0)<(2145386496>>>0)))){
var c=4;
return c>>0;
}
if(((c>>>0)<(1048576>>>0))){
var c=3;
return c>>0;
}
if((((c>>0)<(0>>0))&&((c>>>0)<(-2146435072>>>0)))){
var c=3;
return c>>0;
}else{
return ((((((c&2147483647)>>0)===(2146435072>>0))&&((e>>0)===(0>>0)))?1:0)?1:0)>>0;
}
}
function aO(g,l){
var label=0;
var n=aSlot=[new DataView(new ArrayBuffer(8))];
n[0>>0].setFloat64(0,g,true);
var e=(n[0>>0].getInt32(1*4+0,true)>>0);
if(((((((e&2147483647)>>0)+(-2146435072>>0)>>0)>>0)>(-1>>0))||(g===0))){
var c=g;
return c;
}
var c=be(g,l>>0);
n[0>>0].setFloat64(0,c,true);
var e=(n[0>>0].getInt32(1*4+0,true)>>0);
if(!(((((((e&2147483647)>>0)+(-2146435072>>0)>>0)>>0)>(-1>>0))||(c===0)))){
return c;
}
var n=(ac);
n.i0=(34>>0);
return c;
}
function be(n,l){
var label=0;
var p=aSlot=[new DataView(new ArrayBuffer(8))];
p[0>>0].setFloat64(0,n,true);
var g=(p[0>>0].getInt32(1*4+0,true)>>0);
var e=((g>>>20)&2047);
do{
if(((e>>0)===(0>>0))){
var e=(p[0>>0].getInt32(0,true)>>0);
if((((e|(g&2147483647))>>0)===(0>>0))){
var c=n;
return c;
}
var c=(n*18014398509481984);
p[0>>0].setFloat64(0,c,true);
var g=(p[0>>0].getInt32(1*4+0,true)>>0);
var e=((((g>>>20)&2047)>>0)+(-54>>0)>>0);
if(!(((l>>0)<(-50000>>0)))){
break;
}
var c=(c*1.0E-300);
return c;
}else{
var c=n;
}
}while(0);
if(((e>>0)===(2047>>0))){
var c=(c+c);
return c;
}
var e=((e>>0)+(l>>0)>>0);
if(((e>>0)>(2046>>0))){
var c=aB(1.0000000000000001E+300,c);
var c=(c*1.0000000000000001E+300);
return c;
}
if(((e>>0)>(0>>0))){
p[0>>0].setFloat64(0,c,true);
p[0>>0].setInt32(1*4+0,((g&-2146435073)|(e<<20)),true);
var c=(p[0>>0].getFloat64(0,true));
return c;
}
if(!(((e>>0)<(-53>>0)))){
p[0>>0].setFloat64(0,c,true);
p[0>>0].setInt32(1*4+0,((((e<<20)>>0)+(56623104>>0)>>0)|(g&-2146435073)),true);
var c=(p[0>>0].getFloat64(0,true));
var c=(c*5.5511151231257827E-17);
return c;
}
if(((l>>0)>(50000>>0))){
var c=aB(1.0000000000000001E+300,c);
var c=(c*1.0000000000000001E+300);
return c;
}else{
var c=aB(1.0E-300,c);
var c=(c*1.0E-300);
return c;
}
}
function aM(g){
var label=0;
var p=aSlot=[new DataView(new ArrayBuffer(8))];
var c=dg(g);
var e=(b6>>0);
if(((e>>0)===(-1>>0))){
return c;
}
var n=df(g);
if((((n>>0)===(0>>0))||(g>0))){
return c;
}
var l=(ac);
if((g===0)){
var c=(((e>>0)===(0>>0))?-3.4028234663852886E+38:-Infinity);
l.i0=(34>>0);
return c;
}else{
l.i0=(33>>0);
p[0>>0].setInt32(1*4+0,2146959360,true);
p[0>>0].setInt32(0,0,true);
var c=(p[0>>0].getFloat64(0,true));
return c;
}
}
function createArray_struct$p_Z5CArea(ret,start,end){
for(var __i__=start;__i__<end;__i__++)
ret[__i__]={a0:{a0:nullArray,a1:nullObj,a2:ret[__i__]={a0:nullObj}},i1:0,a2:ret[__i__]={i0:0,i1:0,i2:0}};
return ret;
}
function createArray_struct$p_Z12CBinary2Code(ret,start,end){
for(var __i__=start;__i__<end;__i__++)
ret[__i__]={i0:0,i1:0,i2:0};
return ret;
}
function createArray_struct$p_Z6CPoint(ret,start,end){
for(var __i__=start;__i__<end;__i__++)
ret[__i__]={d0:0,d1:0};
return ret;
}
function handleVAArg(ptr){var ret=ptr.d[ptr.o];ptr.o++;return ret;}
var a7;
var cm=new Uint8Array([82,101,97,100,121,46,10,0]);
var cj;
var ck=new Uint8Array([99,58,47,99,104,101,101,114,112,47,105,110,99,108,117,100,101,47,99,43,43,47,118,49,92,118,101,99,116,111,114,0]);
var cp=new Uint8Array([118,111,105,100,32,115,116,100,58,58,95,95,118,101,99,116,111,114,95,98,97,115,101,95,99,111,109,109,111,110,60,116,114,117,101,62,58,58,95,95,116,104,114,111,119,95,108,101,110,103,116,104,95,101,114,114,111,114,40,41,32,99,111,110,115,116,0]);
var cq=new Uint8Array([33,34,118,101,99,116,111,114,32,108,101,110,103,116,104,95,101,114,114,111,114,34,0]);
var ar={d:[{a0:nullObj,i1:0,i2:0,i3:0,i4:0,a5:{a0:nullObj,i1:0},i6:0,a7:null,a8:nullObj,a9:null,a10:null,a11:null,a12:null,a13:{a0:nullObj,i1:0},a14:nullObj,i15:0,a16:new Uint8Array(4),a17:{a0:nullObj,i1:0},i18:0,i19:0,i20:0,a21:{i0:0,a1:new DataView(new ArrayBuffer(8))},i22:0}],o:0};
var aq={d:[{a0:nullObj,i1:0,i2:0,i3:0,i4:0,a5:{a0:nullObj,i1:0},i6:0,a7:null,a8:nullObj,a9:null,a10:null,a11:null,a12:null,a13:{a0:nullObj,i1:0},a14:nullObj,i15:0,a16:new Uint8Array(4),a17:{a0:nullObj,i1:0},i18:0,i19:0,i20:0,a21:{i0:0,a1:new DataView(new ArrayBuffer(8))},i22:0}],o:0};
var as={d:[{a0:nullObj,i1:0,i2:0,i3:0,i4:0,a5:{a0:nullObj,i1:0},i6:0,a7:null,a8:nullObj,a9:null,a10:null,a11:null,a12:null,a13:{a0:nullObj,i1:0},a14:nullObj,i15:0,a16:new Uint8Array(4),a17:{a0:nullObj,i1:0},i18:0,i19:0,i20:0,a21:{i0:0,a1:new DataView(new ArrayBuffer(8))},i22:0}],o:0};
var ca=new Uint8Array([67,0]);
var ap={i0:0,a1:ar,a2:aq,a3:as,i4:0,a5:nullArray,i6:0,i7:0,a8:ca,a9:null,a10:null,i11:0,i12:0,a13:nullArray,a14:null,a15:null,a16:nullArray,a17:nullArray,a18:null,a19:{a0:null,i1:0,a2:[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],a3:null},a20:{a0:null,i1:0,a2:nullArray},a21:null,a22:null,a23:nullArray};
var ac=ap;
var cr=new Uint8Array([44,32,102,117,110,99,116,105,111,110,58,32,0]);
var cb=[0];
var cn=new Uint8Array([97,115,115,101,114,116,105,111,110,32,34,37,115,34,32,102,97,105,108,101,100,58,32,102,105,108,101,32,34,37,115,34,44,32,108,105,110,101,32,37,100,37,115,37,115,10,0]);
var cd=new Uint8Array([48,49,50,51,52,53,54,55,56,57,97,98,99,100,101,102,0]);
var cf=new Uint8Array([48,49,50,51,52,53,54,55,56,57,65,66,67,68,69,70,0]);
var ch=new Uint8Array([40,110,117,108,108,41,0]);
var ce=new Uint8Array([98,117,103,32,105,110,32,118,102,112,114,105,110,116,102,58,32,98,97,100,32,98,97,115,101,0]);
var cc=new Uint8Array([32,32,32,32,32,32,32,32,32,32,32,32,32,32,32,32]);
var cg=new Uint8Array([48,48,48,48,48,48,48,48,48,48,48,48,48,48,48,48]);
var co=new Uint8Array([118,111,105,100,32,115,116,100,58,58,95,95,118,101,99,116,111,114,95,98,97,115,101,95,99,111,109,109,111,110,60,116,114,117,101,62,58,58,95,95,116,104,114,111,119,95,111,117,116,95,111,102,95,114,97,110,103,101,40,41,32,99,111,110,115,116,0]);
var ci=new Uint8Array([33,34,118,101,99,116,111,114,32,111,117,116,95,111,102,95,114,97,110,103,101,34,0]);
var b6=1;
var cl=new Uint8Array([102,105,110,105,115,104,46,10,0]);