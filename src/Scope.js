(function( global ) {

  function Scope( ac, canvas ) {
    if ( !ac ) {
      throw new Error('No AudioContext provided');
    }
    if ( !canvas ) {
      throw new Error('No Canvas provided');
    }
    this.ac = ac;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.width = canvas.width;
    this.height = canvas.height;
    this.input = ac.createGain();
    this.analyzer = ac.createAnalyser();
    this.analyzer.fftSize = 2048;
    this.input.connect( this.analyzer );
    this.freqData = new Uint8Array( this.analyzer.frequencyBinCount );
    this.rAF = null;
    this.strokeStyle = '#6cf';
    this.sensitivity = 42;
  }

  // borrowed from https://github.com/cwilso/oscilloscope/blob/master/js/oscilloscope.js
  Scope.prototype.findZeroCrossing = function( data, width ) {
    var i = 0,
      last = -1,
      min = this.sensitivity * 128 / 100 + 128,
      s;

    while ( i < width && ( data[ i ] > 128 ) ) {
      i++;
    }

    if ( i >= width ) {
      return 0;
    }

    while ( i < width && ( ( s = data[ i ] ) < min ) ) {
      last = s >= 128 ? last === -1 ? i : last : -1;
      i++;
    }

    last = last < 0 ? i : last;
    return i === width ? 0 : last;
  };

  Scope.prototype.start = function() {
    this.rAF = requestAnimationFrame( this.draw.bind( this ) );
    return this;
  };

  Scope.prototype.stop = function() {
    cancelAnimationFrame( this.rAF );
    this.rAF = null;
    return this;
  };

  Scope.prototype.draw = function() {
    var len = this.freqData.length,
      scale = this.height / 256 / 2,
      i = j = 50,
      magnitude;

    // grid
    this.ctx.fillStyle = '#002233';
    this.ctx.fillRect( 0, 0, this.width, this.height );
    this.ctx.lineWidth = 0;
    this.ctx.strokeStyle = 'rgba(60,180,220,0.05)';
    this.ctx.beginPath();
    for ( ; i < this.width; i += 50 ) {
      this.ctx.moveTo( i, 0 );
      this.ctx.lineTo( i, this.height );
      for ( j = 0; j < this.height; j += 50 ) {
        this.ctx.moveTo( 0, j );
        this.ctx.lineTo( this.width, j );
      }
    }
    this.ctx.stroke();

    // x axis
    this.ctx.strokeStyle = 'rgba(60,180,220,0.22)';
    this.ctx.beginPath();
    this.ctx.moveTo( 0, this.height / 2 );
    this.ctx.lineTo( this.width, this.height / 2 );
    this.ctx.stroke();

    // waveform
    this.analyzer.getByteTimeDomainData( this.freqData );
    i = this.findZeroCrossing( this.freqData, this.width );
    this.ctx.lineWidth = 2.5;
    this.ctx.strokeStyle = this.strokeStyle;
    this.ctx.beginPath();
    this.ctx.moveTo( 0, ( 256 - this.freqData[ i ] ) * scale + this.height / 4 );
    for ( j = 0; i < len && j < this.width; i++, j++ ) {
      magnitude = ( 256 - this.freqData[ i ] ) * scale + this.height / 4;
      this.ctx.lineTo( j, magnitude );
    }
    this.ctx.stroke();

    this.rAF = requestAnimationFrame( this.draw.bind( this ) );
    return this;
  };

  global.Scope = Scope;

}( typeof window !== 'undefined' ? window : this ) );
