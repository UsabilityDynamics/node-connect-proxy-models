module.exports = {

  "Have Backend model": function() {

    require( '../' ).should.have.property( 'Backend' );
    require( '../' ).Backend.should.have.property( 'extend' );

  },

  "Have Route model": function() {

    require( '../' ).should.have.property( 'Route' );
    require( '../' ).Route.should.have.property( 'extend' );

  },

  "Have Server model": function() {

    require( '../' ).should.have.property( 'Server' );
    require( '../' ).Server.should.have.property( 'extend' );

  }

}