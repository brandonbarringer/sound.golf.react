export const celciusToFahrenheit = (c) => {
  return (c * 9/5) + 32;
}

export const fahrenheitToCelcius = (f) => {
  return (f - 32) * 5/9;
}

export const stringPercentToNumber = (string) => {
  return parseFloat(string);
}

export const speedOfSound = (temperature, humidity) => {
  
  /*
    Program ID: Calculation of speed of sound in humid air
    Version number: 1.0.2
    Release date: 10/11/2005
    Programmer: Richard Lord, National Physical Laboratory
    History:
    13/03/03	First release
    15/03/04	Coefficient corrected in calculation of PSV
    10/11/05	Signs corrected in calculation of C3 (Jacek M. Holeczek)
  */
  
  // function to provide log to the base 10
  const Log10 = (x) => {
    return Math.log(x) / Math.log(10);
  }

  // function to round x to dp decimal places
  const roundTo = (x, dp) => {
    return (Math.round(x * Math.pow(10, dp)) / Math.pow(10, dp));
  }

  // function to square a number
  const sqr = (x) => {
    return Math.pow(x, 2);
  }
  
  let T;			  // temperature degC
  let P;			  // pressure
  let Rh;			  // relative humidity
  let C;	      // speed
  let Xc, Xw;		// Mole fraction of carbon dioxide and water vapour respectively
  let H;			  // molecular concentration of water vapour

  let C1;		    // Intermediate calculations
  let C2;
  let C3;

  let ENH;
  let PSV;
  let PSV1;
  let PSV2;

  let T_kel; 		// ambient temperature (Kelvin)

  const Kelvin = 273.15;	// For converting to Kelvin
  const e = 2.71828182845904523536;

  T = fahrenheitToCelcius(temperature);
  P = 101.325 * 1000.0;
  Rh = humidity;

  T_kel = Kelvin + T; // Measured ambient temp

  // Molecular concentration of water vapour calculated from Rh
  // using Giacomos method by Davis (1991) as implemented in DTU report 11b-1997
  ENH = 3.14 * Math.pow(10, -8) * P + 1.00062 + sqr(T) * 5.6 * Math.pow(10, -7);

  // These commented lines correspond to values used in Cramer (Appendix)
  // PSV1 = sqr(T_kel)*1.2811805*Math.pow(10,-5)-1.9509874*Math.pow(10,-2)*T_kel ;
  // PSV2 = 34.04926034-6.3536311*Math.pow(10,3)/T_kel;	
  PSV1 = sqr(T_kel) * 1.2378847 * Math.pow(10, -5) - 1.9121316 * Math.pow(10,-2) * T_kel;
  PSV2 = 33.93711047 - 6.3431645 * Math.pow(10, 3) / T_kel;
  PSV = Math.pow(e, PSV1) * Math.pow(e, PSV2);
  H = Rh * ENH * PSV / P;
  Xw = H / 100.0;
  Xc = 400.0 * Math.pow(10,-6);

  // Speed calculated using the method of Cramer from
  // JASA vol 93 pg 2510
  C1 = (
    0.603055 
    * T 
    + 331.5024 
    - sqr(T) 
    * 5.28 
    * Math.pow(10, -4) 
    + (0.1495874 * T + 51.471935 - sqr(T) * 7.82 * Math.pow(10, -4)) * Xw
  );

  C2 = (
    (-1.82 * Math.pow(10,-7) + 3.73 * Math.pow(10, -8) * T - sqr(T) * 2.93 * Math.pow(10, -10))
    * P + (-85.20931 - 0.228525 * T + sqr(T) * 5.91 * Math.pow(10, -5))
    * Xc
  );

  C3 = (
    sqr(Xw)
    * 2.835149 + sqr(P)
    * 2.15 
    * Math.pow(10, -13) - sqr(Xc)
    * 29.179762 - 4.86
    * Math.pow(10,-4)
    * Xw * P * Xc
  );

  C = C1 + C2 - C3;

  return roundTo(C, 5);
}

