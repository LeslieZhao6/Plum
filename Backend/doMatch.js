

getDoctClosness = function( v1 , v2 )
{

	var norm1 = 0;

	for(var key in v1 )
		norm1 += v1[key]*v1[key];
	norm1 = Math.sqrt(norm1);

	var norm2 = 0;

	for(var key in v2 )
		norm2 += v2[key]*v2[key];
	norm2 = Math.sqrt(norm2);

	var dot = 0;

	for ( var key in v1)
	{
		if( key in v2)
			dot += v1[key]*v2[key];
	}

	return dot / (norm2 * norm1);

}


// a = { q : 3 , h : 8}
// b = { u : 8 , q : 9}
// console.log(  dictVectorCosTheeta( a, b )  )