YUI.add("dataparser-base",function(B){var A={toString:function(){return"DataParser.Base";},parse:function(C,D){return D;}};B.namespace("DataParser").Base=A;},"@VERSION@",{requires:["base"]});YUI.add("dataparser-json",function(C){var B=C.Lang,A={toString:function(){return"DataParser.JSON";},buildPath:function(D){var G=null,F=[],E=0;if(D){D=D.replace(/\[(['"])(.*?)\1\]/g,function(I,H,J){F[E]=J;return".@"+(E++);}).replace(/\[(\d+)\]/g,function(I,H){F[E]=parseInt(H,10)|0;return".@"+(E++);}).replace(/^\./,"");if(!/[^\w\.\$@]/.test(D)){G=D.split(".");for(E=G.length-1;E>=0;--E){if(G[E].charAt(0)==="@"){G[E]=F[parseInt(G[E].substr(1),10)];}}}else{}}return G;},walkPath:function(G,F){var E=0,D=G.length;for(;E<D;E++){F=F[G[E]];}return F;},parse:function(F,G){var D=(G.responseText&&C.JSON.parse(G.responseText))||G,E={results:[],meta:{}};if(B.isObject(D)&&F){E=A._parseResults(F,D,E);if(B.isObject(F.metaFields)){E=A._parseMeta(F.metaFields,D,E);}}else{E.error=true;}return E;},_parseResults:function(H,E,G){if(H.resultsList){var D=false,F=[],I;I=A.buildPath(H.resultsList);if(I){F=A.walkPath(I,E);if(F===undefined){D=true;}else{if(B.isArray(H.fields)){if(B.isArray(H.fields)){F=A._filterFieldValues(H.fields,F);}else{D=true;}}}}else{D=true;}if(D){G.error=true;}G.results=F;}return G;},_filterFieldValues:function(K,G){var E=[],M=K.length,H,F,O,P,R,D,J=[],N=[],L=[],Q,I;for(H=0;H<M;H++){O=K[H];P=O.key||O;R=A.buildPath(P);if(R){if(R.length===1){J[J.length]={key:P,path:R[0]};}else{N[N.length]={key:P,path:R};}}else{}D=(B.isFunction(O.parser))?O.parser:C.DataParser[O.parser+""];if(D){L[L.length]={key:P,parser:D};}}for(H=G.length-1;H>=0;--H){I={};Q=G[H];if(Q){for(F=J.length-1;F>=0;--F){I[J[F].key]=B.isUndefined(Q[J[F].path])?Q[F]:Q[J[F].path];}for(F=N.length-1;F>=0;--F){I[N[F].key]=A.walkPath(N[F].path,Q);}for(F=L.length-1;F>=0;--F){P=L[F].key;I[P]=L[F].parser(I[P]);if(B.isUndefined(I[P])){I[P]=null;}}}E[H]=I;}return E;},_parseMeta:function(G,D,F){var E,H;for(E in G){if(G.hasOwnProperty(E)){H=A.buildPath(G[E]);if(H&&D){F.meta[E]=A.walkPath(H,D);}}}return F;}};C.DataParser.JSON=C.mix(A,C.DataParser.Base);},"@VERSION@",{requires:["dataparser-base"]});YUI.add("dataparser",function(A){},"@VERSION@",{use:["dataparser-base","dataparser-json"]});