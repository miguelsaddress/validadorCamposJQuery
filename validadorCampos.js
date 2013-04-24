/**
*
* Valida campos y los reformatea si procede.
* De momento solo formatea numeros
*/
validaCampos = function( elems_array ){

	var errores = false;

	for( var i in elems_array ){
		var e = elems_array[i]
		var _id = e.id;
		var _valor = jQuery(_id).val().trim();
		var mv = e.minVal != undefined? e.minVal : 0;
		var hayMaxVal = e.maxVal != undefined? true : false;
		var mxv = e.maxVal;


		var checkMandatory = function(errorValues){
			//if the value is ErrorValue is considered wrong as well
			var success=true;
			var ev_arr = errorValues != undefined? errorValues : [""];
			if( e.mandatory ){
				//si no hay nada o esta en el array de valores de error.... chasca
				if(_valor.length == 0 || jQuery.inArray(_valor, ev_arr) != -1 ){
					success=false;
					alert( e.msg );
				}
			}
			return success;
		};

		switch( e.tipo ){
			case 'text':
				if( !checkMandatory() ) errores=true;
				
				break;

			case 'select':
				var ev_arr = e.errorVals != undefined? e.errorVals : [""];
				if(!checkMandatory(ev_arr)) errores=true;

				break;

			case 'int':
				if( !checkMandatory() ) errores=true;

				if ( isNaN(_valor) ) {
					errores = true;
					alert( e.msg + " - No es un número válido");
				}else{
					//es numero
					_valor = parseInt( _valor );
					if( _valor < mv ){
						errores = true;
						alert( e.msg + " - El valor mínimo es de " + mv);
					}
					if( hayMaxVal && _valor > mxv ){
						errores = true;
						alert( e.msg + " - El valor máximo es de " + mv);
					}

				}
				if(!errores){
					jQuery(_id).val( parseInt(_valor ) );
				}

				break;
			case 'money':
				if( !checkMandatory() ) errores=true;

				//reemplazo coma por punto
				_valor = _valor.replace(",", ".");
				if( isNaN(_valor) ){
					errores=true;
					alert(e.msg);
				}else{
					//es un numero, le dejo a 'e.decimals' decimales
					var d = e.decimals != undefined? e.decimals : 2;
					_valor = parseFloat(_valor);
					_valor = _valor.toFixed(d);
					if( _valor < mv ){
						alert( e.msg + " - El valor minimo es de " + mv);
						errores = true;
					}
				}
				if(!errores){
					jQuery(_id).val( parseInt(_valor ) );
				}

				break;
		}
		if(errores) {
			resetLoaders();
			return {success: false };
		}
	}
	return {success: true};
}