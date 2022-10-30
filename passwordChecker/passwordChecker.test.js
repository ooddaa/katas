const REGEXP = /./

function doTest (s) {
	return REGEXP.test(s);
	// const log = `"${string}" is${expected ? '' : ' not'} a valid password\n`;
}

describe("Tests suite", () => {
	test("sample tests", () => {
    expect(doTest('fjd3IR9')).toEqual(true)
    expect(doTest('4fdg5Fj3')).toEqual(true)
    expect(doTest('djI38D55')).toEqual(true)

		 expect(doTest('ghdfj32')).toEqual(false);
		 expect(doTest('DSJKHD23')).toEqual(false);
		 expect(doTest('dsF43')).toEqual(false);
		 expect(doTest('DHSJdhjsU')).toEqual(false);
		 expect(doTest('fjd3IR9.;')).toEqual(false);
		 expect(doTest('fjd3  IR9')).toEqual(false);
		 expect(doTest('djI3_8D55')).toEqual(false);
		 expect(doTest('djI38D55@@')).toEqual(false);
	});
});