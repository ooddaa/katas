/**
 * https://www.codewars.com/kata/51b66044bce5799a7f000003
 * Create a RomanNumerals class that can convert a roman numeral to and from an integer value. It should
 *  follow the API demonstrated in the examples below. Multiple roman numeral values will be tested for 
 * each helper method.

Modern Roman numerals are written by expressing each digit separately starting with the left most digit and
 skipping any digit with a value of zero. In Roman numerals 1990 is rendered: 1000=M, 900=CM, 90=XC; 
 resulting in MCMXC. 2008 is written as 2000=MM, 8=VIII; or MMVIII. 1666 uses each Roman symbol in 
 descending order: MDCLXVI.

Input range : 1 <= n < 4000

In this kata 4 should be represented as IV, NOT as IIII (the "watchmaker's four").
Symbol	Value
I	1
IV	4
V	5
X	10
L	50
C	100
D	500
M	1000
*/

/**
     * https://www.romannumerals.org/converter
     * 40 xl
     * 60 lx
     * 70 lxx
     * 79 lxxix
     * 80 lxxx
     * 90 xc
     * 400 cd
     * 1000 m
     * 2000 mm
     * 3000 mmm
     * 4000 mmmm
     * 5000 V (dash over)
     * 
     * 1666 -> 1 thousand 6 hundred 6 decades 6 -> M  DC LX VI
     * 1987 -> 1 thousand 9 hundred 8 decades 7 -> M  CM LX XXVII
     * 1990 -> 1 thousand 9 hundred 9 decades 0 -> M  CM XC -
     * 2080 -> 2 thousand - hundred 8 decades 0 -> MM -- LXXX -
     * 
     */

function thousandsToRoman(num) {
  // const rv = "M".repeat(Math.floor(1666/1000))
  // const rv = "M".repeat(Math.floor(Math.floor(num/1000)))
  const rv = "M".repeat(Math.floor(num/1000))
  return rv
}

function hundredsToRoman(num) {
  /**
   * 100 - c
   * 200 - cc
   * 300 - ccc
   * 400 - cd
   * 500 - d
   * 600 - dc
   * 700 - dcc
   * 800 - dccc
   * 900 - cm
   */

  const string = String(Math.floor(num / 100))
  const hundreds = Number(string.slice(-1))
  // console.log(hundreds)
  // console.log(num % 100)
  if (hundreds <= 0) return ""    
  if (hundreds === 1) return "C".repeat(hundreds)    
  if (hundreds === 2) return "C".repeat(hundreds)  
  if (hundreds === 3) return "C".repeat(hundreds)   
  if (hundreds === 4) return "CD"    
  if (hundreds === 5) return "D"    
  if (hundreds === 6) return "DC"    
  if (hundreds === 7) return "DCC"    
  if (hundreds === 8) return "DCCC"    
  if (hundreds === 9) return "CM"    

}

function decadesToRoman(num) {

  const string = String(Math.floor(num / 10))
  const decades = Number(string.slice(-1))
  // console.log(decades)

  if (decades <= 0) return ""    
  if (decades === 1) return "X".repeat(decades)    
  if (decades === 2) return "X".repeat(decades)  
  if (decades === 3) return "X".repeat(decades)   
  if (decades === 4) return "XL"    
  if (decades === 5) return "L"    
  if (decades === 6) return "LX"    
  if (decades === 7) return "LXX"    
  if (decades === 8) return "LXXX"    
  if (decades === 9) return "XC"   
}

function numbersToRoman(num) {

  const number = num % 10
  // console.log(number)

  if (number <= 0) return ""    
  if (number === 1) return "I".repeat(number)    
  if (number === 2) return "I".repeat(number)  
  if (number === 3) return "I".repeat(number)   
  if (number === 4) return "IV"    
  if (number === 5) return "V"    
  if (number === 6) return "VI"    
  if (number === 7) return "VII"    
  if (number === 8) return "VIII"    
  if (number === 9) return "IX"   
}

function romanToThousands(str) {
  if (str === undefined) return 0
  // 'M' or 'MM' etc - just take length
  return str.length * 1000
}

