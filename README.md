# Practica5
En este readme indicare solo las funciones que requieren ser explicada
###deleteUsuario
La función envia de respuesta el usuario borrado y puesto que he realizado borrado en cascada para las colecciones de los usuarios al borrar el usario he intentar pedirle que muestre tambien su coleccion saltara un error de Graphql ya que la colección que intenta buscar ha sido borrada. Por tanto cuando haga el delete desde el Apolo solicitele que le muestre el usuario sin la colección para que le de ese usuario de respuesta
##AddComic
A parte de los datos del comic se ha de introducir el id de la colección donde se quiere meter con lo que realice un getAllUsuarios para poder mirar todos los ids de las colecciones. En el update igual en caso de que se quiera cambiar la coleccion en la que se encuentra.
##AddUsuario
La coleccion se crea simultaneamente con el Usuario.
