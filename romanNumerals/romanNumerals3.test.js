const mapping = [
  ['M', 1000],
  ['CM', 900],
  ['D', 500],
  ['CD', 400],
  ['C', 100],
  ['XC', 90],
  ['L', 50],
  ['XL', 40],
  ['X', 10],
  ['IX', 9],
  ['V', 5],
  ['IV', 4],
  ['I', 1],
]
RomanNumerals = {

  toRoman(num) {

    let s = '';
    
    // 1 find first floor num >= arab
    // 2 s += roman
    // 3 descrease number -= arab
    // dont go further, repeat from the top <- not 'repeat from the top'
    // but 'repeat the same value' !! which is done while-looping on it
    // while-loop == while this cond is good, keep looping work
    // if num <= 0 stop

    mapping.forEach(([roman, arab]) => {
      while (num >= arab) {
        s += roman
        num -= arab
      }
    })

    return s
  },

  // same as above, but we chop off roman string one possibility at a time.
  // CMX == ['CM', 'X']
  // MCXXX == ['M', 'C', 'X', 'X', 'X']
  fromRoman(s) {
    let num = 0
    mapping.forEach(([roman, arab]) => {
      while (s.startsWith(roman)) {
        num += arab
        s = s.slice(roman.length)
      }
    })
    return num
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

  test.only("fromRoman", () => {

    expect(RomanNumerals.fromRoman('CMX')).toEqual(910);

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