function romanToHundreds(str) {
  if (str === undefined) return 0
  const mapping = {
    'CM': 900,
    'DCCC': 800,
    'DCC': 700,
    'DC': 600,
    'D': 500,
    'CD': 400,
    'CCC': 300,
    'CC': 200,
    'C': 100,
  }
  if (!mapping[str]) throw new Error(`fromRoman.romanToHundreds: don't have mapping for str: ${str}`)
  return mapping[str]
}

function romanToDecades(str) {
  if (str === undefined) return 0
  const mapping = {
    'XC': 90,
    'LXXX': 80,
    'LXX': 70,
    'LX': 60,
    'L': 50,
    'XL': 40,
    'XXX': 30,
    'XX': 20,
    'X': 10,
  }
  if (!mapping[str]) throw new Error(`fromRoman.romanToDecades: don't have mapping for str: ${str}`)
  return mapping[str]
}

function romanToDecimals(str) {
  if (str === undefined) return 0
  const mapping = {
    'IX': 9,
    'VIII': 8,
    'VII': 7,
    'VI': 6,
    'V': 5,
    'IV': 4,
    'III': 3,
    'II': 2,
    'I': 1,
  }
  if (!mapping[str]) throw new Error(`fromRoman.romanToDecimals: don't have mapping for str: ${str}`)
  return mapping[str]
}

class RomanNumerals {
  constructor() {
    this.table = {

    }
  }
  static toRoman (num) {
    const rv = `${thousandsToRoman(num)}${hundredsToRoman(num)}${decadesToRoman(num)}${numbersToRoman(num)}`
    return rv
  }
  static fromRoman (str) {
    // 'XXI' -> no M/D/C/L => <40 => 

    // LXXXVIII -> LXXX VIII -> 88
    // LXXXVIII -> no M/D/C => <100
    // CXI      -> no M/D => <500 
    // CDXLIV   -> no M => <1000, D => 400 - 900, CD => 400 & L => 40 - 90 XL => 40

    // CXXIII -> C XX III

    /* 
    expect(RomanNumerals.toRoman(111)).toEqual('CXI');
    expect(RomanNumerals.toRoman(222)).toEqual('CCXXII');
    expect(RomanNumerals.toRoman(333)).toEqual('CCCXXXIII');
    expect(RomanNumerals.toRoman(444)).toEqual('CDXLIV');
    expect(RomanNumerals.toRoman(555)).toEqual('DLV');
    expect(RomanNumerals.toRoman(666)).toEqual('DCLXVI');
    expect(RomanNumerals.toRoman(777)).toEqual('DCCLXXVII');
    expect(RomanNumerals.toRoman(888)).toEqual('DCCCLXXXVIII');
    expect(RomanNumerals.toRoman(999)).toEqual('CMXCIX');
    */

    // extract thousands
    function parse(str) {
      // const match = str.match(/(M)*|(CM)/)
      // console.log(match)
      // const matches = str.matchAll(/(M)*|(CM)/g)

      const regex = /(?<thousands>M*)?(?<hundreds>(CM)|(DC{1,3})|(CD)|(D)|(C{2,3})|(?<!X)(C))?(?<decades>(XC)|(LX{1,3})|(XL)|(L)|(X{2,3})|(?<!I)(X))?(?<decimals>(IX)|(VI{1,3})|(IV)|(V)|(I{1,3}))?/g

      const matches = str.matchAll(regex)
      // const matches = str.match(regex)
      for (let match of matches) {
        // console.log(match.groups)
        let { thousands, hundreds, decades, decimals } = match.groups
        
        if (!thousands && !hundreds&& !decades&& !decimals) continue
        return romanToThousands(thousands) + 
        romanToHundreds(hundreds) +
        romanToDecades(decades) +
        romanToDecimals(decimals)
      } 

    }

    const rv = parse(str)
    // console.log(rv)
    return rv
    // return 21
  }
}



