"use strict"
var aSlot=null;var nullArray=[null];var nullObj={d:nullArray,o:0};
function bc(f,g){
var label=0;
var c=(f.i0>>0);
if(((c>>0)===(0>>0))){
return ;
}
if((((c>>0)<=(g>>0))||((g>>0)<(-1>>0)))){
return ;
}
if(((g>>0)===(0>>0))){
var a=(f.a1);
var a=(a.a1);
f.a1=a;
f.a3=a;
var b=(f.i0>>0);
f.i0=(((b>>0)+(-1>>0)>>0)>>0);
return ;
}
if(!((((((c>>0)+(-1>>0)>>0)>>0)===(g>>0))||((g>>0)===(-1>>0))))){
var b=((g>>0)+(-1>>0)>>0);
L40:do{
if((((c>>0)<=(b>>0))||((g>>0)<(0>>0)))){
var a=null;
}else{
var a=(f.a1);
if((((g>>0)!==(1>>0))&&((b>>0)>(0>>0)))){
}else{
break;
}
while(1){
var a=(a.a1);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L40;
}
}
}
}while(0);
var d=(a.a1);
if((d===null)){
var b=c;
var d=null;
}else{
var d=(d.a1);
var b=(f.i0>>0);
}
a.a1=d;
f.i0=(((b>>0)+(-1>>0)>>0)>>0);
return ;
}
var b=((c>>0)+(-2>>0)>>0);
var e=(f.i0>>0);
do{
if(((e>>0)===(0>>0))){
var a=null;
}else{
if((((e>>0)<=(b>>0))||((b>>0)<(-1>>0)))){
var a=null;
break;
}
L53:do{
if((c>>0)===(2>>0)){
var a=(f.a1);
}else if((c>>0)===(1>>0)){
var a=(f.a2);
}else{
var a=(f.a1);
if(((b>>0)>(0>>0))){
}else{
break;
}
while(1){
var a=(a.a1);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L53;
}
}
}
}while(0);
if((a===null)){
var a=null;
break;
}
a.a1=null;
}
}while(0);
f.a2=a;
f.i0=(((e>>0)+(-1>>0)>>0)>>0);
return ;
}
function N(a,b){
var label=0;
var c=(b.i0>>0);
a.i0=(c>>0);
a.i2=(0>>0);
a.i1=(0>>0);
var j=(b.d1);
var f=((j<0)?-2147483648:0);
var i=(b.d2);
var g=((i<0)?-2147483648:0);
var d=Math.abs(i);
var e=Math.abs(j);
if((i===0)){
}else{
var d=(d+-1.0E-10);
}
if((j===0)){
}else{
var e=(e+-1.0E-10);
}
L21:do{
if(((c>>0)<(10>>0))){
var h=((9-c)>>0);
var c=((32-c)>>0);
var g=((((d>>0)>>>h)<<c)|g);
var f=((((e>>0)>>>h)<<c)|f);
}else{
if(((c>>0)<(16>>0))){
var h=((15-c)>>0);
var c=((32-c)>>0);
var g=((((d>>0)<<23)|g)|(((((d-(+((d>>0)>>0)))*60)>>0)>>>h)<<c));
var f=((((e>>0)<<23)|f)|(((((e-(+((e>>0)>>0)))*60)>>0)>>>h)<<c));
break;
}
var j=((d-(+((d>>0)>>0)))*60);
var i=((e-(+((e>>0)>>0)))*60);
var g=((((d>>0)<<23)|g)|((j>>0)<<17));
var f=((((e>>0)<<23)|f)|((i>>0)<<17));
var e=((j-(+((j>>0)>>0)))*60);
var d=((i-(+((i>>0)>>0)))*60);
var h=(e>>0);
if(((c>>0)<(22>>0))){
var k=((21-c)>>0);
var c=((32-c)>>0);
var g=(((h>>>k)<<c)|g);
var f=((((d>>0)>>>k)<<c)|f);
break;
}
var g=((h<<11)|g);
var f=(((d>>0)<<11)|f);
var h=((c>>0)+(-21>>0)>>0);
if(!(((h>>0)>(0>>0)))){
break;
}
var d=(d-(+((d>>0)>>0)));
var e=(e-(+((e>>0)>>0)));
var c=0;
while(1){
var e=(e*2);
var k=((10-c)>>0);
var g=(((e>>0)<<k)|g);
var d=(d*2);
var f=(((d>>0)<<k)|f);
var c=((c>>0)+(1>>0)>>0);
if(((c>>0)<(h>>0))){
var e=(e-(+((e>>0)>>0)));
var d=(d-(+((d>>0)>>0)));
}else{
break L21;
}
}
}
}while(0);
a.i2=(g>>0);
a.i1=(f>>0);
return a;
}
function aD(h,g){
var label=0;
var a=(g.i0>>0);
h.i0=(a>>0);
h.d2=0;
h.d1=0;
var d=(g.i2>>0);
var f=(g.i1>>0);
var e=(((d>>0)<(0>>0))?(d&2147483647):d);
var y=(((d>>0)<(0>>0))?-1:1);
var d=(((f>>0)<(0>>0))?(f&2147483647):f);
var w=(((f>>0)<(0>>0))?-1:1);
do{
if(((a>>0)<(10>>0))){
var f=((32-a)>>0);
var a=((9-a)>>0);
var b=(+(((e>>>f)<<a)>>0));
h.d2=b;
var c=(+(((d>>>f)<<a)>>0));
h.d1=c;
}else{
if(((a>>0)<(16>>0))){
var f=((41-a)>>0);
var a=((15-a)>>0);
var l=(((e<<9)>>>f)<<a);
var a=(((d<<9)>>>f)<<a);
var b=((+((e>>>23)>>0))+(((l>>0)>(60>>0))?1:((+(l>>0))/60)));
h.d2=b;
var c=((+((d>>>23)>>0))+(((a>>0)>(60>>0))?1:((+(a>>0))/60)));
h.d1=c;
break;
}
var f=(e>>>23);
var l=(d>>>23);
var k=((e>>>17)&63);
var j=((d>>>17)&63);
if(((a>>0)<(22>>0))){
var n=((47-a)>>0);
var a=((21-a)>>0);
var e=(((e<<15)>>>n)<<a);
var a=(((d<<15)>>>n)<<a);
var b=(((+(f>>0))+(((k>>>0)>(59>>>0))?1:((+(k>>0))/60)))+(((k>>>0)>(59>>>0))?0:(((e>>0)>(60>>0))?0.016666666666666666:((+(e>>0))/3600))));
h.d2=b;
var c=(((+(l>>0))+(((j>>>0)>(59>>>0))?1:((+(j>>0))/60)))+(((j>>>0)>(59>>>0))?0:(((a>>0)>(60>>0))?0.016666666666666666:((+(a>>0))/3600))));
h.d1=c;
break;
}
var n=((e>>>11)&63);
var t=((d>>>11)&63);
var o=((a>>0)+(-21>>0)>>0);
L24:do{
if(((o>>0)>(0>>0))){
var b=0;
var c=0;
var a=0;
while(1){
var p=((a>>0)+(21>>0)>>0);
var a=((a>>0)+(1>>0)>>0);
var i=P(1,a>>0);
var b=(b+((+(((e<<p)>>>31)>>>0))/i));
var i=P(1,a>>0);
var c=(c+((+(((d<<p)>>>31)>>>0))/i));
if(((a>>0)<(o>>0))){
}else{
break L24;
}
}
}else{
var b=0;
var c=0;
}
}while(0);
var a=(((k>>>0)>(59>>>0))?0:n);
var d=(((j>>>0)>(59>>>0))?0:t);
var b=((((((a>>>0)>(59>>>0))?60:(+(a>>0)))+(((a>>>0)>(59>>>0))?0:(((k>>>0)>(59>>>0))?0:b)))/3600)+((+(f>>0))+(((k>>>0)>(59>>>0))?1:((+(k>>0))/60))));
h.d2=b;
var c=((((((d>>>0)>(59>>>0))?60:(+(d>>0)))+(((d>>>0)>(59>>>0))?0:(((j>>>0)>(59>>>0))?0:c)))/3600)+((+(l>>0))+(((j>>>0)>(59>>>0))?1:((+(j>>0))/60))));
h.d1=c;
}
}while(0);
var b=(b+1.0E-10);
h.d2=b;
var i=(c+1.0E-10);
h.d1=i;
if((b>90)){
h.d2=90;
var c=90;
}else{
var c=b;
}
h.d2=(y*c);
if((i>180)){
h.d1=180;
var c=180;
}else{
var c=i;
}
h.d1=(w*c);
return h;
}
function Q(b,a){
var label=0;
var e=(a.i0>>0);
b.i0=(e>>0);
b.i2=(0>>0);
b.i1=(0>>0);
var n=(a.i2>>0);
var l=(a.i1>>0);
var w=((n>>31)|1);
var g=(((n>>0)<(0>>0))?(n^-2147483648):n);
var y=((l>>31)|1);
var j=(((l>>0)<(0>>0))?(l^-2147483648):l);
do{
if(((e>>0)<(10>>0))){
var d=((32-e)>>0);
var c=(g>>>d);
b.i1=(c>>0);
var d=(j>>>d);
b.i2=(d>>0);
}else{
if(((e>>0)<(16>>0))){
var d=(59>>>((15-e)>>0));
var i=((d>>0)+(1>>0)>>0);
var c=((41-e)>>0);
var e=((g<<9)>>>c);
var k=((j<<9)>>>c);
var c=(((((e>>0)>(d>>0))?d:e)>>0)+((mathimul((g>>>23),i)>>0)>>0)>>0);
b.i1=(c>>0);
var d=(((((k>>0)>(d>>0))?d:k)>>0)+((mathimul((j>>>23),i)>>0)>>0)>>0);
b.i2=(d>>0);
break;
}
var d=(g>>>23);
if(((e>>0)<(22>>0))){
var i=(59>>>((21-e)>>0));
var c=((i>>0)+(1>>0)>>0);
var k=(mathimul(c,60)>>0);
var f=(mathimul(((g>>>17)&63),c)>>0);
var p=(mathimul(((j>>>17)&63),c)>>0);
var c=((47-e)>>0);
var e=((g<<15)>>>c);
var g=((j<<15)>>>c);
var o=(((mathimul(i,60)>>0)>>0)+(59>>0)>>0);
var c=(((p>>0)>(o>>0))&&((f>>0)>(59>>0)))?1:0;
var c=((((((c>>0)?o:f)>>0)+((mathimul(k,d)>>0)>>0)>>0)>>0)+(((c>>0)?0:(((e>>0)>(i>>0))?i:e))>>0)>>0);
b.i1=(c>>0);
var d=(((((((p>>0)>(o>>0))?o:p)>>0)+((mathimul(k,(j>>>23))>>0)>>0)>>0)>>0)+((((p>>0)>(o>>0))?0:(((g>>0)>(i>>0))?i:g))>>0)>>0);
b.i2=(d>>0);
break;
}
var f=((e>>0)+(-21>>0)>>0);
var h=P(1,f>>0);
var p=(mathimul((mathimul(d,3600)>>0),(h>>0))>>0);
var h=P(1,f>>0);
var o=(mathimul((mathimul((j>>>23),3600)>>0),(h>>0))>>0);
var h=P(1,f>>0);
var d=(mathimul((mathimul(((g>>>17)&63),60)>>0),(h>>0))>>0);
var h=P(1,f>>0);
var i=(mathimul((mathimul(((j>>>17)&63),60)>>0),(h>>0))>>0);
var h=P(1,f>>0);
var c=(mathimul((h>>0),((g>>>11)&63))>>0);
var h=P(1,f>>0);
var k=(mathimul((h>>0),((j>>>11)&63))>>0);
var t=((53-e)>>0);
var e=((g<<21)>>>t);
var g=((j<<21)>>>t);
var h=P(1,f>>0);
if(((d>>0)>((((mathimul((h>>0),3600)>>0)>>0)+(-1>>0)>>0)>>0))){
var h=P(1,f>>0);
var d=(((mathimul((h>>0),3600)>>0)>>0)+(-1>>0)>>0);
var e=0;
var c=0;
}else{
}
var h=P(1,f>>0);
if(((i>>0)>((((mathimul((h>>0),3600)>>0)>>0)+(-1>>0)>>0)>>0))){
var h=P(1,f>>0);
var i=(((mathimul((h>>0),3600)>>0)>>0)+(-1>>0)>>0);
var g=0;
var k=0;
}else{
}
var h=P(1,f>>0);
if(((c>>0)>((((mathimul((h>>0),60)>>0)>>0)+(-1>>0)>>0)>>0))){
var h=P(1,f>>0);
var c=(((mathimul((h>>0),60)>>0)>>0)+(-1>>0)>>0);
var e=0;
}else{
}
var h=P(1,f>>0);
if(((k>>0)>((((mathimul((h>>0),60)>>0)>>0)+(-1>>0)>>0)>>0))){
var h=P(1,f>>0);
var k=(((mathimul((h>>0),60)>>0)>>0)+(-1>>0)>>0);
var g=0;
}else{
}
var c=((((((d>>0)+(p>>0)>>0)>>0)+(c>>0)>>0)>>0)+(e>>0)>>0);
b.i1=(c>>0);
var d=((((((i>>0)+(o>>0)>>0)>>0)+(k>>0)>>0)>>0)+(g>>0)>>0);
b.i2=(d>>0);
}
}while(0);
b.i1=((mathimul(((c>>0)+((n>>>31)>>0)>>0),w)>>0)>>0);
b.i2=((mathimul(((d>>0)+((l>>>31)>>0)>>0),y)>>0)>>0);
return b;
}
function ac(b,c){
var label=0;
var d=(c.i0>>0);
b.i0=(d>>0);
b.i2=(0>>0);
b.i1=(0>>0);
var e=(c.i2>>0);
var j=(c.i1>>0);
var g=(((((e>>0)>(-1>>0))?e:((0-e)>>0))>>0)+((e>>31)>>0)>>0);
var e=(e&-2147483648);
var f=(((((j>>0)>(-1>>0))?j:((0-j)>>0))>>0)+((j>>31)>>0)>>0);
var j=(j&-2147483648);
do{
if(((d>>0)<(10>>0))){
var a=((32-d)>>0);
var d=((f<<a)|j);
var e=((g<<a)|e);
}else{
if(((d>>0)<(16>>0))){
var a=(((59>>>((15-d)>>0))>>0)+(1>>0)>>0);
var i=(((f>>0)/(a>>0))>>0);
var l=(((g>>0)/(a>>0))>>0);
var k=((32-d)>>0);
var d=(((i<<23)|j)|(((f-(mathimul(i,a)>>0))>>0)<<k));
var e=(((l<<23)|e)|(((g-(mathimul(l,a)>>0))>>0)<<k));
break;
}
if(((d>>0)<(22>>0))){
var a=(59>>>((21-d)>>0));
var i=(((mathimul(a,60)>>0)>>0)+(60>>0)>>0);
var l=(((f>>0)/(i>>0))>>0);
var k=(((g>>0)/(i>>0))>>0);
var f=((f-(mathimul(l,i)>>0))>>0);
var g=((g-(mathimul(k,i)>>0))>>0);
var a=((a>>0)+(1>>0)>>0);
var i=(((f>>0)/(a>>0))>>0);
var n=(((g>>0)/(a>>0))>>0);
var o=((32-d)>>0);
var d=((((l<<23)|j)|(i<<17))|(((f-(mathimul(i,a)>>0))>>0)<<o));
var e=((((k<<23)|e)|(n<<17))|(((g-(mathimul(n,a)>>0))>>0)<<o));
break;
}else{
var a=((d>>0)+(-21>>0)>>0);
var h=P(1,a>>0);
var i=(((f>>0)/((mathimul((h>>0),3600)>>0)>>0))>>0);
var h=P(1,a>>0);
var l=(((g>>0)/((mathimul((h>>0),3600)>>0)>>0))>>0);
var h=P(1,a>>0);
var f=((f-(mathimul((mathimul(i,3600)>>0),(h>>0))>>0))>>0);
var h=P(1,a>>0);
var g=((g-(mathimul((mathimul(l,3600)>>0),(h>>0))>>0))>>0);
var h=P(1,a>>0);
var k=(((f>>0)/((mathimul((h>>0),60)>>0)>>0))>>0);
var h=P(1,a>>0);
var n=(((g>>0)/((mathimul((h>>0),60)>>0)>>0))>>0);
var h=P(1,a>>0);
var f=((f-(mathimul((mathimul(k,60)>>0),(h>>0))>>0))>>0);
var h=P(1,a>>0);
var g=((g-(mathimul((mathimul(n,60)>>0),(h>>0))>>0))>>0);
var h=P(1,a>>0);
var o=(((f>>0)/((h>>0)>>0))>>0);
var h=P(1,a>>0);
var p=(((g>>0)/((h>>0)>>0))>>0);
var h=P(1,a>>0);
var t=P(1,a>>0);
var a=((32-d)>>0);
var d=(((((i<<23)|j)|(k<<17))|(o<<11))|(((f-(mathimul((h>>0),o)>>0))>>0)<<a));
var e=(((((l<<23)|e)|(n<<17))|(p<<11))|(((g-(mathimul((t>>0),p)>>0))>>0)<<a));
break;
}
}
}while(0);
b.i2=(d>>0);
b.i1=(e>>0);
return b;
}
function an(e,b,d,c){
var label=0;
var l=aSlot={i0:0,i1:0,i2:0};
var n=l;
var k=aSlot={i0:0,i1:0,i2:0};
var h=aSlot={i0:0,i1:0,i2:0};
var o=aSlot={i0:0,i1:0,i2:0};
var j=aSlot={i0:0,d1:0,d2:0};
var g=(b.i0>>0);
k.i0=(g>>0);
k.i1=((b.i1>>0)>>0);
k.i2=((b.i2>>0)>>0);
Q(l,k);
var a=(l.i2>>0);
var a=((a>>0)+(d>>0)>>0);
l.i2=(a>>0);
var i=(l.i1>>0);
var i=((i>>0)+(c>>0)>>0);
l.i1=(i>>0);
j.i0=(g>>0);
j.d1=179.99999999990001;
j.d2=89.999999999899998;
N(o,j);
Q(h,o);
var g=(h.i1>>0);
var f=(h.i2>>0);
do{
if(((d>>0)===(0>>0))){
}else{
if(((a>>0)>(f>>0))){
var p=(f<<1);
var f=((a-f)>>0);
var a=((((((((a>>0)+(-2>>0)>>0)-p)>>0)-f)>>0)>>0)+((((f>>0)%(((p>>0)+(2>>0)>>0)>>0))>>0)>>0)>>0);
l.i2=(a>>0);
break;
}
if(!(((a>>0)<((f^-1)>>0)))){
break;
}
var p=((((a>>0)+(1>>0)>>0)>>0)+(f>>0)>>0);
var f=(((f<<1)>>0)+(2>>0)>>0);
var a=((((((p>>0)+(a>>0)>>0)>>0)+(f>>0)>>0)-(((p>>0)%(f>>0))>>0))>>0);
l.i2=(a>>0);
}
}while(0);
do{
if((((i>>0)>(g>>0))&&((((c>>0)===(0>>0))?1:0)^1))){
l.i1=(g>>0);
var i=g;
}else{
if(((c>>0)===(0>>0))){
break;
}
var g=(g^-1);
if(!(((i>>0)<(g>>0)))){
break;
}
l.i1=(g>>0);
var i=g;
}
}while(0);
h.i0=((l.i0>>0)>>0);
h.i1=(i>>0);
h.i2=(a>>0);
ac(n,h);
var a=(n.i0>>0);
var i=(n.i1>>0);
var g=(n.i2>>0);
e.i0=(a>>0);
e.i1=(i>>0);
e.i2=(g>>0);
return e;
}
function ad(b,a){
var label=0;
var h=aSlot={i0:0,d1:0,d2:0};
var g=aSlot={i0:0,i1:0,i2:0};
var e=aSlot={i0:0,i1:0,i2:0};
var d=(a.i2>>0);
var c=(a.i1>>0);
var l=(((d>>0)<(0>>0))?(d^-2147483648):d);
var k=(((d>>0)<(0>>0))?-1:1);
var n=(((c>>0)<(0>>0))?-1:1);
var d=(((c>>0)<(0>>0))?(c^-2147483648):c);
var c=(a.i0>>0);
g.i0=(c>>0);
g.i1=(d>>0);
g.i2=(l>>0);
aD(h,g);
var f=(h.d1);
var j=(h.d2);
var j=(k*j);
var p=(n*f);
var i=((32-c)>>0);
var o=((((l>>>i)>>0)+(1>>0)>>0)<<i);
a.i2=(o>>0);
var i=((((d>>>i)>>0)+(1>>0)>>0)<<i);
a.i1=(i>>0);
e.i0=(c>>0);
e.i1=(i>>0);
e.i2=(o>>0);
aD(h,e);
var t=(h.d1);
do{
if(((l>>0)<(0>>0))){
var c=(j>>0);
var c=(((c>>0)>(-1>>0))?c:((0-c)>>0));
if(!(((c>>0)<(90>>0)))){
var f=90;
break;
}
var f=(+(c>>0));
}else{
var f=(h.d2);
}
}while(0);
var k=(k*f);
do{
if(((d>>0)<(0>>0))){
var d=(p>>0);
var d=(((d>>0)>(-1>>0))?d:((0-d)>>0));
if(!(((d>>0)<(180>>0)))){
var f=180;
break;
}
var f=(+(d>>0));
}else{
var f=t;
}
}while(0);
b.d0=p;
b.d1=j;
b.d2=(n*f);
b.d3=k;
return b;
}
function bl(n){
var label=0;
var f=(n.i0>>0);
var d=createArray_struct$p_Z7GCode2D([],0,(mathimul(f,12)>>0)/12);
var j={i0:0,a1:null,a2:null,a3:null};
j.i0=(0>>0);
j.a1=null;
j.a2=null;
j.a3=null;
var a=(n.a1);
L20:do{
if(!((a===null))){
var b=0;
while(1){
d[(0>>0)+(b>>0)>>0].i0=((a.a0.i0>>0)>>0);
d[(0>>0)+(b>>0)>>0].i1=((a.a0.i1>>0)>>0);
d[(0>>0)+(b>>0)>>0].i2=((a.a0.i2>>0)>>0);
var a=(a.a1);
if((a===null)){
break L20;
}else{
var b=((b>>0)+(1>>0)>>0);
}
}
}
}while(0);
var a=createArray_struct$p_Z7GCode1D([],0,(f<<3)/8);
if(((f>>0)>(0>>0))){
var b=0;
}else{
return j;
}
while(1){
var g=(d[(0>>0)+(b>>0)>>0].i0>>0);
var k=(d[(0>>0)+(b>>0)>>0].i1>>0);
var e=(d[(0>>0)+(b>>0)>>0].i2>>0);
L28:do{
if(((g>>0)>(0>>0))){
var h=0;
var c=0;
while(1){
var i=(c<<1);
var h=(((((((k<<c)>>>31)<<((62-i)>>0))>>0)+(h>>0)>>0)>>0)+((((e<<c)>>>31)<<((63-i)>>0))>>0)>>0);
var c=((c>>0)+(1>>0)>>0);
if(((c>>0)<(g>>0))){
}else{
break L28;
}
}
}else{
var h=0;
}
}while(0);
a[(0>>0)+(b>>0)>>0].i0=(g>>0);
a[(0>>0)+(b>>0)>>0].i1=(h>>0);
var b=((b>>0)+(1>>0)>>0);
if(((b>>0)<(f>>0))){
}else{
break;
}
}
var h=((f>>0)+(-1>>0)>>0);
var b=0;
while(1){
var g=((h-b)>>0);
L35:do{
if(((g>>0)>(0>>0))){
var c=0;
while(1){
var k=(a[(0>>0)+(c>>0)>>0].i1>>0);
var e=((c>>0)+(1>>0)>>0);
var i=(a[(0>>0)+(e>>0)>>0].i1>>0);
if(((k>>>0)>(i>>>0))){
var l=(a[(0>>0)+(c>>0)>>0].i0>>0);
a[(0>>0)+(c>>0)>>0].i0=((a[(0>>0)+(e>>0)>>0].i0>>0)>>0);
a[(0>>0)+(c>>0)>>0].i1=(i>>0);
a[(0>>0)+(e>>0)>>0].i0=(l>>0);
a[(0>>0)+(e>>0)>>0].i1=(k>>0);
var k=(d[(0>>0)+(c>>0)>>0].i0>>0);
var i=(d[(0>>0)+(c>>0)>>0].i1>>0);
var l=(d[(0>>0)+(c>>0)>>0].i2>>0);
d[(0>>0)+(c>>0)>>0].i0=((d[(0>>0)+(e>>0)>>0].i0>>0)>>0);
d[(0>>0)+(c>>0)>>0].i1=((d[(0>>0)+(e>>0)>>0].i1>>0)>>0);
d[(0>>0)+(c>>0)>>0].i2=((d[(0>>0)+(e>>0)>>0].i2>>0)>>0);
d[(0>>0)+(e>>0)>>0].i0=(k>>0);
d[(0>>0)+(e>>0)>>0].i1=(i>>0);
d[(0>>0)+(e>>0)>>0].i2=(l>>0);
}
if(((e>>0)<(g>>0))){
var c=e;
}else{
break L35;
}
}
}
}while(0);
var b=((b>>0)+(1>>0)>>0);
if(((b>>0)<(f>>0))){
}else{
var b=0;
break;
}
}
while(1){
var c=(d[(0>>0)+(b>>0)>>0].i0>>0);
var h=(d[(0>>0)+(b>>0)>>0].i1>>0);
var g=(d[(0>>0)+(b>>0)>>0].i2>>0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(c>>0);
a.a0.i1=(h>>0);
a.a0.i2=(g>>0);
a.a1=null;
var c=(j.i0>>0);
if(((c>>0)===(0>>0))){
j.a3=a;
j.a1=a;
j.a2=a;
var c=1;
}else{
var o=(j.a2);
o.a1=a;
j.a2=a;
var c=((c>>0)+(1>>0)>>0);
}
j.i0=(c>>0);
var b=((b>>0)+(1>>0)>>0);
if(((b>>0)<(f>>0))){
}else{
break;
}
}
return j;
}
function aQ(h,j,g,i,k){
var label=0;
var a=aSlot={i0:0,i1:0,i2:0};
var d=aSlot={i0:0,d1:0,d2:0};
var c=aSlot={i0:0,d1:0,d2:0};
var b=aSlot={i0:0,d1:0,d2:0};
var o=(i+1.0E-8);
var p=(j+1.0E-8);
d.i0=(32>>0);
d.d1=(g+-1.0E-8);
d.d2=(k+-1.0E-8);
N(a,d);
var f=(a.i1>>0);
var e=(a.i2>>0);
c.i0=(32>>0);
c.d1=p;
c.d2=o;
N(a,c);
var n=(a.i1>>0);
var l=(a.i2>>0);
if(((e>>0)===(l>>0))){
var e=32;
}else{
var t=Math.log((+((l^e)>>>0)));
var e=((31-((t/0.69314718055994529)>>0))>>0);
}
if(((f>>0)===(n>>0))){
var f=32;
}else{
var t=Math.log((+((n^f)>>>0)));
var f=((31-((t/0.69314718055994529)>>0))>>0);
}
b.i0=((((e>>0)<(f>>0))?e:f)>>0);
b.d1=p;
b.d2=o;
N(a,b);
h.i0=((a.i0>>0)>>0);
h.i1=((a.i1>>0)>>0);
h.i2=((a.i2>>0)>>0);
return h;
}
function bk(aC,az,aE){
var label=0;
var a=aSlot={i0:0,i1:0,i2:0};
var o=a;
var V=a;
var al=a;
var l=a;
var I=a;
var A=a;
var E=a;
var p=a;
var W=a;
var aq=a;
var C=a;
var D=a;
var ae=aSlot={i0:0,i1:0,i2:0};
var O=aSlot={i0:0,d1:0,d2:0};
var aa=aSlot={i0:0,i1:0,i2:0};
var K=aSlot={i0:0,d1:0,d2:0};
var b=aSlot={i0:0,i1:0,i2:0};
var t=aSlot={d0:0,d1:0,d2:0,d3:0};
var f=aSlot={i0:0,d1:0,d2:0};
var ar=aSlot={i0:0,i1:0,i2:0};
var as=aSlot={i0:0,i1:0,i2:0};
var T={i0:0,a1:null,a2:null,a3:null};
T.i0=(0>>0);
T.a1=null;
T.a2=null;
T.a3=null;
var w=(aC.d1);
var i=(aC.d0);
O.i0=(aE>>0);
O.d1=i;
O.d2=w;
N(ae,O);
Q(a,ae);
var e=(a.i1>>0);
var h=(a.i2>>0);
var k=(az.d1);
var y=(az.d0);
K.i0=(aE>>0);
K.d1=y;
K.d2=k;
N(aa,K);
Q(a,aa);
var c=(a.i1>>0);
var g=(a.i2>>0);
L42:do{
if(((h>>0)===(g>>0))){
var d=(((e>>0)>(c>>0))?c:e);
var e=(((e>>0)>(c>>0))?e:c);
while(1){
b.i0=(aE>>0);
b.i1=(d>>0);
b.i2=(h>>0);
ac(D,b);
var c=(D.i0>>0);
var g=(D.i1>>0);
var j=(D.i2>>0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(c>>0);
a.a0.i1=(g>>0);
a.a0.i2=(j>>0);
a.a1=null;
var c=(T.i0>>0);
if(((c>>0)===(0>>0))){
T.a3=a;
T.a1=a;
T.a2=a;
var c=1;
}else{
var o=(T.a2);
o.a1=a;
T.a2=a;
var c=((c>>0)+(1>>0)>>0);
}
T.i0=(c>>0);
var c=((d>>0)+(1>>0)>>0);
if(((d>>0)<(e>>0))){
var d=c;
}else{
break L42;
}
}
}else{
if(((e>>0)===(c>>0))){
var d=(((h>>0)>(g>>0))?g:h);
var h=(((h>>0)>(g>>0))?h:g);
while(1){
b.i0=(aE>>0);
b.i1=(e>>0);
b.i2=(d>>0);
ac(C,b);
var c=(C.i0>>0);
var g=(C.i1>>0);
var j=(C.i2>>0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(c>>0);
a.a0.i1=(g>>0);
a.a0.i2=(j>>0);
a.a1=null;
var c=(T.i0>>0);
if(((c>>0)===(0>>0))){
T.a3=a;
T.a1=a;
T.a2=a;
var c=1;
}else{
var o=(T.a2);
o.a1=a;
T.a2=a;
var c=((c>>0)+(1>>0)>>0);
}
T.i0=(c>>0);
var c=((d>>0)+(1>>0)>>0);
if(((d>>0)<(h>>0))){
var d=c;
}else{
break L42;
}
}
}
var j=(((e>>0)>(c>>0))?g:h);
var S=(((e>>0)>(c>>0))?c:e);
var R=(((e>>0)>(c>>0))?e:c);
var h=(((e>>0)>(c>>0))?h:g);
b.i0=(aE>>0);
b.i1=(S>>0);
b.i2=(0>>0);
ac(aq,b);
ad(t,aq);
if((i!==y)){
var n=(t.d3);
var ak=((w-k)/(i-y));
var n=(((n+-1.0E-10)-(w-(i*ak)))/ak);
}else{
var n=i;
}
f.i0=(aE>>0);
f.d1=n;
f.d2=k;
N(W,f);
Q(b,W);
var e=(b.i2>>0);
var d=(((e>>0)>(j>>0))?j:e);
var g=(((e>>0)>(j>>0))?e:j);
var at=((j>>0)>(e>>0))?1:0;
var c=(j^-1);
var aj=(e^-1);
var aj=((((c>>0)>(aj>>0))?c:aj)^-1);
while(1){
b.i0=(aE>>0);
b.i1=(S>>0);
b.i2=(d>>0);
ac(p,b);
var c=(p.i0>>0);
var a3=(p.i1>>0);
var aR=(p.i2>>0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(c>>0);
a.a0.i1=(a3>>0);
a.a0.i2=(aR>>0);
a.a1=null;
var c=(T.i0>>0);
if(((c>>0)===(0>>0))){
T.a3=a;
T.a1=a;
T.a2=a;
var c=1;
}else{
var W=(T.a2);
W.a1=a;
T.a2=a;
var c=((c>>0)+(1>>0)>>0);
}
T.i0=(c>>0);
var c=((d>>0)+(1>>0)>>0);
if(((d>>0)<(g>>0))){
var d=c;
}else{
break;
}
}
var d=((at>>0)?j:e);
var g=(((d>>0)>(aj>>0))?d:aj);
var d=((S>>0)+(1>>0)>>0);
L70:do{
if(((d>>0)<(R>>0))){
var n=((w-k)/(i-y));
var ak=(w-(i*n));
if((i!==y)){
while(1){
b.i0=(aE>>0);
b.i1=(d>>0);
b.i2=(g>>0);
ac(E,b);
ad(t,E);
var af=(t.d3);
var ah=(t.d1);
var ah=(((ah+1.0E-10)-ak)/n);
var af=(((af+-1.0E-10)-ak)/n);
f.i0=(aE>>0);
f.d1=((ah>af)?af:ah);
f.d2=k;
N(A,f);
Q(ar,A);
var c=(ar.i2>>0);
f.i0=(aE>>0);
f.d1=((ah>af)?ah:af);
f.d2=k;
N(I,f);
Q(as,I);
var j=(as.i2>>0);
L75:do{
if(!(((c>>0)>(j>>0)))){
while(1){
b.i0=(aE>>0);
b.i1=(d>>0);
b.i2=(g>>0);
ac(l,b);
var e=(l.i0>>0);
var S=(l.i1>>0);
var at=(l.i2>>0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(e>>0);
a.a0.i1=(S>>0);
a.a0.i2=(at>>0);
a.a1=null;
var e=(T.i0>>0);
if(((e>>0)===(0>>0))){
T.a3=a;
T.a1=a;
T.a2=a;
var e=1;
}else{
var p=(T.a2);
p.a1=a;
T.a2=a;
var e=((e>>0)+(1>>0)>>0);
}
T.i0=(e>>0);
var e=((c>>0)+(1>>0)>>0);
if(((c>>0)<(j>>0))){
var c=e;
}else{
break L75;
}
}
}
}while(0);
var d=((d>>0)+(1>>0)>>0);
if(((d>>0)<(R>>0))){
}else{
break L70;
}
}
}else{
while(1){
b.i0=(aE>>0);
b.i1=(d>>0);
b.i2=(g>>0);
ac(E,b);
ad(t,E);
f.i0=(aE>>0);
f.d1=i;
f.d2=k;
N(A,f);
Q(ar,A);
var c=(ar.i2>>0);
f.i0=(aE>>0);
f.d1=i;
f.d2=k;
N(I,f);
Q(as,I);
var j=(as.i2>>0);
L85:do{
if(!(((c>>0)>(j>>0)))){
while(1){
b.i0=(aE>>0);
b.i1=(d>>0);
b.i2=(g>>0);
ac(l,b);
var e=(l.i0>>0);
var S=(l.i1>>0);
var at=(l.i2>>0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(e>>0);
a.a0.i1=(S>>0);
a.a0.i2=(at>>0);
a.a1=null;
var e=(T.i0>>0);
if(((e>>0)===(0>>0))){
T.a3=a;
T.a1=a;
T.a2=a;
var e=1;
}else{
var p=(T.a2);
p.a1=a;
T.a2=a;
var e=((e>>0)+(1>>0)>>0);
}
T.i0=(e>>0);
var e=((c>>0)+(1>>0)>>0);
if(((c>>0)<(j>>0))){
var c=e;
}else{
break L85;
}
}
}
}while(0);
var d=((d>>0)+(1>>0)>>0);
if(((d>>0)<(R>>0))){
}else{
break L70;
}
}
}
}
}while(0);
b.i0=(aE>>0);
b.i1=(R>>0);
b.i2=(g>>0);
ac(al,b);
ad(t,al);
if((i!==y)){
var n=(t.d1);
var y=((w-k)/(i-y));
var n=(((n+1.0E-10)-(w-(i*y)))/y);
}else{
var n=i;
}
f.i0=(aE>>0);
f.d1=n;
f.d2=k;
N(V,f);
Q(b,V);
var c=(b.i2>>0);
var d=(((c>>0)>(h>>0))?h:c);
var e=(((c>>0)>(h>>0))?c:h);
while(1){
b.i0=(aE>>0);
b.i1=(R>>0);
b.i2=(d>>0);
ac(o,b);
var c=(o.i0>>0);
var h=(o.i1>>0);
var g=(o.i2>>0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(c>>0);
a.a0.i1=(h>>0);
a.a0.i2=(g>>0);
a.a1=null;
var c=(T.i0>>0);
if(((c>>0)===(0>>0))){
T.a3=a;
T.a1=a;
T.a2=a;
var c=1;
}else{
var V=(T.a2);
V.a1=a;
T.a2=a;
var c=((c>>0)+(1>>0)>>0);
}
T.i0=(c>>0);
var c=((d>>0)+(1>>0)>>0);
if(((d>>0)<(e>>0))){
var d=c;
}else{
break L42;
}
}
}
}while(0);
return T;
}
function bR(p,q,n,o){
var label=0;
var a=aSlot={i0:0,i1:0,i2:0};
var e=aSlot={i0:0,d1:0,d2:0};
var d=aSlot={d0:0,d1:0};
var f=aSlot={d0:0,d1:0};
var g={i0:0,a1:null,a2:null,a3:null};
g.i0=(0>>0);
g.a1=null;
g.a2=null;
g.a3=null;
var l=(p[q>>0].d0);
var k=(p[q>>0].d1);
e.i0=(o>>0);
e.d1=l;
e.d2=k;
N(a,e);
var b=(a.i0>>0);
var c=(a.i1>>0);
var i=(a.i2>>0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(b>>0);
a.a0.i1=(c>>0);
a.a0.i2=(i>>0);
a.a1=null;
var b=(g.i0>>0);
if(((b>>0)===(0>>0))){
g.a3=a;
g.a1=a;
g.a2=a;
var b=1;
}else{
var h=(g.a2);
h.a1=a;
g.a2=a;
var b=((b>>0)+(1>>0)>>0);
}
g.i0=(b>>0);
L22:do{
if(((n>>0)>(1>>0))){
var a=null;
var b=1;
while(1){
if(!((a===null))){
var c=(a.i0>>0);
L28:do{
if((((c>>0)!==(0>>0))&&((c>>0)>(0>>0)))){
var a=(a.a1);
while(1){
var a=(a.a1);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L28;
}
}
}
}while(0);
}
var c=((b>>0)+(-1>>0)>>0);
d.d0=(p[(q>>0)+(c>>0)>>0].d0);
d.d1=(p[(q>>0)+(c>>0)>>0].d1);
f.d0=(p[(q>>0)+(b>>0)>>0].d0);
f.d1=(p[(q>>0)+(b>>0)>>0].d1);
var a=bk(d,f,o>>0);
var c=(a.i0>>0);
var i=(g.i0>>0);
g.i0=(((i>>0)+(c>>0)>>0)>>0);
var h=(a.a1);
var j=(g.a2);
j.a1=h;
g.a2=(a.a2);
a.i0=(0>>0);
a.a1=null;
a.a2=null;
a.a3=null;
var b=((b>>0)+(1>>0)>>0);
if(((b>>0)<(n>>0))){
}else{
break L22;
}
}
}
}while(0);
var d=aX(g);
var b=(g.i0>>0);
if(!(((b>>0)>(0>>0)))){
return d;
}
var a=(g.a1);
while(1){
var a=(a.a1);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break;
}
}
return d;
}
function aX(j){
var label=0;
var g={i0:0,a1:null,a2:null,a3:null};
g.i0=(0>>0);
g.a1=null;
g.a2=null;
g.a3=null;
var a=(j.a1);
if((a===null)){
return g;
}else{
}
while(1){
var c=(a.a0.i0>>0);
var b=(a.a0.i1>>0);
var f=(a.a0.i2>>0);
var d={a0:{i0:0,i1:0,i2:0},a1:null};
d.a0.i0=(c>>0);
d.a0.i1=(b>>0);
d.a0.i2=(f>>0);
d.a1=null;
var c=(g.i0>>0);
if(((c>>0)===(0>>0))){
g.a3=d;
g.a1=d;
g.a2=d;
var c=1;
}else{
var w=(g.a2);
w.a1=d;
g.a2=d;
var c=((c>>0)+(1>>0)>>0);
}
g.i0=(c>>0);
var a=(a.a1);
if((a===null)){
break;
}else{
}
}
if(((((c>>0)+(-1>>0)>>0)>>0)>(0>>0))){
var b=c;
var c=0;
}else{
return g;
}
while(1){
var i=((c>>0)+(1>>0)>>0);
L49:do{
if(((i>>0)<(b>>0))){
var A=((c>>0)>(0>>0))?1:0;
var h=b;
var f=c;
var b=i;
while(1){
var o=(g.i0>>0);
var C=((o>>0)===(0>>0))?1:0;
var y=((o>>0)>(c>>0))?1:0;
while(1){
do{
if((C>>0)){
var n=-1;
var k=0;
var l=0;
var e=-1;
label=28;
}else{
do{
if((y>>0)){
L59:do{
if((c>>0)===(0>>0)){
var a=(g.a1);
}else if((c>>0)===(-1>>0)){
var a=(g.a2);
}else{
var a=(g.a1);
if((A>>0)){
var e=c;
}else{
break;
}
while(1){
var a=(a.a1);
var e=((e>>0)+(-1>>0)>>0);
if(((e>>0)>(0>>0))){
}else{
break L59;
}
}
}
}while(0);
if((a===null)){
var q=0;
var k=0;
var n=-1;
break;
}
var n=(a.a0.i0>>0);
var k=(a.a0.i1>>0);
var q=(a.a0.i2>>0);
}else{
var q=0;
var k=0;
var n=-1;
}
}while(0);
do{
if((((o>>0)<=(b>>0))||((b>>0)<(-1>>0)))){
var e=-1;
var l=0;
var t=0;
}else{
L70:do{
if((f>>0)===(-1>>0)){
var a=(g.a1);
}else if((f>>0)===(-2>>0)){
var a=(g.a2);
}else{
var a=(g.a1);
if(((f>>0)>(-1>>0))){
var e=b;
}else{
break;
}
while(1){
var a=(a.a1);
var e=((e>>0)+(-1>>0)>>0);
if(((e>>0)>(0>>0))){
}else{
break L70;
}
}
}
}while(0);
if((a===null)){
var e=-1;
var l=0;
var t=0;
break;
}
var e=(a.a0.i0>>0);
var l=(a.a0.i1>>0);
var t=(a.a0.i2>>0);
}
}while(0);
if(((q>>0)===(t>>0))){
label=28;
break;
}else{
break;
}
}
}while(0);
if(label===28){
label=0;
if((((k>>0)===(l>>0))&&((n>>0)===(e>>0)))){
break;
}
}
var f=((b>>0)+(1>>0)>>0);
if(((f>>0)<(h>>0))){
var aB=b;
var b=f;
var f=aB;
}else{
var b=h;
break L49;
}
}
bc(g,b>>0);
var h=((h>>0)+(-1>>0)>>0);
var b=((f>>0)+(1>>0)>>0);
if(((b>>0)<(h>>0))){
}else{
var b=h;
break L49;
}
}
}else{
}
}while(0);
if(((i>>0)<(((b>>0)+(-1>>0)>>0)>>0))){
var c=i;
}else{
break;
}
}
return g;
}
function aK(K,M,O,I){
var label=0;
var o=aSlot={i0:0,d1:0,d2:0};
var y=aSlot={i0:0,i1:0,i2:0};
var S=aSlot={i0:0,i1:0,i2:0};
var R={i0:0,a1:null,a2:null,a3:null};
R.i0=(0>>0);
R.a1=null;
R.a2=null;
R.a3=null;
var V={i0:0,a1:null,a2:null,a3:null};
V.i0=(0>>0);
V.a1=null;
V.a2=null;
V.a3=null;
var W={i0:0,a1:null,a2:null,a3:null};
W.i0=(0>>0);
W.a1=null;
W.a2=null;
W.a3=null;
var T={i0:0,a1:null,a2:null,a3:null};
T.i0=(0>>0);
T.a1=null;
T.a2=null;
T.a3=null;
var j=(K[M>>0].d1);
var g=(K[M>>0].d0);
L176:do{
if(((O>>0)>(1>>0))){
var q=j;
var t=g;
var e=1;
while(1){
var w=(K[(M>>0)+(e>>0)>>0].d1);
var j=((j<w)?w:j);
var q=((q>w)?w:q);
var w=(K[(M>>0)+(e>>0)>>0].d0);
var t=((t<w)?w:t);
var g=((g>w)?w:g);
var e=((e>>0)+(1>>0)>>0);
if(((e>>0)<(O>>0))){
}else{
break L176;
}
}
}else{
var q=j;
var t=g;
}
}while(0);
aQ(y,g,t,q,j);
var n=(y.i0>>0);
if(!(((n>>0)<(I>>0)))){
var f={a0:{i0:0,i1:0,i2:0},a1:null};
f.a0.i0=(I>>0);
f.a0.i1=(0>>0);
f.a0.i2=(0>>0);
f.a1=null;
var e=(R.i0>>0);
if(((e>>0)===(0>>0))){
R.a3=f;
R.a1=f;
R.a2=f;
var e=1;
}else{
var a=(R.a2);
a.a1=f;
R.a2=f;
var e=((e>>0)+(1>>0)>>0);
}
R.i0=(e>>0);
return R;
}
var f=createArray_struct$p_Z8GeoPoint([],0,(O<<4)/16);
L188:do{
if(((O>>0)>(0>>0))){
var e=0;
while(1){
var g=(K[(M>>0)+(e>>0)>>0].d1);
f[(0>>0)+(e>>0)>>0].d1=g;
var g=(K[(M>>0)+(e>>0)>>0].d0);
f[(0>>0)+(e>>0)>>0].d0=g;
var e=((e>>0)+(1>>0)>>0);
if(((e>>0)<(O>>0))){
}else{
break L188;
}
}
}
}while(0);
var a={a0:nullArray,i1:0,a2:{i0:0,i1:0,i2:0},a3:null};
a.a2.i0=(n>>0);
a.a3=null;
a.i1=(O>>0);
a.a0=f;
var e=(W.i0>>0);
if(((e>>0)===(0>>0))){
W.a3=a;
W.a1=a;
W.a2=a;
var e=1;
}else{
var f=(W.a2);
f.a3=a;
W.a2=a;
var e=((e>>0)+(1>>0)>>0);
}
W.i0=(e>>0);
var e=n;
var f=null;
var n=1;
while(1){
var b=(T.i0>>0);
L198:do{
if(((b>>0)>(0>>0))){
var a=(T.a1);
while(1){
var h=(a.i1>>0);
if(((h>>0)>(0>>0))){
a.a0=nullArray;
}
var a=(a.a3);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L198;
}
}
}
}while(0);
T.i0=(0>>0);
T.a1=null;
T.a2=null;
T.a3=null;
var b=(V.i0>>0);
L206:do{
if(((b>>0)>(0>>0))){
var a=(V.a1);
while(1){
var a=(a.a1);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L206;
}
}
}
}while(0);
V.i0=(0>>0);
V.a1=null;
V.a2=null;
V.a3=null;
var b=(W.i0>>0);
L211:do{
if(((n>>0)>(0>>0))){
var h=0;
while(1){
L214:do{
if((((b>>0)!==(0>>0))&&((b>>0)>(h>>0)))){
if((h>>0)===(0>>0)){
var a=(W.a1);
break;
}else if((h>>0)===(-1>>0)){
var a=(W.a2);
break;
}else{
var a=(W.a1);
if(((h>>0)>(0>>0))){
var b=h;
}else{
break;
}
while(1){
var a=(a.a3);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L214;
}
}
}
}else{
var a=null;
}
}while(0);
var k=(a.a0);
var d=(a.i1>>0);
L223:do{
if(((d>>0)===(0>>0))){
var i=nullArray;
}else{
var i=createArray_struct$p_Z8GeoPoint([],0,(d<<4)/16);
if(((d>>0)>(0>>0))){
var b=0;
}else{
break;
}
while(1){
var g=(k[(0>>0)+(b>>0)>>0].d1);
i[(0>>0)+(b>>0)>>0].d1=g;
var g=(k[(0>>0)+(b>>0)>>0].d0);
i[(0>>0)+(b>>0)>>0].d0=g;
var b=((b>>0)+(1>>0)>>0);
if(((b>>0)<(d>>0))){
}else{
break L223;
}
}
}
}while(0);
var d=(a.i1>>0);
var b=(a.a2.i0>>0);
var c=(a.a2.i1>>0);
var A=(a.a2.i2>>0);
var k={a0:nullArray,i1:0,a2:{i0:0,i1:0,i2:0},a3:null};
k.a2.i0=(b>>0);
k.a2.i1=(c>>0);
k.a2.i2=(A>>0);
k.a3=null;
k.i1=(d>>0);
k.a0=i;
var b=(T.i0>>0);
if(((b>>0)===(0>>0))){
T.a3=k;
T.a1=k;
T.a2=k;
var b=1;
}else{
var a=(T.a2);
a.a3=k;
T.a2=k;
var b=((b>>0)+(1>>0)>>0);
}
T.i0=(b>>0);
L232:do{
if((h>>0)===(-1>>0)){
var d=((d>>0)+(-1>>0)>>0);
label=44;
break;
}else if((h>>0)===(0>>0)){
var a=(T.a1);
var d=(a.i1>>0);
var d=((d>>0)+(-1>>0)>>0);
label=41;
break;
}else{
var C=(T.a1);
L236:do{
if(((h>>0)>(0>>0))){
var d=h;
var a=C;
while(1){
var a=(a.a3);
var d=((d>>0)+(-1>>0)>>0);
if(((d>>0)>(0>>0))){
}else{
break L236;
}
}
}else{
var a=C;
}
}while(0);
var d=(a.i1>>0);
var c=((d>>0)+(-1>>0)>>0);
if((h>>0)===(0>>0)){
var d=c;
var a=C;
label=41;
break;
}else if((h>>0)===(-1>>0)){
var d=c;
label=44;
break;
}
L241:do{
if(((h>>0)>(0>>0))){
var d=h;
var a=C;
while(1){
var a=(a.a3);
var d=((d>>0)+(-1>>0)>>0);
if(((d>>0)>(0>>0))){
}else{
break L241;
}
}
}else{
var a=C;
}
}while(0);
var a=(a.a0);
var g=(a[0>>0].d1);
if((h>>0)===(0>>0)){
var d=c;
var a=C;
label=46;
break;
}else if((h>>0)===(-1>>0)){
var d=c;
var a=k;
break;
}
if(((h>>0)>(0>>0))){
var d=h;
var a=C;
}else{
var d=c;
var a=C;
break;
}
while(1){
var a=(a.a3);
var d=((d>>0)+(-1>>0)>>0);
if(((d>>0)>(0>>0))){
}else{
var d=c;
break L232;
}
}
}
}while(0);
do{
if(label===41){
label=0;
var C=(a.a0);
var g=(C[0>>0].d1);
label=46;
break;
}
else if(label===44){
label=0;
var g=(i[0>>0].d1);
var a=k;
break;
}
}while(0);
if(label===46){
label=0;
}
var a=(a.a0);
var j=(a[(0>>0)+(d>>0)>>0].d1);
do{
if((g!==j)){
label=60;
}else{
L256:do{
if((h>>0)===(-1>>0)){
var g=(i[0>>0].d0);
var a=k;
break;
}else if((h>>0)===(0>>0)){
var a=(T.a1);
var i=(a.a0);
var g=(i[0>>0].d0);
label=56;
break;
}else{
var i=(T.a1);
L260:do{
if(((h>>0)>(0>>0))){
var c=h;
var a=i;
while(1){
var a=(a.a3);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L260;
}
}
}else{
var a=i;
}
}while(0);
var a=(a.a0);
var g=(a[0>>0].d0);
if((h>>0)===(0>>0)){
var a=i;
label=56;
break;
}else if((h>>0)===(-1>>0)){
var a=k;
break;
}
if(((h>>0)>(0>>0))){
var c=h;
var a=i;
}else{
var a=i;
break;
}
while(1){
var a=(a.a3);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L256;
}
}
}
}while(0);
if(label===56){
label=0;
}
var a=(a.a0);
var j=(a[(0>>0)+(d>>0)>>0].d0);
if((g!==j)){
label=60;
break;
}else{
break;
}
}
}while(0);
if(label===60){
label=0;
L272:do{
if((((b>>0)!==(0>>0))&&((b>>0)>(h>>0)))){
if((h>>0)===(0>>0)){
var a=(T.a1);
break;
}else if((h>>0)===(-1>>0)){
var a=k;
break;
}
var a=(T.a1);
if(((h>>0)>(0>>0))){
var b=h;
}else{
break;
}
while(1){
var a=(a.a3);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L272;
}
}
}else{
var a=null;
}
}while(0);
var i=(a.a0);
var g=(i[0>>0].d0);
var j=(i[0>>0].d1);
var b=(a.i1>>0);
var i=createArray_struct$p_Z8GeoPoint(i,i.length,(((b<<4)>>0)+(16>>0)>>0)/16);
i[(0>>0)+(b>>0)>>0].d0=g;
i[(0>>0)+(b>>0)>>0].d1=j;
a.a0=i;
a.i1=(((b>>0)+(1>>0)>>0)>>0);
}
L281:do{
if((h>>0)===(0>>0)){
var a=(T.a1);
}else if((h>>0)===(-1>>0)){
var a=(T.a2);
}else{
var a=(T.a1);
if(((h>>0)>(0>>0))){
var b=h;
}else{
break;
}
while(1){
var a=(a.a3);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L281;
}
}
}
}while(0);
var b=(a.a2.i0>>0);
var d=(a.a2.i1>>0);
var c=(a.a2.i2>>0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(b>>0);
a.a0.i1=(d>>0);
a.a0.i2=(c>>0);
a.a1=null;
var b=(V.i0>>0);
if(((b>>0)===(0>>0))){
V.a3=a;
V.a1=a;
V.a2=a;
var b=1;
}else{
var i=(V.a2);
i.a1=a;
V.a2=a;
var b=((b>>0)+(1>>0)>>0);
}
V.i0=(b>>0);
var h=((h>>0)+(1>>0)>>0);
var b=(W.i0>>0);
if(((h>>0)<(n>>0))){
}else{
break L211;
}
}
}else{
}
}while(0);
L293:do{
if(((b>>0)>(0>>0))){
var a=(W.a1);
while(1){
var h=(a.i1>>0);
if(((h>>0)>(0>>0))){
a.a0=nullArray;
}
var a=(a.a3);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L293;
}
}
}
}while(0);
W.i0=(0>>0);
W.a1=null;
W.a2=null;
W.a3=null;
var e=((e>>0)+(1>>0)>>0);
L301:do{
if(((n>>0)>(0>>0))){
var h=0;
var b=0;
while(1){
L304:do{
if((b>>0)===(0>>0)){
var a=(V.a1);
}else if((b>>0)===(-1>>0)){
var a=(V.a2);
}else{
var a=(V.a1);
if(((b>>0)>(0>>0))){
var d=b;
}else{
break;
}
while(1){
var a=(a.a1);
var d=((d>>0)+(-1>>0)>>0);
if(((d>>0)>(0>>0))){
}else{
break L304;
}
}
}
}while(0);
var d=(a.a0.i0>>0);
var c=(a.a0.i1>>0);
var A=(a.a0.i2>>0);
var l=((31-d)>>0);
y.i0=(((d>>0)+(1>>0)>>0)>>0);
y.i1=(((((c>>>l)>>0)+(1>>0)>>0)<<l)>>0);
y.i2=(((((A>>>l)>>0)+(1>>0)>>0)<<l)>>0);
aD(o,y);
var w=(o.d1);
var aa=(o.d2);
if(!((f===null))){
var d=(f.i0>>0);
L313:do{
if((((d>>0)!==(0>>0))&&((d>>0)>(0>>0)))){
var f=(f.a1);
while(1){
var c=(f.i1>>0);
if(((c>>0)>(0>>0))){
f.a0=nullArray;
}
var f=(f.a3);
var d=((d>>0)+(-1>>0)>>0);
if(((d>>0)>(0>>0))){
}else{
break L313;
}
}
}
}while(0);
}
var d=(T.i0>>0);
L322:do{
if((((d>>0)!==(0>>0))&&((d>>0)>(b>>0)))){
if((b>>0)===(0>>0)){
var f=(T.a1);
break;
}else if((b>>0)===(-1>>0)){
var f=(T.a2);
break;
}else{
var f=(T.a1);
if(((b>>0)>(0>>0))){
var d=b;
}else{
break;
}
while(1){
var f=(f.a3);
var d=((d>>0)+(-1>>0)>>0);
if(((d>>0)>(0>>0))){
}else{
break L322;
}
}
}
}else{
var f=null;
}
}while(0);
var f=bT(f,aa,w);
var d=0;
while(1){
var A=(f.i0>>0);
L333:do{
if((d>>0)===(0>>0)){
var a=(f.a1);
}else if((d>>0)===(-1>>0)){
var a=(f.a2);
}else{
var a=(f.a1);
if(((d>>0)>(0>>0))){
var c=d;
}else{
break;
}
while(1){
var a=(a.a3);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L333;
}
}
}
}while(0);
var l=(a.i1>>0);
do{
if(((l>>0)===(0>>0))){
}else{
var a=(a.a0);
L342:do{
if(((l>>0)>(0>>0))){
var c=0;
while(1){
var g=(a[(0>>0)+(c>>0)>>0].d1);
var E=((c>>0)+(1>>0)>>0);
if(!((g===aa))){
break L342;
}
if(((E>>0)<(l>>0))){
var c=E;
}else{
var c=E;
break L342;
}
}
}else{
var c=0;
}
}while(0);
if(((c>>0)===(l>>0))){
break;
}
L348:do{
if(((l>>0)>(0>>0))){
var c=0;
while(1){
var g=(a[(0>>0)+(c>>0)>>0].d0);
var E=((c>>0)+(1>>0)>>0);
if(!((g===w))){
break L348;
}
if(((E>>0)<(l>>0))){
var c=E;
}else{
var c=E;
break L348;
}
}
}else{
var c=0;
}
}while(0);
if(((c>>0)===(l>>0))){
break;
}
var j=(a[0>>0].d1);
var g=(a[0>>0].d0);
L354:do{
if(((l>>0)>(1>>0))){
var q=j;
var t=g;
var c=1;
while(1){
var D=(a[(0>>0)+(c>>0)>>0].d1);
var j=((j<D)?D:j);
var q=((q>D)?D:q);
var D=(a[(0>>0)+(c>>0)>>0].d0);
var t=((t<D)?D:t);
var g=((g>D)?D:g);
var c=((c>>0)+(1>>0)>>0);
if(((c>>0)<(l>>0))){
}else{
break L354;
}
}
}else{
var q=j;
var t=g;
}
}while(0);
var j=((j+q)*0.5);
var g=((g+t)*0.5);
L358:do{
if((((A>>0)!==(0>>0))&&((A>>0)>(d>>0)))){
if((d>>0)===(0>>0)){
var a=(f.a1);
break;
}else if((d>>0)===(-1>>0)){
var a=(f.a2);
break;
}else{
var a=(f.a1);
if(((d>>0)>(0>>0))){
var c=d;
}else{
break;
}
while(1){
var a=(a.a3);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L358;
}
}
}
}else{
var a=null;
}
}while(0);
o.i0=(e>>0);
o.d1=g;
o.d2=j;
N(S,o);
a.a2.i0=((S.i0>>0)>>0);
a.a2.i1=((S.i1>>0)>>0);
a.a2.i2=((S.i2>>0)>>0);
var k=(a.a0);
var A=(a.i1>>0);
L367:do{
if(((A>>0)===(0>>0))){
var i=nullArray;
}else{
var i=createArray_struct$p_Z8GeoPoint([],0,(A<<4)/16);
if(((A>>0)>(0>>0))){
var c=0;
}else{
break;
}
while(1){
var g=(k[(0>>0)+(c>>0)>>0].d1);
i[(0>>0)+(c>>0)>>0].d1=g;
var g=(k[(0>>0)+(c>>0)>>0].d0);
i[(0>>0)+(c>>0)>>0].d0=g;
var c=((c>>0)+(1>>0)>>0);
if(((c>>0)<(A>>0))){
}else{
break L367;
}
}
}
}while(0);
var c=(a.i1>>0);
var A=(a.a2.i0>>0);
var l=(a.a2.i1>>0);
var E=(a.a2.i2>>0);
var a={a0:nullArray,i1:0,a2:{i0:0,i1:0,i2:0},a3:null};
a.a2.i0=(A>>0);
a.a2.i1=(l>>0);
a.a2.i2=(E>>0);
a.a3=null;
a.i1=(c>>0);
a.a0=i;
var c=(W.i0>>0);
do{
if(((c>>0)===(0>>0))){
W.a3=a;
W.a1=a;
W.a2=a;
W.i0=(1>>0);
var c=1;
label=128;
break;
}else{
var i=(W.a2);
i.a3=a;
W.a2=a;
var c=((c>>0)+(1>>0)>>0);
W.i0=(c>>0);
if(((c>>0)===(0>>0))){
var a=null;
break;
}else{
label=128;
break;
}
}
}while(0);
L375:do{
if(label===128){
label=0;
if((((c>>0)<=(h>>0))||((h>>0)<(-1>>0)))){
var a=null;
break;
}
if((h>>0)===(0>>0)){
var a=(W.a1);
break;
}else if((h>>0)===(-1>>0)){
break;
}
var a=(W.a1);
if(((h>>0)>(0>>0))){
var c=h;
}else{
break;
}
while(1){
var a=(a.a3);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L375;
}
}
}
}while(0);
L384:do{
if((d>>0)===(0>>0)){
var i=(f.a1);
}else if((d>>0)===(-1>>0)){
var i=(f.a2);
}else{
var i=(f.a1);
if(((d>>0)>(0>>0))){
var c=d;
}else{
break;
}
while(1){
var i=(i.a3);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L384;
}
}
}
}while(0);
a.a2.i0=((i.a2.i0>>0)>>0);
a.a2.i1=((i.a2.i1>>0)>>0);
a.a2.i2=((i.a2.i2>>0)>>0);
var h=((h>>0)+(1>>0)>>0);
}
}while(0);
var d=((d>>0)+(1>>0)>>0);
if(((d>>0)<(4>>0))){
}else{
break;
}
}
var b=((b>>0)+(1>>0)>>0);
if(((b>>0)<(n>>0))){
}else{
var n=h;
break L301;
}
}
}else{
var n=0;
}
}while(0);
if(((e>>0)<(I>>0))){
}else{
break;
}
}
L395:do{
if(((n>>0)>(0>>0))){
var e=0;
while(1){
L398:do{
if((e>>0)===(0>>0)){
var a=(W.a1);
}else if((e>>0)===(-1>>0)){
var a=(W.a2);
}else{
var a=(W.a1);
if(((e>>0)>(0>>0))){
var b=e;
}else{
break;
}
while(1){
var a=(a.a3);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L398;
}
}
}
}while(0);
var b=(a.a2.i0>>0);
var h=(a.a2.i1>>0);
var d=(a.a2.i2>>0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(b>>0);
a.a0.i1=(h>>0);
a.a0.i2=(d>>0);
a.a1=null;
var b=(R.i0>>0);
if(((b>>0)===(0>>0))){
R.a3=a;
R.a1=a;
R.a2=a;
var b=1;
}else{
var i=(R.a2);
i.a1=a;
R.a2=a;
var b=((b>>0)+(1>>0)>>0);
}
R.i0=(b>>0);
var e=((e>>0)+(1>>0)>>0);
if(((e>>0)<(n>>0))){
}else{
break L395;
}
}
}
}while(0);
var e=(V.i0>>0);
L410:do{
if(((e>>0)>(0>>0))){
var a=(V.a1);
while(1){
var a=(a.a1);
var e=((e>>0)+(-1>>0)>>0);
if(((e>>0)>(0>>0))){
}else{
break L410;
}
}
}
}while(0);
var e=(W.i0>>0);
L415:do{
if(((e>>0)>(0>>0))){
var a=(W.a1);
while(1){
var n=(a.i1>>0);
if(((n>>0)>(0>>0))){
a.a0=nullArray;
}
var a=(a.a3);
var e=((e>>0)+(-1>>0)>>0);
if(((e>>0)>(0>>0))){
}else{
break L415;
}
}
}
}while(0);
var e=(T.i0>>0);
L423:do{
if(((e>>0)>(0>>0))){
var a=(T.a1);
while(1){
var n=(a.i1>>0);
if(((n>>0)>(0>>0))){
a.a0=nullArray;
}
var a=(a.a3);
var e=((e>>0)+(-1>>0)>>0);
if(((e>>0)>(0>>0))){
}else{
break L423;
}
}
}
}while(0);
if((f===null)){
return R;
}
var e=(f.i0>>0);
L434:do{
if((((e>>0)!==(0>>0))&&((e>>0)>(0>>0)))){
var f=(f.a1);
while(1){
var n=(f.i1>>0);
if(((n>>0)>(0>>0))){
f.a0=nullArray;
}
var f=(f.a3);
var e=((e>>0)+(-1>>0)>>0);
if(((e>>0)>(0>>0))){
}else{
break L434;
}
}
}
}while(0);
return R;
}
function bT(R,O,M){
var label=0;
var l=aSlot=[null,null,null,null,null,null];
var t={i0:0,a1:null,a2:null,a3:null};
t.i0=(0>>0);
t.a1=null;
t.a2=null;
t.a3=null;
l[0>>0]=t;
var C={i0:0,a1:null,a2:null,a3:null};
C.i0=(0>>0);
C.a1=null;
C.a2=null;
C.a3=null;
l[(0>>0)+(1>>0)>>0]=C;
var A={i0:0,a1:null,a2:null,a3:null};
A.i0=(0>>0);
A.a1=null;
A.a2=null;
A.a3=null;
var n={i0:0,a1:null,a2:null,a3:null};
n.i0=(0>>0);
n.a1=null;
n.a2=null;
n.a3=null;
l[2>>0]=n;
var y={i0:0,a1:null,a2:null,a3:null};
y.i0=(0>>0);
y.a1=null;
y.a2=null;
y.a3=null;
l[(2>>0)+(1>>0)>>0]=y;
var w={i0:0,a1:null,a2:null,a3:null};
w.i0=(0>>0);
w.a1=null;
w.a2=null;
w.a3=null;
l[(2>>0)+(2>>0)>>0]=w;
var D={i0:0,a1:null,a2:null,a3:null};
D.i0=(0>>0);
D.a1=null;
D.a2=null;
D.a3=null;
l[(2>>0)+(3>>0)>>0]=D;
var b={a0:nullArray,i1:0,a2:{i0:0,i1:0,i2:0},a3:null};
b.a2.i0=(0>>0);
b.a2.i1=(0>>0);
b.a2.i2=(0>>0);
b.a3=null;
b.i1=(0>>0);
b.a0=nullArray;
var c=(t.i0>>0);
if(((c>>0)===(0>>0))){
t.a3=b;
t.a1=b;
t.a2=b;
var c=1;
}else{
var f=(t.a2);
f.a3=b;
t.a2=b;
var c=((c>>0)+(1>>0)>>0);
}
t.i0=(c>>0);
var b={a0:nullArray,i1:0,a2:{i0:0,i1:0,i2:0},a3:null};
b.a2.i0=(0>>0);
b.a2.i1=(0>>0);
b.a2.i2=(0>>0);
b.a3=null;
b.i1=(0>>0);
b.a0=nullArray;
var c=(C.i0>>0);
if(((c>>0)===(0>>0))){
C.a3=b;
C.a1=b;
C.a2=b;
var c=1;
}else{
var f=(C.a2);
f.a3=b;
C.a2=b;
var c=((c>>0)+(1>>0)>>0);
}
C.i0=(c>>0);
var d=(t.i0>>0);
if(((d>>0)<(1>>0))){
var b=null;
}else{
var b=(t.a1);
}
if(((c>>0)<(1>>0))){
var f=null;
}else{
var f=(C.a1);
}
var c=(R.i1>>0);
var g=((c>>0)+(-1>>0)>>0);
var j=0;
var d=0;
var c=0;
L190:while(1){
while(1){
if(!(((j>>0)<(g>>0)))){
break L190;
}
var a=(R.a0);
var e=(a[(0>>0)+(j>>0)>>0].d0);
var i=(a[(0>>0)+(j>>0)>>0].d1);
var j=((j>>0)+(1>>0)>>0);
var k=(a[(0>>0)+(j>>0)>>0].d0);
var q=(a[(0>>0)+(j>>0)>>0].d1);
if(!((e<M))){
break;
}
var h=(b.i1>>0);
if(((h>>0)===(0>>0))){
var a=[{d0:0,d1:0}];
a[0>>0].d1=i;
a[0>>0].d0=e;
b.i1=(1>>0);
b.a0=a;
var h=1;
}else{
var a=(b.a0);
var a=createArray_struct$p_Z8GeoPoint(a,a.length,(((h<<4)>>0)+(16>>0)>>0)/16);
a[(0>>0)+(h>>0)>>0].d1=i;
a[(0>>0)+(h>>0)>>0].d0=e;
b.a0=a;
var h=((h>>0)+(1>>0)>>0);
b.i1=(h>>0);
}
var I=((d>>0)+(1>>0)>>0);
if((k>M)){
label=18;
break;
}else{
var d=I;
}
}
if(label===18){
label=0;
if((e!==k)){
var k=((i-q)/(e-k));
var e=((k*M)+(i-(e*k)));
}else{
}
if(((h>>0)===(0>>0))){
var a=[{d0:0,d1:0}];
a[0>>0].d1=e;
a[0>>0].d0=M;
b.i1=(1>>0);
b.a0=a;
}else{
var a=createArray_struct$p_Z8GeoPoint(a,a.length,(((h<<4)>>0)+(16>>0)>>0)/16);
a[(0>>0)+(h>>0)>>0].d1=e;
a[(0>>0)+(h>>0)>>0].d0=M;
b.a0=a;
b.i1=(((h>>0)+(1>>0)>>0)>>0);
}
var h=(f.i1>>0);
if(((h>>0)===(0>>0))){
var a=[{d0:0,d1:0}];
a[0>>0].d1=e;
a[0>>0].d0=M;
f.i1=(1>>0);
f.a0=a;
}else{
var a=(f.a0);
var a=createArray_struct$p_Z8GeoPoint(a,a.length,(((h<<4)>>0)+(16>>0)>>0)/16);
a[(0>>0)+(h>>0)>>0].d1=e;
a[(0>>0)+(h>>0)>>0].d0=M;
f.a0=a;
f.i1=(((h>>0)+(1>>0)>>0)>>0);
}
var c=((c>>0)+(1>>0)>>0);
var d=((d>>0)+(2>>0)>>0);
continue;
}
if(!((e>M))){
var h=(b.i1>>0);
if(((h>>0)===(0>>0))){
var a=[{d0:0,d1:0}];
a[0>>0].d1=i;
a[0>>0].d0=e;
b.i1=(1>>0);
b.a0=a;
}else{
var a=(b.a0);
var a=createArray_struct$p_Z8GeoPoint(a,a.length,(((h<<4)>>0)+(16>>0)>>0)/16);
a[(0>>0)+(h>>0)>>0].d1=i;
a[(0>>0)+(h>>0)>>0].d0=e;
b.a0=a;
b.i1=(((h>>0)+(1>>0)>>0)>>0);
}
var h=(f.i1>>0);
if(((h>>0)===(0>>0))){
var a=[{d0:0,d1:0}];
a[0>>0].d1=i;
a[0>>0].d0=e;
f.i1=(1>>0);
f.a0=a;
}else{
var a=(f.a0);
var a=createArray_struct$p_Z8GeoPoint(a,a.length,(((h<<4)>>0)+(16>>0)>>0)/16);
a[(0>>0)+(h>>0)>>0].d1=i;
a[(0>>0)+(h>>0)>>0].d0=e;
f.a0=a;
f.i1=(((h>>0)+(1>>0)>>0)>>0);
}
var c=((c>>0)+(1>>0)>>0);
var d=((d>>0)+(1>>0)>>0);
continue;
}
var h=(f.i1>>0);
if(((h>>0)===(0>>0))){
var a=[{d0:0,d1:0}];
a[0>>0].d1=i;
a[0>>0].d0=e;
f.i1=(1>>0);
f.a0=a;
}else{
var a=(f.a0);
var a=createArray_struct$p_Z8GeoPoint(a,a.length,(((h<<4)>>0)+(16>>0)>>0)/16);
a[(0>>0)+(h>>0)>>0].d1=i;
a[(0>>0)+(h>>0)>>0].d0=e;
f.a0=a;
f.i1=(((h>>0)+(1>>0)>>0)>>0);
}
var h=((c>>0)+(1>>0)>>0);
if(!((k<M))){
var c=h;
continue;
}
if((e!==k)){
var k=((i-q)/(e-k));
var e=((k*M)+(i-(e*k)));
}else{
}
var h=(b.i1>>0);
if(((h>>0)===(0>>0))){
var a=[{d0:0,d1:0}];
a[0>>0].d1=e;
a[0>>0].d0=M;
b.i1=(1>>0);
b.a0=a;
}else{
var a=(b.a0);
var a=createArray_struct$p_Z8GeoPoint(a,a.length,(((h<<4)>>0)+(16>>0)>>0)/16);
a[(0>>0)+(h>>0)>>0].d1=e;
a[(0>>0)+(h>>0)>>0].d0=M;
b.a0=a;
b.i1=(((h>>0)+(1>>0)>>0)>>0);
}
var h=(f.i1>>0);
if(((h>>0)===(0>>0))){
var a=[{d0:0,d1:0}];
a[0>>0].d1=e;
a[0>>0].d0=M;
f.i1=(1>>0);
f.a0=a;
}else{
var a=(f.a0);
var a=createArray_struct$p_Z8GeoPoint(a,a.length,(((h<<4)>>0)+(16>>0)>>0)/16);
a[(0>>0)+(h>>0)>>0].d1=e;
a[(0>>0)+(h>>0)>>0].d0=M;
f.a0=a;
f.i1=(((h>>0)+(1>>0)>>0)>>0);
}
var c=((c>>0)+(2>>0)>>0);
var d=((d>>0)+(1>>0)>>0);
}
do{
if(((d>>0)>(0>>0))){
var a=(b.a0);
var e=(a[0>>0].d0);
var i=(a[0>>0].d1);
var d=(b.i1>>0);
if(((d>>0)===(0>>0))){
var a=[{d0:0,d1:0}];
a[0>>0].d1=i;
a[0>>0].d0=e;
b.i1=(1>>0);
b.a0=a;
break;
}else{
var a=createArray_struct$p_Z8GeoPoint(a,a.length,(((d<<4)>>0)+(16>>0)>>0)/16);
a[(0>>0)+(d>>0)>>0].d1=i;
a[(0>>0)+(d>>0)>>0].d0=e;
b.a0=a;
b.i1=(((d>>0)+(1>>0)>>0)>>0);
break;
}
}
}while(0);
do{
if(((c>>0)>(0>>0))){
var b=(f.a0);
var e=(b[0>>0].d0);
var i=(b[0>>0].d1);
var c=(f.i1>>0);
if(((c>>0)===(0>>0))){
var b=[{d0:0,d1:0}];
b[0>>0].d1=i;
b[0>>0].d0=e;
f.i1=(1>>0);
f.a0=b;
break;
}else{
var b=createArray_struct$p_Z8GeoPoint(b,b.length,(((c<<4)>>0)+(16>>0)>>0)/16);
b[(0>>0)+(c>>0)>>0].d1=i;
b[(0>>0)+(c>>0)>>0].d0=e;
f.a0=b;
f.i1=(((c>>0)+(1>>0)>>0)>>0);
break;
}
}
}while(0);
var b={a0:nullArray,i1:0,a2:{i0:0,i1:0,i2:0},a3:null};
b.a2.i0=(0>>0);
b.a2.i1=(0>>0);
b.a2.i2=(0>>0);
b.a3=null;
b.i1=(0>>0);
b.a0=nullArray;
var c=(n.i0>>0);
if(((c>>0)===(0>>0))){
n.a3=b;
n.a1=b;
n.a2=b;
var c=1;
}else{
var f=(n.a2);
f.a3=b;
n.a2=b;
var c=((c>>0)+(1>>0)>>0);
}
n.i0=(c>>0);
var b={a0:nullArray,i1:0,a2:{i0:0,i1:0,i2:0},a3:null};
b.a2.i0=(0>>0);
b.a2.i1=(0>>0);
b.a2.i2=(0>>0);
b.a3=null;
b.i1=(0>>0);
b.a0=nullArray;
var c=(y.i0>>0);
if(((c>>0)===(0>>0))){
y.a3=b;
y.a1=b;
y.a2=b;
var c=1;
}else{
var f=(y.a2);
f.a3=b;
y.a2=b;
var c=((c>>0)+(1>>0)>>0);
}
y.i0=(c>>0);
var b={a0:nullArray,i1:0,a2:{i0:0,i1:0,i2:0},a3:null};
b.a2.i0=(0>>0);
b.a2.i1=(0>>0);
b.a2.i2=(0>>0);
b.a3=null;
b.i1=(0>>0);
b.a0=nullArray;
var c=(w.i0>>0);
if(((c>>0)===(0>>0))){
w.a3=b;
w.a1=b;
w.a2=b;
var c=1;
}else{
var f=(w.a2);
f.a3=b;
w.a2=b;
var c=((c>>0)+(1>>0)>>0);
}
w.i0=(c>>0);
var b={a0:nullArray,i1:0,a2:{i0:0,i1:0,i2:0},a3:null};
b.a2.i0=(0>>0);
b.a2.i1=(0>>0);
b.a2.i2=(0>>0);
b.a3=null;
b.i1=(0>>0);
b.a0=nullArray;
var c=(D.i0>>0);
if(((c>>0)===(0>>0))){
D.a3=b;
D.a1=b;
D.a2=b;
var c=1;
}else{
var f=(D.a2);
f.a3=b;
D.a2=b;
var c=((c>>0)+(1>>0)>>0);
}
D.i0=(c>>0);
var o=new Int32Array(4);
o[0>>0]=(0>>0);
o[(0>>0)+(1>>0)>>0]=(0>>0);
o[(0>>0)+(2>>0)>>0]=(0>>0);
o[(0>>0)+(3>>0)>>0]=(0>>0);
var f=t;
var b=n;
var c=0;
while(1){
var E=(f.a1);
var d=(E.i1>>0);
var j=(b.i0>>0);
if(((j>>0)<(1>>0))){
var b=null;
}else{
var b=(b.a1);
}
var j=((c>>0)+(2>>0)>>0);
var f=(l[(2>>0)+(j>>0)>>0]);
var h=(f.i0>>0);
if(((h>>0)<(1>>0))){
var f=null;
}else{
var f=(f.a1);
}
var h=((d>>0)+(-1>>0)>>0);
L278:do{
if(((h>>0)>(0>>0))){
var d=0;
while(1){
var a=(E.a0);
var e=(a[(0>>0)+(d>>0)>>0].d0);
var i=(a[(0>>0)+(d>>0)>>0].d1);
var d=((d>>0)+(1>>0)>>0);
var k=(a[(0>>0)+(d>>0)>>0].d0);
var q=(a[(0>>0)+(d>>0)>>0].d1);
do{
if((i<O)){
var g=(b.i1>>0);
if(((g>>0)===(0>>0))){
var a=[{d0:0,d1:0}];
a[0>>0].d1=i;
a[0>>0].d0=e;
b.i1=(1>>0);
b.a0=a;
}else{
var a=(b.a0);
var a=createArray_struct$p_Z8GeoPoint(a,a.length,(((g<<4)>>0)+(16>>0)>>0)/16);
a[(0>>0)+(g>>0)>>0].d1=i;
a[(0>>0)+(g>>0)>>0].d0=e;
b.a0=a;
b.i1=(((g>>0)+(1>>0)>>0)>>0);
}
var g=(o[(0>>0)+(c>>0)>>0]>>0);
o[(0>>0)+(c>>0)>>0]=(((g>>0)+(1>>0)>>0)>>0);
if(!((q>O))){
break;
}
if((e!==k)){
var k=((i-q)/(e-k));
var e=((O-(i-(e*k)))/k);
}else{
}
var g=(b.i1>>0);
if(((g>>0)===(0>>0))){
var a=[{d0:0,d1:0}];
a[0>>0].d1=O;
a[0>>0].d0=e;
b.i1=(1>>0);
b.a0=a;
}else{
var a=createArray_struct$p_Z8GeoPoint(a,a.length,(((g<<4)>>0)+(16>>0)>>0)/16);
a[(0>>0)+(g>>0)>>0].d1=O;
a[(0>>0)+(g>>0)>>0].d0=e;
b.a0=a;
b.i1=(((g>>0)+(1>>0)>>0)>>0);
}
var g=(f.i1>>0);
if(((g>>0)===(0>>0))){
var a=[{d0:0,d1:0}];
a[0>>0].d1=O;
a[0>>0].d0=e;
f.i1=(1>>0);
f.a0=a;
}else{
var a=(f.a0);
var a=createArray_struct$p_Z8GeoPoint(a,a.length,(((g<<4)>>0)+(16>>0)>>0)/16);
a[(0>>0)+(g>>0)>>0].d1=O;
a[(0>>0)+(g>>0)>>0].d0=e;
f.a0=a;
f.i1=(((g>>0)+(1>>0)>>0)>>0);
}
var g=(o[(0>>0)+(c>>0)>>0]>>0);
o[(0>>0)+(c>>0)>>0]=(((g>>0)+(1>>0)>>0)>>0);
var g=(o[(0>>0)+(j>>0)>>0]>>0);
o[(0>>0)+(j>>0)>>0]=(((g>>0)+(1>>0)>>0)>>0);
}else{
if(!((i>O))){
var g=(b.i1>>0);
if(((g>>0)===(0>>0))){
var a=[{d0:0,d1:0}];
a[0>>0].d1=i;
a[0>>0].d0=e;
b.i1=(1>>0);
b.a0=a;
}else{
var a=(b.a0);
var a=createArray_struct$p_Z8GeoPoint(a,a.length,(((g<<4)>>0)+(16>>0)>>0)/16);
a[(0>>0)+(g>>0)>>0].d1=i;
a[(0>>0)+(g>>0)>>0].d0=e;
b.a0=a;
b.i1=(((g>>0)+(1>>0)>>0)>>0);
}
var g=(f.i1>>0);
if(((g>>0)===(0>>0))){
var a=[{d0:0,d1:0}];
a[0>>0].d1=i;
a[0>>0].d0=e;
f.i1=(1>>0);
f.a0=a;
}else{
var a=(f.a0);
var a=createArray_struct$p_Z8GeoPoint(a,a.length,(((g<<4)>>0)+(16>>0)>>0)/16);
a[(0>>0)+(g>>0)>>0].d1=i;
a[(0>>0)+(g>>0)>>0].d0=e;
f.a0=a;
f.i1=(((g>>0)+(1>>0)>>0)>>0);
}
var g=(o[(0>>0)+(c>>0)>>0]>>0);
o[(0>>0)+(c>>0)>>0]=(((g>>0)+(1>>0)>>0)>>0);
var g=(o[(0>>0)+(j>>0)>>0]>>0);
o[(0>>0)+(j>>0)>>0]=(((g>>0)+(1>>0)>>0)>>0);
break;
}
var g=(f.i1>>0);
if(((g>>0)===(0>>0))){
var a=[{d0:0,d1:0}];
a[0>>0].d1=i;
a[0>>0].d0=e;
f.i1=(1>>0);
f.a0=a;
}else{
var a=(f.a0);
var a=createArray_struct$p_Z8GeoPoint(a,a.length,(((g<<4)>>0)+(16>>0)>>0)/16);
a[(0>>0)+(g>>0)>>0].d1=i;
a[(0>>0)+(g>>0)>>0].d0=e;
f.a0=a;
f.i1=(((g>>0)+(1>>0)>>0)>>0);
}
var g=(o[(0>>0)+(j>>0)>>0]>>0);
o[(0>>0)+(j>>0)>>0]=(((g>>0)+(1>>0)>>0)>>0);
if(!((q<O))){
break;
}
if((e!==k)){
var k=((i-q)/(e-k));
var e=((O-(i-(e*k)))/k);
}else{
}
var g=(b.i1>>0);
if(((g>>0)===(0>>0))){
var a=[{d0:0,d1:0}];
a[0>>0].d1=O;
a[0>>0].d0=e;
b.i1=(1>>0);
b.a0=a;
}else{
var a=(b.a0);
var a=createArray_struct$p_Z8GeoPoint(a,a.length,(((g<<4)>>0)+(16>>0)>>0)/16);
a[(0>>0)+(g>>0)>>0].d1=O;
a[(0>>0)+(g>>0)>>0].d0=e;
b.a0=a;
b.i1=(((g>>0)+(1>>0)>>0)>>0);
}
var g=(f.i1>>0);
if(((g>>0)===(0>>0))){
var a=[{d0:0,d1:0}];
a[0>>0].d1=O;
a[0>>0].d0=e;
f.i1=(1>>0);
f.a0=a;
}else{
var a=(f.a0);
var a=createArray_struct$p_Z8GeoPoint(a,a.length,(((g<<4)>>0)+(16>>0)>>0)/16);
a[(0>>0)+(g>>0)>>0].d1=O;
a[(0>>0)+(g>>0)>>0].d0=e;
f.a0=a;
f.i1=(((g>>0)+(1>>0)>>0)>>0);
}
var g=(o[(0>>0)+(c>>0)>>0]>>0);
o[(0>>0)+(c>>0)>>0]=(((g>>0)+(1>>0)>>0)>>0);
var g=(o[(0>>0)+(j>>0)>>0]>>0);
o[(0>>0)+(j>>0)>>0]=(((g>>0)+(1>>0)>>0)>>0);
}
}while(0);
if(((d>>0)<(h>>0))){
}else{
break L278;
}
}
}
}while(0);
var c=((c>>0)+(1>>0)>>0);
if(!(((c>>0)<(2>>0)))){
var b=n;
var c=0;
break;
}
var f=(l[(0>>0)+(c>>0)>>0]);
var b=(l[(2>>0)+(c>>0)>>0]);
}
while(1){
var d=(b.i0>>0);
if(((d>>0)<(1>>0))){
var b=null;
}else{
var b=(b.a1);
}
var d=(o[(0>>0)+(c>>0)>>0]>>0);
if(((d>>0)>(0>>0))){
var f=(b.a0);
var e=(f[0>>0].d0);
var i=(f[0>>0].d1);
var d=(b.i1>>0);
if(((d>>0)===(0>>0))){
var f=[{d0:0,d1:0}];
f[0>>0].d1=i;
f[0>>0].d0=e;
b.i1=(1>>0);
b.a0=f;
}else{
var f=createArray_struct$p_Z8GeoPoint(f,f.length,(((d<<4)>>0)+(16>>0)>>0)/16);
f[(0>>0)+(d>>0)>>0].d1=i;
f[(0>>0)+(d>>0)>>0].d0=e;
b.a0=f;
b.i1=(((d>>0)+(1>>0)>>0)>>0);
}
var d=(o[(0>>0)+(c>>0)>>0]>>0);
o[(0>>0)+(c>>0)>>0]=(((d>>0)+(1>>0)>>0)>>0);
}
var c=((c>>0)+(1>>0)>>0);
if(!(((c>>0)<(4>>0)))){
var b=n;
var c=0;
break;
}
var b=(l[(2>>0)+(c>>0)>>0]);
}
while(1){
var d=(b.i0>>0);
if(((d>>0)<(1>>0))){
var f=null;
}else{
var f=(b.a1);
}
var E=(f.a0);
var j=(f.i1>>0);
L349:do{
if(((j>>0)===(0>>0))){
var a=nullArray;
}else{
var a=createArray_struct$p_Z8GeoPoint([],0,(j<<4)/16);
if(((j>>0)>(0>>0))){
var d=0;
}else{
break;
}
while(1){
var e=(E[(0>>0)+(d>>0)>>0].d1);
a[(0>>0)+(d>>0)>>0].d1=e;
var e=(E[(0>>0)+(d>>0)>>0].d0);
a[(0>>0)+(d>>0)>>0].d0=e;
var d=((d>>0)+(1>>0)>>0);
if(((d>>0)<(j>>0))){
}else{
break L349;
}
}
}
}while(0);
var d=(f.i1>>0);
var j=(f.a2.i0>>0);
var h=(f.a2.i1>>0);
var g=(f.a2.i2>>0);
var f={a0:nullArray,i1:0,a2:{i0:0,i1:0,i2:0},a3:null};
f.a2.i0=(j>>0);
f.a2.i1=(h>>0);
f.a2.i2=(g>>0);
f.a3=null;
f.i1=(d>>0);
f.a0=a;
var d=(A.i0>>0);
do{
if(((d>>0)===(0>>0))){
A.a3=f;
A.a1=f;
A.a2=f;
A.i0=(1>>0);
var d=1;
label=130;
break;
}else{
var a=(A.a2);
a.a3=f;
A.a2=f;
var d=((d>>0)+(1>>0)>>0);
A.i0=(d>>0);
if(((d>>0)===(0>>0))){
var f=null;
break;
}else{
label=130;
break;
}
}
}while(0);
L357:do{
if(label===130){
label=0;
if(!(((d>>0)>(c>>0)))){
var f=null;
break;
}
if((c>>0)===(0>>0)){
var f=(A.a1);
break;
}else if((c>>0)===(-1>>0)){
break;
}
var f=(A.a1);
if(((c>>0)>(0>>0))){
var d=c;
}else{
break;
}
while(1){
var f=(f.a3);
var d=((d>>0)+(-1>>0)>>0);
if(((d>>0)>(0>>0))){
}else{
break L357;
}
}
}
}while(0);
var d=(b.i0>>0);
if(((d>>0)<(1>>0))){
var b=null;
}else{
var b=(b.a1);
}
var j=(o[(0>>0)+(c>>0)>>0]>>0);
L369:do{
if(((j>>0)>(0>>0))){
var b=(b.a0);
var f=(f.a0);
var d=0;
while(1){
var e=(b[(0>>0)+(d>>0)>>0].d1);
f[(0>>0)+(d>>0)>>0].d1=e;
var e=(b[(0>>0)+(d>>0)>>0].d0);
f[(0>>0)+(d>>0)>>0].d0=e;
var d=((d>>0)+(1>>0)>>0);
if(((d>>0)<(j>>0))){
}else{
break L369;
}
}
}
}while(0);
var c=((c>>0)+(1>>0)>>0);
if(!(((c>>0)<(4>>0)))){
break;
}
var b=(l[(2>>0)+(c>>0)>>0]);
}
var c=(t.i0>>0);
L376:do{
if(((c>>0)>(0>>0))){
var b=(t.a1);
while(1){
var d=(b.i1>>0);
if(((d>>0)>(0>>0))){
b.a0=nullArray;
}
var b=(b.a3);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L376;
}
}
}
}while(0);
l[0>>0]=null;
var c=(C.i0>>0);
L384:do{
if(((c>>0)>(0>>0))){
var b=(C.a1);
while(1){
var d=(b.i1>>0);
if(((d>>0)>(0>>0))){
b.a0=nullArray;
}
var b=(b.a3);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L384;
}
}
}
}while(0);
l[(0>>0)+(1>>0)>>0]=null;
var c=(n.i0>>0);
L392:do{
if(((c>>0)>(0>>0))){
var b=(n.a1);
while(1){
var d=(b.i1>>0);
if(((d>>0)>(0>>0))){
b.a0=nullArray;
}
var b=(b.a3);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L392;
}
}
}
}while(0);
l[2>>0]=null;
var c=(y.i0>>0);
L400:do{
if(((c>>0)>(0>>0))){
var b=(y.a1);
while(1){
var d=(b.i1>>0);
if(((d>>0)>(0>>0))){
b.a0=nullArray;
}
var b=(b.a3);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L400;
}
}
}
}while(0);
l[(2>>0)+(1>>0)>>0]=null;
var c=(w.i0>>0);
L408:do{
if(((c>>0)>(0>>0))){
var b=(w.a1);
while(1){
var d=(b.i1>>0);
if(((d>>0)>(0>>0))){
b.a0=nullArray;
}
var b=(b.a3);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L408;
}
}
}
}while(0);
l[(2>>0)+(2>>0)>>0]=null;
var c=(D.i0>>0);
if(!(((c>>0)>(0>>0)))){
return A;
}
var b=(D.a1);
while(1){
var d=(b.i1>>0);
if(((d>>0)>(0>>0))){
b.a0=nullArray;
}
var b=(b.a3);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break;
}
}
return A;
}
function bQ(y,z,w,t,q){
var label=0;
L32:do{
if(((w>>0)===(0>>0))){
var d=0;
var a=0;
var c=nullArray;
}else{
var c=createArray_struct$p_Z8GeoPoint([],0,(w<<4)/16);
if(((w>>0)>(0>>0))){
var b=0;
}else{
var d=0;
var a=0;
break;
}
while(1){
var a=(y[(z>>0)+(b>>0)>>0].d1);
c[(0>>0)+(b>>0)>>0].d1=a;
var a=(y[(z>>0)+(b>>0)>>0].d0);
c[(0>>0)+(b>>0)>>0].d0=a;
var b=((b>>0)+(1>>0)>>0);
if(((b>>0)<(w>>0))){
}else{
break;
}
}
var a=(c[0>>0].d0);
if(((w>>0)>(1>>0))){
var d=a;
var b=1;
}else{
var d=a;
break;
}
while(1){
var g=(c[(0>>0)+(b>>0)>>0].d0);
var d=((d<g)?g:d);
var a=((a>g)?g:a);
var b=((b>>0)+(1>>0)>>0);
if(((b>>0)<(w>>0))){
}else{
break L32;
}
}
}
}while(0);
var g=(t.d0);
var l=((a>d)?a:d);
do{
if(!((g>l))){
if((g<((a<d)?a:d))){
break;
}
var c=aK2(c,0,w>>0,q>>0);
return c;
}
}while(0);
if(!(((l*((a<d)?a:d))<0))){
var c=null;
return c;
}
var b=(((w<<4)>>0)+(32>>0)>>0);
var h=createArray_struct$p_Z8GeoPoint([],0,b/16);
var j=createArray_struct$p_Z8GeoPoint([],0,b/16);
var n=((w>>0)+(-1>>0)>>0);
do{
if(((n>>0)>(0>>0))){
var f=0;
var e=0;
var b=0;
while(1){
var a=(c[(0>>0)+(b>>0)>>0].d0);
do{
if((a>0)){
h[(0>>0)+(f>>0)>>0].d0=a;
h[(0>>0)+(f>>0)>>0].d1=(c[(0>>0)+(b>>0)>>0].d1);
var k=((f>>0)+(1>>0)>>0);
var i=((b>>0)+(1>>0)>>0);
var a=(c[(0>>0)+(i>>0)>>0].d0);
if(!((a<0))){
var f=k;
var b=i;
break;
}
var d=(c[(0>>0)+(b>>0)>>0].d1);
var g=(c[(0>>0)+(b>>0)>>0].d0);
var a=(a+(180-g));
if((a!==-180)){
var l=(c[(0>>0)+(i>>0)>>0].d1);
var a=((d-l)/(-180-a));
var a=((d-(a*-180))-(g*a));
}else{
var a=-180;
}
var d=(-0-g);
h[(0>>0)+(k>>0)>>0].d0=d;
h[(0>>0)+(k>>0)>>0].d1=a;
j[(0>>0)+(e>>0)>>0].d0=d;
j[(0>>0)+(e>>0)>>0].d1=a;
var f=((f>>0)+(2>>0)>>0);
var e=((e>>0)+(1>>0)>>0);
var b=i;
}else{
if(!((a<0))){
var b=((b>>0)+(1>>0)>>0);
break;
}
j[(0>>0)+(e>>0)>>0].d0=a;
j[(0>>0)+(e>>0)>>0].d1=(c[(0>>0)+(b>>0)>>0].d1);
var k=((e>>0)+(1>>0)>>0);
var i=((b>>0)+(1>>0)>>0);
var d=(c[(0>>0)+(i>>0)>>0].d0);
if(!((d>0))){
var e=k;
var b=i;
break;
}
var a=(c[(0>>0)+(i>>0)>>0].d1);
var g=(c[(0>>0)+(b>>0)>>0].d0);
var g=((180-d)+g);
if((g!==-180)){
var l=(c[(0>>0)+(b>>0)>>0].d1);
var g=((a-l)/(-180-g));
var a=((a-(g*-180))-(d*g));
}else{
var a=-180;
}
var d=(-0-d);
h[(0>>0)+(f>>0)>>0].d0=d;
h[(0>>0)+(f>>0)>>0].d1=a;
j[(0>>0)+(k>>0)>>0].d0=d;
j[(0>>0)+(k>>0)>>0].d1=a;
var f=((f>>0)+(1>>0)>>0);
var e=((e>>0)+(2>>0)>>0);
var b=i;
}
}while(0);
if(((b>>0)<(n>>0))){
}else{
break;
}
}
if(((f>>0)===(0>>0))){
var c=null;
}else{
var c=aK2(h,0,f>>0,q>>0);
}
if(((e>>0)===(0>>0))){
break;
}
var h=aK2(j,0,e>>0,q>>0);
var b=(h.i0>>0);
var e=(c.i0>>0);
c.i0=(((e>>0)+(b>>0)>>0)>>0);
var j=(h.a1);
var o=(c.a2);
o.a1=j;
c.a2=(h.a2);
h.i0=(0>>0);
h.a1=null;
h.a2=null;
h.a3=null;
}else{
var c=null;
}
}while(0);
return c;
}
function bO(q,r,t){
var label=0;
var a=aSlot={i0:0,i1:0,i2:0};
var c={i0:0,a1:null,a2:null,a3:null};
c.i0=(0>>0);
c.a1=null;
c.a2=null;
c.a3=null;
var g=(q[r>>0].d1);
var h=(q[r>>0].d0);
L23:do{
if(((t>>0)>(1>>0))){
var j=g;
var k=h;
var d=1;
while(1){
var i=(q[(r>>0)+(d>>0)>>0].d1);
var g=((g<i)?i:g);
var j=((j>i)?i:j);
var i=(q[(r>>0)+(d>>0)>>0].d0);
var k=((k<i)?i:k);
var h=((h>i)?i:h);
var d=((d>>0)+(1>>0)>>0);
if(((d>>0)<(t>>0))){
}else{
break L23;
}
}
}else{
var j=g;
var k=h;
}
}while(0);
aQ(a,h,k,j,g);
var b=(a.i0>>0);
var d=(a.i1>>0);
var l=(a.i2>>0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(b>>0);
a.a0.i1=(d>>0);
a.a0.i2=(l>>0);
a.a1=null;
var d=(c.i0>>0);
if(((d>>0)===(0>>0))){
c.a3=a;
c.a1=a;
c.a2=a;
var d=1;
}else{
var f=(c.a2);
f.a1=a;
c.a2=a;
var d=((d>>0)+(1>>0)>>0);
}
c.i0=(d>>0);
var d=((b>>0)+(1>>0)>>0);
L31:do{
if(((d>>0)<(32>>0))){
var a=null;
while(1){
if(!((a===null))){
var b=(a.i0>>0);
L36:do{
if((((b>>0)!==(0>>0))&&((b>>0)>(0>>0)))){
var a=(a.a1);
while(1){
var a=(a.a1);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L36;
}
}
}
}while(0);
}
var a=aK2(q,r,t>>0,d>>0);
var b=(a.i0>>0);
if(((b>>0)>(4>>0))){
break L31;
}
var b=(c.i0>>0);
L43:do{
if((((b>>0)!==(0>>0))&&((b>>0)>(0>>0)))){
var c=(c.a1);
while(1){
var c=(c.a1);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L43;
}
}
}
}while(0);
var c={i0:0,a1:null,a2:null,a3:null};
c.i0=(0>>0);
c.a1=null;
c.a2=null;
c.a3=null;
var f=(a.a1);
L48:do{
if(!((f===null))){
while(1){
var b=(f.a0.i0>>0);
var l=(f.a0.i1>>0);
var n=(f.a0.i2>>0);
var e={a0:{i0:0,i1:0,i2:0},a1:null};
e.a0.i0=(b>>0);
e.a0.i1=(l>>0);
e.a0.i2=(n>>0);
e.a1=null;
var b=(c.i0>>0);
if(((b>>0)===(0>>0))){
c.a3=e;
c.a1=e;
c.a2=e;
var b=1;
}else{
var o=(c.a2);
o.a1=e;
c.a2=e;
var b=((b>>0)+(1>>0)>>0);
}
c.i0=(b>>0);
var f=(f.a1);
if((f===null)){
break L48;
}else{
}
}
}
}while(0);
var d=((d>>0)+(1>>0)>>0);
if(((d>>0)<(32>>0))){
}else{
break L31;
}
}
}else{
}
}while(0);
return bb(c);
}
function bb(z){
var label=0;
var g=aSlot={i0:0,i1:0,i2:0};
var o=aSlot={i0:0,i1:0,i2:0};
var t={i0:0,a1:null,a2:null,a3:null};
t.i0=(0>>0);
t.a1=null;
t.a2=null;
t.a3=null;
var r={i0:0,a1:null,a2:null,a3:null};
r.i0=(0>>0);
r.a1=null;
r.a2=null;
r.a3=null;
var c=(z.i0>>0);
if(((c>>0)===(1>>0))){
var a={i0:0,a1:null,a2:null,a3:null};
a.i0=(0>>0);
a.a1=null;
a.a2=null;
a.a3=null;
var c=(z.i0>>0);
do{
if(((c>>0)<(1>>0))){
var d=-1;
var b=0;
var c=0;
}else{
var g=(z.a1);
if((g===null)){
var d=-1;
var b=0;
var c=0;
break;
}
var d=(g.a0.i0>>0);
var b=(g.a0.i1>>0);
var c=(g.a0.i2>>0);
}
}while(0);
var g={a0:{i0:0,i1:0,i2:0},a1:null};
g.a0.i0=(d>>0);
g.a0.i1=(b>>0);
g.a0.i2=(c>>0);
g.a1=null;
var c=(a.i0>>0);
if(((c>>0)===(0>>0))){
a.a3=g;
a.a1=g;
a.a2=g;
var c=1;
}else{
var o=(a.a2);
o.a1=g;
a.a2=g;
var c=((c>>0)+(1>>0)>>0);
}
a.i0=(c>>0);
var a=a;
return a;
}
var n=bl(z);
var d=(n.i0>>0);
L211:do{
if(((d>>0)>(1>>0))){
var c=(t.i0>>0);
while(1){
L215:do{
if(((c>>0)>(0>>0))){
var a=(t.a1);
while(1){
var a=(a.a1);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L215;
}
}
}
}while(0);
t.i0=(0>>0);
t.a1=null;
t.a2=null;
t.a3=null;
var b=(n.i0>>0);
do{
if(((b>>0)<(1>>0))){
var c=-2;
}else{
var a=(n.a1);
if((a===null)){
var c=-2;
break;
}
var c=(a.a0.i0>>0);
var c=(c<<1);
}
}while(0);
var d=((b>>0)+(-1>>0)>>0);
L224:do{
if(((d>>0)>(0>>0))){
var w=((66-c)>>0);
var f=0;
var d=0;
while(1){
while(1){
do{
if((((b>>0)===(0>>0))||(((b>>0)<=(d>>0))||((d>>0)<(-1>>0))))){
var i=-2;
var h=0;
var e=0;
var b=0;
}else{
L232:do{
if((d>>0)===(0>>0)){
var a=(n.a1);
}else if((d>>0)===(-1>>0)){
var a=(n.a2);
}else{
var a=(n.a1);
if(((d>>0)>(0>>0))){
var b=d;
}else{
break;
}
while(1){
var a=(a.a1);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L232;
}
}
}
}while(0);
L239:do{
if((a===null)){
var b=0;
}else{
var h=(a.a0.i0>>0);
var i=(a.a0.i1>>0);
var j=(a.a0.i2>>0);
if(((h>>0)>(0>>0))){
var b=0;
var e=0;
}else{
var b=0;
break;
}
while(1){
var k=(e<<1);
var b=(((((((i<<e)>>>31)<<((62-k)>>0))>>0)+(b>>0)>>0)>>0)+((((j<<e)>>>31)<<((63-k)>>0))>>0)>>0);
var e=((e>>0)+(1>>0)>>0);
if(((e>>0)<(h>>0))){
}else{
break L239;
}
}
}
}while(0);
L244:do{
if((d>>0)===(0>>0)){
var a=(n.a1);
}else if((d>>0)===(-1>>0)){
var a=(n.a2);
}else{
var a=(n.a1);
if(((d>>0)>(0>>0))){
var e=d;
}else{
break;
}
while(1){
var a=(a.a1);
var e=((e>>0)+(-1>>0)>>0);
if(((e>>0)>(0>>0))){
}else{
break L244;
}
}
}
}while(0);
if((a===null)){
var i=-2;
var h=0;
var e=0;
break;
}
var i=(a.a0.i0>>0);
var h=(a.a0.i1>>0);
var e=(a.a0.i2>>0);
var i=((i>>0)+(-1>>0)>>0);
}
}while(0);
g.i0=(i>>0);
var i=((32-i)>>0);
g.i2=(((e>>>i)<<i)>>0);
g.i1=(((h>>>i)<<i)>>0);
var h=a_(g);
if(!(((h>>0)===(1>>0)))){
break;
}
var b=(n.i0>>0);
do{
if((((b>>0)===(0>>0))||(((b>>0)<=(d>>0))||((d>>0)<(-1>>0))))){
var h=-2;
var e=0;
var b=0;
}else{
L256:do{
if((d>>0)===(0>>0)){
var a=(n.a1);
}else if((d>>0)===(-1>>0)){
var a=(n.a2);
}else{
var a=(n.a1);
if(((d>>0)>(0>>0))){
var b=d;
}else{
break;
}
while(1){
var a=(a.a1);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L256;
}
}
}
}while(0);
if((a===null)){
var h=-2;
var e=0;
var b=0;
break;
}
var h=(a.a0.i0>>0);
var e=(a.a0.i1>>0);
var b=(a.a0.i2>>0);
var h=((h>>0)+(-1>>0)>>0);
}
}while(0);
var i=((32-h)>>0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(h>>0);
a.a0.i1=(((e>>>i)<<i)>>0);
a.a0.i2=(((b>>>i)<<i)>>0);
a.a1=null;
var b=(t.i0>>0);
if(((b>>0)===(0>>0))){
t.a3=a;
t.a1=a;
t.a2=a;
var b=1;
}else{
var l=(t.a2);
l.a1=a;
t.a2=a;
var b=((b>>0)+(1>>0)>>0);
}
t.i0=(b>>0);
var b=(n.i0>>0);
var e=((b>>0)+(-1>>0)>>0);
if(((d>>0)<(e>>0))){
}else{
var d=b;
var b=e;
break L224;
}
}
var i=(b>>>w);
var j=((d>>0)+(1>>0)>>0);
var k=(n.i0>>0);
L270:do{
if(((k>>0)===(0>>0))){
var b=0;
}else{
if((((k>>0)<=(j>>0))||((j>>0)<(-1>>0)))){
var b=0;
break;
}
L273:do{
if((d>>0)===(-1>>0)){
var a=(n.a1);
}else if((d>>0)===(-2>>0)){
var a=(n.a2);
}else{
var a=(n.a1);
if(((d>>0)>(-1>>0))){
var b=j;
}else{
break;
}
while(1){
var a=(a.a1);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L273;
}
}
}
}while(0);
if((a===null)){
var b=0;
break;
}
var A=(a.a0.i0>>0);
var D=(a.a0.i1>>0);
var E=(a.a0.i2>>0);
if(((A>>0)>(0>>0))){
var b=0;
var e=0;
}else{
var b=0;
break;
}
while(1){
var C=(e<<1);
var b=(((((((D<<e)>>>31)<<((62-C)>>0))>>0)+(b>>0)>>0)>>0)+((((E<<e)>>>31)<<((63-C)>>0))>>0)>>0);
var e=((e>>0)+(1>>0)>>0);
if(((e>>0)<(A>>0))){
}else{
break L270;
}
}
}
}while(0);
L284:do{
if(((i>>0)===((b>>>w)>>0))){
var f=((f>>0)+(1>>0)>>0);
if((((f>>0)!==(((h>>0)+(-1>>0)>>0)>>0))||((j>>0)===(((k>>0)+(-1>>0)>>0)>>0)))){
var d=j;
break;
}
do{
if(((k>>0)===(0>>0))){
var e=-2;
var f=0;
var b=0;
}else{
if((((k>>0)<=(j>>0))||((j>>0)<(-1>>0)))){
var e=-2;
var f=0;
var b=0;
break;
}
L310:do{
if((d>>0)===(-1>>0)){
var a=(n.a1);
}else if((d>>0)===(-2>>0)){
var a=(n.a2);
}else{
var a=(n.a1);
if(((d>>0)>(-1>>0))){
var b=j;
}else{
break;
}
while(1){
var a=(a.a1);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L310;
}
}
}
}while(0);
if((a===null)){
var e=-2;
var f=0;
var b=0;
break;
}
var e=(a.a0.i0>>0);
var f=(a.a0.i1>>0);
var b=(a.a0.i2>>0);
var e=((e>>0)+(-1>>0)>>0);
}
}while(0);
var h=((32-e)>>0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(e>>0);
a.a0.i1=(((f>>>h)<<h)>>0);
a.a0.i2=(((b>>>h)<<h)>>0);
a.a1=null;
var b=(t.i0>>0);
if(((b>>0)===(0>>0))){
t.a3=a;
t.a1=a;
t.a2=a;
var b=1;
}else{
var l=(t.a2);
l.a1=a;
t.a2=a;
var b=((b>>0)+(1>>0)>>0);
}
t.i0=(b>>0);
var d=((d>>0)+(2>>0)>>0);
var f=0;
}else{
if(((f>>0)>(-1>>0))){
var b=k;
}else{
var d=j;
var f=0;
break;
}
while(1){
var e=((d-f)>>0);
do{
if(((b>>0)===(0>>0))){
var h=-1;
var e=0;
var b=0;
}else{
if((((b>>0)<=(e>>0))||((e>>0)<(-1>>0)))){
var h=-1;
var e=0;
var b=0;
break;
}
L291:do{
if((e>>0)===(0>>0)){
var a=(n.a1);
}else if((e>>0)===(-1>>0)){
var a=(n.a2);
}else{
var a=(n.a1);
if(((e>>0)>(0>>0))){
var b=e;
}else{
break;
}
while(1){
var a=(a.a1);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L291;
}
}
}
}while(0);
if((a===null)){
var h=-1;
var e=0;
var b=0;
break;
}
var h=(a.a0.i0>>0);
var e=(a.a0.i1>>0);
var b=(a.a0.i2>>0);
}
}while(0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(h>>0);
a.a0.i1=(e>>0);
a.a0.i2=(b>>0);
a.a1=null;
var b=(r.i0>>0);
if(((b>>0)===(0>>0))){
r.a3=a;
r.a1=a;
r.a2=a;
var b=1;
}else{
var l=(r.a2);
l.a1=a;
r.a2=a;
var b=((b>>0)+(1>>0)>>0);
}
r.i0=(b>>0);
if(!(((f>>0)>(0>>0)))){
var d=j;
var f=0;
break L284;
}
var f=((f>>0)+(-1>>0)>>0);
var b=(n.i0>>0);
}
}
}while(0);
var b=(n.i0>>0);
var e=((b>>0)+(-1>>0)>>0);
if(((d>>0)<(e>>0))){
}else{
var d=b;
var b=e;
break L224;
}
}
}else{
var aB=b;
var b=d;
var d=aB;
var f=0;
}
}while(0);
L325:do{
if(((d>>0)<(1>>0))){
var b=0;
}else{
var a=(n.a1);
L327:do{
if(((d>>0)===(1>>0))){
}else{
while(1){
var a=(a.a1);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L327;
}
}
}
}while(0);
if((a===null)){
var b=0;
break;
}
var h=(a.a0.i0>>0);
var i=(a.a0.i1>>0);
var w=(a.a0.i2>>0);
if(((h>>0)>(0>>0))){
var b=0;
var e=0;
}else{
var b=0;
break;
}
while(1){
var j=(e<<1);
var b=(((((((i<<e)>>>31)<<((62-j)>>0))>>0)+(b>>0)>>0)>>0)+((((w<<e)>>>31)<<((63-j)>>0))>>0)>>0);
var e=((e>>0)+(1>>0)>>0);
if(((e>>0)<(h>>0))){
}else{
break L325;
}
}
}
}while(0);
var e=((66-c)>>0);
var h=(b>>>e);
var c=((d>>0)+(-2>>0)>>0);
L335:do{
if((((d>>0)===(0>>0))||((c>>0)<(-1>>0)))){
var c=0;
}else{
L337:do{
if((d>>0)===(2>>0)){
var a=(n.a1);
}else if((d>>0)===(1>>0)){
var a=(n.a2);
}else{
var a=(n.a1);
while(1){
var a=(a.a1);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L337;
}
}
}
}while(0);
if((a===null)){
var c=0;
break;
}
var i=(a.a0.i0>>0);
var w=(a.a0.i1>>0);
var j=(a.a0.i2>>0);
if(((i>>0)>(0>>0))){
var c=0;
var b=0;
}else{
var c=0;
break;
}
while(1){
var k=(b<<1);
var c=(((((((w<<b)>>>31)<<((62-k)>>0))>>0)+(c>>0)>>0)>>0)+((((j<<b)>>>31)<<((63-k)>>0))>>0)>>0);
var b=((b>>0)+(1>>0)>>0);
if(((b>>0)<(i>>0))){
}else{
break L335;
}
}
}
}while(0);
var e=(c>>>e);
do{
if(((d>>0)<(1>>0))){
var d=-2;
var b=0;
var c=0;
}else{
var a=(n.a1);
L350:do{
if(((d>>0)===(1>>0))){
}else{
var c=((d>>0)+(-1>>0)>>0);
while(1){
var a=(a.a1);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L350;
}
}
}
}while(0);
if((a===null)){
var d=-2;
var b=0;
var c=0;
break;
}
var d=(a.a0.i0>>0);
var b=(a.a0.i1>>0);
var c=(a.a0.i2>>0);
var d=((d>>0)+(-1>>0)>>0);
}
}while(0);
o.i0=(d>>0);
var d=((32-d)>>0);
o.i2=(((c>>>d)<<d)>>0);
o.i1=(((b>>>d)<<d)>>0);
var b=a_(o);
L357:do{
if(((h>>0)===(e>>0))){
if(((f>>0)===(((b>>0)+(-1>>0)>>0)>>0))){
var c=(n.i0>>0);
do{
if(((c>>0)<(1>>0))){
var d=-2;
var b=0;
var c=0;
}else{
var a=(n.a1);
L391:do{
if(((c>>0)===(1>>0))){
}else{
var c=((c>>0)+(-1>>0)>>0);
while(1){
var a=(a.a1);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L391;
}
}
}
}while(0);
if((a===null)){
var d=-2;
var b=0;
var c=0;
break;
}
var d=(a.a0.i0>>0);
var b=(a.a0.i1>>0);
var c=(a.a0.i2>>0);
var d=((d>>0)+(-1>>0)>>0);
}
}while(0);
var f=((32-d)>>0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(d>>0);
a.a0.i1=(((b>>>f)<<f)>>0);
a.a0.i2=(((c>>>f)<<f)>>0);
a.a1=null;
var c=(t.i0>>0);
if(((c>>0)===(0>>0))){
t.a3=a;
t.a1=a;
t.a2=a;
var c=1;
}else{
var l=(t.a2);
l.a1=a;
t.a2=a;
var c=((c>>0)+(1>>0)>>0);
}
t.i0=(c>>0);
break;
}
if(!(((f>>0)>(-1>>0)))){
break;
}
var c=((f>>0)+(1>>0)>>0);
while(1){
var d=(n.i0>>0);
var b=((d-c)>>0);
do{
if(((d>>0)===(0>>0))){
var f=-1;
var d=0;
var b=0;
}else{
if((((c>>0)<(1>>0))||((b>>0)<(-1>>0)))){
var f=-1;
var d=0;
var b=0;
break;
}
L409:do{
if((b>>0)===(0>>0)){
var a=(n.a1);
}else if((b>>0)===(-1>>0)){
var a=(n.a2);
}else{
var a=(n.a1);
if(((b>>0)>(0>>0))){
}else{
break;
}
while(1){
var a=(a.a1);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L409;
}
}
}
}while(0);
if((a===null)){
var f=-1;
var d=0;
var b=0;
break;
}
var f=(a.a0.i0>>0);
var d=(a.a0.i1>>0);
var b=(a.a0.i2>>0);
}
}while(0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(f>>0);
a.a0.i1=(d>>0);
a.a0.i2=(b>>0);
a.a1=null;
var b=(r.i0>>0);
if(((b>>0)===(0>>0))){
r.a3=a;
r.a1=a;
r.a2=a;
var b=1;
}else{
var l=(r.a2);
l.a1=a;
r.a2=a;
var b=((b>>0)+(1>>0)>>0);
}
r.i0=(b>>0);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L357;
}
}
}else{
var d=(n.i0>>0);
var c=((d>>0)+(-1>>0)>>0);
if(((b>>0)===(1>>0))){
do{
if(((d>>0)<(1>>0))){
var d=-2;
var b=0;
var c=0;
}else{
var a=(n.a1);
L363:do{
if(((d>>0)===(1>>0))){
}else{
while(1){
var a=(a.a1);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L363;
}
}
}
}while(0);
if((a===null)){
var d=-2;
var b=0;
var c=0;
break;
}
var d=(a.a0.i0>>0);
var b=(a.a0.i1>>0);
var c=(a.a0.i2>>0);
var d=((d>>0)+(-1>>0)>>0);
}
}while(0);
var f=((32-d)>>0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(d>>0);
a.a0.i1=(((b>>>f)<<f)>>0);
a.a0.i2=(((c>>>f)<<f)>>0);
a.a1=null;
var c=(t.i0>>0);
if(((c>>0)===(0>>0))){
t.a3=a;
t.a1=a;
t.a2=a;
var c=1;
}else{
var l=(t.a2);
l.a1=a;
t.a2=a;
var c=((c>>0)+(1>>0)>>0);
}
t.i0=(c>>0);
break;
}else{
do{
if(((d>>0)<(1>>0))){
var d=-1;
var b=0;
var c=0;
}else{
var a=(n.a1);
L376:do{
if(((d>>0)===(1>>0))){
}else{
while(1){
var a=(a.a1);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L376;
}
}
}
}while(0);
if((a===null)){
var d=-1;
var b=0;
var c=0;
break;
}
var d=(a.a0.i0>>0);
var b=(a.a0.i1>>0);
var c=(a.a0.i2>>0);
}
}while(0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(d>>0);
a.a0.i1=(b>>0);
a.a0.i2=(c>>0);
a.a1=null;
var c=(r.i0>>0);
if(((c>>0)===(0>>0))){
r.a3=a;
r.a1=a;
r.a2=a;
var c=1;
}else{
var l=(r.a2);
l.a1=a;
r.a2=a;
var c=((c>>0)+(1>>0)>>0);
}
r.i0=(c>>0);
break;
}
}
}while(0);
var c=(n.i0>>0);
L423:do{
if(((c>>0)>(0>>0))){
var a=(n.a1);
while(1){
var a=(a.a1);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L423;
}
}
}
}while(0);
n.i0=(0>>0);
n.a1=null;
n.a2=null;
n.a3=null;
var c=(t.i0>>0);
if(((c>>0)>(0>>0))){
var b=0;
}else{
break L211;
}
while(1){
do{
if((((c>>0)!==(0>>0))&&((c>>0)>(b>>0)))){
L432:do{
if((b>>0)===(0>>0)){
var a=(t.a1);
}else if((b>>0)===(-1>>0)){
var a=(t.a2);
}else{
var a=(t.a1);
if(((b>>0)>(0>>0))){
var c=b;
}else{
break;
}
while(1){
var a=(a.a1);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L432;
}
}
}
}while(0);
if((a===null)){
var f=-1;
var d=0;
var c=0;
break;
}
var f=(a.a0.i0>>0);
var d=(a.a0.i1>>0);
var c=(a.a0.i2>>0);
}else{
var f=-1;
var d=0;
var c=0;
}
}while(0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(f>>0);
a.a0.i1=(d>>0);
a.a0.i2=(c>>0);
a.a1=null;
var c=(n.i0>>0);
if(((c>>0)===(0>>0))){
n.a3=a;
n.a1=a;
n.a2=a;
var d=1;
}else{
var l=(n.a2);
l.a1=a;
n.a2=a;
var d=((c>>0)+(1>>0)>>0);
}
n.i0=(d>>0);
var b=((b>>0)+(1>>0)>>0);
var c=(t.i0>>0);
if(((b>>0)<(c>>0))){
}else{
break;
}
}
if(((d>>0)>(1>>0))){
}else{
label=11;
break L211;
}
}
}else{
label=11;
}
}while(0);
L446:do{
if(label===11){
if(((d>>0)>(0>>0))){
var c=0;
}else{
break;
}
while(1){
var b=(t.i0>>0);
do{
if((((b>>0)!==(0>>0))&&((b>>0)>(c>>0)))){
L452:do{
if((c>>0)===(0>>0)){
var a=(t.a1);
}else if((c>>0)===(-1>>0)){
var a=(t.a2);
}else{
var a=(t.a1);
if(((c>>0)>(0>>0))){
var b=c;
}else{
break;
}
while(1){
var a=(a.a1);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L452;
}
}
}
}while(0);
if((a===null)){
var f=-1;
var d=0;
var b=0;
break;
}
var f=(a.a0.i0>>0);
var d=(a.a0.i1>>0);
var b=(a.a0.i2>>0);
}else{
var f=-1;
var d=0;
var b=0;
}
}while(0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(f>>0);
a.a0.i1=(d>>0);
a.a0.i2=(b>>0);
a.a1=null;
var b=(r.i0>>0);
if(((b>>0)===(0>>0))){
r.a3=a;
r.a1=a;
r.a2=a;
var b=1;
}else{
var g=(r.a2);
g.a1=a;
r.a2=a;
var b=((b>>0)+(1>>0)>>0);
}
r.i0=(b>>0);
var c=((c>>0)+(1>>0)>>0);
var b=(n.i0>>0);
if(((c>>0)<(b>>0))){
}else{
break L446;
}
}
}
}while(0);
var a=aX(r);
if(!((n===null))){
var c=(n.i0>>0);
L468:do{
if((((c>>0)!==(0>>0))&&((c>>0)>(0>>0)))){
var g=(n.a1);
while(1){
var g=(g.a1);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L468;
}
}
}
}while(0);
}
var c=(r.i0>>0);
L474:do{
if(((c>>0)>(0>>0))){
var g=(r.a1);
while(1){
var g=(g.a1);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L474;
}
}
}
}while(0);
return a;
}
function bN(aR,aS,aE){
var label=0;
var d=aSlot={i0:0,i1:0,i2:0};
var af=d;
var R=d;
var aj=d;
var ah=d;
var z=d;
var k=aSlot={i0:0,i1:0,i2:0};
var O=k;
var W=k;
var T=k;
var e=aSlot={i0:0,d1:0,d2:0};
var r=aSlot={d0:0,d1:0,d2:0,d3:0};
var D=aSlot={i0:0,i1:0,i2:0};
var ar=D;
var M=aSlot={i0:0,i1:0,i2:0};
var ae=M;
var h=aSlot={i0:0,i1:0,i2:0};
var S=h;
var aq=h;
var w=aSlot={i0:0,d1:0,d2:0};
var i=aSlot={i0:0,i1:0,i2:0};
var ak=aSlot={i0:0,i1:0,i2:0};
var al=ak;
var I=aSlot={i0:0,i1:0,i2:0};
var l=aSlot={i0:0,d1:0,d2:0};
var at=aSlot={i0:0,i1:0,i2:0};
var aa={i0:0,a1:null,a2:null,a3:null};
aa.i0=(0>>0);
aa.a1=null;
aa.a2=null;
aa.a3=null;
var a=(aR[aS>>0].d1);
var b=(aR[(aS>>0)+(1>>0)>>0].d1);
if((a>b)){
aR[aS>>0].d1=b;
aR[(aS>>0)+(1>>0)>>0].d1=a;
var j=(aR[aS>>0].d0);
aR[aS>>0].d0=(aR[(aS>>0)+(1>>0)>>0].d0);
aR[(aS>>0)+(1>>0)>>0].d0=j;
var aB=a;
var a=b;
var b=aB;
}else{
}
var j=(aR[(aS>>0)+(2>>0)>>0].d1);
if((b>j)){
aR[(aS>>0)+(1>>0)>>0].d1=j;
aR[(aS>>0)+(2>>0)>>0].d1=b;
var n=(aR[(aS>>0)+(1>>0)>>0].d0);
aR[(aS>>0)+(1>>0)>>0].d0=(aR[(aS>>0)+(2>>0)>>0].d0);
aR[(aS>>0)+(2>>0)>>0].d0=n;
var aB=b;
var b=j;
var j=aB;
}else{
}
var n=(aR[(aS>>0)+(3>>0)>>0].d1);
if((j>n)){
aR[(aS>>0)+(2>>0)>>0].d1=n;
aR[(aS>>0)+(3>>0)>>0].d1=j;
var j=(aR[(aS>>0)+(2>>0)>>0].d0);
aR[(aS>>0)+(2>>0)>>0].d0=(aR[(aS>>0)+(3>>0)>>0].d0);
aR[(aS>>0)+(3>>0)>>0].d0=j;
var j=n;
}else{
}
if((a>b)){
aR[aS>>0].d1=b;
aR[(aS>>0)+(1>>0)>>0].d1=a;
var n=(aR[aS>>0].d0);
aR[aS>>0].d0=(aR[(aS>>0)+(1>>0)>>0].d0);
aR[(aS>>0)+(1>>0)>>0].d0=n;
}else{
var aB=a;
var a=b;
var b=aB;
}
if((a>j)){
aR[(aS>>0)+(1>>0)>>0].d1=j;
aR[(aS>>0)+(2>>0)>>0].d1=a;
var a=(aR[(aS>>0)+(1>>0)>>0].d0);
aR[(aS>>0)+(1>>0)>>0].d0=(aR[(aS>>0)+(2>>0)>>0].d0);
aR[(aS>>0)+(2>>0)>>0].d0=a;
}else{
var j=a;
}
if((b>j)){
aR[aS>>0].d1=j;
aR[(aS>>0)+(1>>0)>>0].d1=b;
var a=(aR[aS>>0].d0);
aR[aS>>0].d0=(aR[(aS>>0)+(1>>0)>>0].d0);
aR[(aS>>0)+(1>>0)>>0].d0=a;
}else{
var j=b;
}
e.i0=(aE>>0);
e.d1=0;
e.d2=j;
N(k,e);
Q(d,k);
var f=(d.i1>>0);
var a=(aR[(aS>>0)+(1>>0)>>0].d1);
e.i0=(aE>>0);
e.d1=0;
e.d2=a;
N(k,e);
Q(d,k);
var E=(d.i1>>0);
var a=(aR[(aS>>0)+(2>>0)>>0].d1);
e.i0=(aE>>0);
e.d1=0;
e.d2=a;
N(k,e);
Q(d,k);
var C=(d.i1>>0);
var j=(aR[(aS>>0)+(3>>0)>>0].d1);
e.i0=(aE>>0);
e.d1=0;
e.d2=j;
N(k,e);
Q(d,k);
var az=(d.i1>>0);
L83:do{
if(((f>>0)<(E>>0))){
var c=0;
while(1){
T.i0=(aE>>0);
T.i1=(f>>0);
T.i2=(c>>0);
ac(z,T);
ad(r,z);
var a=(r.d1);
var n=(r.d3);
var b=(aR[aS>>0].d0);
var t=(aR[aS>>0].d1);
var o=(aR[(aS>>0)+(1>>0)>>0].d0);
var n=(((a>n)?a:n)+-1.0E-10);
if((b!==o)){
var a=(aR[(aS>>0)+(1>>0)>>0].d1);
var a=((t-a)/(b-o));
var a=((n-(t-(b*a)))/a);
}else{
var a=b;
}
var o=(aR[(aS>>0)+(2>>0)>>0].d0);
if((b!==o)){
var A=(aR[(aS>>0)+(2>>0)>>0].d1);
var o=((t-A)/(b-o));
var b=((n-(t-(b*o)))/o);
}else{
}
e.i0=(aE>>0);
e.d1=((a>b)?b:a);
e.d2=j;
N(D,e);
Q(M,D);
var g=(M.i2>>0);
w.i0=(aE>>0);
w.d1=((a>b)?a:b);
w.d2=j;
N(h,w);
Q(i,h);
var V=(i.i2>>0);
L93:do{
if(((g>>0)>(V>>0))){
}else{
var c=g;
while(1){
I.i0=(aE>>0);
I.i1=(f>>0);
I.i2=(c>>0);
ac(ak,I);
var g=(ak.i0>>0);
var k={a0:{i0:0,i1:0,i2:0},a1:null};
k.a0.i0=(g>>0);
k.a1=null;
var g=(aa.i0>>0);
if(((g>>0)===(0>>0))){
aa.a3=k;
aa.a1=k;
aa.a2=k;
var g=1;
}else{
var aC=(aa.a2);
aC.a1=k;
aa.a2=k;
var g=((g>>0)+(1>>0)>>0);
}
aa.i0=(g>>0);
var g=((c>>0)+(1>>0)>>0);
if(((c>>0)<(V>>0))){
var c=g;
}else{
var c=V;
break L93;
}
}
}
}while(0);
var f=((f>>0)+(1>>0)>>0);
if(((f>>0)<(E>>0))){
}else{
break L83;
}
}
}else{
var c=0;
}
}while(0);
var f=((E>>0)+(1>>0)>>0);
L102:do{
if(((f>>0)<(C>>0))){
while(1){
W.i0=(aE>>0);
W.i1=(f>>0);
W.i2=(c>>0);
ac(ah,W);
ad(r,ah);
var a=(r.d0);
var b=(r.d2);
e.i0=(aE>>0);
e.d1=((a>b)?b:a);
e.d2=j;
N(aj,e);
Q(ar,aj);
var g=(ar.i2>>0);
e.i0=(aE>>0);
e.d1=((a>b)?a:b);
e.d2=j;
N(R,e);
Q(M,R);
var V=(M.i2>>0);
L106:do{
if(((g>>0)>(V>>0))){
}else{
var c=g;
while(1){
d.i0=(aE>>0);
d.i1=(f>>0);
d.i2=(c>>0);
ac(h,d);
var g=(h.i0>>0);
var z={a0:{i0:0,i1:0,i2:0},a1:null};
z.a0.i0=(g>>0);
z.a1=null;
var g=(aa.i0>>0);
if(((g>>0)===(0>>0))){
aa.a3=z;
aa.a1=z;
aa.a2=z;
var g=1;
}else{
var k=(aa.a2);
k.a1=z;
aa.a2=z;
var g=((g>>0)+(1>>0)>>0);
}
aa.i0=(g>>0);
var g=((c>>0)+(1>>0)>>0);
if(((c>>0)<(V>>0))){
var c=g;
}else{
var c=V;
break L106;
}
}
}
}while(0);
var f=((f>>0)+(1>>0)>>0);
if(((f>>0)<(C>>0))){
}else{
break L102;
}
}
}else{
}
}while(0);
O.i0=(aE>>0);
O.i1=(E>>0);
O.i2=(c>>0);
ac(af,O);
ad(r,af);
var b=(r.d1);
var n=(r.d3);
var t=(aR[(aS>>0)+(1>>0)>>0].d0);
do{
if(((E>>0)===(C>>0))){
var a=(aR[(aS>>0)+(2>>0)>>0].d0);
}else{
var a=(aR[aS>>0].d0);
var o=(aR[aS>>0].d1);
var A=(aR[(aS>>0)+(2>>0)>>0].d0);
if(!((a!==A))){
break;
}
var as=(aR[(aS>>0)+(2>>0)>>0].d1);
var A=((o-as)/(a-A));
var a=(((((b>n)?b:n)+-1.0E-10)-(o-(a*A)))/A);
}
}while(0);
e.i0=(aE>>0);
e.d1=((t>a)?a:t);
e.d2=j;
N(D,e);
Q(M,D);
var f=(M.i2>>0);
w.i0=(aE>>0);
w.d1=((t>a)?t:a);
w.d2=j;
N(ae,w);
Q(aq,ae);
var g=(aq.i2>>0);
L120:do{
if(((f>>0)>(g>>0))){
}else{
while(1){
i.i0=(aE>>0);
i.i1=(E>>0);
i.i2=(f>>0);
ac(h,i);
var c=(h.i0>>0);
var d={a0:{i0:0,i1:0,i2:0},a1:null};
d.a0.i0=(c>>0);
d.a1=null;
var c=(aa.i0>>0);
if(((c>>0)===(0>>0))){
aa.a3=d;
aa.a1=d;
aa.a2=d;
var c=1;
}else{
var R=(aa.a2);
R.a1=d;
aa.a2=d;
var c=((c>>0)+(1>>0)>>0);
}
aa.i0=(c>>0);
var c=((f>>0)+(1>>0)>>0);
if(((f>>0)<(g>>0))){
var f=c;
}else{
var c=g;
break L120;
}
}
}
}while(0);
L129:do{
if(((E>>0)===(C>>0))){
}else{
i.i0=(aE>>0);
i.i1=(C>>0);
i.i2=(c>>0);
ac(h,i);
ad(r,h);
var b=(r.d1);
var n=(r.d3);
var t=(aR[(aS>>0)+(2>>0)>>0].d0);
var a=(aR[(aS>>0)+(1>>0)>>0].d0);
var o=(aR[(aS>>0)+(1>>0)>>0].d1);
var A=(aR[(aS>>0)+(3>>0)>>0].d0);
if((a!==A)){
var as=(aR[(aS>>0)+(3>>0)>>0].d1);
var A=((o-as)/(a-A));
var a=(((((b>n)?n:b)+1.0E-10)-(o-(a*A)))/A);
}else{
}
l.i0=(aE>>0);
l.d1=((t>a)?a:t);
l.d2=j;
N(h,l);
Q(i,h);
var f=(i.i2>>0);
l.i0=(aE>>0);
l.d1=((t>a)?t:a);
l.d2=j;
N(h,l);
Q(i,h);
var g=(i.i2>>0);
if(((f>>0)>(g>>0))){
break;
}
while(1){
i.i0=(aE>>0);
i.i1=(C>>0);
i.i2=(f>>0);
ac(h,i);
var c=(h.i0>>0);
var d={a0:{i0:0,i1:0,i2:0},a1:null};
d.a0.i0=(c>>0);
d.a1=null;
var c=(aa.i0>>0);
if(((c>>0)===(0>>0))){
aa.a3=d;
aa.a1=d;
aa.a2=d;
var c=1;
}else{
var R=(aa.a2);
R.a1=d;
aa.a2=d;
var c=((c>>0)+(1>>0)>>0);
}
aa.i0=(c>>0);
var c=((f>>0)+(1>>0)>>0);
if(((f>>0)<(g>>0))){
var f=c;
}else{
var c=g;
break L129;
}
}
}
}while(0);
var E=((((((C>>0)!==(az>>0))?1:0)?1:0)>>0)+(az>>0)>>0);
var f=((C>>0)+(1>>0)>>0);
L142:do{
if(((f>>0)<(E>>0))){
while(1){
i.i0=(aE>>0);
i.i1=(f>>0);
i.i2=(c>>0);
ac(h,i);
ad(r,h);
var b=(r.d1);
var n=(r.d3);
var a=(aR[(aS>>0)+(1>>0)>>0].d0);
var t=(aR[(aS>>0)+(1>>0)>>0].d1);
var o=(aR[(aS>>0)+(3>>0)>>0].d0);
var n=(((b>n)?n:b)+1.0E-10);
if((a!==o)){
var b=(aR[(aS>>0)+(3>>0)>>0].d1);
var b=((t-b)/(a-o));
var a=((n-(t-(a*b)))/b);
}else{
}
var b=(aR[(aS>>0)+(2>>0)>>0].d0);
var t=(aR[(aS>>0)+(2>>0)>>0].d1);
if((b!==o)){
var A=(aR[(aS>>0)+(3>>0)>>0].d1);
var o=((t-A)/(b-o));
var b=((n-(t-(b*o)))/o);
}else{
}
l.i0=(aE>>0);
l.d1=((a>b)?b:a);
l.d2=j;
N(h,l);
Q(al,h);
var g=(al.i2>>0);
l.i0=(aE>>0);
l.d1=((a>b)?a:b);
l.d2=j;
N(h,l);
Q(I,h);
var C=(I.i2>>0);
L152:do{
if(((g>>0)>(C>>0))){
}else{
var c=g;
while(1){
S.i0=(aE>>0);
S.i1=(f>>0);
S.i2=(c>>0);
ac(at,S);
var g=(at.i0>>0);
var d={a0:{i0:0,i1:0,i2:0},a1:null};
d.a0.i0=(g>>0);
d.a1=null;
var g=(aa.i0>>0);
if(((g>>0)===(0>>0))){
aa.a3=d;
aa.a1=d;
aa.a2=d;
var g=1;
}else{
var R=(aa.a2);
R.a1=d;
aa.a2=d;
var g=((g>>0)+(1>>0)>>0);
}
aa.i0=(g>>0);
var g=((c>>0)+(1>>0)>>0);
if(((c>>0)<(C>>0))){
var c=g;
}else{
var c=C;
break L152;
}
}
}
}while(0);
var f=((f>>0)+(1>>0)>>0);
if(((f>>0)<(E>>0))){
}else{
break L142;
}
}
}
}while(0);
return aa;
}
function ba(C,z,w,A,D){
var label=0;
var a=aSlot={i0:0,i1:0,i2:0};
var b=a;
var o=a;
var g=aSlot={i0:0,d1:0,d2:0};
var j=aSlot={i0:0,i1:0,i2:0};
var h=aSlot={i0:0,d1:0,d2:0};
var k=aSlot={i0:0,i1:0,i2:0};
var l=aSlot={i0:0,i1:0,i2:0};
var n={i0:0,a1:null,a2:null,a3:null};
n.i0=(0>>0);
n.a1=null;
n.a2=null;
n.a3=null;
if((z>0)){
var t=z;
}else{
var t=(z+-1.0E-10);
}
if((C>0)){
var r=(C+1.0E-10);
}else{
var r=C;
}
g.i0=(D>>0);
g.d1=r;
g.d2=t;
N(a,g);
var f=(a.i0>>0);
var d=(a.i1>>0);
var c=(a.i2>>0);
j.i0=(f>>0);
j.i1=(d>>0);
j.i2=(c>>0);
Q(o,j);
var d=(o.i1>>0);
var c=(o.i2>>0);
if((A>0)){
var t=(A+1.0E-10);
}else{
var t=A;
}
if((w>0)){
var r=w;
}else{
var r=(w+-1.0E-10);
}
h.i0=(D>>0);
h.d1=r;
h.d2=t;
N(a,h);
var f=(a.i0>>0);
var e=(a.i1>>0);
var i=(a.i2>>0);
k.i0=(f>>0);
k.i1=(e>>0);
k.i2=(i>>0);
Q(b,k);
var e=(b.i1>>0);
var i=(b.i2>>0);
var f=(((d>>0)<(e>>0))?d:e);
var e=(((d>>0)>(e>>0))?d:e);
var E=(((c>>0)<(i>>0))?c:i);
var i=(((c>>0)>(i>>0))?c:i);
while(1){
var d=E;
while(1){
l.i0=(D>>0);
l.i1=(f>>0);
l.i2=(d>>0);
ac(a,l);
var c=(a.i0>>0);
var M=(a.i1>>0);
var I=(a.i2>>0);
var b={a0:{i0:0,i1:0,i2:0},a1:null};
b.a0.i0=(c>>0);
b.a0.i1=(M>>0);
b.a0.i2=(I>>0);
b.a1=null;
var c=(n.i0>>0);
if(((c>>0)===(0>>0))){
n.a3=b;
n.a1=b;
n.a2=b;
var c=1;
}else{
var o=(n.a2);
o.a1=b;
n.a2=b;
var c=((c>>0)+(1>>0)>>0);
}
n.i0=(c>>0);
var c=((d>>0)+(1>>0)>>0);
if(((d>>0)<(i>>0))){
var d=c;
}else{
break;
}
}
var d=((f>>0)+(1>>0)>>0);
if(((f>>0)<(e>>0))){
var f=d;
}else{
break;
}
}
return n;
}
function a_(j){
var label=0;
var e=aSlot={i0:0,i1:0,i2:0};
e.i0=((j.i0>>0)>>0);
e.i1=((j.i1>>0)>>0);
e.i2=((j.i2>>0)>>0);
var h=bj(e,1>>0);
var k=(h.i0>>0);
L16:do{
if(((k>>0)>(0>>0))){
var g=0;
var c=0;
while(1){
L20:do{
if((c>>0)===(0>>0)){
var b=(h.a1);
}else if((c>>0)===(-1>>0)){
var b=(h.a2);
}else{
var b=(h.a1);
if(((c>>0)>(0>>0))){
var a=c;
}else{
break;
}
while(1){
var b=(b.a1);
var a=((a>>0)+(-1>>0)>>0);
if(((a>>0)>(0>>0))){
}else{
break L20;
}
}
}
}while(0);
do{
if((b===null)){
var d=undefined;
var a=undefined;
label=12;
}else{
var i=(b.a0.i0>>0);
var a=(b.a0.i1>>0);
var d=(b.a0.i2>>0);
var f=((32-i)>>0);
var d=((d>>>f)<<f);
var a=((a>>>f)<<f);
if(((i>>0)>(18>>0))){
if(((((d&122880)>>0)===(122880>>0))||(((a&122880)>>0)===(122880>>0)))){
var a=0;
break;
}
}else{
if(!(((i>>0)>(13>>0)))){
label=12;
break;
}
}
if(((((d&7864320)>>0)===(7864320>>0))||(((a&7864320)>>0)===(7864320>>0)))){
var a=0;
break;
}else{
label=12;
break;
}
}
}while(0);
if(label===12){
label=0;
var a=((((((a&2139095040)>>>0)<(1509949441>>>0))&&(((d&2139095040)>>>0)<(754974721>>>0)))?1:0)?1:0);
}
var g=((a>>0)+(g>>0)>>0);
var c=((c>>0)+(1>>0)>>0);
if(((c>>0)<(k>>0))){
}else{
break L16;
}
}
}else{
var g=0;
}
}while(0);
return g>>0;
}
function bj(l,k){
var label=0;
var f={i0:0,a1:null,a2:null,a3:null};
f.i0=(0>>0);
f.a1=null;
f.a2=null;
f.a3=null;
var d=(l.i0>>0);
var g=((d>>0)+(k>>0)>>0);
var h=P(1,k>>0);
if(!((((h>>0)>>0)>(0>>0)))){
return f;
}
var d=(l.i2>>0);
var b=((32-g)>>0);
var A=(d>>>b);
var d=(l.i1>>0);
var t=(d>>>b);
var n=((g>>0)>(18>>0))?1:0;
var z=((g>>0)>(13>>0))?1:0;
var d=0;
while(1){
var j=(((d>>0)+(A>>0)>>0)<<b);
var h=P(1,k>>0);
L24:do{
if((((h>>0)>>0)>(0>>0))){
var c=((j>>>b)<<b);
var w=(((c&122880)>>0)===(122880>>0))?1:0;
var o=(((c&7864320)>>0)===(7864320>>0))?1:0;
var r=(((c&2139095040)>>>0)>(754974720>>>0))?1:0;
var c=0;
while(1){
var e=(((c>>0)+(t>>0)>>0)<<b);
var i=((e>>>b)<<b);
do{
if((n>>0)){
if(((w>>0)||(((i&122880)>>0)===(122880>>0)))){
break;
}else{
label=7;
break;
}
}else{
if((z>>0)){
label=7;
break;
}else{
label=8;
break;
}
}
}while(0);
do{
if(label===7){
label=0;
if(((o>>0)||(((i&7864320)>>0)===(7864320>>0)))){
break;
}else{
label=8;
break;
}
}
}while(0);
do{
if(label===8){
label=0;
if(((r>>0)||(((i&2139095040)>>>0)>(1509949440>>>0)))){
break;
}
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(g>>0);
a.a0.i1=(e>>0);
a.a0.i2=(j>>0);
a.a1=null;
var e=(f.i0>>0);
if(((e>>0)===(0>>0))){
f.a3=a;
f.a1=a;
f.a2=a;
var e=1;
}else{
var C=(f.a2);
C.a1=a;
f.a2=a;
var e=((e>>0)+(1>>0)>>0);
}
f.i0=(e>>0);
}
}while(0);
var c=((c>>0)+(1>>0)>>0);
var h=P(1,k>>0);
if(((c>>0)<((h>>0)>>0))){
}else{
break L24;
}
}
}
}while(0);
var d=((d>>0)+(1>>0)>>0);
var h=P(1,k>>0);
if(((d>>0)<((h>>0)>>0))){
}else{
break;
}
}
return f;
}
function bC(r){
var label=0;
var b=aSlot={i0:0,i1:0,i2:0};
var e=aSlot={i0:0,i1:0,i2:0};
var d=aSlot={i0:0,i1:0,i2:0};
var g=aSlot={i0:0,i1:0,i2:0};
var f=aSlot={i0:0,i1:0,i2:0};
var h={i0:0,a1:null,a2:null,a3:null};
h.i0=(0>>0);
h.a1=null;
h.a2=null;
h.a3=null;
var j=(r.i0>>0);
e.i0=(j>>0);
var i=(r.i1>>0);
e.i1=(i>>0);
var k=(r.i2>>0);
e.i2=(k>>0);
an(b,e,-1>>0,0>>0);
var c=(b.i0>>0);
var l=(b.i1>>0);
var o=(b.i2>>0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(c>>0);
a.a0.i1=(l>>0);
a.a0.i2=(o>>0);
a.a1=null;
var c=(h.i0>>0);
if(((c>>0)===(0>>0))){
h.a3=a;
h.a1=a;
h.a2=a;
var c=1;
}else{
var n=(h.a2);
n.a1=a;
h.a2=a;
var c=((c>>0)+(1>>0)>>0);
}
h.i0=(c>>0);
d.i0=(j>>0);
d.i1=(i>>0);
d.i2=(k>>0);
an(b,d,1>>0,0>>0);
var c=(b.i0>>0);
var l=(b.i1>>0);
var o=(b.i2>>0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(c>>0);
a.a0.i1=(l>>0);
a.a0.i2=(o>>0);
a.a1=null;
var c=(h.i0>>0);
if(((c>>0)===(0>>0))){
h.a3=a;
h.a1=a;
h.a2=a;
var c=1;
}else{
var n=(h.a2);
n.a1=a;
h.a2=a;
var c=((c>>0)+(1>>0)>>0);
}
h.i0=(c>>0);
g.i0=(j>>0);
g.i1=(i>>0);
g.i2=(k>>0);
an(b,g,0>>0,-1>>0);
var c=(b.i0>>0);
var l=(b.i1>>0);
var o=(b.i2>>0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(c>>0);
a.a0.i1=(l>>0);
a.a0.i2=(o>>0);
a.a1=null;
var c=(h.i0>>0);
if(((c>>0)===(0>>0))){
h.a3=a;
h.a1=a;
h.a2=a;
var c=1;
}else{
var n=(h.a2);
n.a1=a;
h.a2=a;
var c=((c>>0)+(1>>0)>>0);
}
h.i0=(c>>0);
f.i0=(j>>0);
f.i1=(i>>0);
f.i2=(k>>0);
an(b,f,0>>0,1>>0);
var c=(b.i0>>0);
var j=(b.i1>>0);
var i=(b.i2>>0);
var b={a0:{i0:0,i1:0,i2:0},a1:null};
b.a0.i0=(c>>0);
b.a0.i1=(j>>0);
b.a0.i2=(i>>0);
b.a1=null;
var c=(h.i0>>0);
if(((c>>0)===(0>>0))){
h.a3=b;
h.a1=b;
h.a2=b;
var c=1;
}else{
var a=(h.a2);
a.a1=b;
h.a2=b;
var c=((c>>0)+(1>>0)>>0);
}
h.i0=(c>>0);
return h;
}
function bG(A){
var label=0;
var b=aSlot={i0:0,i1:0,i2:0};
var n=aSlot={i0:0,i1:0,i2:0};
var l=aSlot={i0:0,i1:0,i2:0};
var t=aSlot={i0:0,i1:0,i2:0};
var k=aSlot={i0:0,i1:0,i2:0};
var j=aSlot={i0:0,i1:0,i2:0};
var w=aSlot={i0:0,i1:0,i2:0};
var o=aSlot={i0:0,i1:0,i2:0};
var r=aSlot={i0:0,i1:0,i2:0};
var z={i0:0,a1:null,a2:null,a3:null};
z.i0=(0>>0);
z.a1=null;
z.a2=null;
z.a3=null;
var e=(A.i0>>0);
n.i0=(e>>0);
var d=(A.i1>>0);
n.i1=(d>>0);
var f=(A.i2>>0);
n.i2=(f>>0);
an(b,n,0>>0,1>>0);
var c=(b.i0>>0);
var g=(b.i1>>0);
var i=(b.i2>>0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(c>>0);
a.a0.i1=(g>>0);
a.a0.i2=(i>>0);
a.a1=null;
var c=(z.i0>>0);
if(((c>>0)===(0>>0))){
z.a3=a;
z.a1=a;
z.a2=a;
var c=1;
}else{
var h=(z.a2);
h.a1=a;
z.a2=a;
var c=((c>>0)+(1>>0)>>0);
}
z.i0=(c>>0);
l.i0=(e>>0);
l.i1=(d>>0);
l.i2=(f>>0);
an(b,l,1>>0,1>>0);
var c=(b.i0>>0);
var g=(b.i1>>0);
var i=(b.i2>>0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(c>>0);
a.a0.i1=(g>>0);
a.a0.i2=(i>>0);
a.a1=null;
var c=(z.i0>>0);
if(((c>>0)===(0>>0))){
z.a3=a;
z.a1=a;
z.a2=a;
var c=1;
}else{
var h=(z.a2);
h.a1=a;
z.a2=a;
var c=((c>>0)+(1>>0)>>0);
}
z.i0=(c>>0);
t.i0=(e>>0);
t.i1=(d>>0);
t.i2=(f>>0);
an(b,t,1>>0,0>>0);
var c=(b.i0>>0);
var g=(b.i1>>0);
var i=(b.i2>>0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(c>>0);
a.a0.i1=(g>>0);
a.a0.i2=(i>>0);
a.a1=null;
var c=(z.i0>>0);
if(((c>>0)===(0>>0))){
z.a3=a;
z.a1=a;
z.a2=a;
var c=1;
}else{
var h=(z.a2);
h.a1=a;
z.a2=a;
var c=((c>>0)+(1>>0)>>0);
}
z.i0=(c>>0);
k.i0=(e>>0);
k.i1=(d>>0);
k.i2=(f>>0);
an(b,k,1>>0,-1>>0);
var c=(b.i0>>0);
var g=(b.i1>>0);
var i=(b.i2>>0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(c>>0);
a.a0.i1=(g>>0);
a.a0.i2=(i>>0);
a.a1=null;
var c=(z.i0>>0);
if(((c>>0)===(0>>0))){
z.a3=a;
z.a1=a;
z.a2=a;
var c=1;
}else{
var h=(z.a2);
h.a1=a;
z.a2=a;
var c=((c>>0)+(1>>0)>>0);
}
z.i0=(c>>0);
j.i0=(e>>0);
j.i1=(d>>0);
j.i2=(f>>0);
an(b,j,0>>0,-1>>0);
var c=(b.i0>>0);
var g=(b.i1>>0);
var i=(b.i2>>0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(c>>0);
a.a0.i1=(g>>0);
a.a0.i2=(i>>0);
a.a1=null;
var c=(z.i0>>0);
if(((c>>0)===(0>>0))){
z.a3=a;
z.a1=a;
z.a2=a;
var c=1;
}else{
var h=(z.a2);
h.a1=a;
z.a2=a;
var c=((c>>0)+(1>>0)>>0);
}
z.i0=(c>>0);
w.i0=(e>>0);
w.i1=(d>>0);
w.i2=(f>>0);
an(b,w,-1>>0,-1>>0);
var c=(b.i0>>0);
var g=(b.i1>>0);
var i=(b.i2>>0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(c>>0);
a.a0.i1=(g>>0);
a.a0.i2=(i>>0);
a.a1=null;
var c=(z.i0>>0);
if(((c>>0)===(0>>0))){
z.a3=a;
z.a1=a;
z.a2=a;
var c=1;
}else{
var h=(z.a2);
h.a1=a;
z.a2=a;
var c=((c>>0)+(1>>0)>>0);
}
z.i0=(c>>0);
o.i0=(e>>0);
o.i1=(d>>0);
o.i2=(f>>0);
an(b,o,-1>>0,0>>0);
var c=(b.i0>>0);
var g=(b.i1>>0);
var i=(b.i2>>0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(c>>0);
a.a0.i1=(g>>0);
a.a0.i2=(i>>0);
a.a1=null;
var c=(z.i0>>0);
if(((c>>0)===(0>>0))){
z.a3=a;
z.a1=a;
z.a2=a;
var c=1;
}else{
var h=(z.a2);
h.a1=a;
z.a2=a;
var c=((c>>0)+(1>>0)>>0);
}
z.i0=(c>>0);
r.i0=(e>>0);
r.i1=(d>>0);
r.i2=(f>>0);
an(b,r,-1>>0,1>>0);
var c=(b.i0>>0);
var e=(b.i1>>0);
var d=(b.i2>>0);
var b={a0:{i0:0,i1:0,i2:0},a1:null};
b.a0.i0=(c>>0);
b.a0.i1=(e>>0);
b.a0.i2=(d>>0);
b.a1=null;
var c=(z.i0>>0);
if(((c>>0)===(0>>0))){
z.a3=b;
z.a1=b;
z.a2=b;
var c=1;
}else{
var a=(z.a2);
a.a1=b;
z.a2=b;
var c=((c>>0)+(1>>0)>>0);
}
z.i0=(c>>0);
return z;
}
function bD(w,t){
var label=0;
var h={i0:0,a1:null,a2:null,a3:null};
h.i0=(0>>0);
h.a1=null;
h.a2=null;
h.a3=null;
var n=(w.i0>>0);
var l=(t.i0>>0);
if(!(((l>>0)>(0>>0)))){
return h;
}
var r=((n>>0)>(0>>0))?1:0;
var e=0;
while(1){
L48:do{
if((r>>0)){
var o=((e>>0)>(0>>0))?1:0;
var d=0;
while(1){
var b=(w.i0>>0);
do{
if((((b>>0)!==(0>>0))&&((b>>0)>(d>>0)))){
L54:do{
if((d>>0)===(0>>0)){
var a=(w.a1);
}else if((d>>0)===(-1>>0)){
var a=(w.a2);
}else{
var a=(w.a1);
if(((d>>0)>(0>>0))){
var b=d;
}else{
break;
}
while(1){
var a=(a.a1);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L54;
}
}
}
}while(0);
if((a===null)){
var f=-1;
var g=0;
var b=0;
break;
}
var f=(a.a0.i0>>0);
var g=(a.a0.i1>>0);
var b=(a.a0.i2>>0);
}else{
var f=-1;
var g=0;
var b=0;
}
}while(0);
var c=(t.i0>>0);
do{
if((((c>>0)!==(0>>0))&&((c>>0)>(e>>0)))){
L65:do{
if((e>>0)===(0>>0)){
var a=(t.a1);
}else if((e>>0)===(-1>>0)){
var a=(t.a2);
}else{
var a=(t.a1);
if((o>>0)){
var c=e;
}else{
break;
}
while(1){
var a=(a.a1);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L65;
}
}
}
}while(0);
if((a===null)){
var i=-1;
var j=0;
var c=0;
break;
}
var i=(a.a0.i0>>0);
var j=(a.a0.i1>>0);
var c=(a.a0.i2>>0);
}else{
var i=-1;
var j=0;
var c=0;
}
}while(0);
do{
if(((f>>0)===(i>>0))){
if(!((((b>>0)===(c>>0))&&((g>>0)===(j>>0))))){
break;
}
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(f>>0);
a.a0.i1=(g>>0);
a.a0.i2=(b>>0);
a.a1=null;
var b=(h.i0>>0);
if(((b>>0)===(0>>0))){
h.a3=a;
h.a1=a;
h.a2=a;
var b=1;
}else{
var k=(h.a2);
k.a1=a;
h.a2=a;
var b=((b>>0)+(1>>0)>>0);
}
h.i0=(b>>0);
}else{
if(((((f-i)>>0)>>0)<(0>>0))){
if(!((((((j^g)|(c^b))>>>((32-f)>>0))>>0)===(0>>0)))){
break;
}
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(i>>0);
a.a0.i1=(j>>0);
a.a0.i2=(c>>0);
a.a1=null;
var b=(h.i0>>0);
if(((b>>0)===(0>>0))){
h.a3=a;
h.a1=a;
h.a2=a;
var b=1;
}else{
var k=(h.a2);
k.a1=a;
h.a2=a;
var b=((b>>0)+(1>>0)>>0);
}
h.i0=(b>>0);
break;
}else{
if(!((((((j^g)|(c^b))>>>((32-i)>>0))>>0)===(0>>0)))){
break;
}
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(f>>0);
a.a0.i1=(g>>0);
a.a0.i2=(b>>0);
a.a1=null;
var b=(h.i0>>0);
if(((b>>0)===(0>>0))){
h.a3=a;
h.a1=a;
h.a2=a;
var b=1;
}else{
var k=(h.a2);
k.a1=a;
h.a2=a;
var b=((b>>0)+(1>>0)>>0);
}
h.i0=(b>>0);
break;
}
}
}while(0);
var d=((d>>0)+(1>>0)>>0);
if(((d>>0)<(n>>0))){
}else{
break L48;
}
}
}
}while(0);
var e=((e>>0)+(1>>0)>>0);
if(((e>>0)<(l>>0))){
}else{
break;
}
}
return h;
}
function bF(w,t){
var label=0;
var i={i0:0,a1:null,a2:null,a3:null};
i.i0=(0>>0);
i.a1=null;
i.a2=null;
i.a3=null;
var j={i0:0,a1:null,a2:null,a3:null};
j.i0=(0>>0);
j.a1=null;
j.a2=null;
j.a3=null;
var a=(w.a1);
L89:do{
if((a===null)){
var b=0;
}else{
while(1){
var b=(a.a0.i0>>0);
var d=(a.a0.i1>>0);
var c=(a.a0.i2>>0);
var h={a0:{i0:0,i1:0,i2:0},a1:null};
h.a0.i0=(b>>0);
h.a0.i1=(d>>0);
h.a0.i2=(c>>0);
h.a1=null;
var b=(j.i0>>0);
if(((b>>0)===(0>>0))){
j.a3=h;
j.a1=h;
j.a2=h;
var b=1;
}else{
var r=(j.a2);
r.a1=h;
j.a2=h;
var b=((b>>0)+(1>>0)>>0);
}
j.i0=(b>>0);
var a=(a.a1);
if((a===null)){
break L89;
}else{
}
}
}
}while(0);
var l=(t.i0>>0);
if(((l>>0)>(0>>0))){
var c=b;
var b=l;
var d=0;
while(1){
do{
if((((b>>0)!==(0>>0))&&((b>>0)>(d>>0)))){
L103:do{
if((d>>0)===(0>>0)){
var a=(t.a1);
}else if((d>>0)===(-1>>0)){
var a=(t.a2);
}else{
var a=(t.a1);
if(((d>>0)>(0>>0))){
var b=d;
}else{
break;
}
while(1){
var a=(a.a1);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L103;
}
}
}
}while(0);
if((a===null)){
var e=-1;
var g=0;
var b=0;
break;
}
var e=(a.a0.i0>>0);
var g=(a.a0.i1>>0);
var b=(a.a0.i2>>0);
}else{
var e=-1;
var g=0;
var b=0;
}
}while(0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(e>>0);
a.a0.i1=(g>>0);
a.a0.i2=(b>>0);
a.a1=null;
var b=(i.i0>>0);
if(((b>>0)===(0>>0))){
i.a3=a;
i.a1=a;
i.a2=a;
var b=1;
}else{
var h=(i.a2);
h.a1=a;
i.a2=a;
var b=((b>>0)+(1>>0)>>0);
}
i.i0=(b>>0);
L116:do{
if(((c>>0)>(0>>0))){
var o=((d>>0)>(0>>0))?1:0;
var b=(j.i0>>0);
var g=c;
var c=0;
while(1){
do{
if(((b>>0)===(0>>0))){
var e=-1;
}else{
if((((b>>0)<=(c>>0))||((c>>0)<(-1>>0)))){
var e=-1;
break;
}
L123:do{
if((c>>0)===(0>>0)){
var a=(j.a1);
}else if((c>>0)===(-1>>0)){
var a=(j.a2);
}else{
var a=(j.a1);
if(((c>>0)>(0>>0))){
var e=c;
}else{
break;
}
while(1){
var a=(a.a1);
var e=((e>>0)+(-1>>0)>>0);
if(((e>>0)>(0>>0))){
}else{
break L123;
}
}
}
}while(0);
if((a===null)){
var e=-1;
break;
}
var e=(a.a0.i0>>0);
}
}while(0);
var f=(t.i0>>0);
do{
if((((f>>0)!==(0>>0))&&((f>>0)>(d>>0)))){
L134:do{
if((d>>0)===(0>>0)){
var a=(t.a1);
}else if((d>>0)===(-1>>0)){
var a=(t.a2);
}else{
var a=(t.a1);
if((o>>0)){
var f=d;
}else{
break;
}
while(1){
var a=(a.a1);
var f=((f>>0)+(-1>>0)>>0);
if(((f>>0)>(0>>0))){
}else{
break L134;
}
}
}
}while(0);
if((a===null)){
var f=-1;
break;
}
var f=(a.a0.i0>>0);
}else{
var f=-1;
}
}while(0);
if(((e>>0)===(f>>0))){
var k=e;
}else{
var k=(((((e-f)>>0)>>0)<(0>>0))?f:e);
}
L146:do{
if(((e>>0)<(f>>0))){
var e=(i.i0>>0);
if(((e>>0)>(0>>0))){
var b=0;
}else{
break;
}
while(1){
L172:do{
if((b>>0)===(0>>0)){
var a=(i.a1);
}else if((b>>0)===(-1>>0)){
var a=(i.a2);
}else{
var a=(i.a1);
if(((b>>0)>(0>>0))){
var g=b;
}else{
break;
}
while(1){
var a=(a.a1);
var g=((g>>0)+(-1>>0)>>0);
if(((g>>0)>(0>>0))){
}else{
break L172;
}
}
}
}while(0);
if((a===null)){
var g=-1;
}else{
var g=(a.a0.i0>>0);
}
var f=((b>>0)+(1>>0)>>0);
if(((g>>0)===(k>>0))){
break;
}
if(((f>>0)<(e>>0))){
var b=f;
}else{
break L146;
}
}
bc(i,b>>0);
}else{
if(!(((g>>0)>(0>>0)))){
break;
}
L149:do{
if(((b>>0)===(0>>0))){
var e=((k>>0)===(-1>>0))?1:0;
var b=0;
while(1){
var f=((b>>0)+(1>>0)>>0);
if((e>>0)){
break L149;
}
if(((f>>0)<(g>>0))){
var b=f;
}else{
break L146;
}
}
}else{
var e=0;
while(1){
do{
if(((b>>0)>(e>>0))){
L158:do{
if((e>>0)===(0>>0)){
var a=(j.a1);
}else if((e>>0)===(-1>>0)){
var a=(j.a2);
}else{
var a=(j.a1);
if(((e>>0)>(0>>0))){
var f=e;
}else{
break;
}
while(1){
var a=(a.a1);
var f=((f>>0)+(-1>>0)>>0);
if(((f>>0)>(0>>0))){
}else{
break L158;
}
}
}
}while(0);
if((a===null)){
var f=-1;
break;
}
var f=(a.a0.i0>>0);
}else{
var f=-1;
}
}while(0);
var n=((e>>0)+(1>>0)>>0);
if(((f>>0)===(k>>0))){
var b=e;
break L149;
}
if(((n>>0)<(g>>0))){
var e=n;
}else{
break L146;
}
}
}
}while(0);
bc(j,b>>0);
var c=((c>>0)+(-1>>0)>>0);
}
}while(0);
var b=(j.i0>>0);
var c=((c>>0)+(1>>0)>>0);
if(((c>>0)<(b>>0))){
var g=b;
}else{
var c=b;
break L116;
}
}
}else{
}
}while(0);
var d=((d>>0)+(1>>0)>>0);
if(!(((d>>0)<(l>>0)))){
break;
}
var b=(t.i0>>0);
}
var b=(j.i0>>0);
}else{
}
if(((b>>0)>(0>>0))){
var d=b;
var c=0;
}else{
return i;
}
while(1){
do{
if((((d>>0)!==(0>>0))&&((d>>0)>(c>>0)))){
L195:do{
if((c>>0)===(0>>0)){
var a=(j.a1);
}else if((c>>0)===(-1>>0)){
var a=(j.a2);
}else{
var a=(j.a1);
if(((c>>0)>(0>>0))){
var d=c;
}else{
break;
}
while(1){
var a=(a.a1);
var d=((d>>0)+(-1>>0)>>0);
if(((d>>0)>(0>>0))){
}else{
break L195;
}
}
}
}while(0);
if((a===null)){
var e=-1;
var g=0;
var d=0;
break;
}
var e=(a.a0.i0>>0);
var g=(a.a0.i1>>0);
var d=(a.a0.i2>>0);
}else{
var e=-1;
var g=0;
var d=0;
}
}while(0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(e>>0);
a.a0.i1=(g>>0);
a.a0.i2=(d>>0);
a.a1=null;
var d=(i.i0>>0);
if(((d>>0)===(0>>0))){
i.a3=a;
i.a1=a;
i.a2=a;
var d=1;
}else{
var h=(i.a2);
h.a1=a;
i.a2=a;
var d=((d>>0)+(1>>0)>>0);
}
i.i0=(d>>0);
var c=((c>>0)+(1>>0)>>0);
if(!(((c>>0)<(b>>0)))){
break;
}
var d=(j.i0>>0);
}
return i;
}
function bA(j,k){
var label=0;
var e={i0:0,a1:null,a2:null,a3:null};
e.i0=(0>>0);
e.a1=null;
e.a2=null;
e.a3=null;
var b=(j.i0>>0);
var c=(j.i1>>0);
var d=(j.i2>>0);
var i=(k.i0>>0);
var h=(k.i1>>0);
var g=(k.i2>>0);
do{
if(((b>>0)===(i>>0))){
if(!((((d>>0)===(g>>0))&&((c>>0)===(h>>0))))){
break;
}
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(b>>0);
a.a0.i1=(c>>0);
a.a0.i2=(d>>0);
a.a1=null;
var b=(e.i0>>0);
if(((b>>0)===(0>>0))){
e.a3=a;
e.a1=a;
e.a2=a;
var b=1;
}else{
var f=(e.a2);
f.a1=a;
e.a2=a;
var b=((b>>0)+(1>>0)>>0);
}
e.i0=(b>>0);
return e;
}else{
if(((((b-i)>>0)>>0)<(0>>0))){
if(!((((((g^d)|(h^c))>>>((32-b)>>0))>>0)===(0>>0)))){
break;
}
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(b>>0);
a.a0.i1=(c>>0);
a.a0.i2=(d>>0);
a.a1=null;
var b=(e.i0>>0);
if(((b>>0)===(0>>0))){
e.a3=a;
e.a1=a;
e.a2=a;
var b=1;
}else{
var f=(e.a2);
f.a1=a;
e.a2=a;
var b=((b>>0)+(1>>0)>>0);
}
e.i0=(b>>0);
return e;
}else{
if(!((((((g^d)|(h^c))>>>((32-i)>>0))>>0)===(0>>0)))){
break;
}
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(i>>0);
a.a0.i1=(h>>0);
a.a0.i2=(g>>0);
a.a1=null;
var b=(e.i0>>0);
if(((b>>0)===(0>>0))){
e.a3=a;
e.a1=a;
e.a2=a;
var b=1;
}else{
var f=(e.a2);
f.a1=a;
e.a2=a;
var b=((b>>0)+(1>>0)>>0);
}
e.i0=(b>>0);
return e;
}
}
}while(0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(b>>0);
a.a0.i1=(c>>0);
a.a0.i2=(d>>0);
a.a1=null;
var b=(e.i0>>0);
if(((b>>0)===(0>>0))){
e.a3=a;
e.a1=a;
e.a2=a;
var b=1;
}else{
var f=(e.a2);
f.a1=a;
e.a2=a;
var b=((b>>0)+(1>>0)>>0);
}
e.i0=(b>>0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(i>>0);
a.a0.i1=(h>>0);
a.a0.i2=(g>>0);
a.a1=null;
var b=(e.i0>>0);
if(((b>>0)===(0>>0))){
e.a3=a;
e.a1=a;
e.a2=a;
var b=1;
}else{
var f=(e.a2);
f.a1=a;
e.a2=a;
var b=((b>>0)+(1>>0)>>0);
}
e.i0=(b>>0);
return e;
}
function bB(bd,bn,be){
var label=0;
var f=aSlot={d0:0,d1:0,d2:0,d3:0};
var W=aSlot={i0:0,i1:0,i2:0};
var n=aSlot={i0:0,i1:0,i2:0};
var af=n;
var ae=n;
var aa=aSlot={i0:0,i1:0,i2:0};
var V=aSlot={i0:0,i1:0,i2:0};
var D={i0:0,a1:null,a2:null,a3:null};
D.i0=(0>>0);
D.a1=null;
D.a2=null;
D.a3=null;
var O={i0:0,a1:null,a2:null,a3:null};
O.i0=(0>>0);
O.a1=null;
O.a2=null;
O.a3=null;
var R={i0:0,a1:null,a2:null,a3:null};
R.i0=(0>>0);
R.a1=null;
R.a2=null;
R.a3=null;
var C=(bd.i0>>0);
L179:do{
if(((C>>0)>(0>>0))){
var e=0;
var b=0;
while(1){
L183:do{
if((b>>0)===(0>>0)){
var a=(bd.a1);
}else if((b>>0)===(-1>>0)){
var a=(bd.a2);
}else{
var a=(bd.a1);
if(((b>>0)>(0>>0))){
var d=b;
}else{
break;
}
while(1){
var a=(a.a1);
var d=((d>>0)+(-1>>0)>>0);
if(((d>>0)>(0>>0))){
}else{
break L183;
}
}
}
}while(0);
if((a===null)){
var d=-1;
}else{
var d=(a.a0.i0>>0);
}
var e=(((d>>0)>(e>>0))?d:e);
var b=((b>>0)+(1>>0)>>0);
if(((b>>0)<(C>>0))){
}else{
break L179;
}
}
}else{
var e=0;
}
}while(0);
if(((e>>0)>(be>>0))){
var k=P(1,((e-be)>>0)>>0);
var d=(mathimul((k>>0),bn)>>0);
var b=(bd.i0>>0);
}else{
var b=C;
var d=bn;
var e=be;
}
do{
if(((b>>0)<(1>>0))){
var b=-1;
}else{
var a=(bd.a1);
if((a===null)){
var b=-1;
break;
}
var b=(a.a0.i0>>0);
}
}while(0);
W.i0=(b>>0);
ad(f,W);
var k=(f.d0);
var t=(f.d1);
var l=(f.d2);
var w=(f.d3);
var z=((l<0)?k:l);
var k=((l<0)?l:k);
var l=((w<0)?t:w);
var t=((w<0)?w:t);
var w=(bf[((e>>0)+(-1>>0)>>0)>>0]);
L201:do{
if(((C>>0)>(0>>0))){
var b=0;
while(1){
var c=(bd.i0>>0);
do{
if((((c>>0)!==(0>>0))&&((c>>0)>(b>>0)))){
L207:do{
if((b>>0)===(0>>0)){
var a=(bd.a1);
}else if((b>>0)===(-1>>0)){
var a=(bd.a2);
}else{
var a=(bd.a1);
if(((b>>0)>(0>>0))){
var c=b;
}else{
break;
}
while(1){
var a=(a.a1);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L207;
}
}
}
}while(0);
if((a===null)){
var c=-1;
break;
}
var c=(a.a0.i0>>0);
}else{
var c=-1;
}
}while(0);
n.i0=(c>>0);
ad(f,n);
var T=(f.d0);
var S=(f.d1);
var E=(f.d2);
var al=(f.d3);
var at=((E<0)?T:E);
var T=((E<0)?E:T);
var E=((al<0)?S:al);
var S=((al<0)?al:S);
var l=((l<E)?E:l);
var z=((z<at)?at:z);
var t=((t>S)?S:t);
var k=((k>T)?T:k);
var b=((b>>0)+(1>>0)>>0);
if(((b>>0)<(C>>0))){
}else{
break L201;
}
}
}else{
}
}while(0);
var w=((+(d>>0))*w);
var f=ba(((w+l)+-1.3563366215906276E-7),((k-w)+1.3563366215906276E-7),((t-w)+1.3563366215906276E-7),((w+z)+-1.3563366215906276E-7),e>>0);
var e=(f.i0>>0);
do{
if(((e>>0)<(1>>0))){
var b=-1;
}else{
var a=(f.a1);
if((a===null)){
var b=-1;
break;
}
var b=(a.a0.i0>>0);
}
}while(0);
aa.i0=(b>>0);
Q(ae,aa);
var c=(ae.i1>>0);
var i=(ae.i2>>0);
var b=((e>>0)+(-1>>0)>>0);
var h=(f.i0>>0);
do{
if(((h>>0)===(0>>0))){
var b=-1;
}else{
if((((h>>0)<=(b>>0))||((e>>0)<(0>>0)))){
var b=-1;
break;
}
L224:do{
if((e>>0)===(1>>0)){
var a=(f.a1);
}else if((e>>0)===(0>>0)){
var a=(f.a2);
}else{
var a=(f.a1);
if(((b>>0)>(0>>0))){
}else{
break;
}
while(1){
var a=(a.a1);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L224;
}
}
}
}while(0);
if((a===null)){
var b=-1;
break;
}
var b=(a.a0.i0>>0);
}
}while(0);
V.i0=(b>>0);
Q(af,V);
var b=(af.i1>>0);
var e=(af.i2>>0);
var ak=((e-i)>>0);
var r=((ak>>0)+(1>>0)>>0);
var aC=((b-c)>>0);
var M=((aC>>0)+(1>>0)>>0);
L233:do{
if(((aC>>0)>(-1>>0))){
var aj=((ak>>0)>(-1>>0))?1:0;
var b=0;
while(1){
L237:do{
if((aj>>0)){
var az=(mathimul(b,r)>>0);
var e=0;
while(1){
var c=((e>>0)+(az>>0)>>0);
var i=(f.i0>>0);
do{
if(((i>>0)===(0>>0))){
var h=-1;
var i=0;
var c=0;
}else{
if((((i>>0)<=(c>>0))||((c>>0)<(-1>>0)))){
var h=-1;
var i=0;
var c=0;
break;
}
L244:do{
if((c>>0)===(0>>0)){
var a=(f.a1);
}else if((c>>0)===(-1>>0)){
var a=(f.a2);
}else{
var a=(f.a1);
if(((c>>0)>(0>>0))){
}else{
break;
}
while(1){
var a=(a.a1);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L244;
}
}
}
}while(0);
if((a===null)){
var h=-1;
var i=0;
var c=0;
break;
}
var h=(a.a0.i0>>0);
var i=(a.a0.i1>>0);
var c=(a.a0.i2>>0);
}
}while(0);
L253:do{
if(((C>>0)>(0>>0))){
var I=(bd.i0>>0);
var ah=((I>>0)!==(0>>0))?1:0;
var j=0;
L255:while(1){
do{
if(((ah>>0)&&((I>>0)>(j>>0)))){
L259:do{
if((j>>0)===(0>>0)){
var a=(bd.a1);
}else if((j>>0)===(-1>>0)){
var a=(bd.a2);
}else{
var a=(bd.a1);
if(((j>>0)>(0>>0))){
var o=j;
}else{
break;
}
while(1){
var a=(a.a1);
var o=((o>>0)+(-1>>0)>>0);
if(((o>>0)>(0>>0))){
}else{
break L259;
}
}
}
}while(0);
if((a===null)){
var A=-1;
var g=0;
var o=0;
break;
}
var A=(a.a0.i0>>0);
var g=(a.a0.i1>>0);
var o=(a.a0.i2>>0);
}else{
var A=-1;
var g=0;
var o=0;
}
}while(0);
do{
if(((h>>0)===(A>>0))){
if((((c>>0)===(o>>0))&&((i>>0)===(g>>0)))){
break L255;
}
}else{
if(((((h-A)>>0)>>0)<(0>>0))){
break;
}
if((((((g^i)|(o^c))>>>((32-A)>>0))>>0)===(0>>0))){
break L255;
}
}
}while(0);
var j=((j>>0)+(1>>0)>>0);
if(((j>>0)<(C>>0))){
}else{
label=71;
break L253;
}
}
var a={i0:0,a1:null};
a.i0=(1>>0);
a.a1=null;
var c=(O.i0>>0);
if(((c>>0)===(0>>0))){
O.a3=a;
O.a1=a;
O.a2=a;
var c=1;
break;
}else{
var n=(O.a2);
n.a1=a;
O.a2=a;
var c=((c>>0)+(1>>0)>>0);
break;
}
}else{
label=71;
}
}while(0);
do{
if(label===71){
label=0;
var a={i0:0,a1:null};
a.i0=(0>>0);
a.a1=null;
var c=(O.i0>>0);
if(((c>>0)===(0>>0))){
O.a3=a;
O.a1=a;
O.a2=a;
var c=1;
break;
}else{
var n=(O.a2);
n.a1=a;
O.a2=a;
var c=((c>>0)+(1>>0)>>0);
break;
}
}
}while(0);
O.i0=(c>>0);
var a={i0:0,a1:null};
a.i0=(0>>0);
a.a1=null;
var c=(R.i0>>0);
if(((c>>0)===(0>>0))){
R.a3=a;
R.a1=a;
R.a2=a;
var c=1;
}else{
var n=(R.a2);
n.a1=a;
R.a2=a;
var c=((c>>0)+(1>>0)>>0);
}
R.i0=(c>>0);
var e=((e>>0)+(1>>0)>>0);
if(((e>>0)<(r>>0))){
}else{
break L237;
}
}
}
}while(0);
var b=((b>>0)+(1>>0)>>0);
if(((b>>0)<(M>>0))){
}else{
break L233;
}
}
}
}while(0);
var j=((M-d)>>0);
L289:do{
if(((d>>0)<(j>>0))){
var o=((r-d)>>0);
var g=((d>>0)<(o>>0))?1:0;
var A=((d>>0)+(1>>0)>>0);
var b=d;
while(1){
L293:do{
if((g>>0)){
var C=(mathimul(b,r)>>0);
var aj=(O.i0>>0);
var az=((aj>>0)===(0>>0))?1:0;
var I=((b-d)>>0);
var ah=((b>>0)+(A>>0)>>0);
var bo=((I>>0)>=(ah>>0))?1:0;
var e=d;
while(1){
var c=((e>>0)+(C>>0)>>0);
L297:do{
if(!((az>>0))){
if((((aj>>0)<=(c>>0))||((c>>0)<(-1>>0)))){
break;
}
L300:do{
if((c>>0)===(0>>0)){
var a=(O.a1);
}else if((c>>0)===(-1>>0)){
var a=(O.a2);
}else{
var a=(O.a1);
if(((c>>0)>(0>>0))){
}else{
break;
}
while(1){
var a=(a.a1);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L300;
}
}
}
}while(0);
if((a===null)){
break;
}
var c=(a.i0>>0);
if((((c>>0)!==(1>>0))||(bo>>0))){
break;
}
var aq=((e-d)>>0);
var ar=((e>>0)+(A>>0)>>0);
var aS=((aq>>0)<(ar>>0))?1:0;
var c=I;
while(1){
L311:do{
if((aS>>0)){
var aE=((c>>0)===(b>>0))?1:0;
var a3=(mathimul(c,r)>>0);
var i=aq;
while(1){
do{
if(!(((aE>>0)&&((i>>0)===(e>>0))))){
var h=((i>>0)+(a3>>0)>>0);
var as=(R.i0>>0);
if(((as>>0)===(0>>0))){
break;
}
if((((as>>0)<=(h>>0))||((h>>0)<(-1>>0)))){
break;
}
L319:do{
if((h>>0)===(0>>0)){
var a=(R.a1);
}else if((h>>0)===(-1>>0)){
var a=(R.a2);
}else{
var a=(R.a1);
if(((h>>0)>(0>>0))){
}else{
break;
}
while(1){
var a=(a.a1);
var h=((h>>0)+(-1>>0)>>0);
if(((h>>0)>(0>>0))){
}else{
break L319;
}
}
}
}while(0);
if((a===null)){
break;
}
a.i0=(1>>0);
}
}while(0);
var i=((i>>0)+(1>>0)>>0);
if(((i>>0)<(ar>>0))){
}else{
break L311;
}
}
}
}while(0);
var c=((c>>0)+(1>>0)>>0);
if(((c>>0)<(ah>>0))){
}else{
break L297;
}
}
}
}while(0);
var e=((e>>0)+(1>>0)>>0);
if(((e>>0)<(o>>0))){
}else{
break L293;
}
}
}
}while(0);
var b=((b>>0)+(1>>0)>>0);
if(((b>>0)<(j>>0))){
}else{
break L289;
}
}
}
}while(0);
L332:do{
if(((aC>>0)>(-1>>0))){
var b=0;
while(1){
L336:do{
if(((ak>>0)>(-1>>0))){
var i=(mathimul(b,r)>>0);
var h=(R.i0>>0);
var j=(O.i0>>0);
var o=((j>>0)===(0>>0))?1:0;
var e=0;
while(1){
var g=((e>>0)+(i>>0)>>0);
do{
if(((h>>0)===(0>>0))){
var d=-1;
}else{
if((((h>>0)<=(g>>0))||((g>>0)<(-1>>0)))){
var d=-1;
break;
}
L343:do{
if((g>>0)===(0>>0)){
var a=(R.a1);
}else if((g>>0)===(-1>>0)){
var a=(R.a2);
}else{
var a=(R.a1);
if(((g>>0)>(0>>0))){
var d=g;
}else{
break;
}
while(1){
var a=(a.a1);
var d=((d>>0)+(-1>>0)>>0);
if(((d>>0)>(0>>0))){
}else{
break L343;
}
}
}
}while(0);
if((a===null)){
var d=-1;
break;
}
var d=(a.i0>>0);
}
}while(0);
do{
if((o>>0)){
var c=-1;
}else{
if((((j>>0)<=(g>>0))||((g>>0)<(-1>>0)))){
var c=-1;
break;
}
L355:do{
if((g>>0)===(0>>0)){
var a=(O.a1);
}else if((g>>0)===(-1>>0)){
var a=(O.a2);
}else{
var a=(O.a1);
if(((g>>0)>(0>>0))){
var c=g;
}else{
break;
}
while(1){
var a=(a.a1);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L355;
}
}
}
}while(0);
if((a===null)){
var c=-1;
break;
}
var c=(a.i0>>0);
}
}while(0);
var c=((d-c)>>0);
do{
if(!(((h>>0)===(0>>0)))){
if((((h>>0)<=(g>>0))||((g>>0)<(-1>>0)))){
break;
}
L367:do{
if((g>>0)===(0>>0)){
var a=(R.a1);
}else if((g>>0)===(-1>>0)){
var a=(R.a2);
}else{
var a=(R.a1);
if(((g>>0)>(0>>0))){
var d=g;
}else{
break;
}
while(1){
var a=(a.a1);
var d=((d>>0)+(-1>>0)>>0);
if(((d>>0)>(0>>0))){
}else{
break L367;
}
}
}
}while(0);
if((a===null)){
break;
}
a.i0=(c>>0);
}
}while(0);
var e=((e>>0)+(1>>0)>>0);
if(((e>>0)<(r>>0))){
}else{
break L336;
}
}
}
}while(0);
var b=((b>>0)+(1>>0)>>0);
if(((b>>0)<(M>>0))){
}else{
break;
}
}
var b=0;
while(1){
L380:do{
if(((ak>>0)>(-1>>0))){
var h=(mathimul(b,r)>>0);
var e=0;
while(1){
var c=((e>>0)+(h>>0)>>0);
var d=(R.i0>>0);
do{
if(!(((d>>0)===(0>>0)))){
if((((d>>0)<=(c>>0))||((c>>0)<(-1>>0)))){
break;
}
L387:do{
if((c>>0)===(0>>0)){
var a=(R.a1);
}else if((c>>0)===(-1>>0)){
var a=(R.a2);
}else{
var a=(R.a1);
if(((c>>0)>(0>>0))){
var d=c;
}else{
break;
}
while(1){
var a=(a.a1);
var d=((d>>0)+(-1>>0)>>0);
if(((d>>0)>(0>>0))){
}else{
break L387;
}
}
}
}while(0);
if((a===null)){
break;
}
var d=(a.i0>>0);
if(!(((d>>0)===(1>>0)))){
break;
}
var d=(f.i0>>0);
do{
if((((d>>0)!==(0>>0))&&((d>>0)>(c>>0)))){
L398:do{
if((c>>0)===(0>>0)){
var a=(f.a1);
}else if((c>>0)===(-1>>0)){
var a=(f.a2);
}else{
var a=(f.a1);
if(((c>>0)>(0>>0))){
var d=c;
}else{
break;
}
while(1){
var a=(a.a1);
var d=((d>>0)+(-1>>0)>>0);
if(((d>>0)>(0>>0))){
}else{
break L398;
}
}
}
}while(0);
if((a===null)){
var i=-1;
var c=0;
var d=0;
break;
}
var i=(a.a0.i0>>0);
var c=(a.a0.i1>>0);
var d=(a.a0.i2>>0);
}else{
var i=-1;
var c=0;
var d=0;
}
}while(0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(i>>0);
a.a0.i1=(c>>0);
a.a0.i2=(d>>0);
a.a1=null;
var d=(D.i0>>0);
if(((d>>0)===(0>>0))){
D.a3=a;
D.a1=a;
D.a2=a;
var d=1;
}else{
var n=(D.a2);
n.a1=a;
D.a2=a;
var d=((d>>0)+(1>>0)>>0);
}
D.i0=(d>>0);
}
}while(0);
var e=((e>>0)+(1>>0)>>0);
if(((e>>0)<(r>>0))){
}else{
break L380;
}
}
}
}while(0);
var b=((b>>0)+(1>>0)>>0);
if(((b>>0)<(M>>0))){
}else{
break L332;
}
}
}
}while(0);
var b=(O.i0>>0);
L414:do{
if(((b>>0)>(0>>0))){
var a=(O.a1);
while(1){
var a=(a.a1);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L414;
}
}
}
}while(0);
var b=(R.i0>>0);
L419:do{
if(((b>>0)>(0>>0))){
var a=(R.a1);
while(1){
var a=(a.a1);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L419;
}
}
}
}while(0);
if(!((f===null))){
var b=(f.i0>>0);
L426:do{
if((((b>>0)!==(0>>0))&&((b>>0)>(0>>0)))){
var a=(f.a1);
while(1){
var a=(a.a1);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L426;
}
}
}
}while(0);
}
return D;
}
function bz(b_,ca,b9){
var label=0;
var o=aSlot={i0:0,d1:0,d2:0};
var f=aSlot={i0:0,i1:0,i2:0};
var i=aSlot={d0:0,d1:0};
var j=aSlot={d0:0,d1:0,d2:0,d3:0};
var ae=aSlot={i0:0,i1:0,i2:0};
var I=aSlot={i0:0,i1:0,i2:0};
var ak=I;
var aj=I;
var aa=aSlot={i0:0,i1:0,i2:0};
var W=aSlot={i0:0,i1:0,i2:0};
var S={i0:0,a1:null,a2:null,a3:null};
S.i0=(0>>0);
S.a1=null;
S.a2=null;
S.a3=null;
var ah={i0:0,a1:null,a2:null,a3:null};
ah.i0=(0>>0);
ah.a1=null;
ah.a2=null;
ah.a3=null;
var af={i0:0,a1:null,a2:null,a3:null};
af.i0=(0>>0);
af.a1=null;
af.a2=null;
af.a3=null;
aJ(f,b_);
var g=(f.i0>>0);
var e=(f.i1>>0);
var k=(f.i2>>0);
var R=(b_.i0>>0);
L177:do{
if(((R>>0)>(0>>0))){
var d=0;
var c=0;
while(1){
L181:do{
if((c>>0)===(0>>0)){
var a=(b_.a1);
}else if((c>>0)===(-1>>0)){
var a=(b_.a2);
}else{
var a=(b_.a1);
if(((c>>0)>(0>>0))){
var b=c;
}else{
break;
}
while(1){
var a=(a.a1);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L181;
}
}
}
}while(0);
if((a===null)){
var b=-1;
}else{
var b=(a.a0.i0>>0);
}
var d=(((b>>0)>(d>>0))?b:d);
var c=((c>>0)+(1>>0)>>0);
if(((c>>0)<(R>>0))){
}else{
break L177;
}
}
}else{
var d=0;
}
}while(0);
var c=((31-g)>>0);
f.i0=(((g>>0)+(1>>0)>>0)>>0);
f.i1=(((((e>>>c)>>0)+(1>>0)>>0)<<c)>>0);
f.i2=(((((k>>>c)>>0)+(1>>0)>>0)<<c)>>0);
aD(o,f);
var n=(o.d1);
var l=(o.d2);
var b=(((d>>0)>(b9>>0))?d:b9);
o.i0=(b>>0);
o.d1=n;
o.d2=l;
N(f,o);
var c=(f.i0>>0);
var d=(f.i1>>0);
var g=(f.i2>>0);
f.i0=(c>>0);
f.i1=(d>>0);
f.i2=(g>>0);
aV(i,f,1>>0);
var n=(i.d0);
var l=(i.d1);
var C=(((ca/l)+1)>>0);
var E=(((ca/n)+1)>>0);
var c=(b_.i0>>0);
do{
if(((c>>0)<(1>>0))){
var c=-1;
}else{
var a=(b_.a1);
if((a===null)){
var c=-1;
break;
}
var c=(a.a0.i0>>0);
}
}while(0);
ae.i0=(c>>0);
ad(j,ae);
var n=(j.d0);
var D=(j.d1);
var l=(j.d2);
var w=(j.d3);
var A=((l<0)?l:n);
var z=((l<0)?n:l);
var l=((w<0)?w:D);
var n=((w<0)?D:w);
var D=(bf[((b>>0)+(-1>>0)>>0)>>0]);
L196:do{
if(((R>>0)>(0>>0))){
var c=0;
while(1){
var d=(b_.i0>>0);
do{
if((((d>>0)!==(0>>0))&&((d>>0)>(c>>0)))){
L202:do{
if((c>>0)===(0>>0)){
var a=(b_.a1);
}else if((c>>0)===(-1>>0)){
var a=(b_.a2);
}else{
var a=(b_.a1);
if(((c>>0)>(0>>0))){
var d=c;
}else{
break;
}
while(1){
var a=(a.a1);
var d=((d>>0)+(-1>>0)>>0);
if(((d>>0)>(0>>0))){
}else{
break L202;
}
}
}
}while(0);
if((a===null)){
var d=-1;
break;
}
var d=(a.a0.i0>>0);
}else{
var d=-1;
}
}while(0);
I.i0=(d>>0);
ad(j,I);
var w=(j.d0);
var V=(j.d1);
var O=(j.d2);
var at=(j.d3);
var be=((O<0)?w:O);
var w=((O<0)?O:w);
var O=((at<0)?at:V);
var V=((at<0)?V:at);
var n=((n<V)?V:n);
var z=((z<be)?be:z);
var l=((l>O)?O:l);
var A=((A>w)?w:A);
var c=((c>>0)+(1>>0)>>0);
if(((c>>0)<(R>>0))){
}else{
break L196;
}
}
}else{
}
}while(0);
var w=((+(C>>0))*D);
var D=((+(E>>0))*D);
var i=ba(((w+n)+-1.3563366215906276E-7),((A-D)+1.3563366215906276E-7),((l-w)+1.3563366215906276E-7),((D+z)+-1.3563366215906276E-7),b>>0);
var d=(i.i0>>0);
do{
if(((d>>0)<(1>>0))){
var c=-1;
}else{
var a=(i.a1);
if((a===null)){
var c=-1;
break;
}
var c=(a.a0.i0>>0);
}
}while(0);
aa.i0=(c>>0);
Q(aj,aa);
var b=(aj.i1>>0);
var g=(aj.i2>>0);
var c=((d>>0)+(-1>>0)>>0);
var e=(i.i0>>0);
do{
if(((e>>0)===(0>>0))){
var c=-1;
}else{
if((((e>>0)<=(c>>0))||((d>>0)<(0>>0)))){
var c=-1;
break;
}
L219:do{
if((d>>0)===(1>>0)){
var a=(i.a1);
}else if((d>>0)===(0>>0)){
var a=(i.a2);
}else{
var a=(i.a1);
if(((c>>0)>(0>>0))){
}else{
break;
}
while(1){
var a=(a.a1);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L219;
}
}
}
}while(0);
if((a===null)){
var c=-1;
break;
}
var c=(a.a0.i0>>0);
}
}while(0);
W.i0=(c>>0);
Q(ak,W);
var c=(ak.i1>>0);
var d=(ak.i2>>0);
var ar=((d-g)>>0);
var t=((ar>>0)+(1>>0)>>0);
var a3=((c-b)>>0);
var T=((a3>>0)+(1>>0)>>0);
L228:do{
if(((a3>>0)>(-1>>0))){
var aS=((ar>>0)>(-1>>0))?1:0;
var c=0;
while(1){
L232:do{
if((aS>>0)){
var aq=(mathimul(c,t)>>0);
var d=0;
while(1){
var b=((d>>0)+(aq>>0)>>0);
var g=(i.i0>>0);
do{
if(((g>>0)===(0>>0))){
var e=-1;
var g=0;
var b=0;
}else{
if((((g>>0)<=(b>>0))||((b>>0)<(-1>>0)))){
var e=-1;
var g=0;
var b=0;
break;
}
L239:do{
if((b>>0)===(0>>0)){
var a=(i.a1);
}else if((b>>0)===(-1>>0)){
var a=(i.a2);
}else{
var a=(i.a1);
if(((b>>0)>(0>>0))){
}else{
break;
}
while(1){
var a=(a.a1);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L239;
}
}
}
}while(0);
if((a===null)){
var e=-1;
var g=0;
var b=0;
break;
}
var e=(a.a0.i0>>0);
var g=(a.a0.i1>>0);
var b=(a.a0.i2>>0);
}
}while(0);
L248:do{
if(((R>>0)>(0>>0))){
var as=(b_.i0>>0);
var al=((as>>0)!==(0>>0))?1:0;
var k=0;
L250:while(1){
do{
if(((al>>0)&&((as>>0)>(k>>0)))){
L254:do{
if((k>>0)===(0>>0)){
var a=(b_.a1);
}else if((k>>0)===(-1>>0)){
var a=(b_.a2);
}else{
var a=(b_.a1);
if(((k>>0)>(0>>0))){
var r=k;
}else{
break;
}
while(1){
var a=(a.a1);
var r=((r>>0)+(-1>>0)>>0);
if(((r>>0)>(0>>0))){
}else{
break L254;
}
}
}
}while(0);
if((a===null)){
var h=-1;
var M=0;
var r=0;
break;
}
var h=(a.a0.i0>>0);
var M=(a.a0.i1>>0);
var r=(a.a0.i2>>0);
}else{
var h=-1;
var M=0;
var r=0;
}
}while(0);
do{
if(((e>>0)===(h>>0))){
if((((b>>0)===(r>>0))&&((g>>0)===(M>>0)))){
break L250;
}
}else{
if(((((e-h)>>0)>>0)<(0>>0))){
break;
}
if((((((M^g)|(r^b))>>>((32-h)>>0))>>0)===(0>>0))){
break L250;
}
}
}while(0);
var k=((k>>0)+(1>>0)>>0);
if(((k>>0)<(R>>0))){
}else{
label=69;
break L248;
}
}
var a={i0:0,a1:null};
a.i0=(1>>0);
a.a1=null;
var b=(ah.i0>>0);
if(((b>>0)===(0>>0))){
ah.a3=a;
ah.a1=a;
ah.a2=a;
var b=1;
break;
}else{
var j=(ah.a2);
j.a1=a;
ah.a2=a;
var b=((b>>0)+(1>>0)>>0);
break;
}
}else{
label=69;
}
}while(0);
do{
if(label===69){
label=0;
var a={i0:0,a1:null};
a.i0=(0>>0);
a.a1=null;
var b=(ah.i0>>0);
if(((b>>0)===(0>>0))){
ah.a3=a;
ah.a1=a;
ah.a2=a;
var b=1;
break;
}else{
var j=(ah.a2);
j.a1=a;
ah.a2=a;
var b=((b>>0)+(1>>0)>>0);
break;
}
}
}while(0);
ah.i0=(b>>0);
var a={i0:0,a1:null};
a.i0=(0>>0);
a.a1=null;
var b=(af.i0>>0);
if(((b>>0)===(0>>0))){
af.a3=a;
af.a1=a;
af.a2=a;
var b=1;
}else{
var j=(af.a2);
j.a1=a;
af.a2=a;
var b=((b>>0)+(1>>0)>>0);
}
af.i0=(b>>0);
var d=((d>>0)+(1>>0)>>0);
if(((d>>0)<(t>>0))){
}else{
break L232;
}
}
}
}while(0);
var c=((c>>0)+(1>>0)>>0);
if(((c>>0)<(T>>0))){
}else{
break L228;
}
}
}
}while(0);
var k=((T-C)>>0);
L284:do{
if(((C>>0)<(k>>0))){
var r=((t-E)>>0);
var M=((E>>0)<(r>>0))?1:0;
var h=((C>>0)+(1>>0)>>0);
var R=((E>>0)+(1>>0)>>0);
var c=C;
while(1){
L288:do{
if((M>>0)){
var aS=(mathimul(c,t)>>0);
var aq=(ah.i0>>0);
var as=((aq>>0)===(0>>0))?1:0;
var al=((c-C)>>0);
var aE=((h>>0)+(c>>0)>>0);
var bn=((al>>0)>=(aE>>0))?1:0;
var d=E;
while(1){
var b=((d>>0)+(aS>>0)>>0);
L292:do{
if(!((as>>0))){
if((((aq>>0)<=(b>>0))||((b>>0)<(-1>>0)))){
break;
}
L295:do{
if((b>>0)===(0>>0)){
var a=(ah.a1);
}else if((b>>0)===(-1>>0)){
var a=(ah.a2);
}else{
var a=(ah.a1);
if(((b>>0)>(0>>0))){
}else{
break;
}
while(1){
var a=(a.a1);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L295;
}
}
}
}while(0);
if((a===null)){
break;
}
var b=(a.i0>>0);
if((((b>>0)!==(1>>0))||(bn>>0))){
break;
}
var aC=((d-E)>>0);
var az=((R>>0)+(d>>0)>>0);
var b8=((aC>>0)<(az>>0))?1:0;
var b=al;
while(1){
L306:do{
if((b8>>0)){
var b7=((b>>0)===(c>>0))?1:0;
var bo=(mathimul(b,t)>>0);
var g=aC;
while(1){
do{
if(!(((b7>>0)&&((g>>0)===(d>>0))))){
var e=((g>>0)+(bo>>0)>>0);
var bd=(af.i0>>0);
if(((bd>>0)===(0>>0))){
break;
}
if((((bd>>0)<=(e>>0))||((e>>0)<(-1>>0)))){
break;
}
L314:do{
if((e>>0)===(0>>0)){
var a=(af.a1);
}else if((e>>0)===(-1>>0)){
var a=(af.a2);
}else{
var a=(af.a1);
if(((e>>0)>(0>>0))){
}else{
break;
}
while(1){
var a=(a.a1);
var e=((e>>0)+(-1>>0)>>0);
if(((e>>0)>(0>>0))){
}else{
break L314;
}
}
}
}while(0);
if((a===null)){
break;
}
a.i0=(1>>0);
}
}while(0);
var g=((g>>0)+(1>>0)>>0);
if(((g>>0)<(az>>0))){
}else{
break L306;
}
}
}
}while(0);
var b=((b>>0)+(1>>0)>>0);
if(((b>>0)<(aE>>0))){
}else{
break L292;
}
}
}
}while(0);
var d=((d>>0)+(1>>0)>>0);
if(((d>>0)<(r>>0))){
}else{
break L288;
}
}
}
}while(0);
var c=((c>>0)+(1>>0)>>0);
if(((c>>0)<(k>>0))){
}else{
break L284;
}
}
}
}while(0);
L327:do{
if(((a3>>0)>(-1>>0))){
var c=0;
while(1){
L331:do{
if(((ar>>0)>(-1>>0))){
var e=(mathimul(c,t)>>0);
var k=(af.i0>>0);
var r=(ah.i0>>0);
var M=((r>>0)===(0>>0))?1:0;
var d=0;
while(1){
var h=((d>>0)+(e>>0)>>0);
do{
if(((k>>0)===(0>>0))){
var b=-1;
}else{
if((((k>>0)<=(h>>0))||((h>>0)<(-1>>0)))){
var b=-1;
break;
}
L338:do{
if((h>>0)===(0>>0)){
var a=(af.a1);
}else if((h>>0)===(-1>>0)){
var a=(af.a2);
}else{
var a=(af.a1);
if(((h>>0)>(0>>0))){
var b=h;
}else{
break;
}
while(1){
var a=(a.a1);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L338;
}
}
}
}while(0);
if((a===null)){
var b=-1;
break;
}
var b=(a.i0>>0);
}
}while(0);
do{
if((M>>0)){
var g=-1;
}else{
if((((r>>0)<=(h>>0))||((h>>0)<(-1>>0)))){
var g=-1;
break;
}
L350:do{
if((h>>0)===(0>>0)){
var a=(ah.a1);
}else if((h>>0)===(-1>>0)){
var a=(ah.a2);
}else{
var a=(ah.a1);
if(((h>>0)>(0>>0))){
var g=h;
}else{
break;
}
while(1){
var a=(a.a1);
var g=((g>>0)+(-1>>0)>>0);
if(((g>>0)>(0>>0))){
}else{
break L350;
}
}
}
}while(0);
if((a===null)){
var g=-1;
break;
}
var g=(a.i0>>0);
}
}while(0);
var g=((b-g)>>0);
do{
if(!(((k>>0)===(0>>0)))){
if((((k>>0)<=(h>>0))||((h>>0)<(-1>>0)))){
break;
}
L362:do{
if((h>>0)===(0>>0)){
var a=(af.a1);
}else if((h>>0)===(-1>>0)){
var a=(af.a2);
}else{
var a=(af.a1);
if(((h>>0)>(0>>0))){
var b=h;
}else{
break;
}
while(1){
var a=(a.a1);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L362;
}
}
}
}while(0);
if((a===null)){
break;
}
a.i0=(g>>0);
}
}while(0);
var d=((d>>0)+(1>>0)>>0);
if(((d>>0)<(t>>0))){
}else{
break L331;
}
}
}
}while(0);
var c=((c>>0)+(1>>0)>>0);
if(((c>>0)<(T>>0))){
}else{
break;
}
}
var c=0;
while(1){
L375:do{
if(((ar>>0)>(-1>>0))){
var g=(mathimul(c,t)>>0);
var d=0;
while(1){
var e=((d>>0)+(g>>0)>>0);
var b=(af.i0>>0);
do{
if(!(((b>>0)===(0>>0)))){
if((((b>>0)<=(e>>0))||((e>>0)<(-1>>0)))){
break;
}
L382:do{
if((e>>0)===(0>>0)){
var a=(af.a1);
}else if((e>>0)===(-1>>0)){
var a=(af.a2);
}else{
var a=(af.a1);
if(((e>>0)>(0>>0))){
var b=e;
}else{
break;
}
while(1){
var a=(a.a1);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L382;
}
}
}
}while(0);
if((a===null)){
break;
}
var b=(a.i0>>0);
if(!(((b>>0)===(1>>0)))){
break;
}
var b=(i.i0>>0);
do{
if((((b>>0)!==(0>>0))&&((b>>0)>(e>>0)))){
L393:do{
if((e>>0)===(0>>0)){
var a=(i.a1);
}else if((e>>0)===(-1>>0)){
var a=(i.a2);
}else{
var a=(i.a1);
if(((e>>0)>(0>>0))){
var b=e;
}else{
break;
}
while(1){
var a=(a.a1);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L393;
}
}
}
}while(0);
if((a===null)){
var b=-1;
break;
}
var b=(a.a0.i0>>0);
}else{
var b=-1;
}
}while(0);
var a={a0:{i0:0,i1:0,i2:0},a1:null};
a.a0.i0=(b>>0);
a.a1=null;
var b=(S.i0>>0);
if(((b>>0)===(0>>0))){
S.a3=a;
S.a1=a;
S.a2=a;
var b=1;
}else{
var j=(S.a2);
j.a1=a;
S.a2=a;
var b=((b>>0)+(1>>0)>>0);
}
S.i0=(b>>0);
}
}while(0);
var d=((d>>0)+(1>>0)>>0);
if(((d>>0)<(t>>0))){
}else{
break L375;
}
}
}
}while(0);
var c=((c>>0)+(1>>0)>>0);
if(((c>>0)<(T>>0))){
}else{
break L327;
}
}
}
}while(0);
if(!((i===null))){
var c=(i.i0>>0);
L411:do{
if((((c>>0)!==(0>>0))&&((c>>0)>(0>>0)))){
var a=(i.a1);
while(1){
var a=(a.a1);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L411;
}
}
}
}while(0);
}
var c=(ah.i0>>0);
L417:do{
if(((c>>0)>(0>>0))){
var a=(ah.a1);
while(1){
var a=(a.a1);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L417;
}
}
}
}while(0);
var c=(af.i0>>0);
L422:do{
if(((c>>0)>(0>>0))){
var a=(af.a1);
while(1){
var a=(a.a1);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L422;
}
}
}
}while(0);
return S;
}
function aJ(h,g){
var label=0;
var d=aSlot={i0:0,i1:0,i2:0};
var e=aSlot={i0:0,d1:0,d2:0};
var i=aSlot={d0:0,d1:0,d2:0,d3:0};
var n=(g.i0>>0);
if(((n>>0)>(0>>0))){
var f=-1;
var a=0;
while(1){
L28:do{
if((a>>0)===(0>>0)){
var b=(g.a1);
}else if((a>>0)===(-1>>0)){
var b=(g.a2);
}else{
var b=(g.a1);
if(((a>>0)>(0>>0))){
var c=a;
}else{
break;
}
while(1){
var b=(b.a1);
var c=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
}else{
break L28;
}
}
}
}while(0);
if((b===null)){
var c=-1;
}else{
var c=(b.a0.i0>>0);
}
var f=(((c>>0)>(f>>0))?c:f);
var a=((a>>0)+(1>>0)>>0);
if(((a>>0)<(n>>0))){
}else{
break;
}
}
var a=n;
var o=0;
var k=0;
var j=0;
var c=0;
while(1){
do{
if((((a>>0)!==(0>>0))&&((a>>0)>(c>>0)))){
L43:do{
if((c>>0)===(0>>0)){
var b=(g.a1);
}else if((c>>0)===(-1>>0)){
var b=(g.a2);
}else{
var b=(g.a1);
if(((c>>0)>(0>>0))){
var a=c;
}else{
break;
}
while(1){
var b=(b.a1);
var a=((a>>0)+(-1>>0)>>0);
if(((a>>0)>(0>>0))){
}else{
break L43;
}
}
}
}while(0);
if((b===null)){
var a=-1;
break;
}
var a=(b.a0.i0>>0);
}else{
var a=-1;
}
}while(0);
d.i0=(a>>0);
ad(i,d);
var l=(i.d0);
var z=(i.d1);
var t=(i.d2);
var w=(i.d3);
var r=Math.pow(4,(+(((f-a)>>0)>>0)));
var a=(r>>0);
var r=(+(a>>0));
var j=(j+(((l+t)*0.5)*r));
var k=(k+(((z+w)*0.5)*r));
var o=((a>>0)+(o>>0)>>0);
var c=((c>>0)+(1>>0)>>0);
if(!(((c>>0)<(n>>0)))){
break;
}
var a=(g.i0>>0);
}
var l=(+(o>>0));
}else{
var l=0;
var k=0;
var j=0;
var f=-1;
}
e.i0=(f>>0);
e.d1=(j/l);
e.d2=(k/l);
N(d,e);
var a=(d.i0>>0);
var f=(d.i1>>0);
var c=(d.i2>>0);
h.i0=(a>>0);
h.i1=(f>>0);
h.i2=(c>>0);
return h;
}
function aV(k,j,i){
var label=0;
var h=aSlot={d0:0,d1:0,d2:0,d3:0};
var g=aSlot={i0:0,i1:0,i2:0};
g.i0=((j.i0>>0)>>0);
g.i1=((j.i1>>0)>>0);
g.i2=((j.i2>>0)>>0);
ad(h,g);
var c=(h.d0);
var b=(h.d1);
var a=(h.d2);
var d=(h.d3);
var e=Math.abs(b);
do{
if((e<90)){
var f=Math.abs(c);
if(!((f<180))){
var a=0;
var d=0;
break;
}
do{
if((e<90)){
var l=Math.abs(d);
if((l>1.0E-10)){
break;
}
var d=((b/e)*90);
}else{
}
}while(0);
do{
if((f<180)){
var e=Math.abs(a);
if((e>1.0E-10)){
break;
}
var a=((c/f)*180);
}else{
}
}while(0);
var e=((((b+d)*0.5)*3.1415926535897931)/180);
var b=((b*3.1415926535897931)/180);
var c=((c*3.1415926535897931)/180);
var f=((d*3.1415926535897931)/180);
var a=((a*3.1415926535897931)/180);
var d=Math.sin((b*2));
var l=Math.sin((f*2));
var n=Math.sin((b*4));
var r=Math.sin((f*4));
var t=Math.sin((b*6));
var o=Math.sin((f*6));
var d=Math.abs((((((b-f)*6367449.1457700003)-((d-l)*16038.508739999999))+((n-r)*16.832609999999999))-((t-o)*0.02198)));
if((i>>0)===(0>>0)){
var e=Math.cos(b);
var a=Math.abs((c-a));
var c=Math.sin(b);
var b=Math.sin(b);
var c=Math.sqrt((1-((c*0.0066943800228870254)*b)));
var a=(((e*6378137)*a)/c);
break;
}else if((i>>0)===(1>>0)){
var b=Math.cos(e);
var a=Math.abs((c-a));
var c=Math.sin(e);
var e=Math.sin(e);
var c=Math.sqrt((1-((c*0.0066943800228870254)*e)));
var a=(((b*6378137)*a)/c);
break;
}else if((i>>0)===(2>>0)){
var b=Math.cos(f);
var a=Math.abs((c-a));
var c=Math.sin(f);
var e=Math.sin(f);
var c=Math.sqrt((1-((c*0.0066943800228870254)*e)));
var a=(((b*6378137)*a)/c);
break;
}else{
var a=0;
break;
}
}else{
var a=0;
var d=0;
}
}while(0);
k.d1=a;
k.d0=d;
return k;
}
function bE(t,u,r,w){
var label=0;
var a=aSlot={i0:0,i1:0,i2:0};
var e=(t[u>>0].d1);
var d=(t[u>>0].d0);
L25:do{
if(((r>>0)>(1>>0))){
var h=e;
var i=d;
var b=1;
while(1){
var f=(t[(u>>0)+(b>>0)>>0].d1);
var e=((e<f)?f:e);
var h=((h>f)?f:h);
var f=(t[(u>>0)+(b>>0)>>0].d0);
var i=((i<f)?f:i);
var d=((d>f)?f:d);
var b=((b>>0)+(1>>0)>>0);
if(((b>>0)<(r>>0))){
}else{
break L25;
}
}
}else{
var h=e;
var i=d;
}
}while(0);
aQ(a,d,i,h,e);
var b=(a.i0>>0);
var c=((((w>>0)+(4>>0)>>0)>>0)+(b>>0)>>0);
var a=aK2(t,u,r>>0,c>>0);
var l=bb(a);
var j=(l.i0>>0);
if(!(((j>>0)>(0>>0)))){
return aX(l);
}
var b=0;
while(1){
L34:do{
if((b>>0)===(0>>0)){
var a=(l.a1);
}else if((b>>0)===(-1>>0)){
var a=(l.a2);
}else{
var a=(l.a1);
if(((b>>0)>(0>>0))){
var g=b;
}else{
break;
}
while(1){
var a=(a.a1);
var g=((g>>0)+(-1>>0)>>0);
if(((g>>0)>(0>>0))){
}else{
break L34;
}
}
}
}while(0);
if((a===null)){
var g=-1;
}else{
var g=(a.a0.i0>>0);
}
var c=(((c>>0)>(g>>0))?g:c);
var b=((b>>0)+(1>>0)>>0);
if(((b>>0)<(j>>0))){
}else{
break;
}
}
var g=((((((w>>0)+(-1>>0)>>0)-g)>>0)>>0)+(c>>0)>>0);
var b=j;
var c=0;
while(1){
L47:do{
if((((b>>0)!==(0>>0))&&((b>>0)>(c>>0)))){
if((c>>0)===(0>>0)){
var a=(l.a1);
break;
}else if((c>>0)===(-1>>0)){
var a=(l.a2);
break;
}else{
var a=(l.a1);
if(((c>>0)>(0>>0))){
var b=c;
}else{
break;
}
while(1){
var a=(a.a1);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L47;
}
}
}
}else{
var a=null;
}
}while(0);
var b=(a.a0.i0>>0);
var n=(a.a0.i1>>0);
var o=(a.a0.i2>>0);
var b=((g>>0)+(b>>0)>>0);
var k=((32-b)>>0);
a.a0.i0=(b>>0);
a.a0.i1=(((n>>>k)<<k)>>0);
a.a0.i2=(((o>>>k)<<k)>>0);
var c=((c>>0)+(1>>0)>>0);
if(!(((c>>0)<(j>>0)))){
break;
}
var b=(l.i0>>0);
}
return aX(l);
}
function aI(n,r,o){
var label=0;
if(((n<0)||(r<0))){
var g=null;
return g;
}
var h=(a4[o>>0]);
var g={i0:0,a1:null,a2:null,a3:null};
g.i0=(0>>0);
g.a1=null;
g.a2=null;
g.a3=null;
if(((o>>0)<(10>>0))){
var b=(n>>0);
var f=(r>>0);
var c=((((((+(b>>0))!==n)?1:0)?1:0)>>0)+(b>>0)>>0);
var i=(h>>0);
var b=(((c>>0)%(i>>0))>>0);
do{
if(((b>>0)===(0>>0))){
var a={d0:0,a1:null};
a.d0=(+(c>>0));
a.a1=null;
var b=(g.i0>>0);
if(((b>>0)===(0>>0))){
g.a3=a;
g.a1=a;
g.a2=a;
var b=1;
break;
}else{
var j=(g.a2);
j.a1=a;
g.a2=a;
var b=((b>>0)+(1>>0)>>0);
break;
}
}else{
var c=((((i>>0)+(c>>0)>>0)-b)>>0);
var a={d0:0,a1:null};
a.d0=(+(c>>0));
a.a1=null;
var b=(g.i0>>0);
if(((b>>0)===(0>>0))){
g.a3=a;
g.a1=a;
g.a2=a;
var b=1;
break;
}else{
var j=(g.a2);
j.a1=a;
g.a2=a;
var b=((b>>0)+(1>>0)>>0);
break;
}
}
}while(0);
g.i0=(b>>0);
var b=((c>>0)+(i>>0)>>0);
if(((b>>0)>(f>>0))){
return g;
}else{
}
while(1){
var a={d0:0,a1:null};
a.d0=(+(b>>0));
a.a1=null;
var c=(g.i0>>0);
if(((c>>0)===(0>>0))){
g.a3=a;
g.a1=a;
g.a2=a;
var c=1;
}else{
var j=(g.a2);
j.a1=a;
g.a2=a;
var c=((c>>0)+(1>>0)>>0);
}
g.i0=(c>>0);
var b=((b>>0)+(i>>0)>>0);
if(((b>>0)>(f>>0))){
break;
}else{
}
}
return g;
}
if(((o>>0)<(16>>0))){
var b=(n>>0);
var i=(r>>0);
var d=((n-(+(b>>0)))*60);
var u=(+(((((r*60)>>0)>>0)+((mathimul(i,-60)>>0)>>0)>>0)>>0));
var w=(((60>>0)/((h>>0)>>0))>>0);
var l=((w>>0)+(1>>0)>>0);
var e=(+((d>>0)>>0));
if((e!==d)){
var d=(e+1);
}else{
}
do{
if((d>0)){
var e=0;
while(1){
var e=(h+e);
if((e<d)){
}else{
break;
}
}
if(!((e>60))){
break;
}
var b=((b>>0)+(1>>0)>>0);
var e=0;
}else{
var e=0;
}
}while(0);
L136:do{
if(((w>>0)>(-1>>0))){
var d=(+(b>>0));
var c=0;
while(1){
var k=(h*(+(c>>0)));
do{
if(!((k<e))){
var k=(d+(k/60));
if((k>r)){
break;
}
var a={d0:0,a1:null};
a.d0=k;
a.a1=null;
var f=(g.i0>>0);
if(((f>>0)===(0>>0))){
g.a3=a;
g.a1=a;
g.a2=a;
var f=1;
}else{
var j=(g.a2);
j.a1=a;
g.a2=a;
var f=((f>>0)+(1>>0)>>0);
}
g.i0=(f>>0);
}
}while(0);
var c=((c>>0)+(1>>0)>>0);
if(((c>>0)<(l>>0))){
}else{
break L136;
}
}
}
}while(0);
var b=((b>>0)+(1>>0)>>0);
L149:do{
if(((b>>0)<(i>>0))){
while(1){
L152:do{
if(((w>>0)>(-1>>0))){
var d=(+(b>>0));
var c=0;
while(1){
var a={d0:0,a1:null};
a.d0=(d+((h*(+(c>>0)))/60));
a.a1=null;
var f=(g.i0>>0);
if(((f>>0)===(0>>0))){
g.a3=a;
g.a1=a;
g.a2=a;
var f=1;
}else{
var j=(g.a2);
j.a1=a;
g.a2=a;
var f=((f>>0)+(1>>0)>>0);
}
g.i0=(f>>0);
var c=((c>>0)+(1>>0)>>0);
if(((c>>0)<(l>>0))){
}else{
break L152;
}
}
}
}while(0);
var b=((b>>0)+(1>>0)>>0);
if(((b>>0)<(i>>0))){
}else{
var b=i;
break L149;
}
}
}else{
}
}while(0);
if(!(((w>>0)>(-1>>0)))){
return g;
}
var d=(+(b>>0));
var b=0;
while(1){
var e=(h*(+(b>>0)));
do{
if(!((e>u))){
var e=(d+(e/60));
if((e>r)){
break;
}
var a={d0:0,a1:null};
a.d0=e;
a.a1=null;
var c=(g.i0>>0);
if(((c>>0)===(0>>0))){
g.a3=a;
g.a1=a;
g.a2=a;
var c=1;
}else{
var j=(g.a2);
j.a1=a;
g.a2=a;
var c=((c>>0)+(1>>0)>>0);
}
g.i0=(c>>0);
}
}while(0);
var b=((b>>0)+(1>>0)>>0);
if(((b>>0)<(l>>0))){
}else{
break;
}
}
return g;
}
if(!(((o>>0)<(22>>0)))){
if(!(((o>>0)<(33>>0)))){
return g;
}
var d=(n*3600);
var u=(r*3600);
var e=(+((d>>0)>>0));
var k=(d-e);
do{
if((k>0)){
var d=0;
while(1){
var d=(h+d);
if((d<k)){
}else{
break;
}
}
if(!((d>1))){
var aB=d;
var d=e;
var e=aB;
break;
}
var d=(e+1);
var e=0;
}else{
var d=e;
var e=0;
}
}while(0);
var d=(d+e);
if((d>u)){
return g;
}else{
}
while(1){
var a={d0:0,a1:null};
a.d0=(d/3600);
a.a1=null;
var b=(g.i0>>0);
if(((b>>0)===(0>>0))){
g.a3=a;
g.a1=a;
g.a2=a;
var b=1;
}else{
var j=(g.a2);
j.a1=a;
g.a2=a;
var b=((b>>0)+(1>>0)>>0);
}
g.i0=(b>>0);
var d=(h+d);
if((d>u)){
break;
}else{
}
}
return g;
}
var b=(n>>0);
var c=(r>>0);
var e=(+(((((r*60)>>0)>>0)+((mathimul(c,-60)>>0)>>0)>>0)>>0));
var b=(((((n-(+(b>>0)))*60)>>0)>>0)+((mathimul(b,60)>>0)>>0)>>0);
var i=(((+((mathimul(c,60)>>0)>>0))+e)>>0);
var d=((n*3600)-(+((mathimul(b,60)>>0)>>0)));
var u=((+(((((r*3600)>>0)>>0)+((mathimul(c,-3600)>>0)>>0)>>0)>>0))-(e*60));
var e=(+((d>>0)>>0));
if((e!==d)){
var d=(e+1);
}else{
}
L201:do{
if((d>0)){
var e=0;
while(1){
var e=(h+e);
if((e<d)){
}else{
break L201;
}
}
}else{
var e=0;
}
}while(0);
var f=(((((e>60)?1:0)?1:0)>>0)+(b>>0)>>0);
var d=((e>60)?0:e);
var w=(((60>>0)/((h>>0)>>0))>>0);
var l=((w>>0)+(1>>0)>>0);
L205:do{
if(((w>>0)>(-1>>0))){
var e=((+(f>>0))/60);
var b=0;
while(1){
var k=(h*(+(b>>0)));
do{
if(!((k<d))){
var k=(e+(k/3600));
if((k>r)){
break;
}
var a={d0:0,a1:null};
a.d0=k;
a.a1=null;
var c=(g.i0>>0);
if(((c>>0)===(0>>0))){
g.a3=a;
g.a1=a;
g.a2=a;
var c=1;
}else{
var j=(g.a2);
j.a1=a;
g.a2=a;
var c=((c>>0)+(1>>0)>>0);
}
g.i0=(c>>0);
}
}while(0);
var b=((b>>0)+(1>>0)>>0);
if(((b>>0)<(l>>0))){
}else{
break L205;
}
}
}
}while(0);
var b=((f>>0)+(1>>0)>>0);
L218:do{
if(((b>>0)<(i>>0))){
while(1){
L221:do{
if(((w>>0)>(-1>>0))){
var d=((+(b>>0))/60);
var c=0;
while(1){
var a={d0:0,a1:null};
a.d0=(d+((h*(+(c>>0)))/3600));
a.a1=null;
var f=(g.i0>>0);
if(((f>>0)===(0>>0))){
g.a3=a;
g.a1=a;
g.a2=a;
var f=1;
}else{
var j=(g.a2);
j.a1=a;
g.a2=a;
var f=((f>>0)+(1>>0)>>0);
}
g.i0=(f>>0);
var c=((c>>0)+(1>>0)>>0);
if(((c>>0)<(l>>0))){
}else{
break L221;
}
}
}
}while(0);
var b=((b>>0)+(1>>0)>>0);
if(((b>>0)<(i>>0))){
}else{
var b=i;
break L218;
}
}
}else{
}
}while(0);
if(!(((w>>0)>(-1>>0)))){
return g;
}
var d=((+(b>>0))/60);
var b=0;
while(1){
var e=(h*(+(b>>0)));
do{
if(!((e>u))){
var e=(d+(e/3600));
if((e>r)){
break;
}
var a={d0:0,a1:null};
a.d0=e;
a.a1=null;
var c=(g.i0>>0);
if(((c>>0)===(0>>0))){
g.a3=a;
g.a1=a;
g.a2=a;
var c=1;
}else{
var j=(g.a2);
j.a1=a;
g.a2=a;
var c=((c>>0)+(1>>0)>>0);
}
g.i0=(c>>0);
}
}while(0);
var b=((b>>0)+(1>>0)>>0);
if(((b>>0)<(l>>0))){
}else{
break;
}
}
return g;
}
function bi(j,k,i){
var label=0;
var d=((j<-180)?-180:j);
var g=((k>180)?180:k);
if(!((d<0))){
var c=aI(d,g,i>>0);
return c;
}
L35:do{
if((g>0)){
var c=aI(0,g,i>>0);
var f=aI(0,(-0-d),i>>0);
var h=(f.i0>>0);
if(!(((h>>0)>(0>>0)))){
var a=f;
break;
}
var b=h;
var e=0;
while(1){
do{
if((((b>>0)!==(0>>0))&&((b>>0)>(e>>0)))){
L44:do{
if((e>>0)===(0>>0)){
var a=(f.a1);
}else if((e>>0)===(-1>>0)){
var a=(f.a2);
}else{
var a=(f.a1);
if(((e>>0)>(0>>0))){
var b=e;
}else{
break;
}
while(1){
var a=(a.a1);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L44;
}
}
}
}while(0);
if((a===null)){
var d=-1;
label=15;
break;
}
var d=(a.d0);
if((d===0)){
break;
}else{
label=15;
break;
}
}else{
var d=-1;
label=15;
}
}while(0);
if(label===15){
label=0;
var a={d0:0,a1:null};
a.d0=(-0-d);
a.a1=null;
var b=(c.i0>>0);
if(((b>>0)===(0>>0))){
c.a3=a;
c.a1=a;
c.a2=a;
var b=1;
}else{
var l=(c.a2);
l.a1=a;
c.a2=a;
var b=((b>>0)+(1>>0)>>0);
}
c.i0=(b>>0);
}
var e=((e>>0)+(1>>0)>>0);
if(!(((e>>0)<(h>>0)))){
var a=f;
break L35;
}
var b=(f.i0>>0);
}
}else{
var a=aI((-0-g),(-0-d),i>>0);
var b=(a.i0>>0);
if(!(((b>>0)>(0>>0)))){
var c=null;
break;
}
bL();
}
}while(0);
if((a===null)){
return c;
}
var b=(a.i0>>0);
L64:do{
if((((b>>0)!==(0>>0))&&((b>>0)>(0>>0)))){
var a=(a.a1);
while(1){
var a=(a.a1);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(0>>0))){
}else{
break L64;
}
}
}
}while(0);
return c;
}
function bH(u){
var label=0;
var a=(u.i0>>0);
if(((a>>0)<(1>>0))){
var d=null;
return d;
}
var e=(u.a1);
if((e===null)){
var d=null;
return d;
}
var d={i0:0,a1:null,a2:null,a3:null};
d.i0=(0>>0);
d.a1=null;
d.a2=null;
d.a3=null;
while(1){
var a=(e.i0>>0);
var o=(+(((a>>0)+(1>>0)>>0)>>>0));
var a=0;
while(1){
var f=(+(a>>0));
var l=Math.pow(4,f);
var f=Math.pow(4,f);
var f=((o-l)/(f*2));
var c=((a>>0)+(1>>0)>>0);
if((f===(+((f>>0)>>0)))){
label=6;
break;
}
if(((c>>0)<(32>>0))){
var a=c;
}else{
var a=c;
var c=0;
break;
}
}
if(label===6){
label=0;
var c=(f>>0);
}
var g=((31-a)>>0);
var a=((64-(g<<1))>>0);
L33:do{
if(((g>>0)>(0>>0))){
var a=((c<<a)>>>a);
var r=((32-g)>>0);
var h=0;
var i=0;
var c=0;
while(1){
var k=(a>>>2);
var j=((c>>0)+(r>>0)>>0);
var i=(((((a>>>1)-(k<<1))>>0)<<j)|i);
var h=(((a&1)<<j)|h);
var c=((c>>0)+(1>>0)>>0);
if(((c>>0)<(g>>0))){
var a=k;
}else{
break L33;
}
}
}else{
var h=0;
var i=0;
}
}while(0);
var b={a0:{i0:0,i1:0,i2:0},a1:null};
b.a0.i0=(g>>0);
b.a0.i1=(h>>0);
b.a0.i2=(i>>0);
b.a1=null;
var a=(d.i0>>0);
if(((a>>0)===(0>>0))){
d.a3=b;
d.a1=b;
d.a2=b;
var a=1;
}else{
var n=(d.a2);
n.a1=b;
d.a2=b;
var a=((a>>0)+(1>>0)>>0);
}
d.i0=(a>>0);
var e=(e.a1);
if((e===null)){
break;
}else{
}
}
return d;
}
function by(l){
var label=0;
var a=(l.i0>>0);
if(((a>>0)<(1>>0))){
var d=null;
return d;
}
var b=(l.a1);
if((b===null)){
var d=null;
return d;
}
var a=(b.a0.i0>>0);
if(((a>>0)>(31>>0))){
var d=null;
return d;
}
var d={i0:0,a1:null,a2:null,a3:null};
d.i0=(0>>0);
d.a1=null;
d.a2=null;
d.a3=null;
while(1){
var e=(b.a0.i0>>0);
var j=(b.a0.i1>>0);
var k=(b.a0.i2>>0);
do{
if(((e>>0)>(0>>0))){
var f=0;
var a=0;
while(1){
var g=(a<<1);
var f=(((((((j<<a)>>>31)<<((62-g)>>0))>>0)+(f>>0)>>0)>>0)+((((k<<a)>>>31)<<((63-g)>>0))>>0)>>0);
var a=((a>>0)+(1>>0)>>0);
if(((a>>0)<(e>>0))){
}else{
break;
}
}
if(((e>>0)>(31>>0))){
var a=0;
break;
}else{
label=7;
break;
}
}else{
var f=0;
label=7;
}
}while(0);
if(label===7){
label=0;
var h=Math.pow(4,(+(((31-e)>>0)>>0)));
var a=(((h*(+((((f>>>((64-(e<<1))>>0))<<1)|1)>>>0)))+-1)>>0);
}
var c={i0:0,a1:null};
c.i0=(a>>0);
c.a1=null;
var a=(d.i0>>0);
if(((a>>0)===(0>>0))){
d.a3=c;
d.a1=c;
d.a2=c;
var a=1;
}else{
var i=(d.a2);
i.a1=c;
d.a2=c;
var a=((a>>0)+(1>>0)>>0);
}
d.i0=(a>>0);
var b=(b.a1);
if((b===null)){
break;
}else{
}
}
return d;
}
function bM(k){
var label=0;
var e=aSlot={d0:0,d1:0,d2:0,d3:0};
var c=aSlot={i0:0,i1:0,i2:0};
c.i0=((k.i0>>0)>>0);
c.i1=((k.i1>>0)>>0);
c.i2=((k.i2>>0)>>0);
ad(e,c);
var h=(e.d0);
var b=(e.d1);
var d=(e.d2);
var a=(e.d3);
var f=Math.abs(b);
do{
if((f<90)){
var g=Math.abs(h);
if(!((g<180))){
var a=0;
break;
}
do{
if((f<90)){
var j=Math.abs(a);
if((j>1.0E-10)){
break;
}
var a=((b/f)*90);
}else{
}
}while(0);
do{
if((g<180)){
var f=Math.abs(d);
if((f>1.0E-10)){
break;
}
var d=((h/g)*180);
}else{
}
}while(0);
var b=((b*3.1415926535897931)/180);
var a=((a*3.1415926535897931)/180);
var f=Math.sin(b);
var g=Math.sin(b);
var j=Math.sin(b);
var i=Math.sin(b);
var b=Math.sin(b);
var b=Math.log((((i*0.081819191042731692)+1)/(1-(b*0.081819191042731692))));
var i=Math.sin(a);
var n=Math.sin(a);
var o=Math.sin(a);
var l=Math.sin(a);
var a=Math.sin(a);
var a=Math.log((((l*0.081819191042731692)+1)/(1-(a*0.081819191042731692))));
var a=Math.abs(((((h*3.1415926535897931)/180)-((d*3.1415926535897931)/180))*((((f/((1-((g*0.0066943800228870254)*j))*2))+(b*3.055517865844366))*40408299983329.328)-(((i/((1-((n*0.0066943800228870254)*o))*2))+(a*3.055517865844366))*40408299983329.328))));
}else{
var a=0;
}
}while(0);
return a;
}
function bK(i){
var label=0;
var e=aSlot={i0:0,d1:0,d2:0};
var b=aSlot={i0:0,i1:0,i2:0};
var d=(i.i0>>0);
var h=(i.i1>>0);
var g=(i.i2>>0);
var a=((32-d)>>0);
var f=((g>>>a)<<a);
var a=((h>>>a)<<a);
do{
if(((d>>0)>(18>>0))){
if(((((f&122880)>>0)===(122880>>0))||(((a&122880)>>0)===(122880>>0)))){
var c=-1;
}else{
label=3;
break;
}
return c;
}else{
if(((d>>0)>(13>>0))){
label=3;
break;
}else{
break;
}
}
}while(0);
do{
if(label===3){
if(((((f&7864320)>>0)===(7864320>>0))||(((a&7864320)>>0)===(7864320>>0)))){
var c=-1;
}else{
break;
}
return c;
}
}while(0);
if(((((f&2139095040)>>>0)>(754974720>>>0))||(((a&2139095040)>>>0)>(1509949440>>>0)))){
var c=-1;
return c;
}
var a=((31-d)>>0);
b.i0=(((d>>0)+(1>>0)>>0)>>0);
b.i1=(((((h>>>a)>>0)+(1>>0)>>0)<<a)>>0);
b.i2=(((((g>>>a)>>0)+(1>>0)>>0)<<a)>>0);
aD(e,b);
var c=(e.d2);
if((c===90)){
var c=1.5625992187355408E-7;
return c;
}
var c=Math.tan(((c*3.1415926535897931)/180));
var c=Math.pow((((1.6549137866238727E+27/((((1/(c*c))*6356752.3141403999)*6356752.3141403999)+40680631590769))*272331607439.67188)+1.6328307075427332E+27),1.5);
var c=(1.0414417950514486E+34/c);
return c;
}
function aW(k,j){
var label=0;
var c=aSlot={d0:0,d1:0,d2:0,d3:0};
var g=aSlot={i0:0,i1:0,i2:0};
var e=aSlot={i0:0,i1:0,i2:0};
var r=(k.i0>>0);
g.i0=(r>>0);
var n=(k.i1>>0);
g.i1=(n>>0);
var l=(k.i2>>0);
g.i2=(l>>0);
ad(c,g);
var a=(c.d0);
var b=(c.d1);
var i=(c.d2);
var d=(c.d3);
var d=((b+d)*0.5);
e.i0=(r>>0);
e.i1=(n>>0);
e.i2=(l>>0);
ad(c,e);
var b=(c.d0);
var f=(c.d1);
var h=(c.d2);
var o=(c.d3);
var f=((f+o)*0.5);
var b=(((b+h)*0.5)-((a+i)*0.5));
var i=(f-d);
var a=Math.abs(b);
var h=Math.abs(i);
do{
if(((a<1.0E-4)||(a===360))){
if((h<1.0E-4)){
var a=100;
break;
}
var a=((i>0)?0:3.1415926535897931);
}else{
if((h<1.0E-4)){
if((b>0)){
var a=((b>180)?18.849555921538759:6.2831853071795862);
break;
}else{
var a=((b<-180)?6.2831853071795862:18.849555921538759);
break;
}
}
var h=Math.abs((a+-180));
if((h<1.0E-4)){
var a=Math.abs((((6.2831853071795862-d)+(6.2831853071795862-f))+-3.1415926535897931));
var a=((a<1.0E-4)?0:3.1415926535897931);
break;
}
do{
if((a>180)){
if((b>0)){
var b=(-0-(360-b));
break;
}else{
var b=(b+360);
break;
}
}else{
}
}while(0);
var a=(((90-d)*3.1415926535897931)/180);
var d=(((90-f)*3.1415926535897931)/180);
var f=Math.cos(d);
var h=Math.cos(a);
var o=Math.sin(d);
var a=Math.sin(a);
var u=((b*3.1415926535897931)/180);
var w=Math.cos(u);
var a=((f*h)+((o*a)*w));
var a=Math.sqrt((1-(a*a)));
var d=Math.sin(d);
var f=Math.sin(u);
var a=Math.asin(((d*f)/a));
if((i<0)){
var a=(3.1415926535897931-a);
break;
}
if((b>0)){
break;
}
var a=(a+6.2831853071795862);
}
}while(0);
return a;
}
function bI(n,l){
var label=0;
var e=aSlot={i0:0,i1:0,i2:0};
var d=aSlot={i0:0,i1:0,i2:0};
var b=aSlot={i0:0,i1:0,i2:0};
var c=aSlot={i0:0,i1:0,i2:0};
aJ(e,n);
var f=(e.i0>>0);
var k=(e.i1>>0);
var i=(e.i2>>0);
aJ(d,l);
var j=(d.i0>>0);
var g=(d.i1>>0);
var h=(d.i2>>0);
b.i0=(f>>0);
b.i1=(k>>0);
b.i2=(i>>0);
c.i0=(j>>0);
c.i1=(g>>0);
c.i2=(h>>0);
var a=aW(b,c);
if((a===100)){
var f=100;
return f>>0;
}
do{
if((a>0.39269908169872414)){
if(!((a>1.1780972450961724))){
var f=1;
return f>>0;
}
if(!((a>1.9634954084936207))){
var f=2;
return f>>0;
}
if(!((a>2.748893571891069))){
var f=3;
return f>>0;
}
if(!((a>3.5342917352885173))){
var f=4;
return f>>0;
}
if(!((a>4.3196898986859651))){
var f=5;
return f>>0;
}
if(!((a>5.1050880620834143))){
var f=6;
return f>>0;
}
if((a>5.8904862254808616)){
break;
}else{
var f=7;
}
return f>>0;
}
}while(0);
var f=0;
return f>>0;
}
function bJ(){
var label=0;
var g=aSlot=[{d0:0,d1:0},{d0:0,d1:0},{d0:0,d1:0},g={d0:0,d1:0},g={d0:0,d1:0},g={d0:0,d1:0},g={d0:0,d1:0},g={d0:0,d1:0},g={d0:0,d1:0},g={d0:0,d1:0},g={d0:0,d1:0},g={d0:0,d1:0},g={d0:0,d1:0},g={d0:0,d1:0},g={d0:0,d1:0},g={d0:0,d1:0},g={d0:0,d1:0},g={d0:0,d1:0},g={d0:0,d1:0},g={d0:0,d1:0},g={d0:0,d1:0},g={d0:0,d1:0},g={d0:0,d1:0},g={d0:0,d1:0},g={d0:0,d1:0}];
var e=aSlot={i0:0,i1:0,i2:0};
var o=aSlot={i0:0,i1:0,i2:0};
var c=o;
var b=o;
var d=o;
var w=aSlot={d0:0,d1:0};
var i=aSlot={d0:0,d1:0};
var n=aSlot={i0:0,d1:0,d2:0};
var r=aSlot={i0:0,i1:0,i2:0};
var u=aSlot={i0:0,i1:0,i2:0};
var T=aSlot={i0:0,i1:0,i2:0};
var W=aSlot={i0:0,i1:0,i2:0};
var V=aSlot={i0:0,i1:0,i2:0};
var af=aSlot={i0:0,i1:0,i2:0};
var ae=aSlot={i0:0,i1:0,i2:0};
var ak=aSlot={d0:0,d1:0};
var aj=aSlot={d0:0,d1:0};
var ah=aSlot={d0:0,d1:0};
var aa=aSlot={i0:0,i1:0,i2:0};
var R=aSlot={i0:0,i1:0,i2:0};
var I=aSlot={i0:0,i1:0,i2:0};
var S=aSlot={i0:0,i1:0,i2:0};
var O=aSlot={i0:0,i1:0,i2:0};
var ar=aSlot={i0:0,i1:0,i2:0};
var D=ar;
var aE=aSlot={i0:0,d1:0,d2:0};
var M=aSlot={i0:0,i1:0,i2:0};
var aq=aSlot={d0:0,d1:0,d2:0,d3:0};
T.i0=(9>>0);
T.i1=(1006632960>>0);
T.i2=(335544320>>0);
an(e,T,2>>0,2>>0);
g[0>>0].d1=50.100000000000001;
g[0>>0].d0=50.109999999999999;
g[(0>>0)+(1>>0)>>0].d1=50.200000000000003;
g[(0>>0)+(1>>0)>>0].d0=50.219999999999999;
g[(0>>0)+(2>>0)>>0].d1=50.299999999999997;
g[(0>>0)+(2>>0)>>0].d0=50.329999999999998;
g[(0>>0)+(3>>0)>>0].d1=50.399999999999999;
g[(0>>0)+(3>>0)>>0].d0=50.439999999999998;
g[(0>>0)+(4>>0)>>0].d1=50.5;
g[(0>>0)+(4>>0)>>0].d0=50.549999999999997;
bO(g,0,5>>0);
W.i0=(6>>0);
W.i1=(6666662>>0);
W.i2=(666662>>0);
bC(W);
V.i0=(7>>0);
V.i1=(77777772>>0);
V.i2=(7777772>>0);
bG(V);
var a=10;
while(1){
var j=(a4[a>>0]);
if(((a>>0)<(16>>0))){
var j=(j/60);
}else{
var j=(j/3600);
}
if(((j*9)<0.10000000000000853)){
break;
}
var a=((a>>0)+(1>>0)>>0);
if(((a>>0)<(33>>0))){
}else{
break;
}
}
bi(88.099999999999994,88.200000000000002,(((a>>0)>(32>>0))?32:a)>>0);
var a=10;
while(1){
var j=(a4[a>>0]);
if(((a>>0)<(16>>0))){
var j=(j/60);
}else{
var j=(j/3600);
}
if(((j*9)<0.0010000000000012221)){
break;
}
var a=((a>>0)+(1>>0)>>0);
if(((a>>0)<(33>>0))){
}else{
break;
}
}
aI(10.1,10.101000000000001,(((a>>0)>(32>>0))?32:a)>>0);
bi(-11.109999999999999,11.1111,11>>0);
af.i0=(12>>0);
af.i1=(121212122>>0);
af.i2=(12121212>>0);
ae.i0=(12>>0);
ae.i1=(1212121212>>0);
ae.i2=(121212121>>0);
aW(af,ae);
var f={i0:0,a1:null,a2:null,a3:null};
f.i0=(0>>0);
f.a1=null;
f.a2=null;
f.a3=null;
var h={a0:{i0:0,i1:0,i2:0},a1:null};
h.a0.i0=(13>>0);
h.a0.i1=(13131311>>0);
h.a0.i2=(1313131>>0);
h.a1=null;
var a=(f.i0>>0);
if(((a>>0)===(0>>0))){
f.a3=h;
f.a1=h;
f.a2=h;
var a=1;
}else{
var k=(f.a2);
k.a1=h;
f.a2=h;
var a=((a>>0)+(1>>0)>>0);
}
f.i0=(a>>0);
var h={a0:{i0:0,i1:0,i2:0},a1:null};
h.a0.i0=(13>>0);
h.a0.i1=(13131322>>0);
h.a0.i2=(1313132>>0);
h.a1=null;
var a=(f.i0>>0);
if(((a>>0)===(0>>0))){
f.a3=h;
f.a1=h;
f.a2=h;
var a=1;
}else{
var k=(f.a2);
k.a1=h;
f.a2=h;
var a=((a>>0)+(1>>0)>>0);
}
f.i0=(a>>0);
var h={i0:0,a1:null,a2:null,a3:null};
h.i0=(0>>0);
h.a1=null;
h.a2=null;
h.a3=null;
var k={a0:{i0:0,i1:0,i2:0},a1:null};
k.a0.i0=(13>>0);
k.a0.i1=(131313111>>0);
k.a0.i2=(13131311>>0);
k.a1=null;
var a=(h.i0>>0);
if(((a>>0)===(0>>0))){
h.a3=k;
h.a1=k;
h.a2=k;
var a=1;
}else{
var az=(h.a2);
az.a1=k;
h.a2=k;
var a=((a>>0)+(1>>0)>>0);
}
h.i0=(a>>0);
var k={a0:{i0:0,i1:0,i2:0},a1:null};
k.a0.i0=(13>>0);
k.a0.i1=(131313222>>0);
k.a0.i2=(13131322>>0);
k.a1=null;
var a=(h.i0>>0);
if(((a>>0)===(0>>0))){
h.a3=k;
h.a1=k;
h.a2=k;
var a=1;
}else{
var az=(h.a2);
az.a1=k;
h.a2=k;
var a=((a>>0)+(1>>0)>>0);
}
h.i0=(a>>0);
aJ(e,f);
var a=(e.i0>>0);
var l=(e.i1>>0);
var A=(e.i2>>0);
aJ(c,h);
var E=(c.i0>>0);
var C=(c.i1>>0);
var al=(c.i2>>0);
r.i0=(a>>0);
r.i1=(l>>0);
r.i2=(A>>0);
u.i0=(E>>0);
u.i1=(C>>0);
u.i2=(al>>0);
aW(r,u);
r.i0=(14>>0);
r.i1=(14141422>>0);
r.i2=(1414142>>0);
bM(r);
var c={i0:0,a1:null,a2:null,a3:null};
c.i0=(0>>0);
c.a1=null;
c.a2=null;
c.a3=null;
var f={a0:{i0:0,i1:0,i2:0},a1:null};
f.a0.i0=(15>>0);
f.a0.i1=(15151511>>0);
f.a0.i2=(1515151>>0);
f.a1=null;
var a=(c.i0>>0);
if(((a>>0)===(0>>0))){
c.a3=f;
c.a1=f;
c.a2=f;
var a=1;
}else{
var h=(c.a2);
h.a1=f;
c.a2=f;
var a=((a>>0)+(1>>0)>>0);
}
c.i0=(a>>0);
var f={a0:{i0:0,i1:0,i2:0},a1:null};
f.a0.i0=(15>>0);
f.a0.i1=(15151522>>0);
f.a0.i2=(1515152>>0);
f.a1=null;
var a=(c.i0>>0);
if(((a>>0)===(0>>0))){
c.a3=f;
c.a1=f;
c.a2=f;
var a=1;
}else{
var h=(c.a2);
h.a1=f;
c.a2=f;
var a=((a>>0)+(1>>0)>>0);
}
c.i0=(a>>0);
aJ(e,c);
var c={i0:0,a1:null,a2:null,a3:null};
c.i0=(0>>0);
c.a1=null;
c.a2=null;
c.a3=null;
var f={a0:{i0:0,i1:0,i2:0},a1:null};
f.a0.i0=(16>>0);
f.a0.i1=(16161611>>0);
f.a0.i2=(1616161>>0);
f.a1=null;
var a=(c.i0>>0);
if(((a>>0)===(0>>0))){
c.a3=f;
c.a1=f;
c.a2=f;
var a=1;
}else{
var h=(c.a2);
h.a1=f;
c.a2=f;
var a=((a>>0)+(1>>0)>>0);
}
c.i0=(a>>0);
var f={a0:{i0:0,i1:0,i2:0},a1:null};
f.a0.i0=(16>>0);
f.a0.i1=(16161622>>0);
f.a0.i2=(1616162>>0);
f.a1=null;
var a=(c.i0>>0);
if(((a>>0)===(0>>0))){
c.a3=f;
c.a1=f;
c.a2=f;
var a=1;
}else{
var h=(c.a2);
h.a1=f;
c.a2=f;
var a=((a>>0)+(1>>0)>>0);
}
c.i0=(a>>0);
bz(c,162,16>>0);
var c={i0:0,a1:null,a2:null,a3:null};
c.i0=(0>>0);
c.a1=null;
c.a2=null;
c.a3=null;
var f={a0:{i0:0,i1:0,i2:0},a1:null};
f.a0.i0=(17>>0);
f.a0.i1=(17171711>>0);
f.a0.i2=(1717171>>0);
f.a1=null;
var a=(c.i0>>0);
if(((a>>0)===(0>>0))){
c.a3=f;
c.a1=f;
c.a2=f;
var a=1;
}else{
var h=(c.a2);
h.a1=f;
c.a2=f;
var a=((a>>0)+(1>>0)>>0);
}
c.i0=(a>>0);
var f={a0:{i0:0,i1:0,i2:0},a1:null};
f.a0.i0=(17>>0);
f.a0.i1=(17171722>>0);
f.a0.i2=(1717172>>0);
f.a1=null;
var a=(c.i0>>0);
if(((a>>0)===(0>>0))){
c.a3=f;
c.a1=f;
c.a2=f;
var a=1;
}else{
var h=(c.a2);
h.a1=f;
c.a2=f;
var a=((a>>0)+(1>>0)>>0);
}
c.i0=(a>>0);
bB(c,172>>0,17>>0);
u.i0=(18>>0);
u.i1=(1818182>>0);
u.i2=(181818>>0);
bK(u);
g[5>>0].d1=21.199999999999999;
g[5>>0].d0=21.219999999999999;
g[(5>>0)+(1>>0)>>0].d1=21.210000000000001;
g[(5>>0)+(1>>0)>>0].d0=21.221;
g[(5>>0)+(2>>0)>>0].d1=21.219999999999999;
g[(5>>0)+(2>>0)>>0].d0=21.222000000000001;
g[(5>>0)+(3>>0)>>0].d1=21.23;
g[(5>>0)+(3>>0)>>0].d0=21.222999999999999;
g[(5>>0)+(4>>0)>>0].d1=21.239999999999998;
g[(5>>0)+(4>>0)>>0].d0=21.224;
ak.d0=21.225000000000001;
ak.d1=21.25;
bQ(g,5,5>>0,ak,21>>0);
aj.d0=22.219999999999999;
aj.d1=22.199999999999999;
ah.d0=22.222200000000001;
ah.d1=22.222000000000001;
bk(aj,ah,22>>0);
g[10>>0].d1=23.199999999999999;
g[10>>0].d0=23.219999999999999;
g[(10>>0)+(1>>0)>>0].d1=23.210000000000001;
g[(10>>0)+(1>>0)>>0].d0=23.221;
g[(10>>0)+(2>>0)>>0].d1=23.219999999999999;
g[(10>>0)+(2>>0)>>0].d0=23.222000000000001;
g[(10>>0)+(3>>0)>>0].d1=23.23;
g[(10>>0)+(3>>0)>>0].d0=23.222999999999999;
bN(g,10,23>>0);
n.i0=(24>>0);
n.d1=24.239999999999998;
n.d2=24.2424;
N(e,n);
g[14>>0].d1=25.199999999999999;
g[14>>0].d0=25.219999999999999;
g[(14>>0)+(1>>0)>>0].d1=25.210000000000001;
g[(14>>0)+(1>>0)>>0].d0=25.221;
g[(14>>0)+(2>>0)>>0].d1=25.219999999999999;
g[(14>>0)+(2>>0)>>0].d0=25.222000000000001;
g[(14>>0)+(3>>0)>>0].d1=25.23;
g[(14>>0)+(3>>0)>>0].d0=25.222999999999999;
aK2(g,14,4>>0,25>>0);
g[18>>0].d1=26.199999999999999;
g[18>>0].d0=26.219999999999999;
g[(18>>0)+(1>>0)>>0].d1=26.210000000000001;
g[(18>>0)+(1>>0)>>0].d0=26.221;
g[(18>>0)+(2>>0)>>0].d1=26.219999999999999;
g[(18>>0)+(2>>0)>>0].d0=26.222000000000001;
bR(g,18,3>>0,26>>0);
ba(27.210000000000001,27.219999999999999,27.23,27.239999999999998,27>>0);
e.i0=(29>>0);
e.i1=(2828288>>0);
e.i2=(282832>>0);
aD(n,e);
e.i0=(30>>0);
e.i1=(3030302>>0);
e.i2=(303030>>0);
aV(w,e,0>>0);
b.i0=(30>>0);
b.i1=(3030302>>0);
b.i2=(303030>>0);
aV(i,b,2>>0);
var c={i0:0,a1:null,a2:null,a3:null};
c.i0=(0>>0);
c.a1=null;
c.a2=null;
c.a3=null;
var b={a0:{i0:0,i1:0,i2:0},a1:null};
b.a0.i0=(32>>0);
b.a0.i1=(32323211>>0);
b.a0.i2=(3232321>>0);
b.a1=null;
var a=(c.i0>>0);
if(((a>>0)===(0>>0))){
c.a3=b;
c.a1=b;
c.a2=b;
var a=1;
}else{
var i=(c.a2);
i.a1=b;
c.a2=b;
var a=((a>>0)+(1>>0)>>0);
}
c.i0=(a>>0);
var b={a0:{i0:0,i1:0,i2:0},a1:null};
b.a0.i0=(32>>0);
b.a0.i1=(32323222>>0);
b.a0.i2=(3232322>>0);
b.a1=null;
var a=(c.i0>>0);
if(((a>>0)===(0>>0))){
c.a3=b;
c.a1=b;
c.a2=b;
var a=1;
}else{
var i=(c.a2);
i.a1=b;
c.a2=b;
var a=((a>>0)+(1>>0)>>0);
}
c.i0=(a>>0);
var b={i0:0,a1:null,a2:null,a3:null};
b.i0=(0>>0);
b.a1=null;
b.a2=null;
b.a3=null;
var i={a0:{i0:0,i1:0,i2:0},a1:null};
i.a0.i0=(32>>0);
i.a0.i1=(323232112>>0);
i.a0.i2=(323232111>>0);
i.a1=null;
var a=(b.i0>>0);
if(((a>>0)===(0>>0))){
b.a3=i;
b.a1=i;
b.a2=i;
var a=1;
}else{
var f=(b.a2);
f.a1=i;
b.a2=i;
var a=((a>>0)+(1>>0)>>0);
}
b.i0=(a>>0);
var i={a0:{i0:0,i1:0,i2:0},a1:null};
i.a0.i0=(32>>0);
i.a0.i1=(323232211>>0);
i.a0.i2=(323232221>>0);
i.a1=null;
var a=(b.i0>>0);
if(((a>>0)===(0>>0))){
b.a3=i;
b.a1=i;
b.a2=i;
var a=1;
}else{
var f=(b.a2);
f.a1=i;
b.a2=i;
var a=((a>>0)+(1>>0)>>0);
}
b.i0=(a>>0);
bD(c,b);
var a=0;
while(1){
var j=(+(a>>0));
var z=Math.pow(4,j);
var j=Math.pow(4,j);
var j=((333334-z)/(j*2));
var a=((a>>0)+(1>>0)>>0);
if(((j!==(+((j>>0)>>0)))&&((a>>0)<(32>>0)))){
}else{
break;
}
}
aa.i0=(17>>0);
aa.i1=(3434342>>0);
aa.i2=(343434>>0);
aV(w,aa,1>>0);
var l=27;
var a=28;
while(1){
Math.pow(4,(+(((30-l)>>0)>>0)));
var l=((a>>0)+(1>>0)>>0);
if(((l>>0)<(32>>0))){
var aB=a;
var a=l;
var l=aB;
}else{
break;
}
}
g[21>>0].d1=37.200000000000003;
g[21>>0].d0=37.219999999999999;
g[(21>>0)+(1>>0)>>0].d1=37.210000000000001;
g[(21>>0)+(1>>0)>>0].d0=37.220999999999997;
g[(21>>0)+(2>>0)>>0].d1=37.219999999999999;
g[(21>>0)+(2>>0)>>0].d0=37.222000000000001;
g[(21>>0)+(3>>0)>>0].d1=37.229999999999997;
g[(21>>0)+(3>>0)>>0].d0=37.222999999999999;
bE(g,21,4>>0,3>>0);
aQ(e,38.210000000000001,38.219999999999999,38.229999999999997,38.240000000000002);
aQ(e,39.219999999999999,39.222999999999999,39.200000000000003,39.229999999999997);
aI(40.399999999999999,40.404000000000003,20>>0);
R.i0=(21>>0);
R.i1=(4141412>>0);
R.i2=(414141>>0);
a_(R);
e.i0=(22>>0);
e.i1=(4242424>>0);
e.i2=(424242>>0);
d.i0=(22>>0);
d.i1=(4242425>>0);
d.i2=(424243>>0);
aW(e,d);
var c={i0:0,a1:null,a2:null,a3:null};
c.i0=(0>>0);
c.a1=null;
c.a2=null;
c.a3=null;
var b={a0:{i0:0,i1:0,i2:0},a1:null};
b.a0.i0=(43>>0);
b.a0.i1=(43434311>>0);
b.a0.i2=(4343431>>0);
b.a1=null;
var a=(c.i0>>0);
if(((a>>0)===(0>>0))){
c.a3=b;
c.a1=b;
c.a2=b;
var a=1;
}else{
var d=(c.a2);
d.a1=b;
c.a2=b;
var a=((a>>0)+(1>>0)>>0);
}
c.i0=(a>>0);
var b={a0:{i0:0,i1:0,i2:0},a1:null};
b.a0.i0=(43>>0);
b.a0.i1=(43434322>>0);
b.a0.i2=(4343432>>0);
b.a1=null;
var a=(c.i0>>0);
if(((a>>0)===(0>>0))){
c.a3=b;
c.a1=b;
c.a2=b;
var a=1;
}else{
var d=(c.a2);
d.a1=b;
c.a2=b;
var a=((a>>0)+(1>>0)>>0);
}
c.i0=(a>>0);
var b={i0:0,a1:null,a2:null,a3:null};
b.i0=(0>>0);
b.a1=null;
b.a2=null;
b.a3=null;
var d={a0:{i0:0,i1:0,i2:0},a1:null};
d.a0.i0=(43>>0);
d.a0.i1=(434343111>>0);
d.a0.i2=(43434311>>0);
d.a1=null;
var a=(b.i0>>0);
if(((a>>0)===(0>>0))){
b.a3=d;
b.a1=d;
b.a2=d;
var a=1;
}else{
var w=(b.a2);
w.a1=d;
b.a2=d;
var a=((a>>0)+(1>>0)>>0);
}
b.i0=(a>>0);
var d={a0:{i0:0,i1:0,i2:0},a1:null};
d.a0.i0=(43>>0);
d.a0.i1=(434343222>>0);
d.a0.i2=(43434322>>0);
d.a1=null;
var a=(b.i0>>0);
if(((a>>0)===(0>>0))){
b.a3=d;
b.a1=d;
b.a2=d;
var a=1;
}else{
var w=(b.a2);
w.a1=d;
b.a2=d;
var a=((a>>0)+(1>>0)>>0);
}
b.i0=(a>>0);
bI(c,b);
I.i0=(44>>0);
I.i1=(4444442>>0);
I.i2=(444444>>0);
bj(I,4>>0);
S.i0=(45>>0);
S.i1=(4545452>>0);
S.i2=(454545>>0);
O.i0=(45>>0);
O.i1=(45454522>>0);
O.i2=(4545451>>0);
bA(S,O);
var c={i0:0,a1:null,a2:null,a3:null};
c.i0=(0>>0);
c.a1=null;
c.a2=null;
c.a3=null;
var b={a0:{i0:0,i1:0,i2:0},a1:null};
b.a0.i0=(6>>0);
b.a0.i1=(46464611>>0);
b.a0.i2=(4646461>>0);
b.a1=null;
var a=(c.i0>>0);
if(((a>>0)===(0>>0))){
c.a3=b;
c.a1=b;
c.a2=b;
var a=1;
}else{
var d=(c.a2);
d.a1=b;
c.a2=b;
var a=((a>>0)+(1>>0)>>0);
}
c.i0=(a>>0);
var b={a0:{i0:0,i1:0,i2:0},a1:null};
b.a0.i0=(6>>0);
b.a0.i1=(46464622>>0);
b.a0.i2=(4646462>>0);
b.a1=null;
var a=(c.i0>>0);
if(((a>>0)===(0>>0))){
c.a3=b;
c.a1=b;
c.a2=b;
var a=1;
}else{
var d=(c.a2);
d.a1=b;
c.a2=b;
var a=((a>>0)+(1>>0)>>0);
}
c.i0=(a>>0);
var b={i0:0,a1:null,a2:null,a3:null};
b.i0=(0>>0);
b.a1=null;
b.a2=null;
b.a3=null;
var d={a0:{i0:0,i1:0,i2:0},a1:null};
d.a0.i0=(6>>0);
d.a0.i1=(464646111>>0);
d.a0.i2=(46464611>>0);
d.a1=null;
var a=(b.i0>>0);
if(((a>>0)===(0>>0))){
b.a3=d;
b.a1=d;
b.a2=d;
var a=1;
}else{
var w=(b.a2);
w.a1=d;
b.a2=d;
var a=((a>>0)+(1>>0)>>0);
}
b.i0=(a>>0);
var d={a0:{i0:0,i1:0,i2:0},a1:null};
d.a0.i0=(6>>0);
d.a0.i1=(464646222>>0);
d.a0.i2=(46464622>>0);
d.a1=null;
var a=(b.i0>>0);
if(((a>>0)===(0>>0))){
b.a3=d;
b.a1=d;
b.a2=d;
var a=1;
}else{
var w=(b.a2);
w.a1=d;
b.a2=d;
var a=((a>>0)+(1>>0)>>0);
}
b.i0=(a>>0);
bF(c,b);
var c={i0:0,a1:null,a2:null,a3:null};
c.i0=(0>>0);
c.a1=null;
c.a2=null;
c.a3=null;
var b={a0:{i0:0,i1:0,i2:0},a1:null};
b.a0.i0=(6>>0);
b.a0.i1=(47474711>>0);
b.a0.i2=(4747471>>0);
b.a1=null;
var a=(c.i0>>0);
if(((a>>0)===(0>>0))){
c.a3=b;
c.a1=b;
c.a2=b;
var a=1;
}else{
var d=(c.a2);
d.a1=b;
c.a2=b;
var a=((a>>0)+(1>>0)>>0);
}
c.i0=(a>>0);
var b={a0:{i0:0,i1:0,i2:0},a1:null};
b.a0.i0=(6>>0);
b.a0.i1=(47474722>>0);
b.a0.i2=(4747472>>0);
b.a1=null;
var a=(c.i0>>0);
if(((a>>0)===(0>>0))){
c.a3=b;
c.a1=b;
c.a2=b;
var a=1;
}else{
var d=(c.a2);
d.a1=b;
c.a2=b;
var a=((a>>0)+(1>>0)>>0);
}
c.i0=(a>>0);
aX(c);
var c={i0:0,a1:null,a2:null,a3:null};
c.i0=(0>>0);
c.a1=null;
c.a2=null;
c.a3=null;
var b={a0:{i0:0,i1:0,i2:0},a1:null};
b.a0.i0=(6>>0);
b.a0.i1=(52525211>>0);
b.a0.i2=(5252521>>0);
b.a1=null;
var a=(c.i0>>0);
if(((a>>0)===(0>>0))){
c.a3=b;
c.a1=b;
c.a2=b;
var a=1;
}else{
var d=(c.a2);
d.a1=b;
c.a2=b;
var a=((a>>0)+(1>>0)>>0);
}
c.i0=(a>>0);
var b={a0:{i0:0,i1:0,i2:0},a1:null};
b.a0.i0=(6>>0);
b.a0.i1=(52525222>>0);
b.a0.i2=(5252522>>0);
b.a1=null;
var a=(c.i0>>0);
if(((a>>0)===(0>>0))){
c.a3=b;
c.a1=b;
c.a2=b;
var a=1;
}else{
var d=(c.a2);
d.a1=b;
c.a2=b;
var a=((a>>0)+(1>>0)>>0);
}
c.i0=(a>>0);
bl(c);
var a=0;
while(1){
var j=(+(a>>0));
var z=Math.pow(4,j);
var j=Math.pow(4,j);
var j=((535354-z)/(j*2));
var a=((a>>0)+(1>>0)>>0);
if(((j!==(+((j>>0)>>0)))&&((a>>0)<(32>>0)))){
}else{
break;
}
}
o.i0=(15>>0);
o.i1=(5555555>>0);
o.i2=(555555>>0);
ac(e,o);
var b={i0:0,a1:null,a2:null,a3:null};
b.i0=(0>>0);
b.a1=null;
b.a2=null;
b.a3=null;
var c={a0:{i0:0,i1:0,i2:0},a1:null};
c.a0.i0=(6>>0);
c.a0.i1=(56565611>>0);
c.a0.i2=(5656561>>0);
c.a1=null;
var a=(b.i0>>0);
if(((a>>0)===(0>>0))){
b.a3=c;
b.a1=c;
b.a2=c;
var a=1;
}else{
var d=(b.a2);
d.a1=c;
b.a2=c;
var a=((a>>0)+(1>>0)>>0);
}
b.i0=(a>>0);
var c={a0:{i0:0,i1:0,i2:0},a1:null};
c.a0.i0=(6>>0);
c.a0.i1=(56565622>>0);
c.a0.i2=(5656562>>0);
c.a1=null;
var a=(b.i0>>0);
do{
if(((a>>0)===(0>>0))){
b.a3=c;
b.a1=c;
b.a2=c;
b.i0=(1>>0);
label=103;
break;
}else{
var d=(b.a2);
d.a1=c;
b.a2=c;
b.i0=(((a>>0)+(1>>0)>>0)>>0);
if(((a>>0)<(0>>0))){
break;
}
var c=(b.a1);
if((c===null)){
break;
}else{
label=103;
break;
}
}
}while(0);
L313:do{
if(label===103){
var b={i0:0,a1:null,a2:null,a3:null};
b.i0=(0>>0);
b.a1=null;
b.a2=null;
b.a3=null;
while(1){
var A=(c.a0.i0>>0);
var E=(c.a0.i1>>0);
var C=(c.a0.i2>>0);
L317:do{
if(((A>>0)>(0>>0))){
var l=0;
var a=0;
while(1){
var al=(a<<1);
var l=(((((((E<<a)>>>31)<<((62-al)>>0))>>0)+(l>>0)>>0)>>0)+((((C<<a)>>>31)<<((63-al)>>0))>>0)>>0);
var a=((a>>0)+(1>>0)>>0);
if(((a>>0)<(A>>0))){
}else{
break L317;
}
}
}else{
var l=0;
}
}while(0);
var d={a0:{i0:0,i1:0},a1:null};
d.a0.i0=(A>>0);
d.a0.i1=(l>>0);
d.a1=null;
var a=(b.i0>>0);
if(((a>>0)===(0>>0))){
b.a3=d;
b.a1=d;
b.a2=d;
var a=1;
}else{
var w=(b.a2);
w.a1=d;
b.a2=d;
var a=((a>>0)+(1>>0)>>0);
}
b.i0=(a>>0);
var c=(c.a1);
if((c===null)){
break L313;
}else{
}
}
}
}while(0);
var b={i0:0,a1:null,a2:null,a3:null};
b.i0=(0>>0);
b.a1=null;
b.a2=null;
b.a3=null;
var c={i0:0,a1:null};
c.i0=(57165711>>0);
c.a1=null;
var a=(b.i0>>0);
if(((a>>0)===(0>>0))){
b.a3=c;
b.a1=c;
b.a2=c;
var a=1;
}else{
var d=(b.a2);
d.a1=c;
b.a2=c;
var a=((a>>0)+(1>>0)>>0);
}
b.i0=(a>>0);
var c={i0:0,a1:null};
c.i0=(57165722>>0);
c.a1=null;
var a=(b.i0>>0);
do{
if(((a>>0)===(0>>0))){
b.a3=c;
b.a1=c;
b.a2=c;
b.i0=(1>>0);
label=117;
break;
}else{
var d=(b.a2);
d.a1=c;
b.a2=c;
b.i0=(((a>>0)+(1>>0)>>0)>>0);
if(((a>>0)<(0>>0))){
break;
}
var c=(b.a1);
if((c===null)){
break;
}else{
label=117;
break;
}
}
}while(0);
L334:do{
if(label===117){
var b={i0:0,a1:null,a2:null,a3:null};
b.i0=(0>>0);
b.a1=null;
b.a2=null;
b.a3=null;
while(1){
var a=(c.i0>>0);
var j=(+(((a>>0)+(1>>0)>>0)>>>0));
var a=0;
while(1){
var z=(+(a>>0));
var aC=Math.pow(4,z);
var z=Math.pow(4,z);
var z=((j-aC)/(z*2));
var l=((a>>0)+(1>>0)>>0);
if((z===(+((z>>0)>>0)))){
label=121;
break;
}
if(((l>>0)<(32>>0))){
var a=l;
}else{
var a=l;
var l=0;
break;
}
}
if(label===121){
label=0;
var l=(z>>0);
}
var a=((31-a)>>0);
var d={a0:{i0:0,i1:0},a1:null};
d.a0.i0=(a>>0);
d.a0.i1=((l<<((64-(a<<1))>>0))>>0);
d.a1=null;
var a=(b.i0>>0);
if(((a>>0)===(0>>0))){
b.a3=d;
b.a1=d;
b.a2=d;
var a=1;
}else{
var w=(b.a2);
w.a1=d;
b.a2=d;
var a=((a>>0)+(1>>0)>>0);
}
b.i0=(a>>0);
var c=(c.a1);
if((c===null)){
break L334;
}else{
}
}
}
}while(0);
o.i0=(15>>0);
o.i1=(6060605>>0);
o.i2=(606060>>0);
ac(e,o);
n.i0=(16>>0);
n.d1=61616161;
n.d2=616161;
N(e,n);
var b={i0:0,a1:null,a2:null,a3:null};
b.i0=(0>>0);
b.a1=null;
b.a2=null;
b.a3=null;
var c={a0:{i0:0,i1:0},a1:null};
c.a0.i0=(6>>0);
c.a0.i1=(6262621>>0);
c.a1=null;
var a=(b.i0>>0);
if(((a>>0)===(0>>0))){
b.a3=c;
b.a1=c;
b.a2=c;
var a=1;
}else{
var d=(b.a2);
d.a1=c;
b.a2=c;
var a=((a>>0)+(1>>0)>>0);
}
b.i0=(a>>0);
var c={a0:{i0:0,i1:0},a1:null};
c.a0.i0=(6>>0);
c.a0.i1=(6262622>>0);
c.a1=null;
var a=(b.i0>>0);
do{
if(((a>>0)===(0>>0))){
b.a3=c;
b.a1=c;
b.a2=c;
b.i0=(1>>0);
label=133;
break;
}else{
var d=(b.a2);
d.a1=c;
b.a2=c;
b.i0=(((a>>0)+(1>>0)>>0)>>0);
if(((a>>0)<(0>>0))){
break;
}
var c=(b.a1);
if((c===null)){
break;
}else{
label=133;
break;
}
}
}while(0);
L357:do{
if(label===133){
var b={i0:0,a1:null,a2:null,a3:null};
b.i0=(0>>0);
b.a1=null;
b.a2=null;
b.a3=null;
while(1){
var C=(c.a0.i0>>0);
L361:do{
if(((C>>0)>(0>>0))){
var a=(c.a0.i1>>0);
var a=(a>>>((64-(C<<1))>>0));
var al=((32-C)>>0);
var E=0;
var A=0;
var l=0;
while(1){
var at=(a>>>2);
var as=((l>>0)+(al>>0)>>0);
var A=(((((a>>>1)-(at<<1))>>0)<<as)|A);
var E=(((a&1)<<as)|E);
var l=((l>>0)+(1>>0)>>0);
if(((l>>0)<(C>>0))){
var a=at;
}else{
break L361;
}
}
}else{
var E=0;
var A=0;
}
}while(0);
var d={a0:{i0:0,i1:0,i2:0},a1:null};
d.a0.i0=(C>>0);
d.a0.i1=(E>>0);
d.a0.i2=(A>>0);
d.a1=null;
var a=(b.i0>>0);
if(((a>>0)===(0>>0))){
b.a3=d;
b.a1=d;
b.a2=d;
var a=1;
}else{
var w=(b.a2);
w.a1=d;
b.a2=d;
var a=((a>>0)+(1>>0)>>0);
}
b.i0=(a>>0);
var c=(c.a1);
if((c===null)){
break L357;
}else{
}
}
}
}while(0);
var c={i0:0,a1:null,a2:null,a3:null};
c.i0=(0>>0);
c.a1=null;
c.a2=null;
c.a3=null;
var b={i0:0,a1:null};
b.i0=(63166311>>0);
b.a1=null;
var a=(c.i0>>0);
if(((a>>0)===(0>>0))){
c.a3=b;
c.a1=b;
c.a2=b;
var a=1;
}else{
var d=(c.a2);
d.a1=b;
c.a2=b;
var a=((a>>0)+(1>>0)>>0);
}
c.i0=(a>>0);
var b={i0:0,a1:null};
b.i0=(63166322>>0);
b.a1=null;
var a=(c.i0>>0);
if(((a>>0)===(0>>0))){
c.a3=b;
c.a1=b;
c.a2=b;
var a=1;
}else{
var d=(c.a2);
d.a1=b;
c.a2=b;
var a=((a>>0)+(1>>0)>>0);
}
c.i0=(a>>0);
bH(c);
e.i0=(31>>0);
e.i2=(504>>0);
e.i1=(1344>>0);
Q(ar,e);
e.i0=(15>>0);
e.i2=(0>>0);
e.i1=(0>>0);
Q(ar,e);
D.i0=(16>>0);
D.i1=(6666666>>0);
D.i2=(666666>>0);
Q(e,D);
var b={i0:0,a1:null,a2:null,a3:null};
b.i0=(0>>0);
b.a1=null;
b.a2=null;
b.a3=null;
var c={a0:{i0:0,i1:0},a1:null};
c.a0.i0=(6>>0);
c.a0.i1=(6969691>>0);
c.a1=null;
var a=(b.i0>>0);
if(((a>>0)===(0>>0))){
b.a3=c;
b.a1=c;
b.a2=c;
var a=1;
}else{
var d=(b.a2);
d.a1=c;
b.a2=c;
var a=((a>>0)+(1>>0)>>0);
}
b.i0=(a>>0);
var c={a0:{i0:0,i1:0},a1:null};
c.a0.i0=(6>>0);
c.a0.i1=(6969692>>0);
c.a1=null;
var a=(b.i0>>0);
do{
if(((a>>0)===(0>>0))){
b.a3=c;
b.a1=c;
b.a2=c;
b.i0=(1>>0);
label=155;
break;
}else{
var d=(b.a2);
d.a1=c;
b.a2=c;
b.i0=(((a>>0)+(1>>0)>>0)>>0);
if(((a>>0)<(0>>0))){
break;
}
var c=(b.a1);
if((c===null)){
break;
}
var a=(c.a0.i0>>0);
if(((a>>0)>(31>>0))){
break;
}else{
label=155;
break;
}
}
}while(0);
L388:do{
if(label===155){
var b={i0:0,a1:null,a2:null,a3:null};
b.i0=(0>>0);
b.a1=null;
b.a2=null;
b.a3=null;
while(1){
var a=(c.a0.i0>>0);
if(((a>>0)>(31>>0))){
var a=0;
}else{
var l=(c.a0.i1>>0);
var j=Math.pow(4,(+(((31-a)>>0)>>0)));
var a=(((j*(+((((l>>>((64-(a<<1))>>0))<<1)|1)>>>0)))+-1)>>0);
}
var d={i0:0,a1:null};
d.i0=(a>>0);
d.a1=null;
var a=(b.i0>>0);
if(((a>>0)===(0>>0))){
b.a3=d;
b.a1=d;
b.a2=d;
var a=1;
}else{
var w=(b.a2);
w.a1=d;
b.a2=d;
var a=((a>>0)+(1>>0)>>0);
}
b.i0=(a>>0);
var c=(c.a1);
if((c===null)){
break L388;
}else{
}
}
}
}while(0);
var c={i0:0,a1:null,a2:null,a3:null};
c.i0=(0>>0);
c.a1=null;
c.a2=null;
c.a3=null;
var b={a0:{i0:0,i1:0,i2:0},a1:null};
b.a0.i0=(6>>0);
b.a0.i1=(70707011>>0);
b.a0.i2=(7070701>>0);
b.a1=null;
var a=(c.i0>>0);
if(((a>>0)===(0>>0))){
c.a3=b;
c.a1=b;
c.a2=b;
var a=1;
}else{
var d=(c.a2);
d.a1=b;
c.a2=b;
var a=((a>>0)+(1>>0)>>0);
}
c.i0=(a>>0);
var b={a0:{i0:0,i1:0,i2:0},a1:null};
b.a0.i0=(6>>0);
b.a0.i1=(70707022>>0);
b.a0.i2=(7070702>>0);
b.a1=null;
var a=(c.i0>>0);
if(((a>>0)===(0>>0))){
c.a3=b;
c.a1=b;
c.a2=b;
var a=1;
}else{
var d=(c.a2);
d.a1=b;
c.a2=b;
var a=((a>>0)+(1>>0)>>0);
}
c.i0=(a>>0);
by(c);
M.i0=(11>>0);
M.i1=(71717171>>0);
M.i2=(717171>>0);
aD(aE,M);
e.i0=(31>>0);
e.i2=(328>>0);
e.i1=(1628>>0);
ad(aq,e);
e.i0=(13>>0);
e.i2=(0>>0);
e.i1=(0>>0);
ad(aq,e);
e.i0=(14>>0);
e.i1=(74747474>>0);
e.i2=(747474>>0);
ad(aq,e);
var c={i0:0,a1:null,a2:null,a3:null};
c.i0=(0>>0);
c.a1=null;
c.a2=null;
c.a3=null;
var b={a0:{i0:0,i1:0,i2:0},a1:null};
b.a0.i0=(6>>0);
b.a0.i1=(76767611>>0);
b.a0.i2=(7676761>>0);
b.a1=null;
var a=(c.i0>>0);
if(((a>>0)===(0>>0))){
c.a3=b;
c.a1=b;
c.a2=b;
var a=1;
}else{
var d=(c.a2);
d.a1=b;
c.a2=b;
var a=((a>>0)+(1>>0)>>0);
}
c.i0=(a>>0);
var b={a0:{i0:0,i1:0,i2:0},a1:null};
b.a0.i0=(6>>0);
b.a0.i1=(76767622>>0);
b.a0.i2=(7676762>>0);
b.a1=null;
var a=(c.i0>>0);
if(((a>>0)===(0>>0))){
c.a3=b;
c.a1=b;
c.a2=b;
var a=1;
}else{
var d=(c.a2);
d.a1=b;
c.a2=b;
var a=((a>>0)+(1>>0)>>0);
}
c.i0=(a>>0);
bb(c);
return ;
}
function bq(i){
var label=0;
var h=aSlot=[new DataView(new ArrayBuffer(8))];
h[0>>0].setFloat64(0,i,true);
var e=(h[0>>0].getInt32(1*4+0,true)>>0);
var b=(e&2147483647);
if(((b>>>0)>(1072693247>>>0))){
h[0>>0].setFloat64(0,i,true);
var e=(h[0>>0].getInt32(0,true)>>0);
if((((e|((b>>0)+(-1072693248>>0)>>0))>>0)===(0>>0))){
var a=((i*1.5707963267948966)+(i*6.123233995736766E-17));
return a;
}else{
var a=(i-i);
var a=(a/a);
return a;
}
}
do{
if(((b>>>0)<(1071644672>>>0))){
if(((b>>>0)<(1044381696>>>0))){
if(((i+1.0000000000000001E+300)>1)){
var a=i;
}else{
break;
}
return a;
}else{
var a=(i*i);
var a=((((a*((a*((a*((a*((a*((a*3.4793310759602117E-5)+7.9153499428981453E-4))+-0.040055534500679411))+0.20121253213486293))+-0.32556581862240092))+0.16666666666666666))/((a*((a*((a*((a*0.077038150555901935)+-0.68828397160545329))+2.0209457602335057))+-2.4033949117344142))+1))*i)+i);
return a;
}
}
}while(0);
var a=Math.abs(i);
var a=((1-a)*0.5);
var g=(a*((a*((a*((a*((a*((a*3.4793310759602117E-5)+7.9153499428981453E-4))+-0.040055534500679411))+0.20121253213486293))+-0.32556581862240092))+0.16666666666666666));
var f=((a*((a*((a*((a*0.077038150555901935)+-0.68828397160545329))+2.0209457602335057))+-2.4033949117344142))+1);
var c=a8(a);
if(((b>>>0)>(1072640818>>>0))){
var a=(1.5707963267948966-(((c+(c*(g/f)))*2)+-6.123233995736766E-17));
}else{
h[0>>0].setFloat64(0,c,true);
h[0>>0].setInt32(0,0,true);
var d=(h[0>>0].getFloat64(0,true));
var a=(0.78539816339744828-((((c*2)*(g/f))-(6.123233995736766E-17-(((a-(d*d))/(c+d))*2)))-(0.78539816339744828-(d*2))));
}
if(((e>>0)>(0>>0))){
return a;
}
var a=(-0-a);
return a;
}
function bp(k){
var label=0;
var j=aSlot=[new DataView(new ArrayBuffer(8))];
j[0>>0].setFloat64(0,k,true);
var d=(j[0>>0].getInt32(1*4+0,true)>>0);
do{
if(((d>>0)<(1048576>>0))){
var c=(j[0>>0].getInt32(0,true)>>0);
if((((c|(d&2147483647))>>0)===(0>>0))){
var a=-Infinity;
return a;
}
if(!(((d>>0)<(0>>0)))){
var a=(k*18014398509481984);
j[0>>0].setFloat64(0,a,true);
var d=(j[0>>0].getInt32(1*4+0,true)>>0);
var c=-1077;
break;
}
var a=((k-k)/0);
return a;
}else{
var a=k;
var c=-1023;
}
}while(0);
if(((d>>0)>(2146435071>>0))){
var a=(a+a);
return a;
}
var h=(d&1048575);
var i=(((h>>0)+(614244>>0)>>0)&1048576);
j[0>>0].setFloat64(0,a,true);
j[0>>0].setInt32(1*4+0,((i|h)^1072693248),true);
var a=(j[0>>0].getFloat64(0,true));
var c=(((((d>>20)>>0)+(c>>0)>>0)>>0)+((i>>>20)>>0)>>0);
var a=(a+-1);
if((((((d>>0)+(2>>0)>>0)&1048575)>>>0)<(3>>>0))){
if((a===0)){
if(((c>>0)===(0>>0))){
var a=0;
return a;
}
var a=(+(c>>0));
var a=((a*0.69314718036912382)+(a*1.9082149292705877E-10));
return a;
}
var e=((a*a)*(0.5-(a*0.33333333333333331)));
if(((c>>0)===(0>>0))){
var a=(a-e);
return a;
}else{
var g=(+(c>>0));
var a=((g*0.69314718036912382)-((e-(g*1.9082149292705877E-10))-a));
return a;
}
}
var e=(a/(a+2));
var g=(+(c>>0));
var f=(e*e);
var b=(f*f);
var f=((b*((b*((b*0.15313837699209373)+0.22222198432149784))+0.39999999999409419))+(f*((b*((b*((b*0.14798198605116586)+0.1818357216161805))+0.28571428743662391))+0.66666666666667351)));
if((((((h>>0)+(-398458>>0)>>0)|((440401-h)>>0))>>0)>(0>>0))){
var b=(a*(a*0.5));
if(((c>>0)===(0>>0))){
var a=(a-(b-(e*(b+f))));
return a;
}else{
var a=((g*0.69314718036912382)-((b-((g*1.9082149292705877E-10)+(e*(b+f))))-a));
return a;
}
}else{
if(((c>>0)===(0>>0))){
var a=(a-(e*(a-f)));
return a;
}else{
var a=((g*0.69314718036912382)-(((e*(a-f))-(g*1.9082149292705877E-10))-a));
return a;
}
}
}
function br(w,z){
var label=0;
var u=aSlot=[new DataView(new ArrayBuffer(8))];
u[0>>0].setFloat64(0,w,true);
var d=(u[0>>0].getInt32(1*4+0,true)>>0);
var j=(u[0>>0].getInt32(0,true)>>0);
u[0>>0].setFloat64(0,z,true);
var h=(u[0>>0].getInt32(1*4+0,true)>>0);
var n=(u[0>>0].getInt32(0,true)>>0);
var f=(d&2147483647);
var i=(h&2147483647);
if((((i|n)>>0)===(0>>0))){
var a=1;
return a;
}
do{
if(!(((f>>>0)>(2146435072>>>0)))){
if((((i>>>0)>(2146435072>>>0))||(((((f>>0)!==(2146435072>>0))||((j>>0)===(0>>0)))?1:0)^1))){
break;
}
if(!((((i>>0)!==(2146435072>>0))||((n>>0)===(0>>0))))){
break;
}
do{
if(((d>>0)<(0>>0))){
if(((i>>>0)>(1128267775>>>0))){
var c=2;
label=15;
break;
}
if(!(((i>>>0)>(1072693247>>>0)))){
var c=0;
label=15;
break;
}
var c=(i>>>20);
if(((((c>>0)+(-1023>>0)>>0)>>0)>(20>>0))){
var c=((1075-c)>>0);
var r=(n>>>c);
if(!((((r<<c)>>0)===(n>>0)))){
var c=0;
label=15;
break;
}
var c=((2-(r&1))>>0);
label=15;
break;
}
if(!(((n>>0)===(0>>0)))){
var c=0;
break;
}
var c=((1043-c)>>0);
var n=(i>>>c);
if(!((((n<<c)>>0)===(i>>0)))){
var c=0;
label=16;
break;
}
var c=((2-(n&1))>>0);
label=16;
break;
}else{
var c=0;
label=15;
}
}while(0);
do{
if(label===15){
if(((n>>0)===(0>>0))){
label=16;
break;
}else{
break;
}
}
}while(0);
do{
if(label===16){
if((i>>0)===(2146435072>>0)){
if((((((f>>0)+(-1072693248>>0)>>0)|j)>>0)===(0>>0))){
var a=1;
return a;
}
if(((f>>>0)>(1072693247>>>0))){
var a=(((h>>0)>(-1>>0))?z:0);
return a;
}
if(!(((h>>0)<(0>>0)))){
var a=0;
return a;
}
var a=(-0-z);
return a;
}else if((i>>0)===(1072693248>>0)){
if(!(((h>>0)<(0>>0)))){
var a=w;
return a;
}
var a=(1/w);
return a;
}else{
if(((h>>0)===(1073741824>>0))){
var a=(w*w);
return a;
}
if(!((((h>>0)===(1071644672>>0))&&((d>>0)>(-1>>0))))){
break;
}
var a=a8(w);
return a;
}
}
}while(0);
var a=Math.abs(w);
do{
if(((j>>0)===(0>>0))){
if(!((d>>0)===(-1048576>>0)||((d>>0)===(-1074790400>>0))||((d>>0)===(-2147483648>>0))||((d>>0)===(2146435072>>0))||((d>>0)===(1072693248>>0))||((d>>0)===(0>>0)))){
break;
}
if(((h>>0)<(0>>0))){
var a=(1/a);
}else{
}
if(!(((d>>0)<(0>>0)))){
return a;
}
if((((c|((f>>0)+(-1072693248>>0)>>0))>>0)===(0>>0))){
var a=(a-a);
var a=(a/a);
return a;
}
if(!(((c>>0)===(1>>0)))){
return a;
}
var a=(-0-a);
return a;
}
}while(0);
var n=(((d>>>31)>>0)+(-1>>0)>>0);
if((((c|n)>>0)===(0>>0))){
var a=(w-w);
var a=(a/a);
return a;
}
do{
if(((i>>>0)>(1105199104>>>0))){
if(((i>>>0)>(1139802112>>>0))){
if(((f>>>0)<(1072693248>>>0))){
var a=(((h>>0)<(0>>0))?Infinity:0);
return a;
}else{
var a=(((h>>0)>(0>>0))?Infinity:0);
return a;
}
}
if(((f>>>0)<(1072693247>>>0))){
var a=(((h>>0)<(0>>0))?Infinity:0);
return a;
}
if(!(((f>>>0)>(1072693248>>>0)))){
var a=(a+-1);
var b=(a*1.4426950216293335);
var g=((a*1.9259629911266175E-8)-(((a*a)*(0.5-(a*(0.33333333333333331-(a*0.25)))))*1.4426950408889634));
u[0>>0].setFloat64(0,(b+g),true);
u[0>>0].setInt32(0,0,true);
var a=(u[0>>0].getFloat64(0,true));
var b=(g-(a-b));
break;
}
var a=(((h>>0)>(0>>0))?Infinity:0);
return a;
}else{
if(((f>>>0)<(1048576>>>0))){
var a=(a*9007199254740992);
u[0>>0].setFloat64(0,a,true);
var f=(u[0>>0].getInt32(1*4+0,true)>>0);
var d=-1076;
}else{
var d=-1023;
}
var d=(((f>>20)>>0)+(d>>0)>>0);
var f=(f&1048575);
var j=(f|1072693248);
do{
if(((f>>>0)<(235663>>>0))){
var f=d;
var d=0;
}else{
if(((f>>>0)<(767610>>>0))){
var f=d;
var d=1;
break;
}
var f=((d>>0)+(1>>0)>>0);
var j=((j>>0)+(-1048576>>0)>>0);
var d=0;
}
}while(0);
u[0>>0].setFloat64(0,a,true);
u[0>>0].setInt32(1*4+0,j,true);
var a=(u[0>>0].getFloat64(0,true));
var b=(b0[d>>0]);
var g=(a-b);
var e=(1/(a+b));
var k=(g*e);
u[0>>0].setFloat64(0,k,true);
u[0>>0].setInt32(0,0,true);
var l=(u[0>>0].getFloat64(0,true));
u[0>>0].setFloat64(0,0,true);
u[0>>0].setInt32(1*4+0,((((j>>1)|536870912)>>0)+(((d<<18)|524288)>>0)>>0),true);
var o=(u[0>>0].getFloat64(0,true));
var a=(e*((g-(l*o))-(l*(a-(o-b)))));
var b=(k*k);
var b=(((l+k)*a)+((b*b)*((b*((b*((b*((b*((b*0.20697501780033842)+0.23066074577556175))+0.27272812380853401))+0.33333332981837743))+0.42857142857855018))+0.59999999999999465)));
var g=(l*l);
u[0>>0].setFloat64(0,((g+3)+b),true);
u[0>>0].setInt32(0,0,true);
var e=(u[0>>0].getFloat64(0,true));
var l=(l*e);
var a=((e*a)+(k*(b-((e+-3)-g))));
u[0>>0].setFloat64(0,(l+a),true);
u[0>>0].setInt32(0,0,true);
var b=(u[0>>0].getFloat64(0,true));
var g=(b*0.96179670095443726);
var e=(bZ[d>>0]);
var b=(e+((b*-7.0284616509527583E-9)+((a-(b-l))*0.96179669392597555)));
var e=(+(f>>0));
var k=(bY[d>>0]);
u[0>>0].setFloat64(0,(e+(k+(g+b))),true);
u[0>>0].setInt32(0,0,true);
var a=(u[0>>0].getFloat64(0,true));
var b=(b-(((a-e)-k)-g));
}
}while(0);
var g=((((((c>>0)+(-1>>0)>>0)|n)>>0)===(0>>0))?-1:1);
u[0>>0].setFloat64(0,z,true);
u[0>>0].setInt32(0,0,true);
var e=(u[0>>0].getFloat64(0,true));
var b=((b*z)+(a*(z-e)));
var a=(a*e);
var e=(a+b);
u[0>>0].setFloat64(0,e,true);
var c=(u[0>>0].getInt32(1*4+0,true)>>0);
var d=(u[0>>0].getInt32(0,true)>>0);
do{
if(((c>>0)>(1083179007>>0))){
if(!((((((c>>0)+(-1083179008>>0)>>0)|d)>>0)===(0>>0)))){
var a=((g*1.0000000000000001E+300)*1.0000000000000001E+300);
return a;
}
if(!(((b+8.0085662595372941E-17)>(e-a)))){
break;
}
var a=((g*1.0000000000000001E+300)*1.0000000000000001E+300);
return a;
}else{
if(!((((c&2147482624)>>>0)>(1083231231>>>0)))){
break;
}
if(!((((((c>>0)+(1064252416>>0)>>0)|d)>>0)===(0>>0)))){
var a=((g*1.0E-300)*1.0E-300);
return a;
}
if((b>(e-a))){
break;
}
var a=((g*1.0E-300)*1.0E-300);
return a;
}
}while(0);
var d=(c&2147483647);
if(((d>>>0)>(1071644672>>>0))){
var d=(((1048576>>>(((d>>>20)>>0)+(-1022>>0)>>0))>>0)+(c>>0)>>0);
var f=((d>>>20)&2047);
u[0>>0].setFloat64(0,0,true);
u[0>>0].setInt32(1*4+0,(d&((1048575>>>((f>>0)+(-1023>>0)>>0))^-1)),true);
var e=(u[0>>0].getFloat64(0,true));
var d=(((d&1048575)|1048576)>>>((1043-f)>>0));
var c=(((c>>0)<(0>>0))?((0-d)>>0):d);
var a=(a-e);
}else{
var c=0;
}
u[0>>0].setFloat64(0,(b+a),true);
u[0>>0].setInt32(0,0,true);
var e=(u[0>>0].getFloat64(0,true));
var k=(e*0.69314718246459961);
var a=((e*-1.904654299957768E-9)+((b-(e-a))*0.69314718055994529));
var b=(k+a);
var a=(a-(b-k));
var e=(b*b);
var e=(b-(e*((e*((e*((e*((e*4.1381367970572385E-8)+-1.6533902205465252E-6))+6.6137563214379344E-5))+-0.0027777777777015593))+0.16666666666666602)));
var a=(1-((((b*e)/(e+-2))-(a+(b*a)))-b));
u[0>>0].setFloat64(0,a,true);
var d=(u[0>>0].getInt32(1*4+0,true)>>0);
var d=((d>>0)+((c<<20)>>0)>>0);
if((((d>>20)>>0)<(1>>0))){
var a=aF(a,c>>0);
}else{
u[0>>0].setFloat64(0,a,true);
u[0>>0].setInt32(1*4+0,d,true);
var a=(u[0>>0].getFloat64(0,true));
}
var a=(g*a);
return a;
}
}while(0);
if((((((f>>0)+(-1072693248>>0)>>0)|j)>>0)===(0>>0))){
var a=1;
return a;
}
u[0>>0].setInt32(1*4+0,2146959360,true);
u[0>>0].setInt32(0,0,true);
var a=(u[0>>0].getFloat64(0,true));
return a;
}
function a7(k,l,m){
var label=0;
var j=aSlot=[0,0,0];
var n=aSlot=[new DataView(new ArrayBuffer(8))];
n[0>>0].setFloat64(0,k,true);
var i=(n[0>>0].getInt32(1*4+0,true)>>0);
var c=(i&2147483647);
if(((c>>>0)<(1072243196>>>0))){
l[m>>0]=k;
l[(m>>0)+(1>>0)>>0]=0;
var d=0;
return d>>0;
}
if(((c>>>0)<(1073928572>>>0))){
if(((i>>0)>(0>>0))){
var a=(k+-1.5707963267341256);
if(((c>>0)===(1073291771>>0))){
var a=(a+-6.077100506303966E-11);
var b=(a+-2.0222662487959506E-21);
l[m>>0]=b;
l[(m>>0)+(1>>0)>>0]=((a-b)+-2.0222662487959506E-21);
var d=1;
return d>>0;
}else{
var b=(a+-6.0771005065061922E-11);
l[m>>0]=b;
l[(m>>0)+(1>>0)>>0]=((a-b)+-6.0771005065061922E-11);
var d=1;
return d>>0;
}
}else{
var a=(k+1.5707963267341256);
if(((c>>0)===(1073291771>>0))){
var a=(a+6.077100506303966E-11);
var b=(a+2.0222662487959506E-21);
l[m>>0]=b;
l[(m>>0)+(1>>0)>>0]=((a-b)+2.0222662487959506E-21);
var d=-1;
return d>>0;
}else{
var b=(a+6.0771005065061922E-11);
l[m>>0]=b;
l[(m>>0)+(1>>0)>>0]=((a-b)+6.0771005065061922E-11);
var d=-1;
return d>>0;
}
}
}
if(!(((c>>>0)<(1094263292>>>0)))){
if(((c>>>0)>(2146435071>>>0))){
var a=(k-k);
l[(m>>0)+(1>>0)>>0]=a;
l[m>>0]=a;
var d=0;
return d>>0;
}
n[0>>0].setFloat64(0,k,true);
var d=(n[0>>0].getInt32(0,true)>>0);
n[0>>0].setFloat64(0,0,true);
n[0>>0].setInt32(0,d,true);
var a=(n[0>>0].getFloat64(0,true));
var g=(((c>>>20)>>0)+(-1046>>0)>>0);
n[0>>0].setFloat64(0,a,true);
n[0>>0].setInt32(1*4+0,((c-(g<<20))>>0),true);
var a=(n[0>>0].getFloat64(0,true));
var b=(+((a>>0)>>0));
j[0>>0]=b;
var a=((a-b)*16777216);
var b=(+((a>>0)>>0));
j[1>>0]=b;
j[2>>0]=((a-b)*16777216);
var d=3;
while(1){
var c=((d>>0)+(-1>>0)>>0);
var a=(j[c>>0]);
if((a===0)){
var d=c;
}else{
break;
}
}
var d=bu(j,0,l,m,g>>0,d>>0,2>>0,bW,0);
if(!(((i>>0)<(0>>0)))){
return d>>0;
}
var a=(l[m>>0]);
l[m>>0]=(-0-a);
var a=(l[(m>>0)+(1>>0)>>0]);
l[(m>>0)+(1>>0)>>0]=(-0-a);
var d=((0-d)>>0);
return d>>0;
}
var a=Math.abs(k);
var d=(((a*0.63661977236758138)+0.5)>>0);
var f=(+(d>>0));
var b=(a-(f*1.5707963267341256));
var e=(f*6.0771005065061922E-11);
do{
if(((d>>0)<(32>>0))){
var g=(bX[((d>>0)+(-1>>0)>>0)>>0]>>0);
if(((c>>0)===(g>>0))){
label=14;
break;
}
var a=(b-e);
l[m>>0]=a;
break;
}else{
label=14;
}
}while(0);
do{
if(label===14){
var c=(c>>>20);
var a=(b-e);
l[m>>0]=a;
n[0>>0].setFloat64(0,a,true);
var g=(n[0>>0].getInt32(1*4+0,true)>>0);
if(!(((((c-((g>>>20)&2047))>>0)>>0)>(16>>0)))){
break;
}
var a=(f*6.077100506303966E-11);
var h=(b-a);
var e=((f*2.0222662487959506E-21)-((b-h)-a));
var a=(h-e);
l[m>>0]=a;
n[0>>0].setFloat64(0,a,true);
var g=(n[0>>0].getInt32(1*4+0,true)>>0);
if(!(((((c-((g>>>20)&2047))>>0)>>0)>(49>>0)))){
var b=h;
break;
}
var a=(f*2.0222662487111665E-21);
var b=(h-a);
var e=((f*8.4784276603688995E-32)-((h-b)-a));
var a=(b-e);
l[m>>0]=a;
}
}while(0);
var b=((b-a)-e);
l[(m>>0)+(1>>0)>>0]=b;
if(!(((i>>0)<(0>>0)))){
return d>>0;
}
l[m>>0]=(-0-a);
l[(m>>0)+(1>>0)>>0]=(-0-b);
var d=((0-d)>>0);
return d>>0;
}
function a8(j){
var label=0;
var n=aSlot=[new DataView(new ArrayBuffer(8))];
n[0>>0].setFloat64(0,j,true);
var b=(n[0>>0].getInt32(1*4+0,true)>>0);
var a=(n[0>>0].getInt32(0,true)>>0);
if((((b&2146435072)>>0)===(2146435072>>0))){
var h=((j*j)+j);
return h;
}
do{
if(((b>>0)<(1>>0))){
if(((((b&2147483647)|a)>>0)===(0>>0))){
var h=j;
return h;
}
if(!(((b>>0)<(0>>0)))){
break;
}
var h=(j-j);
var h=(h/h);
return h;
}
}while(0);
var d=(b>>20);
if(((d>>0)===(0>>0))){
if(((b>>0)===(0>>0))){
var b=0;
while(1){
var d=(a>>>11);
var a=(a<<21);
if(((d>>0)===(0>>0))){
var b=((b>>0)+(-21>>0)>>0);
}else{
break;
}
}
var b=((b>>0)+(-20>>0)>>0);
var aB=a;
var a=d;
var d=aB;
}else{
var d=a;
var a=b;
var b=1;
}
L53:do{
if((((a&1048576)>>0)===(0>>0))){
var e=a;
var a=0;
while(1){
var e=(e<<1);
var a=((a>>0)+(1>>0)>>0);
if((((e&1048576)>>0)===(0>>0))){
}else{
break L53;
}
}
}else{
var e=a;
var a=0;
}
}while(0);
var c=((b-a)>>0);
var b=((d>>>((32-a)>>0))|e);
var a=(d<<a);
var d=c;
}else{
}
var k=((d>>0)+(-1023>>0)>>0);
var b=((b&1048575)|1048576);
if((((k&1)>>0)===(0>>0))){
}else{
var b=((b<<1)|(a>>>31));
var a=(a<<1);
}
var c=((b<<1)|(a>>>31));
var b=(a<<1);
var f=a;
var e=0;
var d=0;
var a=2097152;
while(1){
var g=((e>>0)+(a>>0)>>0);
if(((c>>0)<(g>>0))){
}else{
var e=((g>>0)+(a>>0)>>0);
var c=((c-g)>>0);
var d=((d>>0)+(a>>0)>>0);
}
var c=((c<<1)|((f>>>30)&1));
var a=(a>>>1);
var f=(b<<1);
if(((a>>0)===(0>>0))){
var g=0;
var a=0;
var b=-2147483648;
break;
}else{
var aB=b;
var b=f;
var f=aB;
}
}
while(1){
var i=((g>>0)+(b>>0)>>0);
do{
if(((c>>0)>(e>>0))){
label=21;
}else{
if((((c>>0)!==(e>>0))||((f>>>0)<(i>>>0)))){
break;
}else{
label=21;
break;
}
}
}while(0);
if(label===21){
label=0;
var g=((i>>0)+(b>>0)>>0);
var m=(((((((i>>0)<(0>>0))&&((g>>0)>(-1>>0)))?1:0)?1:0)>>0)+(e>>0)>>0);
var c=((((c-e)>>0)>>0)+((((((f>>>0)<(i>>>0))?1:0)<<31)>>31)>>0)>>0);
var f=((f-i)>>0);
var a=((a>>0)+(b>>0)>>0);
var e=m;
}
var c=((c<<1)|(f>>>31));
var f=(f<<1);
var b=(b>>>1);
if(((b>>0)===(0>>0))){
break;
}else{
}
}
var b=(k>>>1);
do{
if((((c|f)>>0)===(0>>0))){
}else{
if(((a>>0)===(-1>>0))){
var d=((d>>0)+(1>>0)>>0);
var a=0;
break;
}else{
var a=(((a&1)>>0)+(a>>0)>>0);
break;
}
}
}while(0);
n[0>>0].setInt32(1*4+0,(((((b<<20)>>0)+(1071644672>>0)>>0)>>0)+((d>>1)>>0)>>0),true);
n[0>>0].setInt32(0,((d<<31)|(a>>>1)),true);
var h=(n[0>>0].getFloat64(0,true));
return h;
}
function aP(e,d){
var label=0;
var g=aSlot=[new DataView(new ArrayBuffer(8))];
g[0>>0].setFloat64(0,e,true);
var c=(g[0>>0].getInt32(1*4+0,true)>>0);
var c=(c&2147483647);
if((((c>>>0)<(1044381696>>>0))&&(((e>>0)>>0)===(0>>0)))){
var b=1;
return b;
}
var a=(e*e);
var f=(a*((a*((a*((a*((a*((a*-1.1359647557788195E-11)+2.0875723212981748E-9))+-2.7557314351390663E-7))+2.4801587289476729E-5))+-0.001388888888887411))+0.041666666666666602));
if(((c>>>0)<(1070805811>>>0))){
var b=(1-((a*0.5)-((a*f)-(e*d))));
return b;
}
if(((c>>>0)>(1072234496>>>0))){
var b=0.28125;
}else{
g[0>>0].setInt32(1*4+0,((c>>0)+(-2097152>>0)>>0),true);
g[0>>0].setInt32(0,0,true);
var b=(g[0>>0].getFloat64(0,true));
}
var b=((1-b)-(((a*0.5)-b)-((a*f)-(e*d))));
return b;
}
function bu(I,J,E,F,M,D,C,A,B){
var label=0;
var f=aSlot=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
var i=aSlot=new Int32Array(20);
var n=(b1[C>>0]>>0);
var m=((D>>0)+(-1>>0)>>0);
var b=((M>>0)+(-3>>0)>>0);
var r=(((b>>0)<(-23>>0))?0:(((b>>0)/(24>>0))>>0));
var g=(((mathimul(r,24)>>0)>>0)+(24>>0)>>0);
var j=((M-g)>>0);
var c=((n>>0)+(m>>0)>>0);
L78:do{
if(!(((c>>0)<(0>>0)))){
var b=((r-m)>>0);
var d=0;
while(1){
if(((b>>0)<(0>>0))){
var a=0;
}else{
var e=(A[(B>>0)+(b>>0)>>0]>>0);
var a=(+(e>>0));
}
f[(0>>0)+(d>>0)>>0]=a;
var e=((d>>0)+(1>>0)>>0);
var b=((b>>0)+(1>>0)>>0);
if(((d>>0)<(c>>0))){
var d=e;
}else{
break L78;
}
}
}
}while(0);
var b=0;
while(1){
L88:do{
if(((D>>0)<(1>>0))){
var a=0;
}else{
var c=((b>>0)+(m>>0)>>0);
var d=0;
var a=0;
while(1){
var h=(I[(J>>0)+(d>>0)>>0]);
var k=(f[(0>>0)+(((c-d)>>0)>>0)>>0]);
var a=(a+(h*k));
if(((d>>0)<(m>>0))){
var d=((d>>0)+(1>>0)>>0);
}else{
break L88;
}
}
}
}while(0);
f[(40>>0)+(b>>0)>>0]=a;
var d=((b>>0)+(1>>0)>>0);
if(((b>>0)<(n>>0))){
var b=d;
}else{
break;
}
}
var u=((24-j)>>0);
var z=((23-j)>>0);
var w=((g>>0)===(M>>0))?1:0;
var b=n;
L94:while(1){
var a=(f[(40>>0)+(b>>0)>>0]);
L96:do{
if(((b>>0)>(0>>0))){
var d=b;
var g=0;
while(1){
var h=(+(((a*5.9604644775390625E-8)>>0)>>0));
i[g>>0]=(((a-(h*16777216))>>0)>>0);
var d=((d>>0)+(-1>>0)>>0);
var a=(f[(40>>0)+(d>>0)>>0]);
var a=(h+a);
if(((d>>0)>(0>>0))){
var g=((g>>0)+(1>>0)>>0);
}else{
break L96;
}
}
}else{
}
}while(0);
var a=aF(a,j>>0);
var h=Math.floor((a*0.125));
var a=(a-(h*8));
var d=(a>>0);
var a=(a-(+(d>>0)));
do{
if(((j>>0)>(0>>0))){
var g=(i[((b>>0)+(-1>>0)>>0)>>0]>>0);
var c=(g>>u);
var d=((c>>0)+(d>>0)>>0);
var g=((g-(c<<u))>>0);
i[((b>>0)+(-1>>0)>>0)>>0]=(g>>0);
var g=(g>>z);
label=18;
break;
}else{
if((w>>0)){
var g=(i[((b>>0)+(-1>>0)>>0)>>0]>>0);
var g=(g>>23);
label=18;
break;
}else{
if((a<0.5)){
var g=0;
break;
}else{
var g=2;
label=19;
break;
}
}
}
}while(0);
do{
if(label===18){
label=0;
if(((g>>0)>(0>>0))){
label=19;
break;
}else{
break;
}
}
}while(0);
do{
if(label===19){
label=0;
var e=((d>>0)+(1>>0)>>0);
L110:do{
if(((b>>0)>(0>>0))){
var c=0;
var d=0;
while(1){
var o=(i[d>>0]>>0);
do{
if(((c>>0)===(0>>0))){
if(((o>>0)===(0>>0))){
var c=0;
break;
}
i[d>>0]=(((16777216-o)>>0)>>0);
var c=1;
}else{
i[d>>0]=(((16777215-o)>>0)>>0);
}
}while(0);
var d=((d>>0)+(1>>0)>>0);
if(((d>>0)<(b>>0))){
}else{
break L110;
}
}
}else{
var c=0;
}
}while(0);
do{
if(((j>>0)>(0>>0))){
if((j>>0)===(1>>0)){
var d=(i[((b>>0)+(-1>>0)>>0)>>0]>>0);
i[((b>>0)+(-1>>0)>>0)>>0]=((d&8388607)>>0);
break;
}else if((j>>0)===(2>>0)){
var d=(i[((b>>0)+(-1>>0)>>0)>>0]>>0);
i[((b>>0)+(-1>>0)>>0)>>0]=((d&4194303)>>0);
break;
}else{
break;
}
}
}while(0);
if(!(((g>>0)===(2>>0)))){
var d=e;
break;
}
var a=(1-a);
if(((c>>0)===(0>>0))){
var d=e;
var g=2;
break;
}
var h=aF(1,j>>0);
var a=(a-h);
var d=e;
var g=2;
}
}while(0);
if(!((a===0))){
label=42;
break;
}
do{
if(((b>>0)>(n>>0))){
var c=b;
var e=0;
while(1){
var c=((c>>0)+(-1>>0)>>0);
var o=(i[c>>0]>>0);
var e=(o|e);
if(((c>>0)>(n>>0))){
}else{
break;
}
}
if(((e>>0)===(0>>0))){
var d=1;
break;
}else{
var c=j;
label=41;
break L94;
}
}else{
var d=1;
}
}while(0);
while(1){
var g=(i[((n-d)>>0)>>0]>>0);
if(((g>>0)===(0>>0))){
var d=((d>>0)+(1>>0)>>0);
}else{
break;
}
}
var g=((d>>0)+(b>>0)>>0);
if(((d>>0)>(0>>0))){
}else{
var b=g;
continue;
}
while(1){
var d=((b>>0)+(1>>0)>>0);
var c=(A[(B>>0)+(((d>>0)+(r>>0)>>0)>>0)>>0]>>0);
var e=((b>>0)+(D>>0)>>0);
f[(0>>0)+(e>>0)>>0]=(+(c>>0));
L138:do{
if(((D>>0)<(1>>0))){
var a=0;
}else{
var b=0;
var a=0;
while(1){
var h=(I[(J>>0)+(b>>0)>>0]);
var k=(f[(0>>0)+(((e-b)>>0)>>0)>>0]);
var a=(a+(h*k));
if(((b>>0)<(m>>0))){
var b=((b>>0)+(1>>0)>>0);
}else{
break L138;
}
}
}
}while(0);
f[(40>>0)+(d>>0)>>0]=a;
if(((d>>0)<(g>>0))){
var b=d;
}else{
var b=g;
continue L94;
}
}
}
L142:do{
if(label===41){
while(1){
label=0;
var b=((b>>0)+(-1>>0)>>0);
var c=((c>>0)+(-24>>0)>>0);
var e=(i[b>>0]>>0);
if(((e>>0)===(0>>0))){
label=41;
}else{
break L142;
}
}
}
else if(label===42){
var a=aF(a,((0-j)>>0)>>0);
if((a<16777216)){
i[b>>0]=((a>>0)>>0);
var c=j;
break;
}else{
var e=((a*5.9604644775390625E-8)>>0);
i[b>>0]=(((a-((+(e>>0))*16777216))>>0)>>0);
var b=((b>>0)+(1>>0)>>0);
var c=((j>>0)+(24>>0)>>0);
i[b>>0]=(e>>0);
break;
}
}
}while(0);
L150:do{
if(((b>>0)>(-1>>0))){
var a=aF(1,c>>0);
var c=b;
while(1){
var e=(i[c>>0]>>0);
f[(40>>0)+(c>>0)>>0]=(a*(+(e>>0)));
if(((c>>0)>(0>>0))){
var a=(a*5.9604644775390625E-8);
var c=((c>>0)+(-1>>0)>>0);
}else{
var c=b;
break;
}
}
while(1){
var m=((b-c)>>0);
var a=0;
var e=0;
while(1){
var h=(b2[e>>0]);
var k=(f[(40>>0)+(((e>>0)+(c>>0)>>0)>>0)>>0]);
var a=(a+(h*k));
if((((e>>0)>=(n>>0))||((e>>0)>=(m>>0)))){
break;
}else{
var e=((e>>0)+(1>>0)>>0);
}
}
f[(20>>0)+(m>>0)>>0]=a;
var e=((c>>0)+(-1>>0)>>0);
if(((c>>0)>(0>>0))){
var c=e;
}else{
break L150;
}
}
}
}while(0);
do{
if((C>>0)===(3>>0)){
L162:do{
if(((b>>0)>(0>>0))){
var a=(f[(20>>0)+(b>>0)>>0]);
var c=b;
while(1){
var e=((c>>0)+(-1>>0)>>0);
var h=(f[(20>>0)+(e>>0)>>0]);
var k=(a+h);
f[(20>>0)+(c>>0)>>0]=(a+(h-k));
f[(20>>0)+(e>>0)>>0]=k;
if(((e>>0)>(0>>0))){
var c=e;
var a=k;
}else{
break;
}
}
if(!(((b>>0)>(1>>0)))){
var a=0;
break;
}
var a=(f[(20>>0)+(b>>0)>>0]);
var c=b;
while(1){
var e=((c>>0)+(-1>>0)>>0);
var h=(f[(20>>0)+(e>>0)>>0]);
var k=(a+h);
f[(20>>0)+(c>>0)>>0]=(a+(h-k));
f[(20>>0)+(e>>0)>>0]=k;
if(((e>>0)>(1>>0))){
var c=e;
var a=k;
}else{
var a=0;
break;
}
}
while(1){
var h=(f[(20>>0)+(b>>0)>>0]);
var a=(a+h);
var b=((b>>0)+(-1>>0)>>0);
if(((b>>0)>(1>>0))){
}else{
break L162;
}
}
}else{
var a=0;
}
}while(0);
var h=(f[20>>0]);
if(((g>>0)===(0>>0))){
E[F>>0]=h;
var h=(f[(20>>0)+(1>>0)>>0]);
E[(F>>0)+(1>>0)>>0]=h;
E[(F>>0)+(2>>0)>>0]=a;
break;
}else{
E[F>>0]=(-0-h);
var h=(f[(20>>0)+(1>>0)>>0]);
E[(F>>0)+(1>>0)>>0]=(-0-h);
E[(F>>0)+(2>>0)>>0]=(-0-a);
break;
}
}else if((C>>0)===(1>>0)||((C>>0)===(2>>0))){
L177:do{
if(((b>>0)>(-1>>0))){
var c=b;
var a=0;
while(1){
var h=(f[(20>>0)+(c>>0)>>0]);
var a=(a+h);
if(((c>>0)>(0>>0))){
var c=((c>>0)+(-1>>0)>>0);
}else{
break L177;
}
}
}else{
var a=0;
}
}while(0);
if(((g>>0)===(0>>0))){
var h=a;
}else{
var h=(-0-a);
}
E[F>>0]=h;
var h=(f[20>>0]);
var a=(h-a);
L184:do{
if(((b>>0)<(1>>0))){
}else{
var c=1;
while(1){
var h=(f[(20>>0)+(c>>0)>>0]);
var a=(a+h);
if(((c>>0)<(b>>0))){
var c=((c>>0)+(1>>0)>>0);
}else{
break L184;
}
}
}
}while(0);
if(((g>>0)===(0>>0))){
}else{
var a=(-0-a);
}
E[(F>>0)+(1>>0)>>0]=a;
}else if((C>>0)===(0>>0)){
L192:do{
if(((b>>0)>(-1>>0))){
var a=0;
while(1){
var h=(f[(20>>0)+(b>>0)>>0]);
var a=(a+h);
if(((b>>0)>(0>>0))){
var b=((b>>0)+(-1>>0)>>0);
}else{
break L192;
}
}
}else{
var a=0;
}
}while(0);
if(((g>>0)===(0>>0))){
}else{
var a=(-0-a);
}
E[F>>0]=a;
}
}while(0);
return (d&7)>>0;
}
function aO(b,c,d){
var label=0;
var h=aSlot=[new DataView(new ArrayBuffer(8))];
h[0>>0].setFloat64(0,b,true);
var g=(h[0>>0].getInt32(1*4+0,true)>>0);
if(((((g&2143289344)>>>0)<(1044381696>>>0))&&(((b>>0)>>0)===(0>>0)))){
var a=b;
return a;
}
var a=(b*b);
var e=(a*b);
var f=((a*((a*((a*((a*1.5896909952115501E-10)+-2.5050760253406863E-8))+2.7557313707070068E-6))+-1.9841269829857949E-4))+0.0083333333333224895);
if(((d>>0)===(0>>0))){
var a=((e*((a*f)+-0.16666666666666632))+b);
return a;
}else{
var a=(b-(((a*((c*0.5)-(e*f)))-c)-(e*-0.16666666666666632)));
return a;
}
}
function bh(j,i,h){
var label=0;
var k=aSlot=[new DataView(new ArrayBuffer(8))];
k[0>>0].setFloat64(0,j,true);
var f=(k[0>>0].getInt32(1*4+0,true)>>0);
var g=(f&2147483647);
if((((g>>>0)<(1043333120>>>0))&&(((j>>0)>>0)===(0>>0)))){
k[0>>0].setFloat64(0,j,true);
var f=(k[0>>0].getInt32(0,true)>>0);
if(((((g|((h>>0)+(1>>0)>>0))|f)>>0)===(0>>0))){
var a=Math.abs(j);
var a=(1/a);
return a;
}
if(((h>>0)===(1>>0))){
var a=j;
return a;
}
var a=(-1/j);
return a;
}
if(((g>>>0)>(1072010279>>>0))){
if(((f>>0)<(0>>0))){
var c=(-0-j);
var a=(-0-i);
}else{
var c=j;
var a=i;
}
var c=((3.061616997868383E-17-a)+(0.78539816339744828-c));
var a=0;
}else{
var c=j;
var a=i;
}
var d=(c*c);
var b=(d*d);
var e=(c*d);
var d=((e*0.33333333333333409)+(a+(d*(a+(e*(((b*((b*((b*((b*((b*-1.8558637485527546E-5)+7.8179444293955709E-5))+5.880412408202641E-4))+0.0035920791075913124))+0.021869488294859542))+0.13333333333320124)+(d*((b*((b*((b*((b*((b*2.5907305186363371E-5)+7.1407249138260819E-5))+2.4646313481846991E-4))+0.0014562094543252903))+0.0088632398235993))+0.053968253976226052))))))));
var a=(c+d);
if(((g>>>0)>(1072010279>>>0))){
var b=(+(h>>0));
var a=((+(((1-((f>>>30)&2))>>0)>>0))*(b-((c-(((a*a)/(b+a))-d))*2)));
return a;
}
if(((h>>0)===(1>>0))){
return a;
}
k[0>>0].setFloat64(0,a,true);
k[0>>0].setInt32(0,0,true);
var b=(k[0>>0].getFloat64(0,true));
var a=(-1/a);
k[0>>0].setFloat64(0,a,true);
k[0>>0].setInt32(0,0,true);
var e=(k[0>>0].getFloat64(0,true));
var a=(e+(a*((e*(d-(b-c)))+((b*e)+1))));
return a;
}
function a9(a,b){
var e=aSlot=[new DataView(new ArrayBuffer(8))];
e[0>>0].setFloat64(0,a,true);
var d=(e[0>>0].getInt32(1*4+0,true)>>0);
e[0>>0].setFloat64(0,b,true);
var c=(e[0>>0].getInt32(1*4+0,true)>>0);
e[0>>0].setFloat64(0,a,true);
e[0>>0].setInt32(1*4+0,((c&-2147483648)|(d&2147483647)),true);
return (e[0>>0].getFloat64(0,true));
}
function aH(b){
var label=0;
var c=aSlot=[0,0];
var f=aSlot=[new DataView(new ArrayBuffer(8))];
f[0>>0].setFloat64(0,b,true);
var e=(f[0>>0].getInt32(1*4+0,true)>>0);
var e=(e&2147483647);
if(((e>>>0)<(1072243196>>>0))){
var a=aP(b,0);
return a;
}
if(((e>>>0)>(2146435071>>>0))){
var a=(b-b);
return a;
}
var e=a7(b,c,0);
if(((e&3)>>0)===(0>>0)){
var a=(c[0>>0]);
var d=(c[1>>0]);
var a=aP(a,d);
return a;
}else if(((e&3)>>0)===(1>>0)){
var a=(c[0>>0]);
var d=(c[1>>0]);
var a=aO(a,d,1>>0);
var a=(-0-a);
return a;
}else if(((e&3)>>0)===(2>>0)){
var a=(c[0>>0]);
var d=(c[1>>0]);
var a=aP(a,d);
var a=(-0-a);
return a;
}else{
var a=(c[0>>0]);
var d=(c[1>>0]);
var a=aO(a,d,1>>0);
return a;
}
}
function ab(a){
var c=aSlot=[new DataView(new ArrayBuffer(8))];
c[0>>0].setFloat64(0,a,true);
var b=(c[0>>0].getInt32(1*4+0,true)>>0);
c[0>>0].setFloat64(0,a,true);
c[0>>0].setInt32(1*4+0,(b&2147483647),true);
return (c[0>>0].getFloat64(0,true));
}
function bv(h){
var label=0;
var g=aSlot=[new DataView(new ArrayBuffer(8))];
g[0>>0].setFloat64(0,h,true);
var a=(g[0>>0].getInt32(1*4+0,true)>>0);
var b=(g[0>>0].getInt32(0,true)>>0);
var c=((a>>>20)&2047);
var d=((c>>0)+(-1023>>0)>>0);
do{
if(((d>>0)<(20>>0))){
if(((d>>0)<(0>>0))){
if(!(((h+1.0000000000000001E+300)>0))){
break;
}
if(((a>>0)>(-1>>0))){
var b=0;
var a=0;
break;
}
var c=(((((a&2147483647)|b)>>0)===(0>>0))?a:-1074790400);
var b=(((((a&2147483647)|b)>>0)===(0>>0))?b:0);
var a=c;
break;
}
var c=(1048575>>>d);
if(((((c&a)|b)>>0)===(0>>0))){
var e=h;
return e;
}
if(!(((h+1.0000000000000001E+300)>0))){
break;
}
if(((a>>0)<(0>>0))){
var a=(((1048576>>>d)>>0)+(a>>0)>>0);
}else{
}
var a=(a&(c^-1));
var b=0;
}else{
if(((d>>0)>(51>>0))){
if(!(((d>>0)===(1024>>0)))){
var e=h;
return e;
}
var e=(h+h);
return e;
}
var f=(-1>>>((c>>0)+(-1043>>0)>>0));
if((((f&b)>>0)===(0>>0))){
var e=h;
return e;
}
if(!(((h+1.0000000000000001E+300)>0))){
break;
}
do{
if(((a>>0)<(0>>0))){
if(((d>>0)===(20>>0))){
var a=((a>>0)+(1>>0)>>0);
break;
}else{
var c=(((1<<((1075-c)>>0))>>0)+(b>>0)>>0);
var a=((((((c>>>0)<(b>>>0))?1:0)?1:0)>>0)+(a>>0)>>0);
var b=c;
break;
}
}else{
}
}while(0);
var b=(b&(f^-1));
}
}while(0);
g[0>>0].setInt32(1*4+0,a,true);
g[0>>0].setInt32(0,b,true);
var e=(g[0>>0].getFloat64(0,true));
return e;
}
function aG(b){
var label=0;
var d=aSlot=[new DataView(new ArrayBuffer(8))];
d[0>>0].setFloat64(0,b,true);
var a=(d[0>>0].getInt32(1*4+0,true)>>0);
var c=(d[0>>0].getInt32(0,true)>>0);
if(((((c|a)>>0)===(0>>0))||(((a>>0)===(-2147483648>>0))&&((c>>0)===(0>>0))))){
var a=2;
return a>>0;
}
if((((((a>>0)+(-1048576>>0)>>0)>>>0)<(2145386496>>>0))||((((a>>0)+(2146435072>>0)>>0)>>>0)<(2145386496>>>0)))){
var a=4;
return a>>0;
}
if(((a>>>0)<(1048576>>>0))){
var a=3;
return a>>0;
}
if((((a>>0)<(0>>0))&&((a>>>0)<(-2146435072>>>0)))){
var a=3;
return a>>0;
}else{
return ((((((a&2147483647)>>0)===(2146435072>>0))&&((c>>0)===(0>>0)))?1:0)?1:0)>>0;
}
}
function P(b,a){
var label=0;
var e=aSlot=[new DataView(new ArrayBuffer(8))];
e[0>>0].setFloat64(0,b,true);
var d=(e[0>>0].getInt32(1*4+0,true)>>0);
if(((((((d&2147483647)>>0)+(-2146435072>>0)>>0)>>0)>(-1>>0))||(b===0))){
var c=b;
return c;
}
var c=aF(b,a>>0);
e[0>>0].setFloat64(0,c,true);
var d=(e[0>>0].getInt32(1*4+0,true)>>0);
if(!(((((((d&2147483647)>>0)+(-2146435072>>0)>>0)>>0)>(-1>>0))||(c===0)))){
return c;
}
var e=(ax);
e.i0=(34>>0);
return c;
}
function bg(i){
var label=0;
var f=aSlot=0;
var j=aSlot=[new DataView(new ArrayBuffer(8))];
j[0>>0].setFloat64(0,i,true);
var a=(j[0>>0].getInt32(1*4+0,true)>>0);
var b=(j[0>>0].getInt32(0,true)>>0);
var h=(a>>>31);
var e=((a>>>20)&2047);
var c=((e>>0)+(-1023>>0)>>0);
do{
if(((c>>0)<(20>>0))){
if(((c>>0)<(0>>0))){
if(((((a&2147483647)|b)>>0)===(0>>0))){
var d=i;
return d;
}
j[0>>0].setFloat64(0,i,true);
j[0>>0].setInt32(1*4+0,((((b|((0-(b|(a&1048575)))>>0))>>>12)&524288)|(a&-131072)),true);
var d=(j[0>>0].getFloat64(0,true));
var g=(bm[h>>0]);
f=(d+g);
var d=(f);
var g=(bm[h>>0]);
var d=(d-g);
j[0>>0].setFloat64(0,d,true);
var a=(j[0>>0].getInt32(1*4+0,true)>>0);
j[0>>0].setFloat64(0,d,true);
j[0>>0].setInt32(1*4+0,((a&2147483647)|(h<<31)),true);
var d=(j[0>>0].getFloat64(0,true));
return d;
}else{
var e=(1048575>>>c);
if(((((e&a)|b)>>0)===(0>>0))){
var d=i;
return d;
}
var e=(e>>>1);
if(((((e&a)|b)>>0)===(0>>0))){
break;
}
var b=(((c>>0)===(19>>0))?-2147483648:0);
var a=((a&(e^-1))|(262144>>>c));
break;
}
}else{
if(((c>>0)>(51>>0))){
if(!(((c>>0)===(1024>>0)))){
var d=i;
return d;
}
var d=(i+i);
return d;
}else{
var e=((e>>0)+(-1043>>0)>>0);
var c=(-1>>>e);
if((((c&b)>>0)===(0>>0))){
var d=i;
return d;
}
var c=(c>>>1);
if((((c&b)>>0)===(0>>0))){
break;
}
var b=((b&(c^-1))|(1073741824>>>e));
break;
}
}
}while(0);
j[0>>0].setInt32(1*4+0,a,true);
j[0>>0].setInt32(0,b,true);
var d=(j[0>>0].getFloat64(0,true));
var g=(bm[h>>0]);
f=(d+g);
var d=(f);
var g=(bm[h>>0]);
var d=(d-g);
return d;
}
function aF(e,d){
var label=0;
var f=aSlot=[new DataView(new ArrayBuffer(8))];
f[0>>0].setFloat64(0,e,true);
var c=(f[0>>0].getInt32(1*4+0,true)>>0);
var b=((c>>>20)&2047);
do{
if(((b>>0)===(0>>0))){
var b=(f[0>>0].getInt32(0,true)>>0);
if((((b|(c&2147483647))>>0)===(0>>0))){
var a=e;
return a;
}
var a=(e*18014398509481984);
f[0>>0].setFloat64(0,a,true);
var c=(f[0>>0].getInt32(1*4+0,true)>>0);
var b=((((c>>>20)&2047)>>0)+(-54>>0)>>0);
if(!(((d>>0)<(-50000>>0)))){
break;
}
var a=(a*1.0E-300);
return a;
}else{
var a=e;
}
}while(0);
if(((b>>0)===(2047>>0))){
var a=(a+a);
return a;
}
var b=((b>>0)+(d>>0)>>0);
if(((b>>0)>(2046>>0))){
var a=a9(1.0000000000000001E+300,a);
var a=(a*1.0000000000000001E+300);
return a;
}
if(((b>>0)>(0>>0))){
f[0>>0].setFloat64(0,a,true);
f[0>>0].setInt32(1*4+0,((c&-2146435073)|(b<<20)),true);
var a=(f[0>>0].getFloat64(0,true));
return a;
}
if(!(((b>>0)<(-53>>0)))){
f[0>>0].setFloat64(0,a,true);
f[0>>0].setInt32(1*4+0,((((b<<20)>>0)+(56623104>>0)>>0)|(c&-2146435073)),true);
var a=(f[0>>0].getFloat64(0,true));
var a=(a*5.5511151231257827E-17);
return a;
}
if(((d>>0)>(50000>>0))){
var a=a9(1.0000000000000001E+300,a);
var a=(a*1.0000000000000001E+300);
return a;
}else{
var a=a9(1.0E-300,a);
var a=(a*1.0E-300);
return a;
}
}
function X(a){
var label=0;
var c=aSlot=[0,0];
var f=aSlot=[new DataView(new ArrayBuffer(8))];
f[0>>0].setFloat64(0,a,true);
var d=(f[0>>0].getInt32(1*4+0,true)>>0);
var d=(d&2147483647);
if(((d>>>0)<(1072243196>>>0))){
var b=aO(a,0,0>>0);
return b;
}
if(((d>>>0)>(2146435071>>>0))){
var b=(a-a);
return b;
}
var d=a7(a,c,0);
if(((d&3)>>0)===(0>>0)){
var b=(c[0>>0]);
var e=(c[1>>0]);
var b=aO(b,e,1>>0);
return b;
}else if(((d&3)>>0)===(1>>0)){
var b=(c[0>>0]);
var e=(c[1>>0]);
var b=aP(b,e);
return b;
}else if(((d&3)>>0)===(2>>0)){
var b=(c[0>>0]);
var e=(c[1>>0]);
var b=aO(b,e,1>>0);
var b=(-0-b);
return b;
}else{
var b=(c[0>>0]);
var e=(c[1>>0]);
var b=aP(b,e);
var b=(-0-b);
return b;
}
}
function bt(f){
var label=0;
var c=aSlot=[0,0];
var e=aSlot=[new DataView(new ArrayBuffer(8))];
e[0>>0].setFloat64(0,f,true);
var b=(e[0>>0].getInt32(1*4+0,true)>>0);
var b=(b&2147483647);
if(((b>>>0)<(1072243196>>>0))){
var a=bh(f,0,1>>0);
return a;
}
if(((b>>>0)>(2146435071>>>0))){
var a=(f-f);
return a;
}else{
var b=a7(f,c,0);
var a=(c[0>>0]);
var d=(c[1>>0]);
var a=bh(a,d,((1-((b<<1)&2))>>0)>>0);
return a;
}
}
function bs(e){
var label=0;
var c=aSlot=[new DataView(new ArrayBuffer(8))];
var a=bq(e);
var b=(a1>>0);
if(((b>>0)===(-1>>0))){
return a;
}
var b=aG(e);
if(((b>>0)===(0>>0))){
return a;
}
var d=Math.abs(e);
if(!((d>1))){
return a;
}
c[0>>0].setInt32(1*4+0,2146959360,true);
c[0>>0].setInt32(0,0,true);
var a=(c[0>>0].getFloat64(0,true));
var c=(ax);
c.i0=(33>>0);
return a;
}
function aU(b){
var label=0;
var e=aSlot=[new DataView(new ArrayBuffer(8))];
var a=bp(b);
var c=(a1>>0);
if(((c>>0)===(-1>>0))){
return a;
}
var f=aG(b);
if((((f>>0)===(0>>0))||(b>0))){
return a;
}
var d=(ax);
if((b===0)){
var a=(((c>>0)===(0>>0))?-3.4028234663852886E+38:-Infinity);
d.i0=(34>>0);
return a;
}else{
d.i0=(33>>0);
e[0>>0].setInt32(1*4+0,2146959360,true);
e[0>>0].setInt32(0,0,true);
var a=(e[0>>0].getFloat64(0,true));
return a;
}
}
function am(c,b){
var label=0;
var e=aSlot=[new DataView(new ArrayBuffer(8))];
var a=br(c,b);
var d=(a1>>0);
if(((d>>0)===(-1>>0))){
return a;
}
var f=aG(b);
if(((f>>0)===(0>>0))){
return a;
}
var f=aG(c);
if(((f>>0)===(0>>0))){
if(!((b===0))){
return a;
}
if((d>>0)===(-1>>0)||((d>>0)===(2>>0))){
var a=1;
return a;
}
var e=(ax);
e.i0=(33>>0);
var a=1;
return a;
}
if((c===0)){
if((b===0)){
if(!(((d>>0)===(0>>0)))){
var a=1;
return a;
}
var e=(ax);
e.i0=(33>>0);
var a=0;
return a;
}else{
e[0>>0].setFloat64(0,b,true);
var f=(e[0>>0].getInt32(1*4+0,true)>>0);
if(!(((((((f&2147483647)>>0)+(-2146435072>>0)>>0)>>0)<(0>>0))&&(b<0)))){
return a;
}
var a=(((d>>0)===(0>>0))?0:-Infinity);
var e=(ax);
e.i0=(33>>0);
return a;
}
}
e[0>>0].setFloat64(0,a,true);
var f=(e[0>>0].getInt32(1*4+0,true)>>0);
do{
if((((((f&2147483647)>>0)+(-2146435072>>0)>>0)>>0)>(-1>>0))){
e[0>>0].setFloat64(0,c,true);
var f=(e[0>>0].getInt32(1*4+0,true)>>0);
if((((((f&2147483647)>>0)+(-2146435072>>0)>>0)>>0)>(-1>>0))){
break;
}
e[0>>0].setFloat64(0,b,true);
var f=(e[0>>0].getInt32(1*4+0,true)>>0);
if((((((f&2147483647)>>0)+(-2146435072>>0)>>0)>>0)>(-1>>0))){
break;
}
var f=aG(a);
if(((f>>0)===(0>>0))){
var a=(((d>>0)===(0>>0))?0:NaN);
var e=(ax);
e.i0=(33>>0);
return a;
}
var a=(b*0.5);
do{
if(((d>>0)===(0>>0))){
if(!((c<0))){
var a=3.4028234663852886E+38;
break;
}
var g=bg(a);
if(!((g!==a))){
var a=3.4028234663852886E+38;
break;
}
var a=-3.4028234663852886E+38;
}else{
do{
if((c<0)){
var g=bg(a);
if(!((g!==a))){
var a=Infinity;
break;
}
var a=-Infinity;
}else{
var a=Infinity;
}
}while(0);
if(!(((d>>0)===(2>>0)))){
break;
}
var e=(ax);
e.i0=(34>>0);
return a;
}
}while(0);
var e=(ax);
e.i0=(34>>0);
return a;
}
}while(0);
if(!((a===0))){
return a;
}
e[0>>0].setFloat64(0,c,true);
var d=(e[0>>0].getInt32(1*4+0,true)>>0);
if((((((d&2147483647)>>0)+(-2146435072>>0)>>0)>>0)>(-1>>0))){
return a;
}
e[0>>0].setFloat64(0,b,true);
var d=(e[0>>0].getInt32(1*4+0,true)>>0);
if((((((d&2147483647)>>0)+(-2146435072>>0)>>0)>>0)>(-1>>0))){
return a;
}
var e=(ax);
e.i0=(34>>0);
var a=0;
return a;
}
function aT(b){
var label=0;
var a=a8(b);
var c=(a1>>0);
if(((c>>0)===(-1>>0))){
return a;
}
var e=aG(b);
if(!((((e>>0)!==(0>>0))&&(b<0)))){
return a;
}
var a=(((c>>0)===(0>>0))?0:NaN);
var d=(ax);
d.i0=(33>>0);
return a;
}
var b4={a0:nullObj,i1:0,i2:0,i3:0,i4:0,a5:{a0:nullObj,i1:0},i6:0,a7:null,a8:nullObj,a9:null,a10:null,a11:null,a12:null,a13:{a0:nullObj,i1:0},a14:nullObj,i15:0,a16:new Uint8Array(4),a17:{a0:nullObj,i1:0},i18:0,i19:0,i20:0,a21:{i0:0,a1:new DataView(new ArrayBuffer(8))},i22:0};
var b5={a0:nullObj,i1:0,i2:0,i3:0,i4:0,a5:{a0:nullObj,i1:0},i6:0,a7:null,a8:nullObj,a9:null,a10:null,a11:null,a12:null,a13:{a0:nullObj,i1:0},a14:nullObj,i15:0,a16:new Uint8Array(4),a17:{a0:nullObj,i1:0},i18:0,i19:0,i20:0,a21:{i0:0,a1:new DataView(new ArrayBuffer(8))},i22:0};
var b6={a0:nullObj,i1:0,i2:0,i3:0,i4:0,a5:{a0:nullObj,i1:0},i6:0,a7:null,a8:nullObj,a9:null,a10:null,a11:null,a12:null,a13:{a0:nullObj,i1:0},a14:nullObj,i15:0,a16:new Uint8Array(4),a17:{a0:nullObj,i1:0},i18:0,i19:0,i20:0,a21:{i0:0,a1:new DataView(new ArrayBuffer(8))},i22:0};
var b3=new Uint8Array([67,0]);
var a2={i0:0,a1:b4,a2:b5,a3:b6,i4:0,a5:nullArray,i6:0,i7:0,a8:b3,a9:null,a10:null,i11:0,i12:0,a13:nullArray,a14:null,a15:null,a16:nullArray,a17:nullArray,a18:null,a19:{a0:null,i1:0,a2:[null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null],a3:null},a20:{a0:null,i1:0,a2:null},a21:null,a22:null,a23:nullArray};
var ax=a2;
var a1=1;
var a4=new Float64Array([512,256,128,64,32,16,8,4,2,1,32,16,8,4,2,1,32,16,8,4,2,1,0.5,0.25,0.125,0.0625,0.03125,0.015625,0.0078125,0.00390625,0.001953125,9.765625E-4,4.8828125E-4]);
var bX=new Int32Array([1073291771,1074340347,1074977148,1075388923,1075800698,1076025724,1076231611,1076437499,1076643386,1076849274,1076971356,1077074300,1077177244,1077280187,1077383131,1077486075,1077589019,1077691962,1077794906,1077897850,1077968460,1078019932,1078071404,1078122876,1078174348,1078225820,1078277292,1078328763,1078380235,1078431707,1078483179,1078534651]);
var bW=new Int32Array([10680707,7228996,1387004,2578385,16069853,12639074,9804092,4427841,16666979,11263675,12935607,2387514,4345298,14681673,3074569,13734428,16653803,1880361,10960616,8533493,3062596,8710556,7349940,6258241,3772886,3769171,3798172,8675211,12450088,3874808,9961438,366607,15675153,9132554,7151469,3571407,2607881,12013382,4155038,6285869,7677882,13102053,15825725,473591,9065106,15363067,6271263,9264392,5636912,4652155,7056368,13614112,10155062,1944035,9527646,15080200,6658437,6231200,6832269,16767104,5075751,3212806,1398474,7579849,6349435,12618859]);
var b1=new Int32Array([2,3,4,6]);
var b2=new Float64Array([1.5707962512969971,7.5497894158615964E-8,5.3903025299577648E-15,3.2820034158079129E-22,1.2706557530806761E-29,1.2293330898111133E-36,2.7337005381646456E-44,2.1674168387780482E-51]);
var b0=new Float64Array([1,1.5]);
var bZ=new Float64Array([0,1.350039202129749E-8]);
var bY=new Float64Array([0,0.58496248722076416]);
var bm=new Float64Array([4503599627370496,-4503599627370496]);
var bf=new Float64Array([256,128,64,32,16,8,4,2,1,0.53333333333333333,0.26666666666666666,0.13333333333333333,0.066666666666666666,0.033333333333333333,0.016666666666666666,0.0088888888888888888,0.0044444444444444444,0.0022222222222222222,0.0011111111111111111,5.5555555555555556E-4,2.7777777777777778E-4,1.3888888888888889E-4,6.9444444444444444E-5,3.4722222222222222E-5,1.7361111111111111E-5,8.6805555555555555E-6,4.3402777777777778E-6,2.1701388888888889E-6,1.0850694444444444E-6,5.4253472222222222E-7,2.7126736111111111E-7,1.3563368055555556E-7]);
function createArray_struct$p_Z7GCode1D(ret,start,end){
for(var __i__=start;__i__<end;__i__++)
ret[__i__]={i0:0,i1:0};
return ret;
}
function createArray_struct$p_Z7GCode2D(ret,start,end){
for(var __i__=start;__i__<end;__i__++)
ret[__i__]={i0:0,i1:0,i2:0};
return ret;
}
function createArray_struct$p_Z8GeoPoint(ret,start,end){
for(var __i__=start;__i__<end;__i__++)
ret[__i__]={d0:0,d1:0};
return ret;
}
//bJ()