describe("sample tests", () => {
  test("toRoman", () => {
    expect(RomanNumerals.toRoman(1000)).toEqual('M');
    expect(RomanNumerals.toRoman(1100)).toEqual('MC');
    expect(RomanNumerals.toRoman(1200)).toEqual('MCC');
    expect(RomanNumerals.toRoman(1300)).toEqual('MCCC');
    expect(RomanNumerals.toRoman(1400)).toEqual('MCD');
    expect(RomanNumerals.toRoman(1500)).toEqual('MD');
    expect(RomanNumerals.toRoman(1600)).toEqual('MDC');
    expect(RomanNumerals.toRoman(1700)).toEqual('MDCC');
    expect(RomanNumerals.toRoman(1800)).toEqual('MDCCC');
    expect(RomanNumerals.toRoman(1900)).toEqual('MCM');

    expect(RomanNumerals.toRoman(2000)).toEqual('MM');
    expect(RomanNumerals.toRoman(2100)).toEqual('MMC');
    expect(RomanNumerals.toRoman(2400)).toEqual('MMCD');
    expect(RomanNumerals.toRoman(2500)).toEqual('MMD');
    expect(RomanNumerals.toRoman(2900)).toEqual('MMCM');

    expect(RomanNumerals.toRoman(1110)).toEqual('MCX');
    expect(RomanNumerals.toRoman(1130)).toEqual('MCXXX');
    expect(RomanNumerals.toRoman(1140)).toEqual('MCXL');
    expect(RomanNumerals.toRoman(1150)).toEqual('MCL');
    expect(RomanNumerals.toRoman(1160)).toEqual('MCLX');
    expect(RomanNumerals.toRoman(1170)).toEqual('MCLXX');
    expect(RomanNumerals.toRoman(1180)).toEqual('MCLXXX');
    expect(RomanNumerals.toRoman(1190)).toEqual('MCXC');

    expect(RomanNumerals.toRoman(1111)).toEqual('MCXI');
    expect(RomanNumerals.toRoman(1222)).toEqual('MCCXXII');
    expect(RomanNumerals.toRoman(1333)).toEqual('MCCCXXXIII');
    expect(RomanNumerals.toRoman(1444)).toEqual('MCDXLIV');
    expect(RomanNumerals.toRoman(1555)).toEqual('MDLV');
    expect(RomanNumerals.toRoman(1666)).toEqual('MDCLXVI');
    expect(RomanNumerals.toRoman(1777)).toEqual('MDCCLXXVII');
    expect(RomanNumerals.toRoman(1888)).toEqual('MDCCCLXXXVIII');
    expect(RomanNumerals.toRoman(1999)).toEqual('MCMXCIX');


    expect(RomanNumerals.toRoman(10)).toEqual('X');
    expect(RomanNumerals.toRoman(20)).toEqual('XX');
    expect(RomanNumerals.toRoman(30)).toEqual('XXX');
    expect(RomanNumerals.toRoman(40)).toEqual('XL');
    expect(RomanNumerals.toRoman(50)).toEqual('L');
    expect(RomanNumerals.toRoman(60)).toEqual('LX');
    expect(RomanNumerals.toRoman(70)).toEqual('LXX');
    expect(RomanNumerals.toRoman(80)).toEqual('LXXX');
    expect(RomanNumerals.toRoman(90)).toEqual('XC');

    expect(RomanNumerals.toRoman(0)).toEqual('');
    expect(RomanNumerals.toRoman(1)).toEqual('I');
    expect(RomanNumerals.toRoman(2)).toEqual('II');
    expect(RomanNumerals.toRoman(3)).toEqual('III');
    expect(RomanNumerals.toRoman(4)).toEqual('IV');
    expect(RomanNumerals.toRoman(5)).toEqual('V');
    expect(RomanNumerals.toRoman(6)).toEqual('VI');
    expect(RomanNumerals.toRoman(7)).toEqual('VII');
    expect(RomanNumerals.toRoman(8)).toEqual('VIII');
    expect(RomanNumerals.toRoman(9)).toEqual('IX');

    expect(RomanNumerals.toRoman(11)).toEqual('XI');
    expect(RomanNumerals.toRoman(22)).toEqual('XXII');
    expect(RomanNumerals.toRoman(33)).toEqual('XXXIII');
    expect(RomanNumerals.toRoman(44)).toEqual('XLIV');
    expect(RomanNumerals.toRoman(55)).toEqual('LV');
    expect(RomanNumerals.toRoman(66)).toEqual('LXVI');
    expect(RomanNumerals.toRoman(77)).toEqual('LXXVII');
    expect(RomanNumerals.toRoman(88)).toEqual('LXXXVIII');
    expect(RomanNumerals.toRoman(99)).toEqual('XCIX');

    expect(RomanNumerals.toRoman(111)).toEqual('CXI');
    expect(RomanNumerals.toRoman(222)).toEqual('CCXXII');
    expect(RomanNumerals.toRoman(333)).toEqual('CCCXXXIII');
    expect(RomanNumerals.toRoman(444)).toEqual('CDXLIV');
    expect(RomanNumerals.toRoman(555)).toEqual('DLV');
    expect(RomanNumerals.toRoman(666)).toEqual('DCLXVI');
    expect(RomanNumerals.toRoman(777)).toEqual('DCCLXXVII');
    expect(RomanNumerals.toRoman(888)).toEqual('DCCCLXXXVIII');
    expect(RomanNumerals.toRoman(999)).toEqual('CMXCIX');


    /* TEST */
    expect(RomanNumerals.toRoman(4)).toEqual('IV');
    expect(RomanNumerals.toRoman(1)).toEqual('I');
    expect(RomanNumerals.toRoman(1990)).toEqual('MCMXC');
    expect(RomanNumerals.toRoman(2008)).toEqual('MMVIII');
  });

  test("fromRoman", () => {
    /* THOUSANDS */

    // expect(RomanNumerals.fromRoman('MM')).toEqual(2000);
    // expect(RomanNumerals.fromRoman('MMC')).toEqual(2100);
    // expect(RomanNumerals.fromRoman('MMCD')).toEqual(2400);
    // expect(RomanNumerals.fromRoman('MMD')).toEqual(2500);
    // expect(RomanNumerals.fromRoman('MMCM')).toEqual(2900);

    expect(RomanNumerals.fromRoman('MCX')).toEqual(1110);
    expect(RomanNumerals.fromRoman('MCXXX')).toEqual(1130);
    expect(RomanNumerals.fromRoman('MCXL')).toEqual(1140);
    expect(RomanNumerals.fromRoman('MCL')).toEqual(1150);
    expect(RomanNumerals.fromRoman('MCLX')).toEqual(1160);
    expect(RomanNumerals.fromRoman('MCLXX')).toEqual(1170);
    expect(RomanNumerals.fromRoman('MCLXXX')).toEqual(1180);
    expect(RomanNumerals.fromRoman('MCXC')).toEqual(1190);

    expect(RomanNumerals.fromRoman('MCXI')).toEqual(1111);
    expect(RomanNumerals.fromRoman('MCCXXII')).toEqual(1222);
    expect(RomanNumerals.fromRoman('MCCCXXXIII')).toEqual(1333);
    expect(RomanNumerals.fromRoman('MCDXLIV')).toEqual(1444);
    expect(RomanNumerals.fromRoman('MDLV')).toEqual(1555);
    expect(RomanNumerals.fromRoman('MDCLXVI')).toEqual(1666);
    expect(RomanNumerals.fromRoman('MDCCLXXVII')).toEqual(1777);
    expect(RomanNumerals.fromRoman('MDCCCLXXXVIII')).toEqual(1888);
    expect(RomanNumerals.fromRoman('MCMXCIX')).toEqual(1999);


  })

  test('tests', () => {

    // assert.strictEqual(RomanNumerals.toRoman(1000), 'M');
    // assert.strictEqual(RomanNumerals.toRoman(4), 'IV');
    // assert.strictEqual(RomanNumerals.toRoman(1), 'I');
    // assert.strictEqual(RomanNumerals.toRoman(1990), 'MCMXC');
    // assert.strictEqual(RomanNumerals.toRoman(2008), 'MMVIII');

    expect(RomanNumerals.toRoman(1000)).toEqual('M');
    expect(RomanNumerals.toRoman(4)).toEqual('IV');
    expect(RomanNumerals.toRoman(1)).toEqual('I');
    expect(RomanNumerals.toRoman(1990)).toEqual('MCMXC');
    expect(RomanNumerals.toRoman(2008)).toEqual('MMVIII');

    expect(RomanNumerals.fromRoman('XXI')).toEqual(21);
    expect(RomanNumerals.fromRoman('I')).toEqual(1);
    expect(RomanNumerals.fromRoman('IV')).toEqual(4);
    expect(RomanNumerals.fromRoman('MMVIII')).toEqual(2008);
    expect(RomanNumerals.fromRoman('MDCLXVI')).toEqual(1666);

  })
});